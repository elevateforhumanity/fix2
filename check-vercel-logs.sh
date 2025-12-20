#!/bin/bash
echo "To see actual error, you need to:"
echo "1. Go to: https://vercel.com/[your-team]/fix2/logs"
echo "2. Filter by: /api/applications"
echo "3. Look for 'Supabase insert error:' in the logs"
echo ""
echo "Or run: vercel logs --prod | grep -A 10 'Supabase insert error'"
