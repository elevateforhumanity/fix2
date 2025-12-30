import { Metadata } from 'next';
import Image from 'next/image';
import DiscussionForums from '@/components/forums/DiscussionForums';

export const metadata: Metadata = {
  title: 'Community Forums | Connect with Students & Alumni | Elevate for Humanity',
  description:
    'Join our community forums to connect with students, alumni, and instructors. Ask questions, share experiences, and get support on your career journey.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/forums',
  },
};

export const dynamic = 'force-dynamic';

export default function ForumsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/learners/graduates-celebrating.jpg"
          alt="Community Forums"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Community Forums
          </h1>
          <p className="text-xl md:text-2xl">
            Connect, Learn, and Grow Together
          </p>
        </div>
      </section>

      {/* Forums Component */}
      <DiscussionForums />
    </main>
  );
}
