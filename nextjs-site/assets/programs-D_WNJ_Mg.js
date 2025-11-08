import { s as r } from './supa-DdKhhKHf.js';
async function t() {
  const { data: t, error: o } = await r
    .from('programs')
    .select('id, slug, title, track, blurb, hours, cover_url')
    .order('title');
  if (o) throw o;
  return t;
}
async function o(t) {
  const { data: o, error: s } = await r
    .from('programs')
    .select('id, slug, title, track, blurb, hours, cover_url')
    .eq('slug', t)
    .single();
  if (s) throw s;
  return o;
}
export { o as g, t as l };
