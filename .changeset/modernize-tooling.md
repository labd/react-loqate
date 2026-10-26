---
'react-loqate': major
---

Declare Node.js 22 or newer as the supported runtime (`engines`). Build with tsdown instead of tsup (same output file names, `require('react-loqate').default` keeps working), update `clsx` to 2, drop the unused `cross-fetch` dependency and recreate the address search client when `apiUrl` changes.
