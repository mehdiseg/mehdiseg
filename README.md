<p align="center">
  <img src="assets/banner.svg" alt="Mehdi Seghier, étudiant BTS SIO option SISR" width="100%">
</p>

<p align="center">
  <img src="assets/typing.svg" alt="Étudiant BTS SIO option SISR. Je monte des serveurs et des réseaux. Je sécurise ce que je déploie. Je construis des outils sur mesure." width="100%">
</p>

<p align="center">
  <a href="#salut-je-suis-mehdi"><b>Présentation</b></a> &nbsp;·&nbsp;
  <a href="#projet-phare"><b>Projet phare</b></a> &nbsp;·&nbsp;
  <a href="#compétences"><b>Compétences</b></a> &nbsp;·&nbsp;
  <a href="#projets"><b>Projets</b></a> &nbsp;·&nbsp;
  <a href="#activité-récente"><b>Activité</b></a> &nbsp;·&nbsp;
  <a href="https://mehdiseg.github.io"><b>Portfolio</b></a>
</p>

## Salut, je suis Mehdi

Étudiant en **BTS SIO, option SISR** (Solutions d'Infrastructure, Systèmes et Réseaux). J'aime comprendre comment les choses tournent vraiment : les réseaux, les serveurs, et les petits outils qui les rendent utilisables par tout le monde.

<p>
  <a href="https://mehdiseg.github.io"><img alt="Mon portfolio" src="https://img.shields.io/badge/Mon%20portfolio-mehdiseg.github.io-5b8cff?style=for-the-badge&logo=githubpages&logoColor=white"></a>
</p>

## Projet phare

Un **serveur web complet pour un commerce** : catalogue d'articles, comptes avec droits par rôle, import Excel, alertes de réapprovisionnement, et un accès sécurisé depuis internet, sans ouvrir aucun port sur la box.

```mermaid
flowchart LR
    A["Poste du magasin"] -->|HTTPS| T["Tailscale Funnel<br/>(certificat valide)"]
    B["Téléphone"] -->|HTTPS| T
    T --> S["Serveur Node.js<br/>écoute en local uniquement"]
    S --> D[("Base SQLite")]
    S --> K["Sauvegardes<br/>quotidiennes"]
    S --> J["Journal d'activité"]
```

<details>
<summary><b>Ce que j'y ai mis en pratique</b> (cliquer pour déplier)</summary>

<br>

**Sécurité**
- Mots de passe hachés avec scrypt, sessions par cookie `HttpOnly` et `Secure`, protection CSRF.
- Blocage temporaire après plusieurs échecs de connexion, journal de toutes les actions.
- Droits par rôle : l'employé ne voit pas les prix d'achat, côté serveur et pas seulement à l'écran.
- Création du premier administrateur protégée par un code que seul un accès au PC permet de lire.

**Réseau et systèmes**
- Publication en HTTPS via un tunnel, sans redirection de port : le serveur ne reçoit rien en direct.
- Diagnostic d'un blocage réseau réel : pare-feu Windows, profils réseau public et privé, ports.
- Démarrage automatique avec Windows par tâche planifiée, relance en cas de plantage, veille désactivée.

**Qualité**
- Neuf tests automatiques de bout en bout (connexion, droits, import Excel, sauvegarde, limitation des tentatives).
- Interface pensée d'abord pour le téléphone, testée avec un navigateur piloté par script.
- Sauvegardes automatiques chaque jour avec rotation.

</details>

## Compétences

<details>
<summary><b>Systèmes et réseaux</b></summary>

<br>

Commutation Cisco (VLAN, trunks 802.1Q, port-security, Spanning Tree), Linux Debian (nginx, MariaDB, pare-feu UFW, SSH), Windows et PowerShell (scripts, tâches planifiées, pare-feu), HTTPS et certificats, diagnostic de connectivité, tunnels et accès distant.

</details>

<details>
<summary><b>Développement web</b></summary>

<br>

JavaScript, Node.js, Express, SQLite, HTML et CSS (interfaces adaptées au mobile), API REST, import et export de fichiers Excel.

</details>

<details>
<summary><b>Méthode</b></summary>

<br>

Git et GitHub, tests automatisés, documentation pas à pas pour des utilisateurs non techniques.

</details>

## Projets

| Projet | En bref | Technos |
|---|---|---|
| [**Scanner de réseau PowerShell**](https://github.com/mehdiseg/scanner-reseau-powershell) | Découverte des appareils, ports TCP ouverts, rapport HTML et CSV | PowerShell |
| [**Labs réseau Cisco**](https://github.com/mehdiseg/labs-reseau-cisco) | TP de commutation : VLAN, trunks 802.1Q, port-security, SSH, Spanning Tree | Cisco IOS, Packet Tracer |
| [**Serveur Debian sécurisé**](https://github.com/mehdiseg/serveur-debian-lemp-securise) | Pile nginx, MariaDB, PHP-FPM et pare-feu UFW sur Debian 13 | Debian, nginx, UFW |
| [**Portfolio BTS SIO**](https://github.com/mehdiseg/mehdiseg.github.io) | Mon portfolio pour le BTS SIO SISR | HTML |
| [**Santa's Workshop**](https://github.com/mehdiseg/santas-workshop) | Outil de gestion de production de cadeaux | JavaScript |
| [**TechShop**](https://github.com/mehdiseg/techshop) | Refonte d'un site e-commerce (projet BTS SIO) | HTML |

### Outils

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-1f2430?style=flat-square&logo=javascript&logoColor=f7df1e">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-1f2430?style=flat-square&logo=nodedotjs&logoColor=6cc24a">
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-1f2430?style=flat-square&logo=sqlite&logoColor=63b3ed">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-1f2430?style=flat-square&logo=html5&logoColor=e34f26">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1f2430?style=flat-square&logo=css3&logoColor=1572b6">
  <img alt="Git" src="https://img.shields.io/badge/Git-1f2430?style=flat-square&logo=git&logoColor=f05032">
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-1f2430?style=flat-square&logo=github&logoColor=white">
  <img alt="Windows" src="https://img.shields.io/badge/Windows-1f2430?style=flat-square&logo=windows&logoColor=0078d4">
  <img alt="PowerShell" src="https://img.shields.io/badge/PowerShell-1f2430?style=flat-square&logo=powershell&logoColor=5391fe">
  <img alt="Debian" src="https://img.shields.io/badge/Debian-1f2430?style=flat-square&logo=debian&logoColor=d70a53">
  <img alt="Nginx" src="https://img.shields.io/badge/Nginx-1f2430?style=flat-square&logo=nginx&logoColor=009639">
  <img alt="Cisco" src="https://img.shields.io/badge/Cisco-1f2430?style=flat-square&logo=cisco&logoColor=1ba0d7">
  <img alt="Tailscale" src="https://img.shields.io/badge/Tailscale-1f2430?style=flat-square&logo=tailscale&logoColor=white">
</p>

## Activité récente

<!--ACTIVITE:DEBUT-->
- **8 sept.** · 1 commit dans [mehdiseg.github.io](https://github.com/mehdiseg/mehdiseg.github.io)
<!--ACTIVITE:FIN-->

<sub>Mise à jour automatiquement chaque jour, à partir de mon activité publique.</sub>

## Mes contributions

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mehdiseg/mehdiseg/output/snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mehdiseg/mehdiseg/output/snake.svg">
    <img alt="Un serpent qui mange mon graphique de contributions" src="https://raw.githubusercontent.com/mehdiseg/mehdiseg/output/snake-dark.svg" width="100%">
  </picture>
</p>

---

<p align="center"><sub>Toujours en train d'apprendre. Merci de votre visite.</sub></p>
