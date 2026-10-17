# Build

Browser: uploaded image → scaled canvas → HSV saturation mask → external contours → size/aspect filtering → note crops → English OCR → editable task drafts. Three equal-width x-coordinate regions assign columns; headers are not OCR-mapped. Tesseract worker is terminated and OpenCV matrices deleted.

Next.js server: optional local Ollama schema-constrained drafting; same-origin approved publication; fixed GitHub host and configured repository; Zod validation; label preflight; sequential issue creation with durable write-ahead ledger. Tokens never enter browser code. The publication route does not trust model-provided IDs, labels, URLs or repository destinations.

Tests cover validation, column boundaries, status labels, origin rejection, duplicate retries and uncertain request outcomes using a mock GitHub transport. They never contact GitHub. Build and browser/OCR validation should be recorded with the release. Live Ollama and real GitHub publication must be reported separately from mocks. No accuracy benchmark or production reliability claim is made.

Scope: clear handwriting or printed notes, bright distinct note regions, a cropped straight-on board, 30-note maximum. Perspective correction, arbitrary column layouts, automatic assignments, Projects sync, handwriting guarantees and photo deduplication are not implemented.

Validation on 17 October 2026: five core tests passed; Next.js production build passed; Chromium uploaded the generated eight-note board and extracted all eight titles correctly, with 3 To Do, 3 In Progress and 2 Done. Approval was disabled without GitHub configuration. Desktop and 390px mobile checks passed with no horizontal overflow and zero browser errors. This validates printed sample notes, not arbitrary handwriting/photos. Live GitHub publication has not yet been exercised.

A local Ollama llama3.2:3b structured-output smoke test exceeded its 90-second timeout. Generation with that model is therefore not marked verified. The application preserves OCR edits on Ollama failure; no model download is required to use OCR/manual review/export.

A subsequent local llama3.2:1b smoke test returned HTTP 200 and valid title/body JSON using the same structured-output schema. Use `OLLAMA_MODEL=llama3.2:1b` if installed and preferred on smaller hardware; model wording must still be reviewed. This confirms the local Ollama protocol path, not the quality of arbitrary task drafts. GitHub CI passed for commit c8395ad.
