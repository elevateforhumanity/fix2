# Performance Optimization Plan

**Date:** 2025-12-23  
**Status:** Documented for future implementation

---

## Performance Audit Areas

### 1. Image Optimization

**Action:** Replace `<img>` with `next/image`  
**Status:** ⏭️ Future work  
**Impact:** Reduce LCP, prevent CLS

### 2. Client/Server Component Optimization

**Action:** Minimize client components  
**Status:** ⏭️ Future work  
**Impact:** Reduce bundle size, improve TTI

### 3. Code Splitting

**Action:** Dynamic imports for heavy components  
**Status:** ⏭️ Future work  
**Impact:** Reduce initial bundle

### 4. Caching Strategy

**Action:** Implement fetch caching where safe  
**Status:** ⏭️ Future work  
**Impact:** Faster page loads

---

## Lighthouse Targets

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- Performance Score > 90

---

## Status

✅ Plan documented  
⏭️ Implementation deferred (focus on navigation first)

---

**Next:** Complete navigation work, then return to performance
