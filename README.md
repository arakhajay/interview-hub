# THE INTERVIEW HUB 🚀

> **AI Career Assistant & Resume Review Platform**  
> Build ATS-friendly resumes, review resumes with Google Gemini AI, rewrite bullet points with Google STAR formula, and practice interactive mock interviews.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-purple)
![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_DB-emerald?logo=supabase)

---

## ✨ Features

- **⚡ Google Gemini 2.5 Flash AI Integration**: Real-time document parsing, ATS score calculation, keyword extraction, and STAR bullet rewriting.
- **📊 Real AI Resume Audit & ATS Simulator**: Evaluates resume text against Taleo & Workday hiring filters, returning 9 granular section scores and recruiter readability metrics.
- **📝 2-Option AI Resume Builder**:
  - **Option 1 (Improve Existing)**: Side-by-side view with 1-click STAR bullet rewriter, ATS formatting, and keyword injection.
  - **Option 2 (Build from Scratch)**: Synthesizes a brand-new resume from uploaded text, user profile preferences, and AI audit recommendations.
- **📄 Multi-Format Resume Export**: Download ATS-ready resumes in **PDF**, **DOCX**, **TXT**, or **Markdown** formats.
- **🎯 Job Description Matcher**: Compare candidate resumes against target job descriptions to identify missing technical keywords and cloud frameworks.
- **🎙️ Interactive AI Mock Interview Studio**: Role-specific technical & behavioral interview practice with real-time scoring and STAR response feedback.
- **💬 24/7 AI Career Coach**: Custom skill roadmaps, interview prep strategies, and offer negotiation guidance.
- **👤 Mandatory User Profile Onboarding**: Streamlined onboarding setup for target job roles, salary expectations, and skills.
- **🎨 $100M SaaS UI/UX Aesthetics**: Glassmorphic UI design, Framer Motion entrance & hover micro-interactions, Three.js WebGL Linked Particles background, and dark theme palette.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router, Turbopack)](https://nextjs.org/)
- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Lucide Icons
- **Animations & 3D VFX**: [Framer Motion 12](https://www.framer.com/motion/) & [Three.js (WebGL)](https://threejs.org/)
- **AI Model**: Google Gemini 2.5 Flash (`@google/genai`)
- **Backend & Auth**: [Supabase](https://supabase.com/) (Auth, PostgreSQL DB)
- **Document Export**: `jspdf`, `html2canvas`, `docx`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/arakhajay/interview-hub.git
cd interview-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=https://mviednahaazmqsrepdzr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 🗄️ Database Schema

The database table definitions and Row Level Security (RLS) policies are available in [`supabase/schema.sql`](file:///d:/Python-2025/Antigravity/interview-prep/supabase/schema.sql).

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
