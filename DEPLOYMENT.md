# Deployment record

Published on 28 October 2026 (Europe/Berlin).

- Site: https://play.pumpgunstudios.com/
- Repository: https://github.com/eripum9/play.pumpgunstudios.com
- GitHub Pages: `main`, repository root; HTTPS certificate approved and HTTPS enforcement enabled.
- The existing `pumpgunstudios.com` website and Minecraft server files were not modified.

## DNS routing

| Record | Value | Purpose |
| --- | --- | --- |
| `play.pumpgunstudios.com A` | `185.199.108.153` | Website |
| `mc.pumpgunstudios.com A` | `94.114.200.103` | Existing Minecraft server |
| `_minecraft._tcp.play.pumpgunstudios.com SRV` | `0 0 25565 mc.pumpgunstudios.com.` | Minecraft connection using the advertised play address |

Players continue entering **play.pumpgunstudios.com** without a port. The `mc` hostname is a DNS routing target,
not a new server or a replacement advertised address. If the server's public IP changes, update the `mc` A record.
STRATO's CNAME replacement control was avoided because it warned that it would erase other subdomain settings.

## Verification

- Both authoritative nameservers (`shades10.rzone.de`, `docks06.rzone.de`) returned the web A and Minecraft SRV records.
- Cloudflare's public resolver returned the expected web and Minecraft routing records.
- A read-only Java server-list status request to the Minecraft target returned `Paper 26.3`, protocol `777`.
  This verifies reachability and status, not authenticated login or gameplay.
- Public HTTPS returned HTTP 200 with the OOPS page, using normal certificate validation.
- Local desktop and 390-pixel mobile layouts were inspected; no mobile horizontal overflow was present.
- A real copy-button click followed by pasting into a test textarea produced `play.pumpgunstudios.com`.
- JavaScript syntax and local asset paths were checked. The manual-copy failure path was reviewed, not forced in a test.

The original launch artwork remains in `assets/launch.png`; the edited scene is separate.
Temporary preview and diagnostic files are ignored under `.qa/` and are not published.
