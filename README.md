# Mini Job Board

## 🚀 Setup
1. Clone repo:
   ```bash
   git clone [your-repo-url]
   cd mini-job-board
   ```
2. Install dependencies:
    ```bash
   npm install
   ```
3. Create .env.local
    ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key  
   ```
4. Set up Supabase:
   - Run schema SQL
   - Enable Email auth
5. Start dev server:
    ```bash
   npm run dev
   ```

## 🛠 Tech Stack
1. Next.js (App Router) + TypeScript
2. Supabase (Auth + DB)
3. Tailwind CSS
   
## 🏗 Structure
```bash
src/
├── app/          # Routes
├── components/   # UI components
├── lib/          # Supabase config
└── styles/       # Global CSS
```

## 🔧 Future Improvements
1. Tests (Jest + Cypress)
2. WYSIWYG on Create/Edit Job Platform