<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Stadium application architecture
- Preserve the imported procedural stadium under `src/stadium`; derive booking seat coordinates from its layout so seat previews match actual geometry.
- Keep demo inventory rules in `src/booking/inventory.ts` and browser-session reservations in the booking provider; demo reservations must not be presented as production-safe or valid admission tickets.
- Mount Three.js through a lazy client-only boundary and render visible canvases on demand to avoid server-side browser APIs and unnecessary GPU load.
- Define leaf routes for each navigation destination and share the booking provider and site shell at the root so match and seat selection survive navigation.
- Initialize instanced seat transforms once, cache semantic seat colors, and update only changed color ranges; section and block indexes avoid full stadium scans on hover.
- Keep simulated payments browser-only with fixed sample instruments, and validate a successful demo payment against the current total before making a demo reservation; never collect real card or banking details in this flow.
