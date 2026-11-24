# MicWars v0.2 — Termux Quick Start

1. Extract this ZIP inside Termux home directory (never run `npm install` directly inside `/sdcard`):
   ```bash
   termux-setup-storage
   cp ~/storage/downloads/micwars-v0.2-platform.zip ~
   cd ~
   unzip micwars-v0.2-platform.zip
   cd micwars
   ```
2. Install dependencies and start the server:
   ```bash
   pkg install nodejs-lts -y
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your Android browser.
