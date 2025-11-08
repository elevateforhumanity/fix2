import { r as e } from './vendor-react-C-ZQNdj3.js';
import { s as t } from './supa-DdKhhKHf.js';
function a() {
  const [a, s] = e.useState(null),
    [i, n] = e.useState(!0);
  return (
    e.useEffect(() => {
      (async () => {
        const {
          data: { user: e },
        } = await t.auth.getUser();
        if (e) {
          const { data: a } = await t
            .from('profiles')
            .select('id, email, full_name, role')
            .eq('id', e.id)
            .single();
          s(a);
        } else s(null);
        n(!1);
      })();
      const { data: e } = t.auth.onAuthStateChange(async (e, a) => {
        if (null == a ? void 0 : a.user) {
          const { data: e } = await t
            .from('profiles')
            .select('id, email, full_name, role')
            .eq('id', a.user.id)
            .single();
          s(e);
        } else s(null);
      });
      return () => {
        e.subscription.unsubscribe();
      };
    }, []),
    { user: a, loading: i }
  );
}
async function s() {
  const { error: e } = await t.auth.signOut();
  if (e) throw e;
}
async function i() {
  const {
    data: { user: e },
  } = await t.auth.getUser();
  if (!e) return null;
  const { data: a } = await t
    .from('profiles')
    .select('role')
    .eq('id', e.id)
    .single();
  return {
    id: e.id,
    email: e.email,
    role: (null == a ? void 0 : a.role) || 'student',
  };
}
export { i as g, s, a as u };
