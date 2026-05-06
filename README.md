# Nexus Algorithm - DSA Mastery Platform

Nexus Algorithm is a high-performance, ethereal-themed engineering platform designed for mastering Data Structures and Algorithms (DSA). It combines a sleek, modern IDE aesthetic with powerful tracking features and AI-driven coaching to help learners prepare for technical interviews with precision.

![Dashboard Preview](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=400&fit=crop)

## 🚀 Key Features

- **Secure Full-Stack Architecture**: Custom Express.js backend routes securely proxy Google Gemini AI requests, ensuring sensitive API keys are never exposed to the client browser.
- **Personalized Pacing Engine**: Set your target completion date, and the platform calculates your daily goal automatically.
- **AI Code Simulator**: Utilizes **Google Gemini AI** on the backend to simulate code execution, estimate runtime/memory complexity, and provide algorithmic hints.
- **AI Recovery Plans**: Analyzes your progress and generates "Stress-Free Recovery" plans if you fall behind.
- **Live Compiler Subsystem**: Integrated with the **Piston API** to support real-time code execution for **C, C++, Python, and Java**.
- **Real-Time Streak Tracking**: Motivation driven by real-time activity logs and streak calculations.
- **Comprehensive Problem Set**: Curated list of problems spanning Arrays, Strings, Trees, Graphs, and more.
- **Database & Auth**: Powered by **Firebase** for strict ABAC (Attribute-Based Access Control) security and real-time syncing.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend / API**: Node.js, Express.js, Vercel Serverless Functions
- **Styling**: Tailwind CSS, Motion (Framer Motion)
- **Database / Auth**: Firebase Firestore (NoSQL), Firebase Google Auth
- **AI Engine**: Google Gemini API (via `@google/genai`)
- **Visuals**: Recharts (Analytics), Lucide React (Icons), PrismJS (Syntax Highlighting)
- **Deployment**: Vercel

## ⚙️ Local Development

1. **Clone and Install**:
   ```bash
   git clone <your-repo-url>
   cd react-example
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```env
   # Server-side API key for Gemini (NOT prefixed with VITE_)
   GEMINI_API_KEY=your_gemini_key_here
   
   # Public Firebase configurations
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   # ... etc
   ```

3. **Run the Full-Stack Dev Server**:
   ```bash
   npm run dev
   ```
   *(This starts the Express server wrapper which automatically serves the Vite frontend.)*

## 🚀 Deployment (Vercel)

This project is configured out-of-the-box for **Vercel** serverless environments. 

1. Push your repository to GitHub.
2. Import the project into Vercel. 
3. Under **Environment Variables** in Vercel, ensure you add:
   - `GEMINI_API_KEY` (Standard Node.js env variable. Do **NOT** use `VITE_` here to keep it hidden securely on the server).
   - All `VITE_FIREBASE_*` credentials.
4. Deploy! The `vercel.json` file routing will automatically map your `/api/*` endpoints to Vercel Serverless Functions and serve the React App for all other routes.

## 📜 License
This project is for educational purposes. Feel free to use it to level up your algorithmic skills!

---
*Built with precision for the next generation of engineers.*
