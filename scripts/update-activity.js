'use strict';
// Met à jour la section « Activité récente » du README avec les dépôts publics les plus récemment modifiés.
// On lit la liste des dépôts (à jour immédiatement) plutôt que le flux d'événements de GitHub, qui a
// plusieurs heures de retard. Aucune dépendance : uniquement Node et l'API GitHub.

const fs = require('node:fs');
const path = require('node:path');

const user = process.env.GH_USER;
const token = process.env.GH_TOKEN;
if (!user) throw new Error('GH_USER manquant');

const README = path.join(__dirname, '..', 'README.md');
const START = '<!--ACTIVITE:DEBUT-->';
const END = '<!--ACTIVITE:FIN-->';
const MAX = 5;

const escapeMd = (s) => s.replace(/[\\`*_{}\[\]<>()#+!|~]/g, '\\$&');
const short = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const dateFr = (iso) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', timeZone: 'Europe/Paris' });

async function repos() {
  const res = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&direction=desc&per_page=30&type=owner`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'profil-readme',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`API GitHub : HTTP ${res.status}`);
  return res.json();
}

(async () => {
  const lines = (await repos())
    .filter((r) => !r.fork && !r.archived && !r.private && r.name.toLowerCase() !== user.toLowerCase())
    .slice(0, MAX)
    .map((r) => {
      const description = r.description ? ` : ${escapeMd(short(r.description, 85))}` : '';
      return `- **${dateFr(r.pushed_at)}** · [${escapeMd(r.name)}](${r.html_url})${description}`;
    });

  const block = lines.length ? lines.join('\n') : '_Pas d\'activité publique récente._';
  const readme = fs.readFileSync(README, 'utf8');
  const i = readme.indexOf(START);
  const j = readme.indexOf(END);
  if (i === -1 || j === -1 || j < i) throw new Error('Repères ACTIVITE:DEBUT / ACTIVITE:FIN introuvables dans le README');

  const next = readme.slice(0, i + START.length) + '\n' + block + '\n' + readme.slice(j);
  if (next !== readme) fs.writeFileSync(README, next);
  console.log(lines.length ? lines.join('\n') : '(aucune activité)');
})().catch((err) => { console.error(err.message); process.exit(1); });
