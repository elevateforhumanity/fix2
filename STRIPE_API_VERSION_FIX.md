# Stripe API Version Standardization Fix

## Bug Description

**Severity:** High  
**Impact:** Payment processing, webhook verification failures  
**Status:** ✅ Fixed and merged to main

### Problem

The codebase had **inconsistent Stripe API versions** across different payment flows:
- Some files used `2024-11-20.acacia`
- Some files used `2025-10-29.clover` (non-existent future version)
- Some files used `2023-10-16` (deprecated)

This caused:
1. **Webhook signature verification failures** - Different API versions expect different event structures
2. **Payment processing inconsistencies** - API responses vary between versions
3. **Potential data loss** - Metadata fields may not be available in all versions
4. **Maintenance issues** - Hard to debug when different parts use different APIs

## Solution

Standardized all Stripe client initializations to use **`2024-11-20.acacia`** (the most stable and widely used version in the codebase).

## Files Modified

### API Routes (8 files)
1. `app/api/checkout/create/route.ts` - Course checkout
2. `app/api/checkout/route.ts` - Program enrollment checkout
3. `app/api/webhooks/stripe/route.ts` - Main webhook handler
4. `app/api/stripe/route.ts` - Generic Stripe endpoint
5. `app/api/stripe/webhook/route.ts` - Alternative webhook handler
6. `app/api/create-checkout-session/route.ts` - Micro-class checkout
7. `app/api/hsi/create-checkout/route.ts` - HSI partner checkout
8. `app/api/partner-courses/create-checkout/route.ts` - Partner course checkout

### Library Files (4 files)
1. `lib/stripe/stripe-client.ts` - Main Stripe client
2. `lib/payments.ts` - Payment utilities
3. `lib/billing/stripe.ts` - Billing integration
4. `lib/partner-workflows/payments.ts` - Partner payment workflows

## Tests Added

### Unit Tests
- `__tests__/lib/stripe-api-version.test.ts`
  - Validates all files use consistent API version
  - Checks for deprecated versions
  - Verifies webhook configuration
  - Ensures error handling for missing keys

### Integration Tests
- `__tests__/integration/stripe-payment-flow.test.ts`
  - Tests checkout session creation
  - Tests webhook event handling
  - Tests customer management
  - Tests payment intent flow
  - Tests error handling

### Validation Script
- `scripts/validate-stripe-version.cjs`
  - Automated check for API version consistency
  - Can be run in CI/CD pipeline
  - Prevents future regressions

## Verification

Run the validation script:
```bash
node scripts/validate-stripe-version.cjs
```

Expected output:
```
✅ All Stripe API versions are consistent!
   Using version: 2024-11-20.acacia
```

## Impact

### Before Fix
- 3 different API versions in use
- Webhook failures possible
- Inconsistent payment behavior
- Hard to debug issues

### After Fix
- ✅ Single API version across all files
- ✅ Consistent webhook processing
- ✅ Predictable payment behavior
- ✅ Automated validation to prevent regressions
- ✅ Comprehensive test coverage

## Recommendations

1. **Add to CI/CD**: Include `validate-stripe-version.cjs` in pre-commit hooks
2. **Monitor webhooks**: Check Stripe dashboard for webhook delivery success rates
3. **Update documentation**: Document the standard API version for new developers
4. **Version upgrades**: When upgrading Stripe API version, update all files at once

## Related Issues

This fix resolves:
- Webhook signature verification failures
- Inconsistent payment metadata handling
- Payment processing edge cases
- Developer confusion about which version to use

## Testing Checklist

- [x] All Stripe API versions standardized
- [x] Validation script passes
- [x] Unit tests added
- [x] Integration tests added
- [x] Changes committed to feature branch
- [x] Changes merged to main branch
- [x] No deprecated versions remain

## Maintenance

To check API version consistency in the future:
```bash
# Quick check
grep -r "apiVersion" app/api lib --include="*.ts" | grep -E "(acacia|clover)"

# Full validation
node scripts/validate-stripe-version.cjs
```

## Notes

- The API version `2024-11-20.acacia` is stable and well-tested
- All webhook handlers now process events consistently
- Payment flows across HSI, partner courses, and direct enrollments are unified
- Type assertions (`as any`) are used where TypeScript types haven't caught up to API version
