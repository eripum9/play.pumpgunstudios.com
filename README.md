# Pumpgun SMP landing page

Buildless HTML/CSS/JavaScript for `https://play.pumpgunstudios.com/`, hosted on GitHub Pages.
The playful OOPS page presents the Minecraft Java server address and a copy-IP button.
It does not claim that the server is currently open or query a third-party status service.

## Local preview

Serve this folder with a static HTTP server, for example `python -m http.server 4176 --bind 127.0.0.1`.
Open `http://127.0.0.1:4176/`. No package installation or build step is needed.
`node --check app.js` checks JavaScript syntax. Check desktop/mobile layout and both clipboard outcomes.

## GitHub Pages

Publish the `main` branch, root directory, with `.nojekyll`. This is a separate site from the existing
`pumpgunstudios.com` project. Add the custom domain only with the Minecraft routing below in place.
The site uses relative asset paths, so the initial GitHub project URL also works.

## Sharing the hostname with Minecraft

The browser and Minecraft use different DNS routing. Required records:

| Type | Host | Value |
| --- | --- | --- |
| A | `mc.pumpgunstudios.com` | The existing Minecraft server IPv4 address |
| SRV | `_minecraft._tcp.play.pumpgunstudios.com` | Priority 0, weight 0, port 25565, target `mc.pumpgunstudios.com` |
| CNAME | `play.pumpgunstudios.com` | `eripum9.github.io` |

Create and verify `mc` and the SRV record before replacing the existing `play` A record with the web CNAME.
The SRV target must keep resolving directly to the Minecraft server; never point it back at the web hostname.
If the game server's public IP changes, update the `mc` A record. Players should enter the hostname without
an explicit port. Minecraft Java 26.3's native `ServerRedirectHandler` was inspected to verify SRV lookup on
the default 25565 port. Browser requests go to GitHub Pages; no Minecraft server plugin changes are required.

Official references: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
and [STRATO DNS/SRV management](https://www.strato.de/faq/domains/wie-kann-ich-bei-strato-meine-dns-eintraege-verwalten/).

## Artwork and font

- `assets/launch.png`: the owner's original Blender launch artwork, retained without overwriting its source.
- `assets/scene-clean.png`: an imagegen edit removing the original left-side lettering for live HTML text.
  Edit brief: remove all existing left-side titles, the square mark and address; fill with the existing orange;
  preserve the yellow-hoodie character, pose, tree, grass island and framing; add no new lettering.
- Page typography uses self-hosted [Monocraft v4.2.1](https://github.com/IdreesInc/Monocraft), a Minecraft-inspired
  font. Its SIL Open Font License and copyright notice are included in `assets/fonts/OFL.txt`.
- JavaScript copies only the visible address. If clipboard access fails, it selects the readonly address and
  provides manual-copy instructions. No analytics, remote fonts, cookies or application backend are added.

Changes to this site do not start, stop, open, or modify the Minecraft server. Maintenance access is managed separately.
