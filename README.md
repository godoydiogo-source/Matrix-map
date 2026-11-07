# Matrix-map

## MCP servers

This project ships a `.mcp.json` that registers the **Nudgile** MCP server
(`https://api.nudgile.com/mcp`, HTTP transport) for Claude Code.

The personal access token is never committed. Export it before starting Claude Code:

```bash
export NUDGILE_PAT="pat_..."
claude
```

Claude Code expands `${NUDGILE_PAT}` from your environment when it loads `.mcp.json`.
Equivalent one-off setup without the project file:

```bash
claude mcp add --transport http nudgile https://api.nudgile.com/mcp \
  --header "Authorization: Bearer $NUDGILE_PAT"
```
