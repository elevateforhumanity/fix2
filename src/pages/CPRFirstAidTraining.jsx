import React from 'react';
import { Award, Heart, CheckCircle, Users, Clock, BookOpen, ExternalLink, Phone, Mail, AlertCircle } from 'lucide-react';

/**
 * CPR & First Aid Training
 * Elevate for Humanity Career and Training Institute
 * Training supplies shipped to your home
 * HSI Partner - Sales Director: Geoff Albrecht (galbrecht@hsi.com, 949-456-8366)
 */

const CPRFirstAidTraining = () => {
  const hsiUrl = 'https://www.hsi.com';
  const hsiProgramsUrl = 'https://hsi.com/solutions/cpr-aed-first-aid-training/programs';
  const hsiRSVUrl = 'https://hsi.com/solutions/cpr-aed-first-aid-training/remote-skills-verification';
  const hsiSafetyUrl = 'http://store.osmanager4.com/emss/groups/523';
  
  // Pricing with 50% markup (includes all supplies, instruction, shipping)
  const pricing = {
    'cpr-aed-all-ages': { cost: 60, price: 90 },
    'cpr-aed-adult': { cost: 50, price: 75 },
    'first-aid-cpr-all-ages': { cost: 80, price: 120 },
    'first-aid-cpr-adult': { cost: 70, price: 105 }
  };

  const courses = [
    {
      id: 'cpr-aed-all-ages',
      title: 'CPR/AED (All Ages)',
      description: 'Learn CPR and AED use for adults, children, and infants',
      duration: '4-6 hours',
      format: 'Online + Live Skills Session',
      certification: 'CPR/AED Certification (2-year validity)',
      price: 90,
      topics: [
        'Adult CPR and AED',
        'Child CPR and AED',
        'Infant CPR',
        'Choking relief for all ages',
        'Emergency response procedures'
      ],
      enrollmentUrl: 'https://otis.osmanager4.com/#/nts/openenrollment/906B45CC-211D-48B3-A2FE-71D2C6D464F3',
      color: 'red',
      icon: '❤️'
    },
    {
      id: 'cpr-aed-adult',
      title: 'CPR/AED (Adult Only)',
      description: 'CPR and AED training focused on adult victims',
      duration: '3-4 hours',
      format: 'Online + Live Skills Session',
      certification: 'CPR/AED Certification (2-year validity)',
      price: 75,
      topics: [
        'Adult CPR techniques',
        'AED operation',
        'Adult choking relief',
        'Emergency scene assessment',
        'Calling for help'
      ],
      enrollmentUrl: 'https://otis.osmanager4.com/#/nts/openenrollment/8B978D3E-85A4-48E7-AFF2-5F01FFF12F35',
      color: 'blue',
      icon: '💙'
    },
    {
      id: 'first-aid-cpr-all-ages',
      title: 'Adult First Aid, CPR/AED (All Ages)',
      description: 'Comprehensive first aid and CPR training for all ages',
      duration: '6-8 hours',
      format: 'Online + Live Skills Session',
      certification: 'First Aid, CPR/AED Certification (2-year validity)',
      price: 120,
      topics: [
        'First aid for injuries and illnesses',
        'CPR for all ages',
        'AED use',
        'Bleeding control',
        'Shock management',
        'Burns, fractures, and sprains'
      ],
      enrollmentUrl: 'https://otis.osmanager4.com/#/nts/openenrollment/D84A8E63-967E-4A63-944A-AA3E33D777A8',
      color: 'green',
      icon: '💚'
    },
    {
      id: 'first-aid-cpr-adult',
      title: 'Adult First Aid, CPR/AED (Adult Only)',
      description: 'First aid and adult CPR training',
      duration: '5-7 hours',
      format: 'Online + Live Skills Session',
      certification: 'First Aid, CPR/AED Certification (2-year validity)',
      price: 105,
      topics: [
        'Adult first aid',
        'Adult CPR and AED',
        'Wound care',
        'Medical emergencies',
        'Environmental emergencies',
        'Injury assessment'
      ],
      enrollmentUrl: 'https://otis.osmanager4.com/#/nts/openenrollment/A373CD50-3045-49B1-B119-62A1DC5EFF47',
      color: 'purple',
      icon: '💜'
    }
  ];

  const benefits = [
    {
      title: 'Training Supplies Shipped Home',
      description: 'Practice manikins and materials delivered to your door',
      icon: '📦'
    },
    {
      title: 'Nationally Recognized',
      description: 'Certifications accepted by employers nationwide',
      icon: Award
    },
    {
      title: 'Online + Live Training',
      description: 'Self-paced online modules plus live skills session',
      icon: BookOpen
    },
    {
      title: '2-Year Certification',
      description: 'Valid for 2 years from date of completion',
      icon: Clock
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: 'bg-red-50 border-red-300',
      blue: 'bg-blue-50 border-blue-300',
      green: 'bg-green-50 border-green-300',
      purple: 'bg-purple-50 border-purple-300'
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Heart className="w-20 h-20" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              CPR & First Aid Certification
            </h1>
            <p className="text-2xl mb-6">
              Training Supplies Shipped to Your Home
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get certified in CPR and First Aid with our convenient home training program. 
              Complete online training, receive practice manikins at home, and attend live skills session.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#courses"
                className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
              >
                View Courses
              </a>
              <a
                href={hsiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-red-600 transition flex items-center"
              >
                Visit HSI
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Convenient Home Training Program</h2>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Get nationally recognized CPR and First Aid certifications with training supplies 
            delivered right to your home. Our program combines online learning with live skills 
            practice to ensure you're prepared for real emergencies.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {benefits.map((benefit, index) => {
              const Icon = typeof benefit.icon === 'string' ? null : benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
                    {Icon ? <Icon className="w-8 h-8 text-red-600" /> : benefit.icon}
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courses */}
        <div id="courses" className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Available Courses</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(course.color)}`}>
                <div className="text-5xl mb-4 text-center">{course.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-center">{course.title}</h3>
                <p className="text-gray-700 mb-4 text-center">{course.description}</p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold text-sm">{course.duration}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Format</p>
                    <p className="font-semibold text-sm">{course.format}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Price</p>
                    <p className="font-bold text-lg text-green-700">${course.price}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-sm">What You'll Learn:</p>
                  <ul className="space-y-1">
                    {course.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-1">Certification:</p>
                  <p className="text-sm text-gray-700">{course.certification}</p>
                </div>

                <a
                  href="#enroll"
                  className="block w-full bg-white border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-800 hover:text-white transition text-center"
                >
                  Enroll in This Course
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">How Home Training Works</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Enroll & Pay</h3>
              <p className="text-sm">
                Register and pay for your course
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">📦 Supplies Shipped</h3>
              <p className="text-sm">
                Training manikins delivered to your home
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Online Training</h3>
              <p className="text-sm">
                Complete self-paced online modules
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Live Skills Session</h3>
              <p className="text-sm">
                Attend hands-on practice session
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                5
              </div>
              <h3 className="font-bold mb-2">Get Certified</h3>
              <p className="text-sm">
                Receive your certification card
              </p>
            </div>
          </div>
        </div>

        {/* Who Needs This */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Who Needs CPR/First Aid Certification?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Healthcare Workers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Nurses and medical assistants</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Home health aides</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dental professionals</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Childcare & Education</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Teachers and school staff</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Daycare providers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Camp counselors</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Other Professionals</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fitness trainers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Security personnel</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Anyone wanting to help</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Home Delivery Highlight */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-4 border-green-400 rounded-lg p-8 mb-12">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-3xl font-bold mb-4 text-green-800">Training Supplies Delivered to Your Home!</h2>
            <p className="text-xl text-gray-700 mb-6">
              We ship practice manikins and all training materials directly to your door
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">What's Included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>CPR practice manikins (adult, child, infant as needed)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Training AED device</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>First aid supplies and bandages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Training manual and materials</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">After Enrollment:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Receive email with training access link</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Provide your shipping address</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Training supplies shipped within 2-3 business days</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Schedule your live skills session</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enrollment Section */}
        <div id="enroll" className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg p-12 mb-12">
          <h2 className="text-4xl font-bold mb-4 text-center">Ready to Get Certified?</h2>
          <p className="text-xl mb-8 text-center">
            Contact us to enroll in CPR and First Aid training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:elevateforhumanity@gmail.com?subject=CPR/First Aid Training Enrollment"
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition text-center flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email to Enroll
            </a>
            <a
              href="tel:+13173143757"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-red-600 transition text-center flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (317) 314-3757
            </a>
          </div>
        </div>

        {/* Additional Safety Courses */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Online Safety Training Courses</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Expand your safety knowledge with our comprehensive online safety training courses
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Workplace Safety</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>OSHA compliance training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hazard communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Emergency action plans</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Bloodborne Pathogens</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Exposure control</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Personal protective equipment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Infection prevention</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Specialized Training</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fire safety</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ergonomics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Workplace violence prevention</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <a
              href={hsiSafetyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
            >
              Browse All Safety Courses
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Remote Skills Verification */}
        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Remote Skills Verification (RSV)</h2>
          <p className="text-center text-gray-700 mb-6 max-w-2xl mx-auto">
            Can't attend an in-person skills session? Complete your certification with Remote Skills Verification
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-3">How RSV Works:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete online training modules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Receive training manikins at home</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Record yourself performing skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Submit video for instructor review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Get certified remotely</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-3">RSV Benefits:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete certification 100% remotely</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>No need to travel to training center</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Practice at your own pace</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Same nationally recognized certification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Perfect for busy schedules</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <a
              href={hsiRSVUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-purple-700 transition"
            >
              Learn More About RSV
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About CPR/First Aid Training?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Contact us for more information about certification courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:elevateforhumanity@gmail.com"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              elevateforhumanity@gmail.com
            </a>
            <a
              href="tel:+13173143757"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPRFirstAidTraining;
