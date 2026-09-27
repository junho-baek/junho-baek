const response = await fetch('../portfolio.json');
const {projects, updated} = await response.json();
const root = document.getElementById('case-studies');
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
for (const [index, project] of projects.entries()) {
  const section = el('section', '', 'case'); section.id = project.id;
  section.append(el('p', `0${index + 1} / ${project.category}`, 'eyebrow'), el('h2', project.name), el('p', project.tagline.ko, 'lead'));
  for (const [label, key] of [['문제', 'problem'], ['설계 판단', 'decision'], ['구현한 것', 'built'], ['결과', 'outcome']]) {
    const row = el('div', '', 'case-row'); row.append(el('h3', label), el('p', project[key].ko)); section.append(row);
  }
  const flow = el('ol', '', 'flow'); for (const step of project.flow) flow.append(el('li', step)); section.append(flow);
  const details = el('div', '', 'details'); for (const item of project.detail) { const card = el('div'); card.append(el('h3', item.title), el('p', item.body)); details.append(card); } section.append(details);
  section.append(el('p', project.stack.join(' / '), 'stack'), el('p', project.boundary.ko, 'scope'));
  for (const item of project.links || []) { const link = el('a', item.label, 'repo-link'); link.href = item.url; link.target = '_blank'; link.rel = 'noreferrer'; section.append(link); }
  root.append(section);
}
document.getElementById('updated').textContent = `Updated ${updated} · 제품 경험, 구현 판단과 회고`;
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
