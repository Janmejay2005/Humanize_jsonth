import { typeOf, humanKey, escapeHtml, countNodes } from './json-utils.js';

const input = document.getElementById('input');
const output = document.getElementById('output');
const stats = document.getElementById('stats');
const divider = document.getElementById('divider');
const main = document.getElementById('main');
const copyBtn = document.getElementById('copyBtn');
const sampleBtn = document.getElementById('sampleBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');

/* ---------- rendering logic ---------- */

function renderValue(v){
  const t = typeOf(v);
  if(t === 'string') return `<span class="val-string">${escapeHtml(v)}</span>`;
  if(t === 'number') return `<span class="val-number">${v}</span>`;
  if(t === 'boolean') return `<span class="val-bool">${v}</span>`;
  if(t === 'null') return `<span class="val-null">nothing set</span>`;
  return '';
}

function describeCollection(t, v){
  if(t === 'array') return `<span class="type-tag">list · ${v.length} item${v.length===1?'':'s'}</span>`;
  if(t === 'object') return `<span class="type-tag">group · ${Object.keys(v).length} field${Object.keys(v).length===1?'':'s'}</span>`;
}

function renderNode(key, value, depth){
  const t = typeOf(value);
  let html = '';

  if(t === 'object' || t === 'array'){
    html += `<div class="row"><span class="key">${key !== null ? escapeHtml(humanKey(key)) : ''}</span>${describeCollection(t, value)}</div>`;
    html += `<div class="indent">`;
    if(t === 'array'){
      value.forEach((item, i) => {
        html += renderNode(`item ${i+1}`, item, depth+1);
      });
      if(value.length === 0) html += `<div class="row"><span class="val-null">empty list</span></div>`;
    } else {
      const entries = Object.entries(value);
      entries.forEach(([k, v]) => {
        html += renderNode(k, v, depth+1);
      });
      if(entries.length === 0) html += `<div class="row"><span class="val-null">empty group</span></div>`;
    }
    html += `</div>`;
  } else {
    html += `<div class="row"><span class="key">${key === null ? 'value' : escapeHtml(humanKey(key))}</span>${renderValue(value)}</div>`;
  }
  return html;
}

function buildSummary(data){
  const t = typeOf(data);
  let s = `<div class="section-title">In one line</div>`;
  if(t === 'object'){
    const keys = Object.keys(data);
    s += `<div class="sentence">This is a record with <span class="n">${keys.length}</span> field${keys.length===1?'':'s'}: <b>${keys.map(k => escapeHtml(humanKey(k))).join('</b>, <b>')}</b>.</div>`;
  } else if(t === 'array'){
    s += `<div class="sentence">This is a list of <span class="n">${data.length}</span> item${data.length===1?'':'s'}.</div>`;
  } else {
    s += `<div class="sentence">This is a single ${t} value: ${renderValue(data)}.</div>`;
  }
  return s;
}

function render(){
  const raw = input.value.trim();
  if(!raw){
    output.innerHTML = `<span class="empty-msg">Nothing to translate yet — paste some JSON on the left.</span>`;
    stats.innerHTML = '';
    divider.classList.remove('live');
    return;
  }
  let data;
  try{
    data = JSON.parse(raw);
  } catch(e){
    output.innerHTML = `<div class="error-box">Can't parse this yet.<br><br>${escapeHtml(e.message)}</div>`;
    stats.innerHTML = `<span>invalid json</span>`;
    divider.classList.remove('live');
    return;
  }
  divider.classList.add('live');
  const {leaves, groups, lists} = countNodes(data);
  stats.innerHTML = `<span><b>${groups}</b> groups</span><span><b>${lists}</b> lists</span><span><b>${leaves}</b> values</span>`;

  let html = buildSummary(data);
  html += `<div class="section-title">Full breakdown</div>`;
  html += renderNode(null, data, 0);
  output.innerHTML = html;
}

input.addEventListener('input', render);

copyBtn.addEventListener('click', () => {
  const text = output.innerText;
  if (!navigator.clipboard) {
    copyBtn.textContent = 'clipboard unavailable';
    setTimeout(() => copyBtn.textContent = 'Copy summary', 1600);
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'copied';
    setTimeout(() => copyBtn.textContent = 'Copy summary', 1200);
  }).catch(() => {
    copyBtn.textContent = 'copy failed';
    setTimeout(() => copyBtn.textContent = 'Copy summary', 1600);
  });
});

sampleBtn.addEventListener('click', () => {
  input.value = JSON.stringify({
    name: "Janmejay",
    role: "Vice President, Odyssey",
    university: "LNCT University, Bhopal",
    active: true,
    graduationYear: 2027,
    skills: ["Python", "React", "FastAPI", "TensorRT-LLM"],
    currentProjects: [
      { title: "Mr. Grip", type: "AI voice assistant", status: "in progress" },
      { title: "Cleanytics", type: "data cleaning platform", status: "in progress" }
    ],
    mentor: null
  }, null, 2);
  render();
});

/* ---------- file upload ---------- */

function readJsonFile(file) {
  if (!file || (file.type !== 'application/json' && !file.name.toLowerCase().endsWith('.json'))) {
    output.innerHTML = '<div class="error-box">Please choose a JSON file.</div>';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    input.value = e.target.result;
    render();
  };
  reader.onerror = () => {
    output.innerHTML = '<div class="error-box">The file could not be read.</div>';
  };
  reader.readAsText(file);
  fileInput.value = '';
}

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    readJsonFile(e.target.files[0]);
  }
});

/* ---------- drag and drop ---------- */

input.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  input.classList.add('drag-over');
});

input.addEventListener('dragleave', (e) => {
  e.preventDefault();
  e.stopPropagation();
  input.classList.remove('drag-over');
});

input.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  input.classList.remove('drag-over');
  if (e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    readJsonFile(file);
  }
});

/* ---------- draggable divider (resize the two panes) ---------- */

let dragging = false;

function isVertical(){
  return window.matchMedia('(max-width:760px)').matches;
}

function onDragStart(e){
  dragging = true;
  divider.classList.add('dragging');
  document.body.style.cursor = isVertical() ? 'row-resize' : 'col-resize';
  document.body.style.userSelect = 'none';
}

function onDragMove(e){
  if(!dragging) return;
  const point = e.touches ? e.touches[0] : e;
  const rect = main.getBoundingClientRect();

  if(isVertical()){
    let pct = ((point.clientY - rect.top) / rect.height) * 100;
    pct = Math.min(80, Math.max(20, pct));
    main.style.gridTemplateColumns = '1fr';
    main.style.gridTemplateRows = `${pct}fr 14px ${100-pct}fr`;
  } else {
    let pct = ((point.clientX - rect.left) / rect.width) * 100;
    pct = Math.min(75, Math.max(20, pct));
    main.style.gridTemplateRows = '';
    main.style.gridTemplateColumns = `${pct}fr 14px ${100-pct}fr`;
  }
}

function onDragEnd(){
  if(!dragging) return;
  dragging = false;
  divider.classList.remove('dragging');
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
}

divider.addEventListener('mousedown', onDragStart);
divider.addEventListener('touchstart', onDragStart, {passive:true});
window.addEventListener('mousemove', onDragMove);
window.addEventListener('touchmove', onDragMove, {passive:true});
window.addEventListener('mouseup', onDragEnd);
window.addEventListener('touchend', onDragEnd);

render();
