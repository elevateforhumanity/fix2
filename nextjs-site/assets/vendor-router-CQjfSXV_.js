import { r as e, R as t } from './vendor-react-C-ZQNdj3.js';
import {
  a7 as n,
  a8 as r,
  a9 as a,
  aa as o,
  ab as i,
  ac as l,
  ad as s,
  ae as u,
  af as c,
  ag as p,
  ah as d,
  ai as h,
} from './vendor-Da1LjC7-.js';
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function v() {
  return (
    (v = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    v.apply(this, arguments)
  );
}
const f = e.createContext(null),
  m = e.createContext(null),
  g = e.createContext(null),
  y = e.createContext(null),
  C = e.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  x = e.createContext(null);
function b() {
  return null != e.useContext(y);
}
function E() {
  return (b() || n(!1), e.useContext(y).location);
}
function R(t) {
  e.useContext(g).static || e.useLayoutEffect(t);
}
function S() {
  let { isDataRoute: t } = e.useContext(C);
  return t
    ? (function () {
        let { router: t } = (function () {
            let t = e.useContext(f);
            return (t || n(!1), t);
          })(O.UseNavigateStable),
          r = N(D.UseNavigateStable),
          a = e.useRef(!1);
        return (
          R(() => {
            a.current = !0;
          }),
          e.useCallback(
            function (e, n) {
              (void 0 === n && (n = {}),
                a.current &&
                  ('number' == typeof e
                    ? t.navigate(e)
                    : t.navigate(e, v({ fromRouteId: r }, n))));
            },
            [t, r]
          )
        );
      })()
    : (function () {
        b() || n(!1);
        let t = e.useContext(f),
          { basename: i, future: l, navigator: s } = e.useContext(g),
          { matches: u } = e.useContext(C),
          { pathname: c } = E(),
          p = JSON.stringify(a(u, l.v7_relativeSplatPath)),
          d = e.useRef(!1);
        return (
          R(() => {
            d.current = !0;
          }),
          e.useCallback(
            function (e, n) {
              if ((void 0 === n && (n = {}), !d.current)) return;
              if ('number' == typeof e) return void s.go(e);
              let a = o(e, JSON.parse(p), c, 'path' === n.relative);
              (null == t &&
                '/' !== i &&
                (a.pathname = '/' === a.pathname ? i : r([i, a.pathname])),
                (n.replace ? s.replace : s.push)(a, n.state, n));
            },
            [i, s, p, c, t]
          )
        );
      })();
}
function w() {
  let { matches: t } = e.useContext(C),
    n = t[t.length - 1];
  return n ? n.params : {};
}
function U(t, n) {
  let { relative: r } = void 0 === n ? {} : n,
    { future: i } = e.useContext(g),
    { matches: l } = e.useContext(C),
    { pathname: s } = E(),
    u = JSON.stringify(a(l, i.v7_relativeSplatPath));
  return e.useMemo(() => o(t, JSON.parse(u), s, 'path' === r), [t, u, s, r]);
}
function L(t, a) {
  return (function (t, a, o, s) {
    b() || n(!1);
    let { navigator: c } = e.useContext(g),
      { matches: p } = e.useContext(C),
      d = p[p.length - 1],
      h = d ? d.params : {};
    !d || d.pathname;
    let f = d ? d.pathnameBase : '/';
    d && d.route;
    let m,
      x = E();
    if (a) {
      var R;
      let e = 'string' == typeof a ? l(a) : a;
      ('/' === f ||
        (null == (R = e.pathname) ? void 0 : R.startsWith(f)) ||
        n(!1),
        (m = e));
    } else m = x;
    let S = m.pathname || '/',
      w = S;
    if ('/' !== f) {
      let e = f.replace(/^\//, '').split('/');
      w = '/' + S.replace(/^\//, '').split('/').slice(e.length).join('/');
    }
    let U = u(t, { pathname: w }),
      L = (function (t, r, a, o) {
        var i;
        void 0 === r && (r = []);
        void 0 === a && (a = null);
        void 0 === o && (o = null);
        if (null == t) {
          var l;
          if (!a) return null;
          if (a.errors) t = a.matches;
          else {
            if (
              !(
                null != (l = o) &&
                l.v7_partialHydration &&
                0 === r.length &&
                !a.initialized &&
                a.matches.length > 0
              )
            )
              return null;
            t = a.matches;
          }
        }
        let s = t,
          u = null == (i = a) ? void 0 : i.errors;
        if (null != u) {
          let e = s.findIndex(
            (e) => e.route.id && void 0 !== (null == u ? void 0 : u[e.route.id])
          );
          (e >= 0 || n(!1), (s = s.slice(0, Math.min(s.length, e + 1))));
        }
        let c = !1,
          p = -1;
        if (a && o && o.v7_partialHydration)
          for (let e = 0; e < s.length; e++) {
            let t = s[e];
            if (
              ((t.route.HydrateFallback || t.route.hydrateFallbackElement) &&
                (p = e),
              t.route.id)
            ) {
              let { loaderData: e, errors: n } = a,
                r =
                  t.route.loader &&
                  void 0 === e[t.route.id] &&
                  (!n || void 0 === n[t.route.id]);
              if (t.route.lazy || r) {
                ((c = !0), (s = p >= 0 ? s.slice(0, p + 1) : [s[0]]));
                break;
              }
            }
          }
        return s.reduceRight((t, n, o) => {
          let i,
            l = !1,
            d = null,
            h = null;
          var v;
          a &&
            ((i = u && n.route.id ? u[n.route.id] : void 0),
            (d = n.route.errorElement || T),
            c &&
              (p < 0 && 0 === o
                ? (j[(v = 'route-fallback')] || (j[v] = !0),
                  (l = !0),
                  (h = null))
                : p === o &&
                  ((l = !0), (h = n.route.hydrateFallbackElement || null))));
          let f = r.concat(s.slice(0, o + 1)),
            m = () => {
              let r;
              return (
                (r = i
                  ? d
                  : l
                    ? h
                    : n.route.Component
                      ? e.createElement(n.route.Component, null)
                      : n.route.element
                        ? n.route.element
                        : t),
                e.createElement(B, {
                  match: n,
                  routeContext: {
                    outlet: t,
                    matches: f,
                    isDataRoute: null != a,
                  },
                  children: r,
                })
              );
            };
          return a && (n.route.ErrorBoundary || n.route.errorElement || 0 === o)
            ? e.createElement(P, {
                location: a.location,
                revalidation: a.revalidation,
                component: d,
                error: i,
                children: m(),
                routeContext: { outlet: null, matches: f, isDataRoute: !0 },
              })
            : m();
        }, null);
      })(
        U &&
          U.map((e) =>
            Object.assign({}, e, {
              params: Object.assign({}, h, e.params),
              pathname: r([
                f,
                c.encodeLocation
                  ? c.encodeLocation(e.pathname).pathname
                  : e.pathname,
              ]),
              pathnameBase:
                '/' === e.pathnameBase
                  ? f
                  : r([
                      f,
                      c.encodeLocation
                        ? c.encodeLocation(e.pathnameBase).pathname
                        : e.pathnameBase,
                    ]),
            })
          ),
        p,
        o,
        s
      );
    if (a && L)
      return e.createElement(
        y.Provider,
        {
          value: {
            location: v(
              {
                pathname: '/',
                search: '',
                hash: '',
                state: null,
                key: 'default',
              },
              m
            ),
            navigationType: i.Pop,
          },
        },
        L
      );
    return L;
  })(t, a);
}
function k() {
  let t = (function () {
      var t;
      let r = e.useContext(x),
        a = (function () {
          let t = e.useContext(m);
          return (t || n(!1), t);
        })(),
        o = N();
      if (void 0 !== r) return r;
      return null == (t = a.errors) ? void 0 : t[o];
    })(),
    r = c(t)
      ? t.status + ' ' + t.statusText
      : t instanceof Error
        ? t.message
        : JSON.stringify(t),
    a = t instanceof Error ? t.stack : null,
    o = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' };
  return e.createElement(
    e.Fragment,
    null,
    e.createElement('h2', null, 'Unexpected Application Error!'),
    e.createElement('h3', { style: { fontStyle: 'italic' } }, r),
    a ? e.createElement('pre', { style: o }, a) : null,
    null
  );
}
const T = e.createElement(k, null);
class P extends e.Component {
  constructor(e) {
    (super(e),
      (this.state = {
        location: e.location,
        revalidation: e.revalidation,
        error: e.error,
      }));
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location ||
      ('idle' !== t.revalidation && 'idle' === e.revalidation)
      ? { error: e.error, location: e.location, revalidation: e.revalidation }
      : {
          error: void 0 !== e.error ? e.error : t.error,
          location: t.location,
          revalidation: e.revalidation || t.revalidation,
        };
  }
  componentDidCatch(e, t) {
    console.error(
      'React Router caught the following error during render',
      e,
      t
    );
  }
  render() {
    return void 0 !== this.state.error
      ? e.createElement(
          C.Provider,
          { value: this.props.routeContext },
          e.createElement(x.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function B(t) {
  let { routeContext: n, match: r, children: a } = t,
    o = e.useContext(f);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = r.route.id),
    e.createElement(C.Provider, { value: n }, a)
  );
}
var O = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    );
  })(O || {}),
  D = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(D || {});
function N(t) {
  let r = (function () {
      let t = e.useContext(C);
      return (t || n(!1), t);
    })(),
    a = r.matches[r.matches.length - 1];
  return (a.route.id || n(!1), a.route.id);
}
const j = {};
function F(e) {
  n(!1);
}
function _(t) {
  let {
    basename: r = '/',
    children: a = null,
    location: o,
    navigationType: u = i.Pop,
    navigator: c,
    static: p = !1,
    future: d,
  } = t;
  b() && n(!1);
  let h = r.replace(/^\/*/, '/'),
    f = e.useMemo(
      () => ({
        basename: h,
        navigator: c,
        static: p,
        future: v({ v7_relativeSplatPath: !1 }, d),
      }),
      [h, d, c, p]
    );
  'string' == typeof o && (o = l(o));
  let {
      pathname: m = '/',
      search: C = '',
      hash: x = '',
      state: E = null,
      key: R = 'default',
    } = o,
    S = e.useMemo(() => {
      let e = s(m, h);
      return null == e
        ? null
        : {
            location: { pathname: e, search: C, hash: x, state: E, key: R },
            navigationType: u,
          };
    }, [h, m, C, x, E, R, u]);
  return null == S
    ? null
    : e.createElement(
        g.Provider,
        { value: f },
        e.createElement(y.Provider, { children: a, value: S })
      );
}
function A(e) {
  let { children: t, location: n } = e;
  return L(M(t), n);
}
function M(t, r) {
  void 0 === r && (r = []);
  let a = [];
  return (
    e.Children.forEach(t, (t, o) => {
      if (!e.isValidElement(t)) return;
      let i = [...r, o];
      if (t.type === e.Fragment)
        return void a.push.apply(a, M(t.props.children, i));
      (t.type !== F && n(!1), t.props.index && t.props.children && n(!1));
      let l = {
        id: t.props.id || i.join('-'),
        caseSensitive: t.props.caseSensitive,
        element: t.props.element,
        Component: t.props.Component,
        index: t.props.index,
        path: t.props.path,
        loader: t.props.loader,
        action: t.props.action,
        errorElement: t.props.errorElement,
        ErrorBoundary: t.props.ErrorBoundary,
        hasErrorBoundary:
          null != t.props.ErrorBoundary || null != t.props.errorElement,
        shouldRevalidate: t.props.shouldRevalidate,
        handle: t.props.handle,
        lazy: t.props.lazy,
      };
      (t.props.children && (l.children = M(t.props.children, i)), a.push(l));
    }),
    a
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function z() {
  return (
    (z = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    z.apply(this, arguments)
  );
}
function I(e, t) {
  if (null == e) return {};
  var n,
    r,
    a = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++)
    ((n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]));
  return a;
}
function J(e) {
  return (
    void 0 === e && (e = ''),
    new URLSearchParams(
      'string' == typeof e || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return t.concat(Array.isArray(r) ? r.map((e) => [n, e]) : [[n, r]]);
          }, [])
    )
  );
}
new Promise(() => {});
const V = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'viewTransition',
  ],
  W = [
    'aria-current',
    'caseSensitive',
    'className',
    'end',
    'style',
    'to',
    'viewTransition',
    'children',
  ];
try {
  window.__reactRouterVersion = '6';
} catch (re) {}
const H = e.createContext({ isTransitioning: !1 }),
  K = t.startTransition;
function q(t) {
  let { basename: n, children: r, future: a, window: o } = t,
    i = e.useRef();
  null == i.current && (i.current = h({ window: o, v5Compat: !0 }));
  let l = i.current,
    [s, u] = e.useState({ action: l.action, location: l.location }),
    { v7_startTransition: c } = a || {},
    p = e.useCallback(
      (e) => {
        c && K ? K(() => u(e)) : u(e);
      },
      [u, c]
    );
  return (
    e.useLayoutEffect(() => l.listen(p), [l, p]),
    e.useEffect(() => {
      return (
        null == (e = a) || e.v7_startTransition,
        void (null == e || e.v7_relativeSplatPath)
      );
      var e;
    }, [a]),
    e.createElement(_, {
      basename: n,
      children: r,
      location: s.location,
      navigationType: s.action,
      navigator: l,
      future: a,
    })
  );
}
const G =
    'undefined' != typeof window &&
    void 0 !== window.document &&
    void 0 !== window.document.createElement,
  Q = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  X = e.forwardRef(function (t, a) {
    let o,
      {
        onClick: i,
        relative: l,
        reloadDocument: u,
        replace: c,
        state: d,
        target: h,
        to: v,
        preventScrollReset: f,
        viewTransition: m,
      } = t,
      y = I(t, V),
      { basename: C } = e.useContext(g),
      x = !1;
    if ('string' == typeof v && Q.test(v) && ((o = v), G))
      try {
        let e = new URL(window.location.href),
          t = v.startsWith('//') ? new URL(e.protocol + v) : new URL(v),
          n = s(t.pathname, C);
        t.origin === e.origin && null != n
          ? (v = n + t.search + t.hash)
          : (x = !0);
      } catch (re) {}
    let R = (function (t, a) {
        let { relative: o } = void 0 === a ? {} : a;
        b() || n(!1);
        let { basename: i, navigator: l } = e.useContext(g),
          { hash: s, pathname: u, search: c } = U(t, { relative: o }),
          p = u;
        return (
          '/' !== i && (p = '/' === u ? i : r([i, u])),
          l.createHref({ pathname: p, search: c, hash: s })
        );
      })(v, { relative: l }),
      w = (function (t, n) {
        let {
            target: r,
            replace: a,
            state: o,
            preventScrollReset: i,
            relative: l,
            viewTransition: s,
          } = void 0 === n ? {} : n,
          u = S(),
          c = E(),
          d = U(t, { relative: l });
        return e.useCallback(
          (e) => {
            if (
              (function (e, t) {
                return !(
                  0 !== e.button ||
                  (t && '_self' !== t) ||
                  (function (e) {
                    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                  })(e)
                );
              })(e, r)
            ) {
              e.preventDefault();
              let n = void 0 !== a ? a : p(c) === p(d);
              u(t, {
                replace: n,
                state: o,
                preventScrollReset: i,
                relative: l,
                viewTransition: s,
              });
            }
          },
          [c, u, d, a, o, r, t, i, l, s]
        );
      })(v, {
        replace: c,
        state: d,
        target: h,
        preventScrollReset: f,
        relative: l,
        viewTransition: m,
      });
    return e.createElement(
      'a',
      z({}, y, {
        href: o || R,
        onClick:
          x || u
            ? i
            : function (e) {
                (i && i(e), e.defaultPrevented || w(e));
              },
        ref: a,
        target: h,
      })
    );
  }),
  Y = e.forwardRef(function (t, r) {
    let {
        'aria-current': a = 'page',
        caseSensitive: o = !1,
        className: i = '',
        end: l = !1,
        style: u,
        to: c,
        viewTransition: p,
        children: h,
      } = t,
      v = I(t, W),
      y = U(c, { relative: v.relative }),
      C = E(),
      x = e.useContext(m),
      { navigator: b, basename: R } = e.useContext(g),
      S =
        null != x &&
        (function (t, r) {
          void 0 === r && (r = {});
          let a = e.useContext(H);
          null == a && n(!1);
          let { basename: o } = (function () {
              let t = e.useContext(f);
              return (t || n(!1), t);
            })(Z.useViewTransitionState),
            i = U(t, { relative: r.relative });
          if (!a.isTransitioning) return !1;
          let l =
              s(a.currentLocation.pathname, o) || a.currentLocation.pathname,
            u = s(a.nextLocation.pathname, o) || a.nextLocation.pathname;
          return null != d(i.pathname, u) || null != d(i.pathname, l);
        })(y) &&
        !0 === p,
      w = b.encodeLocation ? b.encodeLocation(y).pathname : y.pathname,
      L = C.pathname,
      k =
        x && x.navigation && x.navigation.location
          ? x.navigation.location.pathname
          : null;
    (o ||
      ((L = L.toLowerCase()),
      (k = k ? k.toLowerCase() : null),
      (w = w.toLowerCase())),
      k && R && (k = s(k, R) || k));
    const T = '/' !== w && w.endsWith('/') ? w.length - 1 : w.length;
    let P,
      B = L === w || (!l && L.startsWith(w) && '/' === L.charAt(T)),
      O =
        null != k &&
        (k === w || (!l && k.startsWith(w) && '/' === k.charAt(w.length))),
      D = { isActive: B, isPending: O, isTransitioning: S },
      N = B ? a : void 0;
    P =
      'function' == typeof i
        ? i(D)
        : [
            i,
            B ? 'active' : null,
            O ? 'pending' : null,
            S ? 'transitioning' : null,
          ]
            .filter(Boolean)
            .join(' ');
    let j = 'function' == typeof u ? u(D) : u;
    return e.createElement(
      X,
      z({}, v, {
        'aria-current': N,
        className: P,
        ref: r,
        style: j,
        to: c,
        viewTransition: p,
      }),
      'function' == typeof h ? h(D) : h
    );
  });
var Z, $, ee, te;
function ne(t) {
  let n = e.useRef(J(t)),
    r = e.useRef(!1),
    a = E(),
    o = e.useMemo(
      () =>
        (function (e, t) {
          let n = J(e);
          return (
            t &&
              t.forEach((e, r) => {
                n.has(r) ||
                  t.getAll(r).forEach((e) => {
                    n.append(r, e);
                  });
              }),
            n
          );
        })(a.search, r.current ? null : n.current),
      [a.search]
    ),
    i = S(),
    l = e.useCallback(
      (e, t) => {
        const n = J('function' == typeof e ? e(o) : e);
        ((r.current = !0), i('?' + n, t));
      },
      [i, o]
    );
  return [o, l];
}
((($ = Z || (Z = {})).UseScrollRestoration = 'useScrollRestoration'),
  ($.UseSubmit = 'useSubmit'),
  ($.UseSubmitFetcher = 'useSubmitFetcher'),
  ($.UseFetcher = 'useFetcher'),
  ($.useViewTransitionState = 'useViewTransitionState'),
  ((te = ee || (ee = {})).UseFetcher = 'useFetcher'),
  (te.UseFetchers = 'useFetchers'),
  (te.UseScrollRestoration = 'useScrollRestoration'));
export {
  q as B,
  X as L,
  Y as N,
  A as R,
  F as a,
  E as b,
  S as c,
  ne as d,
  w as u,
};
