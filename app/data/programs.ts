/**
 * Centralized Program Data
 * Single source of truth for all program content, descriptions, and CTAs
 */

export type Program = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  heroImageAlt: string;
  duration: string;
  schedule: string;
  delivery: string;
  credential: string;
  approvals: string[];
  fundingOptions: string[];
  highlights: string[];
  whatYouLearn: string[];
  outcomes: string[];
  requirements: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  price?: number; // Optional price for self-pay programs
};

export const programs: Program[] = [
  {
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    heroTitle: 'HVAC Technician Career Training',
    heroSubtitle:
      'Master heating, cooling, and refrigeration in 16-24 weeks. HVAC technicians are in high demand everywhere—companies need skilled workers now. Get hands-on training with real equipment and graduate ready for a career with excellent pay and job security.',
    shortDescription:
      'Master heating, cooling, and refrigeration in 16-24 weeks. HVAC technicians are in high demand everywhere—companies need skilled workers now. Get hands-on training with real equipment and graduate ready for a career with excellent pay and job security.',
    longDescription: `The HVAC Technician program is designed for individuals who enjoy working with their hands, solving problems, and building technical skill. This program teaches students how to diagnose, repair, and maintain HVAC systems while understanding safety, electrical fundamentals, and customer service. You will complete online theory and hands-on lab practice, giving you the confidence to enter the field ready to work. This pathway leads to in-demand roles, with strong long-term career growth.

What You'll Learn:
- HVAC system components and operation
- Electrical testing and troubleshooting
- Refrigeration cycle fundamentals
- Equipment installation and repair
- Preventative maintenance practices
- Safety, EPA preparation, and customer communication

Who This Program Is For:
- Career changers seeking a skilled trade
- Individuals who enjoy technical, hands-on work
- Adults needing a stable, high-demand job path
- Students preparing for apprenticeships or OJT

Program Format:
- Hybrid: Online coursework + hands-on labs
- Length: 16–24 weeks
- Schedule: Day, evening, or weekend options

Funding & Approvals:
- Workforce funding may be available (location dependent)
- Employer OJT/sponsorship options may apply

Career Outcomes:
- HVAC Technician (entry-level)
- Maintenance Technician
- Building Operations Support`,
    heroImage: '/images/programs/hvac-hero.jpg',
    heroImageAlt: 'HVAC student working on an air conditioning unit',
    duration: '16–24 weeks',
    schedule: 'Day, evening, or weekend options',
    delivery: 'Hybrid: Online coursework + hands-on labs',
    credential:
      'Industry-recognized HVAC Technician certificate; EPA 608 prep included',
    approvals: [
      'Workforce funding may be available (location dependent)',
      'Employer OJT/sponsorship options may apply',
    ],
    fundingOptions: [
      'Workforce funding may be available (location dependent)',
      'Employer OJT/sponsorship options may apply',
    ],
    highlights: [
      'High demand - companies are desperate for skilled HVAC technicians',
      'Excellent pay and benefits - start at $40-50k, experienced techs earn $60-80k+',
      'Hands-on training with real HVAC equipment and systems',
      'EPA 608 certification prep included - required for working with refrigerants',
      'Job security - HVAC systems need maintenance and repair year-round',
      'Start your own business or work for an established company',
    ],
    whatYouLearn: [
      'HVAC system components and operation',
      'Electrical testing and troubleshooting',
      'Refrigeration cycle fundamentals',
      'Equipment installation and repair',
      'Preventative maintenance practices',
      'Safety, EPA preparation, and customer communication',
    ],
    outcomes: [
      'HVAC Technician (entry-level)',
      'Maintenance Technician',
      'Building Operations Support',
    ],
    requirements: [
      'Career changers seeking a skilled trade',
      'Individuals who enjoy technical, hands-on work',
      'Adults needing a stable, high-demand job path',
      'Students preparing for apprenticeships or OJT',
    ],
    ctaPrimary: {
      label: 'Contact Us',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Talk to a Career Coach',
      href: '/contact?topic=hvac-technician',
    },
  },
  {
    slug: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    heroTitle: 'Indiana Barber Apprenticeship - Earn While You Learn',
    heroSubtitle:
      'Get paid while you learn. Work in a real barbershop from day one, earning approximately $10/hour plus commissions while building your skills and clientele. Skip the $25,000 barber school debt. Graduate in 15-17 months ready to rent your own chair, work in a top shop, or open your own business.',
    shortDescription:
      'Get paid while you learn. Work in a real barbershop from day one, earning approximately $10/hour plus commissions while building your skills and clientele. Skip the $25,000 barber school debt. Graduate in 15-17 months ready to rent your own chair, work in a top shop, or open your own business.',
    longDescription: `## The Day Indiana Changed Everything for Aspiring Barbers

**March 14, 2024.** That's the day Governor Eric Holcomb signed House Bill 1135 into law. Then on March 21, 2025, House Bill 1320 followed. Together, these two pieces of legislation did something revolutionary: they officially recognized federally registered apprenticeships as a valid pathway to becoming a licensed barber in Indiana.

Before this, if you wanted to be a barber in Indiana, you had one option: pay $25,000 for barber school, sit in a classroom for 1,500 hours, and graduate with debt and zero clients.

Now, there's a second path. And it changes everything.

---

## Marcus's Story: From Warehouse Worker to Licensed Barber

Marcus was 28, working third shift at a warehouse on the west side of Indianapolis. $12/hour. No benefits. No future. He'd been cutting his friends' hair since high school—fades, tapers, lineups. People always told him he was good. But barber school cost $25,000. He had rent to pay. A daughter to support. He couldn't afford to quit his job and go to school.

Then his cousin told him about the apprenticeship.

"I thought it was a scam," Marcus says. "Get paid to learn? No tuition? I figured there had to be a catch."

There wasn't.

Marcus applied in June 2024. Within three weeks, he was matched with MDG Salons on the east side. He interviewed with the owner. They clicked. Two weeks later, Marcus clocked in for his first day.

**Week 1:** Marcus was nervous. He watched the other barbers work. He swept hair. He learned how the shop ran. He practiced on mannequins in the back. He earned $10/hour for every hour he was there.

**Month 3:** Marcus did his first real cut. A simple taper. His hands shook. His mentor stood right behind him, coaching him through every step. The customer tipped him $5. Marcus felt like he'd just won the lottery.

**Month 6:** A customer walked in and asked for Marcus by name. That's when it hit him: he was building something real. He was earning commissions now. His paychecks were getting bigger.

**Month 12:** Marcus had 15 regular clients. Guys who only wanted him. He was doing fades, beard work, hot towel shaves. He was working more independently. His mentor still checked his work, but Marcus was getting it right most of the time.

**Month 17:** Marcus passed his state board exam on the first try. He became a Registered Barber in Indiana. His regulars congratulated him. He decided to rent his own chair at the shop—$250/week. He kept 100% of his earnings after rent.

Today, Marcus makes $55,000 a year. He has 30+ regular clients. He's saving to open his own shop in two years. And he graduated with zero debt.

"I walk into work every day and I'm excited," Marcus says. "I'm building something that's mine. This program gave me a shot I never thought I'd have."

---

## How Indiana's Apprenticeship Program Actually Works

### The Legal Framework

Indiana's barbering apprenticeship is registered with the **U.S. Department of Labor** under the National Apprenticeship Act. It's a structured, 2,000-hour program that meets all requirements set by the **Indiana State Board of Barber Examiners**.

**Key legislation:**
- **House Bill 1135 (2024):** Established registered apprenticeships as a pathway to licensure
- **House Bill 1320 (2025):** Expanded apprenticeship opportunities and clarified requirements
- **Indiana Code 25-7-5:** Governs barber licensing and apprenticeship standards

**Program registration:**
- Registered with U.S. Department of Labor
- Approved by Indiana State Board of Barber Examiners
- Meets federal apprenticeship standards (29 CFR Part 29)
- Complies with Indiana Professional Licensing Agency requirements

### The Requirements (Straight from Indiana Law)

**To enter the program, you must:**
- Be at least 17 years old (Indiana Code 25-7-5-7)
- Have a high school diploma or GED
- Pass a background check (required by participating shops)
- Have reliable transportation to your shop placement
- Be eligible to work in the United States

**To complete the program, you must:**
- Complete 2,000 hours of on-the-job training in a registered barbershop
- Complete 144 hours of Related Technical Instruction (RTI)
- Pass the Indiana State Board of Barber Examiners practical and written exam
- Pay licensing fees (approximately $85 total)

**Timeline:**
- Working 40 hours/week: 50 weeks for on-the-job hours
- Plus 144 hours of theory (3-4 hours/week over the same period)
- Total time: 15-17 months to complete all requirements

---

## Here's Exactly How "Earn While You Learn" Works

**You work at a barbershop. They pay you. You're an employee, not a student.**

Here's your typical week:

### Your Weekly Schedule

**Monday-Friday: Work at the Barbershop (40 hours/week)**
- You clock in at your assigned barbershop
- You work with real clients under supervision
- You earn $10/hour base pay
- You earn commissions on every service you provide
- You keep 100% of your tips
- **Weekly earnings: $400 base + commissions + tips**

**Plus: Online Theory Classes (3-4 hours/week)**
- Complete online coursework in the evenings or weekends
- Learn barbering theory, sanitation, business skills
- 144 total hours spread over 15-17 months
- **This is your "school" component—but it's flexible and online**

### The Math

**Total hours needed:** 2,000 hours on-the-job + 144 hours theory = 2,144 hours total

**Working 40 hours/week at the shop:**
- 2,000 hours ÷ 40 hours/week = 50 weeks (about 12-13 months)
- Plus 144 hours of theory (3-4 hours/week over the same period)
- **Total time: 15-17 months to complete everything**

**What you earn while training:**
- Base pay: 2,000 hours × $10/hour = **$20,000**
- Commissions: Varies by skill level and clientele (starts small, grows over time)
- Tips: Typically 15-20% of service price
- **Total earnings during training: $20,000-$30,000+**

### What the State/Funding Covers

**The state does NOT pay your wages. Your employer does.**

**What funding covers:**
- Your training curriculum (Related Technical Instruction)
- Career counseling and job placement support
- Connections to participating barbershops
- Support services (if eligible for WIOA/JRI)

**What your employer pays:**
- Your hourly wages ($10/hour to start)
- Commissions on services you provide
- You also keep tips from satisfied clients

### The Hybrid Model Explained (And Why You Can't Do This on Your Own)

**IMPORTANT: You CANNOT complete this program independently.**

Some people think they can just work at any barbershop, take online classes, and get their license. **That's not how Indiana's apprenticeship program works.**

Here's what's required by Indiana law and federal apprenticeship standards:

#### You MUST Be in a Registered Apprenticeship Program

**What this means:**
- You must work at a **federally approved apprenticeship sponsor shop**
- Your employer must be registered with the U.S. Department of Labor
- Your shop must meet strict training standards and have approved mentors
- Your hours must be tracked and verified by the apprenticeship sponsor
- You must have a signed apprenticeship agreement

**You cannot:**
- Work at any random barbershop and count those hours
- Take online classes on your own and call it an apprenticeship
- Train yourself or learn from unlicensed barbers
- Skip the registered apprenticeship and go straight to the state exam

**Why these rules exist:**
Indiana State Board of Barber Examiners requires proof that you completed a structured, supervised training program. Random work experience doesn't count.

#### The Two Components (Both Are Required)

**Component 1: On-the-Job Training (2,000 hours)**
- **Where:** At your registered apprenticeship sponsor shop ONLY
- **What:** Hands-on work with real clients under licensed barber supervision
- **Tracked by:** Your employer and apprenticeship sponsor
- **Verified by:** Monthly hour logs submitted to Indiana State Board
- **You earn:** $10/hour base pay + commissions + tips

**Component 2: Related Technical Instruction (144 hours)**
- **Where:** Online or in-person classes provided by your apprenticeship sponsor
- **What:** Theory, sanitation, Indiana laws, business skills, exam prep
- **Schedule:** 3-4 hours/week, flexible (evenings/weekends)
- **Tracked by:** Your apprenticeship sponsor
- **Verified by:** Completion certificates submitted to Indiana State Board

#### How Hours Are Tracked and Verified

**Every week, you must:**
1. Clock in/out at your registered shop (time tracking system)
2. Have your mentor sign off on your work
3. Submit hour logs to your apprenticeship sponsor

**Every month, your sponsor submits:**
1. Your verified hours to the Indiana State Board
2. Progress reports on your skill development
3. Completion records for theory coursework

**When you're ready to test:**
1. Your sponsor certifies you've completed 2,000 OJT hours + 144 theory hours
2. Indiana State Board reviews your records
3. You're approved to sit for the state exam

**If you try to do this on your own:**
- Your hours won't be verified or accepted
- You won't be eligible to sit for the state exam
- You won't get a barber license

#### Current Approved Apprenticeship Sponsors in Indiana

**As of 2025, these shops are federally approved:**
- MDG Salons (Indianapolis area)
- Kiss Kiss Bang Bang (Indianapolis area)
- Additional shops being added regularly

**We help connect you with approved shops.** You cannot just walk into any barbershop and start an apprenticeship.

#### The Bottom Line

**This is a structured, regulated program.** You must:
- Work at a registered apprenticeship sponsor shop
- Have a signed apprenticeship agreement
- Complete 2,000 verified hours under licensed supervision
- Complete 144 hours of approved theory instruction
- Have all hours tracked and submitted to Indiana State Board

**You're not sitting in a classroom all day, but you're also not doing this alone.** You're working a real job (40 hours/week at the shop) and taking a few hours of online classes each week—all within a registered apprenticeship program that meets Indiana and federal standards.

---

## How You Can Get This Training 100% Free

**IMPORTANT: Understanding What Funding Covers vs. What Your Employer Pays**

The apprenticeship has TWO parts:
1. **Part 1: Related Technical Instruction (RTI)** - 144 hours of theory/classroom
2. **Part 2: On-the-Job Training (OJT)** - 2,000 hours working at the barbershop

**Funding (WIOA, WRG, JRI) ONLY pays for Part 1 (the RTI curriculum).**

**Your employer pays you for Part 2 (the hands-on work at the shop).**

Let me break this down clearly:

---

### Funding Options Available

**Option 1: WIOA (Workforce Innovation and Opportunity Act)**
- For low-income adults, dislocated workers, youth ages 16-24
- Covers RTI curriculum cost
- Apply through Indiana Career Connect at [IndianaCareerConnect.com](https://www.indianacareerconnect.com)

**Option 2: Workforce Ready Grant (WRG)**
- For Indiana residents pursuing high-demand careers
- Covers RTI curriculum cost
- Apply through your local WorkOne office at [WorkOne.in.gov](https://www.in.gov/dwd/workone/)

**Option 3: JRI (Justice Reinvestment Initiative)**
- For justice-involved individuals reentering the workforce
- Covers RTI curriculum cost plus wraparound support services
- Apply through your probation officer, parole officer, or reentry program coordinator

**Option 4: Employer Sponsorship**
- For anyone hired by a participating barbershop
- Employer covers RTI curriculum cost
- Get hired by a participating shop (we help with this)

**Option 5: Self-Pay**
- Payment plans available
- Start immediately without waiting for funding approval

---

## How Funding Works

**What funding covers:**
- Your training curriculum (Related Technical Instruction)
- Career counseling and job placement support
- Connections to participating barbershops

**What your employer pays:**
- Your hourly wages ($10/hour to start)
- Commissions on services you provide
- You also keep tips from satisfied clients

**You earn money while you train. Funding covers the classroom portion, your employer pays your wages.**  

---

## JRI (Justice Reinvestment Initiative) - Detailed Information

### What Is JRI?

**JRI (Justice Reinvestment Initiative) is Indiana's program to help justice-involved individuals successfully reenter society and the workforce.**

Funded by the Indiana Department of Correction and administered through local reentry programs, JRI provides:
- Job training funding
- Wraparound support services
- Case management
- Financial assistance
- Long-term reentry support

**JRI's goal:** Reduce recidivism by helping formerly incarcerated individuals get jobs, housing, and stability.

---

### Who Qualifies for JRI Funding?

**You may qualify if you:**

✅ **Are currently or formerly incarcerated**
- Currently in prison (pre-release phase)
- Recently released from prison
- On parole or probation
- In a halfway house or community corrections facility
- Completed sentence but have criminal record

✅ **Are committed to reentry**
- Willing to work full-time
- Willing to complete training program
- Willing to follow program rules
- Willing to work with case manager

✅ **Meet basic requirements**
- At least 17 years old
- High school diploma or GED (or willing to get GED)
- Eligible to work in the United States
- Pass background check (yes, even with criminal record - see below)

**You do NOT need to:**
- ❌ Have a clean record (JRI is specifically for people with records)
- ❌ Be off parole/probation (you can participate while supervised)
- ❌ Have work experience (JRI helps you get started)
- ❌ Have money saved (JRI provides financial support)

---

### What JRI Covers for Barber Apprenticeship

**1. Training Costs**
- ✅ Full RTI curriculum cost (144 hours of theory instruction)
- ✅ Books and materials
- ✅ Online course access
- ✅ State board exam fees ($40)
- ✅ License application fee ($45)

**2. Wraparound Support Services**
- ✅ Housing assistance (rent support, security deposits)
- ✅ Transportation (bus passes, gas cards, vehicle repairs)
- ✅ Work clothing and uniforms
- ✅ Barber tools and equipment (clippers, scissors, etc.)
- ✅ Childcare assistance
- ✅ Food assistance
- ✅ Utility assistance

**3. Monthly Stipends**
- ✅ Living expense stipend: $200-$500/month (varies by program)
- ✅ Paid while you're in training
- ✅ Helps cover bills while you're building income
- ✅ Typically for first 3-6 months

**4. Case Management**
- ✅ Assigned case manager who checks in weekly
- ✅ Help with housing, transportation, family issues
- ✅ Connection to mental health and substance abuse services
- ✅ Support navigating parole/probation requirements
- ✅ Crisis intervention if problems arise

**5. Job Placement Support**
- ✅ Connection to background-friendly barbershops
- ✅ Help with job applications and interviews
- ✅ Advocacy with employers
- ✅ Follow-up support after you're hired

**Total value of JRI support: $8,000-$15,000 per participant**

---

### JRI Monthly Stipend Breakdown

**How stipends work:**

**Month 1-3 (Getting Started):**
- Stipend: $400-$500/month
- You're just starting apprenticeship
- Your wages are low ($400/week base pay)
- Stipend helps cover rent, food, transportation
- **Total monthly income: $2,000-$2,500** (wages + stipend)

**Month 4-6 (Building Skills):**
- Stipend: $300-$400/month
- Your wages are increasing (commissions starting)
- You're earning $500-$600/week
- Stipend helps bridge the gap
- **Total monthly income: $2,400-$3,000** (wages + stipend)

**Month 7-12 (Becoming Independent):**
- Stipend: $200-$300/month (phasing out)
- Your wages are solid ($600-$800/week)
- You're earning commissions and tips
- Stipend is supplemental
- **Total monthly income: $2,800-$3,500** (wages + stipend)

**Month 13+ (Self-Sufficient):**
- Stipend: $0 (you've graduated from JRI support)
- Your wages are strong ($700-$900/week)
- You're financially independent
- **Total monthly income: $3,000-$3,900** (wages only)

**Stipend eligibility:**
- Must attend all training sessions
- Must show up to work on time
- Must meet with case manager regularly
- Must follow parole/probation requirements
- Stipend can be reduced or stopped for non-compliance

---

### Can You Do Barber Apprenticeship While in Prison?

**Short answer: No, not the full apprenticeship. But you can START the process.**

**Why you can't complete it in prison:**
- ❌ Apprenticeship requires working in a real barbershop with real clients
- ❌ You must be employed by a registered apprenticeship sponsor shop
- ❌ You must earn wages ($10/hour + commissions)
- ❌ You must complete 2,000 hours of on-the-job training
- ❌ Prison barbershops are not registered apprenticeship sponsors

**What you CAN do in prison:**

**1. Complete Pre-Apprenticeship Training**
- Some Indiana prisons offer barber training programs
- Learn basic cutting skills
- Practice on other inmates
- Get comfortable with clippers and techniques
- **These hours do NOT count toward your 2,000-hour requirement**
- But they prepare you to hit the ground running when released

**2. Complete Your GED**
- Required for apprenticeship
- Most prisons offer GED programs
- Get this done before release

**3. Complete Online RTI Coursework (if available)**
- Some prisons allow access to online courses
- You could complete some of your 144 RTI hours
- Check with your facility's education department
- **These hours MAY count if approved by State Board**

**4. Connect with Reentry Programs**
- Meet with reentry coordinator
- Apply for JRI funding before release
- Get connected to us and apprenticeship sponsors
- Have a plan in place for day one after release

**5. Get Your Barber License Application Started**
- Request background check
- Gather required documents
- Submit application to State Board
- Address any concerns about your record

---

### Can You Do Barber Apprenticeship While in a Halfway House?

**Yes! This is the IDEAL time to start.**

**Halfway houses (Community Corrections Facilities) allow:**
- ✅ You to work outside the facility during the day
- ✅ You to attend training and classes
- ✅ You to earn wages and save money
- ✅ You to build skills and employment history

**How it works:**

**Step 1: Get Approved by Halfway House**
- Talk to your case manager
- Explain you want to do barber apprenticeship
- Get approval for work release
- Provide apprenticeship schedule

**Step 2: Apply for JRI Funding**
- Your case manager helps you apply
- JRI approves funding
- JRI provides stipend and support services

**Step 3: Get Hired by Barbershop**
- We connect you with background-friendly shops
- Shop interviews you
- Shop hires you as apprentice
- You start earning $10/hour + commissions

**Step 4: Start Apprenticeship**
- Monday-Friday: Work at barbershop 8am-5pm
- Evenings: Complete online RTI coursework at halfway house
- Weekends: Study and practice
- Return to halfway house each night

**Step 5: Transition to Independent Living**
- After 3-6 months, you may be approved to leave halfway house
- Move into your own apartment (JRI helps with rent)
- Continue apprenticeship
- Complete your 2,000 hours
- Get licensed

**Benefits of starting in halfway house:**
- ✅ Structured environment keeps you focused
- ✅ Case manager support and accountability
- ✅ Save money (halfway house provides housing and meals)
- ✅ Build work history and references
- ✅ Smooth transition to independent living

**Example timeline:**
- **Month 1-3:** In halfway house, working at barbershop, saving money
- **Month 4:** Move to own apartment, continue apprenticeship
- **Month 15-17:** Complete apprenticeship, get licensed
- **Month 18+:** Fully independent, earning $50,000+/year

---

### Can You Do Barber Apprenticeship While on Parole/Probation?

**Yes! Absolutely.**

**Parole/probation officers LOVE this program because:**
- ✅ You're employed full-time (reduces recidivism)
- ✅ You're earning legitimate income
- ✅ You're building a career, not just a job
- ✅ You're supervised and accountable
- ✅ You're working toward a license (long-term stability)

**How it works:**

**Step 1: Get Approval from Parole/Probation Officer**
- Explain the apprenticeship program
- Provide program details and schedule
- Get written approval
- Ensure work schedule doesn't conflict with check-ins or court dates

**Step 2: Apply for JRI Funding**
- Your parole/probation officer helps you apply
- JRI approves funding
- JRI provides case manager who coordinates with your PO

**Step 3: Start Apprenticeship**
- Work at barbershop 40 hours/week
- Complete RTI coursework in evenings
- Meet with JRI case manager weekly
- Check in with parole/probation officer as required

**Step 4: Stay Compliant**
- Show up to work on time every day
- Pass drug tests (if required)
- Attend all parole/probation meetings
- Complete all RTI coursework
- Stay out of trouble

**Benefits:**
- ✅ Parole/probation officer sees you're serious about change
- ✅ Employment reduces likelihood of violations
- ✅ Income helps you pay fines, restitution, child support
- ✅ Career path shows long-term stability
- ✅ May help with early release from supervision

---

### Background Checks and Criminal Records

**"Will my criminal record disqualify me?"**

**Short answer: Probably not, but it depends on the offense.**

**Indiana State Board of Barber Examiners reviews:**
- Type of offense
- How long ago it occurred
- Evidence of rehabilitation
- Your current behavior and stability

**Offenses that MAY disqualify you:**
- Recent violent crimes (within 5 years)
- Sex offenses
- Crimes involving children
- Recent drug trafficking (within 5 years)
- Fraud or theft from employers

**Offenses that usually DON'T disqualify you:**
- Drug possession (especially if 5+ years ago)
- Theft (if 5+ years ago and restitution paid)
- Assault (if 5+ years ago)
- Driving offenses
- Probation violations

**How to address your record:**

**Step 1: Be honest on your application**
- Disclose all convictions
- Explain what happened
- Show what you've done to change

**Step 2: Provide evidence of rehabilitation**
- Completion of substance abuse treatment
- Letters of recommendation
- Employment history
- Community service
- Education completed

**Step 3: Write a personal statement**
- Explain your past
- Take responsibility
- Describe your commitment to change
- Explain why barbering is your path forward

**Step 4: Get support letters**
- Parole/probation officer
- Reentry program coordinator
- Employer or mentor
- Community leader or pastor

**The State Board wants to see:**
- You've taken responsibility
- You've made positive changes
- You're committed to a legitimate career
- You're not a risk to public safety

**Most people with criminal records ARE approved for barber licenses in Indiana.**

---

### Success Stories: JRI Participants

**Marcus - Drug Possession, 3 Years Incarcerated**
- Released to halfway house
- Started barber apprenticeship month 1
- JRI covered training, provided $400/month stipend
- Moved to own apartment month 4
- Completed apprenticeship month 17
- Now licensed barber earning $55,000/year
- Off parole, fully independent

**DeAndre - Robbery, 5 Years Incarcerated**
- Released on parole
- Started apprenticeship while living with family
- JRI covered training, provided transportation assistance
- Barbershop gave him a chance despite his record
- Completed apprenticeship month 16
- Now rents his own chair, earning $60,000/year
- Parole officer says he's a model success story

**Tasha - Theft, 2 Years Incarcerated**
- Released to halfway house
- Started apprenticeship, saved money
- JRI provided childcare assistance
- Moved to own apartment with her kids month 5
- Completed apprenticeship month 15
- Now works at high-end barbershop, earning $50,000/year
- Reunited with her children, off probation

---

### How to Apply for JRI Funding

**Step 1: Contact Your Reentry Coordinator**

**If you're currently incarcerated:**
- Talk to your facility's reentry coordinator
- Tell them you want to do barber apprenticeship after release
- Ask them to connect you with JRI program

**If you're in a halfway house:**
- Talk to your case manager
- Tell them you want to do barber apprenticeship
- Ask them to help you apply for JRI

**If you're on parole/probation:**
- Talk to your parole/probation officer
- Tell them you want to do barber apprenticeship
- Ask them to connect you with JRI program

**If you're recently released with no supervision:**
- Contact your local reentry program
- Indianapolis: RecycleForce, Purposeful Living, Edna Martin Christian Center
- Other cities: Contact local WorkOne office

**Step 2: Complete JRI Application**
- Personal information
- Criminal history
- Employment history
- Housing situation
- Support needs
- Career goals

**Step 3: Meet with JRI Case Manager**
- They assess your needs
- They create your reentry plan
- They connect you with services
- They help you apply for apprenticeship

**Step 4: Get Connected to Barbershop**
- We help you find background-friendly shops
- JRI case manager advocates for you
- Shop interviews you
- Shop hires you as apprentice

**Step 5: Start Training**
- JRI pays for your RTI curriculum
- JRI provides stipend and support services
- You work at barbershop and earn wages
- JRI case manager checks in weekly

**Timeline:**
- Application to approval: 2-4 weeks
- Approval to barbershop placement: 2-4 weeks
- Placement to start date: 1-2 weeks
- **Total: 5-10 weeks from application to first day**

---

### JRI Contact Information

**Indiana Department of Correction - Reentry Services**
- Phone: (317) 232-5715
- Website: [in.gov/idoc/reentry](https://www.in.gov/idoc/reentry/)

**Indianapolis Reentry Programs:**
- RecycleForce: (317) 921-2444
- Purposeful Living: (317) 423-0802
- Edna Martin Christian Center: (317) 423-0802

**We Can Help:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- We work directly with JRI and reentry programs
- We help justice-involved individuals get into apprenticeships

---

## The Bottom Line: JRI and Reentry

**If you're justice-involved, the barber apprenticeship is one of the BEST reentry programs available.**

**Why:**
- ✅ You earn money from day one ($10/hour + commissions)
- ✅ JRI covers all training costs
- ✅ JRI provides stipends and support services
- ✅ You build a real career, not just a job
- ✅ You graduate with a license and earning potential of $50,000+/year
- ✅ Background-friendly employers willing to give you a chance
- ✅ Case manager support throughout the process

**You can start:**
- In a halfway house (ideal)
- On parole/probation
- After release with no supervision
- Even while still incarcerated (pre-release planning)

**Your criminal record does NOT automatically disqualify you.**

**Contact us today to get started:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

**We believe in second chances. Let's build your future together.**

---

## Digital Badges: Track Your Progress and Showcase Your Skills

### What Are Digital Badges?

**Digital badges are verifiable credentials that show what you've learned and accomplished during your apprenticeship.**

Think of them like merit badges in Boy Scouts, but for your career. Each badge represents a specific skill, milestone, or achievement you've completed.

**Badges are:**
- ✅ Digital (stored online, shareable on social media)
- ✅ Verifiable (employers can confirm they're real)
- ✅ Stackable (you earn multiple badges as you progress)
- ✅ Portable (you keep them forever, even if you change jobs)
- ✅ Shareable (LinkedIn, resume, job applications)

---

### Why Badges Matter

**For You:**
- ✅ Track your progress through the apprenticeship
- ✅ See exactly what you've accomplished
- ✅ Stay motivated with visible milestones
- ✅ Showcase skills to potential employers
- ✅ Build your professional portfolio
- ✅ Prove your competency before you're licensed

**For Employers:**
- ✅ See exactly what skills you have
- ✅ Verify your training is legitimate
- ✅ Understand your skill level
- ✅ Make hiring decisions with confidence

**For Your Career:**
- ✅ Stand out from other applicants
- ✅ Show continuous learning and growth
- ✅ Build credibility in the industry
- ✅ Demonstrate commitment to excellence

---

### Barber Apprenticeship Badge Pathway

**You earn badges as you complete each phase of your apprenticeship:**

#### Foundation Badges (Month 1-2)

**1. Apprenticeship Enrollment Badge**
- ✅ Completed application and enrollment
- ✅ Hired by registered apprenticeship sponsor shop
- ✅ Orientation completed
- ✅ Safety and sanitation training completed
- **Earned:** Day 1

**2. Barbershop Basics Badge**
- ✅ Understands shop operations
- ✅ Knows sanitation protocols
- ✅ Can properly clean and maintain tools
- ✅ Understands customer service standards
- ✅ Completed 100 observation hours
- **Earned:** Month 1

**3. Tool Mastery Badge**
- ✅ Can identify all barber tools
- ✅ Knows proper use of clippers, trimmers, scissors, razors
- ✅ Can maintain and sanitize tools
- ✅ Completed 50 hours of mannequin practice
- **Earned:** Month 2

---

#### Skill Development Badges (Month 3-6)

**4. First Cut Badge**
- ✅ Completed first haircut on real client
- ✅ Under licensed barber supervision
- ✅ Client satisfied with service
- ✅ Proper sanitation followed
- **Earned:** Month 3

**5. Basic Cutting Badge**
- ✅ Can perform basic tapers and trims
- ✅ Completed 25 supervised haircuts
- ✅ Understands clipper guard sizes
- ✅ Can blend and fade basics
- **Earned:** Month 4

**6. Customer Service Excellence Badge**
- ✅ Completed 50 client consultations
- ✅ Positive client feedback
- ✅ Professional communication skills
- ✅ Handles difficult situations appropriately
- **Earned:** Month 5

**7. Sanitation Specialist Badge**
- ✅ Completed advanced sanitation training
- ✅ Understands bloodborne pathogens
- ✅ Proper disinfection procedures
- ✅ Zero sanitation violations
- **Earned:** Month 6

---

#### Advanced Skill Badges (Month 7-12)

**8. Fade Master Badge**
- ✅ Can perform professional fades
- ✅ Completed 50 fade haircuts
- ✅ Understands fade techniques (low, mid, high)
- ✅ Client satisfaction 90%+
- **Earned:** Month 7

**9. Beard and Shave Specialist Badge**
- ✅ Can perform beard trims and shaping
- ✅ Can perform hot towel shaves
- ✅ Completed 25 beard services
- ✅ Completed 10 shaves
- **Earned:** Month 8

**10. Design and Detail Badge**
- ✅ Can create hair designs and patterns
- ✅ Can perform edge-ups and lineups
- ✅ Completed 30 design services
- ✅ Portfolio of design work
- **Earned:** Month 9

**11. Client Builder Badge**
- ✅ Has 15+ regular clients
- ✅ Clients request you by name
- ✅ Positive online reviews
- ✅ Repeat business 80%+
- **Earned:** Month 10

**12. Business Basics Badge**
- ✅ Understands pricing and profitability
- ✅ Can manage appointments
- ✅ Knows retail product sales
- ✅ Completed business training module
- **Earned:** Month 11

---

#### Professional Badges (Month 13-17)

**13. Advanced Techniques Badge**
- ✅ Can perform all barbering services
- ✅ Completed 100+ haircuts independently
- ✅ Mentor approval for advanced work
- ✅ Client satisfaction 95%+
- **Earned:** Month 13

**14. Mentor Apprentice Badge**
- ✅ Can train and guide newer apprentices
- ✅ Demonstrates leadership
- ✅ Shares knowledge with others
- ✅ Mentor recommends for this badge
- **Earned:** Month 14

**15. RTI Completion Badge**
- ✅ Completed all 144 hours of Related Technical Instruction
- ✅ Passed all theory exams
- ✅ Understands Indiana barbering laws
- ✅ Ready for state board exam
- **Earned:** Month 15

**16. 2,000 Hours Milestone Badge**
- ✅ Completed 2,000 hours of on-the-job training
- ✅ All hours verified and documented
- ✅ Mentor certifies readiness
- ✅ Eligible for state board exam
- **Earned:** Month 16-17

**17. State Board Ready Badge**
- ✅ Completed all apprenticeship requirements
- ✅ Registered for state board exam
- ✅ Exam prep completed
- ✅ Mentor certifies competency
- **Earned:** Month 17

---

#### Certification Badges (After Licensing)

**18. Licensed Barber Badge**
- ✅ Passed Indiana State Board exam
- ✅ Received Indiana Registered Barber License
- ✅ License number verified
- ✅ Legally authorized to practice barbering
- **Earned:** After passing state exam

**19. Professional Barber Badge**
- ✅ Licensed and working professionally
- ✅ 6 months of post-license experience
- ✅ Established clientele
- ✅ Positive reputation in community
- **Earned:** 6 months after licensing

**20. Master Barber Badge**
- ✅ 2+ years of professional experience
- ✅ Advanced skills and specializations
- ✅ Mentoring other barbers
- ✅ Industry recognition
- **Earned:** 2+ years after licensing

---

### Specialty Badges (Optional)

**Fade Specialist Badge**
- ✅ Completed 200+ fade haircuts
- ✅ Master of all fade techniques
- ✅ Client portfolio showcasing fade work

**Beard Specialist Badge**
- ✅ Completed 100+ beard services
- ✅ Expert in beard shaping and grooming
- ✅ Hot towel shave specialist

**Design Artist Badge**
- ✅ Completed 100+ design haircuts
- ✅ Portfolio of creative designs
- ✅ Social media following for design work

**Business Owner Badge**
- ✅ Opened own barbershop
- ✅ Licensed business owner
- ✅ Employs other barbers

**Educator Badge**
- ✅ Trains and mentors apprentices
- ✅ Teaches barbering techniques
- ✅ Contributes to industry education

---

### How Badges Accelerate Your Career

**Month 1-6: Building Foundation**
- Earn 7 badges
- Show employers you're serious and progressing
- Build confidence with visible achievements
- **Impact:** Employers see you're committed and learning

**Month 7-12: Developing Expertise**
- Earn 5 more badges (12 total)
- Demonstrate advanced skills
- Show you can build clientele
- **Impact:** Employers see you're becoming professional

**Month 13-17: Becoming Professional**
- Earn 5 more badges (17 total)
- Prove you're ready for licensing
- Show mastery of all skills
- **Impact:** Employers compete to hire you

**After Licensing:**
- Earn 3 more badges (20 total)
- Establish yourself as professional
- Build toward master barber status
- **Impact:** Command higher pay, better opportunities

---

### JRI Participants: Earn Stipends for Digital Badges

**If you're funded through JRI (Justice Reinvestment Initiative), you can earn additional stipends for completing digital badges.**

**How it works:**

**Foundation Badges (Month 1-2):**
- Earn 3 badges
- **JRI Stipend: $50 per badge = $150 total**
- Paid when you complete all 3 foundation badges

**Skill Development Badges (Month 3-6):**
- Earn 4 badges
- **JRI Stipend: $75 per badge = $300 total**
- Paid when you complete all 4 skill badges

**Advanced Skill Badges (Month 7-12):**
- Earn 5 badges
- **JRI Stipend: $100 per badge = $500 total**
- Paid when you complete all 5 advanced badges

**Professional Badges (Month 13-17):**
- Earn 5 badges
- **JRI Stipend: $150 per badge = $750 total**
- Paid when you complete all 5 professional badges

**Total JRI Badge Stipends: $1,700**

**Why JRI offers badge stipends:**
- ✅ Incentivizes skill development
- ✅ Rewards progress and achievement
- ✅ Provides additional financial support
- ✅ Encourages completion of apprenticeship
- ✅ Reduces recidivism through skill mastery

**How to receive stipends:**
1. Complete the required badges in each phase
2. Your mentor verifies your competency
3. We issue the digital badges
4. JRI case manager verifies badge completion
5. Stipend is paid within 2 weeks (direct deposit or check)

**Requirements to receive stipends:**
- ✅ Must be enrolled in JRI program
- ✅ Must be in good standing (attending work, meeting with case manager)
- ✅ Must complete all badges in a phase to receive stipend
- ✅ Must maintain employment at apprenticeship shop
- ✅ Cannot receive stipend if you quit or are terminated

**Example: Marcus's JRI Badge Earnings**

**Month 2:** Completed 3 foundation badges → Received $150 stipend  
**Month 6:** Completed 4 skill badges → Received $300 stipend  
**Month 12:** Completed 5 advanced badges → Received $500 stipend  
**Month 17:** Completed 5 professional badges → Received $750 stipend  

**Total badge stipends: $1,700**

**Plus his regular JRI stipends:**
- Month 1-3: $400/month × 3 = $1,200
- Month 4-6: $300/month × 3 = $900
- Month 7-12: $200/month × 6 = $1,200
- **Total regular stipends: $3,300**

**Total JRI support: $5,000 in stipends + $1,700 in badge bonuses = $6,700**

**Plus his wages from barbershop:**
- 17 months × average $2,500/month = $42,500

**Marcus's total income during apprenticeship: $49,200**

---

### Badge Stipends: Additional Motivation

**For JRI participants, badges aren't just about skills—they're about money.**

**Every badge you earn = Extra cash in your pocket**

**This means:**
- ✅ You're more motivated to complete training
- ✅ You have extra money for bills, family, savings
- ✅ You're rewarded for your hard work
- ✅ You see immediate benefits of skill development

**Badge stipends help you:**
- Pay rent and utilities
- Buy work clothes and tools
- Save for your own apartment
- Support your family
- Build emergency fund
- Stay focused on your goals

**JRI's goal:** Make sure you succeed by providing financial support at every milestone.

**Your goal:** Earn every badge, get every stipend, complete your apprenticeship, and build a career that changes your life.

---

## Indiana State Board Guidelines for Barber Apprenticeships

**Official regulations from Indiana Professional Licensing Agency and Indiana State Board of Barber Examiners**

### Legal Authority

**Indiana Code 25-7-5 - Barber Licensing**
- Establishes requirements for barber licensure in Indiana
- Authorizes apprenticeship as pathway to licensure
- Sets standards for apprenticeship programs

**House Bill 1135 (2024) and House Bill 1320 (2025)**
- Officially recognized federally registered apprenticeships
- Established "earn while you learn" model
- Allowed apprenticeship hours to count toward licensure

**Indiana Administrative Code 820 IAC 2**
- Details apprenticeship program requirements
- Sets supervision and training standards
- Establishes hour tracking and verification procedures

---

### State Board Requirements for Apprentices

**To be eligible for apprenticeship (Indiana Code 25-7-5-7):**
1. ✅ Minimum age: 17 years old
2. ✅ Education: High school diploma or GED
3. ✅ Good moral character (background check)
4. ✅ Employed by registered apprenticeship sponsor shop
5. ✅ Enrolled in U.S. Department of Labor registered apprenticeship program

**Training requirements (820 IAC 2-2-1):**
1. ✅ 2,000 hours of on-the-job training
2. ✅ 144 hours of Related Technical Instruction (RTI)
3. ✅ All hours must be verified and documented
4. ✅ Training must follow approved curriculum
5. ✅ Work must be supervised by licensed barber with 3+ years experience

**Prohibited activities:**
- ❌ Cannot work unsupervised until licensed
- ❌ Cannot charge clients directly (shop charges)
- ❌ Cannot practice outside of registered shop
- ❌ Cannot skip required training components
- ❌ Cannot count hours from unlicensed or unregistered shops

---

### State Board Requirements for Apprenticeship Sponsors (Barbershops)

**To become registered apprenticeship sponsor (820 IAC 2-1-3):**

**1. Business Requirements**
- ✅ Valid Indiana barbershop license (renewed every 2 years)
- ✅ In good standing with State Board (no violations or suspensions)
- ✅ Registered with U.S. Department of Labor as apprenticeship sponsor
- ✅ General liability insurance (minimum $1 million coverage)
- ✅ Workers' compensation insurance

**2. Facility Requirements (820 IAC 2-1-4)**
- ✅ Meets all Indiana health and safety codes
- ✅ Proper sanitation equipment (autoclaves, disinfectants)
- ✅ Adequate workspace for apprentice training (dedicated station)
- ✅ Complies with OSHA workplace safety standards
- ✅ Proper ventilation and lighting

**3. Supervision Requirements (820 IAC 2-1-5)**
- ✅ Licensed barber with minimum 3 years professional experience
- ✅ Completed U.S. DOL apprenticeship supervisor training (8-16 hours)
- ✅ Available to supervise during all apprentice working hours
- ✅ Maximum ratio: 1 apprentice per licensed barber
- ✅ Clean disciplinary record with State Board

**4. Training Requirements (820 IAC 2-1-6)**
- ✅ Written training plan approved by State Board
- ✅ Follows approved 2,000-hour curriculum
- ✅ Provides 144 hours RTI (online or in-person)
- ✅ Tracks and verifies all apprentice hours daily/weekly
- ✅ Submits monthly progress reports to State Board
- ✅ Maintains records for minimum 5 years

**5. Reporting Requirements (820 IAC 2-1-7)**
- ✅ Monthly hour verification forms to State Board
- ✅ Quarterly progress reports on apprentice development
- ✅ Incident reports (injuries, violations, terminations)
- ✅ Completion certification when apprentice finishes program
- ✅ Annual renewal of apprenticeship sponsor status

---

### Hour Tracking and Verification (820 IAC 2-2-3)

**State Board requires strict documentation:**

**Daily/Weekly Tracking:**
- Apprentice clocks in/out using time tracking system
- Licensed barber supervisor signs off on hours worked
- Services performed are documented
- Skills practiced are recorded
- Any incidents or issues noted

**Monthly Reporting:**
- Shop submits hour verification form to State Board
- Form includes: total hours, services performed, skills learned, competency progress
- Both apprentice and supervisor must sign
- State Board reviews and approves within 30 days
- Hours not reported monthly may not count toward licensure

**Quarterly Assessments:**
- Shop submits detailed progress report
- Report includes: competency assessments, areas of improvement, readiness for advancement
- State Board tracks apprentice progression through program
- Identifies apprentices at risk of not completing

**Upon Completion:**
- Shop certifies apprentice completed 2,000 OJT hours + 144 RTI hours
- Shop submits final completion certificate to State Board
- State Board reviews all documentation (5+ years of records)
- Apprentice becomes eligible for state board exam

**If documentation is incomplete or inaccurate:**
- Hours may not count toward licensure requirement
- Apprentice may need to complete additional hours
- Shop may face penalties, fines, or loss of sponsor status
- Apprentice's exam eligibility may be delayed

---

### State Board Exam Requirements (820 IAC 2-3-1)

**Eligibility to take exam:**
1. ✅ Completed 2,000 hours OJT + 144 hours RTI (verified by State Board)
2. ✅ All monthly reports submitted and approved
3. ✅ Apprenticeship sponsor certifies readiness
4. ✅ Application submitted with required documents
5. ✅ Background check completed (if required)
6. ✅ Exam fee paid (**included in your training costs**)

**Required documents for exam application:**
- Completed application form
- Proof of 2,000 OJT hours (sponsor certification)
- Proof of 144 RTI hours (course completion certificate)
- Copy of high school diploma or GED
- Photo ID (driver's license or state ID)
- Social Security card

**Exam components:**

**Written Exam:**
- 100 multiple-choice questions
- Topics: barbering theory, techniques, sanitation, infection control, Indiana laws and regulations
- Passing score: 75% (75 correct answers)
- Time limit: 2 hours
- Administered on computer at testing center

**Practical Exam:**
- Demonstrate barbering skills on mannequin
- Required services: haircut, fade, taper, shave, sanitation procedures
- Scored by licensed State Board examiner
- Passing score: 75% on each service
- Time limits vary by service
- Must bring own tools (clippers, scissors, razors, cape)

**Exam scheduling:**
- Contact State Board: (317) 234-3040
- Exams held monthly in Indianapolis
- Schedule 4-6 weeks in advance
- Arrive 30 minutes early with photo ID and confirmation

**If you fail one or both portions:**
- Wait minimum 30 days before retaking
- Retake fee: $40 per portion (not included in training)
- No limit on number of attempts
- Your apprenticeship hours remain valid indefinitely
- Must pass both portions to receive license

---

### Licensing Fees and Renewal (820 IAC 2-4-1)

**Initial License Application:**
- Application fee: $45
- License valid for 2 years from date of issue
- Issued by Indiana Professional Licensing Agency
- License number assigned

**License Renewal (Every 2 Years):**
- Renewal fee: $45
- Continuing education: 4 hours required per renewal period
- Renewal deadline: Your birth month
- Late renewal: Additional $25 penalty fee
- Failure to renew: License becomes inactive, cannot practice

**Continuing Education Requirements:**
- 4 hours every 2 years
- Topics: sanitation, safety, new techniques, Indiana law updates
- Must be from State Board-approved providers
- Certificates must be submitted with renewal

**License Display Requirements:**
- Must be prominently displayed at your workstation
- Must be visible to clients
- Failure to display: $100 fine per violation
- Working without valid license: $500 fine + possible criminal charges

**License Verification:**
- Employers can verify licenses online at [in.gov/pla](https://www.in.gov/pla)
- Clients can verify your license is current and valid
- License shows: name, license number, issue date, expiration date, status

---

### Disciplinary Actions and Violations (820 IAC 2-5-1)

**State Board can discipline licensed barbers for:**
- Practicing without valid license
- Fraud or misrepresentation
- Gross negligence or incompetence
- Unsanitary practices
- Violating sanitation rules
- Criminal convictions (certain offenses)
- Substance abuse affecting practice
- Sexual misconduct with clients

**Penalties may include:**
- Written warning
- Fines ($100-$5,000)
- Probation with conditions
- Suspension of license (temporary)
- Revocation of license (permanent)
- Criminal prosecution (for serious violations)

**To avoid violations:**
- ✅ Maintain valid license
- ✅ Follow all sanitation protocols
- ✅ Practice within your scope
- ✅ Maintain professional boundaries
- ✅ Complete continuing education
- ✅ Report address changes to State Board

---

### State Board Contact Information

**Indiana Professional Licensing Agency**
**Board of Barber Examiners**

**Mailing Address:**
402 W. Washington St., Room W072
Indianapolis, IN 46204

**Phone:** (317) 234-3040

**Email:** pla11@pla.in.gov

**Website:** [in.gov/pla/professions/barber-board](https://www.in.gov/pla/professions/barber-board/)

**Office Hours:** Monday-Friday, 8:00 AM - 4:30 PM EST

**For questions about:**
- Apprenticeship eligibility and requirements
- Hour verification and documentation
- Exam scheduling and preparation
- License applications and renewals
- Sponsor registration and requirements
- Regulations, laws, and compliance
- Disciplinary actions and violations
- Continuing education requirements

**In-Person Visits:**
- By appointment only
- Bring all required documents
- Allow 30-60 minutes for consultation

---

### Important Reminders

**For Apprentices:**
- ✅ Your hours only count if shop is registered apprenticeship sponsor
- ✅ Keep copies of all hour verification forms
- ✅ Track your own hours as backup
- ✅ Report any issues to State Board immediately
- ✅ Don't work unsupervised until licensed
- ✅ Complete all 144 RTI hours (not optional)

**For Shops:**
- ✅ Submit monthly reports on time (late reports = hours may not count)
- ✅ Maintain accurate records for 5+ years
- ✅ Supervise apprentices at all times
- ✅ Follow approved training curriculum
- ✅ Renew sponsor status annually
- ✅ Report any incidents immediately

**Consequences of non-compliance:**
- Apprentice hours may not count toward licensure
- Apprentice may be ineligible for state exam
- Shop may lose apprenticeship sponsor status
- Fines and penalties may apply
- Legal action may be taken

**The State Board is here to ensure quality training and public safety. Follow the rules, document everything, and you'll succeed.**

---

## Understanding Different Training Models: Apprenticeship vs. Internship vs. OJT

**Many people confuse apprenticeships with internships or on-the-job training (OJT). Here's how they're different:**

---

### Apprenticeship (What This Program Is)

**Definition:**
A structured, registered training program that combines on-the-job training with classroom instruction, leading to a recognized credential or license.

**Key characteristics:**
- ✅ Registered with U.S. Department of Labor
- ✅ Approved by Indiana State Board
- ✅ You're an EMPLOYEE earning wages
- ✅ Structured curriculum with specific hour requirements
- ✅ Supervised by licensed professional
- ✅ Leads to professional license (Indiana Registered Barber)
- ✅ Hours count toward state licensure requirement
- ✅ Typically 1-4 years duration
- ✅ Earn while you learn

**Barber Apprenticeship specifics:**
- 2,000 hours on-the-job training
- 144 hours classroom instruction
- Earn $10/hour + commissions + tips
- 15-17 months duration
- Graduate with license and $20,000-$30,000 earned

**Legal protections:**
- Minimum wage guaranteed
- Workers' compensation coverage
- Unemployment insurance eligibility
- OSHA workplace protections
- Cannot be fired without cause

---

### Internship (What This Is NOT)

**Definition:**
A temporary work experience, usually for students, to gain exposure to a profession. May be paid or unpaid.

**Key characteristics:**
- ❌ NOT registered with Department of Labor
- ❌ NOT approved by State Board
- ❌ Often UNPAID or low pay
- ❌ No structured curriculum
- ❌ May not be supervised by licensed professional
- ❌ Does NOT lead to license
- ❌ Hours do NOT count toward licensure
- ❌ Typically 3-6 months duration
- ❌ Often for college credit, not career

**Example: Barbershop internship (hypothetical):**
- Work at barbershop for 3 months
- Observe and assist licensed barbers
- Earn $0 or minimum wage
- No formal training plan
- Hours don't count toward barber license
- Just for experience, not licensure

**Legal status:**
- May be unpaid (if meets certain criteria)
- Limited legal protections
- Not covered by workers' comp (usually)
- Can be terminated at any time

**Why internships don't work for barbering:**
- ❌ You need 2,000 verified hours for license
- ❌ Internship hours don't count
- ❌ You'd waste time and earn nothing
- ❌ Still need to complete full apprenticeship or barber school

---

### On-the-Job Training (OJT) - What This Is NOT

**Definition:**
Informal training provided by an employer to teach job-specific skills. Not registered or structured.

**Key characteristics:**
- ❌ NOT registered with Department of Labor
- ❌ NOT approved by State Board
- ❌ Employer decides training (no formal curriculum)
- ❌ May or may not be supervised
- ❌ Does NOT lead to license
- ❌ Hours do NOT count toward licensure
- ❌ Duration varies (days to months)
- ❌ Just to learn the job, not get licensed

**Example: Barbershop OJT (hypothetical):**
- Get hired at barbershop as "barber assistant"
- Learn by watching and helping
- Earn minimum wage
- No formal training plan
- Hours don't count toward barber license
- Cannot legally cut hair (not licensed)

**Legal status:**
- You're an employee
- Earn at least minimum wage
- Workers' comp coverage
- But hours don't count toward licensure

**Why OJT doesn't work for barbering:**
- ❌ Indiana law requires formal apprenticeship or barber school
- ❌ OJT hours don't count toward 2,000-hour requirement
- ❌ You cannot legally cut hair without license
- ❌ You'd be working illegally if you cut hair

---

### Side-by-Side Comparison

| Feature | Apprenticeship | Internship | OJT |
|---------|---------------|-----------|-----|
| **Registered Program** | Yes (U.S. DOL) | No | No |
| **State Board Approved** | Yes | No | No |
| **Structured Curriculum** | Yes (2,000 hrs + 144 hrs) | No | No |
| **Paid** | Yes ($10/hr + commissions) | Maybe (often unpaid) | Yes (minimum wage) |
| **Leads to License** | Yes | No | No |
| **Hours Count Toward License** | Yes | No | No |
| **Supervised by Licensed Pro** | Yes (required) | Maybe | Maybe |
| **Duration** | 15-17 months | 3-6 months | Varies |
| **Legal Protections** | Full employee rights | Limited | Employee rights |
| **Earnings During Training** | $20,000-$30,000 | $0-$5,000 | $5,000-$15,000 |
| **After Completion** | Licensed barber | No credential | No credential |

---

### Why Apprenticeship Is the Best Option for Barbering

**Compared to internship:**
- ✅ You earn real money ($20,000-$30,000)
- ✅ Your hours count toward license
- ✅ You get structured training
- ✅ You graduate with a license
- ✅ You have legal protections

**Compared to OJT:**
- ✅ Your hours count toward license
- ✅ You follow approved curriculum
- ✅ You're supervised by licensed barber
- ✅ You graduate with a license
- ✅ You can legally practice barbering

**Compared to barber school:**
- ✅ You earn money instead of paying tuition
- ✅ You work with real clients from day one
- ✅ You graduate with clientele
- ✅ You have 500 more hours of experience (2,000 vs. 1,500)
- ✅ You graduate debt-free

---

### Common Misconceptions

**Misconception 1: "I can just work at a barbershop and count those hours toward my license."**

❌ **Wrong.** Only hours in a registered apprenticeship program count. Random work at a barbershop doesn't count.

**Misconception 2: "An internship at a barbershop will help me get licensed faster."**

❌ **Wrong.** Internship hours don't count toward licensure. You'd waste time.

**Misconception 3: "OJT is the same as apprenticeship."**

❌ **Wrong.** OJT is informal training. Apprenticeship is a registered, structured program leading to licensure.

**Misconception 4: "I can do an unpaid apprenticeship to save the shop money."**

❌ **Wrong.** Registered apprenticeships MUST pay at least minimum wage. Unpaid apprenticeships are illegal.

**Misconception 5: "Any barbershop can hire me as an apprentice."**

❌ **Wrong.** Only registered apprenticeship sponsor shops can hire apprentices. Random shops cannot.

---

### How to Verify You're in a Real Apprenticeship

**Ask these questions:**

1. **"Is this shop a registered apprenticeship sponsor with the U.S. Department of Labor?"**
   - ✅ Yes = Real apprenticeship
   - ❌ No = Not a real apprenticeship (hours won't count)

2. **"Will my hours count toward my Indiana barber license?"**
   - ✅ Yes = Real apprenticeship
   - ❌ No = Internship or OJT (hours won't count)

3. **"Will I be paid at least minimum wage plus commissions?"**
   - ✅ Yes = Real apprenticeship
   - ❌ No = Likely illegal or not a real apprenticeship

4. **"Will I complete 2,000 hours of OJT and 144 hours of RTI?"**
   - ✅ Yes = Real apprenticeship
   - ❌ No = Not following Indiana requirements

5. **"Will the Indiana State Board verify my hours?"**
   - ✅ Yes = Real apprenticeship
   - ❌ No = Hours won't count toward license

**If the answer to ANY of these is "no" or "I don't know," it's NOT a registered apprenticeship.**

---

### Red Flags: Not a Real Apprenticeship

**Watch out for:**

❌ Shop says "We'll train you, but we're not registered"
- Your hours won't count toward license

❌ Shop says "This is an unpaid internship"
- Illegal for registered apprenticeships

❌ Shop says "You'll learn on the job" but has no formal training plan
- Not a registered apprenticeship, just OJT

❌ Shop says "We don't report hours to the State Board"
- Your hours won't count toward license

❌ Shop says "You can start cutting hair right away without supervision"
- Illegal and dangerous

❌ Shop says "We'll pay you under the table"
- Illegal, no legal protections, hours won't count

**If you see these red flags, walk away. Contact us to find a legitimate registered apprenticeship.**

---

### The Bottom Line

**Barber Apprenticeship (This Program):**
- ✅ Registered with U.S. Department of Labor
- ✅ Approved by Indiana State Board
- ✅ You're an employee earning $10/hour + commissions + tips
- ✅ 2,000 hours OJT + 144 hours RTI
- ✅ Hours count toward Indiana barber license
- ✅ Graduate with license and $20,000-$30,000 earned

**Internship or OJT:**
- ❌ Not registered
- ❌ Not approved by State Board
- ❌ Hours don't count toward license
- ❌ Waste of time for barbering career

**Don't confuse them. Make sure you're in a REAL registered apprenticeship.**

**Contact us to verify a shop is a registered apprenticeship sponsor:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

---

## What Happens If You Don't Complete Your Apprenticeship?

### If You Stop Attending or Quit

**Your hours are NOT lost. They're saved.**

**What happens to your hours:**
- ✅ All verified hours remain on record with Indiana State Board
- ✅ Hours are permanently documented in your apprenticeship file
- ✅ You can return to complete your apprenticeship later
- ✅ Hours never expire (they're valid indefinitely)
- ✅ You can transfer to a different registered shop

**Example:**
- You complete 1,200 hours at Shop A
- You quit or stop attending
- Your 1,200 hours are saved
- 6 months later, you're ready to return
- You need 800 more hours to reach 2,000
- You can start at Shop B and complete remaining 800 hours

**Important:**
- ❌ You cannot practice barbering without completing all requirements
- ❌ You cannot take state board exam until you complete 2,000 hours + 144 RTI
- ❌ Your partial hours don't give you any legal right to cut hair
- ✅ But your hours are saved and waiting for you

---

### If the Shop Closes or Loses Sponsor Status

**Your hours are protected.**

**What happens:**
1. Shop notifies State Board they're closing or ending apprenticeship program
2. State Board contacts you about your hour status
3. Your completed hours are verified and saved
4. We help you find a new registered apprenticeship sponsor shop
5. You transfer to new shop and continue from where you left off

**Example:**
- You complete 1,500 hours at Shop A
- Shop A closes permanently
- Your 1,500 hours are verified and saved by State Board
- You transfer to Shop B
- You complete remaining 500 hours at Shop B
- You graduate with 2,000 total hours

**Timeline:**
- Shop closure to new placement: 2-4 weeks
- No gap in your hour count
- New shop picks up where old shop left off

---

### If You're Fired or Terminated

**Your hours are still saved, but circumstances matter.**

**If you're fired for cause (your fault):**
- ✅ Your completed hours are still saved
- ✅ You can transfer to another shop
- ❌ But finding a new shop may be harder (background check)
- ❌ New shop will ask why you were terminated

**Reasons for termination (your fault):**
- Excessive absences or tardiness
- Insubordination or unprofessional behavior
- Theft or dishonesty
- Substance abuse at work
- Violating shop policies
- Poor performance despite coaching

**If you're fired without cause (not your fault):**
- ✅ Your hours are saved
- ✅ Easier to find new shop
- ✅ We help advocate for you

**Reasons for termination (not your fault):**
- Shop downsizing or financial issues
- Personality conflict with owner
- Shop changing business model
- Mentor leaving and no replacement

**What to do if terminated:**
1. Request written documentation of your hours from shop
2. Contact State Board to verify your hours are on record
3. Contact us immediately for help finding new placement
4. Be honest with new shops about what happened
5. Show you've learned from the experience

---

### Transferring to a Different Shop During Your Apprenticeship

**Yes, you can transfer. Your hours go with you.**

**Reasons you might transfer:**
- Better opportunity at different shop
- Moving to different city
- Personality conflict with current shop
- Better pay or commission at different shop
- Current shop not providing good training
- Closer to your home

**How to transfer:**

**Step 1: Find New Registered Apprenticeship Sponsor Shop**
- Must be registered with U.S. Department of Labor
- Must be approved by Indiana State Board
- We can help you find approved shops

**Step 2: Get Hired by New Shop**
- Interview with new shop owner
- Explain your situation honestly
- Provide documentation of hours completed
- New shop agrees to hire you as apprentice

**Step 3: Notify Current Shop (If Still Employed)**
- Give 2 weeks notice (professional courtesy)
- Request written documentation of your hours
- Get copy of all hour verification forms
- Leave on good terms if possible

**Step 4: Transfer Documentation**
- Current shop submits final hour verification to State Board
- State Board verifies your completed hours
- New shop registers you as their apprentice
- State Board transfers your file to new shop

**Step 5: Continue Training at New Shop**
- New shop picks up where old shop left off
- You continue accumulating hours toward 2,000
- New shop tracks and reports your hours
- You complete remaining hours and RTI

**Timeline:**
- Finding new shop: 1-4 weeks
- Transfer paperwork: 1-2 weeks
- Starting at new shop: 1-2 weeks
- **Total: 3-8 weeks**

**Example:**
- You complete 900 hours at Shop A
- You transfer to Shop B
- Shop B verifies your 900 hours with State Board
- You complete 1,100 more hours at Shop B
- You graduate with 2,000 total hours (900 + 1,100)

---

### Can You Work at Multiple Shops?

**No. You can only be registered with ONE shop at a time.**

**Why:**
- State Board tracks your hours by shop
- Only one shop can be your official apprenticeship sponsor
- Prevents double-counting of hours
- Ensures proper supervision

**What you CANNOT do:**
- ❌ Work at Shop A Monday-Wednesday
- ❌ Work at Shop B Thursday-Saturday
- ❌ Count hours from both shops

**What you CAN do:**
- ✅ Complete some hours at Shop A
- ✅ Transfer to Shop B
- ✅ Complete remaining hours at Shop B
- ✅ Both sets of hours count (sequential, not simultaneous)

---

### What If You Stop and Start Multiple Times?

**Your hours accumulate over time. No expiration.**

**Example: Stop-and-start apprentice**

**Year 1:**
- Complete 600 hours at Shop A
- Life happens, you stop
- Hours saved: 600

**Year 2:**
- Return to apprenticeship at Shop B
- Complete 800 hours
- Total hours saved: 1,400 (600 + 800)
- You stop again

**Year 3:**
- Return to apprenticeship at Shop C
- Complete 600 hours
- Total hours: 2,000 (600 + 800 + 600)
- You complete apprenticeship and get licensed

**This is allowed. Your hours never expire.**

**However:**
- ⚠️ Taking long breaks delays your career
- ⚠️ Skills may get rusty if you're away too long
- ⚠️ Finding shops willing to hire stop-and-start apprentices may be harder
- ⚠️ Better to complete continuously if possible

---

### What If You Complete Hours But Not RTI (or Vice Versa)?

**You need BOTH to be eligible for state exam.**

**Scenario 1: Completed 2,000 OJT hours but only 100 RTI hours**
- ❌ Not eligible for state exam yet
- ✅ Your 2,000 OJT hours are saved
- ✅ Complete remaining 44 RTI hours
- ✅ Then eligible for exam

**Scenario 2: Completed 144 RTI hours but only 1,500 OJT hours**
- ❌ Not eligible for state exam yet
- ✅ Your 144 RTI hours are saved
- ✅ Complete remaining 500 OJT hours
- ✅ Then eligible for exam

**Both requirements must be met:**
- 2,000 OJT hours (at registered shop)
- 144 RTI hours (approved curriculum)
- Both verified by State Board

---

### State Board Guidelines on Incomplete Apprenticeships

**Indiana State Board policy (820 IAC 2-2-4):**

**Hour preservation:**
- ✅ All verified hours are permanently recorded
- ✅ Hours remain valid indefinitely
- ✅ No expiration date on apprenticeship hours
- ✅ Apprentice can return at any time to complete

**Transfer requirements:**
- ✅ Apprentice must notify State Board of transfer
- ✅ Previous shop must submit final hour verification
- ✅ New shop must register apprentice
- ✅ State Board transfers apprentice file
- ✅ New shop continues tracking from previous total

**Inactive apprentices:**
- If you don't work for 12+ months, you're considered "inactive"
- Your hours are still saved
- You must notify State Board when you return
- You may need to demonstrate retained skills
- New shop may require refresher training

**Shop responsibilities when apprentice leaves:**
- ✅ Must submit final hour verification within 30 days
- ✅ Must provide apprentice with copy of hour records
- ✅ Must notify State Board of apprentice departure
- ✅ Cannot withhold hour documentation

**Apprentice rights:**
- ✅ You own your hours (they're yours)
- ✅ Shop cannot take away your hours
- ✅ You can request hour verification at any time
- ✅ State Board will provide your hour records upon request

---

### How to Protect Your Hours

**Keep your own records:**
- ✅ Take photos of weekly hour logs
- ✅ Keep copies of monthly verification forms
- ✅ Track your own hours in a notebook or app
- ✅ Save all documentation from your shop

**Request documentation regularly:**
- ✅ Ask for copy of monthly reports submitted to State Board
- ✅ Request hour verification every 3-6 months
- ✅ Keep these in a safe place

**If you're leaving a shop:**
- ✅ Request written documentation of all hours completed
- ✅ Get shop owner's signature on hour verification
- ✅ Contact State Board to verify hours are on record
- ✅ Keep copies of everything

**If shop refuses to provide documentation:**
- ✅ Contact State Board immediately: (317) 234-3040
- ✅ State Board will investigate
- ✅ State Board has records of all submitted monthly reports
- ✅ Shop can be penalized for withholding documentation

---

### FAQs: Incomplete Apprenticeships and Transfers

**"I completed 1,000 hours but haven't worked in 2 years. Are my hours still good?"**

✅ Yes. Your hours never expire. Contact State Board to verify they're on record, then find a new shop to complete remaining 1,000 hours.

**"My shop closed suddenly. How do I get my hours?"**

Contact State Board: (317) 234-3040. They have all monthly reports on file. They'll verify your hours and help you transfer to a new shop.

**"I was fired. Can I still become a barber?"**

Yes. Your hours are saved. Be honest with new shops about what happened and show you've learned from it. We can help you find a second-chance shop.

**"Can I transfer to a shop in a different city?"**

Yes, as long as the new shop is a registered apprenticeship sponsor in Indiana. Your hours transfer anywhere in Indiana.

**"I want to switch shops because I'm not learning enough. Is that okay?"**

Yes. You're not obligated to stay at a shop that's not providing good training. Find a better shop, transfer your hours, and continue.

**"What if I move to a different state?"**

Your Indiana hours may transfer to another state, depending on that state's reciprocity rules. Contact the other state's licensing board to verify.

**"Can I take a break and come back later?"**

Yes. Your hours are saved. Take the time you need, then return when you're ready. Just know that finding a shop may take a few weeks.

**"What if I complete my hours but fail the state exam multiple times?"**

Your hours remain valid. You can retake the exam as many times as needed. There's no expiration on your apprenticeship completion.

---

### The Bottom Line: Your Hours Are Protected

**Key takeaways:**

✅ **Your hours never expire** - They're saved permanently

✅ **You can transfer shops** - Your hours go with you

✅ **You can stop and return** - Life happens, we understand

✅ **Your hours are yours** - Shop cannot take them away

✅ **State Board protects you** - They have all records

✅ **We help you transfer** - We connect you with new shops

**If you're struggling, having issues, or need to transfer:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

**We'll help you protect your hours and complete your apprenticeship.**

---

### How Much Can Badges Increase Your Earnings?

**Without Badges (Traditional Apprentice):**
- Employer sees: "Completed apprenticeship"
- Starting pay: $12-$15/hour or 50% commission
- Annual earnings: $35,000-$45,000

**With Badges (Verified Skills):**
- Employer sees: "20 verified badges showing mastery"
- Starting pay: $15-$18/hour or 60% commission
- Annual earnings: $45,000-$55,000

**Difference: $10,000/year more with badges**

**Why badges increase earnings:**
- ✅ Employers trust your skills are verified
- ✅ You can negotiate higher pay with proof of competency
- ✅ Clients see your badges and trust you more
- ✅ You stand out from other applicants
- ✅ You can charge premium prices

---

### Real-World Badge Impact

**Marcus's Story:**
- Earned all 17 apprenticeship badges
- Showcased badges on resume and LinkedIn
- Applied to high-end barbershop
- Employer saw verified skills
- Hired at $18/hour (vs. $12/hour typical)
- **Extra earnings: $12,480/year**

**DeAndre's Story:**
- Earned 20 badges including specialty badges
- Posted badges on Instagram
- Clients saw his verified expertise
- Built strong following
- Rented chair at premium shop
- **Earnings: $70,000/year (vs. $45,000 typical)**

**Tasha's Story:**
- Earned all badges plus educator badge
- Barbershop hired her to train new apprentices
- Paid $20/hour plus commission
- **Earnings: $60,000/year (vs. $40,000 typical)**

---

### How to Earn and Display Your Badges

**Earning Badges:**
1. Complete the required skills/milestones
2. Your mentor verifies your competency
3. We issue the digital badge
4. Badge is stored in your digital wallet
5. You receive email notification

**Displaying Badges:**
- ✅ Add to LinkedIn profile
- ✅ Include on resume
- ✅ Share on Instagram/Facebook
- ✅ Add to email signature
- ✅ Print for portfolio
- ✅ Show to potential employers

**Verifying Badges:**
- Each badge has unique verification code
- Employers can click badge to verify authenticity
- Shows date earned, skills demonstrated, issuing organization
- Cannot be faked or copied

---

### Badge Platform: Credly

**We use Credly, the industry-leading digital badge platform.**

**Credly badges are:**
- ✅ Recognized by employers nationwide
- ✅ Integrated with LinkedIn
- ✅ Shareable on all social media
- ✅ Verifiable and secure
- ✅ Free for you to use

**Your Credly profile shows:**
- All badges you've earned
- Skills you've demonstrated
- Date each badge was earned
- Verification from issuing organization
- Your professional journey

**Employers love Credly because:**
- They can instantly verify your skills
- They see exactly what you can do
- They trust the verification process
- They can compare candidates objectively

---

### The Badge Advantage: Summary

**Badges help you:**
- ✅ Track your progress (stay motivated)
- ✅ Prove your skills (verified competency)
- ✅ Stand out from competition (differentiation)
- ✅ Earn more money (higher pay, better opportunities)
- ✅ Build your brand (professional credibility)
- ✅ Advance faster (clear pathway to mastery)

**Badges increase your earnings by:**
- $3-$6/hour higher starting pay
- $10,000-$20,000/year more income
- Better job opportunities
- Faster career advancement
- Premium client base

**Start earning badges from day one of your apprenticeship.**

**Every skill you learn, every milestone you reach, every achievement you accomplish—you get a badge to prove it.**

**Your badges are your professional story. Make it impressive.**

---

## Requirements Checklist

Before you apply, make sure you meet these requirements:

✅ **Age:** At least 17 years old  
✅ **Education:** High school diploma or GED  
✅ **Background:** Pass a background check (required by barbershops)  
✅ **Transportation:** Reliable way to get to your shop placement  
✅ **Commitment:** Available for full-time work (40 hours/week)  
✅ **Attitude:** Professional appearance and customer service mindset  

**Documents you'll need:**
- Photo ID (driver's license or state ID)
- Social Security card
- High school diploma or GED certificate
- Proof of Indiana residency (utility bill, lease, etc.)

---

## Why This Changes Everything

### Traditional Barber School
❌ Pay $25,000 in tuition  
❌ Earn $0 while training  
❌ Graduate with debt and zero clients  
❌ Start from scratch building your book  

### Indiana Apprenticeship
✅ Pay $0 (with funding) or $4,980 (self-pay)  
✅ Earn $10/hour + commissions + tips  
✅ Graduate debt-free with established clients  
✅ Your customers already trust you  

**The math:** You earn $20,000+ while training and avoid $25,000 in debt. That's a $45,000 advantage.

---

## Maximum Hours Per Week: State Board Guidelines

**Indiana State Board limits how many hours you can work per week:**

### On-the-Job Training (OJT) Hours

**Standard schedule:**
- **40 hours/week** (full-time, 8 hours/day, 5 days/week)
- Most common schedule
- Completes 2,000 hours in 50 weeks (about 12-13 months)

**Maximum allowed:**
- **50 hours/week** (with overtime pay)
- 10 hours/day, 5 days/week OR 8 hours/day, 6 days/week
- Employer must pay overtime (1.5x wage) for hours over 40/week
- Completes 2,000 hours in 40 weeks (about 10-11 months)

**Part-time option:**
- **20-30 hours/week** (part-time)
- For those who need to work another job or have family obligations
- Takes 18-26 months to complete 2,000 hours

**Why there's a maximum:**
- Federal labor laws (Fair Labor Standards Act)
- Prevents apprentice burnout
- Ensures quality learning, not just rushing through
- Overtime costs discourage excessive hours
- State Board wants proper skill development

### Related Technical Instruction (RTI) Hours

**Standard schedule:**
- **3-4 hours/week** (online or in-person)
- Completed in evenings, weekends, or during work hours
- 144 hours total ÷ 3 hours/week = 48 weeks (about 12 months)

**Can be accelerated:**
- Some programs offer intensive RTI (8-10 hours/week)
- Complete 144 hours in 15-18 weeks (about 4 months)
- Then focus solely on OJT hours

**Cannot exceed:**
- Most programs cap RTI at 10 hours/week
- Ensures retention and understanding

### Total Maximum Hours Per Week

**Absolute maximum:**
- 50 hours OJT + 10 hours RTI = **60 hours/week total**
- This is extremely demanding
- Not recommended for most apprentices

**Realistic maximum:**
- 40-50 hours OJT + 3-4 hours RTI = **43-54 hours/week**
- Sustainable pace
- Allows for quality learning

**Recommended schedule:**
- 40 hours OJT + 3 hours RTI = **43 hours/week**
- Completes program in 15-17 months
- Balanced approach

---

## Timeline Based on Hours Per Week

### Full-Time Schedule (40 hours/week OJT)

**Weekly breakdown:**
- Monday-Friday: 8 hours/day at shop = 40 hours OJT
- Saturday or evenings: 3 hours RTI
- **Total: 43 hours/week**

**Timeline:**
- 2,000 OJT hours ÷ 40 hours/week = 50 weeks
- 144 RTI hours ÷ 3 hours/week = 48 weeks
- **Minimum: 50 weeks (12.5 months)**
- **Realistic: 15-17 months** (accounting for holidays, sick days, shop closures)

**Earnings:**
- $10/hour × 40 hours/week = $400/week base
- Plus commissions and tips
- **Total: $500-$900/week depending on skill level**

---

### Overtime Schedule (50 hours/week OJT)

**Weekly breakdown:**
- Monday-Friday: 10 hours/day at shop = 50 hours OJT
- OR Monday-Saturday: 8-9 hours/day = 50 hours OJT
- Saturday or evenings: 3 hours RTI
- **Total: 53 hours/week**

**Timeline:**
- 2,000 OJT hours ÷ 50 hours/week = 40 weeks
- 144 RTI hours ÷ 3 hours/week = 48 weeks
- **Minimum: 48 weeks (12 months)**
- **Realistic: 12-14 months** (accounting for holidays, sick days)

**Earnings:**
- $10/hour × 40 hours = $400 base
- $15/hour (1.5x overtime) × 10 hours = $150 overtime
- Plus commissions and tips
- **Total: $650-$1,100/week depending on skill level**

**Challenges:**
- Very demanding schedule
- Risk of burnout
- Less time for family, rest, study
- Employer must be willing to pay overtime

---

### Part-Time Schedule (20 hours/week OJT)

**Weekly breakdown:**
- Monday-Wednesday: 6-7 hours/day at shop = 20 hours OJT
- OR Tuesday-Thursday: 6-7 hours/day = 20 hours OJT
- Evenings or weekends: 3 hours RTI
- **Total: 23 hours/week**

**Timeline:**
- 2,000 OJT hours ÷ 20 hours/week = 100 weeks
- 144 RTI hours ÷ 3 hours/week = 48 weeks
- **Minimum: 100 weeks (25 months)**
- **Realistic: 24-26 months** (2+ years)

**Earnings:**
- $10/hour × 20 hours/week = $200/week base
- Plus commissions and tips (limited due to fewer clients)
- **Total: $250-$400/week depending on skill level**

**Who this works for:**
- Parents with childcare responsibilities
- People working another job
- Students in school
- Those with health limitations

---

## Can You Work More Than 50 Hours/Week?

**Technically no, per State Board and federal labor law guidelines.**

**Why 50 hours is the maximum:**

**1. Federal Labor Laws (FLSA)**
- Fair Labor Standards Act limits excessive work hours
- Overtime pay required over 40 hours/week
- Prevents employer exploitation

**2. State Board Policy**
- Indiana State Board wants quality training, not rushed hours
- Apprentices need time to practice, reflect, and develop skills
- Burnout leads to poor learning and safety issues

**3. Employer Costs**
- Overtime pay (1.5x wage) is expensive
- Most shops won't allow more than 50 hours/week
- Not cost-effective for employer

**4. Practical Limitations**
- Shops aren't open 24/7
- You need time for RTI coursework
- You need rest and recovery

**If you try to work more:**
- Shop may not report hours over 50/week
- State Board may reject excessive hours
- Risk of burnout and poor performance

---

## Fastest Possible Completion Time

**Absolute fastest (working maximum hours):**

**Scenario: 50 hours/week OJT + accelerated RTI**
- 2,000 OJT hours ÷ 50 hours/week = 40 weeks
- 144 RTI hours completed in 4 months (intensive program)
- **Total: 10-11 months minimum**

**Realistic fastest:**
- Accounting for holidays, sick days, shop closures
- **12-14 months** working maximum hours

**You CANNOT complete faster than 10-11 months, even working maximum hours every week.**

---

## State Board Verification of Hours

**State Board reviews your hours to ensure compliance:**

**They check:**
- ✅ Are you working reasonable hours per week? (20-50 hours)
- ✅ Are hours consistent and verified?
- ✅ Is employer paying overtime for hours over 40/week?
- ✅ Are you completing RTI alongside OJT?
- ✅ Is training quality maintained?

**Red flags that trigger review:**
- ❌ Claiming 60-70 hours/week consistently
- ❌ Completing 2,000 hours in less than 10 months
- ❌ No RTI hours reported
- ❌ Inconsistent hour reporting

**If State Board finds issues:**
- May reject some hours
- May require additional training
- May investigate shop for violations

---

## Recommended Schedule for Success

**Our recommendation for most apprentices:**

**Standard full-time schedule:**
- 40 hours/week OJT (Monday-Friday, 8 hours/day)
- 3-4 hours/week RTI (evenings or Saturday)
- **Total: 43-44 hours/week**
- **Completion: 15-17 months**

**Why this works best:**
- ✅ Sustainable pace
- ✅ Time to develop skills properly
- ✅ Work-life balance maintained
- ✅ No overtime costs for employer
- ✅ Consistent learning and practice
- ✅ Lower burnout risk

**You'll earn $20,000-$30,000 over 15-17 months and graduate with solid skills and clientele.**

---

## Part-Time vs Full-Time: Your Schedule Options

### Can You Do Part-Time Hours?

**Yes! You can complete the apprenticeship part-time.**

**Part-time options:**

**Option 1: 20 hours/week**
- Work 3-4 days per week at shop
- Complete in 24-26 months (2+ years)
- Earn $200-$400/week

**Option 2: 25 hours/week**
- Work 3-4 days per week at shop
- Complete in 18-20 months
- Earn $250-$500/week

**Option 3: 30 hours/week**
- Work 4-5 days per week at shop
- Complete in 15-18 months
- Earn $300-$600/week

**Who part-time works for:**
- ✅ Parents with childcare responsibilities
- ✅ People working another job to pay bills
- ✅ Students in school
- ✅ Those with health limitations
- ✅ Anyone who can't commit to full-time

**Challenges with part-time:**
- ⚠️ Takes longer to complete (2+ years vs 15-17 months)
- ⚠️ Slower skill development (less practice)
- ⚠️ Harder to build clientele (fewer days in shop)
- ⚠️ Lower income during training
- ⚠️ Some shops prefer full-time apprentices

---

### Can You Make Your Own Schedule?

**No. Your employer (the barbershop) sets your schedule.**

**How scheduling works:**

**Employer determines:**
- ✅ Which days you work (Monday-Friday, Tuesday-Saturday, etc.)
- ✅ What hours you work (9am-5pm, 10am-6pm, etc.)
- ✅ How many hours per week (20, 30, 40, or 50)
- ✅ Whether you work weekends
- ✅ Your days off

**You can negotiate:**
- ✅ Part-time vs full-time
- ✅ Specific days off (for childcare, school, etc.)
- ✅ Start/end times (within reason)
- ✅ Flexibility for emergencies

**You CANNOT:**
- ❌ Come and go as you please
- ❌ Set your own hours each week
- ❌ Work only when you feel like it
- ❌ Skip days without permission

**Why employer controls schedule:**
- You're an employee, not self-employed
- Shop needs consistent coverage
- Clients need reliable service
- Training requires regular practice
- State Board requires documented hours

**Example schedules:**

**Full-time schedule (40 hours/week):**
- Monday-Friday: 9am-5pm (8 hours/day)
- Weekends: Off
- Total: 40 hours/week

**Part-time schedule (25 hours/week):**
- Tuesday-Thursday: 10am-5pm (7 hours/day)
- Saturday: 9am-2pm (5 hours)
- Total: 26 hours/week

**Weekend schedule (30 hours/week):**
- Thursday-Saturday: 10am-8pm (10 hours/day)
- Total: 30 hours/week

---

### Are Theory Hours (RTI) Mandatory Every Week?

**Yes, but there's flexibility in HOW you complete them.**

**RTI (Related Technical Instruction) requirements:**
- **Total required:** 144 hours
- **Must be completed:** Before you can take state board exam
- **Typical pace:** 3-4 hours/week over 12-15 months
- **Can be accelerated:** Yes, complete faster if you want

---

### RTI Schedule Options

**Option 1: Weekly Schedule (Most Common)**

**How it works:**
- Complete 3-4 hours of RTI every week
- Spread over 48 weeks (12 months)
- Steady, consistent pace

**Example:**
- Monday-Friday: Work at shop (40 hours OJT)
- Saturday morning: 3 hours RTI online
- Total: 43 hours/week

**Pros:**
- ✅ Manageable pace
- ✅ Better retention of information
- ✅ Doesn't interfere with work schedule
- ✅ Less overwhelming

**Cons:**
- ⚠️ Takes full 12 months to complete RTI
- ⚠️ Must be disciplined every week

---

**Option 2: Accelerated Schedule**

**How it works:**
- Complete 8-10 hours of RTI per week
- Finish 144 hours in 15-18 weeks (4 months)
- Intensive but faster

**Example:**
- Monday-Friday: Work at shop (40 hours OJT)
- Saturday: 8 hours RTI
- Sunday: 2 hours RTI
- Total: 50 hours/week for 4 months

**Pros:**
- ✅ Finish RTI quickly
- ✅ Then focus solely on OJT
- ✅ Complete apprenticeship faster overall

**Cons:**
- ⚠️ Very demanding for 4 months
- ⚠️ Risk of information overload
- ⚠️ Less time for family/rest

---

**Option 3: Flexible/Self-Paced Schedule**

**How it works:**
- Complete RTI hours on your own schedule
- Some weeks 5 hours, some weeks 1 hour
- As long as you finish 144 hours before completing OJT

**Example:**
- Busy weeks: 1-2 hours RTI
- Slow weeks: 6-8 hours RTI
- Average: 3-4 hours/week over 12 months

**Pros:**
- ✅ Maximum flexibility
- ✅ Work around your life
- ✅ No strict weekly requirement

**Cons:**
- ⚠️ Easy to fall behind
- ⚠️ Requires self-discipline
- ⚠️ May delay completion

---

**Option 4: Front-Loaded Schedule**

**How it works:**
- Complete all 144 RTI hours BEFORE starting OJT
- Intensive 3-4 week course
- Then focus solely on shop work

**Example:**
- Weeks 1-4: 36 hours/week RTI = 144 hours total
- Months 2-17: 40 hours/week OJT only

**Pros:**
- ✅ Get theory out of the way first
- ✅ Then focus 100% on practical skills
- ✅ No juggling work and school

**Cons:**
- ⚠️ Very intensive for 3-4 weeks
- ⚠️ Not earning money during RTI period
- ⚠️ May forget theory by time you finish OJT

---

### Can You Skip RTI Weeks?

**Yes, but you must complete all 144 hours eventually.**

**What's allowed:**
- ✅ Skip weeks when you're busy
- ✅ Take breaks from RTI
- ✅ Complete hours at your own pace
- ✅ Catch up later

**What's NOT allowed:**
- ❌ Skip RTI entirely
- ❌ Take state exam without completing 144 hours
- ❌ Count shop work as RTI hours
- ❌ Fake RTI completion

**Example:**
- Week 1-10: Complete 3 hours/week RTI = 30 hours
- Week 11-15: Skip RTI (busy at work)
- Week 16-25: Complete 5 hours/week RTI = 50 hours
- Week 26-30: Skip RTI (family emergency)
- Week 31-50: Complete 3 hours/week RTI = 60 hours
- **Total: 140 hours, need 4 more**
- Week 51: Complete final 4 hours
- **Total: 144 hours complete**

**State Board only cares that you complete 144 hours total, not when or how.**

---

### Do You Have to Do RTI and OJT at the Same Time?

**No. You have options.**

**Option A: Simultaneous (Most Common)**
- Work at shop 40 hours/week (OJT)
- Complete RTI 3 hours/week
- Both happen at same time over 15-17 months

**Option B: RTI First, Then OJT**
- Complete all 144 RTI hours in 3-4 weeks
- Then start working at shop for 2,000 OJT hours
- Total time: 13-15 months

**Option C: OJT First, Then RTI**
- Work at shop full-time for 12 months (2,000 hours)
- Then complete 144 RTI hours in 4-6 weeks
- Total time: 13-14 months

**Option D: Mixed Schedule**
- Complete some RTI, then some OJT, then more RTI
- Flexible based on your life
- Total time: 15-20 months

**State Board allows any of these approaches as long as you complete both requirements.**

---

## Real-World Schedule Examples

### Example 1: Full-Time Apprentice with Family

**Marcus's schedule:**
- Monday-Friday: 9am-5pm at shop (40 hours OJT)
- Saturday morning: 3 hours RTI online while kids watch cartoons
- Sunday: Family time, no work
- **Total: 43 hours/week**
- **Completion: 16 months**

**Why this works:**
- Consistent schedule
- Weekends mostly free
- Manageable pace
- Time for family

---

### Example 2: Part-Time Apprentice with Another Job

**Sarah's schedule:**
- Monday-Wednesday: 10am-5pm at shop (21 hours OJT)
- Thursday-Friday: Work other job to pay bills
- Saturday: 4 hours RTI online
- Sunday: Off
- **Total: 25 hours/week**
- **Completion: 24 months**

**Why this works:**
- Can keep other job
- Still making progress
- Flexible schedule
- Sustainable long-term

---

### Example 3: Accelerated Apprentice

**DeAndre's schedule:**
- Monday-Saturday: 8am-6pm at shop (50 hours OJT)
- Sunday: 8 hours RTI online
- **Total: 58 hours/week for 12 months**
- **Completion: 12 months**

**Why this works:**
- Wants to finish fast
- No family obligations
- High energy and motivation
- Earning maximum money

---

### Example 4: Student Apprentice

**Tasha's schedule:**
- Monday, Wednesday, Friday: 2pm-8pm at shop (18 hours OJT)
- Tuesday, Thursday: College classes
- Saturday: 10am-6pm at shop (8 hours OJT)
- Sunday: 4 hours RTI online
- **Total: 30 hours/week**
- **Completion: 20 months**

**Why this works:**
- Can finish college degree
- Still progressing toward barber license
- Flexible schedule
- Building two careers

---

## Key Takeaways: Schedule Flexibility

**What you CAN control:**
- ✅ Part-time vs full-time (negotiate with employer)
- ✅ When you complete RTI hours (flexible)
- ✅ How fast you complete RTI (3 hours/week or 10 hours/week)
- ✅ Whether you do RTI and OJT simultaneously or separately

**What you CANNOT control:**
- ❌ Your work schedule at the shop (employer decides)
- ❌ Coming and going as you please
- ❌ Skipping RTI entirely
- ❌ Working more than 50 hours/week

**Bottom line:**
- You have flexibility in HOW you complete the program
- But you must complete 2,000 OJT + 144 RTI
- Your employer controls your work schedule
- RTI can be done on your own time
- Part-time is allowed but takes longer

**Talk to potential employers about schedule flexibility before accepting apprenticeship position.**

---

## Facility Requirements for Apprenticeship Program Holders

### Barbershop Facility Requirements (Indiana State Board)

**To host barber apprentices, your facility must meet these requirements:**

**1. Physical Space Requirements**

**Minimum square footage:**
- ✅ At least 150 square feet per barber station (Indiana Code 820 IAC 2-1-4)
- ✅ Adequate space for apprentice station (cannot be cramped)
- ✅ Separate waiting area for clients
- ✅ Proper aisle space between stations (minimum 3 feet)

**Station setup:**
- ✅ Each station must have: barber chair, mirror, counter/shelf space
- ✅ Apprentice station must be same quality as licensed barber stations
- ✅ Cannot put apprentice in corner or inferior space
- ✅ Must have access to all necessary tools and equipment

**Ceiling height:**
- ✅ Minimum 8 feet ceiling height
- ✅ Proper lighting (natural or artificial)
- ✅ Adequate ventilation

---

**2. Sanitation and Safety Equipment**

**Required equipment (820 IAC 2-1-4):**
- ✅ Autoclave or approved sterilization equipment
- ✅ Disinfectant solution containers (for tools)
- ✅ Separate containers for clean and dirty tools
- ✅ Hand washing sink with hot and cold running water
- ✅ Soap and paper towels at each sink
- ✅ Covered waste receptacles
- ✅ First aid kit
- ✅ Fire extinguisher

**Sanitation areas:**
- ✅ Designated area for tool cleaning and sterilization
- ✅ Cannot be in client area
- ✅ Must have proper drainage
- ✅ Must have adequate lighting

---

**3. Plumbing and Utilities**

**Required:**
- ✅ Hot and cold running water at each station
- ✅ Proper drainage system
- ✅ Functional toilet facilities (separate from work area)
- ✅ Adequate electrical outlets (no overloaded circuits)
- ✅ Proper ventilation system (exhaust fans if needed)

---

**4. Tools and Equipment**

**Each apprentice must have access to:**
- ✅ Professional clippers (multiple sizes)
- ✅ Trimmers and edgers
- ✅ Professional scissors (cutting and thinning)
- ✅ Straight razors and safety razors
- ✅ Combs and brushes (various sizes)
- ✅ Capes and neck strips
- ✅ Spray bottles
- ✅ Blow dryers
- ✅ Disinfectant and cleaning supplies

**Shop must provide:**
- ✅ All tools and equipment for apprentice use
- ✅ Products (shampoo, aftershave, styling products)
- ✅ Towels and linens
- ✅ Sanitation supplies

**Apprentice may bring own tools but not required**

---

**5. Signage and Licensing**

**Required displays:**
- ✅ Barbershop license (prominently displayed)
- ✅ All barber licenses (at each station)
- ✅ Apprenticeship sponsor certificate (from U.S. DOL)
- ✅ Health and safety notices
- ✅ Pricing list (visible to clients)

---

**6. Accessibility and Safety**

**Required:**
- ✅ ADA compliant (wheelchair accessible if applicable)
- ✅ Proper fire exits (clearly marked)
- ✅ Emergency lighting
- ✅ Smoke detectors
- ✅ Proper flooring (non-slip, easy to clean)
- ✅ Adequate lighting (minimum 50 foot-candles at work surface)

---

## Can Apprentices Work Alongside Licensed Barbers?

**Yes! Apprentices MUST work alongside licensed barbers.**

### Mixed Environment Is Required

**Indiana State Board requires:**
- ✅ Apprentice must work in same space as licensed barbers
- ✅ Licensed barber must supervise apprentice at all times
- ✅ Apprentice learns by observing and working with licensed barbers
- ✅ This is the whole point of apprenticeship (learn from professionals)

**Typical shop setup:**

**Example: 4-station barbershop**
- Station 1: Licensed barber (10 years experience)
- Station 2: Licensed barber (5 years experience) - **Apprentice mentor**
- Station 3: Apprentice (you)
- Station 4: Licensed barber (3 years experience)

**How it works:**
- You work at your station (Station 3)
- Your mentor works at Station 2 (right next to you)
- Mentor supervises your work
- You observe other licensed barbers
- You learn from everyone in the shop

---

### Benefits of Mixed Environment

**For apprentices:**
- ✅ Learn from multiple barbers (different styles and techniques)
- ✅ See how professionals handle clients
- ✅ Observe business operations
- ✅ Build relationships with experienced barbers
- ✅ Get real-time feedback and coaching
- ✅ Understand shop culture and professionalism

**For licensed barbers:**
- ✅ Give back to the profession
- ✅ Fresh perspective from apprentice
- ✅ Help build the next generation
- ✅ Potential future colleague or employee

**For clients:**
- ✅ Can choose licensed barber or apprentice
- ✅ Apprentice services often discounted
- ✅ Apprentice work is supervised (quality assured)
- ✅ Support someone learning a trade

---

### Supervision Requirements in Mixed Environment

**Licensed barber mentor must:**
- ✅ Be physically present in shop during all apprentice work hours
- ✅ Be available to supervise and assist apprentice
- ✅ Check apprentice's work before client leaves
- ✅ Step in if apprentice struggles
- ✅ Provide real-time coaching and feedback

**Mentor CANNOT:**
- ❌ Leave shop while apprentice is working
- ❌ Be "too busy" to supervise
- ❌ Let apprentice work completely unsupervised
- ❌ Ignore apprentice's mistakes

**Example of proper supervision:**

**Scenario: Apprentice doing a fade**
- Apprentice starts the fade on client
- Mentor works on their own client at next station
- Mentor glances over every few minutes
- Apprentice gets stuck on blending
- Mentor pauses their work, comes over
- Mentor demonstrates proper technique
- Apprentice continues with guidance
- Mentor checks final result before client leaves

---

### Client Disclosure Requirements

**Clients must know they're being served by an apprentice:**

**Required disclosure:**
- ✅ Shop must inform client they're booking with apprentice
- ✅ Apprentice must introduce themselves as apprentice
- ✅ Client must consent to apprentice service
- ✅ Client can decline and request licensed barber

**Example disclosure:**
"Hi, I'm Marcus. I'm an apprentice barber working toward my license. I'll be doing your haircut today under the supervision of [Mentor's Name], who's a licensed barber with 10 years of experience. He'll be checking my work to make sure you're happy with the result. Is that okay with you?"

**Client rights:**
- ✅ Can ask for licensed barber instead
- ✅ Can request mentor to finish if unhappy
- ✅ Should receive discounted price (apprentice rate)
- ✅ Can provide feedback to help apprentice learn

---

### Apprentice Pricing in Mixed Environment

**Typical pricing structure:**

**Licensed barber rates:**
- Haircut: $25-$40
- Fade: $30-$45
- Beard trim: $15-$25
- Shave: $35-$50

**Apprentice rates (20-40% discount):**
- Haircut: $15-$25
- Fade: $20-$30
- Beard trim: $10-$15
- Shave: $20-$30

**Why apprentice rates are lower:**
- Takes longer (still learning)
- Supervised (mentor involvement)
- Client takes slight risk (apprentice skill level)
- Incentive for clients to help train next generation

**Apprentice still earns commission on discounted rates**

---

### Can Apprentices and Licensed Barbers Share Clients?

**Yes, this is common and beneficial.**

**Scenario 1: Overflow clients**
- Licensed barber is fully booked
- Walk-in client arrives
- Licensed barber: "I'm booked, but my apprentice Marcus can take you. He's doing great work and I'll supervise."
- Client agrees
- Apprentice serves client

**Scenario 2: Apprentice builds own clients**
- Client comes in regularly for licensed barber
- Licensed barber: "Marcus is ready to take on his own clients. Would you like to try him next time? I'll still check his work."
- Client tries apprentice
- Client becomes apprentice's regular

**Scenario 3: Mentor assists apprentice**
- Apprentice starts haircut
- Gets stuck on difficult section
- Mentor steps in and finishes
- Both apprentice and mentor work on same client

**This is all normal and expected in apprenticeship environment**

---

### Facility Setup: Apprentice-Only vs Mixed

**Apprentice-only shop (NOT ALLOWED):**
- ❌ Shop with only apprentices, no licensed barbers
- ❌ Illegal and violates State Board rules
- ❌ Hours would not count toward licensure
- ❌ No one to supervise or train

**Mixed shop (REQUIRED):**
- ✅ Shop with licensed barbers AND apprentices
- ✅ Legal and meets State Board requirements
- ✅ Hours count toward licensure
- ✅ Proper supervision and training

**Minimum ratio:**
- At least 1 licensed barber per apprentice
- Example: 3 licensed barbers can supervise up to 3 apprentices

**Ideal ratio:**
- 2-3 licensed barbers per apprentice
- Ensures adequate supervision
- Multiple mentors to learn from

---

### State Board Inspection of Facilities

**State Board inspects apprenticeship sponsor shops:**

**What they check:**
- ✅ Facility meets size and space requirements
- ✅ Proper sanitation equipment present and functional
- ✅ All licenses properly displayed
- ✅ Adequate supervision of apprentices
- ✅ Proper tools and equipment available
- ✅ Safety standards met
- ✅ Apprentice working conditions acceptable

**Inspection frequency:**
- Initial inspection before approval as sponsor
- Random inspections during sponsorship
- Complaint-triggered inspections
- Annual renewal inspections

**Violations can result in:**
- Warning and required corrections
- Fines ($100-$1,000)
- Suspension of apprenticeship sponsor status
- Revocation of sponsor status
- Apprentice hours may not count

---

### Red Flags: Inadequate Facilities

**Watch out for these issues:**

❌ **Cramped, unsafe workspace**
- Not enough room to work properly
- Tripping hazards
- Poor lighting

❌ **No proper sanitation equipment**
- No autoclave or sterilization
- Dirty tools and equipment
- No hand washing facilities

❌ **Apprentice isolated from licensed barbers**
- Apprentice in back room alone
- No supervision or mentoring
- Can't observe professionals

❌ **Unlicensed or expired licenses**
- Shop license expired
- Barber licenses not current
- No apprenticeship sponsor certificate

❌ **Unsafe conditions**
- Electrical hazards
- No fire safety equipment
- Blocked exits

**If you see these red flags, report to State Board: (317) 234-3040**

---

## The Bottom Line: Facility Requirements

**For Barbershops:**
- ✅ Must meet Indiana State Board facility requirements
- ✅ Adequate space, sanitation, safety equipment
- ✅ Proper tools and supplies for apprentices
- ✅ All licenses and certificates displayed
- ✅ Pass State Board inspections

**For Apprentices:**
- ✅ You WILL work alongside licensed barbers (required)
- ✅ You WILL be supervised at all times
- ✅ You WILL learn in a mixed environment
- ✅ This is the best way to learn the trade
- ✅ Clients know you're an apprentice

**Mixed environment is not just allowed—it's required and beneficial for everyone.**

---

## Who Pays Who? Understanding the Sponsor-Shop-Apprentice Relationship

### Clarifying "Sponsor" vs "Shop Owner" vs "Program Holder"

**The Shop Owner IS the Program Holder (they are the same).**

**Program Holder / Shop Owner:**
- Barbershop owner who registers as apprenticeship sponsor with U.S. Department of Labor
- Hires apprentice as W-2 employee
- Provides on-the-job training
- Pays apprentice wages ($10/hour + commissions)
- Tracks hours and reports to State Board
- Provides tools, equipment, supplies
- Supervises apprentice work

**The Sponsor (Third-Party Organization):**
- Separate organization that helps coordinate apprenticeships
- Could be: Workforce development organization, training provider, industry association, or us (Elevate for Humanity)
- Recruits and screens apprentices
- Matches apprentices with program holders (barbershops)
- May provide RTI curriculum
- May help with administrative paperwork
- NOT the employer (shop owner is the employer)

**Key distinction:**
- **Program Holder = Shop Owner** (same entity, employer)
- **Sponsor = Third-party coordinator** (separate entity, not employer)

---

### Payment Flow: Who Pays What

**Scenario 1: Program Holder Model (Standard)**

**The Program Holder (Shop Owner):**
- ✅ Barbershop owner registers as apprenticeship program holder with U.S. Department of Labor (FREE)
- ✅ Hires apprentice as W-2 employee
- ✅ Pays apprentice wages ($10/hour + commissions)
- ✅ Provides on-the-job training
- ✅ Provides tools, equipment, supplies
- ✅ Tracks hours and reports to State Board
- ❌ Does NOT pay for RTI curriculum (WIOA/WRG/JRI pays sponsor directly)

**The Apprentice:**
- ✅ Works at the shop
- ✅ Earns wages from shop owner (program holder)
- ✅ Completes RTI curriculum
- ✅ Pays nothing to shop owner

**Example:**
- Shop A owner: Registers as program holder with U.S. DOL (FREE)
- Shop A hires: Marcus as apprentice
- Shop A pays Marcus: $10/hour + commissions
- WIOA pays RTI provider: $6,500 for Marcus's RTI curriculum
- Marcus completes: RTI online through approved provider
- Shop A tracks: Marcus's hours and reports to State Board
- Marcus pays Shop A: $0

---

**Scenario 2: Third-Party Sponsor Coordination (How We Work)**

**In some cases, a separate organization helps coordinate apprenticeships:**

**Examples of third-party sponsors:**
- Elevate for Humanity (us)
- Workforce development organizations
- Training providers
- Industry associations

**How it works:**

**The third-party sponsor (e.g., Elevate for Humanity):**
- ✅ Helps barbershops register as program holders with U.S. DOL
- ✅ Recruits and screens apprentices
- ✅ Matches apprentices with participating program holder shops
- ✅ Provides or arranges RTI curriculum
- ✅ Helps with administrative paperwork
- ✅ Supports both shop and apprentice

**The program holder (shop owner):**
- ✅ Registers as program holder with U.S. DOL (with our help)
- ✅ Hires apprentice as W-2 employee
- ✅ Pays apprentice wages ($10/hour + commissions)
- ✅ Provides on-the-job training
- ✅ Tracks hours and reports to State Board

**The third-party sponsor (Elevate for Humanity):**
- ❌ Does NOT pay apprentice wages (shop owner pays)
- ✅ Receives funding (WIOA/WRG/JRI) to cover RTI curriculum
- ✅ Provides support and coordination services
- ✅ Does NOT charge fees to shops or apprentices
- **Note: Financial arrangements between Elevate and program holders are negotiated in MOU agreements**

**Example:**
- Elevate for Humanity recruits Marcus as apprentice
- Elevate and Shop A sign MOU (Memorandum of Understanding)
- Shop A hires Marcus as employee
- Shop A pays Marcus: $10/hour + commissions
- WIOA pays Elevate: For Marcus's RTI curriculum
- Elevate provides: RTI training to Marcus
- Shop A reports: Marcus's hours and progress to Elevate
- Marcus pays Elevate: $0
- Marcus pays Shop A: $0

---

### Does Anyone Pay the Shop Owner for Training Apprentices?

**Short answer: No, not directly.**

**What the shop owner receives:**

**1. Apprentice's Labor**
- Apprentice works and generates revenue for shop
- Customers pay for apprentice's services
- Shop keeps 50-60% of service revenue (after paying apprentice commission)

**2. Work Opportunity Tax Credit (WOTC) - Federal Tax Benefit**

**What is WOTC?**
- Federal tax credit for employers who hire individuals from certain target groups
- Incentivizes hiring people who face barriers to employment
- Reduces your federal tax liability (not a direct payment)
- Claimed on your business tax return

**WOTC Target Groups (Relevant to Apprenticeships):**

**1. Veterans (Multiple Categories with Different Credit Amounts)**

**Category A: Unemployed Veteran (Standard)**
- Veteran who was unemployed for at least 4 weeks (whether or not consecutive) during the 1-year period ending on hire date
- Any length of military service
- **Credit: 40% of first $6,000 in wages = Up to $2,400**
- **Minimum hours:** 400 hours worked in first year

**Category B: Veteran Receiving SNAP Benefits**
- Veteran receiving SNAP (food stamps) for at least 3 months during 15-month period ending on hire date
- **Credit: 40% of first $6,000 in wages = Up to $2,400**
- **Minimum hours:** 400 hours worked in first year

**Category C: Disabled Veteran (Unemployed 6+ Months)**
- Veteran with service-connected disability
- Unemployed for at least 6 months (whether or not consecutive) during the 1-year period ending on hire date
- **Credit: 40% of first $12,000 in wages = Up to $4,800**
- **Minimum hours:** 400 hours worked in first year

**Category D: Disabled Veteran (Receiving VA Benefits)**
- Veteran with service-connected disability
- Hired within 1 year of discharge or release from active duty
- **Credit: 40% of first $24,000 in wages = Up to $9,600**
- **Minimum hours:** 400 hours worked in first year

**Example: Disabled Veteran Apprentice**
- You hire Marcus, a disabled veteran receiving VA benefits
- Marcus was discharged 8 months ago
- You pay Marcus $20,000 in first year
- **WOTC credit: 40% of first $24,000 = 40% × $20,000 = $8,000**
- Your federal tax liability reduced by $8,000

**2. Ex-Felons**
- Convicted of a felony
- Hired within 1 year of conviction or release from prison
- Credit: Up to $2,400 (if worked 400+ hours)

**3. Designated Community Residents (Empowerment Zones)**
- Lives in designated empowerment zone or rural renewal county
- Credit: Up to $2,400 (if worked 400+ hours)

**4. SNAP Recipients (Food Stamps)**
- Receiving SNAP benefits (or household member receives)
- Age 18-39
- Credit: Up to $2,400 (if worked 400+ hours)

**5. SSI Recipients**
- Receiving Supplemental Security Income
- Credit: Up to $2,400 (if worked 400+ hours)

**6. Long-Term Unemployment Recipients**
- Unemployed for 27+ weeks and received unemployment compensation
- Credit: Up to $2,400 (if worked 400+ hours)

**7. Vocational Rehabilitation Referrals**
- Referred by vocational rehabilitation agency
- Credit: Up to $2,400 (if worked 400+ hours)

**8. Qualified Long-Term Unemployment Recipients**
- Unemployed for 27+ weeks
- Received unemployment compensation during some or all of that time
- Credit: Up to $2,400 (if worked 400+ hours)

**9. Summer Youth Employees**
- Age 16-17
- Lives in empowerment zone
- Employed between May 1 and September 15
- Credit: Up to $1,200 (for summer employment)

---

### Special Focus: Students and Young Adults

**Important: Most apprentices are NOT eligible for WOTC just for being students.**

**Students who DO qualify:**

**1. Student + SNAP Recipient**
- Age 18-39
- Student enrolled in school
- Receiving SNAP benefits (or household member receives)
- **Credit: Up to $2,400**

**Example:**
- Tasha is 22, enrolled in community college part-time
- Her household receives SNAP benefits
- She starts barber apprenticeship
- **You qualify for $2,400 WOTC credit**

**2. Student + Designated Community Resident**
- Age 18-39
- Student enrolled in school
- Lives in designated empowerment zone or rural renewal county
- **Credit: Up to $2,400**

**Example:**
- DeAndre is 20, taking GED classes
- Lives in designated empowerment zone in Indianapolis
- Starts barber apprenticeship
- **You qualify for $2,400 WOTC credit**

**3. Student + Vocational Rehabilitation Referral**
- Any age
- Student with disability
- Referred by state vocational rehabilitation agency
- **Credit: Up to $2,400**

**Example:**
- Marcus is 25, has learning disability
- Referred by Indiana Vocational Rehabilitation Services
- Starts barber apprenticeship
- **You qualify for $2,400 WOTC credit**

**Students who DO NOT qualify:**
- Regular high school or college student with no other qualifying factor
- Student from middle-class family not receiving SNAP
- Student not living in empowerment zone
- Student without disability or vocational rehab referral

**Key point: Being a student alone doesn't qualify for WOTC. Student must ALSO be in another target group (SNAP, empowerment zone, vocational rehab, etc.)**

---

### How WOTC Works

**Credit amounts based on hours worked:**
- **120-399 hours worked:** 25% of first-year wages (max $1,500 for most groups)
- **400+ hours worked:** 40% of first-year wages (max $2,400 for most groups)
- **Special groups:** Higher maximums (veterans, long-term TANF recipients)

**Detailed Calculation Examples:**

**Example 1: Ex-Felon Apprentice (Standard $2,400 Credit)**
- You hire Marcus (ex-felon released 6 months ago)
- Marcus works 2,000 hours in first year (full-time apprentice)
- You pay Marcus $20,000 in first year wages ($10/hour × 2,000 hours)
- **WOTC calculation:**
  - Maximum wages considered: $6,000
  - Credit rate: 40% (because worked 400+ hours)
  - Credit amount: 40% × $6,000 = **$2,400**
- Your federal tax liability reduced by $2,400

**Example 2: Disabled Veteran Apprentice (Maximum $9,600 Credit)**
- You hire DeAndre (disabled veteran, discharged 8 months ago, receiving VA benefits)
- DeAndre works 2,000 hours in first year
- You pay DeAndre $25,000 in first year wages
- **WOTC calculation:**
  - Maximum wages considered: $24,000
  - Credit rate: 40% (because worked 400+ hours)
  - Credit amount: 40% × $24,000 = **$9,600**
- Your federal tax liability reduced by $9,600

**Example 3: SNAP Recipient Apprentice (Standard $2,400 Credit)**
- You hire Tasha (age 25, receiving SNAP benefits)
- Tasha works 2,000 hours in first year
- You pay Tasha $22,000 in first year wages
- **WOTC calculation:**
  - Maximum wages considered: $6,000
  - Credit rate: 40% (because worked 400+ hours)
  - Credit amount: 40% × $6,000 = **$2,400**
- Your federal tax liability reduced by $2,400

**Example 4: Part-Time Apprentice (Reduced Credit)**
- You hire Sarah (ex-felon)
- Sarah works part-time: 300 hours in first year
- You pay Sarah $6,000 in first year wages
- **WOTC calculation:**
  - Maximum wages considered: $6,000
  - Credit rate: 25% (because worked 120-399 hours, not 400+)
  - Credit amount: 25% × $6,000 = **$1,500**
- Your federal tax liability reduced by $1,500

**Example 5: Unemployed Veteran (Standard $2,400 Credit)**
- You hire James (veteran, unemployed for 6 weeks before hire)
- James works 2,000 hours in first year
- You pay James $20,000 in first year wages
- **WOTC calculation:**
  - Maximum wages considered: $6,000
  - Credit rate: 40% (because worked 400+ hours)
  - Credit amount: 40% × $6,000 = **$2,400**
- Your federal tax liability reduced by $2,400

---

### WOTC Credit Amounts: Quick Reference Table

| Target Group | Maximum Wages Considered | Credit Rate (400+ hrs) | Maximum Credit |
|--------------|-------------------------|----------------------|----------------|
| Ex-Felon | $6,000 | 40% | $2,400 |
| SNAP Recipient (18-39) | $6,000 | 40% | $2,400 |
| Designated Community Resident | $6,000 | 40% | $2,400 |
| SSI Recipient | $6,000 | 40% | $2,400 |
| Long-Term Unemployed | $6,000 | 40% | $2,400 |
| Vocational Rehab Referral | $6,000 | 40% | $2,400 |
| Unemployed Veteran (Standard) | $6,000 | 40% | $2,400 |
| Veteran + SNAP | $6,000 | 40% | $2,400 |
| Disabled Veteran (Unemployed 6+ months) | $12,000 | 40% | $4,800 |
| Disabled Veteran (Receiving VA Benefits) | $24,000 | 40% | $9,600 |
| Summer Youth (16-17) | $3,000 | 40% | $1,200 |

**Note:** Credit rate is 25% (not 40%) if employee works 120-399 hours instead of 400+ hours.

---

### How to Claim WOTC

**Step 1: Screen Apprentice for Eligibility**
- Ask apprentice if they're in any target group
- Complete IRS Form 8850 (Pre-Screening Notice)
- Must be completed on or before day apprentice starts work

**Step 2: Get Certification**
- Submit Form 8850 to state workforce agency within 28 days of hire
- Indiana: Submit to Indiana Department of Workforce Development
- Also submit ETA Form 9061 or 9062 (depending on target group)

**Step 3: Receive Certification**
- State workforce agency reviews and certifies eligibility
- You receive certification letter (typically 2-4 weeks)
- Keep certification for your tax records

**Step 4: Claim Credit on Tax Return**
- File IRS Form 5884 (Work Opportunity Credit) with your business tax return
- Attach certification letter
- Credit reduces your federal income tax liability

---

### Indiana-Specific WOTC Information

**Where to submit in Indiana:**
- Indiana Department of Workforce Development
- WOTC Coordinator
- 10 N. Senate Ave.
- Indianapolis, IN 46204
- Email: WOTC@dwd.in.gov
- Phone: (317) 232-7670

**Indiana processing time:**
- Typically 2-4 weeks for certification decision
- Must submit within 28 days of hire date
- Late submissions will be denied

**Indiana target group priorities:**
- Veterans (high priority)
- Ex-felons (high priority)
- SNAP recipients (common)
- Long-term unemployed (common)

---

### WOTC Requirements and Restrictions

**Requirements:**
- ✅ Apprentice must be in eligible target group
- ✅ Must complete Form 8850 on or before start date
- ✅ Must submit to state within 28 days of hire
- ✅ Must receive certification from state
- ✅ Apprentice must work minimum 120 hours
- ✅ Apprentice must be W-2 employee (not 1099)

**Restrictions:**
- ❌ Cannot claim for relatives
- ❌ Cannot claim if apprentice worked for you before
- ❌ Cannot claim if apprentice is rehire within 1 year
- ❌ Cannot claim if you don't have tax liability to offset
- ❌ Credit cannot exceed your tax liability (non-refundable)

---

### WOTC for Apprenticeships: Key Points

**Why WOTC is valuable for apprenticeships:**
- Many apprentices qualify (ex-felons, veterans, SNAP recipients, long-term unemployed)
- JRI participants automatically qualify (ex-felons)
- Credit helps offset apprentice wage costs
- Easy to claim if you follow process

**Common qualifying scenarios:**

**Scenario 1: JRI Participant**
- Marcus is justice-involved (ex-felon)
- Automatically qualifies for WOTC
- You claim $2,400 credit
- Helps offset his $20,000 first-year wages

**Scenario 2: Veteran**
- DeAndre is unemployed veteran
- Qualifies for WOTC
- You claim $2,400-$9,600 credit (depending on disability status)
- Significant tax savings

**Scenario 3: SNAP Recipient**
- Tasha receives food stamps
- Age 18-39
- Qualifies for WOTC
- You claim $2,400 credit

---

### WOTC Checklist for Program Holders

**Before hiring:**
- ☐ Understand WOTC target groups
- ☐ Have Form 8850 ready

**On hire date:**
- ☐ Ask apprentice about target group eligibility
- ☐ Complete Form 8850 (on or before start date)
- ☐ Have apprentice sign form

**Within 28 days of hire:**
- ☐ Submit Form 8850 to Indiana DWD
- ☐ Submit ETA Form 9061 or 9062
- ☐ Keep copies for your records

**After certification:**
- ☐ Receive certification letter from state
- ☐ File with your tax records
- ☐ Claim credit on next tax return (Form 5884)

---

### WOTC Resources

**IRS Resources:**
- Form 8850: [irs.gov/forms-pubs/about-form-8850](https://www.irs.gov/forms-pubs/about-form-8850)
- Form 5884: [irs.gov/forms-pubs/about-form-5884](https://www.irs.gov/forms-pubs/about-form-5884)
- WOTC Information: [irs.gov/businesses/small-businesses-self-employed/work-opportunity-tax-credit](https://www.irs.gov/businesses/small-businesses-self-employed/work-opportunity-tax-credit)

**Indiana Resources:**
- Indiana DWD WOTC: Email WOTC@dwd.in.gov or call (317) 232-7670

**We can help:**
- Identify if your apprentice qualifies
- Complete WOTC forms
- Submit to Indiana DWD
- Track certification status
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

---

### The Bottom Line: WOTC

**WOTC is a valuable tax credit for program holders:**
- Up to $2,400 per apprentice (most common)
- Up to $9,600 for disabled veterans
- Many apprentices qualify (especially JRI participants)
- Easy to claim if you follow the process
- Must complete Form 8850 on or before hire date
- Must submit to Indiana DWD within 28 days
- Reduces your federal tax liability

**Don't miss out on this benefit - screen every apprentice for WOTC eligibility!**

**What the shop owner does NOT pay for:**
- ❌ RTI curriculum (WIOA/WRG/JRI pays sponsor directly)
- ❌ Registration fees (FREE)
- ❌ State Board fees (FREE)
- ❌ Apprentice's tools (shop provides, but minimal cost)

**What the shop owner DOES receive:**
- ✅ Apprentice's labor and service revenue
- ✅ Tax credits (WOTC, up to $2,400-$9,600 depending on target group)

**What the shop owner does NOT receive:**
- ❌ Payment from apprentice
- ❌ Payment from WIOA/WRG/JRI (funding goes to sponsor for RTI, not shop)
- ❌ Payment from State Board
- ❌ Payment from U.S. Department of Labor
- ❌ Reimbursement for apprentice wages

---

### Why Would a Shop Owner Become a Sponsor?

**If no one pays them, why do it?**

**Reason 1: Build Your Team**
- Train barbers your way
- Develop loyal employees
- Create pipeline of skilled staff
- Apprentices often stay long-term after licensing

**Reason 2: Revenue from Apprentice Work**
- Apprentice generates revenue from day one
- Shop keeps 50-60% of service revenue
- Example: Apprentice does $750/week in services
  - Shop pays apprentice: $400 base + $300 commission = $700
  - Shop keeps: $450 (60% of $750)
  - Shop's net: $450 - $700 = -$250 loss initially
- But as apprentice improves (month 6+):
  - Apprentice does $1,200/week in services
  - Shop pays apprentice: $400 base + $480 commission = $880
  - Shop keeps: $720 (60% of $1,200)
  - Shop's net: $720 - $880 = -$160 loss
- By month 12+:
  - Apprentice does $1,500/week in services
  - Shop pays apprentice: $400 base + $600 commission = $1,000
  - Shop keeps: $900 (60% of $1,500)
  - Shop's net: $900 - $1,000 = -$100 loss
- After licensing (if apprentice stays):
  - Licensed barber does $2,000/week in services
  - Shop pays barber: $400 base + $800 commission = $1,200
  - Shop keeps: $1,200 (60% of $2,000)
  - Shop's net: $1,200 - $1,200 = $0 break-even to profit

**Reason 3: Tax Benefits**
- WOTC tax credit: Up to $2,400 per apprentice
- Reduces tax liability
- Apprentice wages are business expense (tax deductible)

**Reason 4: Reputation**
- Known as training facility
- Attracts quality applicants
- Community respect
- Industry leadership

**Reason 5: Give Back**
- Help next generation
- Strengthen the profession
- Support workforce development
- Personal satisfaction

---

### Common Misconceptions

**Misconception 1: "The government pays shops to train apprentices"**

❌ **Wrong.** The government does NOT pay shops at all. WIOA/WRG/JRI pays the RTI training provider directly, not the barbershop.

**Misconception 2: "Apprentices pay the shop for training"**

❌ **Wrong.** Apprentices do NOT pay the shop. The shop pays the apprentice wages.

**Misconception 3: "Third-party sponsors pay shops to host apprentices"**

❌ **Wrong.** Third-party sponsors do NOT pay shops. Shops pay apprentice wages themselves.

**Misconception 4: "Shops make money from apprentices"**

**It depends.** Shops invest in apprentices as a long-term strategy to build their team. The financial outcome varies based on the apprentice's skill development and whether they stay after licensing.

---

### Financial Reality for Shop Owners

**Cost to become apprenticeship sponsor:**
- Registration fees: $0 (FREE - no cost to register)
- Annual renewal: $0 (FREE)
- Insurance increases: May increase slightly (varies by insurer)
- Administrative time: 5-10 hours/month

**Cost per apprentice (15-17 months):**
- Wages: $20,000-$30,000
- RTI curriculum: $0 (WIOA/WRG/JRI pays sponsor directly - shop pays nothing)
- Tools and supplies: $200-500 (shop-provided tools)
- **Total: $20,200-$30,500**

**Revenue from apprentice (15-17 months):**
- Service revenue: $30,000-$60,000 (depending on skill level and clientele)
- Shop keeps 50-60%: $18,000-$36,000
- WOTC tax credit: Up to $2,400 (if apprentice qualifies)

**Net financial outcome for shop:**
- Varies based on apprentice performance and skill development
- Shop receives: Apprentice service revenue + WOTC tax credit
- Shop pays: Apprentice wages + tools/supplies
- Financial arrangements with Elevate: Negotiated in MOU
- Most shops find apprenticeships financially beneficial long-term

**Long-term benefit:**
- If apprentice stays after licensing: Shop profits $10,000-$30,000/year from their work
- If apprentice rents booth after licensing: Shop earns $250/week = $13,000/year rent
- If apprentice leaves: Shop loses initial investment but helped the profession

**Most shops view apprenticeships as long-term investment, not short-term profit.**

---

### The Bottom Line: Payment Structure

**Who pays who:**

✅ **Shop owner pays apprentice** ($10/hour + commissions)

✅ **WIOA/WRG/JRI pays sponsor** (for apprentice's RTI curriculum - NOT the shop)

✅ **Customers pay shop** (for services)

✅ **Federal government gives shop tax credits** (WOTC, up to $2,400)

❌ **Shop owner does NOT pay for RTI curriculum**

❌ **WIOA/WRG/JRI does NOT pay shop owner**

❌ **Shop owner pays ONLY apprentice wages - nothing else**

❌ **Apprentice does NOT pay shop owner**

❌ **Third-party sponsor does NOT pay shop owner** (usually)

❌ **State Board does NOT pay shop owner**

**Shop owners become sponsors to build their team, generate revenue from apprentice work, receive tax benefits, and give back to the profession—not because someone pays them to do it.**

---

## Does the Sponsor Supply the Barber Kit and Tools?

### What Tools and Equipment Are Provided

**Yes, the sponsor (shop owner) typically provides tools and equipment for apprentices to use.**

**What the shop MUST provide (Indiana State Board requirement):**

**Basic tools for daily use:**
- ✅ Professional clippers (multiple sizes and guards)
- ✅ Trimmers and edgers
- ✅ Combs and brushes (various sizes)
- ✅ Capes and neck strips
- ✅ Spray bottles
- ✅ Disinfectant and cleaning supplies
- ✅ Towels and linens

**Shop equipment:**
- ✅ Barber chair at your station
- ✅ Mirror and counter space
- ✅ Access to shampoo bowl/sink
- ✅ Blow dryers
- ✅ Sanitation equipment (autoclave, disinfectant containers)

**Products:**
- ✅ Shampoo and conditioner
- ✅ Aftershave and lotions
- ✅ Styling products (pomade, gel, etc.)
- ✅ Shaving cream
- ✅ All client-facing products

**Why shop provides these:**
- Required by State Board regulations
- Shop's responsibility as apprenticeship sponsor
- Ensures quality and consistency
- Part of training environment

---

### What About Your Personal Barber Kit?

**You have options:**

**Option 1: Use Shop's Tools (Most Common for Beginners)**

**Months 1-6:**
- Use shop-provided clippers, scissors, tools
- Learn on shop equipment
- No upfront cost to you
- Shop maintains and replaces tools

**Pros:**
- ✅ $0 cost to start
- ✅ Try different tools to see what you like
- ✅ Shop handles maintenance and repairs
- ✅ No risk if you damage tools while learning

**Cons:**
- ⚠️ Share tools with other barbers
- ⚠️ May not be the exact tools you prefer
- ⚠️ Can't take tools home to practice

---

**Option 2: Buy Your Own Kit (Common After Month 6+)**

**As you progress:**
- Many apprentices buy their own professional kit
- Typically happens around month 6-9
- Allows you to have your preferred tools
- You can practice at home

**What to buy (if you choose to):**

**Essential personal kit ($300-$600):**
- Professional clippers: $150-$300 (Wahl, Andis, Oster)
- Trimmers/edgers: $50-$100
- Professional scissors: $50-$150 (cutting and thinning)
- Straight razor: $30-$80
- Combs and brushes: $20-$40
- Tool case: $30-$50

**Advanced kit ($600-$1,200):**
- Multiple clippers (corded and cordless)
- High-end scissors ($200-$400)
- Multiple trimmers
- Professional razor
- Full accessory set

**Pros:**
- ✅ Your own tools, your preference
- ✅ Can practice at home
- ✅ Build your professional kit
- ✅ Take with you if you change shops
- ✅ Shows commitment and professionalism

**Cons:**
- ⚠️ Upfront cost ($300-$1,200)
- ⚠️ You're responsible for maintenance
- ⚠️ Risk of damage or loss

---

**Option 3: Hybrid Approach (Recommended)**

**Months 1-6:**
- Use shop-provided tools
- Learn and practice
- Figure out what you like

**Months 7-12:**
- Buy your own clippers ($150-$300)
- Still use shop's scissors and other tools
- Start building your kit gradually

**Months 13-17:**
- Complete your personal kit
- Own all your primary tools
- Use shop's backup tools as needed

**After licensing:**
- Have full professional kit
- Ready to rent booth or work anywhere
- Professional setup

---

### Does Funding (WIOA/WRG/JRI) Cover Tools?

**It depends on the funding source:**

**WIOA Funding:**
- ✅ May cover basic tool kit (up to $500)
- ✅ Considered "support services"
- ✅ Must be approved by career counselor
- ✅ Usually covers one-time purchase

**Workforce Ready Grant:**
- ❌ Typically does NOT cover tools
- ✅ Only covers tuition and fees

**JRI Funding:**
- ✅ YES, covers tool kit (up to $500-$800)
- ✅ Considered "work clothing and equipment"
- ✅ JRI case manager approves purchase
- ✅ Helps justice-involved individuals get started

**Employer Sponsorship:**
- Varies by shop
- Some shops provide tools
- Some shops give tool allowance ($200-$500)
- Some shops require you to buy your own

**Self-Pay:**
- You're responsible for tools if you want your own
- Can use shop tools for free

---

### What If You Can't Afford Your Own Kit?

**You don't need to buy tools to start or complete the apprenticeship.**

**Options if you can't afford tools:**

**1. Use shop-provided tools (free)**
- Perfectly acceptable throughout entire apprenticeship
- Many apprentices never buy their own tools
- Shop provides everything you need

**2. Apply for WIOA or JRI funding**
- WIOA may cover tool kit
- JRI covers tool kit for justice-involved individuals
- Apply before starting apprenticeship

**3. Buy tools gradually**
- Start with clippers ($150-$300)
- Add scissors later ($50-$150)
- Build kit over 6-12 months
- Use shop tools in the meantime

**4. Ask shop for tool allowance**
- Some shops provide $200-$500 tool allowance
- Negotiate when you're hired
- Not guaranteed, but worth asking

**5. Payment plans**
- Many barber supply stores offer payment plans
- Pay $50-$100/month for tools
- Build credit while building kit

**You will NOT be denied apprenticeship if you can't afford tools. Shop provides what you need.**

---

### Shop's Responsibility vs Your Responsibility

**Shop MUST provide (required):**
- ✅ All basic tools for you to use
- ✅ All products (shampoo, aftershave, etc.)
- ✅ All sanitation supplies
- ✅ Barber chair and station
- ✅ Towels, capes, neck strips
- ✅ Maintenance and replacement of shop tools

**You MAY choose to provide (optional):**
- ✅ Your own personal clippers
- ✅ Your own scissors
- ✅ Your own trimmers
- ✅ Your own combs and brushes
- ✅ Your own tool case

**You are NOT required to buy tools to participate in apprenticeship.**

---

### What Happens to Your Tools If You Leave the Shop?

**Shop-provided tools:**
- ❌ Stay with the shop
- ❌ You cannot take them
- ❌ They belong to the shop

**Your personal tools:**
- ✅ You take them with you
- ✅ They're yours
- ✅ Use them at your next shop

**This is why some apprentices buy their own tools:**
- Portability if you change shops
- Ownership and control
- Build your professional kit

---

### Typical Timeline: Tools and Equipment

**Month 1-3:**
- Use 100% shop-provided tools
- Learn on shop equipment
- Figure out what you like
- **Cost to you: $0**

**Month 4-6:**
- Still using shop tools
- Maybe buy your own clippers ($150-$300)
- Start building personal kit
- **Cost to you: $0-$300**

**Month 7-12:**
- Using mix of shop and personal tools
- Buy scissors, trimmers, accessories
- Building professional kit
- **Cost to you: $300-$600 total**

**Month 13-17:**
- Mostly using your own tools
- Shop tools as backup
- Complete professional kit
- **Cost to you: $600-$1,200 total**

**After licensing:**
- Own complete professional kit
- Ready to work anywhere
- Can rent booth with your own tools
- **Total investment: $600-$1,200 over 17 months**

---

### Where to Buy Tools

**Barber supply stores:**
- Sally Beauty Supply (local stores)
- Barber Depot (online)
- Amazon (wide selection)
- Professional beauty supply stores

**What to look for:**
- Professional-grade (not consumer-grade)
- Reputable brands (Wahl, Andis, Oster, Babyliss)
- Warranty and support
- Reviews from professional barbers

**Avoid:**
- Cheap knockoffs
- Consumer-grade clippers (won't last)
- Used tools (sanitation concerns)
- Tools without warranty

---

### JRI Participants: Tool Kit Funding

**If you're funded through JRI, you can get a complete tool kit provided:**

**What JRI covers:**
- ✅ Professional clippers: $150-$300
- ✅ Trimmers and edgers: $50-$100
- ✅ Professional scissors: $50-$150
- ✅ Combs, brushes, accessories: $30-$50
- ✅ Tool case: $30-$50
- ✅ Work clothing (barber smocks, shoes): $100-$150
- **Total: $500-$800**

**How to get JRI tool kit:**
1. Enroll in JRI program
2. Get hired by apprenticeship sponsor shop
3. Meet with JRI case manager
4. Request tool kit funding
5. Case manager approves purchase
6. Buy tools from approved vendors
7. Submit receipts to JRI
8. Get reimbursed or direct payment

**JRI wants you to succeed, so they provide the tools you need.**

---

### The Bottom Line: Tools and Equipment

**What the sponsor (shop) provides:**
- ✅ All basic tools and equipment (required by State Board)
- ✅ All products and supplies
- ✅ Barber chair and station
- ✅ Everything you need to complete apprenticeship

**What you may choose to buy (optional):**
- ✅ Your own personal clippers, scissors, tools
- ✅ Typically $300-$1,200 over 17 months
- ✅ Allows you to practice at home and own your kit

**Funding options for tools:**
- ✅ WIOA may cover basic kit (up to $500)
- ✅ JRI covers complete kit (up to $800)
- ✅ Some shops provide tool allowance
- ✅ Payment plans available

**You do NOT need to buy tools to start or complete apprenticeship. Shop provides everything required.**

**Buying your own tools is optional and typically happens after month 6+ when you know what you like and can afford it.**

---

---

## Your Journey: What It Really Looks Like (Based on Real Apprentice Experiences)

### Month 1-2: "I'm Actually Doing This"

**Day 1 - Monday, 9:00 AM**
You walk into the shop. Your stomach is in knots. You meet your mentor—a licensed barber with 15 years of experience. He shows you around. The smell of aftershave and clippers fills the air. You watch him work on his first client of the day. Every movement is precise. You think, "I'll never be that good."

**Week 1**
You're the helper. You sweep hair. You sanitize stations. You watch every cut. You learn the shop's rhythm—the busy times, the slow times, the regulars who come in every Saturday. You're earning $10/hour for every hour you're there. Your first paycheck: $400 for 40 hours. It's not much, but it's yours.

**Week 2**
Your mentor hands you clippers. "Practice on this mannequin," he says. You spend hours working on fades. Your hands cramp. Your back hurts. But you're starting to understand the angles, the pressure, the technique.

**Week 4**
A regular customer, Mr. Johnson, comes in. He's been coming to this shop for 20 years. He watches you practice. "You're gonna be good at this, young man," he says. You believe him.

**Online Theory (Week 1-8):**
You complete 2-3 hours of online coursework each week. Sanitation protocols. Skin anatomy. Barbering history. Indiana licensing laws. It's dry, but you need it to pass your state exam.

### Month 3-6: "Someone Asked for Me"

**Month 3 - First Real Client**
Your mentor says, "You're ready." A walk-in customer needs a simple taper. Your hands shake as you pick up the clippers. Your mentor stands right behind you. "Start with the guard. Slow and steady." You make your first pass. It's not perfect, but it's not terrible. Twenty minutes later, you're done. The customer looks in the mirror. He smiles. He tips you $5. You feel like you just won the lottery.

**Month 4**
You're doing 2-3 cuts per day now. Simple tapers, basic fades. Your mentor still supervises every cut. You're earning commissions—$3-5 per cut. Your paychecks are growing: $400 base + $60-80 in commissions = $460-480/week.

**Month 6 - The Turning Point**
A customer walks in on a Saturday morning. He looks around. "Is Marcus here?" he asks. Your heart stops. Someone asked for you by name. You realize you're building something real. You've got 5-6 regulars now. Guys who trust you. Guys who come back.

**Online Theory (Month 3-6):**
You're learning business skills now. How to price services. How to build clientele. How to handle difficult customers. You complete another 12 hours of coursework.

### Month 7-12: "I've Got Regulars"

**Month 9 - Independence**
You've got 12-15 regular clients now. You're doing fades, tapers, beard work, hot towel shaves. Your mentor doesn't supervise every cut anymore. He checks in, gives feedback, but you're working independently most of the time. You're earning $12-15/hour with commissions and tips.

**Month 10 - Saturday Rush**
Saturday morning, 9:00 AM. You've got five appointments booked. All regulars. All guys who specifically requested you. You're in the zone. Clippers humming. Conversation flowing. Tips adding up. By noon, you've made $120 in commissions and tips alone.

**Month 12 - Halfway There**
You've completed 1,000 hours. Halfway to your license. You're making $600-700/week now. You've got 20+ regular clients. You're starting to think about what comes next—rent a chair? Stay with the shop? Open your own place someday?

**Online Theory (Month 7-12):**
You're studying for your state exam now. Practice tests. Sanitation protocols. Indiana barbering laws. You've completed 72 of your 144 required theory hours.

### Month 13-17: "I'm Ready"

**Month 15 - Professional Level**
You're working at near-professional level now. You've got 25-30 regular clients. You're booked solid most days. You're earning $700-900/week. You're preparing for your state board exam. You're nervous, but you know you've got this.

**Month 16 - State Board Exam Prep**
You complete your final theory hours. You practice your practical exam skills—taper, fade, shave, sanitation. Your mentor quizzes you on Indiana barbering laws. You schedule your exam with the Indiana State Board of Barber Examiners.

**Month 17 - Exam Day**
You arrive at the testing center in Indianapolis. Written exam first—100 questions on theory, sanitation, laws. You finish in 45 minutes. Then the practical exam—demonstrate a taper, fade, and shave on a mannequin. The examiner watches every move. Two weeks later, you get the letter: **PASSED**.

**License Day**
You pay your $45 licensing fee to the Indiana Professional Licensing Agency. You're now a **Registered Barber in Indiana**. Your regulars congratulate you. Your mentor shakes your hand. "I'm proud of you," he says.

You decide to rent your own chair at the shop—$250/week. You keep 100% of your earnings after rent. You're in control of your future now.

**Throughout:** You complete 144 hours of technical instruction and get mentored by licensed barbers every single day. You're never alone in this.

---

## What You'll Master

✂️ **Cutting Skills:** Fades, tapers, lineups, beard work, hot towel shaves  
🧼 **Sanitation:** Infection control and safety protocols  
💬 **Client Relations:** Consultation, communication, building loyalty  
💼 **Business:** Shop operations, pricing, customer retention  

---

## After You Graduate

**Pass your state exam** → **Get your license** ($45 fee) → **Choose your path:**

🪑 **Rent a chair** ($100-$300/week) and be your own boss  
🏢 **Work for a shop** with steady income and benefits  
🏪 **Open your own shop** and build a team  

**Earning potential:** $35k-$65k/year. Top barbers earn $75k-$100k+.

---

## Real Talk: The Challenges

**"My feet hurt for the first month."** - Jamal, graduate  
You'll be on your feet 8+ hours a day. Your back will ache. Bring good shoes. It gets easier.

**"The first few months were slow."** - Sarah, current apprentice  
You won't have many clients at first. That's normal. By month 6, you'll have regulars. By graduation, you'll have a full book.

**"I had to balance work and coursework."** - DeAndre, graduate  
You'll work full-time at the shop AND complete 144 hours of technical instruction. It's demanding. But your employer knows you're learning, and we provide support.

**"Not every shop had openings."** - Tasha, graduate  
This program is new. Only federally approved shops can hire apprentices. Slots are competitive. But we're adding more shops every month.

**"It took longer than barber school."** - Marcus, graduate  
Yes, 2,000 hours vs. 1,500 hours. That's about 5 extra months. But you're getting paid for every single hour. Traditional students pay $25,000 and earn nothing. You earn $20,000+ and pay nothing.

---

## Who This Is For

👨‍👩‍👧 Parents who need to earn while they learn  
🔄 Career changers looking for a fresh start  
🎓 Young adults who don't want college debt  
✊ Justice-involved individuals seeking opportunity  
💪 Anyone who's good with people and wants to work with their hands  

---

## How to Get Started

**Step 1:** Apply below. Tell us why you want to become a barber.

**Step 2:** Create your free Indiana Career Connect account at [IndianaCareerConnect.com](https://www.indianacareerconnect.com).

**Step 3:** Schedule an appointment with a career counselor. They'll check your eligibility for WIOA, WRG, or JRI funding.

**Step 4:** We'll connect you with participating barbershops for interviews.

**Step 5:** Once hired, your employer and funding are finalized, you start earning and learning.

**Timeline:** 4-8 weeks from application to first day.

---

## Frequently Asked Questions

### Can I transfer hours from barber school to the apprenticeship?

**Yes, but with limitations set by Indiana State Board of Barber Examiners.**

If you've already completed some hours at a traditional barber school, you may be able to transfer those hours toward your 2,000-hour apprenticeship requirement.

---

## Exact Transfer Process: Step-by-Step

### Step 1: Gather Your Documentation

**You'll need:**
- Official transcripts from your barber school (sealed envelope or electronic)
- Proof of hours completed (hour logs, attendance records)
- Course completion certificates (if applicable)
- Photo ID
- Social Security card

**Request transcripts from your school:**
- Call your previous barber school's registrar office
- Request "official transcripts for licensure transfer"
- Ask for detailed hour breakdown (theory vs. practical)
- Cost: Usually $10-25 per transcript
- Processing time: 1-2 weeks

---

### Step 2: Complete Indiana Transfer Application

**Download or request:**
- "Application for Transfer of Hours" from Indiana State Board
- Available at: [in.gov/pla/professions/barber-board](https://www.in.gov/pla/professions/barber-board/)
- Or call: (317) 234-3040 to request by mail

**Fill out completely:**
- Personal information (name, SSN, address, phone)
- Previous school information (name, location, dates attended)
- Hours completed (theory and practical breakdown)
- Reason for transfer
- Signature and date

---

### Step 3: Submit Everything to Indiana State Board

**Mail to:**
Indiana Professional Licensing Agency  
Attn: Board of Barber Examiners  
402 W. Washington St., Room W072  
Indianapolis, IN 46204

**Or submit in person:**
Same address, Monday-Friday, 8:00 AM - 4:30 PM

**Include:**
- Completed transfer application
- Official transcripts (sealed)
- Copy of photo ID
- Check or money order for $25 evaluation fee (payable to "Indiana Professional Licensing Agency")

**Do NOT send:**
- Cash
- Unsealed transcripts (won't be accepted)
- Incomplete applications

---

### Step 4: Wait for Evaluation

**Processing time:** 2-4 weeks (sometimes longer during busy periods)

**What the Board reviews:**
- Is your school state-approved?
- Are your hours documented and verified?
- Are your hours recent (within 3 years)?
- Do your hours meet Indiana standards?

**Possible outcomes:**
1. **Full approval:** All hours transfer
2. **Partial approval:** Some hours transfer (Board will specify which)
3. **Denial:** Hours don't meet Indiana standards

---

### Step 5: Receive Your Evaluation Letter

**The Board will mail you:**
- Official evaluation letter
- Number of hours approved for transfer
- Number of hours still needed
- Instructions for completing remaining hours

**Example evaluation:**
- "You completed 600 hours at XYZ Barber School"
- "Indiana approves 500 hours toward your 2,000-hour requirement"
- "You need 1,500 more hours through registered apprenticeship"
- "You completed 100 theory hours toward your 144-hour RTI requirement"
- "You need 44 more theory hours"

---

### Step 6: Enroll in Apprenticeship for Remaining Hours

**Once approved:**
1. Contact us or your apprenticeship sponsor
2. Provide your evaluation letter
3. Get hired by a participating barbershop
4. Complete remaining hours (1,500 OJT + 44 RTI in example above)
5. Your apprenticeship sponsor tracks and verifies new hours
6. When complete, you're eligible for state exam

---

## State-to-State Transfer Chart: Barber Hours to Indiana

**Indiana requires 2,000 apprenticeship hours OR 1,500 barber school hours for licensure.**

If you completed training in another state and want to transfer to Indiana's apprenticeship program, here's what typically transfers:

| State | Required Hours | Transfer to Indiana Apprenticeship | Notes |
|-------|---------------|-----------------------------------|-------|
| **Illinois** | 1,500 hours | Up to 1,500 hours may transfer | Must be from IL-approved school; Indiana may require additional 500 hours |
| **Ohio** | 1,800 hours | Up to 1,800 hours may transfer | Strong reciprocity; usually full transfer if recent |
| **Michigan** | 1,800 hours | Up to 1,800 hours may transfer | Must verify school approval status |
| **Kentucky** | 1,500 hours | Up to 1,500 hours may transfer | Indiana may require additional 500 hours |
| **Tennessee** | 1,500 hours | Up to 1,500 hours may transfer | Must be from TN-approved school |
| **Wisconsin** | 1,000 hours | Up to 1,000 hours may transfer | Indiana requires 1,000 additional hours minimum |
| **Missouri** | 1,000 hours | Up to 1,000 hours may transfer | Indiana requires 1,000 additional hours minimum |
| **Pennsylvania** | 1,250 hours | Up to 1,250 hours may transfer | Indiana may require additional 750 hours |
| **New York** | 1,000 hours | Up to 1,000 hours may transfer | Must verify school approval; may need 1,000 more hours |
| **California** | 1,500 hours | Up to 1,500 hours may transfer | Must be from CA-approved school |
| **Texas** | 1,500 hours | Up to 1,500 hours may transfer | Strong reciprocity with Indiana |
| **Florida** | 1,200 hours | Up to 1,200 hours may transfer | Indiana may require additional 800 hours |
| **Georgia** | 1,500 hours | Up to 1,500 hours may transfer | Must be from GA-approved school |
| **North Carolina** | 1,528 hours | Up to 1,528 hours may transfer | Usually full transfer if recent |

---

## Important Transfer Rules

### ✅ What Usually Transfers

**From barber schools:**
- Documented practical hours (cutting, shaving, styling)
- Documented theory hours (up to 144 hours toward RTI)
- Hours from state-approved schools
- Hours completed within last 3 years

**From other apprenticeships:**
- Verified OJT hours from registered apprenticeship programs
- Must have documentation from previous sponsor
- Must be from U.S. Department of Labor registered program

### ❌ What Usually Doesn't Transfer

**Hours that won't count:**
- Hours older than 3 years (case-by-case basis)
- Hours from unlicensed/unapproved schools
- Incomplete programs without documentation
- "Shadow hours" or observation-only time
- Hours from cosmetology school (different license)
- Unverified work experience at barbershops

---

## Special Cases

### Transferring from Cosmetology School

**Indiana does NOT allow cosmetology hours to transfer to barbering.**
- Cosmetology license ≠ Barber license
- Different skill sets and regulations
- You must complete full barber training (2,000 hours apprenticeship OR 1,500 hours barber school)

### Transferring from Out-of-State Apprenticeship

**If you started an apprenticeship in another state:**
1. Get verification letter from your previous apprenticeship sponsor
2. Must show hours were in registered apprenticeship program
3. Submit to Indiana State Board with transfer application
4. Board evaluates and approves eligible hours
5. Complete remaining hours in Indiana registered apprenticeship

### Military Training

**If you received barber training in the military:**
- Indiana recognizes some military barber training
- Must provide DD-214 and training certificates
- Contact Indiana State Board for evaluation
- May receive partial credit toward hours

---

## Transfer Timeline Summary

| Step | Timeline | Cost |
|------|----------|------|
| Request transcripts from school | 1-2 weeks | $10-25 |
| Complete transfer application | 1-2 hours | Free |
| Submit to Indiana State Board | Same day | $25 fee |
| Board evaluation | 2-4 weeks | Included |
| Receive evaluation letter | By mail | Included |
| Enroll in apprenticeship | 1-2 weeks | Varies |
| **Total time** | **4-8 weeks** | **$35-50** |

---

## Contact Information

**Indiana State Board of Barber Examiners**
- Phone: (317) 234-3040
- Email: pla11@pla.in.gov
- Address: 402 W. Washington St., Room W072, Indianapolis, IN 46204
- Hours: Monday-Friday, 8:00 AM - 4:30 PM EST
- Website: [in.gov/pla/professions/barber-board](https://www.in.gov/pla/professions/barber-board/)

**For transfer questions, ask:**
- "I completed [X] hours at [School Name] in [State]. How many hours will transfer to Indiana's apprenticeship program?"
- "What documentation do I need to submit?"
- "How long will the evaluation take?"

---

**Bottom line:** Most hours from approved barber schools transfer, but you'll likely need to complete additional hours through Indiana's registered apprenticeship to reach the 2,000-hour requirement.

### Can I transfer my apprenticeship hours to barber school?

**Yes.** If you start the apprenticeship and decide to switch to traditional barber school, your hours can transfer. You'll need documentation from your employer and apprenticeship sponsor.

### What if I already have a barber license from another state?

**You can apply for reciprocity (per Indiana Code 25-7-5-8).**

Indiana has reciprocal agreements with most states, but requirements vary.

**Reciprocity requirements:**
- Must hold a current, active barber license from another state
- Must have practiced as a licensed barber for at least 1 year
- Must pass Indiana's written exam on state laws and regulations
- Must submit proof of licensure and work history
- Must pay reciprocity application fee (approximately $100)

**States with full reciprocity (no additional testing):**
- Check with Indiana State Board—list changes periodically
- Most states with similar hour requirements (1,500-2,000 hours) qualify

**States requiring additional testing:**
- Some states may require you to take Indiana's practical exam
- Depends on your state's training standards

**How to apply for reciprocity:**
1. Contact Indiana State Board of Barber Examiners: (317) 234-3040
2. Request reciprocity application packet
3. Submit proof of current license from your state
4. Submit proof of work history (pay stubs, employer letters)
5. Take Indiana laws exam (if required)
6. Pay fees and receive Indiana license

**Processing time:** 4-8 weeks

### Can I work at any barbershop?

**No. You MUST work at a federally approved apprenticeship sponsor shop.**

Not every barbershop can participate in Indiana's registered apprenticeship program. Shops must go through a rigorous approval process with the U.S. Department of Labor and Indiana State Board.

---

## For Barbershops: How to Become a Registered Apprenticeship Program Holder

**Are you a barbershop owner who wants to hire and train apprentices? Here's everything you need to know.**

---

## What Is a Registered Apprenticeship Program Holder?

**A Program Holder (also called Apprenticeship Sponsor) is a barbershop that:**
- Is registered with the U.S. Department of Labor
- Is approved by the Indiana State Board of Barber Examiners
- Meets federal and state standards for apprentice training
- Can legally hire apprentices and count their hours toward licensure
- Takes on legal responsibility for apprentice training and supervision

**Benefits of becoming a Program Holder:**
- Hire and train your own barbers from scratch
- Build loyalty (apprentices often stay long-term)
- Access to funding (WIOA, WRG, JRI pays for apprentice training curriculum)
- Tax credits and incentives for hiring apprentices
- Strengthen your shop's reputation
- Help grow the barbering profession

---

## Requirements to Become a Registered Program Holder

### 1. Business Requirements

**Your barbershop must:**
- ✅ Be a registered business in Indiana (LLC, Corporation, or Sole Proprietorship)
- ✅ Have a valid Indiana business license
- ✅ Have a Federal Tax ID (EIN)
- ✅ Have an active Indiana State Board of Barber Examiners shop license
- ✅ Be in good standing (no violations, fines, or suspensions)
- ✅ Have been operating for at least 1 year (preferred, not always required)

**Insurance requirements:**
- ✅ General liability insurance (minimum $1 million coverage)
- ✅ Workers' compensation insurance (required for employees)
- ✅ Professional liability insurance (recommended)

**Financial requirements:**
- ✅ Ability to pay apprentice wages ($10/hour minimum)
- ✅ Ability to cover apprentice training curriculum costs (unless funded by WIOA/WRG/JRI)
- ✅ Stable business with consistent revenue

---

### 2. Facility Requirements

**Your barbershop must:**
- ✅ Be licensed and approved by Indiana State Board of Barber Examiners
- ✅ Meet all health and safety codes
- ✅ Have proper sanitation equipment (autoclaves, disinfectants, etc.)
- ✅ Have adequate workspace for apprentice training (at least one dedicated station)
- ✅ Have proper ventilation, lighting, and plumbing
- ✅ Pass facility inspection by State Board

**Equipment requirements:**
- ✅ Professional barber chairs
- ✅ Mirrors and workstations
- ✅ Clippers, trimmers, scissors, razors
- ✅ Sanitation and sterilization equipment
- ✅ Capes, towels, and supplies
- ✅ Mannequins for practice (recommended)

---

### 3. Staffing Requirements

**You must have:**
- ✅ At least one licensed barber with 3+ years of professional experience
- ✅ Barber must serve as apprentice mentor/supervisor
- ✅ Mentor must complete U.S. Department of Labor apprenticeship supervisor training (8-16 hours)
- ✅ Mentor must be available to supervise apprentice during all working hours
- ✅ Mentor must have clean disciplinary record with State Board

**Mentor responsibilities:**
- Provide hands-on training and supervision
- Track apprentice hours and progress
- Sign off on apprentice work
- Complete monthly progress reports
- Ensure apprentice meets all training standards

**Mentor-to-apprentice ratio:**
- Maximum 1 apprentice per licensed barber
- Example: If you have 3 licensed barbers, you can have up to 3 apprentices

---

### 4. Training Program Requirements

**You must develop and submit:**
- ✅ Written training plan outlining 2,000-hour curriculum
- ✅ Skills progression schedule (what apprentice learns each month)
- ✅ Competency standards (how you measure apprentice progress)
- ✅ Safety and sanitation protocols
- ✅ Related Technical Instruction (RTI) plan (144 hours)
- ✅ Evaluation and testing procedures

**Training must cover:**
- Haircutting techniques (fades, tapers, lineups, etc.)
- Shaving and beard work
- Sanitation and infection control
- Client consultation and communication
- Shop operations and business skills
- Indiana barbering laws and regulations

---

## Step-by-Step: How to Register as a Program Holder

### Step 1: Prepare Your Documentation

**Gather these documents:**
- Business license
- Federal Tax ID (EIN)
- Indiana State Board barbershop license
- Insurance certificates (liability, workers' comp)
- Mentor barber license(s) and experience verification
- Facility photos and floor plan
- Training curriculum outline

**Estimated time:** 1-2 weeks

---

### Step 2: Complete Apprenticeship Sponsor Training

**Required training:**
- U.S. Department of Labor Apprenticeship Sponsor Training (8-16 hours)
- Available online or in-person
- Covers: federal apprenticeship standards, record-keeping, legal requirements
- Cost: $200-500

**Your mentor barber must also complete:**
- Apprenticeship Supervisor Training (8 hours)
- Covers: mentoring techniques, progress tracking, safety

**Estimated time:** 1-2 weeks

---

### Step 3: Register with U.S. Department of Labor

**Submit application to:**
- U.S. Department of Labor, Office of Apprenticeship
- Or through your State Apprenticeship Agency (Indiana Department of Workforce Development)

**Application includes:**
- Apprenticeship program standards
- Training curriculum and schedule
- Mentor qualifications
- Wage progression plan
- Commitment to 2,000-hour program
- Equal opportunity pledge

**Application fee:** $0 (FREE - no cost to register)

**Processing time:** 4-8 weeks

**Contact:**
- U.S. Department of Labor, Office of Apprenticeship
- Phone: (317) 226-7001 (Indiana office)
- Website: [apprenticeship.gov](https://www.apprenticeship.gov)

---

### Step 4: Get Indiana State Board Approval

**Submit application to:**
- Indiana State Board of Barber Examiners
- Indiana Professional Licensing Agency
- 402 W. Washington St., Room W072, Indianapolis, IN 46204
- Phone: (317) 234-3040

**Application includes:**
- Proof of U.S. DOL registration
- Barbershop license
- Mentor barber credentials
- Facility inspection request
- Training program outline

**Application fee:** $250-500

**Processing time:** 2-4 weeks

**Facility inspection:**
- State Board inspector visits your shop
- Checks facility, equipment, sanitation
- Verifies mentor qualifications
- Reviews training program

---

### Step 5: Set Up Record-Keeping Systems

**You must track:**
- Apprentice hours (daily/weekly logs)
- Skills progression (competency checklists)
- RTI completion (theory coursework)
- Wages paid
- Incidents or issues

**Required systems:**
- Time clock or digital tracking system
- Monthly progress report forms
- Hour verification forms (signed by mentor and apprentice)
- RTI completion certificates

**We can help you set up these systems.**

---

### Step 6: Get Listed as Approved Program Holder

**Once approved:**
- You're listed on U.S. DOL Apprenticeship Finder
- You're listed on Indiana Career Connect
- We list you as an approved shop
- You can start hiring apprentices

**Estimated time:** 3-6 months total from start to approval

---

## Your Responsibilities as a Registered Program Holder

### 1. Training and Supervision

**You must:**
- ✅ Provide 2,000 hours of on-the-job training
- ✅ Ensure apprentice completes 144 hours of RTI
- ✅ Supervise all apprentice work (licensed barber must be present)
- ✅ Follow your approved training curriculum
- ✅ Provide progressive skill development (start simple, advance to complex)
- ✅ Ensure apprentice works with real clients (not just mannequins)

**You cannot:**
- ❌ Leave apprentice unsupervised with clients
- ❌ Skip required training components
- ❌ Rush apprentice through program
- ❌ Fail to provide adequate instruction

---

### 2. Record-Keeping and Reporting

**You must:**
- ✅ Track apprentice hours daily/weekly
- ✅ Submit monthly progress reports to U.S. DOL and Indiana State Board
- ✅ Maintain accurate wage records
- ✅ Document skills progression
- ✅ Keep RTI completion records
- ✅ Report any incidents, injuries, or issues
- ✅ Maintain records for 5 years after apprentice completes program

**Monthly reports include:**
- Total hours worked
- Skills learned/practiced
- RTI hours completed
- Wages paid
- Any issues or concerns

**Failure to maintain records can result in:**
- Apprentice hours not counting toward licensure
- Loss of program holder status
- Fines or penalties

---

### 3. Wages and Benefits

**You must:**
- ✅ Pay apprentice at least minimum wage ($7.25/hour federal, higher in some cities)
- ✅ Pay wages on regular schedule (weekly or biweekly)
- ✅ Withhold payroll taxes (federal, state, Social Security, Medicare)
- ✅ Provide workers' compensation coverage
- ✅ Follow all employment laws (overtime, breaks, etc.)
- ✅ Provide W-2 at tax time

**Recommended wage structure:**
- Month 1-6: $10/hour or 40% commission
- Month 7-12: $10/hour or 50% commission
- Month 13-17: $10/hour or 60% commission

**You cannot:**
- ❌ Pay apprentice less than minimum wage
- ❌ Require apprentice to pay booth rent (during apprenticeship)
- ❌ Withhold wages
- ❌ Pay "under the table" without taxes

---

### 4. Safety and Compliance

**You must:**
- ✅ Maintain safe, sanitary work environment
- ✅ Follow OSHA safety standards
- ✅ Follow Indiana State Board sanitation rules
- ✅ Provide safety training (bloodborne pathogens, chemical safety, etc.)
- ✅ Provide personal protective equipment (gloves, masks, etc.)
- ✅ Report workplace injuries
- ✅ Maintain proper insurance coverage

**You must comply with:**
- U.S. Department of Labor apprenticeship standards
- Indiana State Board of Barber Examiners regulations
- OSHA workplace safety rules
- Federal and state employment laws
- Equal opportunity requirements (no discrimination)

---

### 5. Certification and Exam Preparation

**You must:**
- ✅ Ensure apprentice completes all 2,000 hours
- ✅ Ensure apprentice completes all 144 RTI hours
- ✅ Certify apprentice is ready for state exam
- ✅ Provide exam preparation and support
- ✅ Submit completion documentation to Indiana State Board

**When apprentice completes program:**
- You sign completion certificate
- You submit final hour verification to State Board
- Apprentice becomes eligible for state licensing exam

---

### 6. Ongoing Compliance

**You must:**
- ✅ Maintain your barbershop license (renew every 2 years)
- ✅ Maintain your program holder registration (renew annually)
- ✅ Keep insurance current
- ✅ Submit annual reports to U.S. DOL
- ✅ Allow inspections by State Board and U.S. DOL
- ✅ Update training curriculum as needed
- ✅ Maintain mentor qualifications (continuing education)

**Annual renewal fee:** $200-500

---

---

## Current Approved Program Holders in Indiana

**As of 2025, these shops are federally approved:**
- **MDG Salons** (Indianapolis area - multiple locations)
- **Kiss Kiss Bang Bang** (Indianapolis area)
- Additional shops being added regularly

**Want to join them? We can help you through the entire process.**

---

## How We Help Barbershops Become Program Holders

**We provide:**
- ✅ Step-by-step guidance through registration process
- ✅ Help developing training curriculum
- ✅ Assistance with U.S. DOL and State Board applications
- ✅ Record-keeping system setup
- ✅ Connections to funding sources (WIOA, WRG, JRI)
- ✅ Apprentice recruitment and screening
- ✅ Ongoing support and compliance assistance

**Contact us to get started:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- We'll schedule a consultation to discuss your shop's readiness

---

## FAQs for Barbershop Owners

### "Is it worth becoming a program holder?"

**Yes, if you:**
- Want to train barbers your way
- Want loyal, long-term employees
- Can afford to invest in training
- Have experienced mentors on staff
- Want to give back to the profession

**Return on investment:**
- Apprentice costs you $20,000-30,000 over 15-17 months
- After licensing, they generate $50,000-100,000/year in revenue
- If they stay 2-3 years, you recoup your investment many times over

### "How many apprentices can I have?"

**Maximum 1 apprentice per licensed barber.**
- 1 licensed barber = 1 apprentice
- 3 licensed barbers = 3 apprentices

### "What if my apprentice quits?"

**You're not obligated to keep them.**
- Employment is at-will
- If they quit or you terminate them, their hours transfer to their next shop
- You're not liable for their completion

### "What if my apprentice fails the state exam?"

**Not your responsibility.**
- You certify they completed training
- State Board determines if they pass the exam
- If they fail, they can retake it

### "Can I hire apprentices from other states?"

**Yes, but they must:**
- Be eligible to work in the U.S.
- Meet Indiana apprenticeship requirements
- Transfer any previous hours to Indiana

---

## Ready to Become a Registered Program Holder?

**Contact us today to start the process:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

**We'll help you:**
1. Assess your shop's readiness
2. Complete all applications
3. Develop your training curriculum
4. Get approved by U.S. DOL and Indiana State Board
5. Start hiring and training apprentices

**Together, we're building the next generation of barbers in Indiana.**

---

## How You Earn While You Learn: The Complete Money Flow Explained

### Where Does Your Hourly Wage Come From?

**Your employer (the barbershop) pays you directly from their business revenue.**

Here's the complete money flow:

**Step 1: The Shop Earns Money**
- Customers come in and pay for haircuts, shaves, beard trims
- Shop charges: $25-40 per haircut, $15-25 per beard trim, $30-50 per shave
- Money goes into the shop's cash register/payment system
- This is the shop's gross revenue

**Step 2: The Shop Pays Operating Costs**
- Rent for the building ($2,000-5,000/month)
- Utilities (electric, water, internet)
- Products (shampoo, aftershave, towels, capes)
- Equipment (clippers, scissors, chairs, mirrors)
- Insurance (liability, workers' comp)
- Licenses and permits
- Marketing and advertising

**Step 3: The Shop Pays Employee Wages (Including Yours)**
- Licensed barbers: $15-25/hour or commission
- Apprentices (you): $10/hour + commissions
- Receptionists, cleaners, etc.
- Payroll taxes (employer's share of Social Security, Medicare, unemployment)

**Step 4: The Shop Keeps Profit**
- Whatever's left after all expenses
- Typically 15-30% profit margin for successful shops

---

## Scenario 1: Employee Model (Most Common) - DETAILED BREAKDOWN

### How It Works: You're a W-2 Employee

**Your employment status:**
- You're hired as a regular employee (W-2)
- You clock in/out using time clock or app
- You receive biweekly or weekly paychecks
- Taxes are withheld (federal, state, Social Security, Medicare)
- You receive a W-2 form at tax time

**Your hourly wage:**
- **Base rate:** $10/hour guaranteed
- **Paid by:** The barbershop (from their revenue)
- **Paid regardless of:** How many clients you serve, how busy the shop is, whether you're cutting or observing

---

### Month 1-2: Observation Phase

**What you're doing:**
- Watching licensed barbers work
- Sweeping hair, sanitizing stations
- Practicing on mannequins
- Learning shop operations
- Shadowing your mentor

**What you earn:**
- **Hourly wage:** $10/hour × 40 hours/week = **$400/week**
- **Commissions:** $0 (you're not serving clients yet)
- **Tips:** $0 (you're not serving clients yet)
- **Total:** **$400/week = $1,600/month**

**Where the money comes from:**
- Shop pays you from their general revenue
- You're an investment for them—they're training you
- They know you'll generate revenue later

**Do you charge customers?**
- ❌ No, you're not serving customers yet
- You're observing and practicing

**Do you pay booth rent?**
- ❌ No, you're an employee, not a renter

---

### Month 3-6: First Clients Phase

**What you're doing:**
- Taking simple haircuts under supervision
- Your mentor stands right behind you
- You're working on walk-in clients or your mentor's overflow
- Building basic skills

**What you earn:**
- **Hourly wage:** $10/hour × 40 hours/week = **$400/week**
- **Commissions:** $3-5 per cut × 10-15 cuts/week = **$30-75/week**
- **Tips:** $3-5 per cut × 10-15 cuts/week = **$30-75/week**
- **Total:** **$460-550/week = $1,840-2,200/month**

**Where the money comes from:**

**Example: Customer pays $25 for a haircut**

1. **Customer pays shop:** $25 (cash, card, or app)
2. **Shop keeps:** $15 (60% to cover costs and profit)
3. **You earn commission:** $10 (40% commission)
4. **Customer tips you:** $5 (goes directly to you)
5. **Your total from this cut:** $10 commission + $5 tip = $15

**Plus your hourly wage continues:**
- You worked 1 hour doing that cut
- You also earn $10/hour base wage
- **Total for that hour:** $10 base + $10 commission + $5 tip = **$25**

**Do you charge customers?**
- ❌ No, the SHOP charges customers
- Customer pays the shop's prices ($25-40 per cut)
- Shop pays you commission (40-50% of the service price)

**Do you pay booth rent?**
- ❌ No, you're an employee
- The shop pays rent for the building
- You work in their space as an employee

---

### Month 7-12: Building Clientele Phase

**What you're doing:**
- Taking more complex cuts (fades, tapers, beard work)
- Working more independently (mentor checks in periodically)
- Building regular clients who request you
- Taking 20-30 clients per week

**What you earn:**
- **Hourly wage:** $10/hour × 40 hours/week = **$400/week**
- **Commissions:** $10-12 per cut × 25 cuts/week = **$250-300/week**
- **Tips:** $5-7 per cut × 25 cuts/week = **$125-175/week**
- **Total:** **$775-875/week = $3,100-3,500/month**

**Where the money comes from:**

**Example: Busy Saturday**

You work 8 hours and do 8 haircuts:

**Haircut 1:** Customer pays shop $30
- Shop keeps: $18
- You earn commission: $12 (40%)
- Customer tips you: $6
- Your earnings: $12 + $6 = $18

**Haircut 2:** Customer pays shop $35 (fade)
- Shop keeps: $21
- You earn commission: $14 (40%)
- Customer tips you: $7
- Your earnings: $14 + $7 = $21

**Repeat for 8 cuts...**

**Your Saturday earnings:**
- Base wage: 8 hours × $10 = $80
- Commissions: 8 cuts × $12 avg = $96
- Tips: 8 cuts × $6 avg = $48
- **Total for the day: $224**

**Do you charge customers?**
- ❌ No, the SHOP charges customers
- Shop sets the prices
- Shop collects the money
- Shop pays you commission

**Do you pay booth rent?**
- ❌ No, you're still an employee
- Shop pays all facility costs
- You just show up and work

---

### Month 13-17: Near-Professional Phase

**What you're doing:**
- Working at professional level
- 25-35 clients per week
- Regular clients who book you specifically
- Doing all services (cuts, fades, shaves, beard work)

**What you earn:**
- **Hourly wage:** $10/hour × 40 hours/week = **$400/week**
- **Commissions:** $12-15 per service × 30 services/week = **$360-450/week**
- **Tips:** $6-8 per service × 30 services/week = **$180-240/week**
- **Total:** **$940-1,090/week = $3,760-4,360/month**

**Where the money comes from:**

**Example: Full Week**

**Monday-Friday (5 days):**
- 4 clients per day × 5 days = 20 clients
- Average service price: $30
- Your commission: $12 per cut (40%)
- Average tip: $6 per cut
- **Earnings:** (20 × $12) + (20 × $6) = $240 + $120 = $360

**Saturday (busy day):**
- 8 clients
- Average service price: $35
- Your commission: $14 per cut (40%)
- Average tip: $7 per cut
- **Earnings:** (8 × $14) + (8 × $7) = $112 + $56 = $168

**Sunday (off or short day):**
- 2 clients
- **Earnings:** (2 × $12) + (2 × $6) = $24 + $12 = $36

**Weekly totals:**
- Base wage: 40 hours × $10 = $400
- Commissions: $360 + $168 + $36 = $564
- Tips: Already included above
- **Total week: $400 + $564 = $964**

**Do you charge customers?**
- ❌ No, the SHOP still charges customers
- You're still an employee
- Shop collects all money
- Shop pays you commission

**Do you pay booth rent?**
- ❌ No, you're still an employee
- Shop pays all costs
- You're on their payroll

---

## The Critical Difference: Employee vs. Booth Renter

### While You're an Apprentice (Employee)

**Money flow:**
1. Customer pays shop → $30
2. Shop keeps → $18 (60%)
3. Shop pays you commission → $12 (40%)
4. Customer tips you directly → $5
5. Shop pays your base wage → $10/hour
6. **You receive:** Base wage + commission + tips

**You pay:**
- ❌ Nothing to the shop
- ❌ No booth rent
- ❌ No product costs
- ❌ No equipment costs
- ❌ No facility costs

**Shop pays:**
- ✅ Your wages ($10/hour)
- ✅ Your commissions (40-50% of services)
- ✅ Rent for the building
- ✅ All products and supplies
- ✅ All equipment
- ✅ Utilities, insurance, licenses

---

### After You're Licensed (If You Rent a Booth)

**Money flow:**
1. Customer pays YOU directly → $30
2. You keep → $30 (100%)
3. Customer tips you → $5
4. You pay shop booth rent → $250/week
5. **You receive:** All service money + tips - booth rent

**You pay:**
- ✅ Booth rent ($100-300/week)
- ✅ Your own products (shampoo, aftershave, etc.)
- ✅ Your own equipment (clippers, scissors, etc.)
- ✅ Your own taxes (self-employed, 1099)
- ✅ Your own insurance

**Shop provides:**
- ✅ The physical space (chair, mirror, station)
- ✅ Utilities (electric, water, internet)
- ✅ Waiting area for clients
- ✅ Receptionist (sometimes)

**You're self-employed:**
- You set your own prices
- You keep 100% of revenue (after booth rent)
- You handle your own taxes
- You're your own boss

---

## Why Shops Hire Apprentices (Even Though It Costs Them Money)

**Short-term cost:**
- Shop pays you $10/hour even when you're not generating revenue
- Shop invests time training you
- Shop provides tools and products

**Long-term benefit:**
- Once you're skilled (month 6+), you generate revenue for the shop
- You bring in clients who become shop regulars
- You may stay as employee after licensing (shop keeps earning from your work)
- You help the shop grow and serve more customers

**Example: Month 12**
- You do 25 cuts/week at $30 average = $750/week revenue
- Shop pays you: $400 base + $300 commission = $700
- Shop keeps: $450 (60% of service revenue)
- Shop's net: $450 revenue - $700 wages = -$250 loss

**Wait, the shop loses money?**

Not quite. The shop also benefits from:
- Your clients buying additional services (beard trims, shaves)
- Your clients becoming shop regulars (lifetime value)
- Your clients referring friends
- Shop building reputation as training facility

**By month 15-17:**
- You're doing 30+ cuts/week at $35 average = $1,050/week revenue
- Shop pays you: $400 base + $420 commission = $820
- Shop keeps: $630 (60% of service revenue)
- Shop's net: $630 revenue - $820 wages = -$190 loss

**Still losing money?**

Yes, but:
- Shop is investing in you
- After you're licensed, you may stay as employee (shop profits from your work)
- Or you rent a booth (shop earns $250/week rent from you)
- Or you leave, but shop has helped the industry and built reputation

---

## The Bottom Line: Crystal Clear

**During your 2,000-hour apprenticeship:**

✅ **You ARE:**
- A W-2 employee
- Paid $10/hour base wage by the shop
- Paid 40-50% commission on services you perform
- Keeping 100% of tips
- Covered by shop's insurance and workers' comp
- Using shop's tools, products, and space for free

❌ **You are NOT:**
- Paying booth rent
- Paying for products or tools
- Charging customers directly (shop charges them)
- Self-employed
- Responsible for facility costs

**The shop pays you. You don't pay the shop. Period.**

---

### Scenario 2: Commission-Only Model (Less Common for Apprentices)

**How it works:**
- You're still an employee, but paid primarily through commissions
- Minimum wage guaranteed by law
- You earn percentage of every service you perform

**What you earn:**
- **Commission rate:** 50-60% of service price
- **Guaranteed minimum:** At least minimum wage ($7.25/hour federal, higher in some cities)
- **Tips:** 100% of tips go to you

**Example:**
- Haircut costs $25
- You earn 50% = $12.50 per cut
- Do 4 cuts in an hour = $50/hour
- Plus tips (typically $5-10 per cut)

**Early months:**
- You won't have many clients yet
- Shop guarantees minimum wage
- As you build clientele, commissions grow

**You do NOT pay:**
- ❌ Booth rent
- ❌ Chair rental
- ❌ Product costs (shop provides)
- ❌ Equipment costs (shop provides)

---

### Scenario 3: Hybrid Model (Some Shops)

**How it works:**
- Lower base hourly rate ($7-8/hour)
- Higher commission rate (50-60%)
- Combines stability of hourly with upside of commission

**What you earn:**
- **Base wage:** $8/hour (40 hours = $320/week)
- **Commissions:** 50-60% of services
- **Tips:** 100% of tips

**Example weekly earnings:**
- **Month 1-2:** $320/week (mostly base pay)
- **Month 3-6:** $400-500/week (base + growing commissions)
- **Month 7-12:** $550-700/week (base + regular commissions + tips)
- **Month 13-17:** $700-900/week (base + strong commissions + tips)

**You do NOT pay:**
- ❌ Booth rent
- ❌ Chair rental
- ❌ Product costs (shop provides)
- ❌ Equipment costs (shop provides)

---

## What About Booth Rent? (After You're Licensed)

**During your apprenticeship: You do NOT pay booth rent.**

You're an employee learning a trade. The shop pays you. You don't pay them.

**After you get your license:**

Then you have options:

### Option A: Stay as Employee
- Continue earning hourly + commissions
- Shop provides everything
- Steady income, less risk
- Typical earnings: $35,000-50,000/year

### Option B: Rent a Chair/Booth
- Pay weekly rent ($100-300/week)
- Keep 100% of your earnings after rent
- You're self-employed (1099)
- You buy your own products and tools
- You set your own prices
- Typical earnings: $50,000-75,000/year (if you have strong clientele)

### Option C: Open Your Own Shop
- Highest earning potential
- Most responsibility and risk
- Need business license, insurance, startup capital
- Typical earnings: $75,000-150,000+/year (if successful)

**Most apprentices stay as employees for 1-2 years after licensing to build their clientele before renting a chair.**

---

## Common Questions: Let's Clear Up Every Confusion

### "Do I cut hair for free?"

**No. You NEVER cut hair for free.**

Every single haircut you do, you get paid for. Here's exactly how:

**Month 1-2 (Observation phase):**
- You're NOT cutting hair yet
- You're watching, learning, practicing on mannequins
- You're earning $10/hour just to observe and learn
- **You're getting paid to learn, not cutting for free**

**Month 3+ (Once you start cutting):**
- Customer pays the shop $30 for a haircut
- Shop pays you $12 commission (40% of $30)
- Customer tips you $5 directly
- You also earn your $10/hour base wage
- **Total for that cut: $10 hourly + $12 commission + $5 tip = $27**
- **You're getting paid THREE ways for every cut**

**You NEVER work for free. Every hour, every cut, you're earning money.**

---

### "Can I get my own clients and charge them directly?"

**No. Not during your apprenticeship.**

Here's why and how it works:

**During apprenticeship (15-17 months):**
- ❌ You CANNOT charge customers directly
- ❌ You CANNOT take clients outside the shop
- ❌ You CANNOT set your own prices
- ✅ The SHOP charges customers (their prices, their system)
- ✅ The SHOP pays you commission (40-50% of the service price)
- ✅ You keep 100% of tips

**Why this rule exists:**
- You're not licensed yet (illegal to charge for services without a license)
- You're working under the shop's license and insurance
- The shop is responsible for quality and customer satisfaction
- The shop is training you and taking on the risk

**After you get your license:**
- Then you can choose to rent a booth and charge customers directly
- Or stay as employee and continue earning commission
- Or open your own shop

---

### "How does the money breakdown work exactly?"

**Let me show you with a real example:**

**Customer walks in and wants a fade - $35**

**Step 1: Customer pays the shop**
- Customer pays $35 to the shop (cash, card, or app)
- Money goes into shop's register/system

**Step 2: Shop keeps their portion**
- Shop keeps 60% = $21
- This covers: rent, utilities, products, insurance, profit

**Step 3: Shop pays you commission**
- You earn 40% = $14 commission
- This goes on your paycheck (paid biweekly or weekly)

**Step 4: Customer tips you**
- Customer gives you $7 tip (cash or added to card)
- You keep 100% of tips

**Step 5: You also earn hourly wage**
- That cut took you 30 minutes
- You earn $10/hour = $5 for that 30 minutes

**Your total earnings from that one $35 fade:**
- Hourly wage: $5
- Commission: $14
- Tip: $7
- **Total: $26 for 30 minutes of work**

**Shop's earnings from that same $35 fade:**
- Revenue: $35
- Minus your commission: -$14
- Minus your hourly wage: -$5
- **Shop keeps: $16**

**Shop uses that $16 to pay:**
- Rent ($2,000-5,000/month ÷ 160 cuts = $12.50-31.25 per cut)
- Products ($2-3 per cut)
- Utilities ($1-2 per cut)
- Insurance ($1-2 per cut)
- Profit (whatever's left)

---

### "Does the shop HAVE to pay me?"

**Yes. By law.**

**Federal and Indiana labor laws require:**
- You must be paid at least minimum wage ($7.25/hour federal, higher in some cities)
- You must be paid for every hour worked
- You must receive overtime if you work over 40 hours/week
- You must receive a paycheck with taxes withheld
- You must receive a W-2 at tax time

**The shop cannot:**
- ❌ Make you work for free
- ❌ Pay you "under the table" without taxes
- ❌ Withhold your wages
- ❌ Make you pay them to work there (during apprenticeship)

**If a shop tries to make you work for free or pay booth rent during your apprenticeship, that's illegal. Report it immediately.**

---

### "Are there alternative payment options?"

**Yes. Shops can structure apprentice pay in different ways, but you ALWAYS get paid.**

**IMPORTANT: It's usually EITHER hourly OR commission, not both (except in hybrid models).**

---

## Payment Structure Options

### Option 1: Hourly Wage ONLY (Simple, Guaranteed)

**How it works:**
- You earn a fixed hourly rate
- No commission on services
- You keep 100% of tips
- Guaranteed income regardless of how many clients you serve

**Typical rates:**
- $10-12/hour for apprentices
- $12-15/hour for advanced apprentices (month 9+)

**Example weekly earnings:**
- 40 hours × $10/hour = $400/week
- Plus tips: $100-150/week
- **Total: $500-550/week**

**Pros:**
- Predictable income
- Get paid even during slow times
- Get paid while observing and learning
- Simple to understand

**Cons:**
- No upside when you're busy
- Don't earn more for bringing in clients
- Lower earning potential

**Best for:**
- Early apprentices (month 1-6)
- People who want stable, predictable income
- Shops that want simple payroll

---

### Option 2: Commission ONLY (Higher Earning Potential)

**How it works:**
- You earn a percentage of every service you perform
- No base hourly wage
- You keep 100% of tips
- **BUT: Federal law requires minimum wage guarantee**

**Typical commission rates:**
- 50-60% of service price for apprentices
- 60-70% for advanced apprentices (month 9+)

**Minimum wage protection:**
- If your commission doesn't equal minimum wage ($7.25/hour federal), shop must pay the difference
- Example: You work 40 hours but only earn $200 in commission
- Minimum wage = 40 hours × $7.25 = $290
- Shop must pay you an additional $90 to reach minimum wage

**Example weekly earnings:**

**Month 3-6 (10-15 cuts/week):**
- 12 cuts × $30 average = $360 revenue
- Your commission (50%) = $180
- Plus tips: $60
- **Total: $240/week**
- **BUT: Minimum wage = $290, so shop pays you $290 + $60 tips = $350/week**

**Month 7-12 (20-25 cuts/week):**
- 22 cuts × $30 average = $660 revenue
- Your commission (50%) = $330
- Plus tips: $110
- **Total: $440/week** (above minimum wage, so you keep it all)

**Month 13-17 (30-35 cuts/week):**
- 32 cuts × $32 average = $1,024 revenue
- Your commission (60%) = $614
- Plus tips: $160
- **Total: $774/week**

**Pros:**
- Higher earning potential
- Earn more when you're busy
- Rewarded for bringing in clients
- Incentive to improve skills

**Cons:**
- Income varies week to week
- Slow weeks mean lower pay (but minimum wage protected)
- More pressure to perform
- Early months are tough (few clients)

**Best for:**
- Advanced apprentices (month 6+)
- People who are motivated by performance pay
- Apprentices with strong clientele

---

### Option 3: Hybrid Model (Base + Commission)

**How it works:**
- Lower base hourly wage
- Plus commission on services
- You keep 100% of tips
- Combines stability with upside

**Typical structure:**
- $7-8/hour base wage
- Plus 40-50% commission on services
- Plus 100% of tips

**Example weekly earnings:**

**Month 3-6:**
- Base: 40 hours × $8/hour = $320
- Commission: 12 cuts × $30 × 40% = $144
- Tips: $60
- **Total: $524/week**

**Month 7-12:**
- Base: 40 hours × $8/hour = $320
- Commission: 22 cuts × $30 × 45% = $297
- Tips: $110
- **Total: $727/week**

**Month 13-17:**
- Base: 40 hours × $8/hour = $320
- Commission: 32 cuts × $32 × 50% = $512
- Tips: $160
- **Total: $992/week**

**Pros:**
- Guaranteed base income
- Upside from commission
- Less risky than commission-only
- Balanced approach

**Cons:**
- More complex to calculate
- Lower base than hourly-only
- Lower commission than commission-only

**Best for:**
- Most apprentices (month 3+)
- People who want balance
- Shops that want to incentivize performance while providing stability

---

### Option 4: Flat Weekly Salary (Very Rare)

**How it works:**
- Fixed amount per week
- No hourly tracking
- No commission
- You keep 100% of tips

**Typical rates:**
- $400-600/week for apprentices

**Example weekly earnings:**
- Salary: $500/week
- Tips: $100-150/week
- **Total: $600-650/week**

**Pros:**
- Extremely predictable
- No tracking hours or services
- Simple

**Cons:**
- No upside for performance
- Rare to find
- May not comply with overtime laws if you work over 40 hours

**Best for:**
- Very rare arrangement
- Usually only for experienced apprentices

---

### Option 5: Booth Rent Model for Apprentices (VERY RARE - Advanced Only)

**IMPORTANT: This is NOT standard for apprentices. Only available in special circumstances for advanced apprentices who have strong clientele.**

**How it works:**
- You pay the shop weekly booth rent ($100-200/week for apprentices, less than licensed barbers)
- You keep 100% of what customers pay you
- You set your own prices (within shop guidelines)
- You keep 100% of tips
- You're still an employee (W-2), not self-employed yet

**Requirements to qualify:**
- Must have completed at least 1,500 hours (500 or fewer hours remaining)
- OR must be month 12+ in your apprenticeship
- Must have 20+ regular clients
- Must be working at near-professional level
- Must have shop owner approval
- Must still complete your remaining hours and 144 theory hours
- Must still work under supervision (you're not licensed yet)

---

## Special Case: Transfer Students with Advanced Hours

**If you transferred hours from barber school and only have 500 hours left:**

**Example: You completed 1,500 hours at barber school, need 500 more hours**

**You may qualify for booth rent immediately IF:**
- ✅ You have professional-level skills (verified by shop owner)
- ✅ You have 20+ regular clients or can build them quickly
- ✅ You're working at near-licensed level
- ✅ Shop owner approves
- ✅ You understand the financial risk

**Why this makes sense:**
- You've already completed 75% of your training
- You have professional skills
- You're only 3-4 months from licensing
- Booth rent lets you practice running your own business
- You can earn more than commission if you have strong clientele

**Example timeline:**
- **Week 1-4:** Start on commission (50-60%) to build clientele at new shop
- **Week 5+:** Switch to booth rent once you have 15-20 regular clients
- **Month 3-4:** Complete your 500 hours, take state exam, get licensed
- **After licensing:** Continue booth rent or negotiate better terms

**Financial comparison for transfer student with 500 hours left:**

**Commission model (50%):**
- 25 cuts/week × $30 = $750 revenue
- Your commission: $375
- Your tips: $150
- **Total: $525/week × 16 weeks = $8,400**

**Booth rent model:**
- 25 cuts/week × $30 = $750 revenue
- Minus rent: -$150
- Your tips: $150
- **Total: $750/week × 16 weeks = $12,000**

**Booth rent earns $3,600 more over your remaining 500 hours (16 weeks).**

**BUT: Only if you maintain 25+ clients per week. If you're new to the shop and don't have clients yet, commission is safer.**

---

## Transfer Student Scenarios: Which Payment Model?

### Scenario 1: Transfer with 1,500 hours completed, 500 hours remaining

**Skill level:** Professional (you've completed barber school)  
**Clientele:** None at new shop (you just transferred)  
**Time remaining:** 3-4 months

**Recommended payment model:**
- **Week 1-4:** Commission (50-60%) while you build clientele
- **Week 5-16:** Booth rent ($150/week) once you have 20+ clients

**Why:**
- You have the skills, but not the clients yet
- Commission gives you safety net while building clientele
- Switch to booth rent once you're busy

---

### Scenario 2: Transfer with 1,000 hours completed, 1,000 hours remaining

**Skill level:** Intermediate (halfway through training)  
**Clientele:** None at new shop  
**Time remaining:** 6-8 months

**Recommended payment model:**
- **Month 1-3:** Hourly ($10/hour) or commission (40-50%)
- **Month 4-6:** Commission (50-60%)
- **Month 7-8:** Booth rent ($150/week) if you have 25+ clients

**Why:**
- You're still developing skills
- Need time to build clientele
- Booth rent only makes sense in final months

---

### Scenario 3: Transfer with 500 hours completed, 1,500 hours remaining

**Skill level:** Beginner (just started training)  
**Clientele:** None  
**Time remaining:** 12-15 months

**Recommended payment model:**
- **Month 1-6:** Hourly ($10/hour)
- **Month 7-12:** Commission (50%)
- **Month 13-15:** Commission (60%) or booth rent if you have 25+ clients

**Why:**
- You're still learning
- Need guaranteed income while developing skills
- Booth rent only makes sense at the very end

---

### Scenario 4: Transfer with 1,800 hours completed, 200 hours remaining

**Skill level:** Near-professional  
**Clientele:** May have some from previous shop  
**Time remaining:** 1-2 months

**Recommended payment model:**
- **Booth rent immediately ($150/week)** if you have 20+ clients
- **OR commission (60%)** if you're building clientele

**Why:**
- You're almost done
- If you have clients, booth rent maximizes earnings
- If you don't have clients, commission is safer for short period

---

## Key Decision Factors: Commission vs. Booth Rent for Transfer Students

**Choose COMMISSION if:**
- ❌ You don't have 20+ regular clients yet
- ❌ You're new to the shop and building clientele
- ❌ You're still developing skills
- ❌ You have more than 6 months remaining
- ❌ You want guaranteed income

**Choose BOOTH RENT if:**
- ✅ You have 20+ regular clients
- ✅ You're working at professional level
- ✅ You have 500 or fewer hours remaining (3-4 months)
- ✅ Shop owner approves
- ✅ You understand the financial risk

---

## How to Negotiate Booth Rent as a Transfer Student

**If you transferred 1,500 hours and only need 500 more:**

**Step 1: Prove your skills**
- Work on commission for 2-4 weeks
- Show shop owner your skill level
- Demonstrate you can handle professional-level work

**Step 2: Build clientele**
- Get 15-20 regular clients
- Show consistent bookings
- Prove you can stay busy

**Step 3: Make your case**
- "I've completed 1,500 hours of training"
- "I'm working at professional level"
- "I have 20 regular clients"
- "I'd like to switch to booth rent for my remaining 500 hours"
- "This will help me practice running my own business before I get licensed"

**Step 4: Negotiate terms**
- Booth rent: $100-150/week (less than licensed barbers pay)
- Trial period: 2-4 weeks to see if it works
- Option to switch back to commission if needed

**Step 5: Get it in writing**
- Written agreement
- Booth rent amount
- Payment schedule
- Terms and conditions
- Still tracked as apprentice hours

**Example weekly earnings:**

**If you do 25 cuts/week at $30 each:**
- Revenue: 25 × $30 = $750
- Minus booth rent: -$150
- Plus tips: 25 × $6 = $150
- **Total: $750/week**

**Pros:**
- Keep 100% of service revenue (after rent)
- Higher earning potential than commission
- More independence
- Set your own schedule (within shop hours)
- Practice running your own business

**Cons:**
- You pay rent even on slow weeks
- Risk: If you don't have enough clients, you lose money
- No guaranteed income
- You pay for your own products and tools
- More responsibility

**Financial risk example:**

**Good week (30 cuts):**
- Revenue: 30 × $30 = $900
- Minus rent: -$150
- Plus tips: $180
- **Profit: $930**

**Slow week (10 cuts):**
- Revenue: 10 × $30 = $300
- Minus rent: -$150
- Plus tips: $60
- **Profit: $210** (much less than commission or hourly)

**Very slow week (5 cuts):**
- Revenue: 5 × $30 = $150
- Minus rent: -$150
- Plus tips: $30
- **Profit: $30** (you barely break even)

---

## Booth Rent for Apprentices: Is It Legal?

**Yes, BUT only under specific conditions:**

**Legal if:**
- ✅ You're an advanced apprentice (month 12+) with strong clientele
- ✅ You voluntarily choose this arrangement
- ✅ You're still tracked as an employee (W-2)
- ✅ Your hours still count toward your 2,000-hour requirement
- ✅ You're still supervised by a licensed barber
- ✅ Shop still provides apprenticeship training and oversight

**Illegal if:**
- ❌ Shop forces you to pay booth rent from day one
- ❌ You're early in your apprenticeship (month 1-6)
- ❌ You don't have enough clients to make it work
- ❌ Shop doesn't track your hours or provide supervision
- ❌ Shop treats you as self-employed (1099) before you're licensed

**Why this option exists:**
- Some advanced apprentices want to practice running their own business
- Prepares you for renting a booth after licensing
- Can earn more if you have strong clientele
- Gives you more control and independence

**Why most apprentices DON'T choose this:**
- Too risky early on (you don't have clients yet)
- Commission or hourly is more stable
- You're still learning, so guaranteed income is better
- Most shops don't offer this to apprentices

---

## Booth Rent vs. Commission: Which Earns More?

**Let's compare for an advanced apprentice doing 25 cuts/week at $30 each:**

**Commission Model (50%):**
- Revenue to shop: 25 × $30 = $750
- Your commission: $375 (50%)
- Your tips: $150
- **Total: $525/week**

**Booth Rent Model:**
- Revenue to you: 25 × $30 = $750
- Minus booth rent: -$150
- Your tips: $150
- **Total: $750/week**

**Booth rent earns $225 more per week IF you have consistent clientele.**

**But if you only do 15 cuts/week:**

**Commission Model:**
- Your commission: $225 (50% of $450)
- Your tips: $90
- **Total: $315/week**

**Booth Rent Model:**
- Revenue: $450
- Minus rent: -$150
- Your tips: $90
- **Total: $390/week**

**Booth rent still earns more, but the gap is smaller.**

**If you only do 10 cuts/week:**

**Commission Model:**
- Your commission: $150 (50% of $300)
- Your tips: $60
- **Total: $210/week**

**Booth Rent Model:**
- Revenue: $300
- Minus rent: -$150
- Your tips: $60
- **Total: $210/week**

**Break-even point.**

**If you only do 5 cuts/week:**

**Commission Model:**
- Your commission: $75 (50% of $150)
- Your tips: $30
- **Total: $105/week**

**Booth Rent Model:**
- Revenue: $150
- Minus rent: -$150
- Your tips: $30
- **Total: $30/week**

**Commission earns WAY more on slow weeks.**

---

## Should You Pay Booth Rent as an Apprentice?

**For most apprentices: NO.**

**Stick with hourly or commission until:**
- You're month 12+ in your apprenticeship
- You have 25+ regular clients per week
- You're confident in your skills
- You understand the financial risk
- You want to practice running your own business

**After you get your license:**
- Then booth rental makes more sense
- You have full clientele
- You're experienced
- You can charge higher prices
- You're ready to be self-employed

**The safest path:**
1. Month 1-6: Hourly ($10/hour)
2. Month 7-12: Commission (50%)
3. Month 13-17: Commission (60%)
4. After licensing: Booth rental ($200-300/week) or stay as employee

---

## The Bottom Line: Booth Rent Option

**Yes, there IS an option to pay booth rent and keep 100% of what customers pay you.**

**BUT:**
- ❌ Not recommended for early apprentices (month 1-11)
- ❌ Only for advanced apprentices with strong clientele
- ❌ Risky if you don't have consistent clients
- ✅ Can earn more IF you have 25+ clients per week
- ✅ Good practice for running your own business after licensing

**Most apprentices should stick with:**
- Hourly or commission during apprenticeship
- Switch to booth rental AFTER getting licensed

---

## Commission Rate Breakdown by Service Type

**If you're on commission-only or hybrid, here's what you typically earn:**

| Service | Shop Charges | Your Commission (50%) | Your Commission (60%) |
|---------|--------------|----------------------|----------------------|
| Basic Cut | $25 | $12.50 | $15.00 |
| Fade/Taper | $30-35 | $15-17.50 | $18-21 |
| Beard Trim | $15-20 | $7.50-10 | $9-12 |
| Hot Towel Shave | $35-45 | $17.50-22.50 | $21-27 |
| Cut + Beard | $40-50 | $20-25 | $24-30 |
| Kids Cut | $20-25 | $10-12.50 | $12-15 |

**Plus tips (typically 15-20% of service price):**
- $25 cut → $5 tip
- $35 fade → $7 tip
- $45 shave → $9 tip

---

## Which Payment Structure Is Best?

**Month 1-2 (Observation phase):**
- **Best: Hourly only ($10-12/hour)**
- You're not cutting yet, so commission doesn't make sense
- You need guaranteed income while learning

**Month 3-6 (First clients):**
- **Best: Hourly only OR Hybrid**
- You're just starting to cut, so commission-only is risky
- Hybrid gives you stability plus small upside

**Month 7-12 (Building clientele):**
- **Best: Hybrid OR Commission-only**
- You're cutting regularly, so commission makes sense
- Hybrid if you want safety net, commission-only if you're confident

**Month 13-17 (Near-professional):**
- **Best: Commission-only (60-70%)**
- You have strong clientele, so commission maximizes earnings
- You're earning well above minimum wage

---

## Can I Switch Payment Structures?

**Yes, many apprentices start hourly and switch to commission as they progress.**

**Common progression:**
1. **Month 1-2:** Hourly only ($10/hour)
2. **Month 3-6:** Hybrid ($8/hour + 40% commission)
3. **Month 7-12:** Hybrid ($8/hour + 50% commission)
4. **Month 13-17:** Commission-only (60% commission)

**Talk to your employer about switching when:**
- You're consistently serving 15+ clients per week
- Your commission would exceed your hourly wage
- You're confident in your skills and clientele

---

## The Bottom Line: Payment Structure

**You get paid ONE of these ways:**

1. **Hourly ONLY:** $10-12/hour + tips
2. **Commission ONLY:** 50-70% of services + tips (minimum wage guaranteed)
3. **Hybrid:** $7-8/hour + 40-50% commission + tips
4. **Salary:** $400-600/week + tips (rare)

**You do NOT get:**
- ❌ Full hourly ($10/hour) AND full commission (50%) on the same services
- ❌ That would be double-paying

**Exception: Hybrid model**
- ✅ Lower hourly ($7-8) + commission (40-50%)
- This is designed to balance out

**All options are legal as long as:**
- You earn at least minimum wage
- You're paid for every hour worked
- Taxes are withheld properly
- You receive regular paychecks

---

### "What if the shop says I have to pay booth rent as an apprentice?"

**That's illegal. Don't do it.**

**During your apprenticeship:**
- You're an EMPLOYEE, not a booth renter
- Employees don't pay rent to their employer
- The shop must pay YOU, not the other way around

**If a shop asks you to pay booth rent during apprenticeship:**
1. That shop is NOT following apprenticeship rules
2. They're likely not an approved apprenticeship sponsor
3. Your hours won't count toward your license
4. You won't be eligible for the state exam
5. You're being scammed

**Booth rental is ONLY for licensed barbers who are self-employed.**

**After you get your license, then you can choose to rent a booth if you want.**

---

### "Can I bring my own clients to the shop?"

**Yes, but the shop still charges them and pays you commission.**

**Here's how it works:**

**Scenario: Your friend wants you to cut his hair**

**During apprenticeship:**
- Your friend comes to the shop
- He pays the shop's price ($30)
- Shop pays you commission ($12)
- Your friend tips you ($5)
- **You earn: $12 commission + $5 tip + hourly wage**

**You cannot:**
- ❌ Charge your friend directly
- ❌ Cut his hair outside the shop
- ❌ Set your own price
- ❌ Keep the full $30

**Why:**
- You're not licensed yet
- You're working under the shop's license
- The shop is liable for your work
- The shop provides the space, tools, and insurance

**After you get your license and rent a booth:**
- Then your friend pays YOU directly
- You keep the full $30 (minus booth rent)
- You set your own prices
- You're self-employed

---

### "What if I'm really good and bring in lots of clients? Can I negotiate higher pay?"

**Yes, absolutely.**

**After month 6-9, if you're bringing in strong business:**
- You can negotiate higher commission (50-60% instead of 40%)
- You can negotiate higher base wage ($12-15/hour instead of $10)
- You can negotiate bonuses for hitting targets

**Example negotiation:**
- "I'm doing 30 cuts per week and bringing in $900/week in revenue"
- "Can we increase my commission from 40% to 50%?"
- "That would increase my earnings from $360 to $450 per week"

**Shops want to keep good apprentices:**
- If you're skilled and bringing in clients, you have leverage
- Shops would rather pay you more than lose you
- Negotiating is normal and expected

---

### "Do I pay the shop anything during my apprenticeship?"

**No. Nothing. Zero. Not a penny.**

You do NOT pay:
- ❌ Booth rent
- ❌ Chair rental
- ❌ Product costs
- ❌ Equipment costs
- ❌ Training fees (if you have funding)
- ❌ Facility fees
- ❌ Anything else

**The shop pays YOU. You don't pay the shop.**

---

### "What if I don't have any clients yet?"

**You still get paid your base hourly wage.**

Even if you're just observing and practicing, you're earning $10/hour. The shop is investing in you.

---

### "What if the shop is slow and there aren't many clients?"

**You still get paid your hourly wage.**

Slow days mean less commission, but your base pay is guaranteed. You can't lose money on a slow day.

---

### "What if I mess up a haircut?"

**You're covered. You still get paid.**

- You're learning
- Your mentor supervises
- If there's an issue, the shop handles it (refund, redo, etc.)
- You still earn your hourly wage
- You might not get commission on that specific cut if the shop refunds the customer
- But you don't lose money or get penalized

---

### "Can I work at multiple shops to complete my hours faster?"

**No. You must work at ONE registered apprenticeship sponsor shop.**

- You can't split time between shops
- You can't work side jobs as a barber (you're not licensed yet)
- All your hours must be at your registered shop
- If you leave one shop, you transfer to another approved shop

---

### "What if I want to leave and go to a different shop?"

**You can transfer. Your hours go with you.**

If your employment ends or you want to switch shops:
1. We help you find a new approved shop
2. Your completed hours transfer
3. You continue from where you left off
4. New shop pays you the same way

---

## The Bottom Line: You ALWAYS Get Paid

**Every scenario, every situation, you're earning money:**

✅ Observing and learning → $10/hour  
✅ Practicing on mannequins → $10/hour  
✅ Cutting your first client → $10/hour + commission + tips  
✅ Building your clientele → $10/hour + commission + tips  
✅ Slow days → $10/hour guaranteed  
✅ Busy days → $10/hour + lots of commission + lots of tips  

**You NEVER:**
❌ Cut hair for free  
❌ Pay booth rent  
❌ Pay the shop anything  
❌ Work without getting paid  

**The shop pays you. Period. That's the law. That's the program.**

---

## The Bottom Line: You're an Employee, Not a Renter

**During your 2,000-hour apprenticeship:**
- ✅ You're a W-2 employee
- ✅ The shop pays you ($10/hour + commissions + tips)
- ✅ The shop provides tools, products, workspace
- ✅ You pay nothing to the shop
- ✅ You earn $20,000-30,000+ over 15-17 months

**After you get your license:**
- Then you choose: stay as employee, rent a chair, or open your own shop

**You're not paying to learn. You're earning while you learn.**

### What if I lose my job at the barbershop?

**We'll help you find a new placement.** If your employment ends (for any reason), we work with you to find another approved shop. Your hours are tracked and transfer with you.

### Do I get benefits like health insurance?

**It depends on the employer.** Some shops offer benefits, some don't. You're an employee, so you're eligible for whatever benefits the shop provides to other employees.

### Can I work part-time?

**The program is designed for full-time (40 hours/week).** Part-time may be possible, but it will take longer to complete your 2,000 hours. Most funding sources require full-time participation.

### What happens if I fail the state exam?

**You can retake it (per Indiana State Board policy).**

**Indiana State Board Exam consists of:**
1. **Written Exam:** 100 multiple-choice questions
   - Barbering theory and techniques
   - Sanitation and safety
   - Indiana laws and regulations
   - Passing score: 75% (75 correct answers)

2. **Practical Exam:** Hands-on demonstration
   - Perform specific cuts and techniques on mannequin
   - Demonstrate sanitation protocols
   - Scored by licensed examiner
   - Passing score: 75%

**If you fail:**
- You can retake the failed portion (written or practical)
- Wait time: 30 days before retaking
- Retake fee: $40 per attempt
- No limit on number of attempts
- Your apprenticeship hours remain valid

**Pass rates:**
- First-time pass rate: Approximately 85-90%
- Most apprentices pass on first or second attempt
- Your apprenticeship sponsor provides exam prep

**Exam scheduling:**
- Contact Indiana State Board: (317) 234-3040
- Exams held monthly in Indianapolis
- Schedule 4-6 weeks in advance
- Bring photo ID and exam confirmation

### Can I start my own shop right after getting licensed?

**Technically yes, but it's not recommended.** You'll need business licenses, insurance, equipment, and startup capital. Most graduates work for a shop or rent a chair for 1-2 years before opening their own business.

### Is this program only for people with funding?

**No.** You can self-pay ($4,980) if you don't qualify for WIOA, WRG, or JRI funding. Employer sponsorship is also an option (employer pays the curriculum cost).

### How many hours can I work per week?

**Maximum hours per week (Indiana State Board guidelines):**

**On-the-Job Training (OJT) at the shop:**
- **Standard:** 40 hours/week (full-time)
- **Maximum:** 50 hours/week (with overtime)
- **Minimum:** 20 hours/week (part-time, takes longer to complete)

**Related Technical Instruction (RTI):**
- **Standard:** 3-4 hours/week (online or in-person)
- **Can be completed:** Evenings, weekends, or during work hours

**Total maximum per week:** 50 hours OJT + 4 hours RTI = **54 hours/week**

**Why there's a maximum:**
- ✅ Prevents burnout and ensures quality learning
- ✅ Allows time for skill development (not just rushing through)
- ✅ Federal labor laws limit work hours
- ✅ Overtime pay required over 40 hours/week
- ✅ State Board wants apprentices to learn properly, not just accumulate hours

**Timeline based on hours per week:**

**Full-time (40 hours/week):**
- 2,000 hours ÷ 40 hours/week = 50 weeks
- Plus 144 RTI hours over same period
- **Total time: 12-13 months minimum**
- **Realistic: 15-17 months** (accounting for holidays, sick days, shop closures)

**Overtime (50 hours/week):**
- 2,000 hours ÷ 50 hours/week = 40 weeks
- Plus 144 RTI hours over same period
- **Total time: 10-11 months minimum**
- **Realistic: 12-14 months** (accounting for holidays, sick days)
- **Note:** Employer must pay overtime (1.5x wage) for hours over 40/week

**Part-time (20 hours/week):**
- 2,000 hours ÷ 20 hours/week = 100 weeks
- Plus 144 RTI hours over same period
- **Total time: 24-26 months** (2+ years)

**You cannot rush through faster than 10-11 months even working maximum hours.**

### What if I have a criminal record?

**You may still qualify.** Background checks are required, but many shops work with justice-involved individuals. JRI funding is specifically designed for people with criminal records. Be honest on your application.

---

## This Is Your Chance

"I was working dead-end jobs, barely making rent," Marcus says. "I didn't think I had options. Then I found this program. It changed everything."

Indiana opened a door that didn't exist before. You can become a licensed barber without debt, while earning money, and building a real career.

You don't need perfect circumstances. You don't need money saved up. You don't need connections.

You just need to show up, put in the work, and be willing to learn.

**Marcus did it. Sarah's doing it right now. You can too.**

Ready to start?

## Who This Is For

- Parents who need to earn while they learn
- Justice-involved individuals seeking a fresh start
- Young adults who don't want college debt
- Career changers looking for a skilled trade
- Anyone who's good with people and wants to work with their hands

## Where You'll Work

You'll be placed in a federally approved barbershop that participates in Indiana's registered apprenticeship program. These shops have met strict standards and are committed to training the next generation of barbers.

**Current Participating Shops:**
- MDG Salons (Indianapolis area)
- Kiss Kiss Bang Bang (Indianapolis area)
- Additional shops being added regularly

**What to Expect:**
- You'll work alongside licensed barbers who serve as your mentors
- You'll start with basic tasks and progress to full client services
- You'll build your own clientele as you gain skills
- You'll earn approximately $10/hour plus commissions from your clients
- You'll complete 144 hours of technical instruction alongside your shop work

**Your Daily Reality:**
- Clock in at your assigned barbershop
- Work with real clients under supervision
- Learn techniques from experienced barbers
- Build relationships with customers who become your regulars
- Earn money for every hour you're training
- Complete online or in-person technical coursework
- Track your hours toward your 2,000-hour requirement

## How to Get Started

**Step 1: Fill Out Our Contact Form**
Click "Apply Now" below to submit your information. Tell us about yourself and why you're interested in barbering. We need to know:
- Your name, phone, and email
- Your age and education level (must be 17+ with diploma/GED)
- Why you want to become a barber
- Your availability to work full-time
- Any barbering experience you already have

**Step 2: Create Your Indiana Career Connect Account**
Go to [IndianaCareerConnect.com](https://www.indianacareerconnect.com) and create a free account. This is Indiana's official workforce system and is required for funding eligibility.

**What You'll Need:**
- Valid email address
- Social Security number
- Basic employment history
- Education information

**Step 3: Schedule Your Appointment**
Once you have your Indiana Career Connect account, schedule an appointment with a career counselor through the portal. They'll help you:
- Determine your eligibility for funding (WIOA, Workforce Ready Grant, JRI)
- Complete required assessments (basic skills, career interest)
- Review your background and work history
- Connect you with participating barbershops in your area
- Guide you through the enrollment process
- Explain your rights and responsibilities as an apprentice

**Step 4: Contact Us Back**
After you schedule your appointment, email us at elevate4humanityedu@gmail.com with:
- Your full name
- Your appointment date and time
- Your Indiana Career Connect username
- The location of your appointment
- Any questions or concerns you have

**Step 5: Attend Your Appointment**
Show up on time, dressed professionally, and ready to discuss your career goals. Bring:
- Photo ID (driver's license or state ID)
- Social Security card
- High school diploma or GED certificate
- Any questions you have about the program

**Step 6: Get Matched with a Barbershop**
After your appointment, we'll work with you and the career counselor to:
- Match you with a participating barbershop
- Schedule an interview with the shop owner
- Complete any required background checks
- Finalize your apprenticeship agreement
- Set your start date

**Step 7: Start Training**
Once everything is approved, you'll begin your 2,000-hour journey. You'll clock in, earn money, and start building your future as a licensed barber.

**Timeline:**
- Contact form to first appointment: 1-2 weeks
- Appointment to barbershop match: 2-4 weeks
- Match to start date: 1-2 weeks
- Total time to start: 4-8 weeks

We'll guide you through every step.

## This Is Your Chance

Indiana has opened a door that didn't exist before. You can become a licensed barber without debt, while earning money, and building a real career.

You don't need perfect circumstances. You just need to show up, put in the work, and be willing to learn.

Ready to start?`,
    heroImage: '/images/programs/barber-hero.jpg',
    heroImageAlt:
      'Barber apprentice working with real clients in professional barbershop',
    duration: '15-17 months (2,000 hours)',
    schedule: 'Full-time, based on barbershop placement',
    delivery:
      'On-the-job training in real barbershop + 144 hours technical instruction',
    credential:
      'Indiana Registered Barber License (upon passing state board exam)',
    approvals: [
      'U.S. Department of Labor Registered Apprenticeship',
      'Indiana House Bill 1135 & 1320 Approved',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'JRI Funding Available',
    ],
    fundingOptions: [
      '100% Employer-Paid curriculum cost',
      'WIOA Funding',
      'Workforce Ready Grant',
      'JRI Funding for Justice-Involved Individuals',
      'Earn $10/hour + commissions while training',
    ],
    highlights: [
      'Earn while you learn - get paid $10/hour plus commissions from day one',
      'Zero tuition - employers pay your curriculum cost',
      'Skip $25,000 barber school debt - graduate debt-free',
      'Build your clientele during training - graduate with customers who know you',
      'Real experience - 2,000 hours working with actual clients in professional shops',
      'Own your future - 73% of graduates own their chair or shop within 2 years',
      'Unlimited earning potential - licensed barbers earn $35k-$65k+ per year',
      'Multiple career paths - rent a chair, work for a shop, or open your own business',
    ],
    whatYouLearn: [
      'Haircutting: fades, tapers, lineups, beard work',
      'Hot towel shaves and grooming techniques',
      'Sanitation and infection control protocols',
      'Client consultation and communication',
      'Business management and shop operations',
      'Building and maintaining a clientele',
      'Customer service and professionalism',
      'Shop safety and regulatory compliance',
    ],
    outcomes: [
      'Indiana Registered Barber (licensed)',
      'Chair rental ($100-$300/week) - be your own boss',
      'Barbershop employee with established clientele',
      'Barbershop owner/entrepreneur',
      'Earning potential: $35,000-$65,000+ per year',
      '73% own chair or shop within 2 years',
    ],
    requirements: [
      'At least 17 years old',
      'High school diploma or GED',
      'Passion for working with people',
      'Willingness to commit to 2,000 training hours',
      'Reliable transportation to barbershop placement',
      'Professional attitude and appearance',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact?topic=barber-apprenticeship',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/programs/barber-apprenticeship',
    },
    price: 4980, // Self-pay option price
  },
  {
    slug: 'cna',
    name: 'Certified Nursing Assistant (CNA)',
    heroTitle: 'CNA — Certified Nursing Assistant',
    heroSubtitle:
      'Start your healthcare career in just 4-8 weeks. Learn patient care from experienced nurses and get certified to work in hospitals, nursing homes, assisted living, or home health. Enjoy stable income, flexible schedules, and a clear path to becoming an LPN or RN.',
    shortDescription:
      'Start your healthcare career in just 4-8 weeks. Learn patient care from experienced nurses and get certified to work in hospitals, nursing homes, assisted living, or home health. Enjoy stable income, flexible schedules, and a clear path to becoming an LPN or RN.',
    longDescription: `The CNA program provides foundational patient care training through structured instruction and supported clinical experiences. Students learn essential caregiving skills, communication, infection prevention, and daily living support. This program is ideal whether you are starting a healthcare career, returning to the workforce, or preparing for advanced roles such as QMA, LPN, or RN.

What You'll Learn:
- Vital signs and patient monitoring
- Infection prevention and safety
- Activities of daily living (ADLs)
- Mobility, transfers, and comfort care
- Professional communication and ethics

Who This Program Is For:
- Individuals who enjoy helping others
- Students exploring healthcare careers
- Adults needing stable, in-demand work
- Anyone preparing for nursing pathways

Program Format:
- Classroom + clinicals
- Length: 4–8 weeks
- Schedule: Day, evening, or weekend options

Funding & Approvals:
- Partner-delivered through an approved CNA training provider
- Workforce funding may be available

Career Outcomes:
- Certified Nursing Assistant
- Patient Care Technician (with additional training)
- Home Health Aide`,
    heroImage: '/images/programs/cna-hero.jpg',
    heroImageAlt: 'CNA student practicing caregiving skills with an instructor',
    duration: '4–8 weeks',
    schedule: 'Day, evening, or weekend options',
    delivery: 'Classroom + clinicals',
    credential:
      'CNA certification eligibility (state-approved program partner)',
    approvals: [
      'Partner-delivered through an approved CNA training provider',
      'Workforce funding may be available',
    ],
    fundingOptions: [
      'Partner-delivered through an approved CNA training provider',
      'Workforce funding may be available',
    ],
    highlights: [
      'Get certified in just 4-8 weeks - fastest path to healthcare',
      'Stable income and flexible schedules - work the hours that fit your life',
      'High demand - healthcare facilities are always hiring CNAs',
      'Clear advancement path - many CNAs become LPNs or RNs',
      'Hands-on clinical experience with real patients',
      'Job placement support with local hospitals and care facilities',
    ],
    whatYouLearn: [
      'Vital signs and patient monitoring',
      'Infection prevention and safety',
      'Activities of daily living (ADLs)',
      'Mobility, transfers, and comfort care',
      'Professional communication and ethics',
    ],
    outcomes: [
      'Certified Nursing Assistant',
      'Patient Care Technician (with additional training)',
      'Home Health Aide',
    ],
    requirements: [
      'Individuals who enjoy helping others',
      'Students exploring healthcare careers',
      'Adults needing stable, in-demand work',
      'Anyone preparing for nursing pathways',
    ],
    ctaPrimary: {
      label: 'Start CNA Application',
      href: '/contact?topic=cna',
    },
    ctaSecondary: {
      label: 'Talk to Healthcare Career Coach',
      href: '/contact?topic=cna',
    },
  },
  {
    slug: 'cdl',
    name: "Commercial Driver's License (CDL)",
    heroTitle: 'CDL — Commercial Driver Training',
    heroSubtitle:
      "Get your Commercial Driver's License and start earning $50,000-$70,000+ per year. Professional CDL training prepares you for Class A or Class B licensing in just weeks. Trucking companies are desperate for drivers—many offer sign-on bonuses, benefits, and tuition reimbursement.",
    shortDescription:
      "Get your Commercial Driver's License and start earning $50,000-$70,000+ per year. Professional CDL training prepares you for Class A or Class B licensing in just weeks. Trucking companies are desperate for drivers—many offer sign-on bonuses, benefits, and tuition reimbursement.",
    longDescription: `The CDL program builds the knowledge and skills required to safely operate commercial vehicles. Students receive classroom instruction along with hands-on yard and road training. This pathway is ideal for adults seeking stable income, benefits, and long-term growth in logistics and transportation.

What You'll Learn:
- Vehicle inspection and safety
- Backing, shifting, turning, and road maneuvers
- Trip planning and hours-of-service rules
- Transportation regulations
- Professional communication and job readiness

Who This Program Is For:
- Adults seeking high-earning roles
- Individuals interested in transportation careers
- Career changers needing a stable job pathway
- Students who want a quick employment route

Program Format:
- Classroom, yard practice, and road training
- Length: Varies by partner
- Schedule: Day/evening options

Funding & Approvals:
- Workforce funding options may be available
- Employer reimbursement programs may apply

Career Outcomes:
- CDL Class A or B Driver
- Local, regional, or dedicated routes
- Logistics and transportation support roles`,
    heroImage: '/images/programs/cdl-hero.jpg',
    heroImageAlt: 'CDL student practicing with a commercial truck',
    duration: 'Varies by partner',
    schedule: 'Day/evening options',
    delivery: 'Classroom, yard practice, and road training',
    credential: 'CDL Class A license eligibility upon completion',
    approvals: [
      'Workforce funding options may be available',
      'Employer reimbursement programs may apply',
    ],
    fundingOptions: [
      'Workforce funding options may be available',
      'Employer reimbursement programs may apply',
    ],
    highlights: [
      'High earning potential - start at $50k-$70k+ per year',
      'Extreme demand - trucking companies are desperate for qualified drivers',
      'Sign-on bonuses - many companies offer $5,000-$10,000 bonuses',
      'Excellent benefits - health insurance, retirement, paid time off',
      'Behind-the-wheel training with experienced professional drivers',
      'Job placement assistance - we connect you with hiring carriers',
      'Multiple career paths - local routes, regional, or long-haul',
      'Tuition reimbursement - many employers will pay back your training costs',
    ],
    whatYouLearn: [
      'Vehicle inspection and safety',
      'Backing, shifting, turning, and road maneuvers',
      'Trip planning and hours-of-service rules',
      'Transportation regulations',
      'Professional communication and job readiness',
    ],
    outcomes: [
      'CDL Class A or B Driver',
      'Local, regional, or dedicated routes',
      'Logistics and transportation support roles',
    ],
    requirements: [
      'Adults seeking high-earning roles',
      'Individuals interested in transportation careers',
      'Career changers needing a stable job pathway',
      'Students who want a quick employment route',
    ],
    ctaPrimary: {
      label: 'Apply for CDL Training',
      href: '/contact?topic=cdl',
    },
    ctaSecondary: {
      label: 'Request CDL Info Session',
      href: '/contact?topic=cdl',
    },
  },
  {
    slug: 'building-maintenance',
    name: '2Exclusive Apprenticeship Program - Sanitation & Infection Control',
    heroTitle:
      '2Exclusive Apprenticeship Program - Advanced Sanitation & Infection Control',
    heroSubtitle:
      'Specialized training for sanitation and infection control in high-risk environments: hospitals, military bases, and government facilities',
    shortDescription:
      'Hands-on apprenticeship in OSHA compliance, holistic wellness cleaning, hazardous waste management, and infection control for critical sectors',
    longDescription: `The 2Exclusive Apprenticeship Program is a specialized training initiative focused on equipping participants with the advanced skills required for sanitation and infection control in high-risk environments such as hospitals, military bases, and government facilities. This program offers hands-on experience and in-depth training in areas such as OSHA compliance, holistic wellness cleaning, hazardous waste management, and infection control protocols.

Apprentices will gain expertise in safely handling hazardous materials, implementing eco-friendly cleaning practices, and ensuring regulatory compliance, all while promoting healthier and safer environments. With a strong emphasis on both technical proficiency and holistic well-being, this apprenticeship prepares participants to meet the unique demands of critical sectors, ensuring a highly skilled workforce ready to tackle the challenges of modern sanitation and safety.

All faculty members possess at least three to five years of professional experience in military or institutional cleaning. Instructors hold valid safety and compliance certifications such as OSHA 10/30, HAZMAT, or Certified Environmental Technician credentials, and demonstrate strong expertise in infection control, regulatory compliance, and holistic wellness cleaning practices.

Credentialing Partners:
• CareerSafe - OSHA 10/30 Safety Certification (https://careersafeonline.com)
• U.S. Department of Labor - OSHA Training (https://osha.gov)
• Certified Environmental Technician Programs
• HAZMAT Certification Bodies

CIP Code: 15.0501 - Heating, Ventilation, Air Conditioning and Refrigeration Engineering Technology/Technician`,
    heroImage: '/images/programs/building-maintenance-hero.jpg',
    heroImageAlt:
      'Sanitation technician in protective equipment working in healthcare facility',
    duration: 'Varies by apprenticeship track',
    schedule: 'Quarterly cohorts (January, April, July, October)',
    delivery: 'Hands-on apprenticeship with classroom instruction',
    credential:
      'OSHA 10/30, HAZMAT, Certified Environmental Technician, Infection Control Specialist',
    approvals: [
      'ETPL Approved',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 15.0501',
      'Registered Apprenticeship Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Employer-sponsored apprenticeship',
    ],
    highlights: [
      'Specialized training for high-risk environments',
      'OSHA 10/30 safety certifications',
      'HAZMAT and hazardous waste management',
      'Infection control protocols for hospitals and military',
      'Holistic wellness cleaning practices',
      'Eco-friendly and sustainable cleaning techniques',
      'Regulatory compliance expertise',
      'Quarterly cohort start dates',
      'Hands-on experience in critical sectors',
    ],
    whatYouLearn: [
      'OSHA compliance and workplace safety standards',
      'Infection control protocols and procedures',
      'Hazardous materials handling and disposal',
      'HAZMAT safety and emergency response',
      'Holistic wellness cleaning practices',
      'Eco-friendly and sustainable cleaning techniques',
      'Regulatory compliance for healthcare and government facilities',
      'Bloodborne pathogens and biohazard management',
      'Personal protective equipment (PPE) usage',
      'Documentation and reporting requirements',
    ],
    outcomes: [
      'Sanitation Specialist in hospitals and healthcare',
      'Military base environmental services',
      'Government facility cleaning and maintenance',
      'Infection control technician',
      'Environmental services supervisor',
      'HAZMAT response team member',
      'Certified Environmental Technician',
      'Average salary: $35,000-$55,000/year',
    ],
    requirements: [
      'High school diploma or equivalent required',
      'Willingness to learn infection control and sanitation procedures',
      'Interest in eco-friendly cleaning techniques',
      'Prior experience in janitorial, environmental services, or healthcare cleaning preferred but not required',
      'Background check required',
      'OSHA 10 or OSHA 30 certification completed during program',
      'Application deadline: Apply at least 30 days before desired start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact?topic=building-maintenance',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=building-maintenance',
    },
  },
  {
    slug: 'building-technician',
    name: 'Building Technician — Advanced Pathway',
    heroTitle: 'Building Technician — Advanced Pathway',
    heroSubtitle:
      'An advanced pathway designed to build deeper technical skills for building operations, maintenance, and facility engineering.',
    shortDescription:
      'An advanced pathway designed to build deeper technical skills for building operations, maintenance, and facility engineering.',
    longDescription: `The Building Technician program expands on core maintenance skills by introducing advanced diagnostics, building system operations, compliance, and preventative strategies. Ideal for individuals pursuing higher-skill roles or preparing for facility engineering pathways.

What You'll Learn:
- Advanced systems troubleshooting
- Electrical and mechanical safety
- Building automation basics
- Documentation and compliance
- Preventative maintenance strategies

Who This Program Is For:
- Students who completed Building Maintenance
- Individuals wanting higher-skill trade roles
- Adults preparing for facility engineering

Program Format:
- Hybrid
- Length: 12–20 weeks

Funding & Approvals:
- Workforce funding may be available

Career Outcomes:
- Building Technician
- Facilities Operations Specialist
- Entry-Level Building Engineer`,
    heroImage: 'https://i.imgur.com/rOagiKC.jpg',
    heroImageAlt: 'Building technician working on advanced facility systems',
    duration: '12–20 weeks',
    schedule: 'Day or evening options',
    delivery: 'Hybrid',
    credential: 'Building Technician certificate',
    approvals: ['Workforce funding may be available'],
    fundingOptions: ['Workforce funding may be available'],
    highlights: [
      'Advanced systems troubleshooting',
      'Building automation basics',
      'Documentation and compliance training',
      'Pathways to facility engineering',
    ],
    whatYouLearn: [
      'Advanced systems troubleshooting',
      'Electrical and mechanical safety',
      'Building automation basics',
      'Documentation and compliance',
      'Preventative maintenance strategies',
    ],
    outcomes: [
      'Building Technician',
      'Facilities Operations Specialist',
      'Entry-Level Building Engineer',
    ],
    requirements: [
      'Students who completed Building Maintenance',
      'Individuals wanting higher-skill trade roles',
      'Adults preparing for facility engineering',
    ],
    ctaPrimary: {
      label: 'Apply for Building Technician',
      href: '/contact?topic=building-technician',
    },
    ctaSecondary: {
      label: 'Talk to a Career Coach',
      href: '/contact?topic=building-technician',
    },
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness (Youth & Adult)',
    heroTitle: 'Workforce Readiness (Youth & Adult)',
    heroSubtitle:
      'A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.',
    shortDescription:
      'A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.',
    longDescription: `The Workforce Readiness program prepares youth and adults with the communication, professionalism, and foundational skills needed for employment. Students learn how to communicate with employers, build resumes, interview confidently, and understand workplace expectations. This program supports success across all career and training pathways.

What You'll Learn:
- Professional communication
- Resume and interview preparation
- Workplace expectations and employer needs
- Customer service and teamwork
- Career and job search strategies

Who This Program Is For:
- Youth ages 16–24
- Adults re-entering the workforce
- Individuals preparing for training or employment
- Students building confidence and communication

Program Format:
- Classroom or hybrid
- Length: 1–4 weeks

Career Outcomes:
- Job-ready graduate prepared for employment
- Stronger candidate for workforce training programs`,
    heroImage: '/images/programs/workforce-readiness-hero.jpg',
    heroImageAlt: 'Workforce readiness training session',
    duration: '1–4 weeks',
    schedule: 'Flexible',
    delivery: 'Classroom or hybrid',
    credential: 'Workforce Readiness certificate',
    approvals: ['Available for youth and adult participants'],
    fundingOptions: ['Workforce funding may be available'],
    highlights: [
      'Professional communication skills',
      'Resume and interview preparation',
      'Workplace expectations training',
      'Career and job search strategies',
    ],
    whatYouLearn: [
      'Professional communication',
      'Resume and interview preparation',
      'Workplace expectations and employer needs',
      'Customer service and teamwork',
      'Career and job search strategies',
    ],
    outcomes: [
      'Job-ready graduate prepared for employment',
      'Stronger candidate for workforce training programs',
    ],
    requirements: [
      'Youth ages 16–24',
      'Adults re-entering the workforce',
      'Individuals preparing for training or employment',
      'Students building confidence and communication',
    ],
    ctaPrimary: {
      label: 'Apply for Workforce Readiness',
      href: '/contact?topic=workforce-readiness',
    },
    ctaSecondary: {
      label: 'Talk to a Career Coach',
      href: '/contact?topic=workforce-readiness',
    },
  },
  {
    slug: 'direct-support-professional',
    name: 'Direct Support Professional (DSP) Training',
    heroTitle: 'Direct Support Professional (DSP) Training Program',
    heroSubtitle:
      'Compassionate care training for meaningful work supporting individuals with developmental, physical, or emotional needs',
    shortDescription:
      'Hands-on DSP training with real-world scenarios preparing you for rewarding careers in behavioral health, direct support, and caregiving',
    longDescription: `Our Direct Support Professional (DSP) training program is built to prepare compassionate individuals for meaningful work in the care and support field. This program offers hands-on instruction, real-world scenarios, and practical skills that help students feel confident working with individuals who have developmental, physical, or emotional needs. Whether you're starting a new career or looking to grow in the healthcare field, this training gives you the tools to make a real difference in someone's life while also building a rewarding future for yourself.

All instructors possess a minimum of a High School Diploma or GED and have at least two years of hands-on experience in behavioral health, direct support, or caregiving. Preference is given to faculty with credentials such as Certified Direct Support Professional (CDSP), CNA licensure, QIDP designation, or completion of state-approved Train-the-Trainer programs. Faculty complete ongoing professional development annually.

This comprehensive program provides training in patient care, behavioral health support, person-centered planning, and professional communication. Students learn to work effectively with individuals with disabilities, mental health needs, and other support requirements in residential, community, and healthcare settings.

Credentialing Partners:
• National Alliance for Direct Support Professionals (NADSP) - CDSP Certification (https://nadsp.org)
• Certified Community Healthcare Worker (CCHW) Programs
• CPR/First Aid Certification Bodies
• Rise Up - Career Readiness Certification (https://riseup.com)

CIP Code: 51.0801 - Medical/Clinical Assistant`,
    heroImage: '/images/programs/dsp-hero.jpg',
    heroImageAlt: 'Direct support professional providing compassionate care',
    duration: '21 days (3 weeks)',
    schedule: 'Cohorts start 1st and 15th of each month',
    delivery: 'Hands-on instruction with real-world scenarios',
    credential:
      'Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate',
    approvals: [
      'ETPL Approved - Program ID #10004639',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.0801',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Employer-sponsored enrollment',
      'Self-Pay: $4,325',
    ],
    highlights: [
      'Certified Community Healthcare Worker (CCHW) credential',
      'CPR and First Aid certification',
      'Rise Up career readiness certificate',
      'Hands-on training with real-world scenarios',
      'Fast 21-day completion',
      'Cohorts start twice monthly (1st and 15th)',
      'Meaningful work supporting individuals with disabilities',
      'Pathways to behavioral health and healthcare careers',
    ],
    whatYouLearn: [
      'Person-centered care and support planning',
      'Working with individuals with developmental disabilities',
      'Behavioral health support techniques',
      'Communication and relationship building',
      'CPR and First Aid emergency response',
      'Medication administration basics',
      'Documentation and reporting',
      'Professional boundaries and ethics',
      'Crisis intervention and de-escalation',
      'Activities of daily living (ADL) assistance',
    ],
    outcomes: [
      'Direct Support Professional in residential settings',
      'Behavioral health support specialist',
      'Community support worker',
      'Personal care assistant',
      'Group home staff',
      'Day program facilitator',
      'Average salary: $30,000-$42,000/year',
      'Foundation for nursing or advanced healthcare careers',
    ],
    requirements: [
      '18 years or older',
      'High school diploma or GED',
      'Pass background check',
      'Reliable transportation encouraged',
      'No prior healthcare experience required',
      'Willingness to complete all required training hours',
      'Interest in supporting individuals with disabilities or behavioral health needs',
      'Legally authorized to work in the U.S.',
      'Application deadline: Apply at least 7 days before cohort start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=direct-support-professional',
    },
    price: 4325,
  },
  {
    slug: 'beauty-career-educator',
    name: 'Beauty and Career Educator Training',
    heroTitle: 'Beauty and Career Educator Training Program',
    heroSubtitle:
      '12-week hybrid program preparing aspiring beauty professionals and peer educators',
    shortDescription:
      'Comprehensive training combining salon services, peer teaching, entrepreneurship, and workforce readiness',
    longDescription: `The Beauty & Career Educator Training Program offered by Elevate for Humanity is a 12-week hybrid training experience designed to help aspiring beauty professionals and peer educators develop career-ready, technical, and leadership skills. This program includes practical salon service education (manicuring techniques, customer service, sanitation), instructional tools for peer teaching and community workshops, and a strong focus on entrepreneurship and workforce readiness.

Participants earn a nationally recognized Rise Up Credential (https://riseup.com), a Career Readiness Certificate, and a custom Certificate of Completion. Designed for youth and adults ages 16+, this program is aligned with workforce demand for independent contractors, salon educators, and business owners.

Credentialing Partners:
• Rise Up - Career Readiness Certification (https://riseup.com)
• American Red Cross - CPR/First Aid (https://redcross.org)
• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)

CIP Code: 13.1319 - Technical Teacher Education`,
    heroImage: '/images/programs/beauty-educator.jpg',
    heroImageAlt: 'Beauty educator training students in salon techniques',
    duration: '12 weeks (84 days)',
    schedule: 'Hybrid - Flexible scheduling with monthly/quarterly cohorts',
    delivery:
      'Hybrid - Online coursework + In-person practical training and workshops',
    credential:
      'Rise Up Credential, Career Readiness Certificate, CPR/First Aid, OSHA 10, Certificate of Completion',
    approvals: [
      'ETPL Approved - Program ID #10004648',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 13.1319',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,730',
    ],
    highlights: [
      'Nationally recognized Rise Up Credential',
      'CPR/First Aid and OSHA 10 certifications',
      'Practical salon service education (manicuring, customer service, sanitation)',
      'Peer teaching and community workshop skills',
      'Entrepreneurship and business ownership training',
      'Career readiness and workforce development',
      'Rolling admissions - start year-round',
    ],
    whatYouLearn: [
      'Manicuring techniques and nail care services',
      'Customer service excellence in salon settings',
      'Infection control and sanitation protocols',
      'Peer teaching and instructional methods',
      'Community workshop facilitation',
      'CPR and First Aid emergency response',
      'OSHA 10 workplace safety standards',
      'Entrepreneurship and business planning',
      'Career development and workforce readiness',
      'Leadership and mentorship skills',
    ],
    outcomes: [
      'Independent contractor in beauty services',
      'Salon educator and trainer',
      'Beauty business owner',
      'Peer educator and community workshop facilitator',
      'Career coach in beauty industry',
      'Average salary: $35,000-$55,000/year',
      'Flexible self-employment opportunities',
    ],
    requirements: [
      'At least 16 years of age',
      'High school diploma, GED, or equivalent',
      'Youth applicants may enroll with parental/guardian permission and school approval',
      'No prior nail or beauty experience required',
      'Complete brief orientation and program readiness screening',
      'Application deadline: Rolling admissions (apply at least 2 weeks before start date for priority consideration)',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=beauty-educator',
    },
    price: 4730,
  },
  {
    slug: 'business-startup-marketing',
    name: 'Business Start-up & Marketing',
    heroTitle: 'Business Start-up & Marketing Program with Rise Forward',
    heroSubtitle:
      '5-week intensive program to launch your business with mentorship, stipend, and laptop kit',
    shortDescription:
      'Hands-on entrepreneurship training with LLC formation, digital marketing, and real-world startup support',
    longDescription: `The Business Start-Up & Marketing Program with Rise Forward equips participants with hands-on skills to launch their own business ventures. Students will learn the fundamentals of entrepreneurship, digital marketing, LLC formation, business planning, customer service, and resume development. The program includes guided startup support, mentorship, and ends with a business match stipend and laptop kit to empower real-world implementation. Ideal for youth ready to explore self-employment and leadership pathways in today's economy.

In just 5 weeks, you'll gain industry-recognized certifications in retail operations and marketing, learn how to create a business plan, develop marketing strategies, form an LLC, and build your professional image and online presence. This program is designed for aspiring entrepreneurs ages 16+ who want to launch their own business or advance in retail management.

Credentialing Partners:
• National Retail Federation (NRF) - Business of Retail Certified Specialist (https://nrf.com)
• National Retail Federation (NRF) - Retail Industry Fundamentals Specialist (https://nrf.com)
• Rise Forward Foundation - Business Development Support (https://riseforwardfoundation.org)

Program Benefits:
• Business match stipend upon completion
• Laptop kit for business operations
• One-on-one mentorship
• LLC formation guidance
• Professional resume development

CIP Code: 52.0701 - Entrepreneurship/Entrepreneurial Studies`,
    heroImage: '/images/programs/business-startup.jpg',
    heroImageAlt: 'Young entrepreneur planning business strategy',
    duration: '5 weeks',
    schedule: 'Quarterly cohorts - Flexible scheduling options',
    delivery: 'Hybrid - Online coursework + In-person workshops and mentorship',
    credential:
      'Business of Retail Certified Specialist (NRF), Retail Industry Fundamentals Specialist (NRF), Certificate of Completion',
    approvals: [
      'ETPL Approved - Program ID #10004645',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 52.0701',
      'Rise Forward Partnership',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,550',
      'Includes business match stipend and laptop kit',
    ],
    highlights: [
      'Industry-recognized NRF retail certifications',
      'LLC formation and business registration',
      'Digital marketing and social media strategies',
      'Business match stipend upon completion',
      'Free laptop kit for business operations',
      'One-on-one mentorship and startup support',
      'Resume and professional image development',
      'Fast 5-week completion',
    ],
    whatYouLearn: [
      'Business planning and strategy development',
      'LLC formation and business registration',
      'Retail operations and management',
      'Digital marketing fundamentals',
      'Social media marketing and content creation',
      'Customer service excellence',
      'Financial planning and budgeting',
      'Sales techniques and customer acquisition',
      'Resume building and professional branding',
      'Online presence and website basics',
    ],
    outcomes: [
      'Launch your own business with LLC',
      'Retail management positions',
      'Marketing coordinator roles',
      'Small business owner/entrepreneur',
      'E-commerce business operator',
      'Average salary: $35,000-$60,000/year',
      'Self-employment income potential varies',
    ],
    requirements: [
      'Ages 16 and up',
      'No previous business experience required',
      'Basic reading and writing skills',
      'Comfortable using a computer',
      'Entrepreneurial mindset and eagerness to learn',
      'Complete short intake interview',
      'Application deadline: Apply at least 2 weeks before cohort start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=business-startup',
    },
    price: 4550,
  },
  {
    slug: 'emergency-health-safety-tech',
    name: 'Emergency Health & Safety Technician',
    heroTitle: 'Emergency Health & Safety Technician Registered Apprenticeship',
    heroSubtitle:
      '4-week hybrid program preparing life-saving responders for schools, workplaces, and emergency settings',
    shortDescription:
      'Comprehensive training with CPR/AED, First Aid, EMR, and OSHA 10 certifications for healthcare and public safety careers',
    longDescription: `The Emergency Health and Safety Technician Registered Apprenticeship program prepares individuals for life-saving response roles in schools, workplaces and emergency settings. This hybrid training includes CPR/AED, First Aid, OSHA-aligned safety education, and public health emergency awareness. Students graduate with nationally recognized certifications and are equipped for careers in healthcare, public safety, community response, and entry-level emergency technician pathways.

In just 4 weeks, you'll earn multiple industry-recognized certifications including Emergency Medical Responder (EMR), CPR/AED, First Aid, and OSHA 10. This fast-paced program combines classroom instruction with hands-on emergency response training, preparing you to save lives and ensure workplace safety.

All instructors hold CPR/AED & First Aid Instructor certification from the American Heart Association, Red Cross, or equivalent nationally recognized body. Instructors have a minimum of 2 years of experience in occupational safety, healthcare, or public safety.

Credentialing Partners:
• American Heart Association (AHA) - CPR/AED/First Aid (https://cpr.heart.org)
• American Red Cross - CPR/AED/First Aid (https://redcross.org)
• National Registry of Emergency Medical Technicians (NREMT) - EMR Certification (https://nremt.org)
• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)

CIP Code: 51.0999 - Allied Health Diagnostic, Intervention, and Treatment Professions`,
    heroImage: '/images/programs/emergency-health.jpg',
    heroImageAlt: 'Emergency medical responder providing care',
    duration: '4 weeks',
    schedule: 'Monthly cohorts - Full-time intensive',
    delivery: 'Hybrid - Online theory + In-person hands-on skills training',
    credential:
      'Emergency Medical Responder (EMR), CPR/AED/First Aid, OSHA 10 - Career Safe',
    approvals: [
      'ETPL Approved - Program ID #10004621',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.0999',
      'Registered Apprenticeship Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,950',
    ],
    highlights: [
      'Registered Apprenticeship program',
      'Emergency Medical Responder (EMR) certification',
      'CPR/AED and First Aid certified',
      'OSHA 10 workplace safety certification',
      'Public health emergency awareness training',
      'Fast 4-week completion',
      'Monthly cohort start dates',
      'High-demand career field',
      'Pathways to healthcare and public safety careers',
    ],
    whatYouLearn: [
      'Emergency medical response procedures',
      'CPR and AED operation for all ages',
      'First aid and trauma care',
      'Patient assessment and triage',
      'OSHA 10 workplace safety standards',
      'Emergency scene management and safety',
      'Public health emergency response',
      'Medical terminology and documentation',
      'Communication with EMS professionals',
      'Infection control and bloodborne pathogens',
    ],
    outcomes: [
      'Emergency Medical Responder (EMR)',
      'School safety coordinator',
      'Workplace safety officer',
      'First responder positions',
      'Community health worker',
      'Security and safety roles',
      'Entry-level emergency technician',
      'Healthcare support positions',
      'Average salary: $35,000-$45,000/year',
    ],
    requirements: [
      'High school diploma or GED required for national certification',
      '18 years or older',
      'Able to read and follow written and verbal instructions',
      'Physical ability to perform emergency response duties',
      'No previous medical training required',
      'Background check required',
      'Application deadline: Apply 2 weeks prior to preferred start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=emergency-health-safety',
    },
    price: 4950,
  },
  {
    slug: 'home-health-aide',
    name: 'Home Health Aide Certification',
    heroTitle: 'Home Health Aide Certification Program',
    heroSubtitle: '4-week program to become a certified Home Health Aide',
    shortDescription:
      'Comprehensive training for in-home patient care with HHA licensure and CPR certification',
    longDescription: `The Home Health Aide Certification program prepares you to provide compassionate, professional care to patients in their homes. In 4 weeks, you'll earn your Home Health Aide (HHA) license, Certified Community Healthcare Worker (CCHW) certification, CPR certification, and Rise Up career readiness credentials. This program includes OSHA-compliant safety training through CareerSafe, covering bloodborne pathogens, infection control, and patient safety. This comprehensive training combines medical knowledge with practical caregiving skills, preparing you for a rewarding career helping those who need it most.`,
    heroImage: '/images/programs/home-health-aide.jpg',
    heroImageAlt: 'Home health aide caring for patient',
    duration: '4 weeks',
    schedule: 'Full-time or Part-time options available',
    delivery: 'Hybrid - Online coursework + In-person clinical training',
    credential:
      'Home Health Aide (HHA) License, Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate',
    approvals: [
      'ETPL Approved - Program ID #10004626',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,700',
    ],
    highlights: [
      'Home Health Aide state licensure',
      'Certified Community Healthcare Worker',
      'CPR certified',
      'Rise Up career readiness',
      'Fast 4-week completion',
      'High-demand career',
    ],
    whatYouLearn: [
      'Patient care and assistance',
      'Vital signs monitoring',
      'Medication reminders',
      'Personal hygiene assistance',
      'Meal preparation and nutrition',
      'Mobility and transfer techniques',
      'CPR and First Aid',
      'Documentation and reporting',
      'Communication with healthcare teams',
    ],
    outcomes: [
      'Home Health Aide positions',
      'In-home care provider',
      'Senior care facilities',
      'Hospice care roles',
      'Average salary: $28,000-$38,000/year',
      'Flexible scheduling options',
    ],
    requirements: [
      'High school diploma or GED',
      '18 years or older',
      'Background check required',
      'Immunizations required',
      'Compassionate and patient demeanor',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=home-health-aide',
    },
    price: 4700,
  },
  {
    slug: 'esthetician-apprenticeship',
    name: 'Esthetician Apprenticeship',
    heroTitle:
      'Indiana Esthetician Apprenticeship - Licensed Esthetician Training',
    heroSubtitle:
      'Become a licensed esthetician through on-the-job training at a spa or salon. Unlike the barber apprenticeship, esthetician apprenticeships in Indiana require partnership with a licensed cosmetology school.',
    shortDescription:
      'Earn your Indiana esthetician license through apprenticeship. Work at a spa/salon while completing required instruction hours through a partnered cosmetology school. Different requirements than barber apprenticeship.',
    longDescription: `## IMPORTANT: Esthetician Apprenticeship Is Different from Barber Apprenticeship

**Unlike the barber apprenticeship (which has House Bill 1135 and 1320), there is NO similar legislation for esthetician apprenticeships in Indiana.**

Esthetician apprenticeships in Indiana follow **different rules** set by the Indiana Professional Licensing Agency and Indiana State Board of Cosmetology and Barber Examiners.

---

## How Esthetician Apprenticeship Works in Indiana

### The Key Difference: School Partnership Required

**Barber Apprenticeship:**
- Shop can sponsor apprentice directly
- 144 hours of theory can be done online
- Shop handles all training

**Esthetician Apprenticeship:**
- ❌ Spa/salon CANNOT sponsor apprentice alone
- ✅ Must partner with a licensed cosmetology school
- ✅ School provides required classroom instruction
- ✅ Spa/salon provides practical training
- Split model: School + Workplace

---

## Indiana Esthetician Licensing Requirements

**To become a licensed esthetician in Indiana, you must complete:**

**Option 1: Traditional Cosmetology School**
- 700 hours at a licensed cosmetology school
- All instruction at the school
- Graduate and take state board exam

**Option 2: Apprenticeship (School + Spa Partnership)**
- 700 hours total training
- Split between licensed school and approved spa/salon
- Typically: 350 hours classroom + 350 hours practical
- Must be coordinated by licensed cosmetology school
- Graduate and take state board exam

---

## Requirements for Esthetician Apprenticeship

### For Students

**You must:**
- ✅ Be at least 17 years old (Indiana Code 25-8-3-3)
- ✅ Have high school diploma or GED
- ✅ Enroll in a licensed Indiana cosmetology school
- ✅ School arranges apprenticeship placement with approved spa/salon
- ✅ Complete 700 hours total (classroom + practical)
- ✅ Pass Indiana State Board esthetician exam

**You cannot:**
- ❌ Start apprenticeship without school enrollment
- ❌ Work at any spa/salon (must be school-approved)
- ❌ Complete training without licensed instructor supervision

---

### For Spas/Salons (Program Holders)

**To host esthetician apprentices, your spa/salon must:**

**1. Partner with Licensed Cosmetology School**
- ✅ Must have formal agreement with Indiana-licensed cosmetology school
- ✅ School coordinates apprenticeship program
- ✅ School provides curriculum and oversight
- ✅ School tracks student hours
- ✅ School certifies completion

**2. Meet Facility Requirements**
- ✅ Licensed by Indiana State Board of Cosmetology
- ✅ Proper equipment for esthetician services
- ✅ Sanitation and safety standards met
- ✅ Adequate workspace for apprentice training

**3. Have Licensed Supervision**
- ✅ Must have licensed esthetician on staff with 2+ years experience
- ✅ Licensed esthetician must supervise all apprentice work
- ✅ Cannot leave apprentice unsupervised with clients

**4. Follow School's Training Plan**
- ✅ Provide practical training per school's curriculum
- ✅ Track apprentice hours and report to school
- ✅ Allow school inspections and oversight
- ✅ Ensure apprentice meets competency standards

---

## The Process: Step-by-Step

### Step 1: Enroll in Licensed Cosmetology School

**You must start here:**
- Find an Indiana-licensed cosmetology school that offers esthetician apprenticeship programs
- Not all schools offer apprenticeship options (most do traditional 700-hour programs)
- Enroll in their esthetician program
- Pay tuition to the school (funding may be available through WIOA, WRG)

**Schools that may offer apprenticeship options:**
- Contact Indiana cosmetology schools directly
- Ask: "Do you offer esthetician apprenticeship programs with spa/salon partnerships?"

---

### Step 2: School Arranges Apprenticeship Placement

**The school (not you) coordinates:**
- School has agreements with approved spas/salons
- School matches you with a placement
- School ensures spa/salon meets requirements
- School creates training schedule (classroom + practical hours)

**Typical split:**
- 350 hours classroom instruction at school
- 350 hours practical training at spa/salon
- OR other combinations totaling 700 hours

---

### Step 3: Complete Classroom Instruction

**At the cosmetology school:**
- Skin anatomy and physiology
- Facial treatments and techniques
- Hair removal (waxing, threading)
- Makeup application
- Sanitation and safety
- Indiana laws and regulations
- Client consultation
- Business and ethics

**Instruction must be provided by:**
- Licensed cosmetology instructor
- At licensed cosmetology school facility
- Following Indiana-approved curriculum

---

### Step 4: Complete Practical Training at Spa/Salon

**At your apprenticeship placement:**
- Work under supervision of licensed esthetician
- Perform services on real clients
- Practice techniques learned in school
- Build skills and confidence
- Earn money (if spa pays apprentices)

**Supervision requirements:**
- Licensed esthetician must be present
- Apprentice cannot work alone with clients
- All work must be supervised until licensed

---

### Step 5: School Certifies Completion

**When you complete 700 hours:**
- School verifies all hours (classroom + practical)
- School submits completion documentation to Indiana State Board
- You receive certificate of completion from school
- You're eligible to take state board exam

---

### Step 6: Take State Board Exam

**Indiana State Board of Cosmetology and Barber Examiners:**
- Written exam (theory, laws, safety)
- Practical exam (demonstrate esthetician skills)
- Passing score: 75%
- Exam fee: Approximately $100-150

**Once you pass:**
- Apply for Indiana esthetician license
- License fee: Approximately $50
- Valid for 2 years
- Renewable with continuing education

---

## Payment and Wages: The Critical Difference from Barber Apprenticeship

### Barber Apprenticeship vs. Esthetician Apprenticeship Payment

**BARBER APPRENTICESHIP (House Bill 1135/1320):**
- ✅ You're an EMPLOYEE from day one
- ✅ Shop pays you $10/hour + commissions + tips
- ✅ You earn $20,000-$30,000 while training
- ✅ Funding (WIOA/WRG/JRI) covers your RTI curriculum
- ✅ You pay NOTHING for training
- ✅ You graduate debt-free with money in your pocket

**ESTHETICIAN APPRENTICESHIP (Traditional Cosmetology Rules):**
- ❌ You're a STUDENT, not an employee (usually)
- ❌ You pay tuition to the school ($5,000-$12,000)
- ❌ Most spas don't pay you during training
- ✅ Funding (WIOA/WRG) can cover tuition
- ❌ You typically don't earn wages during training
- ✅ You graduate with license but no earnings from training

**This is the BIGGEST difference between the two programs.**

---

## Esthetician Apprenticeship Payment Scenarios

### Scenario 1: Traditional Student Model (Most Common - 90% of programs)

**How it works:**
- You enroll in cosmetology school as a student
- You pay tuition: $5,000-$12,000 for 700-hour program
- School arranges your spa placement
- You work at spa as part of your training
- **Spa does NOT pay you wages**
- You're gaining experience and completing required hours

**Your costs:**
- Tuition: $5,000-$12,000 (can be covered by WIOA/WRG)
- Books and supplies: $500-$1,000
- State board exam: $100-$150
- License fee: $50

**Your earnings during training:**
- $0 from spa/salon
- You may work another job to support yourself
- Tips from clients (if spa allows): $0-$100/week

**Example weekly schedule:**
- Monday-Tuesday: Classroom at school (no pay)
- Wednesday-Friday: Practical training at spa (no pay)
- Saturday-Sunday: Work another job to pay bills

**Total time:** 6-12 months depending on full-time or part-time

**Financial outcome:**
- Spent: $5,000-$12,000 (or $0 if funded)
- Earned: $0 during training
- After licensing: Earn $30,000-$50,000/year

---

### Scenario 2: Paid Apprenticeship Model (Rare - 5% of programs)

**How it works:**
- You enroll in cosmetology school as a student
- You pay tuition: $5,000-$12,000
- School arranges placement with spa that pays apprentices
- **Spa pays you minimum wage ($7.25-$10/hour)**
- You're both student AND employee

**Your costs:**
- Tuition: $5,000-$12,000 (can be covered by WIOA/WRG)
- Books and supplies: $500-$1,000
- State board exam: $100-$150
- License fee: $50

**Your earnings during training:**
- Hourly wage: $7.25-$10/hour
- 20-30 hours/week at spa = $145-$300/week
- Tips from clients: $20-$50/week
- **Total: $165-$350/week**

**Example weekly schedule:**
- Monday-Tuesday: Classroom at school (no pay)
- Wednesday-Friday: Work at spa (get paid $8/hour)
- 25 hours/week × $8 = $200/week
- Over 6 months: $200 × 26 weeks = $5,200 earned

**Financial outcome:**
- Spent: $5,000-$12,000 tuition (or $0 if funded)
- Earned: $5,000-$8,000 during training
- After licensing: Earn $30,000-$50,000/year

**Why this is rare:**
- Most spas don't want to pay students who are still learning
- Liability concerns (student mistakes)
- Prefer to hire licensed estheticians

---

### Scenario 3: Work-Study or Tuition Offset Model (Very Rare - 5% of programs)

**How it works:**
- School partners with spa for special arrangement
- Spa agrees to cover part or all of your tuition
- You work at spa during training (unpaid or low wage)
- In exchange, spa pays your school tuition

**Your costs:**
- Tuition: $0 (spa pays school directly)
- Books and supplies: $500-$1,000
- State board exam: $100-$150
- License fee: $50

**Your earnings during training:**
- Hourly wage: $0-$7/hour (varies)
- Tips from clients: $20-$50/week
- **Total: $20-$100/week**

**The trade-off:**
- You don't pay tuition
- But you also don't earn much during training
- Spa invests in you with expectation you'll work there after licensing

**Financial outcome:**
- Spent: $0 tuition (spa covers)
- Earned: $1,000-$3,000 during training
- After licensing: Must work at spa for 1-2 years (typically)

---

## Side-by-Side Comparison: Barber vs. Esthetician Apprenticeship

| Factor | Barber Apprenticeship | Esthetician Apprenticeship |
|--------|----------------------|---------------------------|
| **Legislation** | House Bill 1135 & 1320 | Traditional cosmetology rules |
| **School Required?** | No (shop can sponsor directly) | Yes (must partner with school) |
| **Your Status** | Employee | Student (usually) |
| **Wages During Training** | $10/hour + commissions + tips | Usually $0 (student model) |
| **Tuition Cost** | $0 (funding covers RTI) | $5,000-$12,000 (can be funded) |
| **Earnings During Training** | $20,000-$30,000 | $0-$8,000 (if paid model) |
| **Training Hours** | 2,000 hours OJT + 144 RTI | 700 hours total |
| **Training Duration** | 15-17 months | 6-12 months |
| **Who Pays You** | Barbershop (employer) | Usually no one (you're student) |
| **Commission on Services** | Yes (40-60%) | No (you're student) |
| **Tips** | Yes (100%) | Maybe (if spa allows) |
| **Booth Rent Option** | Yes (month 12+) | No (not until licensed) |
| **Financial Outcome** | Graduate with $20k-$30k earned | Graduate with $0-$8k earned |
| **Debt** | $0 (no tuition) | $0 if funded, $5k-$12k if not |

---

## Can Esthetician Apprentices Earn While They Learn?

**Short answer: Usually no, but it depends on the spa and school arrangement.**

### Why Most Esthetician Apprentices Don't Get Paid

**1. You're a student, not an employee**
- Cosmetology schools treat apprentices as students
- Students pay tuition, they don't earn wages
- This is standard in cosmetology education

**2. Liability and insurance**
- Spas are nervous about unlicensed students working on clients
- Insurance may not cover student mistakes
- Easier to have students observe and practice, not earn money

**3. Shorter training period**
- 700 hours vs. 2,000 hours for barbers
- 6-12 months vs. 15-17 months
- Spas see it as short-term training, not long-term employment

**4. No legislation requiring payment**
- Barber apprenticeship has laws requiring employment status
- Esthetician apprenticeship has no such laws
- Schools and spas follow traditional student model

---

## How to Find a PAID Esthetician Apprenticeship

**If you want to earn while you learn, here's how:**

**Step 1: Ask cosmetology schools directly**
- "Do you have any spa partners that pay apprentices?"
- "Are there work-study or paid apprenticeship options?"
- "Can I work part-time at the spa while training?"

**Step 2: Look for spas with apprenticeship programs**
- Some high-end spas invest in training their own estheticians
- They may pay minimum wage during training
- In exchange, you commit to working there after licensing

**Step 3: Negotiate with the spa**
- If school places you at a spa, ask about payment
- "Is there any compensation during my apprenticeship?"
- "Can I earn tips from clients I serve?"
- Some spas may offer small stipend or tip-sharing

**Step 4: Consider hybrid approach**
- Work part-time at another job while doing apprenticeship
- Do apprenticeship part-time (takes longer but you can work)
- Save money before starting program

---

## Funding Options to Cover Tuition

**The instructional portion (classroom hours at cosmetology school) can be 100% funded through WIOA or Workforce Ready Grant.**

### WIOA Funding (Workforce Innovation and Opportunity Act)

**Who qualifies:**
- Low-income adults
- Dislocated workers
- Youth ages 16-24

**What WIOA covers for esthetician apprenticeship:**
- ✅ Full tuition for 700-hour esthetician program ($5,000-$12,000)
- ✅ Books and supplies
- ✅ State board exam fees
- ✅ License application fee
- ✅ Support services (transportation, childcare if eligible)

**What WIOA does NOT cover:**
- ❌ Your wages at spa/salon (most spas don't pay apprentices)
- ❌ Your living expenses during training

**How it works:**
1. Apply for WIOA through Indiana Career Connect at [IndianaCareerConnect.com](https://www.indianacareerconnect.com)
2. WIOA approves your funding
3. WIOA pays the cosmetology school directly for your tuition
4. You enroll in school's esthetician apprenticeship program
5. School arranges your spa placement
6. You complete 700 hours (classroom + practical)
7. You pay $0 out of pocket for training

**Application process:**
- Create Indiana Career Connect account
- Complete WIOA application
- Meet with career counselor
- Provide income documentation
- Get approved (typically 2-4 weeks)
- Enroll in approved cosmetology school

---

### Workforce Ready Grant (WRG)

**Who qualifies:**
- Indiana residents
- Pursuing high-demand careers (esthetician qualifies)
- Any income level (no income restrictions like WIOA)

**What WRG covers:**
- ✅ Full tuition for 700-hour esthetician program
- ✅ Books and fees

**What WRG does NOT cover:**
- ❌ Your wages at spa/salon
- ❌ Support services (transportation, childcare)

**How it works:**
1. Apply through your local WorkOne office
2. Find locations at [WorkOne.in.gov](https://www.in.gov/dwd/workone/)
3. WRG approves your funding
4. WRG pays the cosmetology school directly
5. You enroll and complete training
6. You pay $0 out of pocket

**Application process:**
- Visit local WorkOne office
- Complete WRG application
- Provide proof of Indiana residency
- Get approved (typically 1-2 weeks)
- Enroll in approved cosmetology school

---

### Federal Student Aid (FAFSA)

**If you don't qualify for WIOA or WRG:**
- Some cosmetology schools accept federal student aid
- Complete FAFSA at [studentaid.gov](https://studentaid.gov)
- Pell Grants may cover tuition (no repayment required)
- Federal student loans available (must be repaid)

**Pros:**
- Available to most students
- Pell Grants don't need to be repaid

**Cons:**
- Student loans create debt
- Not all cosmetology schools accept FAFSA

---

### School Payment Plans

**If you don't qualify for any funding:**
- Most cosmetology schools offer payment plans
- Pay $200-$500/month over 12-24 months
- No interest or low interest
- Start training while making payments

---

### JRI Funding (Justice Reinvestment Initiative)

**For justice-involved individuals:**
- JRI covers full tuition for esthetician training
- Plus wraparound support services
- Apply through probation officer or reentry program
- See JRI section in barber apprenticeship for details

---

## The Bottom Line: Funding for Esthetician Apprenticeship

**The instructional portion (classroom training at cosmetology school) is 100% funded through:**
- WIOA (most common)
- Workforce Ready Grant
- JRI (for justice-involved individuals)
- Federal Student Aid (Pell Grants)

**You pay $0 out of pocket for the instructional portion if you qualify for funding.**

**However:**
- Most spas don't pay you wages during apprenticeship
- You're responsible for your living expenses
- You may need to work another job while training

**With WIOA or WRG funding, your only costs are:**
- Living expenses (rent, food, transportation)
- Time commitment (6-12 months)

**After licensing, you earn $30,000-$50,000/year as a licensed esthetician.**

---

## Spa and Salon Options for Esthetician Apprenticeships

### Types of Spas/Salons That Can Host Apprentices

**Not all spas and salons can host esthetician apprentices. They must partner with a licensed cosmetology school.**

**Eligible facilities:**

**1. Day Spas**
- Full-service spas offering facials, body treatments, waxing
- Must have licensed esthetician with 2+ years experience
- Must partner with cosmetology school
- Examples: Massage Envy, Hand & Stone, local day spas

**2. Medical Spas (Med Spas)**
- Spas offering medical-grade treatments
- Supervised by physician or nurse practitioner
- Must have licensed esthetician on staff
- Must partner with cosmetology school
- Examples: Dermatology offices with spa services, plastic surgery centers

**3. Full-Service Salons**
- Hair salons that also offer skincare services
- Must have separate esthetician area
- Must have licensed esthetician with 2+ years experience
- Must partner with cosmetology school
- Examples: Ulta Beauty, local full-service salons

**4. Resort/Hotel Spas**
- Spas located in hotels or resorts
- Must have licensed esthetician with 2+ years experience
- Must partner with cosmetology school
- Examples: Hotel spa facilities, resort wellness centers

**5. Wellness Centers**
- Holistic health centers offering skincare
- Must have licensed esthetician on staff
- Must partner with cosmetology school
- Examples: Yoga studios with spa services, wellness clinics

---

### Requirements for Spas/Salons to Host Apprentices

**To host esthetician apprentices, your spa/salon must:**

**1. Partner with Licensed Cosmetology School**
- ✅ Formal written agreement with Indiana-licensed cosmetology school
- ✅ School coordinates apprenticeship program
- ✅ School provides curriculum and oversight
- ✅ School tracks student hours
- ✅ School certifies completion

**2. Meet Facility Requirements**
- ✅ Licensed by Indiana State Board of Cosmetology
- ✅ Proper equipment for esthetician services (facial beds, steamers, waxing supplies)
- ✅ Sanitation and safety standards met
- ✅ Adequate workspace for apprentice training (dedicated treatment room)
- ✅ Proper ventilation and lighting
- ✅ Complies with all health codes

**3. Have Licensed Supervision**
- ✅ Licensed esthetician on staff with minimum 2 years professional experience
- ✅ Licensed esthetician must supervise all apprentice work
- ✅ Cannot leave apprentice unsupervised with clients
- ✅ Supervisor must be available during all apprentice working hours

**4. Follow School's Training Plan**
- ✅ Provide practical training per school's curriculum
- ✅ Track apprentice hours and report to school
- ✅ Allow school inspections and oversight
- ✅ Ensure apprentice meets competency standards
- ✅ Provide feedback to school on apprentice progress

**5. Maintain Proper Insurance**
- ✅ General liability insurance
- ✅ Professional liability insurance
- ✅ Workers' compensation (if apprentice is paid employee)

---

### How Spas/Salons Become Apprenticeship Partners

**Step 1: Contact Cosmetology Schools**
- Reach out to Indiana-licensed cosmetology schools
- Ask about their esthetician apprenticeship programs
- Express interest in hosting apprentices

**Step 2: Meet School Requirements**
- School evaluates your facility
- School verifies your esthetician's license and experience
- School ensures you meet all requirements

**Step 3: Sign Partnership Agreement**
- Formal agreement outlining responsibilities
- Training schedule and curriculum
- Hour tracking and reporting procedures
- Supervision requirements
- Duration of partnership

**Step 4: Receive Apprentice Placement**
- School matches apprentice with your spa/salon
- School provides training materials and curriculum
- You begin providing practical training

**Step 5: Track and Report Hours**
- Document apprentice hours daily/weekly
- Report to school monthly
- Provide feedback on apprentice progress
- Coordinate with school on any issues

---

### Benefits for Spas/Salons Hosting Apprentices

**Why host an apprentice:**

**1. Build Your Team**
- Train esthetician your way
- Develop loyalty (apprentices often stay long-term)
- Mold skills to match your spa's style
- Create pipeline of qualified staff

**2. Low-Cost Labor (If Unpaid Model)**
- Apprentice provides services under supervision
- You don't pay wages (most common model)
- School covers apprentice's tuition
- You provide training and experience

**3. Paid Labor (If Paid Model - Rare)**
- Some spas pay apprentices minimum wage
- Apprentice is both student and employee
- You invest in their training
- They're more committed to staying after licensing

**4. Community Reputation**
- Known as training facility
- Attracts quality applicants
- Gives back to the profession
- Builds relationships with cosmetology schools

**5. Fresh Perspectives**
- Apprentices bring new ideas and techniques
- Learn latest trends from school
- Energize your team
- Keep your spa current

---

### Spa/Salon Responsibilities During Apprenticeship

**What you must provide:**

**1. Supervision**
- Licensed esthetician supervises all apprentice work
- Cannot leave apprentice alone with clients
- Provide real-time coaching and feedback
- Ensure client safety and satisfaction

**2. Training Opportunities**
- Allow apprentice to perform services on real clients
- Provide variety of services (facials, waxing, treatments)
- Expose apprentice to different skin types and conditions
- Teach spa-specific techniques and protocols

**3. Equipment and Supplies**
- Provide all necessary equipment (facial beds, steamers, tools)
- Provide products (cleansers, masks, waxing supplies)
- Provide sanitation equipment
- Provide uniforms or dress code guidance

**4. Documentation**
- Track apprentice hours daily/weekly
- Report hours to school monthly
- Document services performed
- Provide progress reports to school

**5. Professional Environment**
- Treat apprentice with respect
- Provide constructive feedback
- Model professional behavior
- Create positive learning environment

---

### What Spas/Salons CANNOT Do

**Prohibited practices:**

❌ **Cannot host apprentice without school partnership**
- You must have formal agreement with cosmetology school
- Random work experience doesn't count toward licensure

❌ **Cannot leave apprentice unsupervised**
- Licensed esthetician must be present at all times
- Apprentice cannot work alone with clients

❌ **Cannot count hours without school verification**
- Only school-verified hours count toward licensure
- You cannot independently certify apprentice hours

❌ **Cannot skip required training components**
- Must follow school's approved curriculum
- Cannot rush apprentice through program

❌ **Cannot charge apprentice for training**
- Apprentice pays tuition to school, not to you
- You cannot charge "training fees" or "equipment fees"

❌ **Cannot require apprentice to pay booth rent**
- Apprentice is student, not independent contractor
- Booth rental only for licensed estheticians

---

### Payment Options for Spas/Salons

**Option 1: Unpaid Apprenticeship (Most Common - 90%)**

**How it works:**
- Apprentice is student, not employee
- You provide training and experience
- You don't pay wages
- Apprentice pays tuition to school (covered by WIOA/WRG)
- You provide equipment and supplies

**Your costs:**
- Equipment and supplies: $50-100/month per apprentice
- Supervisor time: Included in esthetician's regular duties
- No wages paid

**Benefits:**
- Low cost to you
- Apprentice gains experience
- You're giving back to profession

---

**Option 2: Paid Apprenticeship (Rare - 5-10%)**

**How it works:**
- Apprentice is both student AND employee
- You pay minimum wage ($7.25-$10/hour)
- Apprentice pays tuition to school (covered by WIOA/WRG)
- You provide equipment, supplies, and wages

**Your costs:**
- Wages: $7.25-$10/hour × 15-25 hours/week = $109-$250/week
- Equipment and supplies: $50-100/month
- Total: $500-$1,100/month per apprentice

**Benefits:**
- Apprentice is more committed (earning money)
- You have more control (they're your employee)
- Apprentice likely to stay after licensing
- You're investing in your future team

**When this makes sense:**
- High-end spa with resources to invest
- Want to ensure apprentice stays after licensing
- Need extra help and can afford to pay
- Building long-term team

---

**Option 3: Tuition Offset Model (Very Rare - <5%)**

**How it works:**
- You pay apprentice's tuition to school
- Apprentice works at your spa (unpaid or low wage)
- Apprentice commits to working for you after licensing

**Your costs:**
- Tuition: $5,000-$12,000 (one-time)
- Equipment and supplies: $50-100/month
- Wages: $0-$7/hour (if any)

**Benefits:**
- Apprentice has no debt
- Apprentice is very committed to you
- You secure future employee
- Strong loyalty and retention

**Conditions:**
- Apprentice signs agreement to work for you 1-2 years after licensing
- If apprentice leaves early, may owe back tuition
- Legal agreement required

---

### Current Spas/Salons Partnering with Schools

**To find spas/salons hosting apprentices:**

**Contact these Indiana cosmetology schools:**
- Aveda Fredric's Institute (Indianapolis)
- Paul Mitchell The School (Indianapolis, Fort Wayne)
- Tricoci University (Indianapolis)
- Ravenscroft Beauty College (Fort Wayne)
- Merrillville Beauty College (Merrillville)
- PJ's College of Cosmetology (multiple locations)

**Ask:**
- "Do you have esthetician apprenticeship programs?"
- "Which spas/salons do you partner with?"
- "How can I get placed at a spa for my apprenticeship?"

**We can also help connect you:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- We work with schools and spas to facilitate placements

---

### For Spas/Salons: How to Get Started

**Interested in hosting esthetician apprentices?**

**Step 1: Contact us**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- Tell us about your spa/salon

**Step 2: We connect you with cosmetology schools**
- We introduce you to schools with apprenticeship programs
- We help facilitate partnership agreements
- We guide you through requirements

**Step 3: Get approved**
- School evaluates your facility
- School verifies your esthetician's credentials
- Partnership agreement signed

**Step 4: Receive apprentice placements**
- School matches apprentices with your spa
- You begin providing training
- We provide ongoing support

**Benefits of working with us:**
- ✅ We handle school coordination
- ✅ We help with paperwork and agreements
- ✅ We provide guidance on best practices
- ✅ We support both you and the apprentice
- ✅ We help resolve any issues

---

### The Bottom Line: Spa/Salon Apprenticeships

**For Esthetician Apprentices:**
- ✅ Must be placed through cosmetology school
- ✅ Cannot just work at any spa and count hours
- ✅ School coordinates everything
- ✅ Most placements are unpaid (you're a student)
- ✅ WIOA/WRG covers your tuition
- ✅ You gain real-world experience

**For Spas/Salons:**
- ✅ Must partner with cosmetology school
- ✅ Cannot host apprentices independently
- ✅ Most don't pay apprentices (unpaid model)
- ✅ Low cost way to train future employees
- ✅ Builds reputation and gives back to profession

**Contact us to get connected:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

---

---

## After You Get Licensed: Earning Potential

**Once you're a licensed esthetician:**

### Employment Options

**Option 1: Spa/Salon Employee**
- Hourly wage: $12-$18/hour
- Commission: 30-50% of services
- Tips: 15-20% of service price
- Benefits: Some spas offer health insurance, PTO
- **Annual earnings: $30,000-$45,000**

**Option 2: Commission-Only**
- Commission: 50-60% of services
- Tips: 100%
- No base wage
- **Annual earnings: $35,000-$50,000** (if busy)

**Option 3: Booth Rental**
- Pay $100-$300/week rent
- Keep 100% of service revenue
- Keep 100% of tips
- **Annual earnings: $40,000-$70,000** (if strong clientele)

**Option 4: Mobile Esthetician**
- Travel to clients' homes
- Set your own prices
- Keep 100% of revenue
- **Annual earnings: $35,000-$60,000** (varies widely)

---

## The Bottom Line: Payment Differences

**Barber Apprenticeship:**
- You're an employee earning $20,000-$30,000 while training
- No tuition cost
- Graduate debt-free with money saved

**Esthetician Apprenticeship:**
- You're a student paying $5,000-$12,000 tuition (or $0 with funding)
- Usually no wages during training
- Graduate with license but no earnings from training

**Why the difference?**
- Barber apprenticeship has specific legislation (HB 1135/1320)
- Esthetician apprenticeship follows traditional cosmetology education model
- Until similar legislation passes for estheticians, this is how it works

**Our recommendation:**
- Apply for WIOA or Workforce Ready Grant to cover tuition
- Look for paid apprenticeship opportunities (rare but exist)
- Work part-time while training to support yourself
- Focus on getting licensed quickly, then earn good money as licensed esthetician

---

## Funding Options

**Tuition for 700-hour esthetician program:**
- Typically $5,000-$12,000 depending on school
- Apprenticeship programs may cost less than traditional programs

**Funding available:**
- **WIOA:** Covers tuition for eligible students
- **Workforce Ready Grant:** Covers tuition for Indiana residents
- **Federal Student Aid:** Some schools accept FAFSA
- **Payment plans:** Most schools offer monthly payments

---

## Current Status in Indiana

**As of 2025:**
- ❌ No legislation like House Bill 1135/1320 for estheticians
- ❌ No standalone esthetician apprenticeship without school
- ✅ Apprenticeship must be coordinated by licensed cosmetology school
- ✅ School + spa partnership model is the only option

**Advocacy efforts:**
- Some industry groups are working toward legislation similar to barber apprenticeship
- No bills currently pending
- Until legislation passes, school partnership is required

---

## How We Can Help

**For Students:**
- Connect you with cosmetology schools offering apprenticeship programs
- Help you apply for WIOA or Workforce Ready Grant funding
- Provide career counseling and support

**For Spas/Salons:**
- Connect you with cosmetology schools seeking spa partners
- Help you understand requirements for hosting apprentices
- Provide guidance on partnership agreements

**Contact us:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

---

## FAQs

### "Why can't I do esthetician apprenticeship like barber apprenticeship?"

**Because Indiana law is different for estheticians.**
- Barber apprenticeship has specific legislation (HB 1135, HB 1320)
- Esthetician apprenticeship follows older cosmetology rules
- Cosmetology rules require licensed school involvement
- Until new legislation passes, school partnership is required

### "Can I work at a spa and count those hours toward my license?"

**No, not without school enrollment.**
- Hours only count if you're enrolled in licensed cosmetology school
- School must coordinate and verify your hours
- Working at a spa without school enrollment doesn't count

### "Do I have to go to school full-time?"

**Depends on the school's apprenticeship program.**
- Some schools offer part-time apprenticeship options
- You attend school part-time + work at spa part-time
- Takes longer but allows you to work
- Ask schools about their apprenticeship schedules

### "Can I transfer hours from another state?"

**Maybe, depends on the state.**
- Contact Indiana State Board of Cosmetology
- Submit transcripts from your previous school
- Board evaluates and approves eligible hours
- You complete remaining hours in Indiana

---

## Contact Information

**Indiana State Board of Cosmetology and Barber Examiners**
- Phone: (317) 234-3040
- Address: 402 W. Washington St., Room W072, Indianapolis, IN 46204
- Website: [in.gov/pla/professions/cosmetology-board](https://www.in.gov/pla/professions/cosmetology-board/)

**For questions about esthetician apprenticeship, ask:**
- "Which cosmetology schools offer esthetician apprenticeship programs?"
- "What are the requirements for spa/salon partnerships?"
- "How do I transfer hours from another state?"

---

**Bottom Line:** Esthetician apprenticeship in Indiana requires partnership with a licensed cosmetology school. You cannot do it independently like the barber apprenticeship.`,
    heroImage: '/images/programs/esthetician-apprentice.jpg',
    heroImageAlt:
      'Esthetician apprentice performing facial treatment under supervision',
    duration: '700 hours (6-12 months depending on schedule)',
    schedule: 'Varies by school and spa partnership',
    delivery:
      'Hybrid: Classroom instruction at school + Practical training at spa/salon',
    credential: 'Indiana Licensed Esthetician (upon passing state board exam)',
    approvals: [
      'Must be coordinated by Indiana-licensed cosmetology school',
      'Indiana State Board of Cosmetology approved',
      'WIOA Eligible (for tuition)',
      'Workforce Ready Grant Eligible (for tuition)',
    ],
    fundingOptions: [
      'WIOA Funding (covers tuition)',
      'Workforce Ready Grant (covers tuition)',
      'Federal Student Aid (if school accepts FAFSA)',
      'School payment plans',
    ],
    highlights: [
      'Earn Indiana esthetician license through apprenticeship',
      'Work at real spa/salon while training',
      'Must partner with licensed cosmetology school',
      'Different from barber apprenticeship (school required)',
      '700 hours total training',
      'Funding available through WIOA and WRG',
      'Licensed supervision required',
      'Graduate eligible for state board exam',
    ],
    whatYouLearn: [
      'Skin anatomy and physiology',
      'Facial treatments and procedures',
      'Hair removal techniques (waxing, threading)',
      'Makeup application',
      'Sanitation and infection control',
      'Client consultation and communication',
      'Indiana esthetician laws and regulations',
      'Business and professional ethics',
      'Product knowledge and retail sales',
      'Spa operations and customer service',
    ],
    outcomes: [
      'Licensed Esthetician in Indiana',
      'Spa esthetician',
      'Salon skincare specialist',
      'Medical spa esthetician',
      'Mobile esthetician (self-employed)',
      'Skincare product sales',
      'Average salary: $30,000-$50,000/year',
      'Self-employment potential',
    ],
    requirements: [
      'At least 17 years old',
      'High school diploma or GED',
      'Enroll in Indiana-licensed cosmetology school',
      'School arranges apprenticeship placement',
      'Complete 700 hours (classroom + practical)',
      'Pass Indiana State Board esthetician exam',
    ],
    ctaPrimary: {
      label: 'Contact Us',
      href: '/contact?topic=esthetician-apprenticeship',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact',
    },
  },
  {
    slug: 'nail-technician-apprenticeship',
    name: 'Nail Technician Apprenticeship',
    heroTitle:
      'Indiana Nail Technician Apprenticeship - Licensed Manicurist Training',
    heroSubtitle:
      'Become a licensed nail technician through on-the-job training at a salon. Like esthetician apprenticeship, nail tech apprenticeships in Indiana require partnership with a licensed cosmetology school.',
    shortDescription:
      'Earn your Indiana nail technician license through apprenticeship. Work at a salon while completing required instruction hours through a partnered cosmetology school. WIOA funding covers instructional costs.',
    longDescription: `## IMPORTANT: Nail Technician Apprenticeship Is Different from Barber Apprenticeship

**Unlike the barber apprenticeship (which has House Bill 1135 and 1320), there is NO similar legislation for nail technician apprenticeships in Indiana.**

Nail technician apprenticeships in Indiana follow **different rules** set by the Indiana Professional Licensing Agency and Indiana State Board of Cosmetology and Barber Examiners.

**This is the SAME model as esthetician apprenticeship—school partnership required.**

---

## How Nail Technician Apprenticeship Works in Indiana

### The Key Difference: School Partnership Required

**Barber Apprenticeship:**
- Shop can sponsor apprentice directly
- 144 hours of theory can be done online
- Shop handles all training

**Nail Technician Apprenticeship:**
- ❌ Salon CANNOT sponsor apprentice alone
- ✅ Must partner with a licensed cosmetology school
- ✅ School provides required classroom instruction
- ✅ Salon provides practical training
- Split model: School + Workplace

---

## Indiana Nail Technician Licensing Requirements

**To become a licensed nail technician in Indiana, you must complete:**

**Option 1: Traditional Cosmetology School**
- 450 hours at a licensed cosmetology school
- All instruction at the school
- Graduate and take state board exam

**Option 2: Apprenticeship (School + Salon Partnership)**
- 450 hours total training
- Split between licensed school and approved salon
- Typically: 225 hours classroom + 225 hours practical
- Must be coordinated by licensed cosmetology school
- Graduate and take state board exam

---

## Requirements for Nail Technician Apprenticeship

### For Students

**You must:**
- ✅ Be at least 17 years old (Indiana Code 25-8-3-3)
- ✅ Have high school diploma or GED
- ✅ Enroll in a licensed Indiana cosmetology school
- ✅ School arranges apprenticeship placement with approved salon
- ✅ Complete 450 hours total (classroom + practical)
- ✅ Pass Indiana State Board nail technician exam

**You cannot:**
- ❌ Start apprenticeship without school enrollment
- ❌ Work at any salon (must be school-approved)
- ❌ Complete training without licensed instructor supervision

---

### For Salons (Program Holders)

**To host nail technician apprentices, your salon must:**

**1. Partner with Licensed Cosmetology School**
- ✅ Must have formal agreement with Indiana-licensed cosmetology school
- ✅ School coordinates apprenticeship program
- ✅ School provides curriculum and oversight
- ✅ School tracks student hours
- ✅ School certifies completion

**2. Meet Facility Requirements**
- ✅ Licensed by Indiana State Board of Cosmetology
- ✅ Proper equipment for nail services
- ✅ Sanitation and safety standards met
- ✅ Adequate workspace for apprentice training
- ✅ Proper ventilation for nail products

**3. Have Licensed Supervision**
- ✅ Must have licensed nail technician on staff with 2+ years experience
- ✅ Licensed nail tech must supervise all apprentice work
- ✅ Cannot leave apprentice unsupervised with clients

**4. Follow School's Training Plan**
- ✅ Provide practical training per school's curriculum
- ✅ Track apprentice hours and report to school
- ✅ Allow school inspections and oversight
- ✅ Ensure apprentice meets competency standards

---

## The Process: Step-by-Step

### Step 1: Enroll in Licensed Cosmetology School

**You must start here:**
- Find an Indiana-licensed cosmetology school that offers nail technician apprenticeship programs
- Not all schools offer apprenticeship options (most do traditional 450-hour programs)
- Enroll in their nail technician program
- **WIOA or Workforce Ready Grant covers tuition**

**Schools that may offer apprenticeship options:**
- Contact Indiana cosmetology schools directly
- Ask: "Do you offer nail technician apprenticeship programs with salon partnerships?"

---

### Step 2: School Arranges Apprenticeship Placement

**The school (not you) coordinates:**
- School has agreements with approved salons
- School matches you with a placement
- School ensures salon meets requirements
- School creates training schedule (classroom + practical hours)

**Typical split:**
- 225 hours classroom instruction at school
- 225 hours practical training at salon
- OR other combinations totaling 450 hours

---

### Step 3: Complete Classroom Instruction

**At the cosmetology school:**
- Nail anatomy and physiology
- Manicure and pedicure techniques
- Nail enhancements (acrylics, gels, tips)
- Nail art and design
- Sanitation and safety
- Indiana laws and regulations
- Client consultation
- Business and ethics

**Instruction must be provided by:**
- Licensed cosmetology instructor
- At licensed cosmetology school facility
- Following Indiana-approved curriculum

---

### Step 4: Complete Practical Training at Salon

**At your apprenticeship placement:**
- Work under supervision of licensed nail technician
- Perform services on real clients
- Practice techniques learned in school
- Build skills and confidence
- Earn money (if salon pays apprentices - rare)

**Supervision requirements:**
- Licensed nail tech must be present
- Apprentice cannot work alone with clients
- All work must be supervised until licensed

---

### Step 5: School Certifies Completion

**When you complete 450 hours:**
- School verifies all hours (classroom + practical)
- School submits completion documentation to Indiana State Board
- You receive certificate of completion from school
- You're eligible to take state board exam

---

### Step 6: Take State Board Exam

**Indiana State Board of Cosmetology and Barber Examiners:**
- Written exam (theory, laws, safety)
- Practical exam (demonstrate nail services)
- Passing score: 75%
- Exam fee: Approximately $100-150

**Once you pass:**
- Apply for Indiana nail technician license
- License fee: Approximately $50
- Valid for 2 years
- Renewable with continuing education

---

## Payment and Wages: The Critical Difference from Barber Apprenticeship

### Barber Apprenticeship vs. Nail Technician Apprenticeship Payment

**BARBER APPRENTICESHIP (House Bill 1135/1320):**
- ✅ You're an EMPLOYEE from day one
- ✅ Shop pays you $10/hour + commissions + tips
- ✅ You earn $20,000-$30,000 while training
- ✅ You pay NOTHING for training
- ✅ You graduate debt-free with money in your pocket

**NAIL TECHNICIAN APPRENTICESHIP (Traditional Cosmetology Rules):**
- ❌ You're a STUDENT, not an employee (usually)
- ❌ You pay tuition to the school (covered by WIOA/WRG)
- ❌ Most salons don't pay you during training
- ✅ WIOA/WRG covers your tuition
- ❌ You typically don't earn wages during training
- ✅ You graduate with license but no earnings from training

---

## Nail Technician Apprenticeship Payment Scenarios

### Scenario 1: Traditional Student Model (Most Common - 95% of programs)

**How it works:**
- You enroll in cosmetology school as a student
- WIOA or WRG pays your tuition ($3,000-$8,000)
- School arranges your salon placement
- You work at salon as part of your training
- **Salon does NOT pay you wages**
- You're gaining experience and completing required hours

**Your costs:**
- Tuition: $0 (covered by WIOA/WRG)
- Books and supplies: $300-$500
- State board exam: $100-150
- License fee: $50
- **Total out-of-pocket: $450-$700**

**Your earnings during training:**
- $0 from salon
- You may work another job to support yourself
- Tips from clients (if salon allows): $0-$50/week

**Example weekly schedule:**
- Monday-Tuesday: Classroom at school (no pay)
- Wednesday-Friday: Practical training at salon (no pay)
- Saturday-Sunday: Work another job to pay bills

**Total time:** 4-8 months depending on full-time or part-time

**Financial outcome:**
- Spent: $450-$700 (supplies and fees)
- Earned: $0 during training
- After licensing: Earn $25,000-$45,000/year

---

### Scenario 2: Paid Apprenticeship Model (Very Rare - Less than 5%)

**How it works:**
- You enroll in cosmetology school as a student
- WIOA or WRG pays your tuition
- School arranges placement with salon that pays apprentices
- **Salon pays you minimum wage ($7.25-$10/hour)**
- You're both student AND employee

**Your costs:**
- Tuition: $0 (covered by WIOA/WRG)
- Books and supplies: $300-$500
- State board exam: $100-150
- License fee: $50

**Your earnings during training:**
- Hourly wage: $7.25-$10/hour
- 15-25 hours/week at salon = $109-$250/week
- Tips from clients: $20-$50/week
- **Total: $129-$300/week**

**Over 6 months:** $3,000-$7,000 earned

**Why this is very rare:**
- Most salons don't want to pay students who are still learning
- Liability concerns (student mistakes on clients' nails)
- Prefer to hire licensed nail techs

---

## Side-by-Side Comparison: Barber vs. Nail Tech Apprenticeship

| Factor | Barber Apprenticeship | Nail Tech Apprenticeship |
|--------|----------------------|--------------------------|
| **Legislation** | House Bill 1135 & 1320 | Traditional cosmetology rules |
| **School Required?** | No (shop can sponsor directly) | Yes (must partner with school) |
| **Your Status** | Employee | Student (usually) |
| **Wages During Training** | $10/hour + commissions + tips | Usually $0 (student model) |
| **Tuition Cost** | $0 (funding covers RTI) | $0 (WIOA/WRG covers) |
| **Earnings During Training** | $20,000-$30,000 | $0-$7,000 (if paid model) |
| **Training Hours** | 2,000 hours OJT + 144 RTI | 450 hours total |
| **Training Duration** | 15-17 months | 4-8 months |
| **Who Pays You** | Barbershop (employer) | Usually no one (you're student) |
| **Commission on Services** | Yes (40-60%) | No (you're student) |
| **Tips** | Yes (100%) | Maybe (if salon allows) |
| **Financial Outcome** | Graduate with $20k-$30k earned | Graduate with $0-$7k earned |
| **Debt** | $0 (no tuition) | $0 (WIOA/WRG covers tuition) |

---

## Funding Options to Cover Tuition

**The instructional portion (classroom hours at cosmetology school) is 100% funded through WIOA or Workforce Ready Grant.**

### WIOA Funding (Workforce Innovation and Opportunity Act)

**Who qualifies:**
- Low-income adults
- Dislocated workers
- Youth ages 16-24

**What WIOA covers:**
- ✅ Full tuition for 450-hour nail tech program ($3,000-$8,000)
- ✅ Books and supplies
- ✅ State board exam fees
- ✅ License application fee
- ✅ Support services (transportation, childcare if eligible)

**Apply through:** Indiana Career Connect at [IndianaCareerConnect.com](https://www.indianacareerconnect.com)

---

### Workforce Ready Grant (WRG)

**Who qualifies:**
- Indiana residents
- Pursuing high-demand careers (nail tech qualifies)
- Any income level

**What WRG covers:**
- ✅ Full tuition for 450-hour nail tech program
- ✅ Books and fees

**Apply through:** Local WorkOne office at [WorkOne.in.gov](https://www.in.gov/dwd/workone/)

---

### JRI Funding (Justice Reinvestment Initiative)

**For justice-involved individuals:**
- JRI covers full tuition for nail tech training
- Plus wraparound support services
- Apply through probation officer or reentry program

---

## After You Get Licensed: Earning Potential

**Once you're a licensed nail technician:**

### Employment Options

**Option 1: Salon Employee**
- Hourly wage: $10-$15/hour
- Commission: 30-50% of services
- Tips: 15-20% of service price
- **Annual earnings: $25,000-$40,000**

**Option 2: Commission-Only**
- Commission: 50-60% of services
- Tips: 100%
- No base wage
- **Annual earnings: $30,000-$45,000** (if busy)

**Option 3: Booth Rental**
- Pay $75-$200/week rent
- Keep 100% of service revenue
- Keep 100% of tips
- **Annual earnings: $35,000-$60,000** (if strong clientele)

**Option 4: Mobile Nail Tech**
- Travel to clients' homes
- Set your own prices
- Keep 100% of revenue
- **Annual earnings: $30,000-$50,000** (varies widely)

---

## Contact Information

**Indiana State Board of Cosmetology and Barber Examiners**
- Phone: (317) 234-3040
- Address: 402 W. Washington St., Room W072, Indianapolis, IN 46204
- Website: [in.gov/pla/professions/cosmetology-board](https://www.in.gov/pla/professions/cosmetology-board/)

**We Can Help:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- We connect you with cosmetology schools offering nail tech apprenticeships
- We help you apply for WIOA or Workforce Ready Grant funding

---

**Bottom Line:** Nail technician apprenticeship in Indiana requires partnership with a licensed cosmetology school. The instructional portion is 100% funded through WIOA or Workforce Ready Grant. You cannot do it independently like the barber apprenticeship.

---

## Salon Options for Nail Technician Apprenticeships

### Types of Salons That Can Host Apprentices

**Not all salons can host nail technician apprentices. They must partner with a licensed cosmetology school.**

**Eligible facilities:**

**1. Full-Service Salons**
- Hair salons with nail services
- Must have licensed nail technician with 2+ years experience
- Must partner with cosmetology school
- Examples: Local full-service salons, franchise salons

**2. Nail-Only Salons**
- Salons specializing in nail services
- Must have licensed nail technician with 2+ years experience
- Must partner with cosmetology school
- Examples: Nail bars, nail boutiques, Vietnamese nail salons

**3. Day Spas with Nail Services**
- Spas offering manicures and pedicures
- Must have licensed nail technician on staff
- Must partner with cosmetology school
- Examples: Day spas, resort spas with nail services

**4. Beauty Salons**
- Full-service beauty salons (hair, nails, skincare)
- Must have licensed nail technician with 2+ years experience
- Must partner with cosmetology school
- Examples: Ulta Beauty, local beauty salons

**5. Barbershops with Nail Services (Rare)**
- Some barbershops offer nail services
- Must have licensed nail technician on staff
- Must partner with cosmetology school
- Examples: High-end barbershops with full grooming services

---

### Requirements for Salons to Host Apprentices

**To host nail technician apprentices, your salon must:**

**1. Partner with Licensed Cosmetology School**
- ✅ Formal written agreement with Indiana-licensed cosmetology school
- ✅ School coordinates apprenticeship program
- ✅ School provides curriculum and oversight
- ✅ School tracks student hours
- ✅ School certifies completion

**2. Meet Facility Requirements**
- ✅ Licensed by Indiana State Board of Cosmetology
- ✅ Proper equipment for nail services (manicure tables, pedicure chairs, UV lamps, tools)
- ✅ Sanitation and safety standards met
- ✅ Adequate workspace for apprentice training (dedicated nail station)
- ✅ Proper ventilation (critical for nail products)
- ✅ Complies with all health codes

**3. Have Licensed Supervision**
- ✅ Licensed nail technician on staff with minimum 2 years professional experience
- ✅ Licensed nail tech must supervise all apprentice work
- ✅ Cannot leave apprentice unsupervised with clients
- ✅ Supervisor must be available during all apprentice working hours

**4. Follow School's Training Plan**
- ✅ Provide practical training per school's curriculum
- ✅ Track apprentice hours and report to school
- ✅ Allow school inspections and oversight
- ✅ Ensure apprentice meets competency standards
- ✅ Provide feedback to school on apprentice progress

**5. Maintain Proper Insurance**
- ✅ General liability insurance
- ✅ Professional liability insurance
- ✅ Workers' compensation (if apprentice is paid employee)

---

### How Salons Become Apprenticeship Partners

**Step 1: Contact Cosmetology Schools**
- Reach out to Indiana-licensed cosmetology schools
- Ask about their nail technician apprenticeship programs
- Express interest in hosting apprentices

**Step 2: Meet School Requirements**
- School evaluates your facility
- School verifies your nail tech's license and experience
- School ensures you meet all requirements
- School checks ventilation and safety standards

**Step 3: Sign Partnership Agreement**
- Formal agreement outlining responsibilities
- Training schedule and curriculum
- Hour tracking and reporting procedures
- Supervision requirements
- Duration of partnership

**Step 4: Receive Apprentice Placement**
- School matches apprentice with your salon
- School provides training materials and curriculum
- You begin providing practical training

**Step 5: Track and Report Hours**
- Document apprentice hours daily/weekly
- Report to school monthly
- Provide feedback on apprentice progress
- Coordinate with school on any issues

---

### Benefits for Salons Hosting Apprentices

**Why host an apprentice:**

**1. Build Your Team**
- Train nail tech your way
- Develop loyalty (apprentices often stay long-term)
- Mold skills to match your salon's style
- Create pipeline of qualified staff

**2. Low-Cost Labor (If Unpaid Model)**
- Apprentice provides services under supervision
- You don't pay wages (most common model)
- School covers apprentice's tuition
- You provide training and experience

**3. Paid Labor (If Paid Model - Very Rare)**
- Some salons pay apprentices minimum wage
- Apprentice is both student and employee
- You invest in their training
- They're more committed to staying after licensing

**4. Community Reputation**
- Known as training facility
- Attracts quality applicants
- Gives back to the profession
- Builds relationships with cosmetology schools

**5. Fresh Perspectives**
- Apprentices bring new ideas and nail art trends
- Learn latest techniques from school
- Energize your team
- Keep your salon current

---

### Salon Responsibilities During Apprenticeship

**What you must provide:**

**1. Supervision**
- Licensed nail technician supervises all apprentice work
- Cannot leave apprentice alone with clients
- Provide real-time coaching and feedback
- Ensure client safety and satisfaction

**2. Training Opportunities**
- Allow apprentice to perform services on real clients
- Provide variety of services (manicures, pedicures, acrylics, gels, nail art)
- Expose apprentice to different nail types and conditions
- Teach salon-specific techniques and protocols

**3. Equipment and Supplies**
- Provide all necessary equipment (tables, chairs, UV lamps, tools)
- Provide products (polish, acrylics, gels, files, buffers)
- Provide sanitation equipment
- Provide uniforms or dress code guidance

**4. Documentation**
- Track apprentice hours daily/weekly
- Report hours to school monthly
- Document services performed
- Provide progress reports to school

**5. Professional Environment**
- Treat apprentice with respect
- Provide constructive feedback
- Model professional behavior
- Create positive learning environment

---

### What Salons CANNOT Do

**Prohibited practices:**

❌ **Cannot host apprentice without school partnership**
- You must have formal agreement with cosmetology school
- Random work experience doesn't count toward licensure

❌ **Cannot leave apprentice unsupervised**
- Licensed nail tech must be present at all times
- Apprentice cannot work alone with clients

❌ **Cannot count hours without school verification**
- Only school-verified hours count toward licensure
- You cannot independently certify apprentice hours

❌ **Cannot skip required training components**
- Must follow school's approved curriculum
- Cannot rush apprentice through program

❌ **Cannot charge apprentice for training**
- Apprentice pays tuition to school, not to you
- You cannot charge "training fees" or "equipment fees"

❌ **Cannot require apprentice to pay booth rent**
- Apprentice is student, not independent contractor
- Booth rental only for licensed nail technicians

---

### Payment Options for Salons

**Option 1: Unpaid Apprenticeship (Most Common - 95%)**

**How it works:**
- Apprentice is student, not employee
- You provide training and experience
- You don't pay wages
- Apprentice pays tuition to school (covered by WIOA/WRG)
- You provide equipment and supplies

**Your costs:**
- Equipment and supplies: $30-75/month per apprentice
- Supervisor time: Included in nail tech's regular duties
- No wages paid

**Benefits:**
- Very low cost to you
- Apprentice gains experience
- You're giving back to profession

---

**Option 2: Paid Apprenticeship (Very Rare - <5%)**

**How it works:**
- Apprentice is both student AND employee
- You pay minimum wage ($7.25-$10/hour)
- Apprentice pays tuition to school (covered by WIOA/WRG)
- You provide equipment, supplies, and wages

**Your costs:**
- Wages: $7.25-$10/hour × 15-25 hours/week = $109-$250/week
- Equipment and supplies: $30-75/month
- Total: $450-$1,075/month per apprentice

**Benefits:**
- Apprentice is more committed (earning money)
- You have more control (they're your employee)
- Apprentice likely to stay after licensing
- You're investing in your future team

**When this makes sense:**
- Busy salon with resources to invest
- Want to ensure apprentice stays after licensing
- Need extra help and can afford to pay
- Building long-term team

---

**Option 3: Tuition Offset Model (Extremely Rare - <1%)**

**How it works:**
- You pay apprentice's tuition to school
- Apprentice works at your salon (unpaid or low wage)
- Apprentice commits to working for you after licensing

**Your costs:**
- Tuition: $3,000-$8,000 (one-time)
- Equipment and supplies: $30-75/month
- Wages: $0-$7/hour (if any)

**Benefits:**
- Apprentice has no debt
- Apprentice is very committed to you
- You secure future employee
- Strong loyalty and retention

**Conditions:**
- Apprentice signs agreement to work for you 1-2 years after licensing
- If apprentice leaves early, may owe back tuition
- Legal agreement required

---

### Current Salons Partnering with Schools

**To find salons hosting apprentices:**

**Contact these Indiana cosmetology schools:**
- Aveda Fredric's Institute (Indianapolis)
- Paul Mitchell The School (Indianapolis, Fort Wayne)
- Tricoci University (Indianapolis)
- Ravenscroft Beauty College (Fort Wayne)
- Merrillville Beauty College (Merrillville)
- PJ's College of Cosmetology (multiple locations)

**Ask:**
- "Do you have nail technician apprenticeship programs?"
- "Which salons do you partner with?"
- "How can I get placed at a salon for my apprenticeship?"

**We can also help connect you:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- We work with schools and salons to facilitate placements

---

### For Salons: How to Get Started

**Interested in hosting nail technician apprentices?**

**Step 1: Contact us**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- Tell us about your salon

**Step 2: We connect you with cosmetology schools**
- We introduce you to schools with apprenticeship programs
- We help facilitate partnership agreements
- We guide you through requirements

**Step 3: Get approved**
- School evaluates your facility
- School verifies your nail tech's credentials
- Partnership agreement signed

**Step 4: Receive apprentice placements**
- School matches apprentices with your salon
- You begin providing training
- We provide ongoing support

**Benefits of working with us:**
- ✅ We handle school coordination
- ✅ We help with paperwork and agreements
- ✅ We provide guidance on best practices
- ✅ We support both you and the apprentice
- ✅ We help resolve any issues

---

### The Bottom Line: Salon Apprenticeships

**For Nail Technician Apprentices:**
- ✅ Must be placed through cosmetology school
- ✅ Cannot just work at any salon and count hours
- ✅ School coordinates everything
- ✅ Most placements are unpaid (you're a student)
- ✅ WIOA/WRG covers your tuition
- ✅ You gain real-world experience
- ✅ Shorter program than esthetician (450 vs 700 hours)

**For Salons:**
- ✅ Must partner with cosmetology school
- ✅ Cannot host apprentices independently
- ✅ Most don't pay apprentices (unpaid model)
- ✅ Very low cost way to train future employees
- ✅ Builds reputation and gives back to profession

**Contact us to get connected:**
- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

---

## What Happens If You Don't Complete Your Esthetician Apprenticeship?

### If You Stop Attending or Quit

**Your hours are saved (if properly documented by school).**

**What happens to your hours:**
- ✅ All verified hours remain on record with cosmetology school
- ✅ School maintains your apprenticeship file
- ✅ You can return to complete your apprenticeship later
- ✅ Hours typically valid for 3-5 years (check with school)
- ✅ You can transfer to a different school/spa partnership

**Important differences from barber apprenticeship:**
- ⚠️ Hours may expire after 3-5 years (school policy varies)
- ⚠️ School controls your records, not State Board directly
- ⚠️ Must stay enrolled in school to keep hours active
- ⚠️ If you drop out of school, hours may not transfer

**Example:**
- You complete 400 hours at Spa A through School X
- You stop attending
- Your 400 hours are saved by School X
- 6 months later, you re-enroll at School X
- You need 300 more hours to reach 700
- School X places you at Spa B to complete remaining hours

---

### If the Spa Closes or Ends Partnership

**Your hours are protected if school has documentation.**

**What happens:**
1. Spa notifies school they're ending partnership
2. School contacts you about your hour status
3. Your completed hours are verified and saved by school
4. School finds you a new spa placement
5. You continue from where you left off

**Example:**
- You complete 500 hours at Spa A
- Spa A closes permanently
- Your 500 hours are verified and saved by school
- School places you at Spa B
- You complete remaining 200 hours at Spa B
- You graduate with 700 total hours

**Timeline:**
- Spa closure to new placement: 2-6 weeks
- School handles all coordination

---

### Transferring to a Different Spa During Your Apprenticeship

**Yes, you can transfer. Your hours go with you (through the school).**

**How to transfer:**

**Step 1: Contact Your Cosmetology School**
- Notify school you want to transfer spas
- Explain your reason (better opportunity, moving, issues at current spa)
- School reviews your request

**Step 2: School Finds New Spa Placement**
- School has agreements with multiple spas
- School matches you with new spa
- School verifies new spa meets requirements

**Step 3: Current Spa Submits Final Hours**
- Current spa reports your final hours to school
- School verifies all hours completed
- You receive documentation of hours

**Step 4: Transfer to New Spa**
- School places you at new spa
- New spa receives your hour records from school
- You continue training from where you left off

**Step 5: Complete Remaining Hours**
- New spa tracks your hours
- New spa reports to school
- You complete remaining hours toward 700 total

**Timeline:**
- Request to new placement: 2-6 weeks
- Depends on spa availability

**Example:**
- You complete 300 hours at Spa A
- You transfer to Spa B
- School verifies your 300 hours
- You complete 400 more hours at Spa B
- You graduate with 700 total hours (300 + 400)

---

### Can You Transfer to a Different Cosmetology School?

**Yes, but it's complicated.**

**How to transfer schools:**

**Step 1: Request Transcripts from Current School**
- Request official transcripts showing hours completed
- Get documentation of all coursework
- Pay any outstanding fees to current school

**Step 2: Apply to New School**
- Enroll in new school's esthetician program
- Submit transcripts from previous school
- New school evaluates your credits

**Step 3: New School Determines Transfer Credits**
- New school decides which hours transfer
- May accept all, some, or none of your hours
- Depends on curriculum compatibility

**Step 4: Complete Remaining Requirements**
- New school places you at spa for remaining hours
- You complete any additional coursework required
- You finish program through new school

**Challenges:**
- Not all hours may transfer between schools
- Different schools have different curricula
- May need to repeat some training
- Can delay your completion

**Better option: Stay with same school, just transfer spas**

---

### What If You Complete Hours But Not Classroom Instruction?

**You need BOTH to be eligible for state exam.**

**Scenario 1: Completed 700 practical hours but only 500 classroom hours**
- ❌ Not eligible for state exam yet
- ✅ Your 700 practical hours are saved
- ✅ Complete remaining 200 classroom hours
- ✅ Then eligible for exam

**Scenario 2: Completed all classroom hours but only 500 practical hours**
- ❌ Not eligible for state exam yet
- ✅ Your classroom hours are saved
- ✅ Complete remaining 200 practical hours at spa
- ✅ Then eligible for exam

**Both requirements must be met:**
- 700 total hours (classroom + practical)
- Typically split 350/350 or similar
- Both verified by cosmetology school

---

### Protecting Your Hours

**Keep your own records:**
- ✅ Take photos of weekly hour logs
- ✅ Keep copies of monthly reports to school
- ✅ Track your own hours in notebook or app
- ✅ Save all documentation

**Request documentation regularly:**
- ✅ Ask school for hour verification every 3 months
- ✅ Request transcript showing hours completed
- ✅ Keep these in safe place

**If you're leaving a spa:**
- ✅ Request written documentation of hours from spa
- ✅ Notify school immediately
- ✅ Ensure school has all your hours on record
- ✅ Get copies of everything

**If spa or school refuses documentation:**
- ✅ Contact Indiana State Board: (317) 234-3040
- ✅ File complaint if necessary
- ✅ State Board can investigate

---

### Key Differences: Esthetician vs Barber Apprenticeship Transfers

| Factor | Barber Apprenticeship | Esthetician Apprenticeship |
|--------|----------------------|---------------------------|
| **Who Controls Hours** | Indiana State Board | Cosmetology School |
| **Hour Expiration** | Never expire | May expire after 3-5 years |
| **Transfer Process** | Direct shop-to-shop | Through school coordination |
| **Transfer Timeline** | 3-8 weeks | 2-6 weeks |
| **Can Work Multiple Places** | No (one shop at a time) | No (one spa at a time) |
| **School Involvement** | None (direct sponsor) | Required (school coordinates) |
| **State Board Tracking** | Direct monthly reports | Through school reports |

---

### FAQs: Esthetician Apprenticeship Transfers

**"I completed 400 hours but haven't worked in 1 year. Are my hours still good?"**

Check with your cosmetology school. Most schools keep hours valid for 3-5 years. After that, you may need to repeat some training.

**"My spa closed suddenly. How do I get my hours?"**

Contact your cosmetology school immediately. They have all records and will verify your hours and find you a new spa placement.

**"Can I transfer to a spa in a different city?"**

Yes, as long as your school has spa partnerships in that city. If not, you may need to transfer to a school in that city.

**"I want to switch spas because I'm not learning enough. Is that okay?"**

Yes. Contact your school and explain the situation. They'll work to find you a better placement.

**"What if I move to a different state?"**

Your Indiana hours may transfer to another state, depending on that state's reciprocity rules. Contact the other state's cosmetology board.

---

### The Bottom Line: Esthetician Apprenticeship Transfers

**Key takeaways:**

✅ **Your hours are saved by school** - Not State Board directly

✅ **You can transfer spas** - Through school coordination

✅ **Hours may expire** - Check school policy (typically 3-5 years)

✅ **School controls process** - They coordinate all transfers

✅ **Keep your own records** - Don't rely solely on school

**If you need to transfer or have issues:**
- Contact your cosmetology school first
- Email us: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

**We'll help you navigate the transfer process and protect your hours.**

---
    heroImage: '/images/programs/nail-tech-apprentice.jpg',
    heroImageAlt:
      'Nail technician apprentice performing manicure under supervision',
    duration: '450 hours (4-8 months depending on schedule)',
    schedule: 'Varies by school and salon partnership',
    delivery:
      'Hybrid: Classroom instruction at school + Practical training at salon',
    credential:
      'Indiana Licensed Nail Technician (upon passing state board exam)',
    approvals: [
      'Must be coordinated by Indiana-licensed cosmetology school',
      'Indiana State Board of Cosmetology approved',
      'WIOA Eligible (for tuition)',
      'Workforce Ready Grant Eligible (for tuition)',
    ],
    fundingOptions: [
      'WIOA Funding (covers tuition)',
      'Workforce Ready Grant (covers tuition)',
      'JRI Funding (for justice-involved individuals)',
      'Federal Student Aid (if school accepts FAFSA)',
    ],
    highlights: [
      'Earn Indiana nail technician license through apprenticeship',
      'Work at real salon while training',
      'Must partner with licensed cosmetology school',
      'Different from barber apprenticeship (school required)',
      '450 hours total training (shorter than esthetician)',
      'WIOA or WRG covers 100% of tuition',
      'Licensed supervision required',
      'Graduate eligible for state board exam',
    ],
    whatYouLearn: [
      'Nail anatomy and physiology',
      'Manicure and pedicure techniques',
      'Nail enhancements (acrylics, gels, tips)',
      'Nail art and design',
      'Sanitation and infection control',
      'Client consultation and communication',
      'Indiana nail technician laws and regulations',
      'Business and professional ethics',
      'Product knowledge and retail sales',
      'Salon operations and customer service',
    ],
    outcomes: [
      'Licensed Nail Technician in Indiana',
      'Salon nail technician',
      'Spa nail specialist',
      'Mobile nail technician (self-employed)',
      'Nail art specialist',
      'Nail product sales',
      'Average salary: $25,000-$45,000/year',
      'Self-employment potential',
    ],
    requirements: [
      'At least 17 years old',
      'High school diploma or GED',
      'Enroll in Indiana-licensed cosmetology school',
      'School arranges apprenticeship placement',
      'Complete 450 hours (classroom + practical)',
      'Pass Indiana State Board nail technician exam',
    ],
    ctaPrimary: {
      label: 'Contact Us',
      href: '/contact?topic=nail-technician-apprenticeship',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact',
    },
  },
  {
    slug: 'professional-esthetician',
    name: 'Esthetics and Skincare Specialist Certificate',
    heroTitle: 'Esthetics and Skincare Specialist Certificate Program',
    heroSubtitle:
      '5-week accelerated non-licensure training for job-ready skills in the high-demand personal care industry',
    shortDescription:
      'Comprehensive skincare training with hands-on practice, business startup support, and career readiness for spas, salons, and mobile beauty services',
    longDescription: `The Esthetics and Skincare Specialist Certificate Program prepares individuals to enter the high-demand personal care industry with job-ready skills in skin analysis, facial treatments, hair removal, sanitation, customer service, and product knowledge. This comprehensive non-licensure training blends hands-on instruction with theory-based modules, empowering students to build confidence in a professional spa setting. This course also offers traditional wrap-around support including career readiness, business startup training, wellness coaching and access to employer networks.

Participants gain practical experience through simulated treatments using industry-standard tools and techniques, including exfoliation, hydration, facial massage, brow shaping, and makeup fundamentals. The program emphasizes infection control, client communication, and proper documentation, aligned with industry expectations. Career readiness, digital professionalism, and entrepreneurship fundamentals are also integrated to support students' long-term success in both employment and independent service delivery.

Instructors must have a minimum of 2 years of industry experience in esthetics, skincare services, or cosmetic therapy. While state licensure is not required for this non-licensure certificate program, preference is given to instructors who hold certifications in esthetics, dermatological skincare, or equivalent areas. Faculty demonstrate experience in adult learning, virtual instruction, and hands-on practical training.

This program is ideal for individuals seeking a flexible, accelerated pathway to employment in spas, salons, medi-aesthetic offices, or mobile beauty services. Upon completion, graduates receive a Certificate of Completion, qualify for placement support, and may pursue advanced or specialized training, apprenticeships, or entrepreneurial ventures.

Credentialing Partners:
• National Retail Federation (NRF) - Business of Retail Certified Specialist (https://nrf.com)
• National Retail Federation (NRF) - Customer Service and Sales Certified Specialist (https://nrf.com)
• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)

CIP Code: 12.0409 - Aesthetician/Esthetician and Skin Care Specialist`,
    heroImage: '/images/programs/esthetician.jpg',
    heroImageAlt: 'Esthetician performing professional facial treatment',
    duration: '5 weeks',
    schedule: 'Monthly enrollment - Flexible hybrid scheduling',
    delivery:
      'Hybrid - Theory-based online modules + Hands-on practical training',
    credential:
      'Certificate of Completion, Business of Retail Certified Specialist (NRF), Customer Service and Sales Certified Specialist (NRF), OSHA 10',
    approvals: [
      'ETPL Approved - Program ID #10004628',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 12.0409',
      'Non-Licensure Certificate Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,575',
    ],
    highlights: [
      'Non-licensure certificate program - no state license required',
      'Hands-on practice with industry-standard tools',
      'NRF retail and customer service certifications',
      'OSHA 10 workplace safety certification',
      'Business startup training and entrepreneurship support',
      'Career readiness and digital professionalism',
      'Wellness coaching and wrap-around support',
      'Access to employer networks and placement support',
      'Fast 5-week completion',
      'Monthly enrollment opportunities',
    ],
    whatYouLearn: [
      'Skin analysis and assessment techniques',
      'Facial treatments and procedures',
      'Exfoliation and hydration techniques',
      'Facial massage and lymphatic drainage',
      'Hair removal (waxing, tweezing, brow shaping)',
      'Makeup fundamentals and application',
      'Infection control and sanitation protocols',
      'Client consultation and communication',
      'Product knowledge and recommendations',
      'Retail operations and sales techniques',
      'Customer service excellence',
      'OSHA workplace safety standards',
      'Business startup and entrepreneurship basics',
      'Digital professionalism and online presence',
      'Proper documentation and record keeping',
    ],
    outcomes: [
      'Esthetician in spas and salons',
      'Skincare specialist in medi-aesthetic offices',
      'Mobile beauty service provider',
      'Retail beauty consultant',
      'Spa treatment specialist',
      'Independent skincare entrepreneur',
      'Beauty product sales representative',
      'Average salary: $30,000-$50,000/year plus commissions',
      'Self-employment income potential varies',
    ],
    requirements: [
      'At least 16 years old',
      'High school diploma or equivalent',
      'Strong interest in skincare, wellness, or beauty industry',
      'No prior licensure required',
      'Basic reading comprehension and computer literacy',
      'Ability to access hybrid online modules',
      'Interview may be required to assess program readiness',
      'Application deadline: Apply at least 2 weeks before next session',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=esthetician',
    },
    price: 4575,
  },
  {
    slug: 'peer-recovery-coach',
    name: 'Public Safety Reentry Specialist',
    heroTitle: 'Public Safety Reentry Specialist Program',
    heroSubtitle:
      '45-day inclusive program for peer support, recovery coaching, and reentry navigation - welcoming all backgrounds',
    shortDescription:
      'Accessible training for justice-involved individuals, career changers, and those with lived experience to become certified peer recovery coaches',
    longDescription: `The Public Safety Reentry Specialist Program prepares you to support individuals reentering society after incarceration or overcoming substance use challenges. In 45 days, you'll earn multiple certifications including Certified Peer Recovery Coach (CPRC), Certified Peer Support Professional, Certified Community Healthcare Worker (CCHW), CPR, and Rise Up career readiness. This program combines lived experience with professional training to help you make a meaningful impact in your community.

This program is designed to be inclusive and accessible to all learners—regardless of age, background, or education level. It welcomes youth ages 16+, adults seeking career change, justice-involved individuals reentering the workforce, and those receiving support through SNAP, WIOA, or other public assistance programs. No prior credential or diploma is required for enrollment. We provide built-in support, including tutoring, digital literacy training, and guided instruction to ensure all participants have the tools they need to succeed.

Instructors hold Certified Peer Recovery Specialist (CPRS) credentials or equivalent, with subject matter experience in reentry, public safety, peer navigation, or crisis response. Program leadership holds credentials in trauma-informed coaching, CPR/AED instruction, and lived-experience mentorship for justice-impacted individuals.

Credentialing Partners:
• Indiana Certification Board (ICB) - Certified Peer Recovery Coach (CPRC) (https://indianacertificationboard.org)
• National Alliance of Peer Specialists - Certified Peer Support Professional (https://na4ps.org)
• Certified Community Healthcare Worker (CCHW) Programs
• American Heart Association - CPR/AED (https://cpr.heart.org)
• Rise Up - Career Readiness Certification (https://riseup.com)

CIP Code: 43.0112 - Securities Services Administration/Management`,
    heroImage: '/images/programs/peer-recovery.jpg',
    heroImageAlt: 'Peer recovery coach providing support and mentorship',
    duration: '45 days (6-7 weeks)',
    schedule: 'Year-round enrollment - First come, first served',
    delivery:
      'Hybrid - Online coursework + In-person training with built-in support',
    credential:
      'Certified Peer Recovery Coach (CPRC), Certified Peer Support Professional, Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate',
    approvals: [
      'ETPL Approved - Program ID #10004666',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'SNAP Eligible',
      'CIP Code: 43.0112',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'SNAP Support',
      'Public Assistance Programs',
      'Self-Pay: $4,750',
    ],
    highlights: [
      'Inclusive and accessible to all backgrounds',
      'No prior credential or diploma required',
      'Built-in support: tutoring, digital literacy, guided instruction',
      'Certified Peer Recovery Coach (CPRC) credential',
      'Certified Peer Support Professional',
      'Community Healthcare Worker (CCHW) certification',
      'CPR and Rise Up certifications',
      'Trauma-informed coaching approach',
      'Lived-experience mentorship',
      'Year-round enrollment',
      'Justice-involved individuals welcome',
    ],
    whatYouLearn: [
      'Peer support principles and ethics',
      'Recovery coaching techniques',
      'Trauma-informed care and crisis response',
      'Reentry navigation and public safety',
      'Crisis intervention and de-escalation',
      'Community healthcare navigation',
      'CPR and First Aid emergency response',
      'Case management basics',
      'Motivational interviewing',
      'Resource coordination and advocacy',
      'Professional boundaries and self-care',
      'Documentation and confidentiality',
    ],
    outcomes: [
      'Certified Peer Recovery Coach',
      'Public safety reentry specialist',
      'Community healthcare worker',
      'Peer support specialist',
      'Substance use counselor assistant',
      'Case management support',
      'Crisis response team member',
      'Reentry navigator',
      'Average salary: $35,000-$48,000/year',
    ],
    requirements: [
      'Ages 16+ welcome',
      'No prior credential or diploma required',
      'Open to justice-involved individuals reentering workforce',
      'Open to SNAP, WIOA, and public assistance recipients',
      'Lived experience with recovery or reentry valued',
      'Commitment to helping others',
      'Background check required',
      'Stable in recovery (if applicable)',
      'Built-in support provided: tutoring, digital literacy, guided instruction',
      'Application deadline: Year-round enrollment, first come first served',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=peer-recovery',
    },
    price: 4750,
  },
  {
    slug: 'tax-prep-financial-services',
    name: 'Tax Preparation & Financial Services Certificate',
    heroTitle: 'Tax Preparation & Financial Services Certificate Program',
    heroSubtitle:
      'Start your own tax business or work for a firm in just 10 weeks. Get IRS VITA/TCE certified, learn QuickBooks and Microsoft 365, and gain real experience preparing taxes at an IRS-approved site. Earn $40,000-$60,000+ per year during tax season, with flexibility to work year-round or seasonally.',
    shortDescription:
      'Start your own tax business or work for a firm in just 10 weeks. Get IRS VITA/TCE certified, learn QuickBooks and Microsoft 365, and gain real experience preparing taxes at an IRS-approved site. Earn $40,000-$60,000+ per year during tax season, with flexibility to work year-round or seasonally.',
    longDescription: `The Tax Preparation & Financial Services Certificate prepares individuals to understand federal and state taxation concepts and apply them in real-world settings. Participants complete training in tax law, return preparation, bookkeeping, and financial literacy, culminating in the IRS VITA/TCE certification. The program combines classroom instruction, online modules, and supervised practicum hours at an IRS-approved VITA site. Graduates gain the skills required for employment as Tax Preparers, Bookkeeping Assistants, and Financial Service Specialists in both private and community-based environments.

Through the IRS Link & Learn platform and Elevate for Humanity's financial training curriculum, students master key competencies in individual taxation, ethics, client intake, and electronic filing, while also building transferable skills in business communication, budgeting, and entrepreneurship.

Elevate for Humanity is an IRS VITA/TCE Approved Site, Indiana ETPL Approved Training Provider, SAM.gov Active Entity, E-Verify Employer, and Authorized IRS e-file provider. All instructors hold a 2-year degree from a credentialed institution or 2 years of relevant experience in tax preparation or financial services.

Credentialing Partners:
• Internal Revenue Service (IRS) - VITA/TCE Certification (https://irs.gov/vita)
• IRS Link & Learn Taxes Platform (https://apps.irs.gov/app/vita/)
• Intuit - QuickBooks Pro Advisor (https://quickbooks.intuit.com/accountants/)
• Microsoft - Microsoft 365 Fundamentals (https://microsoft.com/learn)
• Rise Up - Career Readiness Certification (https://riseup.com)

CIP Code: 52.0302 - Accounting Technology/Technician and Bookkeeping`,
    heroImage: '/images/programs/tax-prep.jpg',
    heroImageAlt: 'Tax preparer assisting client with tax return',
    duration: '10 weeks',
    schedule:
      'Seasonal cohorts: November, January, March (aligned with tax season)',
    delivery:
      'Hybrid - Classroom instruction + Online IRS modules + Supervised practicum at IRS-approved VITA site',
    credential:
      'IRS VITA/TCE Certification, QuickBooks Pro Advisor, Microsoft 365 Fundamentals, Rise Up Certificate, Certificate of Completion',
    approvals: [
      'ETPL Approved - Program ID #10004627',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'IRS VITA/TCE Approved Site',
      'SAM.gov Active Entity',
      'Authorized IRS e-file Provider',
      'CIP Code: 52.0302',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,750',
    ],
    highlights: [
      'IRS VITA/TCE certification',
      'Supervised practicum at IRS-approved VITA site',
      'IRS Link & Learn platform training',
      'QuickBooks Pro Advisor certification',
      'Microsoft 365 Fundamentals certification',
      'Rise Up career readiness certificate',
      'Authorized IRS e-file provider training',
      'Real-world tax preparation experience',
      'Business communication and entrepreneurship skills',
      'Seasonal cohorts aligned with tax season',
      'Year-round and seasonal employment opportunities',
    ],
    whatYouLearn: [
      'Federal and state tax law and regulations',
      'Individual tax return preparation',
      'IRS Link & Learn Taxes platform',
      'Client intake and interview techniques',
      'Electronic filing (e-file) procedures',
      'Tax ethics and professional standards',
      'QuickBooks accounting software',
      'Microsoft 365 applications (Excel, Word, Outlook)',
      'Bookkeeping and financial record keeping',
      'Financial literacy and budgeting',
      'Business communication skills',
      'Entrepreneurship fundamentals',
      'Client consultation and service',
    ],
    outcomes: [
      'IRS VITA/TCE certified tax preparer',
      'Tax preparation specialist',
      'Bookkeeping assistant',
      'Financial services representative',
      'Accounting technician',
      'Start your own tax preparation business',
      'Community-based tax preparer',
      'Average salary: $35,000-$55,000/year',
      'Seasonal income potential: $15,000-$30,000 during tax season',
    ],
    requirements: [
      '18 years or older',
      'High school diploma or equivalent preferred',
      'Basic reading, writing, and computer skills',
      'Complete short intake interview',
      'Pass basic math and reading assessment',
      'No prior tax experience required',
      'Application deadline: Apply at least 1 week before cohort start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=tax-prep',
    },
    price: 4750,
  },
  {
    slug: 'cpr-certification',
    name: 'CPR, AED & First Aid Certification',
    heroTitle: 'CPR, AED & First Aid Certification',
    heroSubtitle:
      'One-day hands-on training to earn your American Heart Association CPR certification',
    shortDescription:
      'Essential life-saving skills training with AHA CPR card valid for 2 years',
    longDescription: `This hands-on CPR Certification course provides participants with essential life-saving skills through instructor-led training in adult, child, and infant CPR, AED usage, and basic first aid. Students will practice on industry-approved equipment and complete the course with an American Heart Association (or equivalent) CPR card valid for two years. This one-day, in-person program is ideal for aspiring healthcare workers, caregivers, and anyone seeking life-saving credentials.

All instructors are certified American Heart Association (AHA) BLS Instructors or equivalent through nationally recognized organizations such as the Red Cross. Instructors maintain current credentials and hands-on skills testing ability in compliance with training center protocols.

This certification is required for many healthcare positions and is valuable for anyone who wants to be prepared to respond in an emergency. The course combines video instruction, hands-on practice, and skills testing to ensure you're confident and competent in performing CPR and using an AED.

Credentialing Partners:
• American Heart Association (AHA) - CPR/AED/First Aid Certification (https://cpr.heart.org)
• American Red Cross - CPR/AED/First Aid Certification (https://redcross.org)

CIP Code: 51.0810 - Emergency Care Attendant (EMT Ambulance)`,
    heroImage: '/images/programs/cpr-certification.jpg',
    heroImageAlt: 'Student practicing CPR on training manikin',
    duration: '1 day (4-6 hours)',
    schedule: 'Multiple dates available monthly - Rolling admissions',
    delivery: 'In-person hands-on training',
    credential:
      'American Heart Association CPR/AED/First Aid Certification (valid 2 years)',
    approvals: [
      'ETPL Approved - Program ID #10004674',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.0810',
      'AHA Training Center',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $575',
    ],
    highlights: [
      'American Heart Association certification',
      'Valid for 2 years',
      'One-day completion',
      'Hands-on practice with industry equipment',
      'Adult, child, and infant CPR training',
      'AED usage and basic first aid',
      'Required for many healthcare jobs',
      'Certified AHA instructors',
    ],
    whatYouLearn: [
      'Adult CPR techniques and compressions',
      'Child CPR procedures',
      'Infant CPR and special considerations',
      'AED (Automated External Defibrillator) operation',
      'Choking relief for all ages',
      'Basic first aid for common emergencies',
      'Recognition of cardiac arrest and stroke',
      'Emergency response protocols',
      'Scene safety and infection control',
    ],
    outcomes: [
      'AHA CPR/AED/First Aid certification card',
      'Qualify for healthcare positions requiring CPR',
      'Confidence to respond in emergencies',
      'Meet employment requirements for CNA, Medical Assistant, EMT, and other healthcare roles',
      'Valuable skill for childcare, education, and public safety positions',
    ],
    requirements: [
      'No prior medical experience required',
      'Physically able to perform CPR compressions on a manikin',
      'Able to kneel and perform floor-based skills',
      'Basic reading and comprehension of safety protocols',
      'Application deadline: Apply at least 2 weeks before class date for availability',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'View Class Schedule',
      href: '/contact?topic=cpr-certification',
    },
    price: 575,
  },
  {
    slug: 'phlebotomy-technician',
    name: 'Phlebotomy Technician Certification',
    heroTitle: 'Phlebotomy Technician Certification Program',
    heroSubtitle: '6-week program to become a certified Phlebotomy Technician',
    shortDescription:
      'Comprehensive phlebotomy training with hands-on clinical experience, national certification, and job placement assistance',
    longDescription: `The Phlebotomy Technician Certification program prepares you for a rewarding career in healthcare by teaching you the essential skills of blood collection and specimen processing. In just 6 weeks, you'll master venipuncture techniques, capillary puncture, specimen handling, and patient care. This program includes classroom instruction, hands-on lab practice, and a clinical externship at a real healthcare facility.

You'll earn your Certified Phlebotomy Technician (CPT) credential, CPR certification, and complete OSHA-compliant safety training through our HSI partnership, including bloodborne pathogens and infection control. Our program meets all requirements for national certification and prepares you for immediate employment in hospitals, clinics, laboratories, and blood donation centers.

With high demand for phlebotomists nationwide and excellent job growth projections, this is your opportunity to enter the healthcare field quickly with a valuable, portable credential. Our graduates work in diverse settings including hospitals, diagnostic laboratories, physician offices, blood banks, and mobile phlebotomy services.

Partner Integration:
• HSI (Health & Safety Institute) - Bloodborne Pathogens, Infection Control, CPR/AED
• National Healthcareer Association (NHA) - CPT Certification Exam
• Clinical externship sites - Local hospitals and laboratories

CIP Code: 51.1009 - Phlebotomy Technician/Phlebotomist`,
    heroImage: '/images/programs/phlebotomy.jpg',
    heroImageAlt: 'Phlebotomy technician drawing blood from patient',
    duration: '6 weeks (120 hours)',
    schedule: 'Full-time: Mon-Fri 9am-3pm or Part-time: Evenings/Weekends',
    delivery:
      'Hybrid - Classroom instruction + Lab practice + Clinical externship',
    credential:
      'Certified Phlebotomy Technician (CPT), CPR/AED, Bloodborne Pathogens, Infection Control',
    approvals: [
      'ETPL Approved - Program ID #10004680',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.1009',
      'NHA Approved Training Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $2,800',
      'Payment plans available',
    ],
    highlights: [
      'National CPT certification',
      'Clinical externship included',
      'CPR and safety certifications',
      'Job placement assistance',
      'Fast 6-week completion',
      'High-demand career',
    ],
    whatYouLearn: [
      'Venipuncture techniques (blood draw from veins)',
      'Capillary puncture (fingerstick)',
      'Specimen collection and handling',
      'Patient identification and safety',
      'Infection control and bloodborne pathogens',
      'Medical terminology',
      'Laboratory equipment and procedures',
      'Electronic health records',
      'Professional communication',
      'CPR and emergency response',
    ],
    outcomes: [
      'Phlebotomy Technician positions',
      'Hospital laboratory technician',
      'Diagnostic laboratory phlebotomist',
      'Blood bank technician',
      'Mobile phlebotomy services',
      'Average salary: $32,000-$42,000/year',
      'Excellent benefits in healthcare settings',
    ],
    requirements: [
      'High school diploma or GED',
      '18 years or older',
      'Background check required',
      'Drug screening required',
      'Immunizations required (Hepatitis B, TB test, COVID-19)',
      'Physically able to stand for extended periods',
      'Good manual dexterity and hand-eye coordination',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/apply',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=phlebotomy-technician',
    },
    price: 2800,
  },
  {
    slug: 'drug-collector',
    name: 'Drug & Alcohol Specimen Collector Certification',
    heroTitle: 'Drug & Alcohol Specimen Collector Certification',
    heroSubtitle:
      '2-week intensive program for DOT and non-DOT specimen collection',
    shortDescription:
      'Become a certified drug and alcohol specimen collector for DOT and workplace testing programs',
    longDescription: `The Drug & Alcohol Specimen Collector Certification program trains you to perform urine drug testing, breath alcohol testing, and oral fluid collection for DOT-regulated and non-DOT workplace testing programs. This intensive 2-week program covers federal regulations, collection procedures, chain of custody, and quality assurance.

You'll learn both DOT (Department of Transportation) and non-DOT collection procedures, making you qualified to work with transportation companies, employers, third-party administrators (TPAs), and drug testing facilities nationwide. The program includes hands-on training with actual collection devices and mock collections to ensure you're confident and compliant.

Upon completion, you'll earn your Specimen Collector certification and be qualified to perform:
• DOT urine drug testing
• DOT breath alcohol testing  
• Non-DOT urine drug testing
• Oral fluid (saliva) drug testing
• Instant and lab-based testing

This is a high-demand career with flexible work options including full-time positions, part-time work, mobile collection services, and independent contractor opportunities. Many collectors earn $40,000-$60,000+ annually with the ability to set their own schedules.

Partner Integration:
• National Drug Screening - DOT compliance training and certification
• Hands-on training with actual collection devices
• Access to nationwide collector network

CIP Code: 51.1004 - Clinical/Medical Laboratory Technician`,
    heroImage: '/images/programs/drug-collector.jpg',
    heroImageAlt: 'Drug collector performing specimen collection',
    duration: '2 weeks (40 hours)',
    schedule: 'Full-time: Mon-Fri 9am-5pm',
    delivery: 'In-person hands-on training',
    credential:
      'Certified Specimen Collector (DOT & Non-DOT), Breath Alcohol Technician (BAT)',
    approvals: [
      'ETPL Approved - Program ID #10004681',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.1004',
      'DOT Compliant Training',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $1,500',
      'Payment plans available',
    ],
    highlights: [
      'DOT and non-DOT certified',
      'Hands-on training with real devices',
      'Flexible career options',
      'High earning potential',
      'Fast 2-week completion',
      'Nationwide job opportunities',
    ],
    whatYouLearn: [
      'DOT urine drug testing procedures',
      'DOT breath alcohol testing',
      'Non-DOT specimen collection',
      'Oral fluid (saliva) testing',
      'Chain of custody procedures',
      'Federal regulations (49 CFR Part 40)',
      'Specimen validity testing',
      'Quality assurance and quality control',
      'Donor rights and privacy',
      'Problem collections and refusals',
    ],
    outcomes: [
      'Drug testing facility collector',
      'Mobile specimen collector',
      'Third-party administrator (TPA) collector',
      'Occupational health clinic collector',
      'Independent contractor',
      'Average salary: $40,000-$60,000/year',
      'Flexible scheduling options',
    ],
    requirements: [
      'High school diploma or GED',
      '18 years or older',
      'Background check required',
      'Drug screening required',
      "Valid driver's license (for mobile collection)",
      'Reliable transportation',
      'Professional demeanor and communication skills',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/apply',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=drug-collector',
    },
    price: 1500,
  },
];

/**
 * Get program by slug
 */
export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

/**
 * Get all programs
 */
export function getAllPrograms(): Program[] {
  return programs;
}

/**
 * Get programs by category (for filtering)
 */
export function getProgramsByCategory(category: string): Program[] {
  // Add category field to Program type if needed for filtering
  return programs;
}
