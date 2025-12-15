"use client";

export const dynamic = "force-dynamic";

import React from "react";
import dynamicImport from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Lazy load non-critical components
const WelcomeAudio = dynamicImport(
  () => import('@/components/WelcomeAudio').then((mod) => ({ default: mod.WelcomeAudio })),
  { ssr: false, loading: () => null }
);

const PWAInstallSection = dynamicImport(
  () => import('@/components/PWAInstallSection'),
  { ssr: false, loading: () => null }
);

export default function HomePage() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Attempt to play video with sound on mount
  React.useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Try to play with sound
          videoRef.current.muted = false;
          await videoRef.current.play();
        } catch (error) {
          // If blocked, try muted
          try {
            videoRef.current.muted = true;
            await videoRef.current.play();
          } catch (e) {

          }
        }
      }
    };

    playVideo();
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">
      <WelcomeAudio />
      {/* VIDEO HERO WITH TEXT OVERLAY */}
      <section className="relative w-full overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-slate-900">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__4/generated-video-9491ff2d-bd5a-4570-83e7-05d99663557f.mp4?Expires=2081095425&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=wJZrkaI9bPmzDocPutvmxgDObwlhr0K408zQfDrcdGzfsj4-XZFV5xx73m39AvX4h7M1t6tI3o~AweR5s1AL~l2Hxz3i~nh~AJQV0u4S4DcvX1BfjjIdJx51b1YUfPfUUe502kXA2fjn4kCKGm10JTlPzJI2bmLIa5qkFi7Q3e2b6oc7eOsIctMgBIpWSPIu9GawVYkkE95m2pMmOs1HZyXXMlXcF5IXlZ5XSOMwQM1PMag~yXT6YUxx5Gxx~5Z-9sW78sq8fhVB3m-ppnCZWvIZnwz0ajRnyMPOLT7vEbSJj6l2I2Umovwf9I2JFMUiXwn54VTcpjmpiusOqobrKw__" type="video/mp4" />
        </video>
        
        {/* Hero Text Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
            It's Not Graduation, It's Elevation
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-lg">
            Free Career Training • Real Jobs • No Debt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition shadow-xl"
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition shadow-xl"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Real Careers. Real Fast. From Home.
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-6">
            At Elevate for Humanity, we believe everyone deserves a shot at a better life—no matter where 
            you've been or what obstacles you've faced. That's why we offer short-term career training programs 
            you can complete from the comfort of your own home, in just weeks or months, not years.
          </p>
          <p className="text-xl text-slate-700 leading-relaxed mb-6">
            Our programs are designed for real people with real lives—parents juggling kids, workers stuck in 
            dead-end jobs, people starting over after setbacks. You don't need a college degree or perfect grades. 
            You just need the drive to build something better.
          </p>
          <p className="text-lg text-slate-600 mb-8">
            <span className="font-bold text-slate-900">Free training for those who qualify.</span> Through 
            partnerships with WIOA, WRG, JRI, and registered apprenticeships, most of our students pay nothing 
            out of pocket. No student loans. No debt. Just real training, real support, and a clear path to 
            employment.
          </p>
          <p className="text-lg text-slate-700 italic">
            We're not just teaching skills—we're opening doors to careers that pay well, offer stability, 
            and give you the life you deserve.
          </p>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Skills. Real Careers. Real Fast.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our programs are designed for people with real lives—parents, workers, people starting over. 
              Train online at your pace, practice hands-on, and step into a career that's waiting for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                    <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-570a7e55-792e-4ad3-bbd1-72ca89a61f2d.mp4?Expires=2081095426&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=O83IqG0r8dbMOyLHw8LVHa18JGjLwgnKmLPKL3me1H50K-ggwPoUB2KDX-7hUegt8jWpsQwNwnPd11xBUC-r05B~WCUUnUAf7dg~jN5f-o8IrS~ZfFJUitB6k35pOdipzeinpXe1wGieq-27GNJZgVHiAQRrGYGduuZ7iKmu93ujZNJSx-DEhiP255esVtvIiSCVYsR-t32~QyGosAMO7I17xeUs5LiMEjqDHljuq2L1letGmD4q2CosqToNFSFcPuvd4owNBMj9VQcaLb0AJ6mDgpuuDuCAfRWTznw4vp6fkUYxCXa3~kulDSi58QbwpOww3NXM0b6NaYcO~zu1EQ__" type="video/mp4" />
                  </video>
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Work in a real barbershop. Get paid while you train. Build your clientele. 
                    Own your chair or open your own shop. 12-18 months.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all tracking-wide antialiased">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-40 overflow-hidden bg-teal-100">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                    <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__8/generated-video-2a104343-e6a7-4bd8-88c8-367de1f111b5.mp4?Expires=2081095426&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=jLomOFu1gmLeArJIwD6os67ks1evH1p5TcFkDz-YJNodYobGuYPJriIwkeuEoLTnYoPRk5mt55rqPqvvZzkCED3b1hQbPyWrw~GCuDQ~y~zMkAjWDCb2zWSSLnoyAJrvfGCO45S5tYvhkYZvVjWk3nft8vNHVKeJIF2Odv4JJSRH4MzO8EPZbaRXTaIDqj0eX0DCA8EpfcGRQTuqGERMuUnOGS50vQKYhYNsWEsFlfpVtYqYf3wtS6aaOGsfwFOtBpVBHZqfFfFTix8QMB3lxMQ5f9SG6nnjXHCCDkT6ZZfVSEBWm9K7IChIkr0vPrrr6kaOcRw~B~3sVAjFBwjBSw__" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get certified fast. Work in hospitals, nursing homes, or home health. 
                    Stable income, flexible schedules, room to grow. 4-8 weeks.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all tracking-wide antialiased">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                    <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-dc9558de-f94b-43f1-8e4a-5f45d019895f.mp4?Expires=2081095426&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=p24tUX9stSgPWZKXrqx61Sgq6TOIIlZuwwU6232SsQcohIS-1JZXY3pk2OM8UgQRG7b06Xlr33hvipNaVz8l0qOarpOTLp7cmhAXPQAi3wtrutc3Y1kF95oP6ZM3paP8rDwuuB9iuH~LYdUbNK7Vo2Q3JzCazSVESwT8xTRzLTUBYBGyeRpSPPpHE1381y7a1wyGly35~cPxzNSg~1NBLKIX-08GAbheYi15rsht-U71b9YMc84K75yP0voTGrJoOrFA8P4oj8xMsHvKTv8bU6k5FZ9lgHxCPOv~weDq63sSxs0nHsKiKhbggmc0yHKSJ7vyrtDNWY3H2wiwfZX0ZA__" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Learn heating, cooling, and refrigeration. High demand, good pay, job security. 
                    Start your own business or work for a company. 8-12 weeks.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all tracking-wide antialiased">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>


      {/* WHO WE SERVE */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              You Don't Need Perfect. You Just Need to Start.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We work with people who've been told "no" their whole lives. Justice-involved individuals. 
              Parents juggling childcare. People with gaps in their work history. You're welcome here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__5/generated-image-5ad8936e-e731-44e0-9fb9-459e8166f672.png?Expires=2080939134&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=NRIcy~TEuP1KHxghgJhRfV6TasR2~TYYzH7VPil1mMmPuqO5pvX9R8or-qCmm3r6caPRndtvSlHIAeWU2Ki6Xhsw4df3c86hoBhPrXwKVZ5e3LTzGXBu-vaT7giFPbgSIVIZNCKOOer6LzznxUHHxfnVMa8~8CAq6-8v9RGOxvr54mA2sOv~VRjRBQs~iH~vBk6mm5O2NYUMvneHcpM1x1pm-Lx0yN6S0Fe2Gf9ec8cPa1JnyDN4EOqqn2yuhSAwe3qRqZsa6b58zfaHB7oXSLVjiwEqYQiLnQU5YoBl9ZGuqZ7faq70qFfv2ze7Wob-5MHkS1jqhvlm-Qjqyu1NDA__"
                  alt="Second Chances"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Second Chances</h3>
              <p className="text-sm text-slate-700">
                Through our JRI partnership, justice-involved individuals get free training, 
                certifications, and wrap-around support. Everyone deserves a path forward.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__3/generated-image-490c99f8-5b92-43d9-b250-d9e0737d9317.png?Expires=2080924478&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=v3QMnx8aJGuSYZtAGmbfHfEzVi95DBWi3ob3iwWiuAe0bROgg8OSQodp9VHjPnu1CWtGu-5tYwmk50uP2xUUaCrsvJyjCH8DxUrSIfR-5LHD3uiP~qmXKJ80EpLTQ~XIxCoRqz9dmGosf2zfZXjhs19NCWbNo0xi1JUaEbyu66HyV25tzPSUFn0X5Y9aDcL9tLJXxyl-gVaIYdOPMlIX0WM3ZVrN0~tgA5XgcoCKwdeR5Y3zjHHZbBG6Uh2bmtbusigFgI2uHd~nu~qLVTkLGPZy1GGXZOYDf-Xm2Dm37XTspUIifLQN6FQ96dexvaqL4vGJfaYE4AyG5s0vE-LKDA__"
                  alt="Parents & Caregivers"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Parents & Caregivers</h3>
              <p className="text-sm text-slate-700">
                Our hybrid programs let you train online at your own pace and complete hands-on 
                requirements on a flexible schedule. We get it—life is complicated.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__7/generated-image-fc4dd113-8a89-4b1a-9bd6-afcac7ac3402.png?Expires=2080939098&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=Rjgc85nThSEZvNbZ02eeQxDxRNWPuoE3E2KKXPQW8Lc3tyQ1sHu010c2Kk28qMLvZ52AgC3Og30m07DkWXJc8ohPpxmuM8rp70gPlMB~nfRFLx78lxZ-gcDBhHUQ5xEQKJ~K1PIHsmdPS3XhAyMdryD04QLOfrton9ZkWfHJ1ApQzXlbE~xgFTxMMtiVusrVqNYpen1NwJhGnnB7OPmU8vYkFtxbao8o51OaUFx8iRUmY~SHYWvEwG-OW5FrFxBUeusvKkx2INqgUQpATKWCAzx0GrSasTilN49UsZARQUBcumMWf7sVGwN6L2RelRvUNu-oHs013UiYBE4qbXtAgg__"
                  alt="Career Changers"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Career Changers</h3>
              <p className="text-sm text-slate-700">
                Stuck in a dead-end job? Starting completely over? Our short-term programs 
                (4-12 weeks) get you into a new career fast—no years wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MORE PATHWAYS - STORYTELLING */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              More Ways to Change Your Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real people. Real transformations. Real opportunities waiting for you.
            </p>
          </div>

          {/* Story 1: Tax Preparation */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-100">
                <Image
                  src="https://i.imgur.com/c6WzXEy.jpg"
                  alt="Tax preparation training"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                  Tax & Finance
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  "I went from barely making ends meet to building my own future"
                </h3>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  Sarah spent years working retail—minimum wage, unpredictable schedules, and no time for her family. 
                  She knew there had to be something better, but didn't know where to start. Through our Tax & Finance 
                  program, she learned everything from tax preparation to bookkeeping and financial planning. Today, 
                  Sarah runs her own tax business from home. She sets her own hours, earns real income during tax season, 
                  and finally has her summers free to be with her kids. "I never thought I could own a business," she says. 
                  "But this program showed me I already had what it takes—I just needed the training and support."
                </p>
                <Link
                  href="/programs/tax-preparation"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition"
                >
                  Start Your Tax Business →
                </Link>
              </div>
            </div>
          </div>

          {/* Story 2: HVAC */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  Skilled Trades
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  "I went from unemployed to having companies compete for me"
                </h3>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  When Marcus lost his job during the pandemic, he felt stuck. No degree, no specialized skills, 
                  and bills piling up. A friend told him about our HVAC program, and he decided to take a chance. 
                  The training was hands-on—real equipment, real scenarios, taught by people who'd actually worked 
                  in the field. Within weeks, Marcus was troubleshooting systems and understanding the trade inside 
                  and out. Before he even finished the program, three companies reached out with job offers. Today, 
                  he works for a union shop with full benefits, steady income, and the respect that comes with being 
                  a skilled tradesperson. "I didn't just get a job," Marcus says. "I got a career I'm proud of."
                </p>
                <Link
                  href="/programs/hvac"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition"
                >
                  Explore HVAC Training →
                </Link>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2 bg-slate-100">
                <Image
                  src="https://i.imgur.com/7QrL7kQ.jpeg"
                  alt="HVAC training"
                  fill
                  quality={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Story 3: Healthcare */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-100">
                <Image
                  src="https://i.imgur.com/4JkhUSO.jpg"
                  alt="Healthcare training - helping people"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  Healthcare
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  "I always wanted to help people—now I wake up every day knowing I do"
                </h3>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  Jennifer spent years feeling like healthcare was out of reach. She thought you needed years of 
                  expensive schooling just to get started. When she learned about our CNA program, she was skeptical—
                  could she really become a healthcare professional in just a few weeks? The answer was yes. The 
                  training covered everything: patient care, medical terminology, hands-on clinical skills. Her 
                  instructors were working nurses who understood what it takes to succeed in the field. Today, 
                  Jennifer works at a local hospital, caring for patients and making a real difference in their lives. 
                  She earns steady income with benefits, and she's already planning her next step toward becoming an RN. 
                  "This isn't just a job," she says. "It's the life I was meant to live."
                </p>
                <Link
                  href="/programs/cna"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition"
                >
                  Start Healthcare Career →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <p className="text-lg text-slate-600 mb-6">
              These are real pathways. Real timelines. Real outcomes.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-lg hover:bg-orange-700 transition shadow-lg hover:shadow-xl"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* PWA Install Section */}
      <PWAInstallSection />

      {/* CTA - Talk to an Advisor */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-orange-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-blue-800">
              <Image
                src="https://i.imgur.com/vCYOioP.png"
                alt="Ready to Start"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Most students qualify for 100% free training through WIOA, WRG, or apprenticeships. 
                Let's find the right path for you.
              </p>
              <div className="flex flex-col gap-4 mb-6">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-slate-50 transition shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg hover:bg-white/20 transition"
                >
                  Talk to an Advisor
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white/90 mb-2">
                  <span className="font-semibold">Call us directly:</span>
                </p>
                <a href="tel:317-314-3757" className="text-2xl font-bold text-white hover:text-white/90 transition">
                  📞 317-314-3757
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
