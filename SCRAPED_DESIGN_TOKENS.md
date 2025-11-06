# Scraped Design Tokens from www.elevateforhumanity.org

## Colors:

- **Primary Brand**: #4D4B37 (dark olive/brown)
- **Background**: #FFFFFF (white)
- **Text**: #000000 (black)
- **Text on Dark**: #FFFFFF (white)
- **Overlay**: rgba(0,0,0,0.4) (black 40% opacity)
- **Progress Bar**: rgba(255,255,255,0.2) (white 20% opacity)
- **Progress Fill**: rgba(255,255,255,0.7) (white 70% opacity)
- **Testimonial BG**: rgba(0,0,0,0.05) (black 5% opacity)

## Typography:

- **Header Logo**: var(--header-logo-fontFamily), var(--header-logo-fontWeight)
- **Body**: var(--body-fontFamily), var(--body-fontWeight, 500), var(--body-fontStyle)
- **Heading XLarge**: heading-xlarge class
- **Heading Large**: heading-large class
- **Heading Medium**: heading-medium class
- **Heading Small**: heading-small class
- **Body Large**: body-large class
- **Body Normal**: body-normal class
- **Body Small**: body-small class

## Layout:

- **Container**: container mx-auto (max-width with auto margins)
- **Grid**: lg:grid-cols-2 (2 columns on large screens)
- **Spacing**: pt-8 pb-8 (padding top/bottom 2rem)
- **Gaps**: gap-10 lg:gap-20 (2.5rem / 5rem)

## Components:

### Header:

- Background: #FFFFFF
- Color: #000000
- Padding: pt-8 pb-8
- Grid: auto auto auto
- Logo: heading-small lg:heading-medium
- Nav: body-normal, gap-x-6
- Border on hover: border-b-2

### Hero Section:

- Grid: lg:grid-cols-2
- Text Color: #FFFFFF
- Heading: heading-xlarge
- Body: body-large
- Button: border-width:2px, border-style:solid
- Image: aspect-w-4 aspect-h-5 sm:aspect-w-5 sm:aspect-h-4

### Content Sections:

- Padding: pt-16 lg:pt-32 pb-16 lg:pb-32
- Max Width: max-w-240, max-w-5xl
- Flex: flex-col-reverse lg:flex-row-reverse
- Gap: gap-10 lg:gap-20

### Testimonials:

- Background: bg-black bg-opacity-5
- Padding: px-4 py-8 md:px-12 md:py-20
- Avatar: w-24 h-24 rounded-full
- Max Width: max-w-5xl

### Buttons:

- Style: border-width:2px, border-style:solid
- Font: var(--body-fontFamily), var(--body-fontWeight, 500)
- Transition: transition-all
- Size: lg class

### Images:

- Object Fit: object-cover
- Object Position: center center
- Aspect Ratios: aspect-w-1 aspect-h-1, aspect-w-4 aspect-h-5
- Loading: lazy (for non-priority images)

## Animations:

- Transitions: transition-all ease-in-out duration-500
- Opacity: opacity-0 (initial), opacity-100 (visible)
- Duration: duration-300, duration-500, duration-700
- Delays: delay-100

## Responsive:

- Mobile First: base styles
- Tablet: sm: prefix
- Desktop: lg: prefix
- Large Desktop: xl: prefix, 2xl: prefix

## Z-Index Layers:

- Header: z-[2000]
- Sections: z-index:39, 38, 37, 35 (descending)
- Content: z-10
- Overlays: z-20
- Background: z-0, z-5

## Border Radius:

- Rounded: rounded-md, rounded-lg, rounded-xl, rounded-2xl
- Full: rounded-full
- Custom: rounded-5xl

## Shadows:

- None: box-shadow:none
- Default: shadow-sm, shadow-lg

## Spacing Scale:

- 0: 0
- 2: 0.5rem
- 4: 1rem
- 6: 1.5rem
- 8: 2rem
- 10: 2.5rem
- 12: 3rem
- 16: 4rem
- 20: 5rem
- 32: 8rem

## Breakpoints:

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
