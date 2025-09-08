---
"react-loqate": minor
---

Replace @mui/base with native React implementations

Removes the @mui/base dependency by implementing native React versions of Portal and ClickAwayListener components. This reduces bundle size and eliminates external dependencies while maintaining full functionality and compatibility.

- Created native Portal component using React's createPortal
- Created native ClickAwayListener component using DOM event listeners
- Added comprehensive test coverage for both new utility components
- All existing functionality preserved with no breaking changes