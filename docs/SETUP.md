# Setup Guide

## Prerequisites

- Python 3.10+
- Node.js 18+
- Supabase account
- Git

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
python -m uvicorn api.main:app --reload
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Database Setup

1. Create Supabase project
2. Run schema.sql in SQL Editor
3. Copy connection details to .env

## Testing

- Backend: http://localhost:8000/docs
- Frontend: http://localhost:3000
