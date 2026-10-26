---
'react-loqate': minor
---

**Requires Node.js 22 or newer** (`engines.node`). Build with tsdown instead of tsup (same output file names, `require('react-loqate').default` keeps working), update `clsx` to 2, drop the unused `cross-fetch` dependency and recreate the address search client when `apiUrl` changes.
