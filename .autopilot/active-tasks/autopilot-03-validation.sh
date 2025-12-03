#!/bin/bash
# Task: Implement Input Validation with Zod

# Install Zod if not present
npm install zod --save

# Create validation schemas
mkdir -p lib/validation
cat > lib/validation/schemas.ts << 'SCHEMAS'
import { z } from 'zod';

export const enrollmentSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  programId: z.string().uuid().optional(),
  fundingSource: z.enum(['WIOA_ADULT', 'WIOA_DW', 'WRG', 'WEX', 'SELF_PAY']),
});

export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
});

export const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  courseId: z.string().uuid(),
  userId: z.string().uuid(),
});

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
SCHEMAS

echo "✅ Created validation schemas"
echo "⚠️  Manual step required: Add validation to 50+ API endpoints"
