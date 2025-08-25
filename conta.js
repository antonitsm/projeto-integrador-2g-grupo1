document.addEventListener("DOMContentLoaded", () => {
  const root = document.body;

  

  // 🔹 Inicializa Perfil (carregar valores e setar botões Editar/Salvar)
  initPerfilForm();

  // 🔹 Renderiza listas a partir do armazenamento local
  renderInitialColmeias();
  renderInitialRegistros();

  // Toggle de formulários de adição
  root.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("[data-toggle]");
    if (toggleBtn) {
      const sel = toggleBtn.getAttribute("data-toggle");
      const form = document.querySelector(sel);
      if (form) form.classList.toggle("hidden");
    }

    const cancelAdd = e.target.closest(".js-cancel-add");
    if (cancelAdd) {
      const targetSel = cancelAdd.getAttribute("data-target");
      const form = document.querySelector(targetSel);
      if (form) {
        form.reset();
        form.classList.add("hidden");
      }
    }
  });

  // Submit de adicionar colmeia
  const formAddColmeia = document.getElementById("form-add-colmeia");
  if (formAddColmeia) formAddColmeia.addEventListener("submit", handleAddColmeia);

  // Submit de adicionar registro
  const formAddRegistro = document.getElementById("form-add-registro");
  if (formAddRegistro) formAddRegistro.addEventListener("submit", handleAddRegistro);

  // Delegação para Editar/Salvar/Cancelar/Excluir
  root.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".js-edit");
    const delBtn  = e.target.closest(".js-delete");
    const saveBtn = e.target.closest(".js-save");
    const cancelBtn = e.target.closest(".js-cancel");

    if (editBtn) {
      const row = editBtn.closest(".row");
      enterEditMode(row);
    }
    if (delBtn) {
      const row = delBtn.closest(".row");
      handleDelete(row);
    }
    if (saveBtn) {
      const row = saveBtn.closest(".row");
      handleSave(row);
    }
    if (cancelBtn) {
      const row = cancelBtn.closest(".row");
      exitEditMode(row, /*restore*/ true);
    }
  });

  // 🔹 Sair da conta
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) btnLogout.addEventListener("click", handleLogout);
});

/* ===== CHAVES DE ARMAZENAMENTO ===== */
const PERFIL_KEY    = "ecolmeia.perfil";
const COLMEIAS_KEY  = "ecolmeia.colmeias";
const REGISTROS_KEY = "ecolmeia.registros";

/* ===== PERFIL: carregar/editar/salvar ===== */
function loadPerfil() {
  try {
    const raw = localStorage.getItem(PERFIL_KEY);
    return raw ? JSON.parse(raw) : { nome: "", email: "" };
  } catch {
    return { nome: "", email: "" };
  }
}

async function savePerfil(perfil) {
  localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil));
  await apiUpdatePerfil(perfil); // troque por fetch do seu backend
}

function initPerfilForm() {
  const form = document.getElementById("form-perfil");
  if (!form) return;

  const nomeEl = form.querySelector('[name="nome"]');
  const emailEl = form.querySelector('[name="email"]');
  const statusEl = document.getElementById("perfil-status");
  const btnEdit = document.getElementById("btn-perfil-edit");
  const btnSave = document.getElementById("btn-perfil-save");

  // Carrega valores
  const perfil = loadPerfil();
  nomeEl.value = perfil.nome || "";
  emailEl.value = perfil.email || "";

  // Estado inicial: somente leitura
  setPerfilEditing(false);

  btnEdit.addEventListener("click", () => {
    setPerfilEditing(true);
    statusEl.textContent = "";
    nomeEl.focus();
  });

  btnSave.addEventListener("click", async () => {
    const novo = { nome: nomeEl.value.trim(), email: emailEl.value.trim() };
    statusEl.textContent = "Salvando...";
    try {
      await savePerfil(novo);
      statusEl.textContent = "Alterações salvas ✓";
      setPerfilEditing(false);
    } catch (err) {
      statusEl.textContent = "Falha ao salvar";
      alert(err);
    }
  });

  function setPerfilEditing(isEditing) {
    nomeEl.disabled = !isEditing;
    emailEl.disabled = !isEditing;
    btnSave.classList.toggle("hidden", !isEditing);
    btnEdit.classList.toggle("hidden",  isEditing);
    form.dataset.editing = isEditing ? "true" : "false";
  }
}

/* ===== COLMEIAS: carregar/salvar/render ===== */
function loadColmeias() {
  try {
    const raw = localStorage.getItem(COLMEIAS_KEY);
    return raw ? JSON.parse(raw) : []; // [{id,nome,peso,temp,umid}]
  } catch { return []; }
}
function saveColmeias(arr) {
  localStorage.setItem(COLMEIAS_KEY, JSON.stringify(arr));
  apiSyncColmeias(arr); // gancho p/ backend
}
function renderInitialColmeias() {
  const list = document.getElementById("lista-colmeias");
  if (!list) return;
  list.innerHTML = "";
  const itens = loadColmeias();
  itens.forEach(item => list.appendChild(createColmeiaRow(item)));
}
function persistColmeiasFromDOM() {
  const list = document.getElementById("lista-colmeias");
  if (!list) return;
  const items = [...list.querySelectorAll('li[data-type="colmeia"]')].map(li => ({
    id: li.dataset.id,
    nome: li.dataset.nome || "",
    peso: li.dataset.peso ? Number(li.dataset.peso) : null,
    temp: li.dataset.temp ? Number(li.dataset.temp) : null,
    umid: li.dataset.umid ? Number(li.dataset.umid) : null,
  }));
  saveColmeias(items);
}

/* ===== REGISTROS: carregar/salvar/render ===== */
function loadRegistros() {
  try {
    const raw = localStorage.getItem(REGISTROS_KEY);
    return raw ? JSON.parse(raw) : []; // [{id,date,desc}]
  } catch { return []; }
}
function saveRegistros(arr) {
  localStorage.setItem(REGISTROS_KEY, JSON.stringify(arr));
  apiSyncRegistros(arr); // gancho p/ backend
}
function renderInitialRegistros() {
  const list = document.getElementById("lista-registros");
  if (!list) return;
  list.innerHTML = "";
  const itens = loadRegistros();
  itens.forEach(item => list.appendChild(createRegistroRow(item)));
}
function persistRegistrosFromDOM() {
  const list = document.getElementById("lista-registros");
  if (!list) return;
  const items = [...list.querySelectorAll('li[data-type="registro"]')].map(li => ({
    id: li.dataset.id,
    date: li.dataset.date,
    desc: li.dataset.desc || "",
  }));
  saveRegistros(items);
}

/* ======= ADD ======= */
async function handleAddColmeia(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const details = form.closest(".accordion__item");
  const list = document.getElementById("lista-colmeias");

  const idRaw = form.querySelector('input[name="id"]').value.trim();
  const nome  = form.querySelector('input[name="nome"]').value.trim();
  const peso  = parseFieldFloat(form.querySelector('input[name="peso"]').value);
  const temp  = parseFieldFloat(form.querySelector('input[name="temp"]').value);
  const umid  = parseFieldInt(form.querySelector('input[name="umid"]').value);

  const id = idRaw || nextColmeiaId(list);
  if (!nome) return alert("Informe o nome da colmeia.");

  const payload = { id, nome, peso, temp, umid };

  await apiCreateColmeia(payload);
  list.appendChild(createColmeiaRow(payload));
  persistColmeiasFromDOM();

  if (details) details.open = true;
  form.reset();
  form.classList.add("hidden");
}

async function handleAddRegistro(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const details = form.closest(".accordion__item");
  const list = document.getElementById("lista-registros");

  const date = form.querySelector('input[name="data"]').value;
  const desc = form.querySelector('input[name="desc"]').value.trim();

  if (!date || !desc) return alert("Preencha data e descrição.");

  const id = nextRegistroId(list);
  const payload = { id, date, desc };

  await apiCreateRegistro(payload);
  list.appendChild(createRegistroRow(payload));
  persistRegistrosFromDOM();

  if (details) details.open = true;
  form.reset();
  form.classList.add("hidden");
}

/* ======= EDIT MODE ======= */
function enterEditMode(row) {
  if (!row || row.dataset.editing === "true") return;
  row.dataset.editing = "true";

  const type = row.dataset.type;
  const left = row.querySelector(".row__left");
  const actions = row.querySelector(".row__actions");

  row._originalLeftHTML = left.innerHTML;
  row._originalActionsHTML = actions.innerHTML;

  if (type === "colmeia") {
    const id   = row.dataset.id;
    const nome = row.dataset.nome || "";
    const peso = row.dataset.peso || "";
    const temp = row.dataset.temp || "";
    const umid = row.dataset.umid || "";

    left.innerHTML = `
      <p class="row__title">${id}</p>
      <form class="form-inline" onsubmit="return false;">
        <div class="field">
          <label class="label" for="nome-${id}">Nome</label>
          <input class="input" id="nome-${id}" name="nome" type="text" value="${escapeHtml(nome)}" />
        </div>
        <div class="field">
          <label class="label" for="peso-${id}">Peso (kg)</label>
          <input class="input" id="peso-${id}" name="peso" type="number" step="0.1" value="${peso}" />
        </div>
        <div class="field">
          <label class="label" for="temp-${id}">Temperatura (°C)</label>
          <input class="input" id="temp-${id}" name="temp" type="number" step="0.1" value="${temp}" />
        </div>
        <div class="field">
          <label class="label" for="umid-${id}">Umidade (%)</label>
          <input class="input" id="umid-${id}" name="umid" type="number" step="1" value="${umid}" />
        </div>
      </form>
    `;
  } else if (type === "registro") {
    const id   = row.dataset.id;
    const date = row.dataset.date || "";
    const desc = row.dataset.desc || "";

    left.innerHTML = `
      <form class="form-inline" onsubmit="return false;">
        <div class="field">
          <label class="label" for="data-${id}">Data</label>
          <input class="input" id="data-${id}" name="data" type="date" value="${date}" />
        </div>
        <div class="field" style="grid-column: span 3;">
          <label class="label" for="desc-${id}">Descrição</label>
          <input class="input" id="desc-${id}" name="desc" type="text" value="${escapeHtml(desc)}" />
        </div>
      </form>
    `;
  }

  actions.innerHTML = `
    <div class="actions-inline">
      <button class="btn btn--sm btn--primary js-save" type="button">Salvar</button>
      <button class="btn btn--sm btn--ghost js-cancel" type="button">Cancelar</button>
    </div>
  `;
}

function exitEditMode(row, restore) {
  if (!row) return;
  row.dataset.editing = "false";
  const left = row.querySelector(".row__left");
  const actions = row.querySelector(".row__actions");

  if (restore && row._originalLeftHTML) left.innerHTML = row._originalLeftHTML;
  if (restore && row._originalActionsHTML) actions.innerHTML = row._originalActionsHTML;

  delete row._originalLeftHTML;
  delete row._originalActionsHTML;
}

/* ======= SAVE / DELETE ======= */
function handleSave(row) {
  const type = row.dataset.type;

  if (type === "colmeia") {
    const id   = row.dataset.id;
    const nome = row.querySelector('input[name="nome"]').value.trim();
    const peso = parseFieldFloat(row.querySelector('input[name="peso"]').value);
    const temp = parseFieldFloat(row.querySelector('input[name="temp"]').value);
    const umid = parseFieldInt(row.querySelector('input[name="umid"]').value);

    if (!nome) return alert("Informe o nome da colmeia.");

    const payload = { nome, peso, temp, umid };
    apiUpdateColmeia(id, payload).then(() => {
      row.dataset.nome = nome;
      row.dataset.peso = Number.isFinite(peso) ? String(peso) : "";
      row.dataset.temp = Number.isFinite(temp) ? String(temp) : "";
      row.dataset.umid = Number.isFinite(umid) ? String(umid) : "";
      renderColmeiaRow(row);
      persistColmeiasFromDOM();
      exitEditMode(row, /*restore*/ false);
    }).catch(alert);
  }

  if (type === "registro") {
    const id   = row.dataset.id;
    const date = row.querySelector('input[name="data"]').value;
    const desc = row.querySelector('input[name="desc"]').value.trim();

    if (!date || !desc) return alert("Preencha data e descrição.");

    const payload = { date, desc };
    apiUpdateRegistro(id, payload).then(() => {
      row.dataset.date = date;
      row.dataset.desc = desc;
      renderRegistroRow(row);
      persistRegistrosFromDOM();
      exitEditMode(row, /*restore*/ false);
    }).catch(alert);
  }
}

function handleDelete(row) {
  const type = row.dataset.type;
  const id = row.dataset.id;
  const nameForMsg = type === "colmeia" ? `colmeia ${id}` : `registro ${id}`;

  if (!confirm(`Deseja realmente excluir ${nameForMsg}?`)) return;

  const api = type === "colmeia" ? apiDeleteColmeia : apiDeleteRegistro;

  api(id).then(() => {
    row.remove();
    if (type === "colmeia") persistColmeiasFromDOM();
    else persistRegistrosFromDOM();
  }).catch(alert);
}

/* ======= RENDER HELPERS ======= */
function renderColmeiaRow(row) {
  const nome = row.dataset.nome || "";
  const peso = row.dataset.peso ? Number(row.dataset.peso) : null;
  const temp = row.dataset.temp ? Number(row.dataset.temp) : null;
  const umid = row.dataset.umid ? Number(row.dataset.umid) : null;

  const nomeEl = row.querySelector(".js-colmeia-nome");
  const pesoEl = row.querySelector(".js-colmeia-peso");
  const tempEl = row.querySelector(".js-colmeia-temp");
  const umidEl = row.querySelector(".js-colmeia-umid");

  if (nomeEl) nomeEl.textContent = `Nome: ${nome}`;
  if (pesoEl) pesoEl.textContent = Number.isFinite(peso) ? `${peso.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})} kg` : "-";
  if (tempEl) tempEl.textContent = Number.isFinite(temp) ? `${temp.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})} °C` : "-";
  if (umidEl) umidEl.textContent = Number.isFinite(umid) ? `${umid}%` : "-";

  const actions = row.querySelector(".row__actions");
  actions.innerHTML = `
    <button class="btn btn--sm js-edit" type="button">Editar</button>
    <button class="btn btn--sm btn--danger js-delete" type="button">Excluir</button>
  `;
}

function renderRegistroRow(row) {
  const dateISO = row.dataset.date || "";
  const desc    = row.dataset.desc || "";

  const dataEl = row.querySelector(".js-registro-data");
  const descEl = row.querySelector(".js-registro-desc");

  if (dataEl) dataEl.textContent = formatDateBrazil(dateISO) || "-";
  if (descEl) descEl.textContent = `Registro: ${desc}`;

  const actions = row.querySelector(".row__actions");
  actions.innerHTML = `
    <button class="btn btn--sm js-edit" type="button">Editar</button>
    <button class="btn btn--sm btn--danger js-delete" type="button">Excluir</button>
  `;
}

/* ======= CRIAÇÃO DE ELEMENTOS ======= */
function createColmeiaRow({ id, nome, peso, temp, umid }) {
  const li = document.createElement("li");
  li.className = "row row--grid";
  li.dataset.type = "colmeia";
  li.dataset.id = id;
  if (nome) li.dataset.nome = nome;
  if (Number.isFinite(peso)) li.dataset.peso = String(peso);
  if (Number.isFinite(temp)) li.dataset.temp = String(temp);
  if (Number.isFinite(umid)) li.dataset.umid = String(umid);

  li.innerHTML = `
    <div class="row__left">
      <p class="row__title">${escapeHtml(id)}</p>
      <p class="row__subtitle js-colmeia-nome">Nome: ${escapeHtml(nome || "")}</p>
      <ul class="metrics">
        <li class="chip"><span class="chip__k">Peso</span><span class="chip__v js-colmeia-peso">${fmtVal(peso,"kg")}</span></li>
        <li class="chip"><span class="chip__k">Temp.</span><span class="chip__v js-colmeia-temp">${fmtVal(temp,"°C")}</span></li>
        <li class="chip"><span class="chip__k">Umid.</span><span class="chip__v js-colmeia-umid">${fmtVal(umid,"%")}</span></li>
      </ul>
    </div>
    <div class="row__actions"></div>
  `;
  renderColmeiaRow(li);
  return li;
}

function createRegistroRow({ id, date, desc }) {
  const li = document.createElement("li");
  li.className = "row row--grid";
  li.dataset.type = "registro";
  li.dataset.id = String(id);
  li.dataset.date = date;
  li.dataset.desc = desc;

  li.innerHTML = `
    <div class="row__left">
      <p class="row__subtitle js-registro-data">${formatDateBrazil(date)}</p>
      <p class="row__title js-registro-desc">Registro: ${escapeHtml(desc)}</p>
    </div>
    <div class="row__actions"></div>
  `;
  renderRegistroRow(li);
  return li;
}

/* ======= UTIL ======= */
function nextColmeiaId(list) {
  const items = list.querySelectorAll('li[data-type="colmeia"]');
  let max = 0;
  items.forEach(li => {
    const id = li.dataset.id || "";
    const n = parseInt(id.replace(/^C-/i,""), 10);
    if (!isNaN(n) && n > max) max = n;
  });
  const next = String(max + 1).padStart(2, "0");
  return `C-${next}`;
}
function nextRegistroId(list) {
  const items = list.querySelectorAll('li[data-type="registro"]');
  let max = 0;
  items.forEach(li => {
    const n = parseInt(li.dataset.id, 10);
    if (!isNaN(n) && n > max) max = n;
  });
  return String(max + 1);
}

function parseFieldFloat(v) {
  if (v == null) return NaN;
  const s = String(v).replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? NaN : n;
}
function parseFieldInt(v) {
  if (v == null) return NaN;
  const n = parseInt(String(v).trim(), 10);
  return isNaN(n) ? NaN : n;
}
function fmtVal(n, unit) {
  if (!Number.isFinite(n)) return "-";
  const txt = n.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
  return unit === "%" ? `${Math.round(n)}%` : `${txt} ${unit}`;
}
function formatDateBrazil(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d.padStart(2,"0")}/${m.padStart(2,"0")}/${y}`;
}
function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* ======= LOGOUT ======= */
function handleLogout() {
  // Limpa dados locais (ajuste conforme sua política)
  localStorage.removeItem(PERFIL_KEY);
  localStorage.removeItem(COLMEIAS_KEY);
  localStorage.removeItem(REGISTROS_KEY);
  apiLogout().finally(() => location.reload());
}

/* ======= API MOCKS (substituir por fetch do seu backend) ======= */
function apiCreateColmeia(payload){ console.log("API CREATE COLMEIA", payload); return delay(150); }
function apiUpdateColmeia(id, payload){ console.log("API UPDATE COLMEIA", id, payload); return delay(150); }
function apiDeleteColmeia(id){ console.log("API DELETE COLMEIA", id); return delay(150); }
function apiSyncColmeias(arr){ console.log("API SYNC COLMEIAS", arr); }

function apiCreateRegistro(payload){ console.log("API CREATE REGISTRO", payload); return delay(150); }
function apiUpdateRegistro(id, payload){ console.log("API UPDATE REGISTRO", id, payload); return delay(150); }
function apiDeleteRegistro(id){ console.log("API DELETE REGISTRO", id); return delay(150); }
function apiSyncRegistros(arr){ console.log("API SYNC REGISTROS", arr); }

function apiUpdatePerfil(perfil){ console.log("API UPDATE PERFIL", perfil); return delay(150); }
function apiLogout(){ console.log("API LOGOUT"); return delay(150); }

function delay(ms){ return new Promise(res => setTimeout(res, ms)); }
