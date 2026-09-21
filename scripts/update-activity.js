'use strict';
// Met à jour la section « Activité récente » du README à partir des événements publics du compte.
// Aucune dépendance : uniquement Node et l'API GitHub.

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

async function events() {
  const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100`, {
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

function describe(e) {
  const repo = e.repo.name;
  if (repo.toLowerCase() === `${user}/${user}`.toLowerCase()) return null;
  const link = `[${escapeMd(repo.split('/')[1])}](https://github.com/${repo})`;
  const p = e.payload || {};

  switch (e.type) {
    case 'PushEvent': {
      const n = p.distinct_size ?? p.size ?? (p.commits ? p.commits.length : 1);
      const last = p.commits && p.commits.length ? p.commits[p.commits.length - 1].message.split('\n')[0] : '';
      const text = `${n} commit${n > 1 ? 's' : ''} dans ${link}`;
      return { key: `push:${repo}:${e.created_at.slice(0, 10)}`, text: last ? `${text} : ${escapeMd(short(last, 70))}` : text };
    }
    case 'CreateEvent':
      return p.ref_type === 'repository' ? { key: `create:${repo}`, text: `Nouveau dépôt ${link}` } : null;
    case 'ReleaseEvent':
      return { key: `release:${repo}:${p.release?.tag_name}`, text: `Version ${escapeMd(p.release?.tag_name || '')} de ${link}` };
    case 'PullRequestEvent':
      return p.action === 'opened' ? { key: `pr:${repo}:${p.number}`, text: `Pull request dans ${link}` } : null;
    case 'IssuesEvent':
      return p.action === 'opened' ? { key: `issue:${repo}:${p.issue?.number}`, text: `Ticket ouvert dans ${link}` } : null;
    default:
      return null;
  }
}

(async () => {
  const seen = new Set();
  const lines = [];
  for (const e of await events()) {
    const d = describe(e);
    if (!d || seen.has(d.key)) continue;
    seen.add(d.key);
    lines.push(`- **${dateFr(e.created_at)}** · ${d.text}`);
    if (lines.length === MAX) break;
  }

  const block = lines.length ? lines.join('\n') : '_Pas d\'activité publique récente._';
  const readme = fs.readFileSync(README, 'utf8');
  const i = readme.indexOf(START);
  const j = readme.indexOf(END);
  if (i === -1 || j === -1 || j < i) throw new Error('Repères ACTIVITE:DEBUT / ACTIVITE:FIN introuvables dans le README');

  const next = readme.slice(0, i + START.length) + '\n' + block + '\n' + readme.slice(j);
  if (next !== readme) fs.writeFileSync(README, next);
  console.log(lines.length ? lines.join('\n') : '(aucune activité)');
})().catch((err) => { console.error(err.message); process.exit(1); });
