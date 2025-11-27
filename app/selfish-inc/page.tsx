import Link from "next/link";
import Image from "next/image";

export default function SelfishIncPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative border-b border-slate-100 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Welcome to Selfish Inc.
            </h1>
            <p className="mt-4 text-xl text-slate-700 md:text-2xl">
              Your Partner in Mental Wellness and Holistic Healing
            </p>
            <p className="mt-6 mx-auto max-w-3xl text-base text-slate-600">
              At Selfish Inc, we believe that prioritizing mental wellness is essential for everyone. 
              Our mission is to raise awareness and provide support for those navigating mental health challenges. 
              Together, we can break the stigma and promote a healthier, happier community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-purple-600 px-8 py-3 text-base font-semibold text-white hover:bg-purple-700"
              >
                Donate Now
              </Link>
              <Link
                href="#programs"
                className="rounded-full border-2 border-purple-600 px-8 py-3 text-base font-semibold text-purple-600 hover:bg-purple-50"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mind, Body, Spirit Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Holistic Approach to Wellness
              </h2>
              <p className="mt-4 text-base text-slate-700">
                We take a holistic approach to mental health, addressing the mind, body, and spirit. 
                Our programs provide vital support for individuals facing challenges related to trauma, 
                divorce, and addiction.
              </p>
              <p className="mt-4 text-base text-slate-700">
                Your donations can significantly enhance our programs, allowing us to reach more 
                individuals in need and provide them with the tools they need to rebuild their lives.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/selfish-inc/mind-body-spirit.jpg"
                alt="Mind, Body and Spirit - Zen stones with wellness words"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Our Wellness Programs
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Comprehensive support for mental health and holistic healing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Trauma Recovery */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/media/selfish-inc/trauma-recovery.jpg"
                  alt="Trauma Recovery Support"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Trauma Recovery
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Therapeutic workshops, support groups, and mindfulness training for individuals 
                seeking to heal from traumatic experiences. We provide the tools needed to rebuild lives.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Therapeutic workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Support groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Mindfulness training</span>
                </li>
              </ul>
            </div>

            {/* Divorce Support */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/media/selfish-inc/divorce-support.jpg"
                  alt="Divorce Support Services"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Divorce Support
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Workshops on emotional adjustment, co-parenting support, and individual counseling. 
                We help individuals navigate the complexities of divorce and foster personal growth.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Emotional adjustment workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Co-parenting support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Individual counseling</span>
                </li>
              </ul>
            </div>

            {/* Addiction Recovery */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/media/selfish-inc/addiction-support.jpg"
                  alt="Addiction Recovery Programs"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Addiction Recovery
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Personalized treatment plans, group therapy sessions, and relapse prevention workshops. 
                We support those overcoming substance use disorders to achieve lasting recovery.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Personalized treatment plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Group therapy sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Relapse prevention workshops</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Upcoming Workshops
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Join our expert-led sessions to improve your mental wellness
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Mindful Living Workshop
              </h3>
              <p className="mt-2 text-sm text-purple-600 font-medium">
                May 2025
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Dive into the practice of mindfulness with expert-led sessions. Discover techniques 
                to reduce stress and improve emotional resilience.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-purple-600 hover:underline"
              >
                Sign Up →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Emotional Resilience Training
              </h3>
              <p className="mt-2 text-sm text-blue-600 font-medium">
                August 2025
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Learn strategies to bounce back from life's challenges. This workshop will equip 
                you with tools for better emotional health.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
              >
                Reserve Your Spot →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Community Support Circle
              </h3>
              <p className="mt-2 text-sm text-green-600 font-medium">
                November 2025
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Connect with others in a safe space to share experiences and learn from one another. 
                Community support is key to mental wellness.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-green-600 hover:underline"
              >
                Get Involved →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Group Support Section */}
      <section className="bg-purple-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/selfish-inc/group-support.jpg"
                alt="Group support sessions"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Community Support Groups
              </h2>
              <p className="mt-4 text-base text-slate-700">
                Our group support sessions provide a safe and nurturing space for individuals to 
                share their experiences, connect with others, and find strength in community.
              </p>
              <p className="mt-4 text-base text-slate-700">
                Whether you're dealing with trauma, navigating divorce, or overcoming addiction, 
                you don't have to face it alone. Join our supportive community today.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-full bg-purple-600 px-6 py-3 text-base font-semibold text-white hover:bg-purple-700"
              >
                Join a Support Group
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Make a Difference with Us!
            </h2>
            <p className="mt-4 text-base text-slate-700">
              Join the movement at Selfish Inc and become a volunteer dedicated to community support 
              and empowerment. Whether you're interested in community service, social impact, or 
              nonprofit work, your skills and time can help us create lasting change.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-purple-600 px-8 py-3 text-base font-semibold text-white hover:bg-purple-700"
              >
                Volunteer Sign Up
              </Link>
              <Link
                href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-purple-600 px-8 py-3 text-base font-semibold text-purple-600 hover:bg-purple-50"
              >
                Donate to Our Cause
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="border-t border-slate-100 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Meet the Founder
          </h2>
          <p className="mt-4 text-lg font-semibold text-purple-600">
            Elizabeth Greene
          </p>
          <p className="mt-2 text-base text-slate-700">
            Founder of Selfish, Inc.
          </p>
          <p className="mt-6 mx-auto max-w-2xl text-base text-slate-600">
            Elizabeth Greene founded Selfish Inc with a vision to break the stigma surrounding 
            mental health and provide accessible, holistic support for individuals in need. 
            Her dedication to mental wellness and community empowerment drives our mission forward.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-100 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Together, We Can Make a Difference!
          </h2>
          <p className="mt-4 text-base text-slate-700">
            Every action counts—whether it's participating in a workshop, donating, or sharing your story. 
            Together, we can foster a community of understanding and support.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-purple-600 px-8 py-3 text-base font-semibold text-white hover:bg-purple-700"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-slate-300 px-8 py-3 text-base font-semibold text-slate-700 hover:border-purple-600 hover:text-purple-600"
            >
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Selfish Inc is a 501(c)(3) nonprofit organization (EIN: 99-3483511)
          </p>
        </div>
      </section>
    </main>
  );
}
