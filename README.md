# STICKYSHIP

**I photographed a whiteboard. AI turned it into a working project backlog.**

Next.js starter: OpenCV.js finds coloured notes, Tesseract.js reads each crop, local Ollama optionally drafts structured titles/descriptions, and GitHub REST creates actual issues **only after review and destination approval**.

## Quick start

Install Node.js 22.13+ and run:

```sh
npm ci
node scripts/assets.mjs
npm run dev
```

Open http://127.0.0.1:3022. Download the eight-note sample board from the left panel, then upload it to exercise actual detection and OCR. There are no hardcoded OCR results. The first OCR run downloads the Tesseract worker/language assets and needs internet. Your photo is processed in your browser, not uploaded to a cloud vision service. Use a straight-on crop, bright separated notes on white, and three equal-width columns ordered **To Do / In Progress / Done**. Position assigns columns; this POC does not recognize arbitrary board geometry or headings. Clear print is most reliable; handwriting varies. Add missed notes manually and correct/remove false detections.

## Local AI (optional)

Install [Ollama](https://ollama.com/), run `ollama pull qwen2.5:3b` and start its local service on port 11434. Copy `.env.example` to `.env.local`; change `OLLAMA_MODEL` if using another installed model. Click **Structure with Ollama**. The server sends only OCR text to the fixed local `/api/chat` endpoint, with a JSON schema in `format`, `stream:false` and temperature zero. Responses are validated with Zod. Failure preserves original OCR drafts. Manual review and JSON export work without Ollama. Model download size, hardware requirements and runtime vary.

## GitHub setup

1. Choose a test repository with Issues enabled. Create these exact repository labels: `stickyship`, `status:todo`, `status:in-progress`, `status:done`. Label colours are your choice. This starter checks required labels before publication; it does not silently create labels.
2. Create a fine-grained GitHub token scoped **only to that repository**, with **Issues: read and write** and standard metadata access. Put it in `GITHUB_TOKEN` in `.env.local`, and set `GITHUB_REPOSITORY=owner/repo`. No `NEXT_PUBLIC_` token. Restart Next.js after configuration changes. Do not paste tokens into chat or commit them.
3. Review titles, descriptions and columns, then type the exact repository name into the approval field. The button explicitly states how many real issues it will create. This uploads the approved text to GitHub; it does not upload the photo.
4. Newly created issue links appear beside the original board. Status is represented by labels. **All issues are created open, including Done notes**; no issues are closed, and no GitHub Projects board is modified.

## Retry behavior and data

AI proposes the task title; descriptions preserve the submitted OCR/review text instead of accepting model-invented requirements. You can edit both before approval. Small models can still produce poor titles, so review them.

Each note has a UUID. `data/` stores a durable per-repository/note ledger before sending an issue request. Repeating the same reviewed note reuses its result. An uncertain network outcome stops the batch and is never blindly retried; inspect GitHub for the hidden `stickyship:` body marker before reconciling the matching ledger file. Do not delete uncertain entries until you verify no issue exists. Editing an already published note does not update its issue. Re-uploading a photo creates new UUIDs, so this is **not global duplicate detection across photographs**. Keep `data/` when restarting. Run one local server process; multi-process/serverless deployment is unsupported.

Board images and review edits are browser memory only and reset on refresh. Export JSON before leaving. The ledger stores issue metadata and links locally. Token is server-only. The app binds loopback; do not expose it publicly or through a tunnel. Same-origin checks protect mutations, but this is a local single-user POC, not a hosted multi-tenant service.

## Checks

```sh
npm test
npm run build
```

See BUILD.md for architecture and validation limits. A live issue creation test requires explicit approval of the exact batch/repository. No issues are created by tests. Production start after build: `npm start`.

## Official integration references

- [GitHub Create an issue](https://docs.github.com/en/rest/issues/issues#create-an-issue): POST `/repos/{owner}/{repo}/issues`, title, body and existing labels. API version header `2026-03-10`.
- [Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs): JSON schema in `format`; local service, not Ollama cloud.
- [Tesseract.js](https://github.com/naptha/tesseract.js): worker creation, image recognition and termination.
- [OpenCV.js contours](https://docs.opencv.org/4.x/d5/daa/tutorial_js_contours_begin.html): contour detection and bounding rectangles.

Instagram files: `marketing/instagram-4x5`, exactly 1080×1350. Caption and upload notes included. This project is an independent AI Concept Lab experiment.
