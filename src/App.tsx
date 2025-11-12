import { Helmet } from 'react-helmet-async';
import AppRoutes from './router/AppRoutes';
import SkipToContent from './components/SkipToContent';
import AccessibilityWidget from './components/AccessibilityWidget';

export default function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>
          Elevate for Humanity | Workforce Training & Career Development
        </title>
        <meta
          name="description"
          content="Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding."
        />
      </Helmet>
      <SkipToContent />
      <AppRoutes />
      <AccessibilityWidget />
    </>
  );
}
