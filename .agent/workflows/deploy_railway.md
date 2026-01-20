---
description: Deploy Mannequin SaaS to Railway
---
# Railway Deployment Guide

Since the `railway` CLI is not installed globally, we use `npx -y @railway/cli`.

## 1. Login & Init
Run these commands in your terminal:

```bash
# 1. Login to Railway (opens browser)
npx -y @railway/cli login

# 2. Link to a Project (Create new or select existing)
npx -y @railway/cli init

# 3. Deploy
npx -y @railway/cli up
```

## 2. Environment Variables
Authentication and Database will fail unless you set these variables in the **Railway Dashboard**:

- `DATABASE_URL`: (Your Neon Connection String)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: (From .env)
- `CLERK_SECRET_KEY`: (From .env)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: `/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: `/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: `/dashboard`
- `APP_MASTER_API_KEY`: (Your Agency Key)

## 3. GitHub Integration (Optional)
If you prefer pushing to GitHub (so Railway auto-deploys):
1. Create a repo on GitHub.
2. `git remote add origin <URL>`
3. `git push -u origin main`
4. Connect the repo in Railway Dashboard.
