# CampusCare AI 🎓⚡

> **A Smarter Campus. A Better Experience.**  
> An AI-powered university campus complaint management platform built with Next.js (App Router), TypeScript, Tailwind CSS, and Google Gemini AI.

---

## 🌟 Key Features

### 1. 💎 Premium Dark Glassmorphism Design
- Visual aesthetic inspired by **Apple Vision Pro + Linear + Modern Fintech**.
- Translucent frosted glass panels (`backdrop-blur`), subtle borders, soft violet/cyan ambient glows.
- Custom typography, high-contrast accessible color scheme, responsive mobile navigation.

### 2. ⚡ Autonomous Gemini AI Triage Engine
- Server-side Next.js API route (`/api/analyze-complaint`) integrating Google Gemini.
- Evaluates student complaints in real-time to generate:
  - **Category Detection**
  - **Severity Priority** (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
  - **Executive Incident Summary**
  - **Actionable Technical Recommendations** for maintenance crews
  - **Automated Target Department Routing**
  - **Urgency Risk Rationale**
- **Deterministic Offline Fallback:** If `GEMINI_API_KEY` is not provided or network is offline, a deterministic rule-based analysis activates automatically and labels the result as `DEMO ANALYSIS`.

### 3. 🤖 CampusCare Assistant (100% Offline Rule-Based Chatbot)
- Fast, zero-dependency, client-side rule-based chatbot in TypeScript.
- Conforms to specified configuration:
  ```ts
  const chatbotConfig = {
    apiEnabled: false,
    confidenceThreshold: 0.65,
    maxResponseLength: 120,
    enableFallback: true,
    showSuggestedQuestions: true,
    typingDelay: 500
  };
  ```
- Supports 12 distinct campus intents:
  - Greeting, Complaint Submission, Complaint Tracking, Classroom & Projector, Campus Wi-Fi, Washroom & Cleanliness, Fan & AC, Electricity, Transportation, Campus Security, Administration Contact, and General Help.
- Immediate safety protocol detection: instantly flags life-safety keywords with emergency hotline numbers.
- Typing animation, interactive question chips, message timestamps, and chat reset.

### 4. 📊 Live Interactive Dashboard & Visualizations
- Real-time statistics: Total, Pending, In Progress, Resolved, and Critical complaints.
- Interactive charts powered by **Recharts**:
  - **7-Day Complaint Inflow & Clearance Area Chart**
  - **Category Distribution Donut Chart**
- Live **AI-Generated Campus Insights** highlighting infrastructure hotspots and maintenance bottlenecks.

### 5. 🛠️ Administrative Control Center
- Full ticket management table with search and filtering by Category, Priority, and Status.
- One-click department reassignment and status progression:
  - `Submitted` → `Under Review` → `In Progress` → `Resolved` / `Rejected`.
- Real-time synchronization across Student Tracking and Admin views using a reactive LocalStorage architecture.
- Department directory detailing active workload and target SLAs.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended, tested on Node v22)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Alfi-svg/CampusPro.git
cd CampusPro

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Add your Google Gemini API key:
# GEMINI_API_KEY=your_gemini_api_key_here

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Build
```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel
1. Push this repository to GitHub: `https://github.com/Alfi-svg/CampusPro`.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key)*
4. Click **Deploy**.

---

## 🏛️ Architecture & Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom glassmorphism design tokens
- **Icons:** Lucide React
- **Visualizations:** Recharts
- **Triage AI:** Google Gemini 1.5 Flash API with deterministic fallback
- **State & Persistence:** Synchronized LocalStorage with cross-component event dispatchers
