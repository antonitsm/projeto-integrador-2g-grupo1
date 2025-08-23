// js/conta.js
// Editar / Excluir / Adicionar (colmeias e registros) com mocks de API.
// Troque api* por fetch() para integrar com seu backend.

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body;

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
  if (formAddColmeia) {
    formAddColmeia.addEventListener("submit", handleAddColmeia);
  }

  // Submit de adicionar registro
  const formAddRegistro = document.getElementById("form-add-registro");
  if (formAddRegistro) {
    formAddRegistro.addEventListener("submit", handleAddRegistro);
  }

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
});

/* ======= ADD ======= */
async function handleAddColmeia(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const details = form.closest(".accordion__item");
  const list = document.getElementById("lista-colmeias");

  // Leitura dos campos
  const idRaw   = form.querySelector('input[name="id"]').value.trim();
  const nome    = form.querySelector('input[name="nome"]').value.trim();
  const peso    = parseFieldFloat(form.querySelector('input[name="peso"]').value);
  const temp    = parseFieldFloat(form.querySelector('input[name="temp"]').value);
  const umid    = parseFieldInt(form.querySelector('input[name="umid"]').value);

  // Geração de ID se vazio
  const id = idRaw || nextColmeiaId(list);

  if (!nome) return alert("Informe o nome da colmeia.");

  const payload = { id, nome, peso, temp, umid };

  await apiCreateColmeia(payload);
  const li = createColmeiaRow(payload);
  list.appendChild(li);

  if (details) details.open = true; // garante visualização
  form.reset();
  form.classList.add("hidden");
}

async function handleAddRegistro(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const details = form.closest(".accordion__item");
  const list = document.getElementById("lista-registros");

  const date = form.querySelector('input[name="data"]').value; // yyyy-mm-dd
  const desc = form.querySelector('input[name="desc"]').value.trim();

  if (!date || !desc) return alert("Preencha data e descrição.");

  const id = nextRegistroId(list);
  const payload = { id, date, desc };

  await apiCreateRegistro(payload);
  const li = createRegistroRow(payload);
  list.appendChild(li);

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

  api(id).then(() => row.remove()).catch(alert);
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

/* Criação de elementos */
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
    <div class="row__actions">
      <button class="btn btn--sm js-edit" type="button">Editar</button>
      <button class="btn btn--sm btn--danger js-delete" type="button">Excluir</button>
    </div>
  `;
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
    <div class="row__actions">
      <button class="btn btn--sm js-edit" type="button">Editar</button>
      <button class="btn btn--sm btn--danger js-delete" type="button">Excluir</button>
    </div>
  `;
  return li;
}

/* ======= UTIL ======= */
function nextColmeiaId(list) {
  // procura maior número em IDs "C-XX"
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

/* ======= API MOCKS ======= */
// Substitua por fetch() do seu backend.
function apiCreateColmeia(payload){ console.log("API CREATE COLMEIA", payload); return delay(250); }
function apiUpdateColmeia(id, payload){ console.log("API UPDATE COLMEIA", id, payload); return delay(250); }
function apiDeleteColmeia(id){ console.log("API DELETE COLMEIA", id); return delay(250); }

function apiCreateRegistro(payload){ console.log("API CREATE REGISTRO", payload); return delay(250); }
function apiUpdateRegistro(id, payload){ console.log("API UPDATE REGISTRO", id, payload); return delay(250); }
function apiDeleteRegistro(id){ console.log("API DELETE REGISTRO", id); return delay(250); }

function delay(ms){ return new Promise(res => setTimeout(res, ms)); }

