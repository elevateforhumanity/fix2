#!/usr/bin/env node

/**
 * Generate quizzes for all courses
 * Creates quiz questions and answers for each course module
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Quiz templates by program type
const quizTemplates = {
  'Digital Marketing': [
    {
      question: 'What is SEO?',
      answers: [
        { text: 'Search Engine Optimization', correct: true },
        { text: 'Social Engine Optimization', correct: false },
        { text: 'Search Email Optimization', correct: false },
        { text: 'Social Email Optimization', correct: false }
      ]
    },
    {
      question: 'Which platform is best for B2B marketing?',
      answers: [
        { text: 'LinkedIn', correct: true },
        { text: 'TikTok', correct: false },
        { text: 'Snapchat', correct: false },
        { text: 'Pinterest', correct: false }
      ]
    },
    {
      question: 'What does CTR stand for?',
      answers: [
        { text: 'Click-Through Rate', correct: true },
        { text: 'Cost-Through Rate', correct: false },
        { text: 'Click-Time Rate', correct: false },
        { text: 'Cost-Time Rate', correct: false }
      ]
    },
    {
      question: 'What is A/B testing?',
      answers: [
        { text: 'Comparing two versions to see which performs better', correct: true },
        { text: 'Testing alphabetically', correct: false },
        { text: 'Testing twice', correct: false },
        { text: 'Testing with two people', correct: false }
      ]
    },
    {
      question: 'What is a conversion in digital marketing?',
      answers: [
        { text: 'When a user completes a desired action', correct: true },
        { text: 'When a user visits a website', correct: false },
        { text: 'When a user clicks an ad', correct: false },
        { text: 'When a user shares content', correct: false }
      ]
    }
  ],
  'Welding': [
    {
      question: 'What does MIG stand for in welding?',
      answers: [
        { text: 'Metal Inert Gas', correct: true },
        { text: 'Metal Iron Gas', correct: false },
        { text: 'Molten Inert Gas', correct: false },
        { text: 'Metal Industrial Gas', correct: false }
      ]
    },
    {
      question: 'What is the most important safety equipment for welding?',
      answers: [
        { text: 'Welding helmet with proper shade', correct: true },
        { text: 'Regular sunglasses', correct: false },
        { text: 'Baseball cap', correct: false },
        { text: 'Reading glasses', correct: false }
      ]
    },
    {
      question: 'What does TIG welding stand for?',
      answers: [
        { text: 'Tungsten Inert Gas', correct: true },
        { text: 'Titanium Inert Gas', correct: false },
        { text: 'Tungsten Iron Gas', correct: false },
        { text: 'Thermal Inert Gas', correct: false }
      ]
    },
    {
      question: 'What is the purpose of welding flux?',
      answers: [
        { text: 'Protect the weld from contamination', correct: true },
        { text: 'Make the weld look shiny', correct: false },
        { text: 'Speed up cooling', correct: false },
        { text: 'Increase heat', correct: false }
      ]
    },
    {
      question: 'What organization certifies welders in the US?',
      answers: [
        { text: 'AWS (American Welding Society)', correct: true },
        { text: 'OSHA', correct: false },
        { text: 'EPA', correct: false },
        { text: 'FDA', correct: false }
      ]
    }
  ],
  'HVAC': [
    {
      question: 'What does HVAC stand for?',
      answers: [
        { text: 'Heating, Ventilation, and Air Conditioning', correct: true },
        { text: 'High Voltage Air Conditioning', correct: false },
        { text: 'Heat Vent Air Control', correct: false },
        { text: 'Home Ventilation Air Cooling', correct: false }
      ]
    },
    {
      question: 'What refrigerant is most commonly used today?',
      answers: [
        { text: 'R-410A', correct: true },
        { text: 'R-12', correct: false },
        { text: 'R-22', correct: false },
        { text: 'R-11', correct: false }
      ]
    },
    {
      question: 'What is a BTU?',
      answers: [
        { text: 'British Thermal Unit', correct: true },
        { text: 'Basic Temperature Unit', correct: false },
        { text: 'Building Thermal Unit', correct: false },
        { text: 'British Temperature Unit', correct: false }
      ]
    },
    {
      question: 'What does EPA Section 608 certification allow?',
      answers: [
        { text: 'Handling refrigerants', correct: true },
        { text: 'Installing ductwork', correct: false },
        { text: 'Electrical work', correct: false },
        { text: 'Plumbing work', correct: false }
      ]
    },
    {
      question: 'What is the purpose of a thermostat?',
      answers: [
        { text: 'Control temperature by turning HVAC on/off', correct: true },
        { text: 'Measure humidity', correct: false },
        { text: 'Filter air', correct: false },
        { text: 'Generate heat', correct: false }
      ]
    }
  ],
  'Medical Assistant': [
    {
      question: 'What does HIPAA protect?',
      answers: [
        { text: 'Patient privacy and health information', correct: true },
        { text: 'Hospital profits', correct: false },
        { text: 'Insurance companies', correct: false },
        { text: 'Pharmaceutical companies', correct: false }
      ]
    },
    {
      question: 'What is the normal adult resting heart rate?',
      answers: [
        { text: '60-100 beats per minute', correct: true },
        { text: '40-60 beats per minute', correct: false },
        { text: '100-120 beats per minute', correct: false },
        { text: '120-140 beats per minute', correct: false }
      ]
    },
    {
      question: 'What does BP stand for in medical terms?',
      answers: [
        { text: 'Blood Pressure', correct: true },
        { text: 'Body Pain', correct: false },
        { text: 'Blood Plasma', correct: false },
        { text: 'Body Position', correct: false }
      ]
    },
    {
      question: 'What is the proper order for taking vital signs?',
      answers: [
        { text: 'Temperature, Pulse, Respiration, Blood Pressure', correct: true },
        { text: 'Blood Pressure, Temperature, Pulse, Respiration', correct: false },
        { text: 'Pulse, Temperature, Blood Pressure, Respiration', correct: false },
        { text: 'Any order is fine', correct: false }
      ]
    },
    {
      question: 'What certification do most medical assistants obtain?',
      answers: [
        { text: 'CMA (Certified Medical Assistant)', correct: true },
        { text: 'RN (Registered Nurse)', correct: false },
        { text: 'MD (Medical Doctor)', correct: false },
        { text: 'PA (Physician Assistant)', correct: false }
      ]
    }
  ],
  'CNA': [
    {
      question: 'What does CNA stand for?',
      answers: [
        { text: 'Certified Nursing Assistant', correct: true },
        { text: 'Certified Nurse Aide', correct: false },
        { text: 'Clinical Nursing Assistant', correct: false },
        { text: 'Care Nursing Assistant', correct: false }
      ]
    },
    {
      question: 'How often should a bedridden patient be repositioned?',
      answers: [
        { text: 'Every 2 hours', correct: true },
        { text: 'Every 4 hours', correct: false },
        { text: 'Every 6 hours', correct: false },
        { text: 'Once per shift', correct: false }
      ]
    },
    {
      question: 'What is the first step in infection control?',
      answers: [
        { text: 'Hand hygiene', correct: true },
        { text: 'Wearing gloves', correct: false },
        { text: 'Wearing a mask', correct: false },
        { text: 'Using disinfectant', correct: false }
      ]
    },
    {
      question: 'What does ROM stand for in patient care?',
      answers: [
        { text: 'Range of Motion', correct: true },
        { text: 'Rate of Movement', correct: false },
        { text: 'Routine of Medicine', correct: false },
        { text: 'Record of Medication', correct: false }
      ]
    },
    {
      question: 'What is the most important right of a patient?',
      answers: [
        { text: 'Right to privacy and dignity', correct: true },
        { text: 'Right to choose their CNA', correct: false },
        { text: 'Right to unlimited visitors', correct: false },
        { text: 'Right to refuse all care', correct: false }
      ]
    }
  ],
  'CDL': [
    {
      question: 'What does CDL stand for?',
      answers: [
        { text: 'Commercial Driver\'s License', correct: true },
        { text: 'Certified Driver License', correct: false },
        { text: 'Commercial Driving Law', correct: false },
        { text: 'Certified Driving License', correct: false }
      ]
    },
    {
      question: 'What is a Class A CDL for?',
      answers: [
        { text: 'Combination vehicles over 26,001 lbs', correct: true },
        { text: 'Passenger vehicles only', correct: false },
        { text: 'Motorcycles', correct: false },
        { text: 'Personal vehicles', correct: false }
      ]
    },
    {
      question: 'What is the maximum driving time before a break is required?',
      answers: [
        { text: '8 hours', correct: true },
        { text: '10 hours', correct: false },
        { text: '12 hours', correct: false },
        { text: '14 hours', correct: false }
      ]
    },
    {
      question: 'What does HOS stand for?',
      answers: [
        { text: 'Hours of Service', correct: true },
        { text: 'Highway Operating System', correct: false },
        { text: 'Heavy Operating Standards', correct: false },
        { text: 'Hauling Operations Safety', correct: false }
      ]
    },
    {
      question: 'What is a pre-trip inspection?',
      answers: [
        { text: 'Safety check before driving', correct: true },
        { text: 'Planning the route', correct: false },
        { text: 'Checking the weather', correct: false },
        { text: 'Fueling the vehicle', correct: false }
      ]
    }
  ]
};

// Generic quiz questions for any program
const genericQuestions = [
  {
    question: 'What is the most important aspect of workplace safety?',
    answers: [
      { text: 'Following all safety protocols and procedures', correct: true },
      { text: 'Working as fast as possible', correct: false },
      { text: 'Ignoring minor hazards', correct: false },
      { text: 'Only wearing PPE when required', correct: false }
    ]
  },
  {
    question: 'What should you do if you don\'t understand a task?',
    answers: [
      { text: 'Ask your supervisor for clarification', correct: true },
      { text: 'Try to figure it out yourself', correct: false },
      { text: 'Skip it and move on', correct: false },
      { text: 'Ask a coworker to do it', correct: false }
    ]
  },
  {
    question: 'What is professional communication?',
    answers: [
      { text: 'Clear, respectful, and appropriate workplace interaction', correct: true },
      { text: 'Using technical jargon always', correct: false },
      { text: 'Only speaking when spoken to', correct: false },
      { text: 'Avoiding all communication', correct: false }
    ]
  },
  {
    question: 'What is the purpose of continuing education?',
    answers: [
      { text: 'Stay current with industry standards and improve skills', correct: true },
      { text: 'Get more certificates to display', correct: false },
      { text: 'Avoid working', correct: false },
      { text: 'Meet people', correct: false }
    ]
  },
  {
    question: 'What is the best way to handle workplace conflict?',
    answers: [
      { text: 'Address it professionally and seek resolution', correct: true },
      { text: 'Ignore it and hope it goes away', correct: false },
      { text: 'Gossip about it with coworkers', correct: false },
      { text: 'Quit your job', correct: false }
    ]
  }
];

async function generateQuizzes() {
  console.log('🎯 Generating quizzes for all courses...\n');

  // Get all courses
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, title, slug')
    .order('title');

  if (coursesError) {
    console.error('❌ Error fetching courses:', coursesError);
    return;
  }

  console.log(`Found ${courses.length} courses\n`);

  let quizzesCreated = 0;
  let questionsCreated = 0;

  for (const course of courses) {
    console.log(`Creating quiz for: ${course.title}`);

    // Create quiz for this course
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        course_id: course.id,
        title: `${course.title} - Final Assessment`,
        description: `Test your knowledge of ${course.title} concepts and skills.`,
        passing_score: 70,
        time_limit_minutes: 30,
        max_attempts: 3,
        is_required: true
      })
      .select()
      .single();

    if (quizError) {
      console.error(`  ❌ Error creating quiz: ${quizError.message}`);
      continue;
    }

    quizzesCreated++;

    // Get questions for this course type
    let questions = [];
    
    // Check if we have specific questions for this course
    const courseKey = Object.keys(quizTemplates).find(key => 
      course.title.includes(key) || course.slug.includes(key.toLowerCase())
    );

    if (courseKey) {
      questions = quizTemplates[courseKey];
    } else {
      // Use generic questions
      questions = genericQuestions;
    }

    // Create questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quiz.id,
          question_text: q.question,
          question_type: 'multiple_choice',
          points: 1,
          order_index: i,
          options: q.answers.map(a => a.text),
          correct_answer: q.answers.findIndex(a => a.correct).toString()
        })
        .select()
        .single();

      if (questionError) {
        console.error(`  ❌ Error creating question: ${questionError.message}`);
      } else {
        questionsCreated++;
      }
    }

    console.log(`  ✅ Created quiz with ${questions.length} questions`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Quiz Generation Complete!');
  console.log('='.repeat(50));
  console.log(`Quizzes created: ${quizzesCreated}`);
  console.log(`Questions created: ${questionsCreated}`);
  console.log(`Average questions per quiz: ${(questionsCreated / quizzesCreated).toFixed(1)}`);
}

generateQuizzes().catch(console.error);
