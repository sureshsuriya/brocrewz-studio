# BroCrewz Studio Asset Manifest

This directory contains all the static imagery required for the BroCrewz Studio premium website. 
Please ensure you name your files **exactly** as specified below and place them in the corresponding folders.

## Folder Structure & Required Filenames

### `/logo`
- `logo-gold.svg` or `logo-gold.png` (The primary BroCrewz Studio logo in Gold)
- `logo-white.svg` or `logo-white.png` (The secondary BroCrewz Studio logo in White)

### `/team`
*Note: All team photos should have backgrounds professionally removed and replaced with a premium Black & Gold gradient as requested.*
- `lenin.png`
- `vethams.png`
- `jerry.png`
- `sam.png`
- `sujith.png`

### `/portfolio`
- `thumbnail-1.jpg` through `thumbnail-6.jpg` (High-CTR thumbnail examples)
- `video-preview-1.mp4` through `video-preview-4.mp4` (Short cinematic video reels for hover previews)
- `poster-1.jpg`

### `/pricing`
- `service-flyer.jpg` (The original reference flyer or a newly branded pricing graphic)

### `/backgrounds`
- `hero-bg.jpg` (A cinematic 4K background fallback if 3D WebGL fails to load)
- `noise.png` (A subtle noise texture for glassmorphism overlays)

### `/icons`
- `instagram-qr.png` (Your Instagram QR Code graphic)

## Optimization Guidelines
- **Format:** Use `.webp` where possible for maximum Lighthouse performance, or highly compressed `.png`/`.jpg`.
- **Size:** Keep team photos under 200KB. Keep video previews under 2MB (and mute them).
- **Resolution:** Team photos should be at least `600x600`. Backgrounds should be `1920x1080`.
