#!/usr/bin/env python3
"""
Bulk TypeScript error fixer
Applies systematic fixes to common error patterns
"""

import json
import re
from pathlib import Path
from collections import defaultdict

# Load errors
with open('.autopilot/reports/errors.json') as f:
    data = json.load(f)
    errors = data['errors']

# Group by file
file_errors = defaultdict(list)
for err in errors:
    file_errors[err['file']].append(err)

fixed_count = 0
skipped_count = 0

for filepath, errs in file_errors.items():
    try:
        path = Path(filepath)
        if not path.exists():
            print(f"⚠️  Skip: {filepath} (not found)")
            skipped_count += 1
            continue
            
        content = path.read_text()
        original = content
        
        # Fix 1: await createClient()
        content = re.sub(
            r'const (\w+) = createClient\(\)',
            r'const \1 = await createClient()',
            content
        )
        
        # Fix 2: Error message access in catch blocks
        # Pattern: catch (error) { ... error.message ... }
        def fix_error_handling(match):
            var_name = match.group(1)
            block = match.group(2)
            
            # Add error wrapping at start of block
            wrapper = f"const err = {var_name} instanceof Error ? {var_name} : new Error(String({var_name}));"
            
            # Replace error.message with err.message in block
            block = re.sub(rf'\b{var_name}\.message\b', 'err.message', block)
            
            return f"catch ({var_name}) {{\n    {wrapper}\n{block}}}"
        
        content = re.sub(
            r'catch\s*\((\w+)\)\s*\{([^}]+)\}',
            fix_error_handling,
            content,
            flags=re.DOTALL
        )
        
        # Fix 3: Add missing imports
        if 'resend.' in content and 'Resend' not in content:
            # Find first import line
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    lines.insert(i + 1, "import { Resend } from 'resend';")
                    lines.insert(i + 2, "const resend = new Resend(process.env.RESEND_API_KEY);")
                    break
            content = '\n'.join(lines)
        
        if '<Link' in content and "import Link from 'next/link'" not in content:
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    lines.insert(i + 1, "import Link from 'next/link';")
                    break
            content = '\n'.join(lines)
        
        # Fix 4: Type assertions for unknown data
        # This is more complex, skip for now
        
        if content != original:
            path.write_text(content)
            print(f"✅ Fixed: {filepath}")
            fixed_count += 1
        
    except Exception as e:
        print(f"⚠️  Error processing {filepath}: {e}")
        skipped_count += 1

print(f"\n✅ Fixed {fixed_count} files")
print(f"⚠️  Skipped {skipped_count} files")
print(f"\nRun: pnpm typecheck")
