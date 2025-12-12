#!/bin/bash
echo "🔍 Checking for missing items..."
echo ""

# Check for environment variables
echo "📋 Environment Variables:"
[ -f .env.local ] && echo "✅ .env.local exists" || echo "❌ .env.local missing"
[ -f .env.example ] && echo "✅ .env.example exists" || echo "❌ .env.example missing"
echo ""

# Check for critical pages
echo "📄 Critical Pages:"
[ -f app/privacy/page.tsx ] && echo "✅ Privacy Policy" || echo "❌ Privacy Policy missing"
[ -f app/terms/page.tsx ] && echo "✅ Terms of Service" || echo "❌ Terms of Service missing"
[ -f app/contact/page.tsx ] && echo "✅ Contact Page" || echo "❌ Contact Page missing"
[ -f app/about/page.tsx ] && echo "✅ About Page" || echo "❌ About Page missing"
echo ""

# Check for student handbook
echo "📚 Student Resources:"
[ -f app/student-handbook/page.tsx ] && echo "✅ Student Handbook" || echo "❌ Student Handbook missing"
[ -f app/academic-integrity/page.tsx ] && echo "✅ Academic Integrity" || echo "❌ Academic Integrity missing"
echo ""

# Check for admin pages
echo "🔐 Admin Pages:"
[ -d app/admin ] && echo "✅ Admin dashboard exists" || echo "❌ Admin dashboard missing"
[ -f app/admin/sap/page.tsx ] && echo "✅ SAP monitoring" || echo "❌ SAP monitoring missing"
echo ""

# Check for payment pages
echo "💳 Payment Pages:"
[ -f app/payment/success/page.tsx ] && echo "✅ Payment success" || echo "❌ Payment success missing"
[ -f app/payment/cancel/page.tsx ] && echo "✅ Payment cancel" || echo "❌ Payment cancel missing"
echo ""

# Check for API routes
echo "🔌 API Routes:"
[ -f app/api/programs/checkout/route.ts ] && echo "✅ Checkout API" || echo "❌ Checkout API missing"
[ -f app/api/webhooks/stripe/route.ts ] && echo "✅ Stripe webhook" || echo "❌ Stripe webhook missing"
echo ""

# Check for images
echo "🖼️  Images:"
[ -f public/images/heroes/hero-homepage.jpg ] && echo "✅ Homepage hero" || echo "❌ Homepage hero missing"
[ -d public/images/programs ] && echo "✅ Program images" || echo "❌ Program images missing"
echo ""

echo "✅ Check complete!"
