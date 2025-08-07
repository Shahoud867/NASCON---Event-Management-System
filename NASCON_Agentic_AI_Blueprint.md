# NASCON Event Management System — Agentic AI Blueprint

**Prepared by:** Certified Prompt Engineer, Full-Stack Architect, and Agentic AI Systems Designer  
**Project Name:** NASCON — National Student Convention  
**Database:** MySQL (Pre-built)  
**Frontend:** React + TypeScript  
**Backend:** Node.js (Express)  
**AI Layer:** Agentic AI (Free-tier/Open Source)  
**Hosting:** 100% Free Tools

---

## 🧭 1. Complete Workflow Overview

### 🎯 System Goal:
Automate and intelligently manage a national event involving multiple stakeholders: admins, event organizers, participants, sponsors, judges, and venues.

### 🔁 End-to-End Flow:
1. **User signs up** → Assigned role (participant, sponsor, judge, etc.)
2. **Participant registers** for event → Agent validates, assigns venue, and triggers payment reminder.
3. **Sponsor selects package** → System tracks branding visibility and generates financial summaries.
4. **Judges score events** → Evaluation agent aggregates scores, updates leaderboard.
5. **Admin views dashboards** → Insights, alerts, and conflict detection via AI agent.

### 🔄 Data Flow & Module Communication:
- Frontend → Backend via REST APIs (JSON)
- Backend → MySQL (via ORM or raw SQL)
- Backend ↔ AI Agents (LangGraph / Local LLM calls)
- Event triggers → Background jobs (emails, reminders)

---

## 🏗️ 2. System Architecture

### 🧱 Tech Stack (100% Free Tools)

| Layer         | Tech                         |
|--------------|------------------------------|
| Frontend      | React + TypeScript + Vite    |
| Backend       | Node.js + Express.js         |
| Database      | MySQL                        |
| Auth          | JWT (jsonwebtoken) + bcrypt  |
| LLM/Agents    | Open-source (e.g., LM Studio, Ollama), LangGraph, or GPT-4o free-tier, preferably free cost path |
| File Storage  | Cloudinary free-tier or local |
| Hosting       | Vercel (frontend), Railway/Render (backend), MySQL on Free Plan |

### 🗺️ Modules & Flow:
- Auth → Role-based Access
- Events → CRUD, multi-round, venue assignment
- Venue → Schedule conflict detection
- Sponsor → Tiered sponsorships, contract mgmt
- Accommodation → Auto room allocation
- Finance → Payment tracking + reporting
- Judge System → Score submission, leaderboard
- AI Layer → Agents handle natural language, workflow, reminders

---

## ⚙️ 3. Core Features & Functionality

### 👤 User Functionality:
- Register/Login
- View events, register (solo/team)
- Pay registration fee
- Request accommodation
- View schedule, reminders, results

### 🛠️ Admin Functionality:
- Manage users, events, venues
- Conflict detection (venue/time)
- View analytics (sponsorship, revenue)
- Assign judges

### ⚡ Event-Based Logic:
- On Registration → Check for conflicts, notify
- On Payment → Trigger invoice generation
- On Event Start → Trigger alert/reminder
- On Score Submission → Trigger ranking update

---

## 🤖 4. Agentic System Design

### 👥 Agents to Implement:
| Agent            | Responsibilities |
|------------------|------------------|
| Event Assistant Agent | Help user find events, register, notify conflicts |
| Accommodation Agent | Suggest & assign rooms |
| Payment Tracker Agent | Monitor payments, send reminders |
| Evaluation Agent | Aggregate scores, generate rankings |
| Admin Alert Agent | Detect schedule conflicts, venue overbookings |
| Sponsor Assistant Agent | Match sponsors to packages, track benefits |

### 🧠 Tools & Context Mechanisms:
- **LangGraph (Open Source)** for orchestration
- **Redis/SQLite** for session/memory storage (if needed)
- **Stateful prompts** or **LangChain memory**
- **Simple vector store** (e.g., ChromaDB) if needed for retrieval

---

## 🧱 5. Modular Implementation Plan

### 📁 Suggested Folder Structure

```
/nascon-app
├── /client (React)
│   ├── /components
│   ├── /pages
│   ├── /services
│   └── App.tsx
├── /server (Node.js)
│   ├── /controllers
│   ├── /routes
│   ├── /models
│   ├── /middleware
│   ├── /agents (LangGraph workflows)
│   └── server.ts
```

### 🧩 Development Phases

**Phase 1: Setup & Auth**
- Scaffold frontend/backend
- JWT Auth & role-based access

**Phase 2: Core Modules**
- Event CRUD
- Venue scheduling
- Participant registration

**Phase 3: Payments & Sponsorships**
- Payment tracking (mock/manual)
- Sponsor contracts

**Phase 4: Judge & Accommodation**
- Judge panel, score entry
- Room assignment

**Phase 5: AI Agents**
- Build event, evaluation, admin agents
- Integrate chat interface

**Phase 6: Finalization**
- Testing, polish UI, deploy

---

## 🧪 6. Optional Enhancements

- **Logging**: Winston for backend logs, browser console logs for frontend
- **Monitoring**: UptimeRobot for backend APIs
- **Security**: HTTPS, CORS policies, input sanitization
- **Scaling Suggestions**:
  - Migrate to PostgreSQL for performance
  - Replace LLM with dedicated API microservice
  - Add async job queue (BullMQ)

---

## 📦 7. Hosting Plan (Free-Tier Compatible)

| Component | Hosting |
|----------|----------|
| Frontend | Vercel (GitHub-connected CI/CD) |
| Backend  | Railway or Render (Node.js free-tier) |
| MySQL    | PlanetScale or ClearDB (free tier) |
| AI Agents| Ollama locally or GPT-4o via free-tier API |

---

## ✅ Summary

This blueprint serves as a complete project + dev reference. It ensures:

- Cost-efficiency with free tools
- Modularity for easy scaling
- Real-world AI integration using agents
- Client-presentable and production-focused planning