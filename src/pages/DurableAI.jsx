import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

export default function DurableAI() {
  return (
    <div>
      <Helmet>
        <title>AI-Powered Learning | Elevate for Humanity</title>
        <meta
          name="description"
          content="Experience the future of education with our AI-powered learning platform. Get personalized recommendations, adaptive learning paths, and intelligent tutoring."
        />
      </Helmet>

      <Navigation />

      <Hero
        title="AI-Powered Learning"
        subtitle="Experience the future of education with intelligent, adaptive learning"
        backgroundImage="/images/ai-learning-hero.jpg"
      />

      <div className="section">
        <div className="container max-w-4xl">
          {/* Coming Soon Notice */}
          <div className="card p-8 text-center mb-12 bg-gradient-to-r from-green-50 to-beige-50 border-l-4 border-green-600">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-3xl font-bold text-brown-900 mb-4">
              Coming Soon - Q2 2025
            </h2>
            <p className="text-lg text-brown-600">
              We're building the next generation of AI-powered workforce
              training
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-brown-900 mb-8 text-center">
              What to Expect
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Adaptive Learning Paths
                </h3>
                <p className="text-brown-600">
                  AI tailors your learning journey to your pace, style, and
                  goals
                </p>
              </div>

              <div className="card p-6">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Personalized Recommendations
                </h3>
                <p className="text-brown-600">
                  Get smart suggestions for courses and content based on your
                  progress
                </p>
              </div>

              <div className="card p-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Real-Time Analytics
                </h3>
                <p className="text-brown-600">
                  Track your progress with intelligent insights and predictions
                </p>
              </div>

              <div className="card p-6">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Intelligent Tutoring
                </h3>
                <p className="text-brown-600">
                  Get instant feedback and personalized help when you need it
                </p>
              </div>

              <div className="card p-6">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Skill Gap Analysis
                </h3>
                <p className="text-brown-600">
                  Automated identification of areas for improvement
                </p>
              </div>

              <div className="card p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Smart Content
                </h3>
                <p className="text-brown-600">
                  AI-curated learning materials matched to your needs
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="card p-8 text-center bg-green-50">
            <h3 className="text-2xl font-bold text-brown-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-brown-600 mb-6">
              Be the first to know when AI-powered learning launches
            </p>
            <a href="/contact" className="btn-primary">
              Get Notified
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
