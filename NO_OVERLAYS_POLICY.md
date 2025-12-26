# NO OVERLAYS POLICY

## POLICY: OVERLAYS ARE PROHIBITED

**Effective Date:** December 26, 2024  
**Status:** ENFORCED

---

## Rule

**NO overlays of any kind are permitted on videos or images.**

This includes but is not limited to:
- `bg-black/[any-opacity]`
- `bg-white/[any-opacity]`
- `bg-[color]/[any-opacity]`
- Any semi-transparent layers over media
- Gradient overlays
- Tinted overlays
- Darkening/lightening layers

---

## Rationale

Videos and images are professionally produced and should be displayed as-is without modification. Overlays:
- Diminish visual quality
- Reduce contrast and readability
- Obscure professional media content
- Create unnecessary visual noise

---

## Implementation

### ❌ PROHIBITED
```tsx
<video className="..." />
<div className="absolute inset-0 bg-black/40" /> {/* NO */}
```

```tsx
<Image src="..." />
<div className="absolute inset-0 bg-white/20" /> {/* NO */}
```

### ✅ CORRECT
```tsx
<video className="..." />
{/* No overlay - video displays as-is */}
```

```tsx
<Image src="..." />
{/* No overlay - image displays as-is */}
```

---

## Text Readability

If text is not readable over a video/image:
1. **Use text shadows** instead of overlays
2. **Adjust video brightness** at source
3. **Choose different media** with better contrast
4. **Position text** in areas with natural contrast

### Text Shadow Example
```tsx
<h1 className="text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
  Readable Text
</h1>
```

---

## Enforcement

- All existing overlays have been removed
- Code reviews must reject any PR adding overlays
- ESLint rule should be added to detect overlay patterns
- This policy supersedes any previous design decisions

---

## Exceptions

**NONE.** There are no exceptions to this policy.

If you believe an overlay is necessary, the correct solution is to:
1. Fix the source media
2. Adjust text styling
3. Redesign the layout

Do not add an overlay.

---

## Contact

Questions about this policy should be directed to the project owner.

**This policy is non-negotiable and must be followed by all contributors.**
