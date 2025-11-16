#!/usr/bin/env bash
set -euo pipefail

echo "=== Elevate for Humanity - Course Builder Setup ==="
echo ""

# Create directory structure
mkdir -p content/courses
mkdir -p content/image-prompts/efh-courses
mkdir -p content/video-scripts/efh-courses
mkdir -p scripts

echo "✓ Created directory structure"

# Create the master course catalog JSON
cat > content/courses/efh-courses.json << 'EOF'
{
  "courses": [
    {
      "slug": "hvac-technician",
      "title": "HVAC Technician Training",
      "category": "Skilled Trades",
      "shortDescription": "Install, maintain, and repair heating, ventilation, and air conditioning systems for residential and commercial buildings."
    },
    {
      "slug": "barber-apprenticeship",
      "title": "Barber Apprenticeship",
      "category": "Beauty & Personal Care",
      "shortDescription": "Learn professional barbering skills through hands-on apprenticeship, earning while you work toward state licensure."
    },
    {
      "slug": "cna-healthcare",
      "title": "Certified Nursing Assistant (CNA)",
      "category": "Healthcare",
      "shortDescription": "Provide essential patient care in hospitals, nursing homes, and healthcare facilities with CNA certification."
    },
    {
      "slug": "cdl-truck-driving",
      "title": "CDL Truck Driving",
      "category": "Transportation & Logistics",
      "shortDescription": "Obtain your Commercial Driver's License and start a high-paying career in transportation and logistics."
    },
    {
      "slug": "building-technician",
      "title": "Building Technician & Facilities Maintenance",
      "category": "Skilled Trades",
      "shortDescription": "Master building systems including HVAC, electrical, plumbing, and general maintenance for commercial facilities."
    },
    {
      "slug": "electrical-apprenticeship",
      "title": "Electrical Apprenticeship",
      "category": "Skilled Trades",
      "shortDescription": "Train as a licensed electrician through registered apprenticeship, learning residential and commercial electrical systems."
    },
    {
      "slug": "plumbing-apprenticeship",
      "title": "Plumbing Apprenticeship",
      "category": "Skilled Trades",
      "shortDescription": "Become a licensed plumber through hands-on apprenticeship training in residential and commercial plumbing systems."
    },
    {
      "slug": "beauty-educator",
      "title": "Beauty Educator & Cosmetology Instructor",
      "category": "Beauty & Personal Care",
      "shortDescription": "Train the next generation of beauty professionals as a licensed cosmetology or barbering instructor."
    },
    {
      "slug": "it-support-specialist",
      "title": "IT Support Specialist",
      "category": "Technology",
      "shortDescription": "Provide technical support and troubleshooting for computer systems, networks, and software applications."
    },
    {
      "slug": "medical-assistant",
      "title": "Medical Assistant",
      "category": "Healthcare",
      "shortDescription": "Support physicians and nurses in clinical settings, performing both administrative and basic clinical tasks."
    },
    {
      "slug": "welding-fabrication",
      "title": "Welding & Metal Fabrication",
      "category": "Skilled Trades",
      "shortDescription": "Learn welding techniques and metal fabrication skills for manufacturing, construction, and industrial careers."
    },
    {
      "slug": "culinary-arts",
      "title": "Culinary Arts & Food Service",
      "category": "Hospitality",
      "shortDescription": "Master professional cooking techniques and food service management for restaurant and hospitality careers."
    }
  ]
}
EOF

echo "✓ Created efh-courses.json with 12 courses"

# Create the builder script
cat > scripts/build-efh-course-assets.mjs << 'SCRIPTEOF'
#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const coursesFile = path.join(__dirname, '..', 'content', 'courses', 'efh-courses.json');
const imagePromptsDir = path.join(__dirname, '..', 'content', 'image-prompts', 'efh-courses');
const videoScriptsDir = path.join(__dirname, '..', 'content', 'video-scripts', 'efh-courses');

// Category-specific visual themes
const categoryThemes = {
  'Skilled Trades': {
    colors: 'steel blue, metallic gray, safety orange',
    setting: 'professional workshop or training facility',
    equipment: 'tools, safety gear, technical equipment',
  },
  'Healthcare': {
    colors: 'soft teal, white, light gray, medical blue',
    setting: 'clinical training lab or healthcare facility',
    equipment: 'medical equipment, scrubs, patient care tools',
  },
  'Beauty & Personal Care': {
    colors: 'warm neutrals, deep auburn, clean chrome',
    setting: 'modern salon or barbershop',
    equipment: 'styling tools, mirrors, professional chairs',
  },
  'Transportation & Logistics': {
    colors: 'strong blue, metallic gray, road black',
    setting: 'training yard or commercial vehicle area',
    equipment: 'commercial vehicles, safety cones, training materials',
  },
  'Technology': {
    colors: 'tech blue, electric green, clean white',
    setting: 'modern computer lab or tech workspace',
    equipment: 'computers, servers, networking equipment',
  },
  'Hospitality': {
    colors: 'warm orange, chef white, stainless steel',
    setting: 'professional kitchen or restaurant',
    equipment: 'cooking equipment, utensils, food prep stations',
  },
};

function generateImagePrompt(course) {
  const theme = categoryThemes[course.category] || categoryThemes['Skilled Trades'];
  
  return `# ${course.title} – Course Cover (1:1)

Create a square (1:1) course cover image for "${course.title}".

Scene: Young adult (20s) in professional training for ${course.shortDescription.toLowerCase()}
- Show diverse representation (various ethnicities, genders)
- Professional attire appropriate for the field
- Engaged in hands-on learning or demonstration
- Instructor or mentor visible in background

Setting: ${theme.setting}
- Clean, well-lit, modern training environment
- Professional equipment visible
- Safety-conscious atmosphere

Equipment/Props: ${theme.equipment}

Color Palette: ${theme.colors}

Style: Photo-realistic, professional, modern
- No logos or text overlays
- Natural lighting
- Sharp focus on subject
- Depth of field showing environment

Mood: Confident, professional, opportunity-focused
- Conveys career advancement
- Shows hands-on learning
- Emphasizes skill development
- Inspiring and empowering

Technical: 1024x1024px, high quality, suitable for web use
`;
}

function generateVideoScript(course) {
  const duration = '45 seconds';
  
  return `# ${course.title} – AI Instructor Script (~${duration})

Welcome to our ${course.title} program.
I'm your AI instructor, and I'm here to tell you why this pathway could be your perfect next step.

${course.shortDescription} This training is designed for high-demand roles with strong earning potential and career growth opportunities.

Because we partner with state and federal workforce funding programs, eligible students may receive full or partial tuition support through WIOA, Workforce Ready Grants, and other state initiatives.

By the end of this program, you'll earn industry-recognized credentials, build job-ready skills, and connect with employers actively seeking trained professionals in this field.

Ready to get started? Visit the ${course.title} program page, review the schedule and requirements, and submit your application today.

Your future in ${course.category.toLowerCase()} starts here.
`;
}

async function main() {
  console.log('=== Elevate for Humanity - Course Asset Builder ===\n');

  // Load courses
  const coursesData = JSON.parse(await fs.readFile(coursesFile, 'utf8'));
  const courses = coursesData.courses;

  console.log(`Found ${courses.length} courses in catalog\n`);

  // Ensure directories exist
  await fs.mkdir(imagePromptsDir, { recursive: true });
  await fs.mkdir(videoScriptsDir, { recursive: true });

  let imageCount = 0;
  let videoCount = 0;

  // Generate assets for each course
  for (const course of courses) {
    console.log(`Processing: ${course.title}`);

    // Generate image prompt
    const imagePrompt = generateImagePrompt(course);
    const imagePromptPath = path.join(imagePromptsDir, `${course.slug}-cover.md`);
    await fs.writeFile(imagePromptPath, imagePrompt);
    imageCount++;
    console.log(`  ✓ Image prompt: ${course.slug}-cover.md`);

    // Generate video script
    const videoScript = generateVideoScript(course);
    const videoScriptPath = path.join(videoScriptsDir, `${course.slug}-video.md`);
    await fs.writeFile(videoScriptPath, videoScript);
    videoCount++;
    console.log(`  ✓ Video script: ${course.slug}-video.md`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Asset generation complete!');
  console.log('='.repeat(60));
  console.log(`\n📸 Generated ${imageCount} image prompts`);
  console.log(`   Location: ${imagePromptsDir}`);
  console.log(`\n🎬 Generated ${videoCount} video scripts`);
  console.log(`   Location: ${videoScriptsDir}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review generated prompts and scripts`);
  console.log(`   2. Run image generation: node scripts/generate-images.mjs`);
  console.log(`   3. Run video job prep: node scripts/prepare-video-jobs.mjs`);
  console.log(`   4. Generate actual images and videos using AI tools`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
SCRIPTEOF

chmod +x scripts/build-efh-course-assets.mjs

echo "✓ Created build-efh-course-assets.mjs"

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "📁 Created:"
echo "   content/courses/efh-courses.json (12 courses)"
echo "   scripts/build-efh-course-assets.mjs (builder)"
echo ""
echo "🚀 Next steps:"
echo "   1. Review/edit: content/courses/efh-courses.json"
echo "   2. Add more courses if needed"
echo "   3. Run: node scripts/build-efh-course-assets.mjs"
echo ""
