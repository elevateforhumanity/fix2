import React from 'react';
import { Palette, Eye, Target, Sparkles } from 'lucide-react';

export default function Branding() {
  const brandValues = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Purpose-Driven',
      desc: 'Every element serves our mission',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Accessible',
      desc: 'Clear, inclusive, and welcoming',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Empowering',
      desc: 'Inspiring action and growth',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Professional',
      desc: 'Credible and trustworthy',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-50">
      <section className="bg-green-600 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            EFH Ecosystem Visual Identity
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Our brand reflects our commitment to elevating individuals and
            communities through workforce development.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-900 mb-4">
              Brand Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-brown-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/10 rounded-lg mb-4 text-green-600">
                  {value.icon}
                </div>
                <h3 className="font-bold text-brown-900 mb-2">{value.title}</h3>
                <p className="text-sm text-brown-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-brown-900 mb-8 text-center">
            Color Palette
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-24 bg-green-600 rounded-lg mb-2" />
              <div className="font-medium">Primary Blue</div>
              <div className="text-sm text-brown-600">#0B2545</div>
            </div>
            <div className="text-center">
              <div className="h-24 bg-brown-600 rounded-lg mb-2" />
              <div className="font-medium">Secondary Orange</div>
              <div className="text-sm text-brown-600">#FF6B35</div>
            </div>
            <div className="text-center">
              <div className="h-24 bg-green-600 rounded-lg mb-2" />
              <div className="font-medium">Info Blue</div>
              <div className="text-sm text-brown-600">#00a544</div>
            </div>
            <div className="text-center">
              <div className="h-24 bg-green-600 rounded-lg mb-2" />
              <div className="font-medium">Success Green</div>
              <div className="text-sm text-brown-600">#00a544</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">
            Brand Assets
          </h2>
          <p className="text-brown-600 mb-8">
            Download logos, style guides, and marketing materials
          </p>
          <a href="/contact" className="btn">
            Request Brand Kit
          </a>
        </div>
      </section>
    </div>
  );
}
