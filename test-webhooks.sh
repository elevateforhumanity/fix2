#!/bin/bash

# Test all webhook endpoints
WEBHOOK_SECRET="PGd3vzck5RBRP+SIv6t4+LSpsGIkcra9ZaKCy8hCvRU="
BASE_URL="https://www.elevateforhumanity.org"

echo "Testing Webhook Endpoints..."
echo "=============================="
echo ""

# Test HSI
echo "1. Testing HSI..."
curl -X POST "$BASE_URL/api/webhooks/partners/hsi" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{"event":"course.completed","student_id":"test-123","course_id":"hsi-test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s
echo ""

# Test Certiport
echo "2. Testing Certiport..."
curl -X POST "$BASE_URL/api/webhooks/partners/certiport" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{"event":"exam.completed","student_id":"test-123","exam_id":"cert-test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s
echo ""

# Test CareerSafe
echo "3. Testing CareerSafe..."
curl -X POST "$BASE_URL/api/webhooks/partners/careersafe" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{"event":"training.completed","student_id":"test-123","training_id":"osha-test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s
echo ""

# Test JRI
echo "4. Testing JRI..."
curl -X POST "$BASE_URL/api/webhooks/partners/jri" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{"event":"module.completed","student_id":"test-123","module_id":"jri-test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s
echo ""

# Test Milady
echo "5. Testing Milady..."
curl -X POST "$BASE_URL/api/webhooks/partners/milady" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{"event":"course.completed","student_id":"test-123","course_id":"milady-test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s
echo ""

echo "=============================="
echo "Testing Complete!"
echo ""
echo "Expected: HTTP Status 200 for all endpoints"
echo "If you see 401: Webhook secret not configured correctly"
echo "If you see 404: Endpoint not found"
echo "If you see 500: Server error (check Vercel logs)"
