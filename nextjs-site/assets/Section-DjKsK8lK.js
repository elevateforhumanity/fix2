import { j as e } from './vendor-react-C-ZQNdj3.js';
function t({
  children: t,
  title: r,
  subtitle: i,
  titleAlign: s = 'left',
  background: c = 'white',
  className: l = '',
}) {
  return e.jsx('section', {
    className: `section ${{ white: 'bg-white', green: 'bg-[var(--color-green)]', brown: 'bg-[var(--color-brown)] text-white', beige: 'bg-[var(--color-beige)]', gray: 'bg-gray-50' }[c]} ${l}`,
    children: e.jsxs('div', {
      className: 'container',
      children: [
        (r || i) &&
          e.jsxs('div', {
            className: `mb-12 ${{ left: 'text-left', center: 'text-center', right: 'text-right' }[s]}`,
            children: [
              r && e.jsx('h2', { className: 'section-title', children: r }),
              i && e.jsx('p', { className: 'section-subtitle', children: i }),
            ],
          }),
        t,
      ],
    }),
  });
}
export { t as S };
