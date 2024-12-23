# modules
![Last Update](https://img.shields.io/badge/last_update-23_Dec_2024-blue)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
[![Join Telegram Channel](https://img.shields.io/badge/join_channel-telegram-blue)](https://t.me/pontushub)

An open-source Magisk modules and root/FOSS app store

This is my first project which uses `bun`.

Modules does **NOT** host the modules themselves, and only provides downloads to third-party sources. It's database is open source, and is the `apps.json` and `modules.json` files.

Unless a module is labeled `SelfHost`, I am not hosting the file in question.

# Contributing
If you would like to contribute, please know I appreciate it very much!

The backend works on Node.js with Express, EJS, and Tailwind CSS. Each time the code is updated, make sure you run `bun run build:css` to use the latest needed styles.

You can either contribute code (start with `app.js`) or your time to the `apps.json` database and `modules.json`. JSON formatting is pretty easy to learn.

Please create pull requests and issues, and be generally respectful and patient. 

# Setting up and self-hosting
1. First, clone the repository:
   ```bash
   git clone https://github.com/ihatenodejs/modules.git
   ```
2. Next, let's install Bun (if you don't already have it). You can see more about Bun [here](https://bun.sh/).
   
   **Windows (PowerShell)**
   ```
   powershell -c "irm bun.sh/install.ps1 | iex"
   ```
   **Linux/macOS:**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
3. Now, let's install everything with:
   ```
   bun install
   ```
4. After that, we'll build the Tailwind CSS:
   ```
   bun run build:css
   ```
5. Finally, we start the server on port `3000`:
   ```
   bun app.js
   ```

Your server can now be accessed at http://localhost:3000, and can be used in conjunction with a reverse proxy to get a functional site up.

# To-Do
- [ ] Add Docker documentation
- [ ] Add category support
- [ ] Support filtering by category
- [ ] Add submissions
- [ ] Add search functionality
