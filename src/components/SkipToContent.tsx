/**
 * Skip to Content Link
 * Section 508 & WCAG 2.1 AA compliant skip navigation
 */

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:font-semibold"
    >
      Skip to main content
    </a>
  );
}
