import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, TrendingUp, Award, Clock } from "lucide-react";

export const metadata = {
  title: "Success Stories | Elevate For Humanity",
  description: "Real stories from real graduates. See how free workforce training changed lives and launched careers in Indianapolis.",
};

export default function SuccessStoriesPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-2xl text-blue-100 mb-8">
              Real people. Real training. Real careers. These are the stories of graduates who transformed their lives through Elevate For Humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-slate-600">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <p className="text-slate-600">Job Placement Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">$45K</div>
              <p className="text-slate-600">Avg Starting Salary</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4-12</div>
              <p className="text-slate-600">Weeks to Complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Graduate Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              From unemployed to employed. From struggling to thriving.
            </p>
          </div>

          <div className="space-y-16">
            {successStories.map((story, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {story.program}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Award size={16} />
                    <span>{story.credential}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {story.name}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6 italic">
                    "{story.quote}"
                  </p>

                  {/* Journey */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold text-sm">Before</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">The Challenge</p>
                        <p className="text-slate-600">{story.before}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">After</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">The Outcome</p>
                        <p className="text-slate-600">{story.after}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <Clock size={18} />
                        <span className="text-sm font-semibold">Duration</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{story.duration}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <TrendingUp size={18} />
                        <span className="text-sm font-semibold">Salary</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{story.salary}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-orange-600 mb-1">
                        <Briefcase size={18} />
                        <span className="text-sm font-semibold">Employer</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{story.employer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Stories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              More Graduate Stories
            </h2>
            <p className="text-xl text-slate-600">
              Every graduate has a unique journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreStories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                    {story.initials}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-slate-900">{story.name}</p>
                    <p className="text-sm text-slate-600">{story.program}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic mb-4">"{story.quote}"</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-green-600">{story.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Success Story Starts Here
          </h2>
          <p className="text-2xl text-orange-100 mb-8">
            Join hundreds of graduates who transformed their lives through free career training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now
              <ArrowRight size={24} />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-700 rounded-full hover:bg-orange-800 transition-all hover:scale-105 border-2 border-white/30 shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data
const successStories = [
  {
    name: "Marcus Johnson",
    initials: "M.J.",
    program: "CNA Training",
    credential: "Certified Nursing Assistant",
    image: "/images/students-new/student-17.jpg",
    quote: "I went from unemployed to working at a hospital in 6 weeks. This program changed my life and gave me a career I'm proud of.",
    before: "Unemployed for 8 months after being laid off. Struggling to pay bills and support my family. No healthcare experience.",
    after: "Completed CNA training in 6 weeks, passed state exam on first try. Hired at Community Hospital within 2 weeks of graduation.",
    duration: "6 weeks",
    salary: "$18/hr",
    employer: "Community Hospital",
  },
  {
    name: "Tasha Williams",
    initials: "T.W.",
    program: "HVAC Technician",
    credential: "EPA 608 Certified",
    image: "/images/students-new/student-13.jpg",
    quote: "Free training, real skills, and a job waiting for me when I finished. I'm making more money than I ever thought possible.",
    before: "Working retail for $12/hr with no benefits. Single mom struggling to make ends meet. Wanted a career with growth potential.",
    after: "Completed HVAC training, earned EPA certification. Hired by local HVAC company with full benefits and career advancement opportunities.",
    duration: "10 weeks",
    salary: "$22/hr",
    employer: "Comfort Systems",
  },
  {
    name: "David Rodriguez",
    initials: "D.R.",
    program: "CDL Training",
    credential: "Class A CDL",
    image: "/images/students-new/student-11.jpg",
    quote: "I'm making more money than I ever have, and I got my CDL without paying a dime. Best decision I ever made.",
    before: "Working multiple part-time jobs to support family. No stable income or benefits. Wanted a career that paid well.",
    after: "Earned Class A CDL in 5 weeks. Hired by national carrier with sign-on bonus, full benefits, and consistent routes.",
    duration: "5 weeks",
    salary: "$60K/yr",
    employer: "National Transport",
  },
];

const moreStories = [
  {
    initials: "S.B.",
    name: "Sarah B.",
    program: "Medical Assistant",
    quote: "From working fast food to working in healthcare. I have a career now, not just a job.",
    outcome: "Hired at family practice clinic at $17/hr",
  },
  {
    initials: "J.M.",
    name: "James M.",
    program: "Building Maintenance",
    quote: "The hands-on training prepared me for real work. I got hired before I even finished the program.",
    outcome: "Property maintenance tech at $19/hr",
  },
  {
    initials: "L.T.",
    name: "Lisa T.",
    program: "Barber Training",
    quote: "I own my own chair now and make my own schedule. This training gave me independence.",
    outcome: "Licensed barber earning $800-1200/week",
  },
  {
    initials: "K.W.",
    name: "Kevin W.",
    program: "IT Support",
    quote: "I went from no tech experience to working in IT. The support services helped me get through the program.",
    outcome: "Help desk technician at $21/hr",
  },
  {
    initials: "M.H.",
    name: "Maria H.",
    program: "Phlebotomy",
    quote: "Quick training, real certification, and a job in healthcare. Everything I needed to change my life.",
    outcome: "Phlebotomist at hospital lab at $16/hr",
  },
  {
    initials: "T.J.",
    name: "Terrell J.",
    program: "Welding",
    quote: "The instructors cared about my success. They didn't give up on me, so I didn't give up on myself.",
    outcome: "Welder at manufacturing plant at $24/hr",
  },
];
