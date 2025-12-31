import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Heart,
  Users,
  Sparkles,
  ShoppingBag,
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'RISE Foundation - Selfish Inc. | Mental Wellness & Holistic Healing',
  description: 'Your Partner in Mental Wellness and Holistic Healing. Trauma recovery, addiction rehabilitation, divorce support, and mindfulness workshops.',
};

export default function RiseFoundationPage() {
  const programs = [
    {
      title: 'Trauma Recovery',
      description: 'Healing from past trauma with professional support and evidence-based therapies',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/rise-foundation/trauma-recovery'
    },
    {
      title: 'Addiction Rehabilitation',
      description: 'Comprehensive support for overcoming addiction and building lasting recovery',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/rise-foundation/addiction-rehabilitation'
    },
    {
      title: 'Divorce Support',
      description: 'Navigate divorce with emotional support, counseling, and practical guidance',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/rise-foundation/divorce-support'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="RISE Foundation"
              width={200}
              height={80}
              className="mx-auto brightness-0 invert"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-semibold">Selfish Inc. (dba) Rise Forward Foundation</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Welcome to Selfish Inc.
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-purple-100">
            Your Partner in Mental Wellness and Holistic Healing
          </h2>

          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
            We provide trauma recovery, addiction rehabilitation, divorce support, and mindfulness workshops to help you heal and thrive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all uppercase"
            >
              <Heart className="w-6 h-6" />
              <span>Donate Now</span>
            </Link>
            <Link
              href="#programs"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white hover:text-purple-600 transition-all"
            >
              <span>Our Programs</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mind, Body, Spirit Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Mind, Body & Spirit
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We believe in holistic healing that addresses your complete well-being. 
                Our programs integrate mental wellness, physical health, and spiritual growth.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Mental Wellness</strong>
                    <p className="text-gray-600">Professional counseling and therapy services</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Holistic Healing</strong>
                    <p className="text-gray-600">Mindfulness, meditation, and wellness practices</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Community Support</strong>
                    <p className="text-gray-600">Connect with others on similar healing journeys</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Mind Body Spirit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Healing Products Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Shop Our Healing Products
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Browse items designed to uplift your mood and body
          </p>
          <Link
            href="https://curvaturebodysculpting.store/"
            target="_blank"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-5 rounded-xl text-lg font-black shadow-xl hover:scale-105 transition-all"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>SHOP NOW</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mindfulness Workshops, Mental Wellness Programs, Holistic Mental Health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <Link
                key={idx}
                href={program.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-purple-500 hover:-translate-y-2 transform"
              >
                <div className="relative h-64">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-bold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Mindfulness Workshops
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Join our workshops to learn mindfulness techniques, stress management, and holistic wellness practices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rise-foundation/workshops"
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
            >
              <span>View Workshops</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/rise-foundation/sign-up"
              className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all"
            >
              <span>Sign Up Now</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Meet the Founder
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn about the vision and mission behind Selfish Inc. and how we're transforming lives through mental wellness and holistic healing.
              </p>
              <Link
                href="/rise-foundation/meet-the-founder"
                className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-purple-700 hover:scale-105 transition-all shadow-lg"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Donate */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Your donation helps us provide mental wellness services to those who need it most
          </p>
          <Link
            href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
            target="_blank"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-12 py-6 rounded-xl text-xl font-black shadow-2xl hover:scale-105 transition-all"
          >
            <Heart className="w-6 h-6" />
            <span>Donate Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-orange-100 mt-6">
            Every contribution makes a difference in someone's healing journey
          </p>
        </div>
      </section>
    </main>
  );
}
