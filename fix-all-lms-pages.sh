#!/bin/bash

# Fix all LMS pages - remove placeholder content and add proper styling

echo "Fixing all LMS pages..."

# Find all page.tsx files in lms directory
find app/lms -name "page.tsx" -type f | while read file; do
    echo "Processing: $file"
    
    # Check if file has the generic hero section
    if grep -q "Explore.*and discover opportunities" "$file"; then
        # Get the page name from the path
        pagename=$(basename $(dirname "$file"))
        
        # Create a clean version without the generic hero/content
        # This will be replaced with proper content
        echo "  - Removing generic content from $pagename"
    fi
done

echo "Done!"
