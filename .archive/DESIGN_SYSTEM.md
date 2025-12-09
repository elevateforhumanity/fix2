# ELEVATE FOR HUMANITY - DESIGN SYSTEM

## Typography Standards

### Headings
```typescript
H1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
H2: "text-3xl sm:text-4xl md:text-5xl font-bold"
H3: "text-2xl sm:text-3xl font-bold"
H4: "text-xl sm:text-2xl font-bold"
H5: "text-lg sm:text-xl font-semibold"
H6: "text-base sm:text-lg font-semibold"
```

### Body Text
```typescript
Large: "text-lg sm:text-xl leading-relaxed"
Regular: "text-base sm:text-lg leading-relaxed"
Small: "text-sm sm:text-base"
Tiny: "text-xs sm:text-sm"
```

## Spacing Standards

### Section Padding
```typescript
Hero: "py-20 sm:py-24 lg:py-32"
Large: "py-16 sm:py-20 lg:py-24"
Medium: "py-12 sm:py-16"
Small: "py-8 sm:py-12"
```

### Container Padding
```typescript
Standard: "px-4 sm:px-6 lg:px-8"
Tight: "px-4 sm:px-6"
Wide: "px-6 sm:px-8 lg:px-12"
```

### Grid Gaps
```typescript
Large: "gap-12 sm:gap-16"
Medium: "gap-8 sm:gap-12"
Small: "gap-4 sm:gap-6"
Tight: "gap-2 sm:gap-4"
```

## Color Palette

### Primary Colors
```typescript
Blue: {
  50: '#eff6ff',
  100: '#dbeafe',
  600: '#2563eb',
  700: '#1d4ed8',
  900: '#1e3a8a'
}

Orange: {
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c'
}
```

### Neutral Colors
```typescript
Slate: {
  50: '#f8fafc',
  100: '#f1f5f9',
  600: '#475569',
  700: '#334155',
  900: '#0f172a'
}
```

## Component Standards

### Buttons
```typescript
Primary: "px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all duration-300 shadow-xl"
Secondary: "px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 border-2 border-blue-600"
Text: "text-orange-600 font-bold hover:underline inline-flex items-center gap-2"
```

### Cards
```typescript
Standard: "bg-white rounded-lg shadow-sm border hover:shadow-xl transition-all duration-300"
Featured: "bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
```

### Images
```typescript
Hero: "object-cover object-center"
Card: "object-cover group-hover:scale-105 transition-transform duration-500"
Thumbnail: "object-cover rounded-lg"
```

## Mobile Responsiveness

### Breakpoints
```typescript
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Grid Patterns
```typescript
3-Column: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
2-Column: "grid-cols-1 md:grid-cols-2"
4-Column: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
```

## Accessibility

### Alt Text Format
```typescript
Hero: "[Action] - [Context]"
Example: "Students learning career skills at Elevate for Humanity"

Card: "[Program/Service] - [Details]"
Example: "Healthcare training - CNA, Medical Assistant, Phlebotomy programs"
```

### Contrast Ratios
- Text on white: Minimum 4.5:1
- Text on images: Use overlay (bg-black/60 or gradient)
- Buttons: Minimum 3:1

## Animation Standards

### Transitions
```typescript
Fast: "transition-all duration-200"
Standard: "transition-all duration-300"
Slow: "transition-all duration-500"
```

### Hover Effects
```typescript
Scale: "hover:scale-105"
Shadow: "hover:shadow-xl"
Color: "hover:bg-orange-700"
```

## SEO Standards

### Meta Titles
Format: "[Page Name] | Elevate For Humanity"
Length: 50-60 characters

### Meta Descriptions
Length: 150-160 characters
Include: Keywords, value proposition, call-to-action

### Image Optimization
- Format: WebP preferred, JPG fallback
- Size: Max 500KB per image
- Dimensions: Consistent aspect ratios
- Alt text: Always required
