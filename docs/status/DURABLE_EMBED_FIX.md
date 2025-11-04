# 🔧 Fix: Raw JSON Showing on /elevate Page

## ❌ What You Did (Wrong)

You added **raw JSON data** to a Durable Embed block:

```json
{
  "hero": {
    "title": "Elevate for Humanity Empowerment Center",
    ...
  },
  "programs": [...],
  ...
}
```

**Result:** The JSON shows as plain text on the page (a mess!)

---

## ✅ What You SHOULD Do (2 Options)

### OPTION 1: Use the Bridge (Recommended)

**This makes the content dynamic and manageable from Netlify**

#### Step 1: Remove the JSON from Durable

1. Go to Durable.co → Edit Site
2. Go to `/elevate` page
3. Find the Embed block with the JSON
4. **DELETE the entire Embed block**

#### Step 2: Add Bridge Script to Site Settings

1. In Durable, go to **Settings** → **Custom Code** (or **SEO & Code**)
2. Add this to the **HEAD section**:

```html
<script
  src="https://main--elevateforhumanityfix.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

3. **Save**

#### Step 3: Add Content Slot to /elevate Page

1. Go back to `/elevate` page editor
2. Add an **HTML block** where you want programs to show
3. Add this code:

```html
<div data-efh-slot="programs"></div>
```

4. **Save and Publish**

**Result:** Programs will load dynamically from Netlify, including CPRS!

---

### OPTION 2: Convert JSON to HTML (Static)

**This makes it static HTML on Durable (no bridge needed)**

#### Step 1: Remove the JSON

Same as Option 1 - delete the Embed block with JSON

#### Step 2: Add HTML Instead

Add an **HTML block** with this code:

```html
<div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 60px;">
    <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 20px;">
      Elevate for Humanity Empowerment Center
    </h1>
    <p style="font-size: 20px; color: #666;">
      Transform Your Future Through Skills Training • Barber Apprenticeship •
      HVAC • Healthcare • Drug Testing Business
    </p>
    <a
      href="https://elevateforhumanityfix2.netlify.app/get-started"
      style="display: inline-block; margin-top: 30px; padding: 15px 40px; background: #4D4B37; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;"
    >
      Apply Now
    </a>
  </div>

  <h2
    style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 40px;"
  >
    Our Programs
  </h2>

  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;"
  >
    <!-- Barber Apprenticeship -->
    <div
      style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; background: white;"
    >
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        Barber Apprenticeship
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        Earn while you learn. Master the art of barbering with hands-on training
        and mentorship from industry professionals.
      </p>
      <a
        href="/programs/barber"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>

    <!-- HVAC & Welding -->
    <div
      style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; background: white;"
    >
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        HVAC & Welding
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        High-demand skilled trades training. Get certified and start a rewarding
        career in heating, ventilation, air conditioning, or welding.
      </p>
      <a
        href="/programs/hvac"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>

    <!-- Healthcare -->
    <div
      style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; background: white;"
    >
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        Healthcare (CNA/QMA)
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        Fast-track to healthcare careers. Become a Certified Nursing Assistant
        or Qualified Medication Aide in weeks, not years.
      </p>
      <a
        href="/programs/healthcare"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>

    <!-- Drug Testing Business -->
    <div
      style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; background: white;"
    >
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        Drug Testing Business
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        Start your own business. Learn to operate a mobile drug testing service
        with full training and certification.
      </p>
      <a
        href="/programs/drug-testing"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>

    <!-- Digital Skills -->
    <div
      style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; background: white;"
    >
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        Digital Skills
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        Master essential tech skills. From basic computer literacy to advanced
        digital tools for the modern workplace.
      </p>
      <a
        href="/programs/digital"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>

    <!-- Leadership Development -->
    <div
      style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; background: white;"
    >
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        Leadership Development
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        Build leadership capabilities. Develop the soft skills and management
        expertise employers value most.
      </p>
      <a
        href="/programs/leadership"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>

    <!-- CPRS - NEW! -->
    <div
      style="border: 2px solid #4D4B37; border-radius: 12px; padding: 30px; background: #F2F0D9;"
    >
      <div
        style="display: inline-block; background: #4D4B37; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px;"
      >
        NEW PROGRAM
      </div>
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
        Certified Peer Recovery Specialist (CPRS)
      </h3>
      <p style="color: #666; margin-bottom: 20px;">
        Launch a rewarding career in mental health recovery. WIOA/WRG funded
        program combining clinical training with peer support skills. $5,000 per
        student funding available.
      </p>
      <a
        href="/programs/cprs"
        style="color: #4D4B37; font-weight: bold; text-decoration: none;"
        >Learn more →</a
      >
    </div>
  </div>

  <!-- Stats Section -->
  <div
    style="margin-top: 80px; padding: 60px 40px; background: #4D4B37; border-radius: 12px; color: white; text-align: center;"
  >
    <h2 style="font-size: 36px; font-weight: bold; margin-bottom: 40px;">
      Our Impact
    </h2>
    <div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;"
    >
      <div>
        <div style="font-size: 48px; font-weight: bold;">5,000+</div>
        <div style="font-size: 18px; opacity: 0.9;">Graduates</div>
      </div>
      <div>
        <div style="font-size: 48px; font-weight: bold;">92%</div>
        <div style="font-size: 18px; opacity: 0.9;">Job Placement Rate</div>
      </div>
      <div>
        <div style="font-size: 48px; font-weight: bold;">$15,000</div>
        <div style="font-size: 18px; opacity: 0.9;">Avg. Salary Increase</div>
      </div>
      <div>
        <div style="font-size: 48px; font-weight: bold;">13+</div>
        <div style="font-size: 18px; opacity: 0.9;">Programs Offered</div>
      </div>
    </div>
  </div>

  <!-- CTA Section -->
  <div style="margin-top: 80px; text-align: center;">
    <h2 style="font-size: 42px; font-weight: bold; margin-bottom: 20px;">
      Ready to Transform Your Future?
    </h2>
    <p style="font-size: 20px; color: #666; margin-bottom: 40px;">
      Join thousands of graduates who have changed their lives through skills
      training.
    </p>
    <a
      href="https://elevateforhumanityfix2.netlify.app/get-started"
      style="display: inline-block; padding: 20px 50px; background: #4D4B37; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;"
    >
      Start Your Application
    </a>
  </div>
</div>
```

3. **Save and Publish**

**Result:** Beautiful formatted page with all programs including CPRS!

---

## 🎯 Which Option Should You Choose?

### Choose OPTION 1 (Bridge) if:

- ✅ You want to update content from Netlify (easier)
- ✅ You want dynamic content that syncs across sites
- ✅ You plan to add more programs later
- ✅ You want the bridge to work on other pages too

### Choose OPTION 2 (Static HTML) if:

- ✅ You want it to work NOW without bridge setup
- ✅ You don't need to update content often
- ✅ You want full control over styling
- ✅ You only need it on this one page

---

## 🚀 My Recommendation

**Use OPTION 1 (Bridge)** because:

1. You already have the bridge built and working
2. You can update content from Netlify without touching Durable
3. It's more professional and scalable
4. You can use it on multiple pages (homepage, programs page, etc.)

---

## 📋 Quick Steps (Option 1)

1. **Delete** the Embed block with JSON from /elevate page
2. **Add** bridge script to Custom Code (head section)
3. **Add** `<div data-efh-slot="programs"></div>` to /elevate page
4. **Save and Publish**
5. **Visit** www.elevateforhumanity.org/elevate
6. **See** beautiful program cards including CPRS!

---

## ❓ Need Help?

Tell me:

1. Which option do you want to use?
2. Can you find the Custom Code section in Durable settings?
3. Do you see the Embed block with JSON on the /elevate page?

I'll walk you through it step by step! 🎯
