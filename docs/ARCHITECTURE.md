# Architecture Documentation

## Overview
Next.js 14 application with App Router, TypeScript, and Supabase.

## Key Components
- Authentication: Supabase Auth
- Payments: Stripe
- Database: Supabase PostgreSQL
- Hosting: Vercel

## Security
- CSRF protection via middleware
- Input validation with Zod
- XSS protection with DOMPurify
