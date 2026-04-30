'use strict';

// Estado central da aplicação
let products = [];
let currentSearch = '';
let currentSort = 'date';

// Seletores
const form          = document.getElementById('product-form');
const inputName     = document.getElementById('product-name');
const inputCategory = document.getElementById('product-category');
const inputPrice    = document.getElementById('product-price');
const formError     = document.getElementById('form-error');
const productGrid   = document.getElementById('product-grid');
const emptyState    = document.getElementById('empty-state');
const itemCount     = document.getElementById('item-count');
const metricTotal   = document.getElementById('metric-total');
const metricAvg     = document.getElementById('metric-avg');
const metricMax     = document.getElementById('metric-max');
const metricMin     = document.getElementById('metric-min');
const categoryList  = document.getElementById('categories');
const searchInput   = document.getElementById('search-input');
const sortSelect    = document.getElementById('sort-select');

// Formata número como BRL
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escapeHTML(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// Valida campos antes de adicionar
function validateForm() {
  const name     = inputName.value.trim();
  const category = inputCategory.value;
  const price    = parseFloat(inputPrice.value);

  if (!name || name.length < 2) return { ok: false, msg: 'Informe um nome válido (mín. 2 caracteres).' };
  if (!category)                  return { ok: false, msg: 'Selecione uma categoria.' };
  if (isNaN(price) || price < 0)  return { ok: false, msg: 'Informe um preço válido (≥ 0).' };

  return { ok: true, name, category, price };
}

function addProduct(name, category, price) {
  products.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`, name, category, price, ts: Date.now() });
  refresh();
}

function removeProduct(id) {
  const card = productGrid.querySelector(`[data-id="${id}"]`);
  if (card) {
    card.classList.add('removing');
    // Remove do array após animação de saída
    card.addEventListener('animationend', () => {
      products = products.filter(p => p.id !== id);
      refresh();
    }, { once: true });
  }
}

// Retorna lista filtrada e ordenada
function getVisible() {
  let list = [...products];
  if (currentSearch) {
    const t = currentSearch.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t));
  }
  const sorters = {
    date:       (a, b) => b.ts - a.ts,
    name:       (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
    'price-asc':(a, b) => a.price - b.price,
    'price-desc':(a, b) => b.price - a.price,
  };
  return list.sort(sorters[currentSort] || sorters.date);
}

// Recalcula e atualiza os valores do painel de métricas
function renderMetrics() {
  const total = products.reduce((acc, p) => acc + p.price, 0);
  const avg   = products.length ? total / products.length : 0;
  const max   = products.length ? products.reduce((a, b) => b.price > a.price ? b : a) : null;
  const min   = products.length ? products.reduce((a, b) => b.price < a.price ? b : a) : null;

  [metricTotal, metricAvg].forEach(el => {
    el.classList.remove('metric-pop');
    void el.offsetWidth;
    el.classList.add('metric-pop');
  });

  metricTotal.textContent = formatCurrency(total);
  metricAvg.textContent   = formatCurrency(avg);
  metricMax.textContent   = max ? formatCurrency(max.price) : '—';
  metricMin.textContent   = min ? formatCurrency(min.price) : '—';
  itemCount.textContent   = products.length;

  // Pílulas de categoria
  const byCategory = products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {});
  const entries = Object.entries(byCategory);
  categoryList.innerHTML = entries.length
    ? entries.sort((a,b) => b[1]-a[1]).map(([cat, n]) =>
        `<span class="cat-tag">${cat}<span class="cat-tag-count">${n}</span></span>`
      ).join('')
    : '<p class="cat-empty">Nenhuma categoria ainda</p>';
}

// Gera o HTML de um card de produto
function createCard(product) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.dataset.id = product.id;
  div.innerHTML = `
    <p class="product-card-name">${escapeHTML(product.name)}</p>
    <p class="product-card-category">${escapeHTML(product.category)}</p>
    <div class="product-card-footer">
      <span class="product-card-price">${formatCurrency(product.price)}</span>
      <button class="btn-delete" data-id="${product.id}" aria-label="Remover ${escapeHTML(product.name)}">✕</button>
    </div>
  `;
  return div;
}

function renderList() {
  const visible = getVisible();
  const hasItems = products.length > 0;

  emptyState.classList.toggle('visible', !hasItems || visible.length === 0);
  productGrid.innerHTML = '';
  visible.forEach(p => productGrid.appendChild(createCard(p)));
}

// Ponto único de atualização: sempre chame após mudar o array
function refresh() {
  renderList();
  renderMetrics();
}

// Intercepta envio do form para evitar reload da página
form.addEventListener('submit', e => {
  e.preventDefault();
  const result = validateForm();
  if (!result.ok) {
    formError.textContent = result.msg;
    setTimeout(() => { formError.textContent = ''; }, 3000);
    return;
  }
  addProduct(result.name, result.category, result.price);
  form.reset();
  inputName.focus();
});

// Delegação de eventos para deletar sem listeners individuais
productGrid.addEventListener('click', e => {
  const btn = e.target.closest('.btn-delete');
  if (btn) removeProduct(btn.dataset.id);
});

searchInput.addEventListener('input', e => { currentSearch = e.target.value.trim(); renderList(); });
sortSelect.addEventListener('change', e => { currentSort = e.target.value; renderList(); });

// Dados de exemplo para demonstração
(function init() {
  [
    { name: 'Café Especial Arábica 250g', category: 'Alimentos',   price: 38.90 },
    { name: 'Headphone Bluetooth Pro',    category: 'Eletrônicos', price: 289.00 },
    { name: 'Camiseta Linho Premium',     category: 'Vestuário',   price: 149.90 },
    { name: 'Vinho Tinto Reserva 750ml',  category: 'Bebidas',     price: 89.50  },
  ].forEach((item, i) => products.push({ id: `demo-${i}`, ...item, ts: Date.now() - i * 1000 }));
  refresh();
})();