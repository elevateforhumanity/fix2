#!/bin/bash
# Update all program CTAs to Indiana Career Connect and WorkOne

sed -i 's|"label": "Apply for [^"]*"|"label": "Apply via Indiana Career Connect"|g' config/programs.json
sed -i 's|"label": "Start [^"]*"|"label": "Apply via Indiana Career Connect"|g' config/programs.json
sed -i 's|"label": "Join [^"]*"|"label": "Apply via Indiana Career Connect"|g' config/programs.json

sed -i 's|"href": "/apply?program=[^"]*"|"href": "https://www.indianacareerconnect.com/"|g' config/programs.json

sed -i 's|"label": "Request [^"]*"|"label": "Schedule WorkOne Appointment"|g' config/programs.json
sed -i 's|"label": "Talk with [^"]*"|"label": "Schedule WorkOne Appointment"|g' config/programs.json
sed -i 's|"label": "Ask About [^"]*"|"label": "Schedule WorkOne Appointment"|g' config/programs.json

sed -i 's|"href": "/contact?topic=[^"]*"|"href": "https://www.in.gov/dwd/workone-centers/"|g' config/programs.json

echo "✅ Updated all program CTAs"
