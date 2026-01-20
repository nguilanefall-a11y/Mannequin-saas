---
description: Deploy Mannequin SaaS to Vercel
---
# Deployment Guide (Vercel)

## 1. Environment Variables
When deploying to Vercel, you must add these variables in the **Project Settings > Environment Variables**:

| Variable | Value / Description |
| :--- | :--- |
| `DATABASE_URL` | Your Neon Connection String (postgres://...) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk Publishable Key (pk_test_...) |
| `CLERK_SECRET_KEY` | Your Clerk Secret Key (sk_test_...) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |
| `APP_MASTER_API_KEY` | Your Agency Master Key |

## 2. Deploy via CLI
The easiest way is to use the Vercel CLI:

1. **Commit your changes** (I have already done this for you).
2. **Run Vercel**:
   ```bash
   npx vercel
   ```
   - Follow the prompts (Login, Setup Project, Yes to all).
3. **Deploy to Production**:
   ```bash
   npx vercel --prod
   ```

## 3. Database Migration
Since we are using Neon, the database is already in the cloud. Vercel will connect to it using the `DATABASE_URL`.
