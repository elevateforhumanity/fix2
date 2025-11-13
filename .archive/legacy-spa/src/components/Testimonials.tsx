import { Card } from './ds';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marcus T.',
    role: 'Barber Apprentice',
    quote: 'I started earning within two weeks. The team matched me to a shop and helped with my hours and license steps.',
  },
  {
    name: 'Alicia R.',
    role: 'Building Tech Trainee',
    quote: 'They aligned funding through WorkOne and placed me with a facilities team—hands-on, paid, and supportive.',
  },
  {
    name: 'Devon P.',
    role: 'CNA Graduate',
    quote: 'I finished CNA quickly and got help with interviews. Clear steps, real outcomes.',
  },
];

export default function Testimonials() {
  return (
    <section aria-label="Student testimonials" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-slate-900">What learners say</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} variant="default">
              <figure>
                <blockquote className="text-slate-800">
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{testimonial.name}</span>
                  {' — '}
                  {testimonial.role}
                </figcaption>
              </figure>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
