# 🧠 PakePrompt

PakePrompt adalah aplikasi web berbasis komunitas yang menyimpan dan membagikan berbagai **AI prompt** beserta **hasil/output-nya**, tanpa integrasi langsung ke model AI. Cocok buat siapa aja yang butuh referensi prompt efektif buat ChatGPT, Midjourney, Claude, dan tools lainnya.

---

## 📌 Description

Akhir-akhir ini AI makin booming di mana-mana — dari bantu kerjaan, ngonten, sampai hiburan. Tapi banyak yang bingung pakai prompt yang bagus itu kayak gimana. PakePrompt hadir sebagai platform untuk:

- Menyimpan prompt AI + hasilnya
- Berbagi ke komunitas
- Cari inspirasi dan referensi prompt yang relevan

---

## ⚙️ Technologies Used

### Frontend

- [Next.js](https://nextjs.org/) – React Framework untuk SSR dan performa
- [Tailwind CSS](https://tailwindcss.com/) – Styling cepat & konsisten
- [ShadCN UI](https://ui.shadcn.com/) – UI Components modern

### Backend (BaaS)

- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Cloud Firestore](https://firebase.google.com/products/firestore)
- [Firebase Storage](https://firebase.google.com/products/storage)

### Tools

- [Vercel](https://vercel.com) – Hosting frontend
- React Firebase Hooks – integrasi auth + data
- Figma (optional) – UI Design

---

## ✨ Features

- 🔐 **User Auth** – Register/login via email
- 📝 **Submit Prompt** – Tambahkan prompt + output (Coming Soon)
- 🗂️ **Prompt Explorer** – Jelajah prompt berdasarkan kategori/tag
- 🔍 **Search & Filter** – Cari berdasarkan keyword
- 📄 **Prompt Detail Page** – Lihat prompt + hasilnya
- ⭐ **Bookmark** – Simpan prompt favorit (Coming Soon)
- 🧪 **Output Showcase** – Upload hasil dari prompt (text/image/link)
- 👤 **User Profile** – Lihat koleksi pribadi (Coming Soon)

---

## 🛠 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/Adesvian/pake-prompt.git
cd pake-prompt
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Setup Firebase

- Buat project baru di [Firebase Console](https://console.firebase.google.com/)
- Aktifkan:
  - Authentication (Email/Password)
  - Cloud Firestore
  - Storage
- Copy config dan buat file `.env`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Local Dev

```bash
npm run dev
# atau
yarn dev
```

---

## 🤖 AI Support Explanation

Meskipun sistem **tidak terintegrasi langsung dengan model AI**, namun tetap sangat relevan:

- Semua prompt ditujukan untuk digunakan di ChatGPT, Midjourney, Claude, dll
- User bisa mengunggah **hasil nyata** dari tools AI sebagai showcase
- Platform ini berperan sebagai **arsip dan referensi komunitas** untuk penggunaan AI secara praktis

### 🚀 Potensi Integrasi AI ke Depan

- GPT API integration untuk preview langsung
- AI ranking untuk prompt effectiveness
- Smart search powered by LLM

---

## 📬 Kontribusi

Pull request welcome! Kamu bisa bantu tambah prompt, improve UI, atau bahkan integrasi AI.

---

## 🧑‍💻 Author

Created by [@Adesvian](https://github.com/Adesvian) ✨
