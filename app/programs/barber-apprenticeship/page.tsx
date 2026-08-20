import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Scissors,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react';
import { BarberExperienceCarousel } from '@/components/programs/BarberExperienceCarousel';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Indiana | Get Paid While You Learn | Elevate for Humanity',
  description:
    'Train in a real Indiana barber shop through a registered barber apprenticeship. Build hands-on hours, work with clients under supervision, earn wages through your employer arrangement, and explore flexible self-pay options.',
  keywords:
    'barber apprenticeship Indiana, get paid to learn barbering, earn while you learn barber, barber apprenticeship Indianapolis, barber host shop, barber apprentice tips, barber payment plan',
};

const highlights = [
  {
    icon: BadgeDollarSign,
    title: 'Get Paid to Learn',
    body: 'Your apprenticeship combines structured learning with paid on-the-job training through your employer or host-shop arrangement.',
  },
  {
    icon: Store,
    title: 'Train in a Real Shop',
    body: 'Build your skills where barbers actually work instead of spending your entire program sitting in a classroom.',
  },
  {
    icon: Users,
    title: 'Work With Real Clients',
    body: 'Develop confidence, customer service, professionalism, and hands-on barbering skills under appropriate supervision.',
  },
  {
    icon: TrendingUp,
    title: 'Build Income Potential',
    body: 'As your skills grow, you build experience and clientele. Tips may also be available depending on shop policy and applicable requirements.',
  },
];

export default function BarberApprenticeshipPage() {
  return (
    <main className="bg-white text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        >
          <source src="/videos/barber-hero-final.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 lg:py-44">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-black uppercase tracking-wide text-white">
                Earn While You Learn
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                Registered Apprenticeship
              </span>
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">
              Become a barber.
              <span className="mt-2 block text-orange-400">Get paid while you learn.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
              Train inside a real barber shop, work beside experienced barbers, serve clients under supervision, build your required apprenticeship hours, and gain real-world experience while you learn the trade.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-orange-600"
              >
                Start My Barber Apprenticeship
              </Link>
              <Link
                href="/program-holders/barber-apprenticeship"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Become a Host Shop
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-300">
              Apprentice compensation and tipping opportunities depend on the employer or host-shop arrangement, shop policy, and applicable requirements.
            </p>
          </div>
        </div>
      </section>

      <BarberExperienceCarousel />

      <section className="bg-orange-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">Why apprenticeship feels different</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">You are learning the profession by being in the profession.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              This is not a page full of subjects to memorize. The experience is built around becoming comfortable in the shop, working with people, developing your craft, learning professional expectations, and steadily building the hours and experience needed for your career path.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="inline-flex rounded-2xl bg-slate-950 p-3 text-orange-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">What your week can look like</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Work the shop. Learn the craft. Track your progress.</h2>
            <div className="mt-8 space-y-5">
              {[
                'Report to your approved host shop and work your scheduled apprenticeship hours.',
                'Learn beside licensed or qualified professionals and receive hands-on guidance.',
                'Serve clients under the supervision and rules required by your shop and apprenticeship arrangement.',
                'Build professional habits: station setup, sanitation, customer service, time management, and shop culture.',
                'Complete related instruction and keep your apprenticeship hours, documents, and progress organized.',
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 flex-none text-green-600" />
                  <p className="text-lg leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl md:p-10">
            <Scissors className="h-10 w-10 text-orange-400" />
            <h3 className="mt-5 text-3xl font-black">Earn wages. Build clientele. Tips may apply.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Registered apprenticeship is designed around paid work-based learning. Your actual wage is determined by your employer or host-shop arrangement. When permitted by the shop and applicable requirements, client service may also create opportunities to earn tips while you build your reputation and customer relationships.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <BriefcaseBusiness className="h-5 w-5 text-orange-400" />
                <p className="mt-2 font-bold">Paid OJT</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <Users className="h-5 w-5 text-orange-400" />
                <p className="mt-2 font-bold">Client Experience</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <TrendingUp className="h-5 w-5 text-orange-400" />
                <p className="mt-2 font-bold">Income Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">Self-pay enrollment</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Start your career without waiting on outside funding.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Self-pay is a direct enrollment option. You do not have to treat it like a backup plan. Flexible payment arrangements can make the program easier to manage while you move forward with your apprenticeship.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Program tuition</p>
                  <p className="mt-2 text-4xl font-black">$4,950</p>
                  <p className="mt-2 text-sm text-slate-600">Current listed program cost.</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Payment flexibility</p>
                  <p className="mt-2 text-2xl font-black">Payment plans available</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Choose a supported payment option at enrollment rather than assuming the full cost must be paid all at once.</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/checkout/barber-apprenticeship?method=stripe"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-950 px-6 py-4 font-black text-white hover:bg-slate-800"
                >
                  Enroll Self-Pay
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-slate-300 px-6 py-4 font-black text-slate-900 hover:bg-slate-50"
                >
                  Ask About a Payment Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2rem] bg-orange-500 p-8 text-slate-950 md:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em]">For barber shop owners</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Grow your shop. Train the next generation.</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8">
                  Become an apprenticeship host shop and help develop new barber talent inside a structured program. Elevate supports the apprenticeship process while the shop provides the real workplace, mentorship, and supervised experience that makes the training meaningful.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950 p-7 text-white">
                <h3 className="text-2xl font-black">Host shop highlights</h3>
                <div className="mt-5 space-y-3 text-slate-200">
                  <p>• Develop talent inside your own shop culture.</p>
                  <p>• Provide supervised real-world barber experience.</p>
                  <p>• Build a longer-term talent pipeline.</p>
                  <p>• Participate in a structured apprenticeship model.</p>
                </div>
                <Link
                  href="/program-holders/barber-apprenticeship"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 font-black text-slate-950 hover:bg-slate-100"
                >
                  Become a Host Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Clock3 className="mx-auto h-9 w-9 text-orange-400" />
          <h2 className="mt-4 text-4xl font-black md:text-5xl">Your barber career does not have to wait until training is over.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Start building your hours, your skills, your client experience, and your professional identity in the shop while you complete the apprenticeship.
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-lg font-black text-white shadow-lg hover:bg-orange-600"
          >
            Start My Barber Apprenticeship
          </Link>
        </div>
      </section>
    </main>
  );
}
