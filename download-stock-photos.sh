#!/bin/bash
# Download professional stock photos from Unsplash

mkdir -p public/media

# Hero - diverse students in training
curl -L "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80" -o public/media/homepage-hero.jpg

# Barber program
curl -L "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80" -o public/media/program-barber.jpg

# HVAC program  
curl -L "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80" -o public/media/program-hvac.jpg

# CDL/Truck driving
curl -L "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80" -o public/media/program-cdl.jpg

# Healthcare/CNA
curl -L "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80" -o public/media/program-cna.jpg

# About/Team
curl -L "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" -o public/media/efh-about.jpg

echo "✅ Downloaded all stock photos"
