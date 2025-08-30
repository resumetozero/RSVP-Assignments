
# RSVP App – Part 2

This is **Part 2 of the RSVP Assignment**, built using **Next.js** and **Supabase**.  
The app allows users to submit and view RSVP details stored in a Supabase database.

---

## 🚀 Deployment

The project is deployed on **Vercel**:

- Main App: [https://rsvp-assignments-task.vercel.app](https://rsvp-assignments-task.vercel.app)  
- RSVP Route: [https://rsvp-assignments-task.vercel.app/rsvp](https://rsvp-assignments-task.vercel.app/rsvp)

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework for frontend
- [Supabase](https://supabase.com/) – Database + Authentication + APIs
- [Vercel](https://vercel.com/) – Deployment

---
## Features

- List users and events from Supabase tables
- Submit RSVP (Yes/No/Maybe) for an event
- View all RSVPs in a live-updating table

---

## ⚙️ Local Development Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/resumetozero/RSVP-Assignments.git
   cd RSVP-Assignments/part2

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root of `part2/` with the following:

   ```env
   SUPABASE_URL=<project url>
   SUPABASE_SERVICE_KEY=<anon pubulic key>
   ```

   > ⚠️ When deploying on Vercel, set these environment variables in the **Vercel Dashboard → Project Settings → Environment Variables**.

4. **Run locally**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000).

---

## 📂 Routes

* `/` → Home page
* `/rsvp` → RSVP submission form & list
