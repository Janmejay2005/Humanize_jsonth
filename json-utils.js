// Pure JSON helpers live separately so they can be tested without a browser.
export function typeOf(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

export function humanKey(key) {
  return String(key)
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

export function countNodes(data) {
  let leaves = 0, groups = 0, lists = 0;
  function walk(value) {
    const kind = typeOf(value);
    if (kind === 'object') { groups++; Object.values(value).forEach(walk); }
    else if (kind === 'array') { lists++; value.forEach(walk); }
    else leaves++;
  }
  walk(data);
  return { leaves, groups, lists };
}
