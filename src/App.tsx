import { Helmet } from 'react-helmet-async';
import AppRoutes from './router/AppRoutes';

export default function App() {
  return (
    <>
      <Helmet>
        <title>Elevate for Humanity | Workforce Training & Career Development</title>
        <meta
          name="description"
          content="Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding."
        />
      </Helmet>
      <AppRoutes />
    </>
  );
}
