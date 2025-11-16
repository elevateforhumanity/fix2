#!/bin/bash
mkdir -p public/media/{hero,programs,about,team,testimonials}

echo "Downloading hero images..."
curl -sL "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80" -o public/media/hero/homepage.jpg
curl -sL "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80" -o public/media/hero/programs.jpg
curl -sL "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" -o public/media/hero/about.jpg

echo "Downloading program images..."
curl -sL "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80" -o public/media/programs/barber.jpg
curl -sL "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80" -o public/media/programs/hvac.jpg
curl -sL "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80" -o public/media/programs/cdl.jpg
curl -sL "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80" -o public/media/programs/cna.jpg
curl -sL "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80" -o public/media/programs/building.jpg
curl -sL "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80" -o public/media/programs/it.jpg
curl -sL "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80" -o public/media/programs/beauty.jpg
curl -sL "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80" -o public/media/programs/electrical.jpg
curl -sL "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80" -o public/media/programs/plumbing.jpg
curl -sL "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80" -o public/media/programs/medical.jpg
curl -sL "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80" -o public/media/programs/welding.jpg
curl -sL "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80" -o public/media/programs/culinary.jpg

echo "Downloading team photos..."
curl -sL "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" -o public/media/team/person1.jpg
curl -sL "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" -o public/media/team/person2.jpg
curl -sL "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" -o public/media/team/person3.jpg
curl -sL "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" -o public/media/team/person4.jpg

echo "Downloading testimonial photos..."
curl -sL "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" -o public/media/testimonials/student1.jpg
curl -sL "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" -o public/media/testimonials/student2.jpg
curl -sL "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" -o public/media/testimonials/student3.jpg

echo "✅ All photos downloaded"
