const response = await fetch('../portfolio.json');
const {projects, updated} = await response.json();
const root = document.getElementById('case-studies');
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
for (const [index, project] of projects.entries()) {
  const section = el('section', '', 'case'); section.id = project.id;
  section.append(el('p', `0${index + 1} / ${project.category}`, 'eyebrow'), el('h2', project.name), el('p', project.tagline.ko, 'lead'));
  for (const [label, key] of [['문제', 'problem'], ['설계 판단', 'decision'], ['구현한 것', 'built']]) {
    const row = el('div', '', 'case-row'); row.append(el('h3', label), el('p', project[key].ko)); section.append(row);
  }
  const flow = el('ol', '', 'flow'); for (const step of project.flow) flow.append(el('li', step)); section.append(flow);
  const details = el('div', '', 'details'); for (const item of project.detail) { const card = el('div'); card.append(el('h3', item.title), el('p', item.body)); details.append(card); } section.append(details);
  section.append(el('p', project.stack.join(' / '), 'stack'), el('p', `현재 범위: ${project.boundary.ko}`, 'scope'));
  const source = el('a', 'Repository ↗', 'repo-link'); source.href = `https://github.com/junho-baek/${project.repo}`; source.target = '_blank'; source.rel = 'noreferrer'; section.append(source);
  const evidence = el('details'); evidence.append(el('summary', `구현 근거 · ${project.sha.slice(0,7)}`));
  const list = el('ul'); for (const file of project.sources) { const item = el('li'); const link = el('a', file); link.href = `https://github.com/junho-baek/${project.repo}/blob/${project.sha}/${file}`; item.append(link); list.append(item); } evidence.append(list); section.append(evidence); root.append(section);
}
document.getElementById('updated').textContent = `Updated ${updated} · 공개 코드와 README 기준`;
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
