import { r as e } from './vendor-react-C-ZQNdj3.js';
const o = (o) => {
  e.useEffect(() => {
    'undefined' != typeof window &&
      window.gtag &&
      window.gtag('event', 'page_view', {
        page_title: o,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
  }, [o]);
};
export { o as u };
