# Nexus Algorithm - DSA Mastery Platform

Nexus Algorithm is a high-performance, ethereal-themed engineering platform designed for mastering Data Structures and Algorithms (DSA). It combines a sleek, modern IDE aesthetic with powerful tracking features and AI-driven coaching to help learners prepare for technical interviews with precision.

![Dashboard Preview](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=400&fit=crop)

## 🚀 Key Features

- **Personalized Pacing Engine**: Set your target completion date, and the platform calculates your daily goal automatically.
- **AI Recovery Plans**: Integrated with **Google Gemini AI** to analyze your progress and generate "Stress-Free Recovery" plans if you fall behind.
- **Real-Time Streak Tracking**: Motivation driven by real-time activity logs. Calculate your streak based on consecutive days of problem solving.
- **Comprehensive Problem Set**: Curated list of problems spanning Arrays, Strings, Trees, Graphs, and more.
- **Live Compiler Subsystem**: Integrated with the **Piston API** to support real-time code execution for **C, C++, Python, and Java**. Test your logic instantly within the platform.
- **Glassmorphism UI**: A dark, high-contrast interface designed for long coding sessions.
- **Full-Stack Persistence**: Powered by **Firebase** for secure authentication and real-time data sync across devices.
- **Pomodoro Focus Timer**: Integrated focus tool to manage deep work blocks.

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Motion (f.k.a. Framer Motion)
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Google Auth
- **AI Engine**: Google Gemini Pro (via @google/genai)
- **Compilation Engine**: Piston API (Multi-language execution)
- **Visuals**: Recharts (Analytics), Lucide React (Icons)
- **Deployment**: Optimized for Vercel

## 📖 For Learners: How it works

### Pacing & Analytics
The platform uses a linear regression-style target line to show you where you *should* be vs. where you *are*.
- **Blue Line**: Your target path to reach your goal by the deadline.
- **Indigo Area**: Your actual progress.
- **Pink Area**: AI-calculated projection.

### AI Integration
The AI coach doesn't just give hints; it analyzes your "backlog" (the gap between your target and actual progress) and tells you exactly how many extra problems you need to solve over the next few days to get back on track without burning out.

## ⚙️ Local Development

1. **Clone and Install**:
   ```bash
   git clone <your-repo-url>
   cd dsa-leaning-platform
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   ```

3. **Firebase Setup**:
   - Add your Firebase credentials to your `.env` file (see `.env.example`).
   - If deploying to **Vercel**, make sure to add these variables in the **Vercel Project Settings**.
   - Authorized domains in Firebase Console: `localhost` and your production URL.

4. **Run**:
   ```bash
   npm run dev
   ```

## 📜 License
This project is for educational purposes. Feel free to use it to level up your algorithmic skills!

---
*Built with precision for the next generation of engineers.*
