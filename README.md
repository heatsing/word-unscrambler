 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 79232f8c78b75604675989e96667d56e4b5241d1..bb9d52f43705b7ae9b408864a42c7f09bd92afc6 100644
--- a/README.md
+++ b/README.md
@@ -1,30 +1,52 @@
-# Word Unscrambler Website
+# Word Unscrambler | Online Word Unscramble Tool
 
-*Automatically synced with your [v0.app](https://v0.app) deployments*
+**Word Unscrambler** is a fast, free online word unscramble tool that helps you solve anagrams, word scrambles, and spelling challenges. Generate valid English words from scrambled letters, filter by length, and quickly find the best matches for learning, games, and teaching.
 
-[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/heatsinghaiqing-2741s-projects/v0-word-unscrambler-bo)
-[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/lokJ9z4lfAb)
+## 🚀 Key Features
 
-## Overview
+- **Unscramble letters** into all possible words
+- **Length filters** to narrow down results
+- **Dictionary scope** options (common, advanced, full)
+- **Instant search** with sortable results
+- **Mobile-friendly** responsive UI
 
-This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
-Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).
+## 🔍 SEO Keywords
 
-## Deployment
+> word unscrambler, unscramble words, anagram solver, word scramble solver, letter solver, english word finder, anagram generator, word game helper, vocabulary practice
 
-Your project is live at:
+## 📍 GEO Targeting
 
-**[https://vercel.com/heatsinghaiqing-2741s-projects/v0-word-unscrambler-bo](https://vercel.com/heatsinghaiqing-2741s-projects/v0-word-unscrambler-bo)**
+This project targets English-learning and word-game users in **China, Hong Kong, Taiwan, Singapore, and Malaysia**.
+Suggested localized search phrases:
 
-## Build your app
+- China: **English word unscrambler / scramble word solver**
+- Hong Kong & Taiwan: **unscramble letters / anagram solver**
+- Singapore & Malaysia: **word scramble solver / anagram finder**
 
-Continue building your app on:
+## 🧭 Use Cases
 
-**[https://v0.app/chat/lokJ9z4lfAb](https://v0.app/chat/lokJ9z4lfAb)**
+- English learning: spelling practice and vocabulary building
+- Word games: Anagram, Word Scramble, Wordscapes
+- Teaching: classroom activities and word challenges
+- Content creation: wordplay and anagram ideas
 
-## How It Works
+## 🛠️ Local Development
 
-1. Create and modify your project using [v0.app](https://v0.app)
-2. Deploy your chats from the v0 interface
-3. Changes are automatically pushed to this repository
-4. Vercel deploys the latest version from this repository
\ No newline at end of file
+```bash
+npm install
+npm run dev
+```
+
+Open:
+
+```
+http://localhost:3000
+```
+
+## 📦 Deployment
+
+Deploy easily with Vercel for automatic builds and hosting.
+
+## 📄 License
+
+MIT License
 
EOF
)
