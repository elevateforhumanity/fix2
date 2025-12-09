# Stripe + HSI Automatic Enrollment System

## 🎯 GOAL: Student pays via Stripe → Auto-enroll in HSI

---

## 🔄 AUTOMATED WORKFLOW

```
Student browses course catalog
         ↓
Student clicks "Enroll in CPR/First Aid"
         ↓
Stripe checkout page ($119-$189)
         ↓
Student completes payment
         ↓
Stripe webhook triggers
         ↓
System creates HSI enrollment record
         ↓
Admin receives notification to enroll student
         ↓
Admin clicks HSI enrollment link
         ↓
Admin enters student info in HSI form
         ↓
Student receives email from info@hsi.com
         ↓
Student completes training
         ↓
HSI credit deducted automatically
```

---

## 💻 DATABASE SCHEMA

```sql
-- HSI enrollment queue table
CREATE TABLE IF NOT EXISTS hsi_enrollment_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_type TEXT NOT NULL CHECK (course_type IN (
    'cpr_aed_all_ages',
    'cpr_aed_adult',
    'first_aid_cpr_all_ages',
    'first_aid_cpr_adult'
  )),
  stripe_payment_id TEXT NOT NULL,
  stripe_session_id TEXT,
  amount_paid DECIMAL(10,2) NOT NULL,
  student_email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_phone TEXT,
  student_address TEXT,
  enrollment_status TEXT DEFAULT 'pending' CHECK (enrollment_status IN (
    'pending',
    'enrolled',
    'completed',
    'failed'
  )),
  hsi_enrollment_link TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hsi_queue_student ON hsi_enrollment_queue(student_id);
CREATE INDEX idx_hsi_queue_status ON hsi_enrollment_queue(enrollment_status);
CREATE INDEX idx_hsi_queue_stripe ON hsi_enrollment_queue(stripe_payment_id);

-- HSI course products
CREATE TABLE IF NOT EXISTS hsi_course_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_type TEXT UNIQUE NOT NULL,
  course_name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  wholesale_cost DECIMAL(10,2) NOT NULL,
  stripe_product_id TEXT,
  stripe_price_id TEXT,
  hsi_enrollment_link TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert HSI courses
INSERT INTO hsi_course_products (course_type, course_name, description, price, wholesale_cost, hsi_enrollment_link) VALUES
('cpr_aed_all_ages', 'CPR/AED Certification (All Ages)', 'CPR and AED training for adults, children, and infants', 135.00, 85.00, 'https://otis.osmanager4.com/#/nts/openenrollment/906B45CC-211D-48B3-A2FE-71D2C6D464F3'),
('cpr_aed_adult', 'CPR/AED Certification (Adult Only)', 'CPR and AED training for adults only', 119.00, 75.00, 'https://otis.osmanager4.com/#/nts/openenrollment/8B978D3E-85A4-48E7-AFF2-5F01FFF12F35'),
('first_aid_cpr_all_ages', 'First Aid + CPR/AED (All Ages)', 'Complete first aid and CPR training for all ages', 189.00, 125.00, 'https://otis.osmanager4.com/#/nts/openenrollment/D84A8E63-967E-4A63-944A-AA3E33D777A8'),
('first_aid_cpr_adult', 'First Aid + CPR/AED (Adult Only)', 'Complete first aid and CPR training for adults', 189.00, 125.00, 'https://otis.osmanager4.com/#/nts/openenrollment/A373CD50-3045-49B1-B119-62A1DC5EFF47')
ON CONFLICT (course_type) DO NOTHING;
```

---

## 🛒 STRIPE CHECKOUT INTEGRATION

### Create Stripe Products (One-Time Setup):

```typescript
// lib/stripe/create-hsi-products.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createHSIProducts() {
  const courses = [
    {
      name: 'CPR/AED Certification (All Ages)',
      description: 'CPR and AED training for adults, children, and infants. Includes remote skills verification.',
      price: 13500, // $135.00 in cents
      courseType: 'cpr_aed_all_ages'
    },
    {
      name: 'CPR/AED Certification (Adult Only)',
      description: 'CPR and AED training for adults only. Includes remote skills verification.',
      price: 11900, // $119.00 in cents
      courseType: 'cpr_aed_adult'
    },
    {
      name: 'First Aid + CPR/AED (All Ages)',
      description: 'Complete first aid and CPR training for all ages. Most comprehensive option.',
      price: 18900, // $189.00 in cents
      courseType: 'first_aid_cpr_all_ages'
    },
    {
      name: 'First Aid + CPR/AED (Adult Only)',
      description: 'Complete first aid and CPR training for adults. Workplace safety focused.',
      price: 18900, // $189.00 in cents
      courseType: 'first_aid_cpr_adult'
    }
  ];

  for (const course of courses) {
    // Create product
    const product = await stripe.products.create({
      name: course.name,
      description: course.description,
      metadata: {
        course_type: course.courseType,
        provider: 'hsi'
      }
    });

    // Create price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: course.price,
      currency: 'usd',
    });

    console.log(`Created: ${course.name}`);
    console.log(`Product ID: ${product.id}`);
    console.log(`Price ID: ${price.id}`);
  }
}
```

---

## 🎓 STUDENT ENROLLMENT PAGE

### Page: `/courses/hsi/[courseType]/enroll`

```typescript
// app/courses/hsi/[courseType]/enroll/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function HSIEnrollPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const courseType = params.courseType as string;

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [courseType]);

  async function loadCourse() {
    const { data } = await supabase
      .from('hsi_course_products')
      .select('*')
      .eq('course_type', courseType)
      .eq('is_active', true)
      .single();

    setCourse(data);
    setLoading(false);
  }

  async function handleEnroll() {
    setProcessing(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?redirect=' + window.location.pathname);
        return;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Create Stripe checkout session
      const response = await fetch('/api/hsi/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseType: courseType,
          studentId: user.id,
          studentEmail: profile.email,
          studentName: profile.full_name,
          studentPhone: profile.phone,
          studentAddress: profile.address,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
      setProcessing(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{course.course_name}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-4xl font-bold text-brandPrimary mb-4">
          ${course.price}
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold">Remote Skills Verification</div>
              <div className="text-sm text-gray-600">Complete training from home</div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold">Supplies Shipped to You</div>
              <div className="text-sm text-gray-600">All training materials included</div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold">2-Year Certification</div>
              <div className="text-sm text-gray-600">Nationally recognized certificate</div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold">Flexible Scheduling</div>
              <div className="text-sm text-gray-600">Choose your skills session time</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleEnroll}
          disabled={processing}
          className="w-full py-4 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Enroll Now - Pay with Card'}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">What Happens Next?</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Complete payment via secure Stripe checkout</li>
          <li>Receive confirmation email from us</li>
          <li>Receive training email from info@hsi.com</li>
          <li>Complete online training videos</li>
          <li>Schedule your remote skills session</li>
          <li>Receive your certification</li>
        </ol>
      </div>
    </div>
  );
}
```

---

## 🔌 STRIPE CHECKOUT API

### API Route: `/api/hsi/create-checkout`

```typescript
// app/api/hsi/create-checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const {
      courseType,
      studentId,
      studentEmail,
      studentName,
      studentPhone,
      studentAddress,
    } = await request.json();

    const supabase = createClient();

    // Get course details
    const { data: course } = await supabase
      .from('hsi_course_products')
      .select('*')
      .eq('course_type', courseType)
      .single();

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.course_name,
              description: course.description,
              images: ['https://yourdomain.com/images/hsi-certification.png'],
            },
            unit_amount: Math.round(course.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/courses/hsi/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/courses/hsi/${courseType}/enroll`,
      customer_email: studentEmail,
      client_reference_id: studentId,
      metadata: {
        course_type: courseType,
        student_id: studentId,
        student_name: studentName,
        student_email: studentEmail,
        student_phone: studentPhone || '',
        student_address: studentAddress || '',
        provider: 'hsi',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 🔔 STRIPE WEBHOOK HANDLER

### API Route: `/api/webhooks/stripe`

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process HSI enrollments
    if (session.metadata?.provider === 'hsi') {
      try {
        // Get course details
        const { data: course } = await supabase
          .from('hsi_course_products')
          .select('*')
          .eq('course_type', session.metadata.course_type)
          .single();

        // Create enrollment queue entry
        const { error } = await supabase
          .from('hsi_enrollment_queue')
          .insert({
            student_id: session.metadata.student_id,
            course_type: session.metadata.course_type,
            stripe_payment_id: session.payment_intent as string,
            stripe_session_id: session.id,
            amount_paid: (session.amount_total || 0) / 100,
            student_email: session.metadata.student_email,
            student_name: session.metadata.student_name,
            student_phone: session.metadata.student_phone,
            student_address: session.metadata.student_address,
            hsi_enrollment_link: course.hsi_enrollment_link,
            enrollment_status: 'pending',
          });

        if (error) {
          console.error('Error creating enrollment queue:', error);
        }

        // Send confirmation email to student
        await supabase.functions.invoke('send-hsi-confirmation-email', {
          body: {
            studentEmail: session.metadata.student_email,
            studentName: session.metadata.student_name,
            courseName: course.course_name,
          },
        });

        // Send notification to admin
        await supabase.functions.invoke('send-admin-notification', {
          body: {
            type: 'hsi_enrollment_pending',
            studentName: session.metadata.student_name,
            courseName: course.course_name,
            enrollmentLink: course.hsi_enrollment_link,
          },
        });

        console.log('HSI enrollment queued successfully');
      } catch (err: any) {
        console.error('Error processing HSI enrollment:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
```

---

## 📧 ADMIN NOTIFICATION SYSTEM

### Admin Dashboard: `/admin/hsi/pending-enrollments`

```typescript
// app/admin/hsi/pending-enrollments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PendingEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    loadPendingEnrollments();
    
    // Real-time subscription
    const subscription = supabase
      .channel('hsi_enrollments')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'hsi_enrollment_queue'
      }, () => {
        loadPendingEnrollments();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadPendingEnrollments() {
    const { data } = await supabase
      .from('hsi_enrollment_queue')
      .select('*')
      .eq('enrollment_status', 'pending')
      .order('created_at', { ascending: false });

    setEnrollments(data || []);
  }

  async function handleEnroll(enrollment: any) {
    // Open HSI enrollment link
    window.open(enrollment.hsi_enrollment_link, '_blank');

    // Mark as enrolled
    await supabase
      .from('hsi_enrollment_queue')
      .update({
        enrollment_status: 'enrolled',
        enrolled_at: new Date().toISOString(),
      })
      .eq('id', enrollment.id);

    loadPendingEnrollments();
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Pending HSI Enrollments ({enrollments.length})
      </h1>

      {enrollments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600">No pending enrollments</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {enrollment.student_name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Email: {enrollment.student_email}</div>
                    {enrollment.student_phone && (
                      <div>Phone: {enrollment.student_phone}</div>
                    )}
                    {enrollment.student_address && (
                      <div>Address: {enrollment.student_address}</div>
                    )}
                    <div className="font-semibold text-brandPrimary mt-2">
                      Course: {enrollment.course_type.replace(/_/g, ' ').toUpperCase()}
                    </div>
                    <div>Amount Paid: ${enrollment.amount_paid}</div>
                    <div>Ordered: {new Date(enrollment.created_at).toLocaleString()}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleEnroll(enrollment)}
                  className="px-6 py-3 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark"
                >
                  Enroll in HSI →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## ✅ SETUP CHECKLIST

### 1. Stripe Setup:
- [ ] Run `createHSIProducts()` to create Stripe products
- [ ] Save product IDs and price IDs
- [ ] Update `hsi_course_products` table with Stripe IDs
- [ ] Configure webhook endpoint in Stripe dashboard
- [ ] Add webhook secret to environment variables

### 2. Database:
- [ ] Run SQL migration to create tables
- [ ] Insert HSI course products
- [ ] Test enrollment queue

### 3. Pages:
- [ ] Create enrollment pages for each course
- [ ] Create success page
- [ ] Create admin pending enrollments page

### 4. Testing:
- [ ] Test Stripe checkout flow
- [ ] Verify webhook triggers
- [ ] Check enrollment queue creation
- [ ] Test admin notification

---

## 🎉 RESULT

**Students can now:**
1. Browse HSI courses on your site
2. Click "Enroll Now"
3. Pay via Stripe
4. Automatically queued for HSI enrollment

**You receive:**
1. Payment in Stripe
2. Notification of pending enrollment
3. One-click to open HSI form
4. Automatic credit tracking

**Revenue flows automatically!** 💰

---

**Last Updated:** November 29, 2024  
**Status:** Ready to implement  
**Timeline:** 2-3 days to build
