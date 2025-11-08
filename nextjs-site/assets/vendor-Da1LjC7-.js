function t(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
function e(t) {
  if (Object.prototype.hasOwnProperty.call(t, '__esModule')) return t;
  var e = t.default;
  if ('function' == typeof e) {
    var n = function t() {
      var n = !1;
      try {
        n = this instanceof t;
      } catch {}
      return n
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (e) {
      var r = Object.getOwnPropertyDescriptor(t, e);
      Object.defineProperty(
        n,
        e,
        r.get
          ? r
          : {
              enumerable: !0,
              get: function () {
                return t[e];
              },
            }
      );
    }),
    n
  );
}
var n,
  r,
  o,
  i,
  a = { exports: {} },
  s = {};
function u() {
  return (
    r ||
      ((r = 1),
      (a.exports =
        (n ||
          ((n = 1),
          (function (t) {
            function e(t, e) {
              var n = t.length;
              t.push(e);
              t: for (; 0 < n; ) {
                var r = (n - 1) >>> 1,
                  i = t[r];
                if (!(0 < o(i, e))) break t;
                ((t[r] = e), (t[n] = i), (n = r));
              }
            }
            function n(t) {
              return 0 === t.length ? null : t[0];
            }
            function r(t) {
              if (0 === t.length) return null;
              var e = t[0],
                n = t.pop();
              if (n !== e) {
                t[0] = n;
                t: for (var r = 0, i = t.length, a = i >>> 1; r < a; ) {
                  var s = 2 * (r + 1) - 1,
                    u = t[s],
                    l = s + 1,
                    c = t[l];
                  if (0 > o(u, n))
                    l < i && 0 > o(c, u)
                      ? ((t[r] = c), (t[l] = n), (r = l))
                      : ((t[r] = u), (t[s] = n), (r = s));
                  else {
                    if (!(l < i && 0 > o(c, n))) break t;
                    ((t[r] = c), (t[l] = n), (r = l));
                  }
                }
              }
              return e;
            }
            function o(t, e) {
              var n = t.sortIndex - e.sortIndex;
              return 0 !== n ? n : t.id - e.id;
            }
            if (
              ((t.unstable_now = void 0),
              'object' == typeof performance &&
                'function' == typeof performance.now)
            ) {
              var i = performance;
              t.unstable_now = function () {
                return i.now();
              };
            } else {
              var a = Date,
                s = a.now();
              t.unstable_now = function () {
                return a.now() - s;
              };
            }
            var u = [],
              l = [],
              c = 1,
              f = null,
              h = 3,
              p = !1,
              d = !1,
              g = !1,
              y = !1,
              m = 'function' == typeof setTimeout ? setTimeout : null,
              b = 'function' == typeof clearTimeout ? clearTimeout : null,
              v = 'undefined' != typeof setImmediate ? setImmediate : null;
            function w(t) {
              for (var o = n(l); null !== o; ) {
                if (null === o.callback) r(l);
                else {
                  if (!(o.startTime <= t)) break;
                  (r(l), (o.sortIndex = o.expirationTime), e(u, o));
                }
                o = n(l);
              }
            }
            function _(t) {
              if (((g = !1), w(t), !d))
                if (null !== n(u)) ((d = !0), M || ((M = !0), x()));
                else {
                  var e = n(l);
                  null !== e && A(_, e.startTime - t);
                }
            }
            var x,
              M = !1,
              k = -1,
              T = 5,
              S = -1;
            function O() {
              return !(!y && t.unstable_now() - S < T);
            }
            function j() {
              if (((y = !1), M)) {
                var e = t.unstable_now();
                S = e;
                var o = !0;
                try {
                  t: {
                    ((d = !1), g && ((g = !1), b(k), (k = -1)), (p = !0));
                    var i = h;
                    try {
                      e: {
                        for (
                          w(e), f = n(u);
                          null !== f && !(f.expirationTime > e && O());

                        ) {
                          var a = f.callback;
                          if ('function' == typeof a) {
                            ((f.callback = null), (h = f.priorityLevel));
                            var s = a(f.expirationTime <= e);
                            if (
                              ((e = t.unstable_now()), 'function' == typeof s)
                            ) {
                              ((f.callback = s), w(e), (o = !0));
                              break e;
                            }
                            (f === n(u) && r(u), w(e));
                          } else r(u);
                          f = n(u);
                        }
                        if (null !== f) o = !0;
                        else {
                          var c = n(l);
                          (null !== c && A(_, c.startTime - e), (o = !1));
                        }
                      }
                      break t;
                    } finally {
                      ((f = null), (h = i), (p = !1));
                    }
                    o = void 0;
                  }
                } finally {
                  o ? x() : (M = !1);
                }
              }
            }
            if ('function' == typeof v)
              x = function () {
                v(j);
              };
            else if ('undefined' != typeof MessageChannel) {
              var N = new MessageChannel(),
                P = N.port2;
              ((N.port1.onmessage = j),
                (x = function () {
                  P.postMessage(null);
                }));
            } else
              x = function () {
                m(j, 0);
              };
            function A(e, n) {
              k = m(function () {
                e(t.unstable_now());
              }, n);
            }
            ((t.unstable_IdlePriority = 5),
              (t.unstable_ImmediatePriority = 1),
              (t.unstable_LowPriority = 4),
              (t.unstable_NormalPriority = 3),
              (t.unstable_Profiling = null),
              (t.unstable_UserBlockingPriority = 2),
              (t.unstable_cancelCallback = function (t) {
                t.callback = null;
              }),
              (t.unstable_forceFrameRate = function (t) {
                0 > t || 125 < t
                  ? console.error(
                      'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                    )
                  : (T = 0 < t ? Math.floor(1e3 / t) : 5);
              }),
              (t.unstable_getCurrentPriorityLevel = function () {
                return h;
              }),
              (t.unstable_next = function (t) {
                switch (h) {
                  case 1:
                  case 2:
                  case 3:
                    var e = 3;
                    break;
                  default:
                    e = h;
                }
                var n = h;
                h = e;
                try {
                  return t();
                } finally {
                  h = n;
                }
              }),
              (t.unstable_requestPaint = function () {
                y = !0;
              }),
              (t.unstable_runWithPriority = function (t, e) {
                switch (t) {
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                    break;
                  default:
                    t = 3;
                }
                var n = h;
                h = t;
                try {
                  return e();
                } finally {
                  h = n;
                }
              }),
              (t.unstable_scheduleCallback = function (r, o, i) {
                var a = t.unstable_now();
                switch (
                  ((i =
                    'object' == typeof i &&
                    null !== i &&
                    'number' == typeof (i = i.delay) &&
                    0 < i
                      ? a + i
                      : a),
                  r)
                ) {
                  case 1:
                    var s = -1;
                    break;
                  case 2:
                    s = 250;
                    break;
                  case 5:
                    s = 1073741823;
                    break;
                  case 4:
                    s = 1e4;
                    break;
                  default:
                    s = 5e3;
                }
                return (
                  (r = {
                    id: c++,
                    callback: o,
                    priorityLevel: r,
                    startTime: i,
                    expirationTime: (s = i + s),
                    sortIndex: -1,
                  }),
                  i > a
                    ? ((r.sortIndex = i),
                      e(l, r),
                      null === n(u) &&
                        r === n(l) &&
                        (g ? (b(k), (k = -1)) : (g = !0), A(_, i - a)))
                    : ((r.sortIndex = s),
                      e(u, r),
                      d || p || ((d = !0), M || ((M = !0), x()))),
                  r
                );
              }),
              (t.unstable_shouldYield = O),
              (t.unstable_wrapCallback = function (t) {
                var e = h;
                return function () {
                  var n = h;
                  h = e;
                  try {
                    return t.apply(this, arguments);
                  } finally {
                    h = n;
                  }
                };
              }));
          })(s)),
        s))),
    a.exports
  );
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function l() {
  return (
    (l = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
          return t;
        }),
    l.apply(this, arguments)
  );
}
(((i = o || (o = {})).Pop = 'POP'), (i.Push = 'PUSH'), (i.Replace = 'REPLACE'));
const c = 'popstate';
function f(t) {
  return (
    void 0 === t && (t = {}),
    (function (t, e, n, r) {
      void 0 === r && (r = {});
      let { window: i = document.defaultView, v5Compat: a = !1 } = r,
        s = i.history,
        u = o.Pop,
        f = null,
        p = m();
      null == p && ((p = 0), s.replaceState(l({}, s.state, { idx: p }), ''));
      function m() {
        return (s.state || { idx: null }).idx;
      }
      function b() {
        u = o.Pop;
        let t = m(),
          e = null == t ? null : t - p;
        ((p = t), f && f({ action: u, location: x.location, delta: e }));
      }
      function v(t, e) {
        u = o.Push;
        let n = g(x.location, t, e);
        p = m() + 1;
        let r = d(n, p),
          l = x.createHref(n);
        try {
          s.pushState(r, '', l);
        } catch (c) {
          if (c instanceof DOMException && 'DataCloneError' === c.name) throw c;
          i.location.assign(l);
        }
        a && f && f({ action: u, location: x.location, delta: 1 });
      }
      function w(t, e) {
        u = o.Replace;
        let n = g(x.location, t, e);
        p = m();
        let r = d(n, p),
          i = x.createHref(n);
        (s.replaceState(r, '', i),
          a && f && f({ action: u, location: x.location, delta: 0 }));
      }
      function _(t) {
        let e =
            'null' !== i.location.origin ? i.location.origin : i.location.href,
          n = 'string' == typeof t ? t : y(t);
        return (
          (n = n.replace(/ $/, '%20')),
          h(
            e,
            'No window.location.(origin|href) available to create URL for href: ' +
              n
          ),
          new URL(n, e)
        );
      }
      let x = {
        get action() {
          return u;
        },
        get location() {
          return t(i, s);
        },
        listen(t) {
          if (f) throw new Error('A history only accepts one active listener');
          return (
            i.addEventListener(c, b),
            (f = t),
            () => {
              (i.removeEventListener(c, b), (f = null));
            }
          );
        },
        createHref: (t) => e(i, t),
        createURL: _,
        encodeLocation(t) {
          let e = _(t);
          return { pathname: e.pathname, search: e.search, hash: e.hash };
        },
        push: v,
        replace: w,
        go: (t) => s.go(t),
      };
      return x;
    })(
      function (t, e) {
        let { pathname: n, search: r, hash: o } = t.location;
        return g(
          '',
          { pathname: n, search: r, hash: o },
          (e.state && e.state.usr) || null,
          (e.state && e.state.key) || 'default'
        );
      },
      function (t, e) {
        return 'string' == typeof e ? e : y(e);
      },
      0,
      t
    )
  );
}
function h(t, e) {
  if (!1 === t || null == t) throw new Error(e);
}
function p(t, e) {
  if (!t) {
    'undefined' != typeof console && console.warn(e);
    try {
      throw new Error(e);
    } catch (n) {}
  }
}
function d(t, e) {
  return { usr: t.state, key: t.key, idx: e };
}
function g(t, e, n, r) {
  return (
    void 0 === n && (n = null),
    l(
      { pathname: 'string' == typeof t ? t : t.pathname, search: '', hash: '' },
      'string' == typeof e ? m(e) : e,
      {
        state: n,
        key: (e && e.key) || r || Math.random().toString(36).substr(2, 8),
      }
    )
  );
}
function y(t) {
  let { pathname: e = '/', search: n = '', hash: r = '' } = t;
  return (
    n && '?' !== n && (e += '?' === n.charAt(0) ? n : '?' + n),
    r && '#' !== r && (e += '#' === r.charAt(0) ? r : '#' + r),
    e
  );
}
function m(t) {
  let e = {};
  if (t) {
    let n = t.indexOf('#');
    n >= 0 && ((e.hash = t.substr(n)), (t = t.substr(0, n)));
    let r = t.indexOf('?');
    (r >= 0 && ((e.search = t.substr(r)), (t = t.substr(0, r))),
      t && (e.pathname = t));
  }
  return e;
}
var b, v;
function w(t, e, n) {
  return (
    void 0 === n && (n = '/'),
    (function (t, e, n) {
      let r = 'string' == typeof e ? m(e) : e,
        o = $(r.pathname || '/', n);
      if (null == o) return null;
      let i = _(t);
      !(function (t) {
        t.sort((t, e) =>
          t.score !== e.score
            ? e.score - t.score
            : (function (t, e) {
                let n =
                  t.length === e.length &&
                  t.slice(0, -1).every((t, n) => t === e[n]);
                return n ? t[t.length - 1] - e[e.length - 1] : 0;
              })(
                t.routesMeta.map((t) => t.childrenIndex),
                e.routesMeta.map((t) => t.childrenIndex)
              )
        );
      })(i);
      let a = null;
      for (let s = 0; null == a && s < i.length; ++s) {
        let t = C(o);
        a = A(i[s], t);
      }
      return a;
    })(t, e, n)
  );
}
function _(t, e, n, r) {
  (void 0 === e && (e = []),
    void 0 === n && (n = []),
    void 0 === r && (r = ''));
  let o = (t, o, i) => {
    let a = {
      relativePath: void 0 === i ? t.path || '' : i,
      caseSensitive: !0 === t.caseSensitive,
      childrenIndex: o,
      route: t,
    };
    a.relativePath.startsWith('/') &&
      (h(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path "' +
          r +
          '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let s = F([r, a.relativePath]),
      u = n.concat(a);
    (t.children &&
      t.children.length > 0 &&
      (h(
        !0 !== t.index,
        'Index routes must not have child routes. Please remove all child routes from route path "' +
          s +
          '".'
      ),
      _(t.children, e, u, s)),
      (null != t.path || t.index) &&
        e.push({ path: s, score: P(s, t.index), routesMeta: u }));
  };
  return (
    t.forEach((t, e) => {
      var n;
      if ('' !== t.path && null != (n = t.path) && n.includes('?'))
        for (let r of x(t.path)) o(t, e, r);
      else o(t, e);
    }),
    e
  );
}
function x(t) {
  let e = t.split('/');
  if (0 === e.length) return [];
  let [n, ...r] = e,
    o = n.endsWith('?'),
    i = n.replace(/\?$/, '');
  if (0 === r.length) return o ? [i, ''] : [i];
  let a = x(r.join('/')),
    s = [];
  return (
    s.push(...a.map((t) => ('' === t ? i : [i, t].join('/')))),
    o && s.push(...a),
    s.map((e) => (t.startsWith('/') && '' === e ? '/' : e))
  );
}
(((v = b || (b = {})).data = 'data'),
  (v.deferred = 'deferred'),
  (v.redirect = 'redirect'),
  (v.error = 'error'));
const M = /^:[\w-]+$/,
  k = 3,
  T = 2,
  S = 1,
  O = 10,
  j = -2,
  N = (t) => '*' === t;
function P(t, e) {
  let n = t.split('/'),
    r = n.length;
  return (
    n.some(N) && (r += j),
    e && (r += T),
    n
      .filter((t) => !N(t))
      .reduce((t, e) => t + (M.test(e) ? k : '' === e ? S : O), r)
  );
}
function A(t, e, n) {
  let { routesMeta: r } = t,
    o = {},
    i = '/',
    a = [];
  for (let s = 0; s < r.length; ++s) {
    let t = r[s],
      n = s === r.length - 1,
      u = '/' === i ? e : e.slice(i.length) || '/',
      l = E(
        { path: t.relativePath, caseSensitive: t.caseSensitive, end: n },
        u
      ),
      c = t.route;
    if (!l) return null;
    (Object.assign(o, l.params),
      a.push({
        params: o,
        pathname: F([i, l.pathname]),
        pathnameBase: I(F([i, l.pathnameBase])),
        route: c,
      }),
      '/' !== l.pathnameBase && (i = F([i, l.pathnameBase])));
  }
  return a;
}
function E(t, e) {
  'string' == typeof t && (t = { path: t, caseSensitive: !1, end: !0 });
  let [n, r] = (function (t, e, n) {
      void 0 === e && (e = !1);
      void 0 === n && (n = !0);
      p(
        '*' === t || !t.endsWith('*') || t.endsWith('/*'),
        'Route path "' +
          t +
          '" will be treated as if it were "' +
          t.replace(/\*$/, '/*') +
          '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' +
          t.replace(/\*$/, '/*') +
          '".'
      );
      let r = [],
        o =
          '^' +
          t
            .replace(/\/*\*?$/, '')
            .replace(/^\/*/, '/')
            .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
            .replace(
              /\/:([\w-]+)(\?)?/g,
              (t, e, n) => (
                r.push({ paramName: e, isOptional: null != n }),
                n ? '/?([^\\/]+)?' : '/([^\\/]+)'
              )
            );
      t.endsWith('*')
        ? (r.push({ paramName: '*' }),
          (o += '*' === t || '/*' === t ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
        : n
          ? (o += '\\/*$')
          : '' !== t && '/' !== t && (o += '(?:(?=\\/|$))');
      let i = new RegExp(o, e ? void 0 : 'i');
      return [i, r];
    })(t.path, t.caseSensitive, t.end),
    o = e.match(n);
  if (!o) return null;
  let i = o[0],
    a = i.replace(/(.)\/+$/, '$1'),
    s = o.slice(1);
  return {
    params: r.reduce((t, e, n) => {
      let { paramName: r, isOptional: o } = e;
      if ('*' === r) {
        let t = s[n] || '';
        a = i.slice(0, i.length - t.length).replace(/(.)\/+$/, '$1');
      }
      const u = s[n];
      return ((t[r] = o && !u ? void 0 : (u || '').replace(/%2F/g, '/')), t);
    }, {}),
    pathname: i,
    pathnameBase: a,
    pattern: t,
  };
}
function C(t) {
  try {
    return t
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (e) {
    return (
      p(
        !1,
        'The URL path "' +
          t +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' +
          e +
          ').'
      ),
      t
    );
  }
}
function $(t, e) {
  if ('/' === e) return t;
  if (!t.toLowerCase().startsWith(e.toLowerCase())) return null;
  let n = e.endsWith('/') ? e.length - 1 : e.length,
    r = t.charAt(n);
  return r && '/' !== r ? null : t.slice(n) || '/';
}
function D(t, e, n, r) {
  return (
    "Cannot include a '" +
    t +
    "' character in a manually specified `to." +
    e +
    '` field [' +
    JSON.stringify(r) +
    '].  Please separate it out to the `to.' +
    n +
    '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
  );
}
function U(t, e) {
  let n = (function (t) {
    return t.filter(
      (t, e) => 0 === e || (t.route.path && t.route.path.length > 0)
    );
  })(t);
  return e
    ? n.map((t, e) => (e === n.length - 1 ? t.pathname : t.pathnameBase))
    : n.map((t) => t.pathnameBase);
}
function z(t, e, n, r) {
  let o;
  (void 0 === r && (r = !1),
    'string' == typeof t
      ? (o = m(t))
      : ((o = l({}, t)),
        h(
          !o.pathname || !o.pathname.includes('?'),
          D('?', 'pathname', 'search', o)
        ),
        h(
          !o.pathname || !o.pathname.includes('#'),
          D('#', 'pathname', 'hash', o)
        ),
        h(!o.search || !o.search.includes('#'), D('#', 'search', 'hash', o))));
  let i,
    a = '' === t || '' === o.pathname,
    s = a ? '/' : o.pathname;
  if (null == s) i = n;
  else {
    let t = e.length - 1;
    if (!r && s.startsWith('..')) {
      let e = s.split('/');
      for (; '..' === e[0]; ) (e.shift(), (t -= 1));
      o.pathname = e.join('/');
    }
    i = t >= 0 ? e[t] : '/';
  }
  let u = (function (t, e) {
      void 0 === e && (e = '/');
      let {
          pathname: n,
          search: r = '',
          hash: o = '',
        } = 'string' == typeof t ? m(t) : t,
        i = n
          ? n.startsWith('/')
            ? n
            : (function (t, e) {
                let n = e.replace(/\/+$/, '').split('/');
                return (
                  t.split('/').forEach((t) => {
                    '..' === t
                      ? n.length > 1 && n.pop()
                      : '.' !== t && n.push(t);
                  }),
                  n.length > 1 ? n.join('/') : '/'
                );
              })(n, e)
          : e;
      return { pathname: i, search: L(r), hash: R(o) };
    })(o, i),
    c = s && '/' !== s && s.endsWith('/'),
    f = (a || '.' === s) && n.endsWith('/');
  return (u.pathname.endsWith('/') || (!c && !f) || (u.pathname += '/'), u);
}
const F = (t) => t.join('/').replace(/\/\/+/g, '/'),
  I = (t) => t.replace(/\/+$/, '').replace(/^\/*/, '/'),
  L = (t) => (t && '?' !== t ? (t.startsWith('?') ? t : '?' + t) : ''),
  R = (t) => (t && '#' !== t ? (t.startsWith('#') ? t : '#' + t) : '');
function q(t) {
  return (
    null != t &&
    'number' == typeof t.status &&
    'string' == typeof t.statusText &&
    'boolean' == typeof t.internal &&
    'data' in t
  );
}
const W = ['post', 'put', 'patch', 'delete'];
new Set(W);
const H = ['get', ...W];
var B, Y;
new Set(H);
const V = t(
  Y
    ? B
    : ((Y = 1),
      (B = function (t, e, n, r, o, i, a, s) {
        if (!t) {
          var u;
          if (void 0 === e)
            u = new Error(
              'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
            );
          else {
            var l = [n, r, o, i, a, s],
              c = 0;
            (u = new Error(
              e.replace(/%s/g, function () {
                return l[c++];
              })
            )).name = 'Invariant Violation';
          }
          throw ((u.framesToPop = 1), u);
        }
      }))
);
var G, K;
const Z = t(
  K
    ? G
    : ((K = 1),
      (G = function (t, e, n, r) {
        var o = n ? n.call(r, t, e) : void 0;
        if (void 0 !== o) return !!o;
        if (t === e) return !0;
        if ('object' != typeof t || !t || 'object' != typeof e || !e) return !1;
        var i = Object.keys(t),
          a = Object.keys(e);
        if (i.length !== a.length) return !1;
        for (
          var s = Object.prototype.hasOwnProperty.bind(e), u = 0;
          u < i.length;
          u++
        ) {
          var l = i[u];
          if (!s(l)) return !1;
          var c = t[l],
            f = e[l];
          if (
            !1 === (o = n ? n.call(r, c, f, l) : void 0) ||
            (void 0 === o && c !== f)
          )
            return !1;
        }
        return !0;
      }))
);
var X,
  Q,
  J,
  tt,
  et,
  nt = { exports: {} };
function rt() {
  if (Q) return X;
  Q = 1;
  return (X = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
}
function ot() {
  if (tt) return J;
  tt = 1;
  var t = rt();
  function e() {}
  function n() {}
  return (
    (n.resetWarningCache = e),
    (J = function () {
      function r(e, n, r, o, i, a) {
        if (a !== t) {
          var s = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
          );
          throw ((s.name = 'Invariant Violation'), s);
        }
      }
      function o() {
        return r;
      }
      r.isRequired = r;
      var i = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: o,
        element: r,
        elementType: r,
        instanceOf: o,
        node: r,
        objectOf: o,
        oneOf: o,
        oneOfType: o,
        shape: o,
        exact: o,
        checkPropTypes: n,
        resetWarningCache: e,
      };
      return ((i.PropTypes = i), i);
    })
  );
}
function it() {
  return (et || ((et = 1), (nt.exports = ot()())), nt.exports);
}
const at = t(it());
function st(t) {
  var e,
    n,
    r = '';
  if ('string' == typeof t || 'number' == typeof t) r += t;
  else if ('object' == typeof t)
    if (Array.isArray(t)) {
      var o = t.length;
      for (e = 0; e < o; e++)
        t[e] && (n = st(t[e])) && (r && (r += ' '), (r += n));
    } else for (n in t) t[n] && (r && (r += ' '), (r += n));
  return r;
}
function ut() {
  for (var t, e, n = 0, r = '', o = arguments.length; n < o; n++)
    (t = arguments[n]) && (e = st(t)) && (r && (r += ' '), (r += e));
  return r;
}
function lt(t) {
  return function () {
    return t;
  };
}
const ct = Math.cos,
  ft = Math.sin,
  ht = Math.sqrt,
  pt = Math.PI,
  dt = 2 * pt,
  gt = Math.PI,
  yt = 2 * gt,
  mt = 1e-6,
  bt = yt - mt;
function vt(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e) this._ += arguments[e] + t[e];
}
class wt {
  constructor(t) {
    ((this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ''),
      (this._append =
        null == t
          ? vt
          : (function (t) {
              let e = Math.floor(t);
              if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
              if (e > 15) return vt;
              const n = 10 ** e;
              return function (t) {
                this._ += t[0];
                for (let e = 1, r = t.length; e < r; ++e)
                  this._ += Math.round(arguments[e] * n) / n + t[e];
              };
            })(t)));
  }
  moveTo(t, e) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    null !== this._x1 &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(t, e) {
    this._append`L${(this._x1 = +t)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(t, e, n, r) {
    this._append`Q${+t},${+e},${(this._x1 = +n)},${(this._y1 = +r)}`;
  }
  bezierCurveTo(t, e, n, r, o, i) {
    this
      ._append`C${+t},${+e},${+n},${+r},${(this._x1 = +o)},${(this._y1 = +i)}`;
  }
  arcTo(t, e, n, r, o) {
    if (((t = +t), (e = +e), (n = +n), (r = +r), (o = +o) < 0))
      throw new Error(`negative radius: ${o}`);
    let i = this._x1,
      a = this._y1,
      s = n - t,
      u = r - e,
      l = i - t,
      c = a - e,
      f = l * l + c * c;
    if (null === this._x1) this._append`M${(this._x1 = t)},${(this._y1 = e)}`;
    else if (f > mt)
      if (Math.abs(c * s - u * l) > mt && o) {
        let h = n - i,
          p = r - a,
          d = s * s + u * u,
          g = h * h + p * p,
          y = Math.sqrt(d),
          m = Math.sqrt(f),
          b = o * Math.tan((gt - Math.acos((d + f - g) / (2 * y * m))) / 2),
          v = b / m,
          w = b / y;
        (Math.abs(v - 1) > mt && this._append`L${t + v * l},${e + v * c}`,
          this
            ._append`A${o},${o},0,0,${+(c * h > l * p)},${(this._x1 = t + w * s)},${(this._y1 = e + w * u)}`);
      } else this._append`L${(this._x1 = t)},${(this._y1 = e)}`;
    else;
  }
  arc(t, e, n, r, o, i) {
    if (((t = +t), (e = +e), (i = !!i), (n = +n) < 0))
      throw new Error(`negative radius: ${n}`);
    let a = n * Math.cos(r),
      s = n * Math.sin(r),
      u = t + a,
      l = e + s,
      c = 1 ^ i,
      f = i ? r - o : o - r;
    (null === this._x1
      ? this._append`M${u},${l}`
      : (Math.abs(this._x1 - u) > mt || Math.abs(this._y1 - l) > mt) &&
        this._append`L${u},${l}`,
      n &&
        (f < 0 && (f = (f % yt) + yt),
        f > bt
          ? this
              ._append`A${n},${n},0,1,${c},${t - a},${e - s}A${n},${n},0,1,${c},${(this._x1 = u)},${(this._y1 = l)}`
          : f > mt &&
            this
              ._append`A${n},${n},0,${+(f >= gt)},${c},${(this._x1 = t + n * Math.cos(o))},${(this._y1 = e + n * Math.sin(o))}`));
  }
  rect(t, e, n, r) {
    this
      ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +e)}h${(n = +n)}v${+r}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function _t(t) {
  let e = 3;
  return (
    (t.digits = function (n) {
      if (!arguments.length) return e;
      if (null == n) e = null;
      else {
        const t = Math.floor(n);
        if (!(t >= 0)) throw new RangeError(`invalid digits: ${n}`);
        e = t;
      }
      return t;
    }),
    () => new wt(e)
  );
}
function xt(t) {
  return 'object' == typeof t && 'length' in t ? t : Array.from(t);
}
function Mt(t) {
  this._context = t;
}
function kt(t) {
  return new Mt(t);
}
function Tt(t) {
  return t[0];
}
function St(t) {
  return t[1];
}
function Ot(t, e) {
  var n = lt(!0),
    r = null,
    o = kt,
    i = null,
    a = _t(s);
  function s(s) {
    var u,
      l,
      c,
      f = (s = xt(s)).length,
      h = !1;
    for (null == r && (i = o((c = a()))), u = 0; u <= f; ++u)
      (!(u < f && n((l = s[u]), u, s)) === h &&
        ((h = !h) ? i.lineStart() : i.lineEnd()),
        h && i.point(+t(l, u, s), +e(l, u, s)));
    if (c) return ((i = null), c + '' || null);
  }
  return (
    (t = 'function' == typeof t ? t : void 0 === t ? Tt : lt(t)),
    (e = 'function' == typeof e ? e : void 0 === e ? St : lt(e)),
    (s.x = function (e) {
      return arguments.length
        ? ((t = 'function' == typeof e ? e : lt(+e)), s)
        : t;
    }),
    (s.y = function (t) {
      return arguments.length
        ? ((e = 'function' == typeof t ? t : lt(+t)), s)
        : e;
    }),
    (s.defined = function (t) {
      return arguments.length
        ? ((n = 'function' == typeof t ? t : lt(!!t)), s)
        : n;
    }),
    (s.curve = function (t) {
      return arguments.length ? ((o = t), null != r && (i = o(r)), s) : o;
    }),
    (s.context = function (t) {
      return arguments.length
        ? (null == t ? (r = i = null) : (i = o((r = t))), s)
        : r;
    }),
    s
  );
}
function jt(t, e, n) {
  var r = null,
    o = lt(!0),
    i = null,
    a = kt,
    s = null,
    u = _t(l);
  function l(l) {
    var c,
      f,
      h,
      p,
      d,
      g = (l = xt(l)).length,
      y = !1,
      m = new Array(g),
      b = new Array(g);
    for (null == i && (s = a((d = u()))), c = 0; c <= g; ++c) {
      if (!(c < g && o((p = l[c]), c, l)) === y)
        if ((y = !y)) ((f = c), s.areaStart(), s.lineStart());
        else {
          for (s.lineEnd(), s.lineStart(), h = c - 1; h >= f; --h)
            s.point(m[h], b[h]);
          (s.lineEnd(), s.areaEnd());
        }
      y &&
        ((m[c] = +t(p, c, l)),
        (b[c] = +e(p, c, l)),
        s.point(r ? +r(p, c, l) : m[c], n ? +n(p, c, l) : b[c]));
    }
    if (d) return ((s = null), d + '' || null);
  }
  function c() {
    return Ot().defined(o).curve(a).context(i);
  }
  return (
    (t = 'function' == typeof t ? t : void 0 === t ? Tt : lt(+t)),
    (e = 'function' == typeof e ? e : lt(void 0 === e ? 0 : +e)),
    (n = 'function' == typeof n ? n : void 0 === n ? St : lt(+n)),
    (l.x = function (e) {
      return arguments.length
        ? ((t = 'function' == typeof e ? e : lt(+e)), (r = null), l)
        : t;
    }),
    (l.x0 = function (e) {
      return arguments.length
        ? ((t = 'function' == typeof e ? e : lt(+e)), l)
        : t;
    }),
    (l.x1 = function (t) {
      return arguments.length
        ? ((r = null == t ? null : 'function' == typeof t ? t : lt(+t)), l)
        : r;
    }),
    (l.y = function (t) {
      return arguments.length
        ? ((e = 'function' == typeof t ? t : lt(+t)), (n = null), l)
        : e;
    }),
    (l.y0 = function (t) {
      return arguments.length
        ? ((e = 'function' == typeof t ? t : lt(+t)), l)
        : e;
    }),
    (l.y1 = function (t) {
      return arguments.length
        ? ((n = null == t ? null : 'function' == typeof t ? t : lt(+t)), l)
        : n;
    }),
    (l.lineX0 = l.lineY0 =
      function () {
        return c().x(t).y(e);
      }),
    (l.lineY1 = function () {
      return c().x(t).y(n);
    }),
    (l.lineX1 = function () {
      return c().x(r).y(e);
    }),
    (l.defined = function (t) {
      return arguments.length
        ? ((o = 'function' == typeof t ? t : lt(!!t)), l)
        : o;
    }),
    (l.curve = function (t) {
      return arguments.length ? ((a = t), null != i && (s = a(i)), l) : a;
    }),
    (l.context = function (t) {
      return arguments.length
        ? (null == t ? (i = s = null) : (s = a((i = t))), l)
        : i;
    }),
    l
  );
}
Mt.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    ((this._line || (0 !== this._line && 1 === this._point)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (t, e) {
    switch (((t = +t), (e = +e), this._point)) {
      case 0:
        ((this._point = 1),
          this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e));
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
    }
  },
};
class Nt {
  constructor(t, e) {
    ((this._context = t), (this._x = e));
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    ((this._line || (0 !== this._line && 1 === this._point)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  }
  point(t, e) {
    switch (((t = +t), (e = +e), this._point)) {
      case 0:
        ((this._point = 1),
          this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e));
        break;
      case 1:
        this._point = 2;
      default:
        this._x
          ? this._context.bezierCurveTo(
              (this._x0 = (this._x0 + t) / 2),
              this._y0,
              this._x0,
              e,
              t,
              e
            )
          : this._context.bezierCurveTo(
              this._x0,
              (this._y0 = (this._y0 + e) / 2),
              t,
              this._y0,
              t,
              e
            );
    }
    ((this._x0 = t), (this._y0 = e));
  }
}
function Pt(t) {
  return new Nt(t, !0);
}
function At(t) {
  return new Nt(t, !1);
}
const Et = {
    draw(t, e) {
      const n = ht(e / pt);
      (t.moveTo(n, 0), t.arc(0, 0, n, 0, dt));
    },
  },
  Ct = {
    draw(t, e) {
      const n = ht(e / 5) / 2;
      (t.moveTo(-3 * n, -n),
        t.lineTo(-n, -n),
        t.lineTo(-n, -3 * n),
        t.lineTo(n, -3 * n),
        t.lineTo(n, -n),
        t.lineTo(3 * n, -n),
        t.lineTo(3 * n, n),
        t.lineTo(n, n),
        t.lineTo(n, 3 * n),
        t.lineTo(-n, 3 * n),
        t.lineTo(-n, n),
        t.lineTo(-3 * n, n),
        t.closePath());
    },
  },
  $t = ht(1 / 3),
  Dt = 2 * $t,
  Ut = {
    draw(t, e) {
      const n = ht(e / Dt),
        r = n * $t;
      (t.moveTo(0, -n),
        t.lineTo(r, 0),
        t.lineTo(0, n),
        t.lineTo(-r, 0),
        t.closePath());
    },
  },
  zt = {
    draw(t, e) {
      const n = ht(e),
        r = -n / 2;
      t.rect(r, r, n, n);
    },
  },
  Ft = ft(pt / 10) / ft((7 * pt) / 10),
  It = ft(dt / 10) * Ft,
  Lt = -ct(dt / 10) * Ft,
  Rt = {
    draw(t, e) {
      const n = ht(0.8908130915292852 * e),
        r = It * n,
        o = Lt * n;
      (t.moveTo(0, -n), t.lineTo(r, o));
      for (let i = 1; i < 5; ++i) {
        const e = (dt * i) / 5,
          a = ct(e),
          s = ft(e);
        (t.lineTo(s * n, -a * n), t.lineTo(a * r - s * o, s * r + a * o));
      }
      t.closePath();
    },
  },
  qt = ht(3),
  Wt = {
    draw(t, e) {
      const n = -ht(e / (3 * qt));
      (t.moveTo(0, 2 * n),
        t.lineTo(-qt * n, -n),
        t.lineTo(qt * n, -n),
        t.closePath());
    },
  },
  Ht = -0.5,
  Bt = ht(3) / 2,
  Yt = 1 / ht(12),
  Vt = 3 * (Yt / 2 + 1),
  Gt = {
    draw(t, e) {
      const n = ht(e / Vt),
        r = n / 2,
        o = n * Yt,
        i = r,
        a = n * Yt + n,
        s = -i,
        u = a;
      (t.moveTo(r, o),
        t.lineTo(i, a),
        t.lineTo(s, u),
        t.lineTo(Ht * r - Bt * o, Bt * r + Ht * o),
        t.lineTo(Ht * i - Bt * a, Bt * i + Ht * a),
        t.lineTo(Ht * s - Bt * u, Bt * s + Ht * u),
        t.lineTo(Ht * r + Bt * o, Ht * o - Bt * r),
        t.lineTo(Ht * i + Bt * a, Ht * a - Bt * i),
        t.lineTo(Ht * s + Bt * u, Ht * u - Bt * s),
        t.closePath());
    },
  };
function Kt(t, e) {
  let n = null,
    r = _t(o);
  function o() {
    let o;
    if (
      (n || (n = o = r()),
      t.apply(this, arguments).draw(n, +e.apply(this, arguments)),
      o)
    )
      return ((n = null), o + '' || null);
  }
  return (
    (t = 'function' == typeof t ? t : lt(t || Et)),
    (e = 'function' == typeof e ? e : lt(void 0 === e ? 64 : +e)),
    (o.type = function (e) {
      return arguments.length
        ? ((t = 'function' == typeof e ? e : lt(e)), o)
        : t;
    }),
    (o.size = function (t) {
      return arguments.length
        ? ((e = 'function' == typeof t ? t : lt(+t)), o)
        : e;
    }),
    (o.context = function (t) {
      return arguments.length ? ((n = null == t ? null : t), o) : n;
    }),
    o
  );
}
function Zt() {}
function Xt(t, e, n) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + n) / 6
  );
}
function Qt(t) {
  this._context = t;
}
function Jt(t) {
  return new Qt(t);
}
function te(t) {
  this._context = t;
}
function ee(t) {
  return new te(t);
}
function ne(t) {
  this._context = t;
}
function re(t) {
  return new ne(t);
}
function oe(t) {
  this._context = t;
}
function ie(t) {
  return new oe(t);
}
function ae(t) {
  return t < 0 ? -1 : 1;
}
function se(t, e, n) {
  var r = t._x1 - t._x0,
    o = e - t._x1,
    i = (t._y1 - t._y0) / (r || (o < 0 && -0)),
    a = (n - t._y1) / (o || (r < 0 && -0)),
    s = (i * o + a * r) / (r + o);
  return (
    (ae(i) + ae(a)) * Math.min(Math.abs(i), Math.abs(a), 0.5 * Math.abs(s)) || 0
  );
}
function ue(t, e) {
  var n = t._x1 - t._x0;
  return n ? ((3 * (t._y1 - t._y0)) / n - e) / 2 : e;
}
function le(t, e, n) {
  var r = t._x0,
    o = t._y0,
    i = t._x1,
    a = t._y1,
    s = (i - r) / 3;
  t._context.bezierCurveTo(r + s, o + s * e, i - s, a - s * n, i, a);
}
function ce(t) {
  this._context = t;
}
function fe(t) {
  this._context = new he(t);
}
function he(t) {
  this._context = t;
}
function pe(t) {
  return new ce(t);
}
function de(t) {
  return new fe(t);
}
function ge(t) {
  this._context = t;
}
function ye(t) {
  var e,
    n,
    r = t.length - 1,
    o = new Array(r),
    i = new Array(r),
    a = new Array(r);
  for (o[0] = 0, i[0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e)
    ((o[e] = 1), (i[e] = 4), (a[e] = 4 * t[e] + 2 * t[e + 1]));
  for (
    o[r - 1] = 2, i[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1;
    e < r;
    ++e
  )
    ((n = o[e] / i[e - 1]), (i[e] -= n), (a[e] -= n * a[e - 1]));
  for (o[r - 1] = a[r - 1] / i[r - 1], e = r - 2; e >= 0; --e)
    o[e] = (a[e] - o[e + 1]) / i[e];
  for (i[r - 1] = (t[r] + o[r - 1]) / 2, e = 0; e < r - 1; ++e)
    i[e] = 2 * t[e + 1] - o[e + 1];
  return [o, i];
}
function me(t) {
  return new ge(t);
}
function be(t, e) {
  ((this._context = t), (this._t = e));
}
function ve(t) {
  return new be(t, 0.5);
}
function we(t) {
  return new be(t, 0);
}
function _e(t) {
  return new be(t, 1);
}
function xe(t, e) {
  if ((o = t.length) > 1)
    for (var n, r, o, i = 1, a = t[e[0]], s = a.length; i < o; ++i)
      for (r = a, a = t[e[i]], n = 0; n < s; ++n)
        a[n][1] += a[n][0] = isNaN(r[n][1]) ? r[n][0] : r[n][1];
}
function Me(t) {
  for (var e = t.length, n = new Array(e); --e >= 0; ) n[e] = e;
  return n;
}
function ke(t, e) {
  return t[e];
}
function Te(t) {
  const e = [];
  return ((e.key = t), e);
}
function Se() {
  var t = lt([]),
    e = Me,
    n = xe,
    r = ke;
  function o(o) {
    var i,
      a,
      s = Array.from(t.apply(this, arguments), Te),
      u = s.length,
      l = -1;
    for (const t of o)
      for (i = 0, ++l; i < u; ++i)
        (s[i][l] = [0, +r(t, s[i].key, l, o)]).data = t;
    for (i = 0, a = xt(e(s)); i < u; ++i) s[a[i]].index = i;
    return (n(s, a), s);
  }
  return (
    (o.keys = function (e) {
      return arguments.length
        ? ((t = 'function' == typeof e ? e : lt(Array.from(e))), o)
        : t;
    }),
    (o.value = function (t) {
      return arguments.length
        ? ((r = 'function' == typeof t ? t : lt(+t)), o)
        : r;
    }),
    (o.order = function (t) {
      return arguments.length
        ? ((e =
            null == t ? Me : 'function' == typeof t ? t : lt(Array.from(t))),
          o)
        : e;
    }),
    (o.offset = function (t) {
      return arguments.length ? ((n = null == t ? xe : t), o) : n;
    }),
    o
  );
}
function Oe(t, e) {
  if ((r = t.length) > 0) {
    for (var n, r, o, i = 0, a = t[0].length; i < a; ++i) {
      for (o = n = 0; n < r; ++n) o += t[n][i][1] || 0;
      if (o) for (n = 0; n < r; ++n) t[n][i][1] /= o;
    }
    xe(t, e);
  }
}
function je(t, e) {
  if ((n = t.length) > 0) {
    for (var n, r = 0, o = t[e[0]], i = o.length; r < i; ++r) {
      for (var a = 0, s = 0; a < n; ++a) s += t[a][r][1] || 0;
      o[r][1] += o[r][0] = -s / 2;
    }
    xe(t, e);
  }
}
function Ne(t, e) {
  if ((o = t.length) > 0 && (r = (n = t[e[0]]).length) > 0) {
    for (var n, r, o, i = 0, a = 1; a < r; ++a) {
      for (var s = 0, u = 0, l = 0; s < o; ++s) {
        for (
          var c = t[e[s]],
            f = c[a][1] || 0,
            h = (f - (c[a - 1][1] || 0)) / 2,
            p = 0;
          p < s;
          ++p
        ) {
          var d = t[e[p]];
          h += (d[a][1] || 0) - (d[a - 1][1] || 0);
        }
        ((u += f), (l += h * f));
      }
      ((n[a - 1][1] += n[a - 1][0] = i), u && (i -= l / u));
    }
    ((n[a - 1][1] += n[a - 1][0] = i), xe(t, e));
  }
}
((Qt.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        Xt(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
    }
    ((this._line || (0 !== this._line && 1 === this._point)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (t, e) {
    switch (((t = +t), (e = +e), this._point)) {
      case 0:
        ((this._point = 1),
          this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e));
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        ((this._point = 3),
          this._context.lineTo(
            (5 * this._x0 + this._x1) / 6,
            (5 * this._y0 + this._y1) / 6
          ));
      default:
        Xt(this, t, e);
    }
    ((this._x0 = this._x1),
      (this._x1 = t),
      (this._y0 = this._y1),
      (this._y1 = e));
  },
}),
  (te.prototype = {
    areaStart: Zt,
    areaEnd: Zt,
    lineStart: function () {
      ((this._x0 =
        this._x1 =
        this._x2 =
        this._x3 =
        this._x4 =
        this._y0 =
        this._y1 =
        this._y2 =
        this._y3 =
        this._y4 =
          NaN),
        (this._point = 0));
    },
    lineEnd: function () {
      switch (this._point) {
        case 1:
          (this._context.moveTo(this._x2, this._y2), this._context.closePath());
          break;
        case 2:
          (this._context.moveTo(
            (this._x2 + 2 * this._x3) / 3,
            (this._y2 + 2 * this._y3) / 3
          ),
            this._context.lineTo(
              (this._x3 + 2 * this._x2) / 3,
              (this._y3 + 2 * this._y2) / 3
            ),
            this._context.closePath());
          break;
        case 3:
          (this.point(this._x2, this._y2),
            this.point(this._x3, this._y3),
            this.point(this._x4, this._y4));
      }
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          ((this._point = 1), (this._x2 = t), (this._y2 = e));
          break;
        case 1:
          ((this._point = 2), (this._x3 = t), (this._y3 = e));
          break;
        case 2:
          ((this._point = 3),
            (this._x4 = t),
            (this._y4 = e),
            this._context.moveTo(
              (this._x0 + 4 * this._x1 + t) / 6,
              (this._y0 + 4 * this._y1 + e) / 6
            ));
          break;
        default:
          Xt(this, t, e);
      }
      ((this._x0 = this._x1),
        (this._x1 = t),
        (this._y0 = this._y1),
        (this._y1 = e));
    },
  }),
  (ne.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      ((this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0));
    },
    lineEnd: function () {
      ((this._line || (0 !== this._line && 3 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line));
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
          var n = (this._x0 + 4 * this._x1 + t) / 6,
            r = (this._y0 + 4 * this._y1 + e) / 6;
          this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
          break;
        case 3:
          this._point = 4;
        default:
          Xt(this, t, e);
      }
      ((this._x0 = this._x1),
        (this._x1 = t),
        (this._y0 = this._y1),
        (this._y1 = e));
    },
  }),
  (oe.prototype = {
    areaStart: Zt,
    areaEnd: Zt,
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      this._point && this._context.closePath();
    },
    point: function (t, e) {
      ((t = +t),
        (e = +e),
        this._point
          ? this._context.lineTo(t, e)
          : ((this._point = 1), this._context.moveTo(t, e)));
    },
  }),
  (ce.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      ((this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
        (this._point = 0));
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
        case 3:
          le(this, this._t0, ue(this, this._t0));
      }
      ((this._line || (0 !== this._line && 1 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line));
    },
    point: function (t, e) {
      var n = NaN;
      if (((e = +e), (t = +t) !== this._x1 || e !== this._y1)) {
        switch (this._point) {
          case 0:
            ((this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e));
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            ((this._point = 3), le(this, ue(this, (n = se(this, t, e))), n));
            break;
          default:
            le(this, this._t0, (n = se(this, t, e)));
        }
        ((this._x0 = this._x1),
          (this._x1 = t),
          (this._y0 = this._y1),
          (this._y1 = e),
          (this._t0 = n));
      }
    },
  }),
  ((fe.prototype = Object.create(ce.prototype)).point = function (t, e) {
    ce.prototype.point.call(this, e, t);
  }),
  (he.prototype = {
    moveTo: function (t, e) {
      this._context.moveTo(e, t);
    },
    closePath: function () {
      this._context.closePath();
    },
    lineTo: function (t, e) {
      this._context.lineTo(e, t);
    },
    bezierCurveTo: function (t, e, n, r, o, i) {
      this._context.bezierCurveTo(e, t, r, n, i, o);
    },
  }),
  (ge.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      ((this._x = []), (this._y = []));
    },
    lineEnd: function () {
      var t = this._x,
        e = this._y,
        n = t.length;
      if (n)
        if (
          (this._line
            ? this._context.lineTo(t[0], e[0])
            : this._context.moveTo(t[0], e[0]),
          2 === n)
        )
          this._context.lineTo(t[1], e[1]);
        else
          for (var r = ye(t), o = ye(e), i = 0, a = 1; a < n; ++i, ++a)
            this._context.bezierCurveTo(
              r[0][i],
              o[0][i],
              r[1][i],
              o[1][i],
              t[a],
              e[a]
            );
      ((this._line || (0 !== this._line && 1 === n)) &&
        this._context.closePath(),
        (this._line = 1 - this._line),
        (this._x = this._y = null));
    },
    point: function (t, e) {
      (this._x.push(+t), this._y.push(+e));
    },
  }),
  (be.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      ((this._x = this._y = NaN), (this._point = 0));
    },
    lineEnd: function () {
      (0 < this._t &&
        this._t < 1 &&
        2 === this._point &&
        this._context.lineTo(this._x, this._y),
        (this._line || (0 !== this._line && 1 === this._point)) &&
          this._context.closePath(),
        this._line >= 0 &&
          ((this._t = 1 - this._t), (this._line = 1 - this._line)));
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          ((this._point = 1),
            this._line
              ? this._context.lineTo(t, e)
              : this._context.moveTo(t, e));
          break;
        case 1:
          this._point = 2;
        default:
          if (this._t <= 0)
            (this._context.lineTo(this._x, e), this._context.lineTo(t, e));
          else {
            var n = this._x * (1 - this._t) + t * this._t;
            (this._context.lineTo(n, this._y), this._context.lineTo(n, e));
          }
      }
      ((this._x = t), (this._y = e));
    },
  }));
var Pe,
  Ae = {},
  Ee = {};
function Ce() {
  return (
    Pe ||
      ((Pe = 1),
      (t = Ee),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isUnsafeProperty = function (t) {
        return '__proto__' === t;
      })),
    Ee
  );
  var t;
}
var $e,
  De = {};
function Ue() {
  return (
    $e ||
      (($e = 1),
      (t = De),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isDeepKey = function (t) {
        switch (typeof t) {
          case 'number':
          case 'symbol':
            return !1;
          case 'string':
            return t.includes('.') || t.includes('[') || t.includes(']');
        }
      })),
    De
  );
  var t;
}
var ze,
  Fe = {};
function Ie() {
  return (
    ze ||
      ((ze = 1),
      (t = Fe),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.toKey = function (t) {
        var e;
        return 'string' == typeof t || 'symbol' == typeof t
          ? t
          : Object.is(
                null == (e = null == t ? void 0 : t.valueOf)
                  ? void 0
                  : e.call(t),
                -0
              )
            ? '-0'
            : String(t);
      })),
    Fe
  );
  var t;
}
var Le,
  Re,
  qe,
  We,
  He,
  Be = {},
  Ye = {};
function Ve() {
  return (
    Le ||
      ((Le = 1),
      (t = Ye),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.toString = function t(e) {
        if (null == e) return '';
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return e.map(t).join(',');
        const n = String(e);
        return '0' === n && Object.is(Number(e), -0) ? '-0' : n;
      })),
    Ye
  );
  var t;
}
function Ge() {
  return (
    Re ||
      ((Re = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Ve(),
          n = Ie();
        t.toPath = function (t) {
          if (Array.isArray(t)) return t.map(n.toKey);
          if ('symbol' == typeof t) return [t];
          const r = [],
            o = (t = e.toString(t)).length;
          if (0 === o) return r;
          let i = 0,
            a = '',
            s = '',
            u = !1;
          for (46 === t.charCodeAt(0) && (r.push(''), i++); i < o; ) {
            const e = t[i];
            (s
              ? '\\' === e && i + 1 < o
                ? (i++, (a += t[i]))
                : e === s
                  ? (s = '')
                  : (a += e)
              : u
                ? '"' === e || "'" === e
                  ? (s = e)
                  : ']' === e
                    ? ((u = !1), r.push(a), (a = ''))
                    : (a += e)
                : '[' === e
                  ? ((u = !0), a && (r.push(a), (a = '')))
                  : '.' === e
                    ? a && (r.push(a), (a = ''))
                    : (a += e),
              i++);
          }
          return (a && r.push(a), r);
        };
      })(Be)),
    Be
  );
}
function Ke() {
  return (
    qe ||
      ((qe = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Ce(),
          n = Ue(),
          r = Ie(),
          o = Ge();
        t.get = function t(i, a, s) {
          if (null == i) return s;
          switch (typeof a) {
            case 'string': {
              if (e.isUnsafeProperty(a)) return s;
              const r = i[a];
              return void 0 === r
                ? n.isDeepKey(a)
                  ? t(i, o.toPath(a), s)
                  : s
                : r;
            }
            case 'number':
            case 'symbol': {
              'number' == typeof a && (a = r.toKey(a));
              const t = i[a];
              return void 0 === t ? s : t;
            }
            default: {
              if (Array.isArray(a))
                return (function (t, n, r) {
                  if (0 === n.length) return r;
                  let o = t;
                  for (let i = 0; i < n.length; i++) {
                    if (null == o) return r;
                    if (e.isUnsafeProperty(n[i])) return r;
                    o = o[n[i]];
                  }
                  if (void 0 === o) return r;
                  return o;
                })(i, a, s);
              if (
                ((a = Object.is(null == a ? void 0 : a.valueOf(), -0)
                  ? '-0'
                  : String(a)),
                e.isUnsafeProperty(a))
              )
                return s;
              const t = i[a];
              return void 0 === t ? s : t;
            }
          }
        };
      })(Ae)),
    Ae
  );
}
function Ze() {
  return He ? We : ((He = 1), (We = Ke().get));
}
const Xe = t(Ze());
var Qe,
  Je = {},
  tn = {};
function en() {
  return (
    Qe ||
      ((Qe = 1),
      (t = tn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.uniqBy = function (t, e) {
        const n = new Map();
        for (let r = 0; r < t.length; r++) {
          const o = t[r],
            i = e(o);
          n.has(i) || n.set(i, o);
        }
        return Array.from(n.values());
      })),
    tn
  );
  var t;
}
var nn,
  rn = {};
function on() {
  return (
    nn ||
      ((nn = 1),
      (t = rn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.identity = function (t) {
        return t;
      })),
    rn
  );
  var t;
}
var an,
  sn,
  un = {},
  ln = {},
  cn = {};
function fn() {
  return (
    an ||
      ((an = 1),
      (t = cn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isLength = function (t) {
        return Number.isSafeInteger(t) && t >= 0;
      })),
    cn
  );
  var t;
}
function hn() {
  return (
    sn ||
      ((sn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = fn();
        t.isArrayLike = function (t) {
          return null != t && 'function' != typeof t && e.isLength(t.length);
        };
      })(ln)),
    ln
  );
}
var pn,
  dn,
  gn = {};
function yn() {
  return (
    pn ||
      ((pn = 1),
      (t = gn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isObjectLike = function (t) {
        return 'object' == typeof t && null !== t;
      })),
    gn
  );
  var t;
}
function mn() {
  return (
    dn ||
      ((dn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = hn(),
          n = yn();
        t.isArrayLikeObject = function (t) {
          return n.isObjectLike(t) && e.isArrayLike(t);
        };
      })(un)),
    un
  );
}
var bn,
  vn = {},
  wn = {};
function _n() {
  return (
    bn ||
      ((bn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Ke();
        t.property = function (t) {
          return function (n) {
            return e.get(n, t);
          };
        };
      })(wn)),
    wn
  );
}
var xn,
  Mn = {},
  kn = {},
  Tn = {},
  Sn = {};
function On() {
  return (
    xn ||
      ((xn = 1),
      (t = Sn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isObject = function (t) {
        return null !== t && ('object' == typeof t || 'function' == typeof t);
      })),
    Sn
  );
  var t;
}
var jn,
  Nn = {};
function Pn() {
  return (
    jn ||
      ((jn = 1),
      (t = Nn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isPrimitive = function (t) {
        return null == t || ('object' != typeof t && 'function' != typeof t);
      })),
    Nn
  );
  var t;
}
var An,
  En,
  Cn,
  $n = {};
function Dn() {
  return (
    An ||
      ((An = 1),
      (t = $n),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.eq = function (t, e) {
        return t === e || (Number.isNaN(t) && Number.isNaN(e));
      })),
    $n
  );
  var t;
}
function Un() {
  return (
    En ||
      ((En = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = zn(),
          n = On(),
          r = Pn(),
          o = Dn();
        function i(t, e, u, l) {
          if (e === t) return !0;
          switch (typeof e) {
            case 'object':
              return (function (t, e, n, o) {
                if (null == e) return !0;
                if (Array.isArray(e)) return a(t, e, n, o);
                if (e instanceof Map)
                  return (function (t, e, n, r) {
                    if (0 === e.size) return !0;
                    if (!(t instanceof Map)) return !1;
                    for (const [o, i] of e.entries()) {
                      if (!1 === n(t.get(o), i, o, t, e, r)) return !1;
                    }
                    return !0;
                  })(t, e, n, o);
                if (e instanceof Set) return s(t, e, n, o);
                const i = Object.keys(e);
                if (null == t) return 0 === i.length;
                if (0 === i.length) return !0;
                if (o && o.has(e)) return o.get(e) === t;
                o && o.set(e, t);
                try {
                  for (let a = 0; a < i.length; a++) {
                    const s = i[a];
                    if (!r.isPrimitive(t) && !(s in t)) return !1;
                    if (void 0 === e[s] && void 0 !== t[s]) return !1;
                    if (null === e[s] && null !== t[s]) return !1;
                    if (!n(t[s], e[s], s, t, e, o)) return !1;
                  }
                  return !0;
                } finally {
                  o && o.delete(e);
                }
              })(t, e, u, l);
            case 'function':
              return Object.keys(e).length > 0
                ? i(t, { ...e }, u, l)
                : o.eq(t, e);
            default:
              return n.isObject(t)
                ? 'string' != typeof e || '' === e
                : o.eq(t, e);
          }
        }
        function a(t, e, n, r) {
          if (0 === e.length) return !0;
          if (!Array.isArray(t)) return !1;
          const o = new Set();
          for (let i = 0; i < e.length; i++) {
            const a = e[i];
            let s = !1;
            for (let u = 0; u < t.length; u++) {
              if (o.has(u)) continue;
              let l = !1;
              if ((n(t[u], a, i, t, e, r) && (l = !0), l)) {
                (o.add(u), (s = !0));
                break;
              }
            }
            if (!s) return !1;
          }
          return !0;
        }
        function s(t, e, n, r) {
          return 0 === e.size || (t instanceof Set && a([...t], [...e], n, r));
        }
        ((t.isMatchWith = function (t, n, r) {
          return 'function' != typeof r
            ? e.isMatch(t, n)
            : i(
                t,
                n,
                function t(e, n, o, a, s, u) {
                  const l = r(e, n, o, a, s, u);
                  return void 0 !== l ? Boolean(l) : i(e, n, t, u);
                },
                new Map()
              );
        }),
          (t.isSetMatch = s));
      })(Tn)),
    Tn
  );
}
function zn() {
  return (
    Cn ||
      ((Cn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Un();
        t.isMatch = function (t, n) {
          return e.isMatchWith(t, n, () => {});
        };
      })(kn)),
    kn
  );
}
var Fn,
  In = {},
  Ln = {},
  Rn = {};
function qn() {
  return (
    Fn ||
      ((Fn = 1),
      (t = Rn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.getSymbols = function (t) {
        return Object.getOwnPropertySymbols(t).filter((e) =>
          Object.prototype.propertyIsEnumerable.call(t, e)
        );
      })),
    Rn
  );
  var t;
}
var Wn,
  Hn = {};
function Bn() {
  return (
    Wn ||
      ((Wn = 1),
      (t = Hn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.getTag = function (t) {
        return null == t
          ? void 0 === t
            ? '[object Undefined]'
            : '[object Null]'
          : Object.prototype.toString.call(t);
      })),
    Hn
  );
  var t;
}
var Yn,
  Vn = {};
function Gn() {
  return (
    Yn ||
      ((Yn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        ((t.argumentsTag = '[object Arguments]'),
          (t.arrayBufferTag = '[object ArrayBuffer]'),
          (t.arrayTag = '[object Array]'),
          (t.bigInt64ArrayTag = '[object BigInt64Array]'),
          (t.bigUint64ArrayTag = '[object BigUint64Array]'),
          (t.booleanTag = '[object Boolean]'),
          (t.dataViewTag = '[object DataView]'),
          (t.dateTag = '[object Date]'),
          (t.errorTag = '[object Error]'),
          (t.float32ArrayTag = '[object Float32Array]'),
          (t.float64ArrayTag = '[object Float64Array]'),
          (t.functionTag = '[object Function]'),
          (t.int16ArrayTag = '[object Int16Array]'),
          (t.int32ArrayTag = '[object Int32Array]'),
          (t.int8ArrayTag = '[object Int8Array]'),
          (t.mapTag = '[object Map]'),
          (t.numberTag = '[object Number]'),
          (t.objectTag = '[object Object]'),
          (t.regexpTag = '[object RegExp]'),
          (t.setTag = '[object Set]'),
          (t.stringTag = '[object String]'),
          (t.symbolTag = '[object Symbol]'),
          (t.uint16ArrayTag = '[object Uint16Array]'),
          (t.uint32ArrayTag = '[object Uint32Array]'),
          (t.uint8ArrayTag = '[object Uint8Array]'),
          (t.uint8ClampedArrayTag = '[object Uint8ClampedArray]'));
      })(Vn)),
    Vn
  );
}
var Kn,
  Zn,
  Xn,
  Qn,
  Jn = {};
function tr() {
  return (
    Kn ||
      ((Kn = 1),
      (t = Jn),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isTypedArray = function (t) {
        return ArrayBuffer.isView(t) && !(t instanceof DataView);
      })),
    Jn
  );
  var t;
}
function er() {
  return (
    Zn ||
      ((Zn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = qn(),
          n = Bn(),
          r = Gn(),
          o = Pn(),
          i = tr();
        function a(t, e, u, l = new Map(), c = void 0) {
          const f = null == c ? void 0 : c(t, e, u, l);
          if (void 0 !== f) return f;
          if (o.isPrimitive(t)) return t;
          if (l.has(t)) return l.get(t);
          if (Array.isArray(t)) {
            const e = new Array(t.length);
            l.set(t, e);
            for (let n = 0; n < t.length; n++) e[n] = a(t[n], n, u, l, c);
            return (
              Object.hasOwn(t, 'index') && (e.index = t.index),
              Object.hasOwn(t, 'input') && (e.input = t.input),
              e
            );
          }
          if (t instanceof Date) return new Date(t.getTime());
          if (t instanceof RegExp) {
            const e = new RegExp(t.source, t.flags);
            return ((e.lastIndex = t.lastIndex), e);
          }
          if (t instanceof Map) {
            const e = new Map();
            l.set(t, e);
            for (const [n, r] of t) e.set(n, a(r, n, u, l, c));
            return e;
          }
          if (t instanceof Set) {
            const e = new Set();
            l.set(t, e);
            for (const n of t) e.add(a(n, void 0, u, l, c));
            return e;
          }
          if ('undefined' != typeof Buffer && Buffer.isBuffer(t))
            return t.subarray();
          if (i.isTypedArray(t)) {
            const e = new (Object.getPrototypeOf(t).constructor)(t.length);
            l.set(t, e);
            for (let n = 0; n < t.length; n++) e[n] = a(t[n], n, u, l, c);
            return e;
          }
          if (
            t instanceof ArrayBuffer ||
            ('undefined' != typeof SharedArrayBuffer &&
              t instanceof SharedArrayBuffer)
          )
            return t.slice(0);
          if (t instanceof DataView) {
            const e = new DataView(
              t.buffer.slice(0),
              t.byteOffset,
              t.byteLength
            );
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          if ('undefined' != typeof File && t instanceof File) {
            const e = new File([t], t.name, { type: t.type });
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          if ('undefined' != typeof Blob && t instanceof Blob) {
            const e = new Blob([t], { type: t.type });
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          if (t instanceof Error) {
            const e = new t.constructor();
            return (
              l.set(t, e),
              (e.message = t.message),
              (e.name = t.name),
              (e.stack = t.stack),
              (e.cause = t.cause),
              s(e, t, u, l, c),
              e
            );
          }
          if (t instanceof Boolean) {
            const e = new Boolean(t.valueOf());
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          if (t instanceof Number) {
            const e = new Number(t.valueOf());
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          if (t instanceof String) {
            const e = new String(t.valueOf());
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          if (
            'object' == typeof t &&
            (function (t) {
              switch (n.getTag(t)) {
                case r.argumentsTag:
                case r.arrayTag:
                case r.arrayBufferTag:
                case r.dataViewTag:
                case r.booleanTag:
                case r.dateTag:
                case r.float32ArrayTag:
                case r.float64ArrayTag:
                case r.int8ArrayTag:
                case r.int16ArrayTag:
                case r.int32ArrayTag:
                case r.mapTag:
                case r.numberTag:
                case r.objectTag:
                case r.regexpTag:
                case r.setTag:
                case r.stringTag:
                case r.symbolTag:
                case r.uint8ArrayTag:
                case r.uint8ClampedArrayTag:
                case r.uint16ArrayTag:
                case r.uint32ArrayTag:
                  return !0;
                default:
                  return !1;
              }
            })(t)
          ) {
            const e = Object.create(Object.getPrototypeOf(t));
            return (l.set(t, e), s(e, t, u, l, c), e);
          }
          return t;
        }
        function s(t, n, r = t, o, i) {
          const s = [...Object.keys(n), ...e.getSymbols(n)];
          for (let e = 0; e < s.length; e++) {
            const u = s[e],
              l = Object.getOwnPropertyDescriptor(t, u);
            (null == l || l.writable) && (t[u] = a(n[u], u, r, o, i));
          }
        }
        ((t.cloneDeepWith = function (t, e) {
          return a(t, void 0, t, new Map(), e);
        }),
          (t.cloneDeepWithImpl = a),
          (t.copyProperties = s));
      })(Ln)),
    Ln
  );
}
function nr() {
  return (
    Xn ||
      ((Xn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = er();
        t.cloneDeep = function (t) {
          return e.cloneDeepWithImpl(t, void 0, t, new Map(), void 0);
        };
      })(In)),
    In
  );
}
function rr() {
  return (
    Qn ||
      ((Qn = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = zn(),
          n = nr();
        t.matches = function (t) {
          return ((t = n.cloneDeep(t)), (n) => e.isMatch(n, t));
        };
      })(Mn)),
    Mn
  );
}
var or,
  ir,
  ar = {},
  sr = {},
  ur = {};
function lr() {
  return (
    or ||
      ((or = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = er(),
          n = Gn();
        t.cloneDeepWith = function (t, r) {
          return e.cloneDeepWith(t, (o, i, a, s) => {
            const u = null == r ? void 0 : r(o, i, a, s);
            if (void 0 !== u) return u;
            if ('object' == typeof t)
              switch (Object.prototype.toString.call(t)) {
                case n.numberTag:
                case n.stringTag:
                case n.booleanTag: {
                  const n = new t.constructor(null == t ? void 0 : t.valueOf());
                  return (e.copyProperties(n, t), n);
                }
                case n.argumentsTag: {
                  const n = {};
                  return (
                    e.copyProperties(n, t),
                    (n.length = t.length),
                    (n[Symbol.iterator] = t[Symbol.iterator]),
                    n
                  );
                }
                default:
                  return;
              }
          });
        };
      })(ur)),
    ur
  );
}
function cr() {
  return (
    ir ||
      ((ir = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = lr();
        t.cloneDeep = function (t) {
          return e.cloneDeepWith(t);
        };
      })(sr)),
    sr
  );
}
var fr,
  hr = {},
  pr = {};
function dr() {
  return (
    fr ||
      ((fr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = /^(?:0|[1-9]\d*)$/;
        t.isIndex = function (t, n = Number.MAX_SAFE_INTEGER) {
          switch (typeof t) {
            case 'number':
              return Number.isInteger(t) && t >= 0 && t < n;
            case 'symbol':
              return !1;
            case 'string':
              return e.test(t);
          }
        };
      })(pr)),
    pr
  );
}
var gr,
  yr,
  mr,
  br,
  vr,
  wr,
  _r,
  xr = {};
function Mr() {
  return (
    gr ||
      ((gr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Bn();
        t.isArguments = function (t) {
          return (
            null !== t &&
            'object' == typeof t &&
            '[object Arguments]' === e.getTag(t)
          );
        };
      })(xr)),
    xr
  );
}
function kr() {
  return (
    yr ||
      ((yr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Ue(),
          n = dr(),
          r = Mr(),
          o = Ge();
        t.has = function (t, i) {
          let a;
          if (
            ((a = Array.isArray(i)
              ? i
              : 'string' == typeof i &&
                  e.isDeepKey(i) &&
                  null == (null == t ? void 0 : t[i])
                ? o.toPath(i)
                : [i]),
            0 === a.length)
          )
            return !1;
          let s = t;
          for (let e = 0; e < a.length; e++) {
            const t = a[e];
            if (null == s || !Object.hasOwn(s, t)) {
              if (
                !(
                  (Array.isArray(s) || r.isArguments(s)) &&
                  n.isIndex(t) &&
                  t < s.length
                )
              )
                return !1;
            }
            s = s[t];
          }
          return !0;
        };
      })(hr)),
    hr
  );
}
function Tr() {
  return (
    mr ||
      ((mr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = zn(),
          n = Ie(),
          r = cr(),
          o = Ke(),
          i = kr();
        t.matchesProperty = function (t, a) {
          switch (typeof t) {
            case 'object':
              Object.is(null == t ? void 0 : t.valueOf(), -0) && (t = '-0');
              break;
            case 'number':
              t = n.toKey(t);
          }
          return (
            (a = r.cloneDeep(a)),
            function (n) {
              const r = o.get(n, t);
              return void 0 === r
                ? i.has(n, t)
                : void 0 === a
                  ? void 0 === r
                  : e.isMatch(r, a);
            }
          );
        };
      })(ar)),
    ar
  );
}
function Sr() {
  return (
    br ||
      ((br = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = on(),
          n = _n(),
          r = rr(),
          o = Tr();
        t.iteratee = function (t) {
          if (null == t) return e.identity;
          switch (typeof t) {
            case 'function':
              return t;
            case 'object':
              return Array.isArray(t) && 2 === t.length
                ? o.matchesProperty(t[0], t[1])
                : r.matches(t);
            case 'string':
            case 'symbol':
            case 'number':
              return n.property(t);
          }
        };
      })(vn)),
    vn
  );
}
function Or() {
  return _r
    ? wr
    : ((_r = 1),
      (wr = (vr ||
        ((vr = 1),
        (function (t) {
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
          const e = en(),
            n = on(),
            r = mn(),
            o = Sr();
          t.uniqBy = function (t, i = n.identity) {
            return r.isArrayLikeObject(t)
              ? e.uniqBy(Array.from(t), o.iteratee(i))
              : [];
          };
        })(Je)),
      Je).uniqBy));
}
const jr = t(Or());
var Nr = (t) => (Array.isArray(t) ? t : [t]);
function Pr(t) {
  const e = Array.isArray(t[0]) ? t[0] : t;
  return (
    (function (
      t,
      e = 'expected all items to be functions, instead received the following types: '
    ) {
      if (!t.every((t) => 'function' == typeof t)) {
        const n = t
          .map((t) =>
            'function' == typeof t
              ? `function ${t.name || 'unnamed'}()`
              : typeof t
          )
          .join(', ');
        throw new TypeError(`${e}[${n}]`);
      }
    })(
      e,
      'createSelector expects all input-selectors to be functions, but received the following types: '
    ),
    e
  );
}
var Ar =
  'undefined' != typeof WeakRef
    ? WeakRef
    : class {
        constructor(t) {
          this.value = t;
        }
        deref() {
          return this.value;
        }
      };
function Er() {
  return { s: 0, v: void 0, o: null, p: null };
}
function Cr(t, e = {}) {
  let n = { s: 0, v: void 0, o: null, p: null };
  const { resultEqualityCheck: r } = e;
  let o,
    i = 0;
  function a() {
    var e, a;
    let s = n;
    const { length: u } = arguments;
    for (let t = 0, n = u; t < n; t++) {
      const e = arguments[t];
      if ('function' == typeof e || ('object' == typeof e && null !== e)) {
        let t = s.o;
        null === t && (s.o = t = new WeakMap());
        const n = t.get(e);
        void 0 === n ? ((s = Er()), t.set(e, s)) : (s = n);
      } else {
        let t = s.p;
        null === t && (s.p = t = new Map());
        const n = t.get(e);
        void 0 === n ? ((s = Er()), t.set(e, s)) : (s = n);
      }
    }
    const l = s;
    let c;
    if (1 === s.s) c = s.v;
    else if (((c = t.apply(null, arguments)), i++, r)) {
      const t =
        null !=
        (a = null == (e = null == o ? void 0 : o.deref) ? void 0 : e.call(o))
          ? a
          : o;
      null != t && r(t, c) && ((c = t), 0 !== i && i--);
      o =
        ('object' == typeof c && null !== c) || 'function' == typeof c
          ? new Ar(c)
          : c;
    }
    return ((l.s = 1), (l.v = c), c);
  }
  return (
    (a.clearCache = () => {
      ((n = { s: 0, v: void 0, o: null, p: null }), a.resetResultsCount());
    }),
    (a.resultsCount = () => i),
    (a.resetResultsCount = () => {
      i = 0;
    }),
    a
  );
}
function $r(t, ...e) {
  const n = 'function' == typeof t ? { memoize: t, memoizeOptions: e } : t,
    r = (...t) => {
      let e,
        r = 0,
        o = 0,
        i = {},
        a = t.pop();
      ('object' == typeof a && ((i = a), (a = t.pop())),
        (function (t, e = 'expected a function, instead received ' + typeof t) {
          if ('function' != typeof t) throw new TypeError(e);
        })(
          a,
          `createSelector expects an output function after the inputs, but received: [${typeof a}]`
        ));
      const s = { ...n, ...i },
        {
          memoize: u,
          memoizeOptions: l = [],
          argsMemoize: c = Cr,
          argsMemoizeOptions: f = [],
        } = s,
        h = Nr(l),
        p = Nr(f),
        d = Pr(t),
        g = u(
          function () {
            return (r++, a.apply(null, arguments));
          },
          ...h
        ),
        y = c(
          function () {
            o++;
            const t = (function (t, e) {
              const n = [],
                { length: r } = t;
              for (let o = 0; o < r; o++) n.push(t[o].apply(null, e));
              return n;
            })(d, arguments);
            return ((e = g.apply(null, t)), e);
          },
          ...p
        );
      return Object.assign(y, {
        resultFunc: a,
        memoizedResultFunc: g,
        dependencies: d,
        dependencyRecomputations: () => o,
        resetDependencyRecomputations: () => {
          o = 0;
        },
        lastResult: () => e,
        recomputations: () => r,
        resetRecomputations: () => {
          r = 0;
        },
        memoize: u,
        argsMemoize: c,
      });
    };
  return (Object.assign(r, { withTypes: () => r }), r);
}
var Dr,
  Ur = $r(Cr),
  zr = Object.assign(
    (t, e = Ur) => {
      !(function (t, e = 'expected an object, instead received ' + typeof t) {
        if ('object' != typeof t) throw new TypeError(e);
      })(
        t,
        'createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ' +
          typeof t
      );
      const n = Object.keys(t);
      return e(
        n.map((e) => t[e]),
        (...t) => t.reduce((t, e, r) => ((t[n[r]] = e), t), {})
      );
    },
    { withTypes: () => zr }
  ),
  Fr = {},
  Ir = {},
  Lr = {};
function Rr() {
  return (
    Dr ||
      ((Dr = 1),
      (function (t) {
        function e(t) {
          return 'symbol' == typeof t
            ? 1
            : null === t
              ? 2
              : void 0 === t
                ? 3
                : t != t
                  ? 4
                  : 0;
        }
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        t.compareValues = (t, n, r) => {
          if (t !== n) {
            const o = e(t),
              i = e(n);
            if (o === i && 0 === o) {
              if (t < n) return 'desc' === r ? 1 : -1;
              if (t > n) return 'desc' === r ? -1 : 1;
            }
            return 'desc' === r ? i - o : o - i;
          }
          return 0;
        };
      })(Lr)),
    Lr
  );
}
var qr,
  Wr,
  Hr,
  Br = {},
  Yr = {};
function Vr() {
  return (
    qr ||
      ((qr = 1),
      (t = Yr),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.isSymbol = function (t) {
        return 'symbol' == typeof t || t instanceof Symbol;
      })),
    Yr
  );
  var t;
}
function Gr() {
  return (
    Wr ||
      ((Wr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Vr(),
          n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          r = /^\w*$/;
        t.isKey = function (t, o) {
          return (
            !Array.isArray(t) &&
            (!(
              'number' != typeof t &&
              'boolean' != typeof t &&
              null != t &&
              !e.isSymbol(t)
            ) ||
              ('string' == typeof t && (r.test(t) || !n.test(t))) ||
              (null != o && Object.hasOwn(o, t)))
          );
        };
      })(Br)),
    Br
  );
}
function Kr() {
  return (
    Hr ||
      ((Hr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Rr(),
          n = Gr(),
          r = Ge();
        t.orderBy = function (t, o, i, a) {
          if (null == t) return [];
          ((i = a ? void 0 : i),
            Array.isArray(t) || (t = Object.values(t)),
            Array.isArray(o) || (o = null == o ? [null] : [o]),
            0 === o.length && (o = [null]),
            Array.isArray(i) || (i = null == i ? [] : [i]),
            (i = i.map((t) => String(t))));
          const s = (t, e) => {
              let n = t;
              for (let r = 0; r < e.length && null != n; ++r) n = n[e[r]];
              return n;
            },
            u = o.map(
              (t) => (
                Array.isArray(t) && 1 === t.length && (t = t[0]),
                null == t ||
                'function' == typeof t ||
                Array.isArray(t) ||
                n.isKey(t)
                  ? t
                  : { key: t, path: r.toPath(t) }
              )
            );
          return t
            .map((t) => ({
              original: t,
              criteria: u.map((e) =>
                ((t, e) =>
                  null == e || null == t
                    ? e
                    : 'object' == typeof t && 'key' in t
                      ? Object.hasOwn(e, t.key)
                        ? e[t.key]
                        : s(e, t.path)
                      : 'function' == typeof t
                        ? t(e)
                        : Array.isArray(t)
                          ? s(e, t)
                          : 'object' == typeof e
                            ? e[t]
                            : e)(e, t)
              ),
            }))
            .slice()
            .sort((t, n) => {
              for (let r = 0; r < u.length; r++) {
                const o = e.compareValues(t.criteria[r], n.criteria[r], i[r]);
                if (0 !== o) return o;
              }
              return 0;
            })
            .map((t) => t.original);
        };
      })(Ir)),
    Ir
  );
}
var Zr,
  Xr = {};
function Qr() {
  return (
    Zr ||
      ((Zr = 1),
      (t = Xr),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.flatten = function (t, e = 1) {
        const n = [],
          r = Math.floor(e),
          o = (t, e) => {
            for (let i = 0; i < t.length; i++) {
              const a = t[i];
              Array.isArray(a) && e < r ? o(a, e + 1) : n.push(a);
            }
          };
        return (o(t, 0), n);
      })),
    Xr
  );
  var t;
}
var Jr,
  to,
  eo,
  no,
  ro = {};
function oo() {
  return (
    Jr ||
      ((Jr = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = dr(),
          n = hn(),
          r = On(),
          o = Dn();
        t.isIterateeCall = function (t, i, a) {
          return (
            !!r.isObject(a) &&
            !!(
              ('number' == typeof i &&
                n.isArrayLike(a) &&
                e.isIndex(i) &&
                i < a.length) ||
              ('string' == typeof i && i in a)
            ) &&
            o.eq(a[i], t)
          );
        };
      })(ro)),
    ro
  );
}
function io() {
  return no
    ? eo
    : ((no = 1),
      (eo = (to ||
        ((to = 1),
        (function (t) {
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
          const e = Kr(),
            n = Qr(),
            r = oo();
          t.sortBy = function (t, ...o) {
            const i = o.length;
            return (
              i > 1 && r.isIterateeCall(t, o[0], o[1])
                ? (o = [])
                : i > 2 && r.isIterateeCall(o[0], o[1], o[2]) && (o = [o[0]]),
              e.orderBy(t, n.flatten(o), ['asc'])
            );
          };
        })(Fr)),
      Fr).sortBy));
}
const ao = t(io());
function so(t) {
  return `Minified Redux error #${t}; visit https://redux.js.org/Errors?code=${t} for the full message or use the non-minified dev environment for full errors. `;
}
var uo = (() =>
    ('function' == typeof Symbol && Symbol.observable) || '@@observable')(),
  lo = () => Math.random().toString(36).substring(7).split('').join('.'),
  co = {
    INIT: `@@redux/INIT${lo()}`,
    REPLACE: `@@redux/REPLACE${lo()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${lo()}`,
  };
function fo(t) {
  if ('object' != typeof t || null === t) return !1;
  let e = t;
  for (; null !== Object.getPrototypeOf(e); ) e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e || null === Object.getPrototypeOf(t);
}
function ho(t, e, n) {
  if ('function' != typeof t) throw new Error(so(2));
  if (
    ('function' == typeof e && 'function' == typeof n) ||
    ('function' == typeof n && 'function' == typeof arguments[3])
  )
    throw new Error(so(0));
  if (
    ('function' == typeof e && void 0 === n && ((n = e), (e = void 0)),
    void 0 !== n)
  ) {
    if ('function' != typeof n) throw new Error(so(1));
    return n(ho)(t, e);
  }
  let r = t,
    o = e,
    i = new Map(),
    a = i,
    s = 0,
    u = !1;
  function l() {
    a === i &&
      ((a = new Map()),
      i.forEach((t, e) => {
        a.set(e, t);
      }));
  }
  function c() {
    if (u) throw new Error(so(3));
    return o;
  }
  function f(t) {
    if ('function' != typeof t) throw new Error(so(4));
    if (u) throw new Error(so(5));
    let e = !0;
    l();
    const n = s++;
    return (
      a.set(n, t),
      function () {
        if (e) {
          if (u) throw new Error(so(6));
          ((e = !1), l(), a.delete(n), (i = null));
        }
      }
    );
  }
  function h(t) {
    if (!fo(t)) throw new Error(so(7));
    if (void 0 === t.type) throw new Error(so(8));
    if ('string' != typeof t.type) throw new Error(so(17));
    if (u) throw new Error(so(9));
    try {
      ((u = !0), (o = r(o, t)));
    } finally {
      u = !1;
    }
    return (
      (i = a).forEach((t) => {
        t();
      }),
      t
    );
  }
  h({ type: co.INIT });
  return {
    dispatch: h,
    subscribe: f,
    getState: c,
    replaceReducer: function (t) {
      if ('function' != typeof t) throw new Error(so(10));
      ((r = t), h({ type: co.REPLACE }));
    },
    [uo]: function () {
      const t = f;
      return {
        subscribe(e) {
          if ('object' != typeof e || null === e) throw new Error(so(11));
          function n() {
            const t = e;
            t.next && t.next(c());
          }
          n();
          return { unsubscribe: t(n) };
        },
        [uo]() {
          return this;
        },
      };
    },
  };
}
function po(t) {
  const e = Object.keys(t),
    n = {};
  for (let a = 0; a < e.length; a++) {
    const r = e[a];
    'function' == typeof t[r] && (n[r] = t[r]);
  }
  const r = Object.keys(n);
  let o;
  try {
    !(function (t) {
      Object.keys(t).forEach((e) => {
        const n = t[e];
        if (void 0 === n(void 0, { type: co.INIT })) throw new Error(so(12));
        if (void 0 === n(void 0, { type: co.PROBE_UNKNOWN_ACTION() }))
          throw new Error(so(13));
      });
    })(n);
  } catch (i) {
    o = i;
  }
  return function (t = {}, e) {
    if (o) throw o;
    let i = !1;
    const a = {};
    for (let o = 0; o < r.length; o++) {
      const s = r[o],
        u = n[s],
        l = t[s],
        c = u(l, e);
      if (void 0 === c) throw (e && e.type, new Error(so(14)));
      ((a[s] = c), (i = i || c !== l));
    }
    return ((i = i || r.length !== Object.keys(t).length), i ? a : t);
  };
}
function go(...t) {
  return 0 === t.length
    ? (t) => t
    : 1 === t.length
      ? t[0]
      : t.reduce(
          (t, e) =>
            (...n) =>
              t(e(...n))
        );
}
function yo(...t) {
  return (e) => (n, r) => {
    const o = e(n, r);
    let i = () => {
      throw new Error(so(15));
    };
    const a = { getState: o.getState, dispatch: (t, ...e) => i(t, ...e) },
      s = t.map((t) => t(a));
    return ((i = go(...s)(o.dispatch)), { ...o, dispatch: i });
  };
}
function mo(t) {
  return fo(t) && 'type' in t && 'string' == typeof t.type;
}
var bo = Symbol.for('immer-nothing'),
  vo = Symbol.for('immer-draftable'),
  wo = Symbol.for('immer-state');
function _o(t, ...e) {
  throw new Error(
    `[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var xo = Object.getPrototypeOf;
function Mo(t) {
  return !!t && !!t[wo];
}
function ko(t) {
  var e;
  return (
    !!t &&
    (So(t) ||
      Array.isArray(t) ||
      !!t[vo] ||
      !!(null == (e = t.constructor) ? void 0 : e[vo]) ||
      Ao(t) ||
      Eo(t))
  );
}
var To = Object.prototype.constructor.toString();
function So(t) {
  if (!t || 'object' != typeof t) return !1;
  const e = xo(t);
  if (null === e) return !0;
  const n = Object.hasOwnProperty.call(e, 'constructor') && e.constructor;
  return (
    n === Object || ('function' == typeof n && Function.toString.call(n) === To)
  );
}
function Oo(t, e) {
  0 === jo(t)
    ? Reflect.ownKeys(t).forEach((n) => {
        e(n, t[n], t);
      })
    : t.forEach((n, r) => e(r, n, t));
}
function jo(t) {
  const e = t[wo];
  return e ? e.type_ : Array.isArray(t) ? 1 : Ao(t) ? 2 : Eo(t) ? 3 : 0;
}
function No(t, e) {
  return 2 === jo(t) ? t.has(e) : Object.prototype.hasOwnProperty.call(t, e);
}
function Po(t, e, n) {
  const r = jo(t);
  2 === r ? t.set(e, n) : 3 === r ? t.add(n) : (t[e] = n);
}
function Ao(t) {
  return t instanceof Map;
}
function Eo(t) {
  return t instanceof Set;
}
function Co(t) {
  return t.copy_ || t.base_;
}
function $o(t, e) {
  if (Ao(t)) return new Map(t);
  if (Eo(t)) return new Set(t);
  if (Array.isArray(t)) return Array.prototype.slice.call(t);
  const n = So(t);
  if (!0 === e || ('class_only' === e && !n)) {
    const e = Object.getOwnPropertyDescriptors(t);
    delete e[wo];
    let n = Reflect.ownKeys(e);
    for (let r = 0; r < n.length; r++) {
      const o = n[r],
        i = e[o];
      (!1 === i.writable && ((i.writable = !0), (i.configurable = !0)),
        (i.get || i.set) &&
          (e[o] = {
            configurable: !0,
            writable: !0,
            enumerable: i.enumerable,
            value: t[o],
          }));
    }
    return Object.create(xo(t), e);
  }
  {
    const e = xo(t);
    if (null !== e && n) return { ...t };
    const r = Object.create(e);
    return Object.assign(r, t);
  }
}
function Do(t, e = !1) {
  return (
    zo(t) ||
      Mo(t) ||
      !ko(t) ||
      (jo(t) > 1 &&
        Object.defineProperties(t, {
          set: { value: Uo },
          add: { value: Uo },
          clear: { value: Uo },
          delete: { value: Uo },
        }),
      Object.freeze(t),
      e && Object.values(t).forEach((t) => Do(t, !0))),
    t
  );
}
function Uo() {
  _o(2);
}
function zo(t) {
  return Object.isFrozen(t);
}
var Fo,
  Io = {};
function Lo(t) {
  const e = Io[t];
  return (e || _o(0), e);
}
function Ro() {
  return Fo;
}
function qo(t, e) {
  e &&
    (Lo('Patches'),
    (t.patches_ = []),
    (t.inversePatches_ = []),
    (t.patchListener_ = e));
}
function Wo(t) {
  (Ho(t), t.drafts_.forEach(Yo), (t.drafts_ = null));
}
function Ho(t) {
  t === Fo && (Fo = t.parent_);
}
function Bo(t) {
  return (Fo = {
    drafts_: [],
    parent_: Fo,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  });
}
function Yo(t) {
  const e = t[wo];
  0 === e.type_ || 1 === e.type_ ? e.revoke_() : (e.revoked_ = !0);
}
function Vo(t, e) {
  e.unfinalizedDrafts_ = e.drafts_.length;
  const n = e.drafts_[0];
  return (
    void 0 !== t && t !== n
      ? (n[wo].modified_ && (Wo(e), _o(4)),
        ko(t) && ((t = Go(e, t)), e.parent_ || Zo(e, t)),
        e.patches_ &&
          Lo('Patches').generateReplacementPatches_(
            n[wo].base_,
            t,
            e.patches_,
            e.inversePatches_
          ))
      : (t = Go(e, n, [])),
    Wo(e),
    e.patches_ && e.patchListener_(e.patches_, e.inversePatches_),
    t !== bo ? t : void 0
  );
}
function Go(t, e, n) {
  if (zo(e)) return e;
  const r = e[wo];
  if (!r) return (Oo(e, (o, i) => Ko(t, r, e, o, i, n)), e);
  if (r.scope_ !== t) return e;
  if (!r.modified_) return (Zo(t, r.base_, !0), r.base_);
  if (!r.finalized_) {
    ((r.finalized_ = !0), r.scope_.unfinalizedDrafts_--);
    const e = r.copy_;
    let o = e,
      i = !1;
    (3 === r.type_ && ((o = new Set(e)), e.clear(), (i = !0)),
      Oo(o, (o, a) => Ko(t, r, e, o, a, n, i)),
      Zo(t, e, !1),
      n &&
        t.patches_ &&
        Lo('Patches').generatePatches_(r, n, t.patches_, t.inversePatches_));
  }
  return r.copy_;
}
function Ko(t, e, n, r, o, i, a) {
  if (Mo(o)) {
    const a = Go(
      t,
      o,
      i && e && 3 !== e.type_ && !No(e.assigned_, r) ? i.concat(r) : void 0
    );
    if ((Po(n, r, a), !Mo(a))) return;
    t.canAutoFreeze_ = !1;
  } else a && n.add(o);
  if (ko(o) && !zo(o)) {
    if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1) return;
    (Go(t, o),
      (e && e.scope_.parent_) ||
        'symbol' == typeof r ||
        !(Ao(n)
          ? n.has(r)
          : Object.prototype.propertyIsEnumerable.call(n, r)) ||
        Zo(t, o));
  }
}
function Zo(t, e, n = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && Do(e, n);
}
var Xo = {
    get(t, e) {
      if (e === wo) return t;
      const n = Co(t);
      if (!No(n, e))
        return (function (t, e, n) {
          var r;
          const o = ti(e, n);
          return o
            ? 'value' in o
              ? o.value
              : null == (r = o.get)
                ? void 0
                : r.call(t.draft_)
            : void 0;
        })(t, n, e);
      const r = n[e];
      return t.finalized_ || !ko(r)
        ? r
        : r === Jo(t.base_, e)
          ? (ni(t), (t.copy_[e] = ri(r, t)))
          : r;
    },
    has: (t, e) => e in Co(t),
    ownKeys: (t) => Reflect.ownKeys(Co(t)),
    set(t, e, n) {
      const r = ti(Co(t), e);
      if (null == r ? void 0 : r.set) return (r.set.call(t.draft_, n), !0);
      if (!t.modified_) {
        const r = Jo(Co(t), e),
          a = null == r ? void 0 : r[wo];
        if (a && a.base_ === n)
          return ((t.copy_[e] = n), (t.assigned_[e] = !1), !0);
        if (
          ((o = n) === (i = r)
            ? 0 !== o || 1 / o == 1 / i
            : o != o && i != i) &&
          (void 0 !== n || No(t.base_, e))
        )
          return !0;
        (ni(t), ei(t));
      }
      var o, i;
      return (
        (t.copy_[e] === n && (void 0 !== n || e in t.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(t.copy_[e])) ||
          ((t.copy_[e] = n), (t.assigned_[e] = !0)),
        !0
      );
    },
    deleteProperty: (t, e) => (
      void 0 !== Jo(t.base_, e) || e in t.base_
        ? ((t.assigned_[e] = !1), ni(t), ei(t))
        : delete t.assigned_[e],
      t.copy_ && delete t.copy_[e],
      !0
    ),
    getOwnPropertyDescriptor(t, e) {
      const n = Co(t),
        r = Reflect.getOwnPropertyDescriptor(n, e);
      return r
        ? {
            writable: !0,
            configurable: 1 !== t.type_ || 'length' !== e,
            enumerable: r.enumerable,
            value: n[e],
          }
        : r;
    },
    defineProperty() {
      _o(11);
    },
    getPrototypeOf: (t) => xo(t.base_),
    setPrototypeOf() {
      _o(12);
    },
  },
  Qo = {};
function Jo(t, e) {
  const n = t[wo];
  return (n ? Co(n) : t)[e];
}
function ti(t, e) {
  if (!(e in t)) return;
  let n = xo(t);
  for (; n; ) {
    const t = Object.getOwnPropertyDescriptor(n, e);
    if (t) return t;
    n = xo(n);
  }
}
function ei(t) {
  t.modified_ || ((t.modified_ = !0), t.parent_ && ei(t.parent_));
}
function ni(t) {
  t.copy_ || (t.copy_ = $o(t.base_, t.scope_.immer_.useStrictShallowCopy_));
}
(Oo(Xo, (t, e) => {
  Qo[t] = function () {
    return ((arguments[0] = arguments[0][0]), e.apply(this, arguments));
  };
}),
  (Qo.deleteProperty = function (t, e) {
    return Qo.set.call(this, t, e, void 0);
  }),
  (Qo.set = function (t, e, n) {
    return Xo.set.call(this, t[0], e, n, t[0]);
  }));
function ri(t, e) {
  const n = Ao(t)
    ? Lo('MapSet').proxyMap_(t, e)
    : Eo(t)
      ? Lo('MapSet').proxySet_(t, e)
      : (function (t, e) {
          const n = Array.isArray(t),
            r = {
              type_: n ? 1 : 0,
              scope_: e ? e.scope_ : Ro(),
              modified_: !1,
              finalized_: !1,
              assigned_: {},
              parent_: e,
              base_: t,
              draft_: null,
              copy_: null,
              revoke_: null,
              isManual_: !1,
            };
          let o = r,
            i = Xo;
          n && ((o = [r]), (i = Qo));
          const { revoke: a, proxy: s } = Proxy.revocable(o, i);
          return ((r.draft_ = s), (r.revoke_ = a), s);
        })(t, e);
  return ((e ? e.scope_ : Ro()).drafts_.push(n), n);
}
function oi(t) {
  return (Mo(t) || _o(10), ii(t));
}
function ii(t) {
  if (!ko(t) || zo(t)) return t;
  const e = t[wo];
  let n;
  if (e) {
    if (!e.modified_) return e.base_;
    ((e.finalized_ = !0), (n = $o(t, e.scope_.immer_.useStrictShallowCopy_)));
  } else n = $o(t, !0);
  return (
    Oo(n, (t, e) => {
      Po(n, t, ii(e));
    }),
    e && (e.finalized_ = !1),
    n
  );
}
var ai = new (class {
  constructor(t) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, e, n) => {
        if ('function' == typeof t && 'function' != typeof e) {
          const n = e;
          e = t;
          const r = this;
          return function (t = n, ...o) {
            return r.produce(t, (t) => e.call(this, t, ...o));
          };
        }
        let r;
        if (
          ('function' != typeof e && _o(6),
          void 0 !== n && 'function' != typeof n && _o(7),
          ko(t))
        ) {
          const o = Bo(this),
            i = ri(t, void 0);
          let a = !0;
          try {
            ((r = e(i)), (a = !1));
          } finally {
            a ? Wo(o) : Ho(o);
          }
          return (qo(o, n), Vo(r, o));
        }
        if (!t || 'object' != typeof t) {
          if (
            ((r = e(t)),
            void 0 === r && (r = t),
            r === bo && (r = void 0),
            this.autoFreeze_ && Do(r, !0),
            n)
          ) {
            const e = [],
              o = [];
            (Lo('Patches').generateReplacementPatches_(t, r, e, o), n(e, o));
          }
          return r;
        }
        _o(1);
      }),
      (this.produceWithPatches = (t, e) => {
        if ('function' == typeof t)
          return (e, ...n) => this.produceWithPatches(e, (e) => t(e, ...n));
        let n, r;
        return [
          this.produce(t, e, (t, e) => {
            ((n = t), (r = e));
          }),
          n,
          r,
        ];
      }),
      'boolean' == typeof (null == t ? void 0 : t.autoFreeze) &&
        this.setAutoFreeze(t.autoFreeze),
      'boolean' == typeof (null == t ? void 0 : t.useStrictShallowCopy) &&
        this.setUseStrictShallowCopy(t.useStrictShallowCopy));
  }
  createDraft(t) {
    (ko(t) || _o(8), Mo(t) && (t = oi(t)));
    const e = Bo(this),
      n = ri(t, void 0);
    return ((n[wo].isManual_ = !0), Ho(e), n);
  }
  finishDraft(t, e) {
    const n = t && t[wo];
    (n && n.isManual_) || _o(9);
    const { scope_: r } = n;
    return (qo(r, e), Vo(void 0, r));
  }
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  applyPatches(t, e) {
    let n;
    for (n = e.length - 1; n >= 0; n--) {
      const r = e[n];
      if (0 === r.path.length && 'replace' === r.op) {
        t = r.value;
        break;
      }
    }
    n > -1 && (e = e.slice(n + 1));
    const r = Lo('Patches').applyPatches_;
    return Mo(t) ? r(t, e) : this.produce(t, (t) => r(t, e));
  }
})().produce;
function si(t) {
  return t;
}
function ui(t) {
  return ({ dispatch: e, getState: n }) =>
    (r) =>
    (o) =>
      'function' == typeof o ? o(e, n, t) : r(o);
}
var li,
  ci,
  fi,
  hi,
  pi,
  di = ui(),
  gi = ui,
  yi = {},
  mi = {},
  bi = {};
function vi() {
  return (
    li ||
      ((li = 1),
      (t = bi),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.debounce = function (t, e, { signal: n, edges: r } = {}) {
        let o,
          i = null;
        const a = null != r && r.includes('leading'),
          s = null == r || r.includes('trailing'),
          u = () => {
            null !== i && (t.apply(o, i), (o = void 0), (i = null));
          };
        let l = null;
        const c = () => {
            (null != l && clearTimeout(l),
              (l = setTimeout(() => {
                ((l = null), s && u(), f());
              }, e)));
          },
          f = () => {
            (null !== l && (clearTimeout(l), (l = null)),
              (o = void 0),
              (i = null));
          },
          h = function (...t) {
            if (null == n ? void 0 : n.aborted) return;
            ((o = this), (i = t));
            const e = null == l;
            (c(), a && e && u());
          };
        return (
          (h.schedule = c),
          (h.cancel = f),
          (h.flush = () => {
            u();
          }),
          null == n || n.addEventListener('abort', f, { once: !0 }),
          h
        );
      })),
    bi
  );
  var t;
}
function wi() {
  return (
    ci ||
      ((ci = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = vi();
        t.debounce = function (t, n = 0, r = {}) {
          'object' != typeof r && (r = {});
          const { leading: o = !1, trailing: i = !0, maxWait: a } = r,
            s = Array(2);
          let u;
          (o && (s[0] = 'leading'), i && (s[1] = 'trailing'));
          let l = null;
          const c = e.debounce(
              function (...e) {
                ((u = t.apply(this, e)), (l = null));
              },
              n,
              { edges: s }
            ),
            f = function (...e) {
              return null != a &&
                (null === l && (l = Date.now()), Date.now() - l >= a)
                ? ((u = t.apply(this, e)),
                  (l = Date.now()),
                  c.cancel(),
                  c.schedule(),
                  u)
                : (c.apply(this, e), u);
            };
          return ((f.cancel = c.cancel), (f.flush = () => (c.flush(), u)), f);
        };
      })(mi)),
    mi
  );
}
function _i() {
  return pi
    ? hi
    : ((pi = 1),
      (hi = (fi ||
        ((fi = 1),
        (function (t) {
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
          const e = wi();
          t.throttle = function (t, n = 0, r = {}) {
            const { leading: o = !0, trailing: i = !0 } = r;
            return e.debounce(t, n, { leading: o, maxWait: n, trailing: i });
          };
        })(yi)),
      yi).throttle));
}
const xi = t(_i());
function Mi() {}
function ki(t) {
  return null != t;
}
var Ti,
  Si,
  Oi,
  ji,
  Ni,
  Pi = {},
  Ai = {},
  Ei = {};
function Ci() {
  return (
    Ti ||
      ((Ti = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Vr();
        t.toNumber = function (t) {
          return e.isSymbol(t) ? NaN : Number(t);
        };
      })(Ei)),
    Ei
  );
}
function $i() {
  return (
    Si ||
      ((Si = 1),
      (function (t) {
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
        const e = Ci();
        t.toFinite = function (t) {
          if (!t) return 0 === t ? t : 0;
          if ((t = e.toNumber(t)) === 1 / 0 || t === -1 / 0) {
            return (t < 0 ? -1 : 1) * Number.MAX_VALUE;
          }
          return t == t ? t : 0;
        };
      })(Ai)),
    Ai
  );
}
function Di() {
  return Ni
    ? ji
    : ((Ni = 1),
      (ji = (Oi ||
        ((Oi = 1),
        (function (t) {
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
          const e = oo(),
            n = $i();
          t.range = function (t, r, o) {
            (o &&
              'number' != typeof o &&
              e.isIterateeCall(t, r, o) &&
              (r = o = void 0),
              (t = n.toFinite(t)),
              void 0 === r ? ((r = t), (t = 0)) : (r = n.toFinite(r)),
              (o = void 0 === o ? (t < r ? 1 : -1) : n.toFinite(o)));
            const i = Math.max(Math.ceil((r - t) / (o || 1)), 0),
              a = new Array(i);
            for (let e = 0; e < i; e++) ((a[e] = t), (t += o));
            return a;
          };
        })(Pi)),
      Pi).range));
}
const Ui = t(Di());
function zi(t, e) {
  return null == t || null == e
    ? NaN
    : t < e
      ? -1
      : t > e
        ? 1
        : t >= e
          ? 0
          : NaN;
}
function Fi(t, e) {
  return null == t || null == e
    ? NaN
    : e < t
      ? -1
      : e > t
        ? 1
        : e >= t
          ? 0
          : NaN;
}
function Ii(t) {
  let e, n, r;
  function o(t, r, o = 0, i = t.length) {
    if (o < i) {
      if (0 !== e(r, r)) return i;
      do {
        const e = (o + i) >>> 1;
        n(t[e], r) < 0 ? (o = e + 1) : (i = e);
      } while (o < i);
    }
    return o;
  }
  return (
    2 !== t.length
      ? ((e = zi), (n = (e, n) => zi(t(e), n)), (r = (e, n) => t(e) - n))
      : ((e = t === zi || t === Fi ? t : Li), (n = t), (r = t)),
    {
      left: o,
      center: function (t, e, n = 0, i = t.length) {
        const a = o(t, e, n, i - 1);
        return a > n && r(t[a - 1], e) > -r(t[a], e) ? a - 1 : a;
      },
      right: function (t, r, o = 0, i = t.length) {
        if (o < i) {
          if (0 !== e(r, r)) return i;
          do {
            const e = (o + i) >>> 1;
            n(t[e], r) <= 0 ? (o = e + 1) : (i = e);
          } while (o < i);
        }
        return o;
      },
    }
  );
}
function Li() {
  return 0;
}
function Ri(t) {
  return null === t ? NaN : +t;
}
const qi = Ii(zi).right;
Ii(Ri).center;
class Wi extends Map {
  constructor(t, e = Bi) {
    if (
      (super(),
      Object.defineProperties(this, {
        _intern: { value: new Map() },
        _key: { value: e },
      }),
      null != t)
    )
      for (const [n, r] of t) this.set(n, r);
  }
  get(t) {
    return super.get(Hi(this, t));
  }
  has(t) {
    return super.has(Hi(this, t));
  }
  set(t, e) {
    return super.set(
      (function ({ _intern: t, _key: e }, n) {
        const r = e(n);
        return t.has(r) ? t.get(r) : (t.set(r, n), n);
      })(this, t),
      e
    );
  }
  delete(t) {
    return super.delete(
      (function ({ _intern: t, _key: e }, n) {
        const r = e(n);
        t.has(r) && ((n = t.get(r)), t.delete(r));
        return n;
      })(this, t)
    );
  }
}
function Hi({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function Bi(t) {
  return null !== t && 'object' == typeof t ? t.valueOf() : t;
}
function Yi(t, e) {
  return (
    (null == t || !(t >= t)) - (null == e || !(e >= e)) ||
    (t < e ? -1 : t > e ? 1 : 0)
  );
}
const Vi = Math.sqrt(50),
  Gi = Math.sqrt(10),
  Ki = Math.sqrt(2);
function Zi(t, e, n) {
  const r = (e - t) / Math.max(0, n),
    o = Math.floor(Math.log10(r)),
    i = r / Math.pow(10, o),
    a = i >= Vi ? 10 : i >= Gi ? 5 : i >= Ki ? 2 : 1;
  let s, u, l;
  return (
    o < 0
      ? ((l = Math.pow(10, -o) / a),
        (s = Math.round(t * l)),
        (u = Math.round(e * l)),
        s / l < t && ++s,
        u / l > e && --u,
        (l = -l))
      : ((l = Math.pow(10, o) * a),
        (s = Math.round(t / l)),
        (u = Math.round(e / l)),
        s * l < t && ++s,
        u * l > e && --u),
    u < s && 0.5 <= n && n < 2 ? Zi(t, e, 2 * n) : [s, u, l]
  );
}
function Xi(t, e, n) {
  if (!((n = +n) > 0)) return [];
  if ((t = +t) === (e = +e)) return [t];
  const r = e < t,
    [o, i, a] = r ? Zi(e, t, n) : Zi(t, e, n);
  if (!(i >= o)) return [];
  const s = i - o + 1,
    u = new Array(s);
  if (r)
    if (a < 0) for (let l = 0; l < s; ++l) u[l] = (i - l) / -a;
    else for (let l = 0; l < s; ++l) u[l] = (i - l) * a;
  else if (a < 0) for (let l = 0; l < s; ++l) u[l] = (o + l) / -a;
  else for (let l = 0; l < s; ++l) u[l] = (o + l) * a;
  return u;
}
function Qi(t, e, n) {
  return Zi((t = +t), (e = +e), (n = +n))[2];
}
function Ji(t, e, n) {
  n = +n;
  const r = (e = +e) < (t = +t),
    o = r ? Qi(e, t, n) : Qi(t, e, n);
  return (r ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
function ta(t, e) {
  let n;
  for (const r of t)
    null != r && (n < r || (void 0 === n && r >= r)) && (n = r);
  return n;
}
function ea(t, e) {
  let n;
  for (const r of t)
    null != r && (n > r || (void 0 === n && r >= r)) && (n = r);
  return n;
}
function na(t, e, n = 0, r = 1 / 0, o) {
  if (
    ((e = Math.floor(e)),
    (n = Math.floor(Math.max(0, n))),
    (r = Math.floor(Math.min(t.length - 1, r))),
    !(n <= e && e <= r))
  )
    return t;
  for (
    o =
      void 0 === o
        ? Yi
        : (function (t = zi) {
            if (t === zi) return Yi;
            if ('function' != typeof t)
              throw new TypeError('compare is not a function');
            return (e, n) => {
              const r = t(e, n);
              return r || 0 === r ? r : (0 === t(n, n)) - (0 === t(e, e));
            };
          })(o);
    r > n;

  ) {
    if (r - n > 600) {
      const i = r - n + 1,
        a = e - n + 1,
        s = Math.log(i),
        u = 0.5 * Math.exp((2 * s) / 3),
        l = 0.5 * Math.sqrt((s * u * (i - u)) / i) * (a - i / 2 < 0 ? -1 : 1);
      na(
        t,
        e,
        Math.max(n, Math.floor(e - (a * u) / i + l)),
        Math.min(r, Math.floor(e + ((i - a) * u) / i + l)),
        o
      );
    }
    const i = t[e];
    let a = n,
      s = r;
    for (ra(t, n, e), o(t[r], i) > 0 && ra(t, n, r); a < s; ) {
      for (ra(t, a, s), ++a, --s; o(t[a], i) < 0; ) ++a;
      for (; o(t[s], i) > 0; ) --s;
    }
    (0 === o(t[n], i) ? ra(t, n, s) : (++s, ra(t, s, r)),
      s <= e && (n = s + 1),
      e <= s && (r = s - 1));
  }
  return t;
}
function ra(t, e, n) {
  const r = t[e];
  ((t[e] = t[n]), (t[n] = r));
}
function oa(t, e, n = Ri) {
  if ((r = t.length) && !isNaN((e = +e))) {
    if (e <= 0 || r < 2) return +n(t[0], 0, t);
    if (e >= 1) return +n(t[r - 1], r - 1, t);
    var r,
      o = (r - 1) * e,
      i = Math.floor(o),
      a = +n(t[i], i, t);
    return a + (+n(t[i + 1], i + 1, t) - a) * (o - i);
  }
}
function ia(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
  }
  return this;
}
function aa(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      'function' == typeof t ? this.interpolator(t) : this.range(t);
      break;
    default:
      (this.domain(t),
        'function' == typeof e ? this.interpolator(e) : this.range(e));
  }
  return this;
}
const sa = Symbol('implicit');
function ua() {
  var t = new Wi(),
    e = [],
    n = [],
    r = sa;
  function o(o) {
    let i = t.get(o);
    if (void 0 === i) {
      if (r !== sa) return r;
      t.set(o, (i = e.push(o) - 1));
    }
    return n[i % n.length];
  }
  return (
    (o.domain = function (n) {
      if (!arguments.length) return e.slice();
      ((e = []), (t = new Wi()));
      for (const r of n) t.has(r) || t.set(r, e.push(r) - 1);
      return o;
    }),
    (o.range = function (t) {
      return arguments.length ? ((n = Array.from(t)), o) : n.slice();
    }),
    (o.unknown = function (t) {
      return arguments.length ? ((r = t), o) : r;
    }),
    (o.copy = function () {
      return ua(e, n).unknown(r);
    }),
    ia.apply(o, arguments),
    o
  );
}
function la() {
  var t,
    e,
    n = ua().unknown(void 0),
    r = n.domain,
    o = n.range,
    i = 0,
    a = 1,
    s = !1,
    u = 0,
    l = 0,
    c = 0.5;
  function f() {
    var n = r().length,
      f = a < i,
      h = f ? a : i,
      p = f ? i : a;
    ((t = (p - h) / Math.max(1, n - u + 2 * l)),
      s && (t = Math.floor(t)),
      (h += (p - h - t * (n - u)) * c),
      (e = t * (1 - u)),
      s && ((h = Math.round(h)), (e = Math.round(e))));
    var d = (function (t, e, n) {
      ((t = +t),
        (e = +e),
        (n =
          (o = arguments.length) < 2 ? ((e = t), (t = 0), 1) : o < 3 ? 1 : +n));
      for (
        var r = -1,
          o = 0 | Math.max(0, Math.ceil((e - t) / n)),
          i = new Array(o);
        ++r < o;

      )
        i[r] = t + r * n;
      return i;
    })(n).map(function (e) {
      return h + t * e;
    });
    return o(f ? d.reverse() : d);
  }
  return (
    delete n.unknown,
    (n.domain = function (t) {
      return arguments.length ? (r(t), f()) : r();
    }),
    (n.range = function (t) {
      return arguments.length
        ? (([i, a] = t), (i = +i), (a = +a), f())
        : [i, a];
    }),
    (n.rangeRound = function (t) {
      return (([i, a] = t), (i = +i), (a = +a), (s = !0), f());
    }),
    (n.bandwidth = function () {
      return e;
    }),
    (n.step = function () {
      return t;
    }),
    (n.round = function (t) {
      return arguments.length ? ((s = !!t), f()) : s;
    }),
    (n.padding = function (t) {
      return arguments.length ? ((u = Math.min(1, (l = +t))), f()) : u;
    }),
    (n.paddingInner = function (t) {
      return arguments.length ? ((u = Math.min(1, t)), f()) : u;
    }),
    (n.paddingOuter = function (t) {
      return arguments.length ? ((l = +t), f()) : l;
    }),
    (n.align = function (t) {
      return arguments.length ? ((c = Math.max(0, Math.min(1, t))), f()) : c;
    }),
    (n.copy = function () {
      return la(r(), [i, a]).round(s).paddingInner(u).paddingOuter(l).align(c);
    }),
    ia.apply(f(), arguments)
  );
}
function ca(t) {
  var e = t.copy;
  return (
    (t.padding = t.paddingOuter),
    delete t.paddingInner,
    delete t.paddingOuter,
    (t.copy = function () {
      return ca(e());
    }),
    t
  );
}
function fa(t, e, n) {
  ((t.prototype = e.prototype = n), (n.constructor = t));
}
function ha(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function pa() {}
var da = 0.7,
  ga = 1 / da,
  ya = '\\s*([+-]?\\d+)\\s*',
  ma = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
  ba = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
  va = /^#([0-9a-f]{3,8})$/,
  wa = new RegExp(`^rgb\\(${ya},${ya},${ya}\\)$`),
  _a = new RegExp(`^rgb\\(${ba},${ba},${ba}\\)$`),
  xa = new RegExp(`^rgba\\(${ya},${ya},${ya},${ma}\\)$`),
  Ma = new RegExp(`^rgba\\(${ba},${ba},${ba},${ma}\\)$`),
  ka = new RegExp(`^hsl\\(${ma},${ba},${ba}\\)$`),
  Ta = new RegExp(`^hsla\\(${ma},${ba},${ba},${ma}\\)$`),
  Sa = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
function Oa() {
  return this.rgb().formatHex();
}
function ja() {
  return this.rgb().formatRgb();
}
function Na(t) {
  var e, n;
  return (
    (t = (t + '').trim().toLowerCase()),
    (e = va.exec(t))
      ? ((n = e[1].length),
        (e = parseInt(e[1], 16)),
        6 === n
          ? Pa(e)
          : 3 === n
            ? new Ca(
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (240 & e),
                ((15 & e) << 4) | (15 & e),
                1
              )
            : 8 === n
              ? Aa(
                  (e >> 24) & 255,
                  (e >> 16) & 255,
                  (e >> 8) & 255,
                  (255 & e) / 255
                )
              : 4 === n
                ? Aa(
                    ((e >> 12) & 15) | ((e >> 8) & 240),
                    ((e >> 8) & 15) | ((e >> 4) & 240),
                    ((e >> 4) & 15) | (240 & e),
                    (((15 & e) << 4) | (15 & e)) / 255
                  )
                : null)
      : (e = wa.exec(t))
        ? new Ca(e[1], e[2], e[3], 1)
        : (e = _a.exec(t))
          ? new Ca(
              (255 * e[1]) / 100,
              (255 * e[2]) / 100,
              (255 * e[3]) / 100,
              1
            )
          : (e = xa.exec(t))
            ? Aa(e[1], e[2], e[3], e[4])
            : (e = Ma.exec(t))
              ? Aa(
                  (255 * e[1]) / 100,
                  (255 * e[2]) / 100,
                  (255 * e[3]) / 100,
                  e[4]
                )
              : (e = ka.exec(t))
                ? Ia(e[1], e[2] / 100, e[3] / 100, 1)
                : (e = Ta.exec(t))
                  ? Ia(e[1], e[2] / 100, e[3] / 100, e[4])
                  : Sa.hasOwnProperty(t)
                    ? Pa(Sa[t])
                    : 'transparent' === t
                      ? new Ca(NaN, NaN, NaN, 0)
                      : null
  );
}
function Pa(t) {
  return new Ca((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
}
function Aa(t, e, n, r) {
  return (r <= 0 && (t = e = n = NaN), new Ca(t, e, n, r));
}
function Ea(t, e, n, r) {
  return 1 === arguments.length
    ? ((o = t) instanceof pa || (o = Na(o)),
      o ? new Ca((o = o.rgb()).r, o.g, o.b, o.opacity) : new Ca())
    : new Ca(t, e, n, null == r ? 1 : r);
  var o;
}
function Ca(t, e, n, r) {
  ((this.r = +t), (this.g = +e), (this.b = +n), (this.opacity = +r));
}
function $a() {
  return `#${Fa(this.r)}${Fa(this.g)}${Fa(this.b)}`;
}
function Da() {
  const t = Ua(this.opacity);
  return `${1 === t ? 'rgb(' : 'rgba('}${za(this.r)}, ${za(this.g)}, ${za(this.b)}${1 === t ? ')' : `, ${t})`}`;
}
function Ua(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function za(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Fa(t) {
  return ((t = za(t)) < 16 ? '0' : '') + t.toString(16);
}
function Ia(t, e, n, r) {
  return (
    r <= 0
      ? (t = e = n = NaN)
      : n <= 0 || n >= 1
        ? (t = e = NaN)
        : e <= 0 && (t = NaN),
    new Ra(t, e, n, r)
  );
}
function La(t) {
  if (t instanceof Ra) return new Ra(t.h, t.s, t.l, t.opacity);
  if ((t instanceof pa || (t = Na(t)), !t)) return new Ra();
  if (t instanceof Ra) return t;
  var e = (t = t.rgb()).r / 255,
    n = t.g / 255,
    r = t.b / 255,
    o = Math.min(e, n, r),
    i = Math.max(e, n, r),
    a = NaN,
    s = i - o,
    u = (i + o) / 2;
  return (
    s
      ? ((a =
          e === i
            ? (n - r) / s + 6 * (n < r)
            : n === i
              ? (r - e) / s + 2
              : (e - n) / s + 4),
        (s /= u < 0.5 ? i + o : 2 - i - o),
        (a *= 60))
      : (s = u > 0 && u < 1 ? 0 : a),
    new Ra(a, s, u, t.opacity)
  );
}
function Ra(t, e, n, r) {
  ((this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r));
}
function qa(t) {
  return (t = (t || 0) % 360) < 0 ? t + 360 : t;
}
function Wa(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ha(t, e, n) {
  return (
    255 *
    (t < 60
      ? e + ((n - e) * t) / 60
      : t < 180
        ? n
        : t < 240
          ? e + ((n - e) * (240 - t)) / 60
          : e)
  );
}
(fa(pa, Na, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Oa,
  formatHex: Oa,
  formatHex8: function () {
    return this.rgb().formatHex8();
  },
  formatHsl: function () {
    return La(this).formatHsl();
  },
  formatRgb: ja,
  toString: ja,
}),
  fa(
    Ca,
    Ea,
    ha(pa, {
      brighter(t) {
        return (
          (t = null == t ? ga : Math.pow(ga, t)),
          new Ca(this.r * t, this.g * t, this.b * t, this.opacity)
        );
      },
      darker(t) {
        return (
          (t = null == t ? da : Math.pow(da, t)),
          new Ca(this.r * t, this.g * t, this.b * t, this.opacity)
        );
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Ca(za(this.r), za(this.g), za(this.b), Ua(this.opacity));
      },
      displayable() {
        return (
          -0.5 <= this.r &&
          this.r < 255.5 &&
          -0.5 <= this.g &&
          this.g < 255.5 &&
          -0.5 <= this.b &&
          this.b < 255.5 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      hex: $a,
      formatHex: $a,
      formatHex8: function () {
        return `#${Fa(this.r)}${Fa(this.g)}${Fa(this.b)}${Fa(255 * (isNaN(this.opacity) ? 1 : this.opacity))}`;
      },
      formatRgb: Da,
      toString: Da,
    })
  ),
  fa(
    Ra,
    function (t, e, n, r) {
      return 1 === arguments.length
        ? La(t)
        : new Ra(t, e, n, null == r ? 1 : r);
    },
    ha(pa, {
      brighter(t) {
        return (
          (t = null == t ? ga : Math.pow(ga, t)),
          new Ra(this.h, this.s, this.l * t, this.opacity)
        );
      },
      darker(t) {
        return (
          (t = null == t ? da : Math.pow(da, t)),
          new Ra(this.h, this.s, this.l * t, this.opacity)
        );
      },
      rgb() {
        var t = (this.h % 360) + 360 * (this.h < 0),
          e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
          n = this.l,
          r = n + (n < 0.5 ? n : 1 - n) * e,
          o = 2 * n - r;
        return new Ca(
          Ha(t >= 240 ? t - 240 : t + 120, o, r),
          Ha(t, o, r),
          Ha(t < 120 ? t + 240 : t - 120, o, r),
          this.opacity
        );
      },
      clamp() {
        return new Ra(qa(this.h), Wa(this.s), Wa(this.l), Ua(this.opacity));
      },
      displayable() {
        return (
          ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
          0 <= this.l &&
          this.l <= 1 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      formatHsl() {
        const t = Ua(this.opacity);
        return `${1 === t ? 'hsl(' : 'hsla('}${qa(this.h)}, ${100 * Wa(this.s)}%, ${100 * Wa(this.l)}%${1 === t ? ')' : `, ${t})`}`;
      },
    })
  ));
const Ba = (t) => () => t;
function Ya(t) {
  return 1 === (t = +t)
    ? Va
    : function (e, n) {
        return n - e
          ? (function (t, e, n) {
              return (
                (t = Math.pow(t, n)),
                (e = Math.pow(e, n) - t),
                (n = 1 / n),
                function (r) {
                  return Math.pow(t + r * e, n);
                }
              );
            })(e, n, t)
          : Ba(isNaN(e) ? n : e);
      };
}
function Va(t, e) {
  var n = e - t;
  return n
    ? (function (t, e) {
        return function (n) {
          return t + n * e;
        };
      })(t, n)
    : Ba(isNaN(t) ? e : t);
}
const Ga = (function t(e) {
  var n = Ya(e);
  function r(t, e) {
    var r = n((t = Ea(t)).r, (e = Ea(e)).r),
      o = n(t.g, e.g),
      i = n(t.b, e.b),
      a = Va(t.opacity, e.opacity);
    return function (e) {
      return (
        (t.r = r(e)),
        (t.g = o(e)),
        (t.b = i(e)),
        (t.opacity = a(e)),
        t + ''
      );
    };
  }
  return ((r.gamma = t), r);
})(1);
function Ka(t, e) {
  e || (e = []);
  var n,
    r = t ? Math.min(e.length, t.length) : 0,
    o = e.slice();
  return function (i) {
    for (n = 0; n < r; ++n) o[n] = t[n] * (1 - i) + e[n] * i;
    return o;
  };
}
function Za(t, e) {
  var n,
    r = e ? e.length : 0,
    o = t ? Math.min(r, t.length) : 0,
    i = new Array(o),
    a = new Array(r);
  for (n = 0; n < o; ++n) i[n] = rs(t[n], e[n]);
  for (; n < r; ++n) a[n] = e[n];
  return function (t) {
    for (n = 0; n < o; ++n) a[n] = i[n](t);
    return a;
  };
}
function Xa(t, e) {
  var n = new Date();
  return (
    (t = +t),
    (e = +e),
    function (r) {
      return (n.setTime(t * (1 - r) + e * r), n);
    }
  );
}
function Qa(t, e) {
  return (
    (t = +t),
    (e = +e),
    function (n) {
      return t * (1 - n) + e * n;
    }
  );
}
function Ja(t, e) {
  var n,
    r = {},
    o = {};
  for (n in ((null !== t && 'object' == typeof t) || (t = {}),
  (null !== e && 'object' == typeof e) || (e = {}),
  e))
    n in t ? (r[n] = rs(t[n], e[n])) : (o[n] = e[n]);
  return function (t) {
    for (n in r) o[n] = r[n](t);
    return o;
  };
}
var ts = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  es = new RegExp(ts.source, 'g');
function ns(t, e) {
  var n,
    r,
    o,
    i = (ts.lastIndex = es.lastIndex = 0),
    a = -1,
    s = [],
    u = [];
  for (t += '', e += ''; (n = ts.exec(t)) && (r = es.exec(e)); )
    ((o = r.index) > i &&
      ((o = e.slice(i, o)), s[a] ? (s[a] += o) : (s[++a] = o)),
      (n = n[0]) === (r = r[0])
        ? s[a]
          ? (s[a] += r)
          : (s[++a] = r)
        : ((s[++a] = null), u.push({ i: a, x: Qa(n, r) })),
      (i = es.lastIndex));
  return (
    i < e.length && ((o = e.slice(i)), s[a] ? (s[a] += o) : (s[++a] = o)),
    s.length < 2
      ? u[0]
        ? (function (t) {
            return function (e) {
              return t(e) + '';
            };
          })(u[0].x)
        : (function (t) {
            return function () {
              return t;
            };
          })(e)
      : ((e = u.length),
        function (t) {
          for (var n, r = 0; r < e; ++r) s[(n = u[r]).i] = n.x(t);
          return s.join('');
        })
  );
}
function rs(t, e) {
  var n,
    r,
    o = typeof e;
  return null == e || 'boolean' === o
    ? Ba(e)
    : ('number' === o
        ? Qa
        : 'string' === o
          ? (n = Na(e))
            ? ((e = n), Ga)
            : ns
          : e instanceof Na
            ? Ga
            : e instanceof Date
              ? Xa
              : ((r = e),
                !ArrayBuffer.isView(r) || r instanceof DataView
                  ? Array.isArray(e)
                    ? Za
                    : ('function' != typeof e.valueOf &&
                          'function' != typeof e.toString) ||
                        isNaN(e)
                      ? Ja
                      : Qa
                  : Ka))(t, e);
}
function os(t, e) {
  return (
    (t = +t),
    (e = +e),
    function (n) {
      return Math.round(t * (1 - n) + e * n);
    }
  );
}
function is(t) {
  return +t;
}
var as = [0, 1];
function ss(t) {
  return t;
}
function us(t, e) {
  return (e -= t = +t)
    ? function (n) {
        return (n - t) / e;
      }
    : ((n = isNaN(e) ? NaN : 0.5),
      function () {
        return n;
      });
  var n;
}
function ls(t, e, n) {
  var r = t[0],
    o = t[1],
    i = e[0],
    a = e[1];
  return (
    o < r ? ((r = us(o, r)), (i = n(a, i))) : ((r = us(r, o)), (i = n(i, a))),
    function (t) {
      return i(r(t));
    }
  );
}
function cs(t, e, n) {
  var r = Math.min(t.length, e.length) - 1,
    o = new Array(r),
    i = new Array(r),
    a = -1;
  for (
    t[r] < t[0] && ((t = t.slice().reverse()), (e = e.slice().reverse()));
    ++a < r;

  )
    ((o[a] = us(t[a], t[a + 1])), (i[a] = n(e[a], e[a + 1])));
  return function (e) {
    var n = qi(t, e, 1, r) - 1;
    return i[n](o[n](e));
  };
}
function fs(t, e) {
  return e
    .domain(t.domain())
    .range(t.range())
    .interpolate(t.interpolate())
    .clamp(t.clamp())
    .unknown(t.unknown());
}
function hs() {
  var t,
    e,
    n,
    r,
    o,
    i,
    a = as,
    s = as,
    u = rs,
    l = ss;
  function c() {
    var t,
      e,
      n,
      u = Math.min(a.length, s.length);
    return (
      l !== ss &&
        ((t = a[0]),
        (e = a[u - 1]),
        t > e && ((n = t), (t = e), (e = n)),
        (l = function (n) {
          return Math.max(t, Math.min(e, n));
        })),
      (r = u > 2 ? cs : ls),
      (o = i = null),
      f
    );
  }
  function f(e) {
    return null == e || isNaN((e = +e))
      ? n
      : (o || (o = r(a.map(t), s, u)))(t(l(e)));
  }
  return (
    (f.invert = function (n) {
      return l(e((i || (i = r(s, a.map(t), Qa)))(n)));
    }),
    (f.domain = function (t) {
      return arguments.length ? ((a = Array.from(t, is)), c()) : a.slice();
    }),
    (f.range = function (t) {
      return arguments.length ? ((s = Array.from(t)), c()) : s.slice();
    }),
    (f.rangeRound = function (t) {
      return ((s = Array.from(t)), (u = os), c());
    }),
    (f.clamp = function (t) {
      return arguments.length ? ((l = !!t || ss), c()) : l !== ss;
    }),
    (f.interpolate = function (t) {
      return arguments.length ? ((u = t), c()) : u;
    }),
    (f.unknown = function (t) {
      return arguments.length ? ((n = t), f) : n;
    }),
    function (n, r) {
      return ((t = n), (e = r), c());
    }
  );
}
function ps() {
  return hs()(ss, ss);
}
function ds(t, e) {
  if (
    (n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf('e')) < 0
  )
    return null;
  var n,
    r = t.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(n + 1)];
}
function gs(t) {
  return (t = ds(Math.abs(t))) ? t[1] : NaN;
}
var ys,
  ms =
    /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function bs(t) {
  if (!(e = ms.exec(t))) throw new Error('invalid format: ' + t);
  var e;
  return new vs({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10],
  });
}
function vs(t) {
  ((this.fill = void 0 === t.fill ? ' ' : t.fill + ''),
    (this.align = void 0 === t.align ? '>' : t.align + ''),
    (this.sign = void 0 === t.sign ? '-' : t.sign + ''),
    (this.symbol = void 0 === t.symbol ? '' : t.symbol + ''),
    (this.zero = !!t.zero),
    (this.width = void 0 === t.width ? void 0 : +t.width),
    (this.comma = !!t.comma),
    (this.precision = void 0 === t.precision ? void 0 : +t.precision),
    (this.trim = !!t.trim),
    (this.type = void 0 === t.type ? '' : t.type + ''));
}
function ws(t, e) {
  var n = ds(t, e);
  if (!n) return t + '';
  var r = n[0],
    o = n[1];
  return o < 0
    ? '0.' + new Array(-o).join('0') + r
    : r.length > o + 1
      ? r.slice(0, o + 1) + '.' + r.slice(o + 1)
      : r + new Array(o - r.length + 2).join('0');
}
((bs.prototype = vs.prototype),
  (vs.prototype.toString = function () {
    return (
      this.fill +
      this.align +
      this.sign +
      this.symbol +
      (this.zero ? '0' : '') +
      (void 0 === this.width ? '' : Math.max(1, 0 | this.width)) +
      (this.comma ? ',' : '') +
      (void 0 === this.precision ? '' : '.' + Math.max(0, 0 | this.precision)) +
      (this.trim ? '~' : '') +
      this.type
    );
  }));
const _s = {
  '%': (t, e) => (100 * t).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + '',
  d: function (t) {
    return Math.abs((t = Math.round(t))) >= 1e21
      ? t.toLocaleString('en').replace(/,/g, '')
      : t.toString(10);
  },
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => ws(100 * t, e),
  r: ws,
  s: function (t, e) {
    var n = ds(t, e);
    if (!n) return t + '';
    var r = n[0],
      o = n[1],
      i = o - (ys = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
      a = r.length;
    return i === a
      ? r
      : i > a
        ? r + new Array(i - a + 1).join('0')
        : i > 0
          ? r.slice(0, i) + '.' + r.slice(i)
          : '0.' +
            new Array(1 - i).join('0') +
            ds(t, Math.max(0, e + i - 1))[0];
  },
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16),
};
function xs(t) {
  return t;
}
var Ms,
  ks,
  Ts,
  Ss = Array.prototype.map,
  Os = [
    'y',
    'z',
    'a',
    'f',
    'p',
    'n',
    'µ',
    'm',
    '',
    'k',
    'M',
    'G',
    'T',
    'P',
    'E',
    'Z',
    'Y',
  ];
function js(t) {
  var e,
    n,
    r =
      void 0 === t.grouping || void 0 === t.thousands
        ? xs
        : ((e = Ss.call(t.grouping, Number)),
          (n = t.thousands + ''),
          function (t, r) {
            for (
              var o = t.length, i = [], a = 0, s = e[0], u = 0;
              o > 0 &&
              s > 0 &&
              (u + s + 1 > r && (s = Math.max(1, r - u)),
              i.push(t.substring((o -= s), o + s)),
              !((u += s + 1) > r));

            )
              s = e[(a = (a + 1) % e.length)];
            return i.reverse().join(n);
          }),
    o = void 0 === t.currency ? '' : t.currency[0] + '',
    i = void 0 === t.currency ? '' : t.currency[1] + '',
    a = void 0 === t.decimal ? '.' : t.decimal + '',
    s =
      void 0 === t.numerals
        ? xs
        : (function (t) {
            return function (e) {
              return e.replace(/[0-9]/g, function (e) {
                return t[+e];
              });
            };
          })(Ss.call(t.numerals, String)),
    u = void 0 === t.percent ? '%' : t.percent + '',
    l = void 0 === t.minus ? '−' : t.minus + '',
    c = void 0 === t.nan ? 'NaN' : t.nan + '';
  function f(t) {
    var e = (t = bs(t)).fill,
      n = t.align,
      f = t.sign,
      h = t.symbol,
      p = t.zero,
      d = t.width,
      g = t.comma,
      y = t.precision,
      m = t.trim,
      b = t.type;
    ('n' === b
      ? ((g = !0), (b = 'g'))
      : _s[b] || (void 0 === y && (y = 12), (m = !0), (b = 'g')),
      (p || ('0' === e && '=' === n)) && ((p = !0), (e = '0'), (n = '=')));
    var v =
        '$' === h
          ? o
          : '#' === h && /[boxX]/.test(b)
            ? '0' + b.toLowerCase()
            : '',
      w = '$' === h ? i : /[%p]/.test(b) ? u : '',
      _ = _s[b],
      x = /[defgprs%]/.test(b);
    function M(t) {
      var o,
        i,
        u,
        h = v,
        M = w;
      if ('c' === b) ((M = _(t) + M), (t = ''));
      else {
        var k = (t = +t) < 0 || 1 / t < 0;
        if (
          ((t = isNaN(t) ? c : _(Math.abs(t), y)),
          m &&
            (t = (function (t) {
              t: for (var e, n = t.length, r = 1, o = -1; r < n; ++r)
                switch (t[r]) {
                  case '.':
                    o = e = r;
                    break;
                  case '0':
                    (0 === o && (o = r), (e = r));
                    break;
                  default:
                    if (!+t[r]) break t;
                    o > 0 && (o = 0);
                }
              return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t;
            })(t)),
          k && 0 === +t && '+' !== f && (k = !1),
          (h = (k ? ('(' === f ? f : l) : '-' === f || '(' === f ? '' : f) + h),
          (M =
            ('s' === b ? Os[8 + ys / 3] : '') +
            M +
            (k && '(' === f ? ')' : '')),
          x)
        )
          for (o = -1, i = t.length; ++o < i; )
            if (48 > (u = t.charCodeAt(o)) || u > 57) {
              ((M = (46 === u ? a + t.slice(o + 1) : t.slice(o)) + M),
                (t = t.slice(0, o)));
              break;
            }
      }
      g && !p && (t = r(t, 1 / 0));
      var T = h.length + t.length + M.length,
        S = T < d ? new Array(d - T + 1).join(e) : '';
      switch (
        (g && p && ((t = r(S + t, S.length ? d - M.length : 1 / 0)), (S = '')),
        n)
      ) {
        case '<':
          t = h + t + M + S;
          break;
        case '=':
          t = h + S + t + M;
          break;
        case '^':
          t = S.slice(0, (T = S.length >> 1)) + h + t + M + S.slice(T);
          break;
        default:
          t = S + h + t + M;
      }
      return s(t);
    }
    return (
      (y =
        void 0 === y
          ? 6
          : /[gprs]/.test(b)
            ? Math.max(1, Math.min(21, y))
            : Math.max(0, Math.min(20, y))),
      (M.toString = function () {
        return t + '';
      }),
      M
    );
  }
  return {
    format: f,
    formatPrefix: function (t, e) {
      var n = f((((t = bs(t)).type = 'f'), t)),
        r = 3 * Math.max(-8, Math.min(8, Math.floor(gs(e) / 3))),
        o = Math.pow(10, -r),
        i = Os[8 + r / 3];
      return function (t) {
        return n(o * t) + i;
      };
    },
  };
}
function Ns(t, e, n, r) {
  var o,
    i = Ji(t, e, n);
  switch ((r = bs(null == r ? ',f' : r)).type) {
    case 's':
      var a = Math.max(Math.abs(t), Math.abs(e));
      return (
        null != r.precision ||
          isNaN(
            (o = (function (t, e) {
              return Math.max(
                0,
                3 * Math.max(-8, Math.min(8, Math.floor(gs(e) / 3))) -
                  gs(Math.abs(t))
              );
            })(i, a))
          ) ||
          (r.precision = o),
        Ts(r, a)
      );
    case '':
    case 'e':
    case 'g':
    case 'p':
    case 'r':
      null != r.precision ||
        isNaN(
          (o = (function (t, e) {
            return (
              (t = Math.abs(t)),
              (e = Math.abs(e) - t),
              Math.max(0, gs(e) - gs(t)) + 1
            );
          })(i, Math.max(Math.abs(t), Math.abs(e))))
        ) ||
        (r.precision = o - ('e' === r.type));
      break;
    case 'f':
    case '%':
      null != r.precision ||
        isNaN(
          (o = (function (t) {
            return Math.max(0, -gs(Math.abs(t)));
          })(i))
        ) ||
        (r.precision = o - 2 * ('%' === r.type));
  }
  return ks(r);
}
function Ps(t) {
  var e = t.domain;
  return (
    (t.ticks = function (t) {
      var n = e();
      return Xi(n[0], n[n.length - 1], null == t ? 10 : t);
    }),
    (t.tickFormat = function (t, n) {
      var r = e();
      return Ns(r[0], r[r.length - 1], null == t ? 10 : t, n);
    }),
    (t.nice = function (n) {
      null == n && (n = 10);
      var r,
        o,
        i = e(),
        a = 0,
        s = i.length - 1,
        u = i[a],
        l = i[s],
        c = 10;
      for (
        l < u && ((o = u), (u = l), (l = o), (o = a), (a = s), (s = o));
        c-- > 0;

      ) {
        if ((o = Qi(u, l, n)) === r) return ((i[a] = u), (i[s] = l), e(i));
        if (o > 0) ((u = Math.floor(u / o) * o), (l = Math.ceil(l / o) * o));
        else {
          if (!(o < 0)) break;
          ((u = Math.ceil(u * o) / o), (l = Math.floor(l * o) / o));
        }
        r = o;
      }
      return t;
    }),
    t
  );
}
function As(t, e) {
  var n,
    r = 0,
    o = (t = t.slice()).length - 1,
    i = t[r],
    a = t[o];
  return (
    a < i && ((n = r), (r = o), (o = n), (n = i), (i = a), (a = n)),
    (t[r] = e.floor(i)),
    (t[o] = e.ceil(a)),
    t
  );
}
function Es(t) {
  return Math.log(t);
}
function Cs(t) {
  return Math.exp(t);
}
function $s(t) {
  return -Math.log(-t);
}
function Ds(t) {
  return -Math.exp(-t);
}
function Us(t) {
  return isFinite(t) ? +('1e' + t) : t < 0 ? 0 : t;
}
function zs(t) {
  return (e, n) => -t(-e, n);
}
function Fs(t) {
  const e = t(Es, Cs),
    n = e.domain;
  let r,
    o,
    i = 10;
  function a() {
    return (
      (r = (function (t) {
        return t === Math.E
          ? Math.log
          : (10 === t && Math.log10) ||
              (2 === t && Math.log2) ||
              ((t = Math.log(t)), (e) => Math.log(e) / t);
      })(i)),
      (o = (function (t) {
        return 10 === t ? Us : t === Math.E ? Math.exp : (e) => Math.pow(t, e);
      })(i)),
      n()[0] < 0 ? ((r = zs(r)), (o = zs(o)), t($s, Ds)) : t(Es, Cs),
      e
    );
  }
  return (
    (e.base = function (t) {
      return arguments.length ? ((i = +t), a()) : i;
    }),
    (e.domain = function (t) {
      return arguments.length ? (n(t), a()) : n();
    }),
    (e.ticks = (t) => {
      const e = n();
      let a = e[0],
        s = e[e.length - 1];
      const u = s < a;
      u && ([a, s] = [s, a]);
      let l,
        c,
        f = r(a),
        h = r(s);
      const p = null == t ? 10 : +t;
      let d = [];
      if (!(i % 1) && h - f < p) {
        if (((f = Math.floor(f)), (h = Math.ceil(h)), a > 0)) {
          for (; f <= h; ++f)
            for (l = 1; l < i; ++l)
              if (((c = f < 0 ? l / o(-f) : l * o(f)), !(c < a))) {
                if (c > s) break;
                d.push(c);
              }
        } else
          for (; f <= h; ++f)
            for (l = i - 1; l >= 1; --l)
              if (((c = f > 0 ? l / o(-f) : l * o(f)), !(c < a))) {
                if (c > s) break;
                d.push(c);
              }
        2 * d.length < p && (d = Xi(a, s, p));
      } else d = Xi(f, h, Math.min(h - f, p)).map(o);
      return u ? d.reverse() : d;
    }),
    (e.tickFormat = (t, n) => {
      if (
        (null == t && (t = 10),
        null == n && (n = 10 === i ? 's' : ','),
        'function' != typeof n &&
          (i % 1 || null != (n = bs(n)).precision || (n.trim = !0),
          (n = ks(n))),
        t === 1 / 0)
      )
        return n;
      const a = Math.max(1, (i * t) / e.ticks().length);
      return (t) => {
        let e = t / o(Math.round(r(t)));
        return (e * i < i - 0.5 && (e *= i), e <= a ? n(t) : '');
      };
    }),
    (e.nice = () =>
      n(
        As(n(), {
          floor: (t) => o(Math.floor(r(t))),
          ceil: (t) => o(Math.ceil(r(t))),
        })
      )),
    e
  );
}
function Is(t) {
  return function (e) {
    return Math.sign(e) * Math.log1p(Math.abs(e / t));
  };
}
function Ls(t) {
  return function (e) {
    return Math.sign(e) * Math.expm1(Math.abs(e)) * t;
  };
}
function Rs(t) {
  var e = 1,
    n = t(Is(e), Ls(e));
  return (
    (n.constant = function (n) {
      return arguments.length ? t(Is((e = +n)), Ls(e)) : e;
    }),
    Ps(n)
  );
}
function qs(t) {
  return function (e) {
    return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t);
  };
}
function Ws(t) {
  return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t);
}
function Hs(t) {
  return t < 0 ? -t * t : t * t;
}
function Bs(t) {
  var e = t(ss, ss),
    n = 1;
  return (
    (e.exponent = function (e) {
      return arguments.length
        ? 1 === (n = +e)
          ? t(ss, ss)
          : 0.5 === n
            ? t(Ws, Hs)
            : t(qs(n), qs(1 / n))
        : n;
    }),
    Ps(e)
  );
}
function Ys() {
  var t = Bs(hs());
  return (
    (t.copy = function () {
      return fs(t, Ys()).exponent(t.exponent());
    }),
    ia.apply(t, arguments),
    t
  );
}
function Vs(t) {
  return Math.sign(t) * t * t;
}
((Ms = js({ thousands: ',', grouping: [3], currency: ['$', ''] })),
  (ks = Ms.format),
  (Ts = Ms.formatPrefix));
const Gs = new Date(),
  Ks = new Date();
function Zs(t, e, n, r) {
  function o(e) {
    return (t((e = 0 === arguments.length ? new Date() : new Date(+e))), e);
  }
  return (
    (o.floor = (e) => (t((e = new Date(+e))), e)),
    (o.ceil = (n) => (t((n = new Date(n - 1))), e(n, 1), t(n), n)),
    (o.round = (t) => {
      const e = o(t),
        n = o.ceil(t);
      return t - e < n - t ? e : n;
    }),
    (o.offset = (t, n) => (
      e((t = new Date(+t)), null == n ? 1 : Math.floor(n)),
      t
    )),
    (o.range = (n, r, i) => {
      const a = [];
      if (
        ((n = o.ceil(n)),
        (i = null == i ? 1 : Math.floor(i)),
        !(n < r && i > 0))
      )
        return a;
      let s;
      do {
        (a.push((s = new Date(+n))), e(n, i), t(n));
      } while (s < n && n < r);
      return a;
    }),
    (o.filter = (n) =>
      Zs(
        (e) => {
          if (e >= e) for (; t(e), !n(e); ) e.setTime(e - 1);
        },
        (t, r) => {
          if (t >= t)
            if (r < 0) for (; ++r <= 0; ) for (; e(t, -1), !n(t); );
            else for (; --r >= 0; ) for (; e(t, 1), !n(t); );
        }
      )),
    n &&
      ((o.count = (e, r) => (
        Gs.setTime(+e),
        Ks.setTime(+r),
        t(Gs),
        t(Ks),
        Math.floor(n(Gs, Ks))
      )),
      (o.every = (t) => (
        (t = Math.floor(t)),
        isFinite(t) && t > 0
          ? t > 1
            ? o.filter(
                r ? (e) => r(e) % t === 0 : (e) => o.count(0, e) % t === 0
              )
            : o
          : null
      ))),
    o
  );
}
const Xs = Zs(
  () => {},
  (t, e) => {
    t.setTime(+t + e);
  },
  (t, e) => e - t
);
((Xs.every = (t) => (
  (t = Math.floor(t)),
  isFinite(t) && t > 0
    ? t > 1
      ? Zs(
          (e) => {
            e.setTime(Math.floor(e / t) * t);
          },
          (e, n) => {
            e.setTime(+e + n * t);
          },
          (e, n) => (n - e) / t
        )
      : Xs
    : null
)),
  Xs.range);
const Qs = 1e3,
  Js = 6e4,
  tu = 36e5,
  eu = 864e5,
  nu = 6048e5,
  ru = 2592e6,
  ou = 31536e6,
  iu = Zs(
    (t) => {
      t.setTime(t - t.getMilliseconds());
    },
    (t, e) => {
      t.setTime(+t + e * Qs);
    },
    (t, e) => (e - t) / Qs,
    (t) => t.getUTCSeconds()
  );
iu.range;
const au = Zs(
  (t) => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * Qs);
  },
  (t, e) => {
    t.setTime(+t + e * Js);
  },
  (t, e) => (e - t) / Js,
  (t) => t.getMinutes()
);
au.range;
const su = Zs(
  (t) => {
    t.setUTCSeconds(0, 0);
  },
  (t, e) => {
    t.setTime(+t + e * Js);
  },
  (t, e) => (e - t) / Js,
  (t) => t.getUTCMinutes()
);
su.range;
const uu = Zs(
  (t) => {
    t.setTime(
      t - t.getMilliseconds() - t.getSeconds() * Qs - t.getMinutes() * Js
    );
  },
  (t, e) => {
    t.setTime(+t + e * tu);
  },
  (t, e) => (e - t) / tu,
  (t) => t.getHours()
);
uu.range;
const lu = Zs(
  (t) => {
    t.setUTCMinutes(0, 0, 0);
  },
  (t, e) => {
    t.setTime(+t + e * tu);
  },
  (t, e) => (e - t) / tu,
  (t) => t.getUTCHours()
);
lu.range;
const cu = Zs(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * Js) / eu,
  (t) => t.getDate() - 1
);
cu.range;
const fu = Zs(
  (t) => {
    t.setUTCHours(0, 0, 0, 0);
  },
  (t, e) => {
    t.setUTCDate(t.getUTCDate() + e);
  },
  (t, e) => (e - t) / eu,
  (t) => t.getUTCDate() - 1
);
fu.range;
const hu = Zs(
  (t) => {
    t.setUTCHours(0, 0, 0, 0);
  },
  (t, e) => {
    t.setUTCDate(t.getUTCDate() + e);
  },
  (t, e) => (e - t) / eu,
  (t) => Math.floor(t / eu)
);
function pu(t) {
  return Zs(
    (e) => {
      (e.setDate(e.getDate() - ((e.getDay() + 7 - t) % 7)),
        e.setHours(0, 0, 0, 0));
    },
    (t, e) => {
      t.setDate(t.getDate() + 7 * e);
    },
    (t, e) =>
      (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * Js) / nu
  );
}
hu.range;
const du = pu(0),
  gu = pu(1),
  yu = pu(2),
  mu = pu(3),
  bu = pu(4),
  vu = pu(5),
  wu = pu(6);
function _u(t) {
  return Zs(
    (e) => {
      (e.setUTCDate(e.getUTCDate() - ((e.getUTCDay() + 7 - t) % 7)),
        e.setUTCHours(0, 0, 0, 0));
    },
    (t, e) => {
      t.setUTCDate(t.getUTCDate() + 7 * e);
    },
    (t, e) => (e - t) / nu
  );
}
(du.range, gu.range, yu.range, mu.range, bu.range, vu.range, wu.range);
const xu = _u(0),
  Mu = _u(1),
  ku = _u(2),
  Tu = _u(3),
  Su = _u(4),
  Ou = _u(5),
  ju = _u(6);
(xu.range, Mu.range, ku.range, Tu.range, Su.range, Ou.range, ju.range);
const Nu = Zs(
  (t) => {
    (t.setDate(1), t.setHours(0, 0, 0, 0));
  },
  (t, e) => {
    t.setMonth(t.getMonth() + e);
  },
  (t, e) =>
    e.getMonth() - t.getMonth() + 12 * (e.getFullYear() - t.getFullYear()),
  (t) => t.getMonth()
);
Nu.range;
const Pu = Zs(
  (t) => {
    (t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0));
  },
  (t, e) => {
    t.setUTCMonth(t.getUTCMonth() + e);
  },
  (t, e) =>
    e.getUTCMonth() -
    t.getUTCMonth() +
    12 * (e.getUTCFullYear() - t.getUTCFullYear()),
  (t) => t.getUTCMonth()
);
Pu.range;
const Au = Zs(
  (t) => {
    (t.setMonth(0, 1), t.setHours(0, 0, 0, 0));
  },
  (t, e) => {
    t.setFullYear(t.getFullYear() + e);
  },
  (t, e) => e.getFullYear() - t.getFullYear(),
  (t) => t.getFullYear()
);
((Au.every = (t) =>
  isFinite((t = Math.floor(t))) && t > 0
    ? Zs(
        (e) => {
          (e.setFullYear(Math.floor(e.getFullYear() / t) * t),
            e.setMonth(0, 1),
            e.setHours(0, 0, 0, 0));
        },
        (e, n) => {
          e.setFullYear(e.getFullYear() + n * t);
        }
      )
    : null),
  Au.range);
const Eu = Zs(
  (t) => {
    (t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0));
  },
  (t, e) => {
    t.setUTCFullYear(t.getUTCFullYear() + e);
  },
  (t, e) => e.getUTCFullYear() - t.getUTCFullYear(),
  (t) => t.getUTCFullYear()
);
function Cu(t, e, n, r, o, i) {
  const a = [
    [iu, 1, Qs],
    [iu, 5, 5e3],
    [iu, 15, 15e3],
    [iu, 30, 3e4],
    [i, 1, Js],
    [i, 5, 3e5],
    [i, 15, 9e5],
    [i, 30, 18e5],
    [o, 1, tu],
    [o, 3, 108e5],
    [o, 6, 216e5],
    [o, 12, 432e5],
    [r, 1, eu],
    [r, 2, 1728e5],
    [n, 1, nu],
    [e, 1, ru],
    [e, 3, 7776e6],
    [t, 1, ou],
  ];
  function s(e, n, r) {
    const o = Math.abs(n - e) / r,
      i = Ii(([, , t]) => t).right(a, o);
    if (i === a.length) return t.every(Ji(e / ou, n / ou, r));
    if (0 === i) return Xs.every(Math.max(Ji(e, n, r), 1));
    const [s, u] = a[o / a[i - 1][2] < a[i][2] / o ? i - 1 : i];
    return s.every(u);
  }
  return [
    function (t, e, n) {
      const r = e < t;
      r && ([t, e] = [e, t]);
      const o = n && 'function' == typeof n.range ? n : s(t, e, n),
        i = o ? o.range(t, +e + 1) : [];
      return r ? i.reverse() : i;
    },
    s,
  ];
}
((Eu.every = (t) =>
  isFinite((t = Math.floor(t))) && t > 0
    ? Zs(
        (e) => {
          (e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t),
            e.setUTCMonth(0, 1),
            e.setUTCHours(0, 0, 0, 0));
        },
        (e, n) => {
          e.setUTCFullYear(e.getUTCFullYear() + n * t);
        }
      )
    : null),
  Eu.range);
const [$u, Du] = Cu(Eu, Pu, xu, hu, lu, su),
  [Uu, zu] = Cu(Au, Nu, du, cu, uu, au);
function Fu(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return (e.setFullYear(t.y), e);
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Iu(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return (e.setUTCFullYear(t.y), e);
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Lu(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
var Ru,
  qu,
  Wu,
  Hu = { '-': '', _: ' ', 0: '0' },
  Bu = /^\s*\d+/,
  Yu = /^%/,
  Vu = /[\\^$*+?|[\]().{}]/g;
function Gu(t, e, n) {
  var r = t < 0 ? '-' : '',
    o = (r ? -t : t) + '',
    i = o.length;
  return r + (i < n ? new Array(n - i + 1).join(e) + o : o);
}
function Ku(t) {
  return t.replace(Vu, '\\$&');
}
function Zu(t) {
  return new RegExp('^(?:' + t.map(Ku).join('|') + ')', 'i');
}
function Xu(t) {
  return new Map(t.map((t, e) => [t.toLowerCase(), e]));
}
function Qu(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 1));
  return r ? ((t.w = +r[0]), n + r[0].length) : -1;
}
function Ju(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 1));
  return r ? ((t.u = +r[0]), n + r[0].length) : -1;
}
function tl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.U = +r[0]), n + r[0].length) : -1;
}
function el(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.V = +r[0]), n + r[0].length) : -1;
}
function nl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.W = +r[0]), n + r[0].length) : -1;
}
function rl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 4));
  return r ? ((t.y = +r[0]), n + r[0].length) : -1;
}
function ol(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function il(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r
    ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || '00'))), n + r[0].length)
    : -1;
}
function al(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 1));
  return r ? ((t.q = 3 * r[0] - 3), n + r[0].length) : -1;
}
function sl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.m = r[0] - 1), n + r[0].length) : -1;
}
function ul(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.d = +r[0]), n + r[0].length) : -1;
}
function ll(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 3));
  return r ? ((t.m = 0), (t.d = +r[0]), n + r[0].length) : -1;
}
function cl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.H = +r[0]), n + r[0].length) : -1;
}
function fl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.M = +r[0]), n + r[0].length) : -1;
}
function hl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 2));
  return r ? ((t.S = +r[0]), n + r[0].length) : -1;
}
function pl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 3));
  return r ? ((t.L = +r[0]), n + r[0].length) : -1;
}
function dl(t, e, n) {
  var r = Bu.exec(e.slice(n, n + 6));
  return r ? ((t.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function gl(t, e, n) {
  var r = Yu.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function yl(t, e, n) {
  var r = Bu.exec(e.slice(n));
  return r ? ((t.Q = +r[0]), n + r[0].length) : -1;
}
function ml(t, e, n) {
  var r = Bu.exec(e.slice(n));
  return r ? ((t.s = +r[0]), n + r[0].length) : -1;
}
function bl(t, e) {
  return Gu(t.getDate(), e, 2);
}
function vl(t, e) {
  return Gu(t.getHours(), e, 2);
}
function wl(t, e) {
  return Gu(t.getHours() % 12 || 12, e, 2);
}
function _l(t, e) {
  return Gu(1 + cu.count(Au(t), t), e, 3);
}
function xl(t, e) {
  return Gu(t.getMilliseconds(), e, 3);
}
function Ml(t, e) {
  return xl(t, e) + '000';
}
function kl(t, e) {
  return Gu(t.getMonth() + 1, e, 2);
}
function Tl(t, e) {
  return Gu(t.getMinutes(), e, 2);
}
function Sl(t, e) {
  return Gu(t.getSeconds(), e, 2);
}
function Ol(t) {
  var e = t.getDay();
  return 0 === e ? 7 : e;
}
function jl(t, e) {
  return Gu(du.count(Au(t) - 1, t), e, 2);
}
function Nl(t) {
  var e = t.getDay();
  return e >= 4 || 0 === e ? bu(t) : bu.ceil(t);
}
function Pl(t, e) {
  return ((t = Nl(t)), Gu(bu.count(Au(t), t) + (4 === Au(t).getDay()), e, 2));
}
function Al(t) {
  return t.getDay();
}
function El(t, e) {
  return Gu(gu.count(Au(t) - 1, t), e, 2);
}
function Cl(t, e) {
  return Gu(t.getFullYear() % 100, e, 2);
}
function $l(t, e) {
  return Gu((t = Nl(t)).getFullYear() % 100, e, 2);
}
function Dl(t, e) {
  return Gu(t.getFullYear() % 1e4, e, 4);
}
function Ul(t, e) {
  var n = t.getDay();
  return Gu(
    (t = n >= 4 || 0 === n ? bu(t) : bu.ceil(t)).getFullYear() % 1e4,
    e,
    4
  );
}
function zl(t) {
  var e = t.getTimezoneOffset();
  return (
    (e > 0 ? '-' : ((e *= -1), '+')) +
    Gu((e / 60) | 0, '0', 2) +
    Gu(e % 60, '0', 2)
  );
}
function Fl(t, e) {
  return Gu(t.getUTCDate(), e, 2);
}
function Il(t, e) {
  return Gu(t.getUTCHours(), e, 2);
}
function Ll(t, e) {
  return Gu(t.getUTCHours() % 12 || 12, e, 2);
}
function Rl(t, e) {
  return Gu(1 + fu.count(Eu(t), t), e, 3);
}
function ql(t, e) {
  return Gu(t.getUTCMilliseconds(), e, 3);
}
function Wl(t, e) {
  return ql(t, e) + '000';
}
function Hl(t, e) {
  return Gu(t.getUTCMonth() + 1, e, 2);
}
function Bl(t, e) {
  return Gu(t.getUTCMinutes(), e, 2);
}
function Yl(t, e) {
  return Gu(t.getUTCSeconds(), e, 2);
}
function Vl(t) {
  var e = t.getUTCDay();
  return 0 === e ? 7 : e;
}
function Gl(t, e) {
  return Gu(xu.count(Eu(t) - 1, t), e, 2);
}
function Kl(t) {
  var e = t.getUTCDay();
  return e >= 4 || 0 === e ? Su(t) : Su.ceil(t);
}
function Zl(t, e) {
  return (
    (t = Kl(t)),
    Gu(Su.count(Eu(t), t) + (4 === Eu(t).getUTCDay()), e, 2)
  );
}
function Xl(t) {
  return t.getUTCDay();
}
function Ql(t, e) {
  return Gu(Mu.count(Eu(t) - 1, t), e, 2);
}
function Jl(t, e) {
  return Gu(t.getUTCFullYear() % 100, e, 2);
}
function tc(t, e) {
  return Gu((t = Kl(t)).getUTCFullYear() % 100, e, 2);
}
function ec(t, e) {
  return Gu(t.getUTCFullYear() % 1e4, e, 4);
}
function nc(t, e) {
  var n = t.getUTCDay();
  return Gu(
    (t = n >= 4 || 0 === n ? Su(t) : Su.ceil(t)).getUTCFullYear() % 1e4,
    e,
    4
  );
}
function rc() {
  return '+0000';
}
function oc() {
  return '%';
}
function ic(t) {
  return +t;
}
function ac(t) {
  return Math.floor(+t / 1e3);
}
function sc(t) {
  return new Date(t);
}
function uc(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function lc(t, e, n, r, o, i, a, s, u, l) {
  var c = ps(),
    f = c.invert,
    h = c.domain,
    p = l('.%L'),
    d = l(':%S'),
    g = l('%I:%M'),
    y = l('%I %p'),
    m = l('%a %d'),
    b = l('%b %d'),
    v = l('%B'),
    w = l('%Y');
  function _(t) {
    return (
      u(t) < t
        ? p
        : s(t) < t
          ? d
          : a(t) < t
            ? g
            : i(t) < t
              ? y
              : r(t) < t
                ? o(t) < t
                  ? m
                  : b
                : n(t) < t
                  ? v
                  : w
    )(t);
  }
  return (
    (c.invert = function (t) {
      return new Date(f(t));
    }),
    (c.domain = function (t) {
      return arguments.length ? h(Array.from(t, uc)) : h().map(sc);
    }),
    (c.ticks = function (e) {
      var n = h();
      return t(n[0], n[n.length - 1], null == e ? 10 : e);
    }),
    (c.tickFormat = function (t, e) {
      return null == e ? _ : l(e);
    }),
    (c.nice = function (t) {
      var n = h();
      return (
        (t && 'function' == typeof t.range) ||
          (t = e(n[0], n[n.length - 1], null == t ? 10 : t)),
        t ? h(As(n, t)) : c
      );
    }),
    (c.copy = function () {
      return fs(c, lc(t, e, n, r, o, i, a, s, u, l));
    }),
    c
  );
}
function cc() {
  var t,
    e,
    n,
    r,
    o,
    i = 0,
    a = 1,
    s = ss,
    u = !1;
  function l(e) {
    return null == e || isNaN((e = +e))
      ? o
      : s(
          0 === n
            ? 0.5
            : ((e = (r(e) - t) * n), u ? Math.max(0, Math.min(1, e)) : e)
        );
  }
  function c(t) {
    return function (e) {
      var n, r;
      return arguments.length ? (([n, r] = e), (s = t(n, r)), l) : [s(0), s(1)];
    };
  }
  return (
    (l.domain = function (o) {
      return arguments.length
        ? (([i, a] = o),
          (t = r((i = +i))),
          (e = r((a = +a))),
          (n = t === e ? 0 : 1 / (e - t)),
          l)
        : [i, a];
    }),
    (l.clamp = function (t) {
      return arguments.length ? ((u = !!t), l) : u;
    }),
    (l.interpolator = function (t) {
      return arguments.length ? ((s = t), l) : s;
    }),
    (l.range = c(rs)),
    (l.rangeRound = c(os)),
    (l.unknown = function (t) {
      return arguments.length ? ((o = t), l) : o;
    }),
    function (o) {
      return (
        (r = o),
        (t = o(i)),
        (e = o(a)),
        (n = t === e ? 0 : 1 / (e - t)),
        l
      );
    }
  );
}
function fc(t, e) {
  return e
    .domain(t.domain())
    .interpolator(t.interpolator())
    .clamp(t.clamp())
    .unknown(t.unknown());
}
function hc() {
  var t = Bs(cc());
  return (
    (t.copy = function () {
      return fc(t, hc()).exponent(t.exponent());
    }),
    aa.apply(t, arguments)
  );
}
function pc() {
  var t,
    e,
    n,
    r,
    o,
    i,
    a,
    s = 0,
    u = 0.5,
    l = 1,
    c = 1,
    f = ss,
    h = !1;
  function p(t) {
    return isNaN((t = +t))
      ? a
      : ((t = 0.5 + ((t = +i(t)) - e) * (c * t < c * e ? r : o)),
        f(h ? Math.max(0, Math.min(1, t)) : t));
  }
  function d(t) {
    return function (e) {
      var n, r, o;
      return arguments.length
        ? (([n, r, o] = e),
          (f = (function (t, e) {
            void 0 === e && ((e = t), (t = rs));
            for (
              var n = 0,
                r = e.length - 1,
                o = e[0],
                i = new Array(r < 0 ? 0 : r);
              n < r;

            )
              i[n] = t(o, (o = e[++n]));
            return function (t) {
              var e = Math.max(0, Math.min(r - 1, Math.floor((t *= r))));
              return i[e](t - e);
            };
          })(t, [n, r, o])),
          p)
        : [f(0), f(0.5), f(1)];
    };
  }
  return (
    (p.domain = function (a) {
      return arguments.length
        ? (([s, u, l] = a),
          (t = i((s = +s))),
          (e = i((u = +u))),
          (n = i((l = +l))),
          (r = t === e ? 0 : 0.5 / (e - t)),
          (o = e === n ? 0 : 0.5 / (n - e)),
          (c = e < t ? -1 : 1),
          p)
        : [s, u, l];
    }),
    (p.clamp = function (t) {
      return arguments.length ? ((h = !!t), p) : h;
    }),
    (p.interpolator = function (t) {
      return arguments.length ? ((f = t), p) : f;
    }),
    (p.range = d(rs)),
    (p.rangeRound = d(os)),
    (p.unknown = function (t) {
      return arguments.length ? ((a = t), p) : a;
    }),
    function (a) {
      return (
        (i = a),
        (t = a(s)),
        (e = a(u)),
        (n = a(l)),
        (r = t === e ? 0 : 0.5 / (e - t)),
        (o = e === n ? 0 : 0.5 / (n - e)),
        (c = e < t ? -1 : 1),
        p
      );
    }
  );
}
function dc() {
  var t = Bs(pc());
  return (
    (t.copy = function () {
      return fc(t, dc()).exponent(t.exponent());
    }),
    aa.apply(t, arguments)
  );
}
!(function (t) {
  ((Ru = (function (t) {
    var e = t.dateTime,
      n = t.date,
      r = t.time,
      o = t.periods,
      i = t.days,
      a = t.shortDays,
      s = t.months,
      u = t.shortMonths,
      l = Zu(o),
      c = Xu(o),
      f = Zu(i),
      h = Xu(i),
      p = Zu(a),
      d = Xu(a),
      g = Zu(s),
      y = Xu(s),
      m = Zu(u),
      b = Xu(u),
      v = {
        a: function (t) {
          return a[t.getDay()];
        },
        A: function (t) {
          return i[t.getDay()];
        },
        b: function (t) {
          return u[t.getMonth()];
        },
        B: function (t) {
          return s[t.getMonth()];
        },
        c: null,
        d: bl,
        e: bl,
        f: Ml,
        g: $l,
        G: Ul,
        H: vl,
        I: wl,
        j: _l,
        L: xl,
        m: kl,
        M: Tl,
        p: function (t) {
          return o[+(t.getHours() >= 12)];
        },
        q: function (t) {
          return 1 + ~~(t.getMonth() / 3);
        },
        Q: ic,
        s: ac,
        S: Sl,
        u: Ol,
        U: jl,
        V: Pl,
        w: Al,
        W: El,
        x: null,
        X: null,
        y: Cl,
        Y: Dl,
        Z: zl,
        '%': oc,
      },
      w = {
        a: function (t) {
          return a[t.getUTCDay()];
        },
        A: function (t) {
          return i[t.getUTCDay()];
        },
        b: function (t) {
          return u[t.getUTCMonth()];
        },
        B: function (t) {
          return s[t.getUTCMonth()];
        },
        c: null,
        d: Fl,
        e: Fl,
        f: Wl,
        g: tc,
        G: nc,
        H: Il,
        I: Ll,
        j: Rl,
        L: ql,
        m: Hl,
        M: Bl,
        p: function (t) {
          return o[+(t.getUTCHours() >= 12)];
        },
        q: function (t) {
          return 1 + ~~(t.getUTCMonth() / 3);
        },
        Q: ic,
        s: ac,
        S: Yl,
        u: Vl,
        U: Gl,
        V: Zl,
        w: Xl,
        W: Ql,
        x: null,
        X: null,
        y: Jl,
        Y: ec,
        Z: rc,
        '%': oc,
      },
      _ = {
        a: function (t, e, n) {
          var r = p.exec(e.slice(n));
          return r ? ((t.w = d.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        A: function (t, e, n) {
          var r = f.exec(e.slice(n));
          return r ? ((t.w = h.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        b: function (t, e, n) {
          var r = m.exec(e.slice(n));
          return r ? ((t.m = b.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        B: function (t, e, n) {
          var r = g.exec(e.slice(n));
          return r ? ((t.m = y.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        c: function (t, n, r) {
          return k(t, e, n, r);
        },
        d: ul,
        e: ul,
        f: dl,
        g: ol,
        G: rl,
        H: cl,
        I: cl,
        j: ll,
        L: pl,
        m: sl,
        M: fl,
        p: function (t, e, n) {
          var r = l.exec(e.slice(n));
          return r ? ((t.p = c.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        q: al,
        Q: yl,
        s: ml,
        S: hl,
        u: Ju,
        U: tl,
        V: el,
        w: Qu,
        W: nl,
        x: function (t, e, r) {
          return k(t, n, e, r);
        },
        X: function (t, e, n) {
          return k(t, r, e, n);
        },
        y: ol,
        Y: rl,
        Z: il,
        '%': gl,
      };
    function x(t, e) {
      return function (n) {
        var r,
          o,
          i,
          a = [],
          s = -1,
          u = 0,
          l = t.length;
        for (n instanceof Date || (n = new Date(+n)); ++s < l; )
          37 === t.charCodeAt(s) &&
            (a.push(t.slice(u, s)),
            null != (o = Hu[(r = t.charAt(++s))])
              ? (r = t.charAt(++s))
              : (o = 'e' === r ? ' ' : '0'),
            (i = e[r]) && (r = i(n, o)),
            a.push(r),
            (u = s + 1));
        return (a.push(t.slice(u, s)), a.join(''));
      };
    }
    function M(t, e) {
      return function (n) {
        var r,
          o,
          i = Lu(1900, void 0, 1);
        if (k(i, t, (n += ''), 0) != n.length) return null;
        if ('Q' in i) return new Date(i.Q);
        if ('s' in i) return new Date(1e3 * i.s + ('L' in i ? i.L : 0));
        if (
          (e && !('Z' in i) && (i.Z = 0),
          'p' in i && (i.H = (i.H % 12) + 12 * i.p),
          void 0 === i.m && (i.m = 'q' in i ? i.q : 0),
          'V' in i)
        ) {
          if (i.V < 1 || i.V > 53) return null;
          ('w' in i || (i.w = 1),
            'Z' in i
              ? ((o = (r = Iu(Lu(i.y, 0, 1))).getUTCDay()),
                (r = o > 4 || 0 === o ? Mu.ceil(r) : Mu(r)),
                (r = fu.offset(r, 7 * (i.V - 1))),
                (i.y = r.getUTCFullYear()),
                (i.m = r.getUTCMonth()),
                (i.d = r.getUTCDate() + ((i.w + 6) % 7)))
              : ((o = (r = Fu(Lu(i.y, 0, 1))).getDay()),
                (r = o > 4 || 0 === o ? gu.ceil(r) : gu(r)),
                (r = cu.offset(r, 7 * (i.V - 1))),
                (i.y = r.getFullYear()),
                (i.m = r.getMonth()),
                (i.d = r.getDate() + ((i.w + 6) % 7))));
        } else
          ('W' in i || 'U' in i) &&
            ('w' in i || (i.w = 'u' in i ? i.u % 7 : 'W' in i ? 1 : 0),
            (o =
              'Z' in i
                ? Iu(Lu(i.y, 0, 1)).getUTCDay()
                : Fu(Lu(i.y, 0, 1)).getDay()),
            (i.m = 0),
            (i.d =
              'W' in i
                ? ((i.w + 6) % 7) + 7 * i.W - ((o + 5) % 7)
                : i.w + 7 * i.U - ((o + 6) % 7)));
        return 'Z' in i
          ? ((i.H += (i.Z / 100) | 0), (i.M += i.Z % 100), Iu(i))
          : Fu(i);
      };
    }
    function k(t, e, n, r) {
      for (var o, i, a = 0, s = e.length, u = n.length; a < s; ) {
        if (r >= u) return -1;
        if (37 === (o = e.charCodeAt(a++))) {
          if (
            ((o = e.charAt(a++)),
            !(i = _[o in Hu ? e.charAt(a++) : o]) || (r = i(t, n, r)) < 0)
          )
            return -1;
        } else if (o != n.charCodeAt(r++)) return -1;
      }
      return r;
    }
    return (
      (v.x = x(n, v)),
      (v.X = x(r, v)),
      (v.c = x(e, v)),
      (w.x = x(n, w)),
      (w.X = x(r, w)),
      (w.c = x(e, w)),
      {
        format: function (t) {
          var e = x((t += ''), v);
          return (
            (e.toString = function () {
              return t;
            }),
            e
          );
        },
        parse: function (t) {
          var e = M((t += ''), !1);
          return (
            (e.toString = function () {
              return t;
            }),
            e
          );
        },
        utcFormat: function (t) {
          var e = x((t += ''), w);
          return (
            (e.toString = function () {
              return t;
            }),
            e
          );
        },
        utcParse: function (t) {
          var e = M((t += ''), !0);
          return (
            (e.toString = function () {
              return t;
            }),
            e
          );
        },
      }
    );
  })(t)),
    (qu = Ru.format),
    Ru.parse,
    (Wu = Ru.utcFormat),
    Ru.utcParse);
})({
  dateTime: '%x, %X',
  date: '%-m/%-d/%Y',
  time: '%-I:%M:%S %p',
  periods: ['AM', 'PM'],
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
});
const gc = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      scaleBand: la,
      scaleDiverging: function t() {
        var e = Ps(pc()(ss));
        return (
          (e.copy = function () {
            return fc(e, t());
          }),
          aa.apply(e, arguments)
        );
      },
      scaleDivergingLog: function t() {
        var e = Fs(pc()).domain([0.1, 1, 10]);
        return (
          (e.copy = function () {
            return fc(e, t()).base(e.base());
          }),
          aa.apply(e, arguments)
        );
      },
      scaleDivergingPow: dc,
      scaleDivergingSqrt: function () {
        return dc.apply(null, arguments).exponent(0.5);
      },
      scaleDivergingSymlog: function t() {
        var e = Rs(pc());
        return (
          (e.copy = function () {
            return fc(e, t()).constant(e.constant());
          }),
          aa.apply(e, arguments)
        );
      },
      scaleIdentity: function t(e) {
        var n;
        function r(t) {
          return null == t || isNaN((t = +t)) ? n : t;
        }
        return (
          (r.invert = r),
          (r.domain = r.range =
            function (t) {
              return arguments.length
                ? ((e = Array.from(t, is)), r)
                : e.slice();
            }),
          (r.unknown = function (t) {
            return arguments.length ? ((n = t), r) : n;
          }),
          (r.copy = function () {
            return t(e).unknown(n);
          }),
          (e = arguments.length ? Array.from(e, is) : [0, 1]),
          Ps(r)
        );
      },
      scaleImplicit: sa,
      scaleLinear: function t() {
        var e = ps();
        return (
          (e.copy = function () {
            return fs(e, t());
          }),
          ia.apply(e, arguments),
          Ps(e)
        );
      },
      scaleLog: function t() {
        const e = Fs(hs()).domain([1, 10]);
        return (
          (e.copy = () => fs(e, t()).base(e.base())),
          ia.apply(e, arguments),
          e
        );
      },
      scaleOrdinal: ua,
      scalePoint: function () {
        return ca(la.apply(null, arguments).paddingInner(1));
      },
      scalePow: Ys,
      scaleQuantile: function t() {
        var e,
          n = [],
          r = [],
          o = [];
        function i() {
          var t = 0,
            e = Math.max(1, r.length);
          for (o = new Array(e - 1); ++t < e; ) o[t - 1] = oa(n, t / e);
          return a;
        }
        function a(t) {
          return null == t || isNaN((t = +t)) ? e : r[qi(o, t)];
        }
        return (
          (a.invertExtent = function (t) {
            var e = r.indexOf(t);
            return e < 0
              ? [NaN, NaN]
              : [
                  e > 0 ? o[e - 1] : n[0],
                  e < o.length ? o[e] : n[n.length - 1],
                ];
          }),
          (a.domain = function (t) {
            if (!arguments.length) return n.slice();
            n = [];
            for (let e of t) null == e || isNaN((e = +e)) || n.push(e);
            return (n.sort(zi), i());
          }),
          (a.range = function (t) {
            return arguments.length ? ((r = Array.from(t)), i()) : r.slice();
          }),
          (a.unknown = function (t) {
            return arguments.length ? ((e = t), a) : e;
          }),
          (a.quantiles = function () {
            return o.slice();
          }),
          (a.copy = function () {
            return t().domain(n).range(r).unknown(e);
          }),
          ia.apply(a, arguments)
        );
      },
      scaleQuantize: function t() {
        var e,
          n = 0,
          r = 1,
          o = 1,
          i = [0.5],
          a = [0, 1];
        function s(t) {
          return null != t && t <= t ? a[qi(i, t, 0, o)] : e;
        }
        function u() {
          var t = -1;
          for (i = new Array(o); ++t < o; )
            i[t] = ((t + 1) * r - (t - o) * n) / (o + 1);
          return s;
        }
        return (
          (s.domain = function (t) {
            return arguments.length
              ? (([n, r] = t), (n = +n), (r = +r), u())
              : [n, r];
          }),
          (s.range = function (t) {
            return arguments.length
              ? ((o = (a = Array.from(t)).length - 1), u())
              : a.slice();
          }),
          (s.invertExtent = function (t) {
            var e = a.indexOf(t);
            return e < 0
              ? [NaN, NaN]
              : e < 1
                ? [n, i[0]]
                : e >= o
                  ? [i[o - 1], r]
                  : [i[e - 1], i[e]];
          }),
          (s.unknown = function (t) {
            return arguments.length ? ((e = t), s) : s;
          }),
          (s.thresholds = function () {
            return i.slice();
          }),
          (s.copy = function () {
            return t().domain([n, r]).range(a).unknown(e);
          }),
          ia.apply(Ps(s), arguments)
        );
      },
      scaleRadial: function t() {
        var e,
          n = ps(),
          r = [0, 1],
          o = !1;
        function i(t) {
          var r = (function (t) {
            return Math.sign(t) * Math.sqrt(Math.abs(t));
          })(n(t));
          return isNaN(r) ? e : o ? Math.round(r) : r;
        }
        return (
          (i.invert = function (t) {
            return n.invert(Vs(t));
          }),
          (i.domain = function (t) {
            return arguments.length ? (n.domain(t), i) : n.domain();
          }),
          (i.range = function (t) {
            return arguments.length
              ? (n.range((r = Array.from(t, is)).map(Vs)), i)
              : r.slice();
          }),
          (i.rangeRound = function (t) {
            return i.range(t).round(!0);
          }),
          (i.round = function (t) {
            return arguments.length ? ((o = !!t), i) : o;
          }),
          (i.clamp = function (t) {
            return arguments.length ? (n.clamp(t), i) : n.clamp();
          }),
          (i.unknown = function (t) {
            return arguments.length ? ((e = t), i) : e;
          }),
          (i.copy = function () {
            return t(n.domain(), r).round(o).clamp(n.clamp()).unknown(e);
          }),
          ia.apply(i, arguments),
          Ps(i)
        );
      },
      scaleSequential: function t() {
        var e = Ps(cc()(ss));
        return (
          (e.copy = function () {
            return fc(e, t());
          }),
          aa.apply(e, arguments)
        );
      },
      scaleSequentialLog: function t() {
        var e = Fs(cc()).domain([1, 10]);
        return (
          (e.copy = function () {
            return fc(e, t()).base(e.base());
          }),
          aa.apply(e, arguments)
        );
      },
      scaleSequentialPow: hc,
      scaleSequentialQuantile: function t() {
        var e = [],
          n = ss;
        function r(t) {
          if (null != t && !isNaN((t = +t)))
            return n((qi(e, t, 1) - 1) / (e.length - 1));
        }
        return (
          (r.domain = function (t) {
            if (!arguments.length) return e.slice();
            e = [];
            for (let n of t) null == n || isNaN((n = +n)) || e.push(n);
            return (e.sort(zi), r);
          }),
          (r.interpolator = function (t) {
            return arguments.length ? ((n = t), r) : n;
          }),
          (r.range = function () {
            return e.map((t, r) => n(r / (e.length - 1)));
          }),
          (r.quantiles = function (t) {
            return Array.from({ length: t + 1 }, (n, r) =>
              (function (t, e) {
                if (
                  (n = (t = Float64Array.from(
                    (function* (t) {
                      for (let e of t) null != e && (e = +e) >= e && (yield e);
                    })(t)
                  )).length) &&
                  !isNaN((e = +e))
                ) {
                  if (e <= 0 || n < 2) return ea(t);
                  if (e >= 1) return ta(t);
                  var n,
                    r = (n - 1) * e,
                    o = Math.floor(r),
                    i = ta(na(t, o).subarray(0, o + 1));
                  return i + (ea(t.subarray(o + 1)) - i) * (r - o);
                }
              })(e, r / t)
            );
          }),
          (r.copy = function () {
            return t(n).domain(e);
          }),
          aa.apply(r, arguments)
        );
      },
      scaleSequentialSqrt: function () {
        return hc.apply(null, arguments).exponent(0.5);
      },
      scaleSequentialSymlog: function t() {
        var e = Rs(cc());
        return (
          (e.copy = function () {
            return fc(e, t()).constant(e.constant());
          }),
          aa.apply(e, arguments)
        );
      },
      scaleSqrt: function () {
        return Ys.apply(null, arguments).exponent(0.5);
      },
      scaleSymlog: function t() {
        var e = Rs(hs());
        return (
          (e.copy = function () {
            return fs(e, t()).constant(e.constant());
          }),
          ia.apply(e, arguments)
        );
      },
      scaleThreshold: function t() {
        var e,
          n = [0.5],
          r = [0, 1],
          o = 1;
        function i(t) {
          return null != t && t <= t ? r[qi(n, t, 0, o)] : e;
        }
        return (
          (i.domain = function (t) {
            return arguments.length
              ? ((n = Array.from(t)), (o = Math.min(n.length, r.length - 1)), i)
              : n.slice();
          }),
          (i.range = function (t) {
            return arguments.length
              ? ((r = Array.from(t)), (o = Math.min(n.length, r.length - 1)), i)
              : r.slice();
          }),
          (i.invertExtent = function (t) {
            var e = r.indexOf(t);
            return [n[e - 1], n[e]];
          }),
          (i.unknown = function (t) {
            return arguments.length ? ((e = t), i) : e;
          }),
          (i.copy = function () {
            return t().domain(n).range(r).unknown(e);
          }),
          ia.apply(i, arguments)
        );
      },
      scaleTime: function () {
        return ia.apply(
          lc(Uu, zu, Au, Nu, du, cu, uu, au, iu, qu).domain([
            new Date(2e3, 0, 1),
            new Date(2e3, 0, 2),
          ]),
          arguments
        );
      },
      scaleUtc: function () {
        return ia.apply(
          lc($u, Du, Eu, Pu, xu, fu, lu, su, iu, Wu).domain([
            Date.UTC(2e3, 0, 1),
            Date.UTC(2e3, 0, 2),
          ]),
          arguments
        );
      },
      tickFormat: Ns,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
var yc,
  mc = 1e9,
  bc = !0,
  vc = '[DecimalError] ',
  wc = vc + 'Invalid argument: ',
  _c = vc + 'Exponent out of range: ',
  xc = Math.floor,
  Mc = Math.pow,
  kc = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Tc = 1e7,
  Sc = 9007199254740991,
  Oc = xc(1286742750677284.5),
  jc = {};
function Nc(t, e) {
  var n,
    r,
    o,
    i,
    a,
    s,
    u,
    l,
    c = t.constructor,
    f = c.precision;
  if (!t.s || !e.s) return (e.s || (e = new c(t)), bc ? Ic(e, f) : e);
  if (
    ((u = t.d), (l = e.d), (a = t.e), (o = e.e), (u = u.slice()), (i = a - o))
  ) {
    for (
      i < 0
        ? ((r = u), (i = -i), (s = l.length))
        : ((r = l), (o = a), (s = u.length)),
        i > (s = (a = Math.ceil(f / 7)) > s ? a + 1 : s + 1) &&
          ((i = s), (r.length = 1)),
        r.reverse();
      i--;

    )
      r.push(0);
    r.reverse();
  }
  for (
    (s = u.length) - (i = l.length) < 0 && ((i = s), (r = l), (l = u), (u = r)),
      n = 0;
    i;

  )
    ((n = ((u[--i] = u[i] + l[i] + n) / Tc) | 0), (u[i] %= Tc));
  for (n && (u.unshift(n), ++o), s = u.length; 0 == u[--s]; ) u.pop();
  return ((e.d = u), (e.e = o), bc ? Ic(e, f) : e);
}
function Pc(t, e, n) {
  if (t !== ~~t || t < e || t > n) throw Error(wc + t);
}
function Ac(t) {
  var e,
    n,
    r,
    o = t.length - 1,
    i = '',
    a = t[0];
  if (o > 0) {
    for (i += a, e = 1; e < o; e++)
      ((n = 7 - (r = t[e] + '').length) && (i += Uc(n)), (i += r));
    (n = 7 - (r = (a = t[e]) + '').length) && (i += Uc(n));
  } else if (0 === a) return '0';
  for (; a % 10 == 0; ) a /= 10;
  return i + a;
}
((jc.absoluteValue = jc.abs =
  function () {
    var t = new this.constructor(this);
    return (t.s && (t.s = 1), t);
  }),
  (jc.comparedTo = jc.cmp =
    function (t) {
      var e,
        n,
        r,
        o,
        i = this;
      if (((t = new i.constructor(t)), i.s !== t.s)) return i.s || -t.s;
      if (i.e !== t.e) return (i.e > t.e) ^ (i.s < 0) ? 1 : -1;
      for (e = 0, n = (r = i.d.length) < (o = t.d.length) ? r : o; e < n; ++e)
        if (i.d[e] !== t.d[e]) return (i.d[e] > t.d[e]) ^ (i.s < 0) ? 1 : -1;
      return r === o ? 0 : (r > o) ^ (i.s < 0) ? 1 : -1;
    }),
  (jc.decimalPlaces = jc.dp =
    function () {
      var t = this,
        e = t.d.length - 1,
        n = 7 * (e - t.e);
      if ((e = t.d[e])) for (; e % 10 == 0; e /= 10) n--;
      return n < 0 ? 0 : n;
    }),
  (jc.dividedBy = jc.div =
    function (t) {
      return Ec(this, new this.constructor(t));
    }),
  (jc.dividedToIntegerBy = jc.idiv =
    function (t) {
      var e = this.constructor;
      return Ic(Ec(this, new e(t), 0, 1), e.precision);
    }),
  (jc.equals = jc.eq =
    function (t) {
      return !this.cmp(t);
    }),
  (jc.exponent = function () {
    return $c(this);
  }),
  (jc.greaterThan = jc.gt =
    function (t) {
      return this.cmp(t) > 0;
    }),
  (jc.greaterThanOrEqualTo = jc.gte =
    function (t) {
      return this.cmp(t) >= 0;
    }),
  (jc.isInteger = jc.isint =
    function () {
      return this.e > this.d.length - 2;
    }),
  (jc.isNegative = jc.isneg =
    function () {
      return this.s < 0;
    }),
  (jc.isPositive = jc.ispos =
    function () {
      return this.s > 0;
    }),
  (jc.isZero = function () {
    return 0 === this.s;
  }),
  (jc.lessThan = jc.lt =
    function (t) {
      return this.cmp(t) < 0;
    }),
  (jc.lessThanOrEqualTo = jc.lte =
    function (t) {
      return this.cmp(t) < 1;
    }),
  (jc.logarithm = jc.log =
    function (t) {
      var e,
        n = this,
        r = n.constructor,
        o = r.precision,
        i = o + 5;
      if (void 0 === t) t = new r(10);
      else if ((t = new r(t)).s < 1 || t.eq(yc)) throw Error(vc + 'NaN');
      if (n.s < 1) throw Error(vc + (n.s ? 'NaN' : '-Infinity'));
      return n.eq(yc)
        ? new r(0)
        : ((bc = !1), (e = Ec(zc(n, i), zc(t, i), i)), (bc = !0), Ic(e, o));
    }),
  (jc.minus = jc.sub =
    function (t) {
      var e = this;
      return (
        (t = new e.constructor(t)),
        e.s == t.s ? Lc(e, t) : Nc(e, ((t.s = -t.s), t))
      );
    }),
  (jc.modulo = jc.mod =
    function (t) {
      var e,
        n = this,
        r = n.constructor,
        o = r.precision;
      if (!(t = new r(t)).s) throw Error(vc + 'NaN');
      return n.s
        ? ((bc = !1), (e = Ec(n, t, 0, 1).times(t)), (bc = !0), n.minus(e))
        : Ic(new r(n), o);
    }),
  (jc.naturalExponential = jc.exp =
    function () {
      return Cc(this);
    }),
  (jc.naturalLogarithm = jc.ln =
    function () {
      return zc(this);
    }),
  (jc.negated = jc.neg =
    function () {
      var t = new this.constructor(this);
      return ((t.s = -t.s || 0), t);
    }),
  (jc.plus = jc.add =
    function (t) {
      var e = this;
      return (
        (t = new e.constructor(t)),
        e.s == t.s ? Nc(e, t) : Lc(e, ((t.s = -t.s), t))
      );
    }),
  (jc.precision = jc.sd =
    function (t) {
      var e,
        n,
        r,
        o = this;
      if (void 0 !== t && t !== !!t && 1 !== t && 0 !== t) throw Error(wc + t);
      if (((e = $c(o) + 1), (n = 7 * (r = o.d.length - 1) + 1), (r = o.d[r]))) {
        for (; r % 10 == 0; r /= 10) n--;
        for (r = o.d[0]; r >= 10; r /= 10) n++;
      }
      return t && e > n ? e : n;
    }),
  (jc.squareRoot = jc.sqrt =
    function () {
      var t,
        e,
        n,
        r,
        o,
        i,
        a,
        s = this,
        u = s.constructor;
      if (s.s < 1) {
        if (!s.s) return new u(0);
        throw Error(vc + 'NaN');
      }
      for (
        t = $c(s),
          bc = !1,
          0 == (o = Math.sqrt(+s)) || o == 1 / 0
            ? (((e = Ac(s.d)).length + t) % 2 == 0 && (e += '0'),
              (o = Math.sqrt(e)),
              (t = xc((t + 1) / 2) - (t < 0 || t % 2)),
              (r = new u(
                (e =
                  o == 1 / 0
                    ? '5e' + t
                    : (e = o.toExponential()).slice(0, e.indexOf('e') + 1) + t)
              )))
            : (r = new u(o.toString())),
          o = a = (n = u.precision) + 3;
        ;

      )
        if (
          ((r = (i = r).plus(Ec(s, i, a + 2)).times(0.5)),
          Ac(i.d).slice(0, a) === (e = Ac(r.d)).slice(0, a))
        ) {
          if (((e = e.slice(a - 3, a + 1)), o == a && '4999' == e)) {
            if ((Ic(i, n + 1, 0), i.times(i).eq(s))) {
              r = i;
              break;
            }
          } else if ('9999' != e) break;
          a += 4;
        }
      return ((bc = !0), Ic(r, n));
    }),
  (jc.times = jc.mul =
    function (t) {
      var e,
        n,
        r,
        o,
        i,
        a,
        s,
        u,
        l,
        c = this,
        f = c.constructor,
        h = c.d,
        p = (t = new f(t)).d;
      if (!c.s || !t.s) return new f(0);
      for (
        t.s *= c.s,
          n = c.e + t.e,
          (u = h.length) < (l = p.length) &&
            ((i = h), (h = p), (p = i), (a = u), (u = l), (l = a)),
          i = [],
          r = a = u + l;
        r--;

      )
        i.push(0);
      for (r = l; --r >= 0; ) {
        for (e = 0, o = u + r; o > r; )
          ((s = i[o] + p[r] * h[o - r - 1] + e),
            (i[o--] = s % Tc | 0),
            (e = (s / Tc) | 0));
        i[o] = (i[o] + e) % Tc | 0;
      }
      for (; !i[--a]; ) i.pop();
      return (
        e ? ++n : i.shift(),
        (t.d = i),
        (t.e = n),
        bc ? Ic(t, f.precision) : t
      );
    }),
  (jc.toDecimalPlaces = jc.todp =
    function (t, e) {
      var n = this,
        r = n.constructor;
      return (
        (n = new r(n)),
        void 0 === t
          ? n
          : (Pc(t, 0, mc),
            void 0 === e ? (e = r.rounding) : Pc(e, 0, 8),
            Ic(n, t + $c(n) + 1, e))
      );
    }),
  (jc.toExponential = function (t, e) {
    var n,
      r = this,
      o = r.constructor;
    return (
      void 0 === t
        ? (n = Rc(r, !0))
        : (Pc(t, 0, mc),
          void 0 === e ? (e = o.rounding) : Pc(e, 0, 8),
          (n = Rc((r = Ic(new o(r), t + 1, e)), !0, t + 1))),
      n
    );
  }),
  (jc.toFixed = function (t, e) {
    var n,
      r,
      o = this,
      i = o.constructor;
    return void 0 === t
      ? Rc(o)
      : (Pc(t, 0, mc),
        void 0 === e ? (e = i.rounding) : Pc(e, 0, 8),
        (n = Rc((r = Ic(new i(o), t + $c(o) + 1, e)).abs(), !1, t + $c(r) + 1)),
        o.isneg() && !o.isZero() ? '-' + n : n);
  }),
  (jc.toInteger = jc.toint =
    function () {
      var t = this,
        e = t.constructor;
      return Ic(new e(t), $c(t) + 1, e.rounding);
    }),
  (jc.toNumber = function () {
    return +this;
  }),
  (jc.toPower = jc.pow =
    function (t) {
      var e,
        n,
        r,
        o,
        i,
        a,
        s = this,
        u = s.constructor,
        l = +(t = new u(t));
      if (!t.s) return new u(yc);
      if (!(s = new u(s)).s) {
        if (t.s < 1) throw Error(vc + 'Infinity');
        return s;
      }
      if (s.eq(yc)) return s;
      if (((r = u.precision), t.eq(yc))) return Ic(s, r);
      if (((a = (e = t.e) >= (n = t.d.length - 1)), (i = s.s), a)) {
        if ((n = l < 0 ? -l : l) <= Sc) {
          for (
            o = new u(yc), e = Math.ceil(r / 7 + 4), bc = !1;
            n % 2 && qc((o = o.times(s)).d, e), 0 !== (n = xc(n / 2));

          )
            qc((s = s.times(s)).d, e);
          return ((bc = !0), t.s < 0 ? new u(yc).div(o) : Ic(o, r));
        }
      } else if (i < 0) throw Error(vc + 'NaN');
      return (
        (i = i < 0 && 1 & t.d[Math.max(e, n)] ? -1 : 1),
        (s.s = 1),
        (bc = !1),
        (o = t.times(zc(s, r + 12))),
        (bc = !0),
        ((o = Cc(o)).s = i),
        o
      );
    }),
  (jc.toPrecision = function (t, e) {
    var n,
      r,
      o = this,
      i = o.constructor;
    return (
      void 0 === t
        ? (r = Rc(o, (n = $c(o)) <= i.toExpNeg || n >= i.toExpPos))
        : (Pc(t, 1, mc),
          void 0 === e ? (e = i.rounding) : Pc(e, 0, 8),
          (r = Rc(
            (o = Ic(new i(o), t, e)),
            t <= (n = $c(o)) || n <= i.toExpNeg,
            t
          ))),
      r
    );
  }),
  (jc.toSignificantDigits = jc.tosd =
    function (t, e) {
      var n = this.constructor;
      return (
        void 0 === t
          ? ((t = n.precision), (e = n.rounding))
          : (Pc(t, 1, mc), void 0 === e ? (e = n.rounding) : Pc(e, 0, 8)),
        Ic(new n(this), t, e)
      );
    }),
  (jc.toString =
    jc.valueOf =
    jc.val =
    jc.toJSON =
    jc[Symbol.for('nodejs.util.inspect.custom')] =
      function () {
        var t = this,
          e = $c(t),
          n = t.constructor;
        return Rc(t, e <= n.toExpNeg || e >= n.toExpPos);
      }));
var Ec = (function () {
  function t(t, e) {
    var n,
      r = 0,
      o = t.length;
    for (t = t.slice(); o--; )
      ((n = t[o] * e + r), (t[o] = n % Tc | 0), (r = (n / Tc) | 0));
    return (r && t.unshift(r), t);
  }
  function e(t, e, n, r) {
    var o, i;
    if (n != r) i = n > r ? 1 : -1;
    else
      for (o = i = 0; o < n; o++)
        if (t[o] != e[o]) {
          i = t[o] > e[o] ? 1 : -1;
          break;
        }
    return i;
  }
  function n(t, e, n) {
    for (var r = 0; n--; )
      ((t[n] -= r), (r = t[n] < e[n] ? 1 : 0), (t[n] = r * Tc + t[n] - e[n]));
    for (; !t[0] && t.length > 1; ) t.shift();
  }
  return function (r, o, i, a) {
    var s,
      u,
      l,
      c,
      f,
      h,
      p,
      d,
      g,
      y,
      m,
      b,
      v,
      w,
      _,
      x,
      M,
      k,
      T = r.constructor,
      S = r.s == o.s ? 1 : -1,
      O = r.d,
      j = o.d;
    if (!r.s) return new T(r);
    if (!o.s) throw Error(vc + 'Division by zero');
    for (
      u = r.e - o.e,
        M = j.length,
        _ = O.length,
        d = (p = new T(S)).d = [],
        l = 0;
      j[l] == (O[l] || 0);

    )
      ++l;
    if (
      (j[l] > (O[l] || 0) && --u,
      (b = null == i ? (i = T.precision) : a ? i + ($c(r) - $c(o)) + 1 : i) < 0)
    )
      return new T(0);
    if (((b = (b / 7 + 2) | 0), (l = 0), 1 == M))
      for (c = 0, j = j[0], b++; (l < _ || c) && b--; l++)
        ((v = c * Tc + (O[l] || 0)), (d[l] = (v / j) | 0), (c = v % j | 0));
    else {
      for (
        (c = (Tc / (j[0] + 1)) | 0) > 1 &&
          ((j = t(j, c)), (O = t(O, c)), (M = j.length), (_ = O.length)),
          w = M,
          y = (g = O.slice(0, M)).length;
        y < M;

      )
        g[y++] = 0;
      ((k = j.slice()).unshift(0), (x = j[0]), j[1] >= Tc / 2 && ++x);
      do {
        ((c = 0),
          (s = e(j, g, M, y)) < 0
            ? ((m = g[0]),
              M != y && (m = m * Tc + (g[1] || 0)),
              (c = (m / x) | 0) > 1
                ? (c >= Tc && (c = Tc - 1),
                  1 ==
                    (s = e((f = t(j, c)), g, (h = f.length), (y = g.length))) &&
                    (c--, n(f, M < h ? k : j, h)))
                : (0 == c && (s = c = 1), (f = j.slice())),
              (h = f.length) < y && f.unshift(0),
              n(g, f, y),
              -1 == s &&
                (s = e(j, g, M, (y = g.length))) < 1 &&
                (c++, n(g, M < y ? k : j, y)),
              (y = g.length))
            : 0 === s && (c++, (g = [0])),
          (d[l++] = c),
          s && g[0] ? (g[y++] = O[w] || 0) : ((g = [O[w]]), (y = 1)));
      } while ((w++ < _ || void 0 !== g[0]) && b--);
    }
    return (d[0] || d.shift(), (p.e = u), Ic(p, a ? i + $c(p) + 1 : i));
  };
})();
function Cc(t, e) {
  var n,
    r,
    o,
    i,
    a,
    s = 0,
    u = 0,
    l = t.constructor,
    c = l.precision;
  if ($c(t) > 16) throw Error(_c + $c(t));
  if (!t.s) return new l(yc);
  for (bc = !1, a = c, i = new l(0.03125); t.abs().gte(0.1); )
    ((t = t.times(i)), (u += 5));
  for (
    a += ((Math.log(Mc(2, u)) / Math.LN10) * 2 + 5) | 0,
      n = r = o = new l(yc),
      l.precision = a;
    ;

  ) {
    if (
      ((r = Ic(r.times(t), a)),
      (n = n.times(++s)),
      Ac((i = o.plus(Ec(r, n, a))).d).slice(0, a) === Ac(o.d).slice(0, a))
    ) {
      for (; u--; ) o = Ic(o.times(o), a);
      return ((l.precision = c), null == e ? ((bc = !0), Ic(o, c)) : o);
    }
    o = i;
  }
}
function $c(t) {
  for (var e = 7 * t.e, n = t.d[0]; n >= 10; n /= 10) e++;
  return e;
}
function Dc(t, e, n) {
  if (e > t.LN10.sd())
    throw (
      (bc = !0),
      n && (t.precision = n),
      Error(vc + 'LN10 precision limit exceeded')
    );
  return Ic(new t(t.LN10), e);
}
function Uc(t) {
  for (var e = ''; t--; ) e += '0';
  return e;
}
function zc(t, e) {
  var n,
    r,
    o,
    i,
    a,
    s,
    u,
    l,
    c,
    f = 1,
    h = t,
    p = h.d,
    d = h.constructor,
    g = d.precision;
  if (h.s < 1) throw Error(vc + (h.s ? 'NaN' : '-Infinity'));
  if (h.eq(yc)) return new d(0);
  if ((null == e ? ((bc = !1), (l = g)) : (l = e), h.eq(10)))
    return (null == e && (bc = !0), Dc(d, l));
  if (
    ((l += 10),
    (d.precision = l),
    (r = (n = Ac(p)).charAt(0)),
    (i = $c(h)),
    !(Math.abs(i) < 15e14))
  )
    return (
      (u = Dc(d, l + 2, g).times(i + '')),
      (h = zc(new d(r + '.' + n.slice(1)), l - 10).plus(u)),
      (d.precision = g),
      null == e ? ((bc = !0), Ic(h, g)) : h
    );
  for (; (r < 7 && 1 != r) || (1 == r && n.charAt(1) > 3); )
    ((r = (n = Ac((h = h.times(t)).d)).charAt(0)), f++);
  for (
    i = $c(h),
      r > 1 ? ((h = new d('0.' + n)), i++) : (h = new d(r + '.' + n.slice(1))),
      s = a = h = Ec(h.minus(yc), h.plus(yc), l),
      c = Ic(h.times(h), l),
      o = 3;
    ;

  ) {
    if (
      ((a = Ic(a.times(c), l)),
      Ac((u = s.plus(Ec(a, new d(o), l))).d).slice(0, l) ===
        Ac(s.d).slice(0, l))
    )
      return (
        (s = s.times(2)),
        0 !== i && (s = s.plus(Dc(d, l + 2, g).times(i + ''))),
        (s = Ec(s, new d(f), l)),
        (d.precision = g),
        null == e ? ((bc = !0), Ic(s, g)) : s
      );
    ((s = u), (o += 2));
  }
}
function Fc(t, e) {
  var n, r, o;
  for (
    (n = e.indexOf('.')) > -1 && (e = e.replace('.', '')),
      (r = e.search(/e/i)) > 0
        ? (n < 0 && (n = r), (n += +e.slice(r + 1)), (e = e.substring(0, r)))
        : n < 0 && (n = e.length),
      r = 0;
    48 === e.charCodeAt(r);

  )
    ++r;
  for (o = e.length; 48 === e.charCodeAt(o - 1); ) --o;
  if ((e = e.slice(r, o))) {
    if (
      ((o -= r),
      (n = n - r - 1),
      (t.e = xc(n / 7)),
      (t.d = []),
      (r = (n + 1) % 7),
      n < 0 && (r += 7),
      r < o)
    ) {
      for (r && t.d.push(+e.slice(0, r)), o -= 7; r < o; )
        t.d.push(+e.slice(r, (r += 7)));
      r = 7 - (e = e.slice(r)).length;
    } else r -= o;
    for (; r--; ) e += '0';
    if ((t.d.push(+e), bc && (t.e > Oc || t.e < -Oc))) throw Error(_c + n);
  } else ((t.s = 0), (t.e = 0), (t.d = [0]));
  return t;
}
function Ic(t, e, n) {
  var r,
    o,
    i,
    a,
    s,
    u,
    l,
    c,
    f = t.d;
  for (a = 1, i = f[0]; i >= 10; i /= 10) a++;
  if ((r = e - a) < 0) ((r += 7), (o = e), (l = f[(c = 0)]));
  else {
    if ((c = Math.ceil((r + 1) / 7)) >= (i = f.length)) return t;
    for (l = i = f[c], a = 1; i >= 10; i /= 10) a++;
    o = (r %= 7) - 7 + a;
  }
  if (
    (void 0 !== n &&
      ((s = (l / (i = Mc(10, a - o - 1))) % 10 | 0),
      (u = e < 0 || void 0 !== f[c + 1] || l % i),
      (u =
        n < 4
          ? (s || u) && (0 == n || n == (t.s < 0 ? 3 : 2))
          : s > 5 ||
            (5 == s &&
              (4 == n ||
                u ||
                (6 == n &&
                  (r > 0 ? (o > 0 ? l / Mc(10, a - o) : 0) : f[c - 1]) % 10 &
                    1) ||
                n == (t.s < 0 ? 8 : 7))))),
    e < 1 || !f[0])
  )
    return (
      u
        ? ((i = $c(t)),
          (f.length = 1),
          (e = e - i - 1),
          (f[0] = Mc(10, (7 - (e % 7)) % 7)),
          (t.e = xc(-e / 7) || 0))
        : ((f.length = 1), (f[0] = t.e = t.s = 0)),
      t
    );
  if (
    (0 == r
      ? ((f.length = c), (i = 1), c--)
      : ((f.length = c + 1),
        (i = Mc(10, 7 - r)),
        (f[c] = o > 0 ? ((l / Mc(10, a - o)) % Mc(10, o) | 0) * i : 0)),
    u)
  )
    for (;;) {
      if (0 == c) {
        (f[0] += i) == Tc && ((f[0] = 1), ++t.e);
        break;
      }
      if (((f[c] += i), f[c] != Tc)) break;
      ((f[c--] = 0), (i = 1));
    }
  for (r = f.length; 0 === f[--r]; ) f.pop();
  if (bc && (t.e > Oc || t.e < -Oc)) throw Error(_c + $c(t));
  return t;
}
function Lc(t, e) {
  var n,
    r,
    o,
    i,
    a,
    s,
    u,
    l,
    c,
    f,
    h = t.constructor,
    p = h.precision;
  if (!t.s || !e.s)
    return (e.s ? (e.s = -e.s) : (e = new h(t)), bc ? Ic(e, p) : e);
  if (
    ((u = t.d), (f = e.d), (r = e.e), (l = t.e), (u = u.slice()), (a = l - r))
  ) {
    for (
      (c = a < 0)
        ? ((n = u), (a = -a), (s = f.length))
        : ((n = f), (r = l), (s = u.length)),
        a > (o = Math.max(Math.ceil(p / 7), s) + 2) &&
          ((a = o), (n.length = 1)),
        n.reverse(),
        o = a;
      o--;

    )
      n.push(0);
    n.reverse();
  } else {
    for ((c = (o = u.length) < (s = f.length)) && (s = o), o = 0; o < s; o++)
      if (u[o] != f[o]) {
        c = u[o] < f[o];
        break;
      }
    a = 0;
  }
  for (
    c && ((n = u), (u = f), (f = n), (e.s = -e.s)),
      s = u.length,
      o = f.length - s;
    o > 0;
    --o
  )
    u[s++] = 0;
  for (o = f.length; o > a; ) {
    if (u[--o] < f[o]) {
      for (i = o; i && 0 === u[--i]; ) u[i] = Tc - 1;
      (--u[i], (u[o] += Tc));
    }
    u[o] -= f[o];
  }
  for (; 0 === u[--s]; ) u.pop();
  for (; 0 === u[0]; u.shift()) --r;
  return u[0] ? ((e.d = u), (e.e = r), bc ? Ic(e, p) : e) : new h(0);
}
function Rc(t, e, n) {
  var r,
    o = $c(t),
    i = Ac(t.d),
    a = i.length;
  return (
    e
      ? (n && (r = n - a) > 0
          ? (i = i.charAt(0) + '.' + i.slice(1) + Uc(r))
          : a > 1 && (i = i.charAt(0) + '.' + i.slice(1)),
        (i = i + (o < 0 ? 'e' : 'e+') + o))
      : o < 0
        ? ((i = '0.' + Uc(-o - 1) + i), n && (r = n - a) > 0 && (i += Uc(r)))
        : o >= a
          ? ((i += Uc(o + 1 - a)),
            n && (r = n - o - 1) > 0 && (i = i + '.' + Uc(r)))
          : ((r = o + 1) < a && (i = i.slice(0, r) + '.' + i.slice(r)),
            n && (r = n - a) > 0 && (o + 1 === a && (i += '.'), (i += Uc(r)))),
    t.s < 0 ? '-' + i : i
  );
}
function qc(t, e) {
  if (t.length > e) return ((t.length = e), !0);
}
function Wc(t) {
  if (!t || 'object' != typeof t) throw Error(vc + 'Object expected');
  var e,
    n,
    r,
    o = [
      'precision',
      1,
      mc,
      'rounding',
      0,
      8,
      'toExpNeg',
      -1 / 0,
      0,
      'toExpPos',
      0,
      1 / 0,
    ];
  for (e = 0; e < o.length; e += 3)
    if (void 0 !== (r = t[(n = o[e])])) {
      if (!(xc(r) === r && r >= o[e + 1] && r <= o[e + 2]))
        throw Error(wc + n + ': ' + r);
      this[n] = r;
    }
  if (void 0 !== (r = t[(n = 'LN10')])) {
    if (r != Math.LN10) throw Error(wc + n + ': ' + r);
    this[n] = new this(r);
  }
  return this;
}
var Hc = (function t(e) {
  var n, r, o;
  function i(t) {
    var e = this;
    if (!(e instanceof i)) return new i(t);
    if (((e.constructor = i), t instanceof i))
      return ((e.s = t.s), (e.e = t.e), void (e.d = (t = t.d) ? t.slice() : t));
    if ('number' == typeof t) {
      if (0 * t != 0) throw Error(wc + t);
      if (t > 0) e.s = 1;
      else {
        if (!(t < 0)) return ((e.s = 0), (e.e = 0), void (e.d = [0]));
        ((t = -t), (e.s = -1));
      }
      return t === ~~t && t < 1e7
        ? ((e.e = 0), void (e.d = [t]))
        : Fc(e, t.toString());
    }
    if ('string' != typeof t) throw Error(wc + t);
    if (
      (45 === t.charCodeAt(0) ? ((t = t.slice(1)), (e.s = -1)) : (e.s = 1),
      !kc.test(t))
    )
      throw Error(wc + t);
    Fc(e, t);
  }
  if (
    ((i.prototype = jc),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.clone = t),
    (i.config = i.set = Wc),
    void 0 === e && (e = {}),
    e)
  )
    for (
      o = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'], n = 0;
      n < o.length;

    )
      e.hasOwnProperty((r = o[n++])) || (e[r] = this[r]);
  return (i.config(e), i);
})({
  precision: 20,
  rounding: 4,
  toExpNeg: -7,
  toExpPos: 21,
  LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286',
});
yc = new Hc(1);
const Bc = Hc;
var Yc,
  Vc = { exports: {} };
const Gc = t(
  (Yc ||
    ((Yc = 1),
    (function (t) {
      var e = Object.prototype.hasOwnProperty,
        n = '~';
      function r() {}
      function o(t, e, n) {
        ((this.fn = t), (this.context = e), (this.once = n || !1));
      }
      function i(t, e, r, i, a) {
        if ('function' != typeof r)
          throw new TypeError('The listener must be a function');
        var s = new o(r, i || t, a),
          u = n ? n + e : e;
        return (
          t._events[u]
            ? t._events[u].fn
              ? (t._events[u] = [t._events[u], s])
              : t._events[u].push(s)
            : ((t._events[u] = s), t._eventsCount++),
          t
        );
      }
      function a(t, e) {
        0 === --t._eventsCount ? (t._events = new r()) : delete t._events[e];
      }
      function s() {
        ((this._events = new r()), (this._eventsCount = 0));
      }
      (Object.create &&
        ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1)),
        (s.prototype.eventNames = function () {
          var t,
            r,
            o = [];
          if (0 === this._eventsCount) return o;
          for (r in (t = this._events))
            e.call(t, r) && o.push(n ? r.slice(1) : r);
          return Object.getOwnPropertySymbols
            ? o.concat(Object.getOwnPropertySymbols(t))
            : o;
        }),
        (s.prototype.listeners = function (t) {
          var e = n ? n + t : t,
            r = this._events[e];
          if (!r) return [];
          if (r.fn) return [r.fn];
          for (var o = 0, i = r.length, a = new Array(i); o < i; o++)
            a[o] = r[o].fn;
          return a;
        }),
        (s.prototype.listenerCount = function (t) {
          var e = n ? n + t : t,
            r = this._events[e];
          return r ? (r.fn ? 1 : r.length) : 0;
        }),
        (s.prototype.emit = function (t, e, r, o, i, a) {
          var s = n ? n + t : t;
          if (!this._events[s]) return !1;
          var u,
            l,
            c = this._events[s],
            f = arguments.length;
          if (c.fn) {
            switch ((c.once && this.removeListener(t, c.fn, void 0, !0), f)) {
              case 1:
                return (c.fn.call(c.context), !0);
              case 2:
                return (c.fn.call(c.context, e), !0);
              case 3:
                return (c.fn.call(c.context, e, r), !0);
              case 4:
                return (c.fn.call(c.context, e, r, o), !0);
              case 5:
                return (c.fn.call(c.context, e, r, o, i), !0);
              case 6:
                return (c.fn.call(c.context, e, r, o, i, a), !0);
            }
            for (l = 1, u = new Array(f - 1); l < f; l++)
              u[l - 1] = arguments[l];
            c.fn.apply(c.context, u);
          } else {
            var h,
              p = c.length;
            for (l = 0; l < p; l++)
              switch (
                (c[l].once && this.removeListener(t, c[l].fn, void 0, !0), f)
              ) {
                case 1:
                  c[l].fn.call(c[l].context);
                  break;
                case 2:
                  c[l].fn.call(c[l].context, e);
                  break;
                case 3:
                  c[l].fn.call(c[l].context, e, r);
                  break;
                case 4:
                  c[l].fn.call(c[l].context, e, r, o);
                  break;
                default:
                  if (!u)
                    for (h = 1, u = new Array(f - 1); h < f; h++)
                      u[h - 1] = arguments[h];
                  c[l].fn.apply(c[l].context, u);
              }
          }
          return !0;
        }),
        (s.prototype.on = function (t, e, n) {
          return i(this, t, e, n, !1);
        }),
        (s.prototype.once = function (t, e, n) {
          return i(this, t, e, n, !0);
        }),
        (s.prototype.removeListener = function (t, e, r, o) {
          var i = n ? n + t : t;
          if (!this._events[i]) return this;
          if (!e) return (a(this, i), this);
          var s = this._events[i];
          if (s.fn)
            s.fn !== e ||
              (o && !s.once) ||
              (r && s.context !== r) ||
              a(this, i);
          else {
            for (var u = 0, l = [], c = s.length; u < c; u++)
              (s[u].fn !== e ||
                (o && !s[u].once) ||
                (r && s[u].context !== r)) &&
                l.push(s[u]);
            l.length
              ? (this._events[i] = 1 === l.length ? l[0] : l)
              : a(this, i);
          }
          return this;
        }),
        (s.prototype.removeAllListeners = function (t) {
          var e;
          return (
            t
              ? ((e = n ? n + t : t), this._events[e] && a(this, e))
              : ((this._events = new r()), (this._eventsCount = 0)),
            this
          );
        }),
        (s.prototype.off = s.prototype.removeListener),
        (s.prototype.addListener = s.prototype.on),
        (s.prefixed = n),
        (s.EventEmitter = s),
        (t.exports = s));
    })(Vc)),
  Vc.exports)
);
var Kc,
  Zc = {},
  Xc = {};
function Qc() {
  return (
    Kc ||
      ((Kc = 1),
      (t = Xc),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.last = function (t) {
        return t[t.length - 1];
      })),
    Xc
  );
  var t;
}
var Jc,
  tf,
  ef,
  nf,
  rf = {};
function of() {
  return (
    Jc ||
      ((Jc = 1),
      (t = rf),
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      (t.toArray = function (t) {
        return Array.isArray(t) ? t : Array.from(t);
      })),
    rf
  );
  var t;
}
function af() {
  return nf
    ? ef
    : ((nf = 1),
      (ef = (tf ||
        ((tf = 1),
        (function (t) {
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
          const e = Qc(),
            n = of(),
            r = hn();
          t.last = function (t) {
            if (r.isArrayLike(t)) return e.last(n.toArray(t));
          };
        })(Zc)),
      Zc).last));
}
const sf = t(af());
var uf,
  lf,
  cf,
  ff = {};
function hf() {
  return cf
    ? lf
    : ((cf = 1),
      (lf = (uf ||
        ((uf = 1),
        (t = ff),
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        (t.isPlainObject = function (t) {
          var e;
          if ('object' != typeof t) return !1;
          if (null == t) return !1;
          if (null === Object.getPrototypeOf(t)) return !0;
          if ('[object Object]' !== Object.prototype.toString.call(t)) {
            const n = t[Symbol.toStringTag];
            return (
              null != n &&
              !!(null ==
              (e = Object.getOwnPropertyDescriptor(t, Symbol.toStringTag))
                ? void 0
                : e.writable) &&
              t.toString() === `[object ${n}]`
            );
          }
          let n = t;
          for (; null !== Object.getPrototypeOf(n); )
            n = Object.getPrototypeOf(n);
          return Object.getPrototypeOf(t) === n;
        })),
      ff).isPlainObject));
  var t;
}
const pf = t(hf());
function df(t, e) {
  throw new Error('Invariant failed');
}
const gf = (t) => {
    const e = vf(t),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = t;
    return {
      getClassGroupId: (t) => {
        const n = t.split('-');
        return ('' === n[0] && 1 !== n.length && n.shift(), yf(n, e) || bf(t));
      },
      getConflictingClassGroupIds: (t, e) => {
        const o = n[t] || [];
        return e && r[t] ? [...o, ...r[t]] : o;
      },
    };
  },
  yf = (t, e) => {
    var n;
    if (0 === t.length) return e.classGroupId;
    const r = t[0],
      o = e.nextPart.get(r),
      i = o ? yf(t.slice(1), o) : void 0;
    if (i) return i;
    if (0 === e.validators.length) return;
    const a = t.join('-');
    return null == (n = e.validators.find(({ validator: t }) => t(a)))
      ? void 0
      : n.classGroupId;
  },
  mf = /^\[(.+)\]$/,
  bf = (t) => {
    if (mf.test(t)) {
      const e = mf.exec(t)[1],
        n = null == e ? void 0 : e.substring(0, e.indexOf(':'));
      if (n) return 'arbitrary..' + n;
    }
  },
  vf = (t) => {
    const { theme: e, classGroups: n } = t,
      r = { nextPart: new Map(), validators: [] };
    for (const o in n) wf(n[o], r, o, e);
    return r;
  },
  wf = (t, e, n, r) => {
    t.forEach((t) => {
      if ('string' == typeof t) {
        return void (('' === t ? e : _f(e, t)).classGroupId = n);
      }
      if ('function' == typeof t)
        return xf(t)
          ? void wf(t(r), e, n, r)
          : void e.validators.push({ validator: t, classGroupId: n });
      Object.entries(t).forEach(([t, o]) => {
        wf(o, _f(e, t), n, r);
      });
    });
  },
  _f = (t, e) => {
    let n = t;
    return (
      e.split('-').forEach((t) => {
        (n.nextPart.has(t) ||
          n.nextPart.set(t, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(t)));
      }),
      n
    );
  },
  xf = (t) => t.isThemeGetter,
  Mf = (t) => {
    if (t < 1) return { get: () => {}, set: () => {} };
    let e = 0,
      n = new Map(),
      r = new Map();
    const o = (o, i) => {
      (n.set(o, i), e++, e > t && ((e = 0), (r = n), (n = new Map())));
    };
    return {
      get(t) {
        let e = n.get(t);
        return void 0 !== e
          ? e
          : void 0 !== (e = r.get(t))
            ? (o(t, e), e)
            : void 0;
      },
      set(t, e) {
        n.has(t) ? n.set(t, e) : o(t, e);
      },
    };
  },
  kf = (t) => {
    const { prefix: e, experimentalParseClassName: n } = t;
    let r = (t) => {
      const e = [];
      let n,
        r = 0,
        o = 0,
        i = 0;
      for (let u = 0; u < t.length; u++) {
        let a = t[u];
        if (0 === r && 0 === o) {
          if (':' === a) {
            (e.push(t.slice(i, u)), (i = u + 1));
            continue;
          }
          if ('/' === a) {
            n = u;
            continue;
          }
        }
        '[' === a ? r++ : ']' === a ? r-- : '(' === a ? o++ : ')' === a && o--;
      }
      const a = 0 === e.length ? t : t.substring(i),
        s = Tf(a);
      return {
        modifiers: e,
        hasImportantModifier: s !== a,
        baseClassName: s,
        maybePostfixModifierPosition: n && n > i ? n - i : void 0,
      };
    };
    if (e) {
      const t = e + ':',
        n = r;
      r = (e) =>
        e.startsWith(t)
          ? n(e.substring(t.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: e,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (n) {
      const t = r;
      r = (e) => n({ className: e, parseClassName: t });
    }
    return r;
  },
  Tf = (t) =>
    t.endsWith('!')
      ? t.substring(0, t.length - 1)
      : t.startsWith('!')
        ? t.substring(1)
        : t,
  Sf = (t) => {
    const e = Object.fromEntries(t.orderSensitiveModifiers.map((t) => [t, !0]));
    return (t) => {
      if (t.length <= 1) return t;
      const n = [];
      let r = [];
      return (
        t.forEach((t) => {
          '[' === t[0] || e[t] ? (n.push(...r.sort(), t), (r = [])) : r.push(t);
        }),
        n.push(...r.sort()),
        n
      );
    };
  },
  Of = /\s+/;
function jf() {
  let t,
    e,
    n = 0,
    r = '';
  for (; n < arguments.length; )
    (t = arguments[n++]) && (e = Nf(t)) && (r && (r += ' '), (r += e));
  return r;
}
const Nf = (t) => {
  if ('string' == typeof t) return t;
  let e,
    n = '';
  for (let r = 0; r < t.length; r++)
    t[r] && (e = Nf(t[r])) && (n && (n += ' '), (n += e));
  return n;
};
function Pf(t, ...e) {
  let n,
    r,
    o,
    i = function (s) {
      const u = e.reduce((t, e) => e(t), t());
      return (
        (n = ((t) => ({
          cache: Mf(t.cacheSize),
          parseClassName: kf(t),
          sortModifiers: Sf(t),
          ...gf(t),
        }))(u)),
        (r = n.cache.get),
        (o = n.cache.set),
        (i = a),
        a(s)
      );
    };
  function a(t) {
    const e = r(t);
    if (e) return e;
    const i = ((t, e) => {
      const {
          parseClassName: n,
          getClassGroupId: r,
          getConflictingClassGroupIds: o,
          sortModifiers: i,
        } = e,
        a = [],
        s = t.trim().split(Of);
      let u = '';
      for (let l = s.length - 1; l >= 0; l -= 1) {
        const t = s[l],
          {
            isExternal: e,
            modifiers: c,
            hasImportantModifier: f,
            baseClassName: h,
            maybePostfixModifierPosition: p,
          } = n(t);
        if (e) {
          u = t + (u.length > 0 ? ' ' + u : u);
          continue;
        }
        let d = !!p,
          g = r(d ? h.substring(0, p) : h);
        if (!g) {
          if (!d) {
            u = t + (u.length > 0 ? ' ' + u : u);
            continue;
          }
          if (((g = r(h)), !g)) {
            u = t + (u.length > 0 ? ' ' + u : u);
            continue;
          }
          d = !1;
        }
        const y = i(c).join(':'),
          m = f ? y + '!' : y,
          b = m + g;
        if (a.includes(b)) continue;
        a.push(b);
        const v = o(g, d);
        for (let n = 0; n < v.length; ++n) {
          const t = v[n];
          a.push(m + t);
        }
        u = t + (u.length > 0 ? ' ' + u : u);
      }
      return u;
    })(t, n);
    return (o(t, i), i);
  }
  return function () {
    return i(jf.apply(null, arguments));
  };
}
const Af = (t) => {
    const e = (e) => e[t] || [];
    return ((e.isThemeGetter = !0), e);
  },
  Ef = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Cf = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  $f = /^\d+\/\d+$/,
  Df = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Uf =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  zf = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Ff = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  If =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Lf = (t) => $f.test(t),
  Rf = (t) => !!t && !Number.isNaN(Number(t)),
  qf = (t) => !!t && Number.isInteger(Number(t)),
  Wf = (t) => t.endsWith('%') && Rf(t.slice(0, -1)),
  Hf = (t) => Df.test(t),
  Bf = () => !0,
  Yf = (t) => Uf.test(t) && !zf.test(t),
  Vf = () => !1,
  Gf = (t) => Ff.test(t),
  Kf = (t) => If.test(t),
  Zf = (t) => !Qf(t) && !oh(t),
  Xf = (t) => fh(t, gh, Vf),
  Qf = (t) => Ef.test(t),
  Jf = (t) => fh(t, yh, Yf),
  th = (t) => fh(t, mh, Rf),
  eh = (t) => fh(t, ph, Vf),
  nh = (t) => fh(t, dh, Kf),
  rh = (t) => fh(t, vh, Gf),
  oh = (t) => Cf.test(t),
  ih = (t) => hh(t, yh),
  ah = (t) => hh(t, bh),
  sh = (t) => hh(t, ph),
  uh = (t) => hh(t, gh),
  lh = (t) => hh(t, dh),
  ch = (t) => hh(t, vh, !0),
  fh = (t, e, n) => {
    const r = Ef.exec(t);
    return !!r && (r[1] ? e(r[1]) : n(r[2]));
  },
  hh = (t, e, n = !1) => {
    const r = Cf.exec(t);
    return !!r && (r[1] ? e(r[1]) : n);
  },
  ph = (t) => 'position' === t || 'percentage' === t,
  dh = (t) => 'image' === t || 'url' === t,
  gh = (t) => 'length' === t || 'size' === t || 'bg-size' === t,
  yh = (t) => 'length' === t,
  mh = (t) => 'number' === t,
  bh = (t) => 'family-name' === t,
  vh = (t) => 'shadow' === t,
  wh = Pf(() => {
    const t = Af('color'),
      e = Af('font'),
      n = Af('text'),
      r = Af('font-weight'),
      o = Af('tracking'),
      i = Af('leading'),
      a = Af('breakpoint'),
      s = Af('container'),
      u = Af('spacing'),
      l = Af('radius'),
      c = Af('shadow'),
      f = Af('inset-shadow'),
      h = Af('text-shadow'),
      p = Af('drop-shadow'),
      d = Af('blur'),
      g = Af('perspective'),
      y = Af('aspect'),
      m = Af('ease'),
      b = Af('animate'),
      v = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
        oh,
        Qf,
      ],
      w = () => [oh, Qf, u],
      _ = () => [Lf, 'full', 'auto', ...w()],
      x = () => [qf, 'none', 'subgrid', oh, Qf],
      M = () => ['auto', { span: ['full', qf, oh, Qf] }, qf, oh, Qf],
      k = () => [qf, 'auto', oh, Qf],
      T = () => ['auto', 'min', 'max', 'fr', oh, Qf],
      S = () => ['auto', ...w()],
      O = () => [
        Lf,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...w(),
      ],
      j = () => [t, oh, Qf],
      N = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
        sh,
        eh,
        { position: [oh, Qf] },
      ],
      P = () => ['auto', 'cover', 'contain', uh, Xf, { size: [oh, Qf] }],
      A = () => [Wf, ih, Jf],
      E = () => ['', 'none', 'full', l, oh, Qf],
      C = () => ['', Rf, ih, Jf],
      $ = () => [Rf, Wf, sh, eh],
      D = () => ['', 'none', d, oh, Qf],
      U = () => ['none', Rf, oh, Qf],
      z = () => ['none', Rf, oh, Qf],
      F = () => [Rf, oh, Qf],
      I = () => [Lf, 'full', ...w()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [Hf],
        breakpoint: [Hf],
        color: [Bf],
        container: [Hf],
        'drop-shadow': [Hf],
        ease: ['in', 'out', 'in-out'],
        font: [Zf],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [Hf],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [Hf],
        shadow: [Hf],
        spacing: ['px', Rf],
        text: [Hf],
        'text-shadow': [Hf],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', Lf, Qf, oh, y] }],
        container: ['container'],
        columns: [{ columns: [Rf, Qf, oh, s] }],
        'break-after': [
          {
            'break-after': [
              'auto',
              'avoid',
              'all',
              'avoid-page',
              'page',
              'left',
              'right',
              'column',
            ],
          },
        ],
        'break-before': [
          {
            'break-before': [
              'auto',
              'avoid',
              'all',
              'avoid-page',
              'page',
              'left',
              'right',
              'column',
            ],
          },
        ],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: v() }],
        overflow: [
          { overflow: ['auto', 'hidden', 'clip', 'visible', 'scroll'] },
        ],
        'overflow-x': [
          { 'overflow-x': ['auto', 'hidden', 'clip', 'visible', 'scroll'] },
        ],
        'overflow-y': [
          { 'overflow-y': ['auto', 'hidden', 'clip', 'visible', 'scroll'] },
        ],
        overscroll: [{ overscroll: ['auto', 'contain', 'none'] }],
        'overscroll-x': [{ 'overscroll-x': ['auto', 'contain', 'none'] }],
        'overscroll-y': [{ 'overscroll-y': ['auto', 'contain', 'none'] }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: _() }],
        'inset-x': [{ 'inset-x': _() }],
        'inset-y': [{ 'inset-y': _() }],
        start: [{ start: _() }],
        end: [{ end: _() }],
        top: [{ top: _() }],
        right: [{ right: _() }],
        bottom: [{ bottom: _() }],
        left: [{ left: _() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [qf, 'auto', oh, Qf] }],
        basis: [{ basis: [Lf, 'full', 'auto', s, ...w()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [Rf, Lf, 'auto', 'initial', 'none', Qf] }],
        grow: [{ grow: ['', Rf, oh, Qf] }],
        shrink: [{ shrink: ['', Rf, oh, Qf] }],
        order: [{ order: [qf, 'first', 'last', 'none', oh, Qf] }],
        'grid-cols': [{ 'grid-cols': x() }],
        'col-start-end': [{ col: M() }],
        'col-start': [{ 'col-start': k() }],
        'col-end': [{ 'col-end': k() }],
        'grid-rows': [{ 'grid-rows': x() }],
        'row-start-end': [{ row: M() }],
        'row-start': [{ 'row-start': k() }],
        'row-end': [{ 'row-end': k() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': T() }],
        'auto-rows': [{ 'auto-rows': T() }],
        gap: [{ gap: w() }],
        'gap-x': [{ 'gap-x': w() }],
        'gap-y': [{ 'gap-y': w() }],
        'justify-content': [
          {
            justify: [
              'start',
              'end',
              'center',
              'between',
              'around',
              'evenly',
              'stretch',
              'baseline',
              'center-safe',
              'end-safe',
              'normal',
            ],
          },
        ],
        'justify-items': [
          {
            'justify-items': [
              'start',
              'end',
              'center',
              'stretch',
              'center-safe',
              'end-safe',
              'normal',
            ],
          },
        ],
        'justify-self': [
          {
            'justify-self': [
              'auto',
              'start',
              'end',
              'center',
              'stretch',
              'center-safe',
              'end-safe',
            ],
          },
        ],
        'align-content': [
          {
            content: [
              'normal',
              'start',
              'end',
              'center',
              'between',
              'around',
              'evenly',
              'stretch',
              'baseline',
              'center-safe',
              'end-safe',
            ],
          },
        ],
        'align-items': [
          {
            items: [
              'start',
              'end',
              'center',
              'stretch',
              'center-safe',
              'end-safe',
              { baseline: ['', 'last'] },
            ],
          },
        ],
        'align-self': [
          {
            self: [
              'auto',
              'start',
              'end',
              'center',
              'stretch',
              'center-safe',
              'end-safe',
              { baseline: ['', 'last'] },
            ],
          },
        ],
        'place-content': [
          {
            'place-content': [
              'start',
              'end',
              'center',
              'between',
              'around',
              'evenly',
              'stretch',
              'baseline',
              'center-safe',
              'end-safe',
            ],
          },
        ],
        'place-items': [
          {
            'place-items': [
              'start',
              'end',
              'center',
              'stretch',
              'center-safe',
              'end-safe',
              'baseline',
            ],
          },
        ],
        'place-self': [
          {
            'place-self': [
              'auto',
              'start',
              'end',
              'center',
              'stretch',
              'center-safe',
              'end-safe',
            ],
          },
        ],
        p: [{ p: w() }],
        px: [{ px: w() }],
        py: [{ py: w() }],
        ps: [{ ps: w() }],
        pe: [{ pe: w() }],
        pt: [{ pt: w() }],
        pr: [{ pr: w() }],
        pb: [{ pb: w() }],
        pl: [{ pl: w() }],
        m: [{ m: S() }],
        mx: [{ mx: S() }],
        my: [{ my: S() }],
        ms: [{ ms: S() }],
        me: [{ me: S() }],
        mt: [{ mt: S() }],
        mr: [{ mr: S() }],
        mb: [{ mb: S() }],
        ml: [{ ml: S() }],
        'space-x': [{ 'space-x': w() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': w() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: O() }],
        w: [{ w: [s, 'screen', ...O()] }],
        'min-w': [{ 'min-w': [s, 'screen', 'none', ...O()] }],
        'max-w': [
          { 'max-w': [s, 'screen', 'none', 'prose', { screen: [a] }, ...O()] },
        ],
        h: [{ h: ['screen', 'lh', ...O()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...O()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...O()] }],
        'font-size': [{ text: ['base', n, ih, Jf] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [r, oh, th] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              Wf,
              Qf,
            ],
          },
        ],
        'font-family': [{ font: [ah, Qf, e] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [o, oh, Qf] }],
        'line-clamp': [{ 'line-clamp': [Rf, 'none', oh, th] }],
        leading: [{ leading: [i, ...w()] }],
        'list-image': [{ 'list-image': ['none', oh, Qf] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', oh, Qf] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: j() }],
        'text-color': [{ text: j() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [
          { decoration: ['solid', 'dashed', 'dotted', 'double', 'wavy'] },
        ],
        'text-decoration-thickness': [
          { decoration: [Rf, 'from-font', 'auto', oh, Jf] },
        ],
        'text-decoration-color': [{ decoration: j() }],
        'underline-offset': [{ 'underline-offset': [Rf, 'auto', oh, Qf] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: w() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              oh,
              Qf,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', oh, Qf] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: N() }],
        'bg-repeat': [
          { bg: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] },
        ],
        'bg-size': [{ bg: P() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  qf,
                  oh,
                  Qf,
                ],
                radial: ['', oh, Qf],
                conic: [qf, oh, Qf],
              },
              lh,
              nh,
            ],
          },
        ],
        'bg-color': [{ bg: j() }],
        'gradient-from-pos': [{ from: A() }],
        'gradient-via-pos': [{ via: A() }],
        'gradient-to-pos': [{ to: A() }],
        'gradient-from': [{ from: j() }],
        'gradient-via': [{ via: j() }],
        'gradient-to': [{ to: j() }],
        rounded: [{ rounded: E() }],
        'rounded-s': [{ 'rounded-s': E() }],
        'rounded-e': [{ 'rounded-e': E() }],
        'rounded-t': [{ 'rounded-t': E() }],
        'rounded-r': [{ 'rounded-r': E() }],
        'rounded-b': [{ 'rounded-b': E() }],
        'rounded-l': [{ 'rounded-l': E() }],
        'rounded-ss': [{ 'rounded-ss': E() }],
        'rounded-se': [{ 'rounded-se': E() }],
        'rounded-ee': [{ 'rounded-ee': E() }],
        'rounded-es': [{ 'rounded-es': E() }],
        'rounded-tl': [{ 'rounded-tl': E() }],
        'rounded-tr': [{ 'rounded-tr': E() }],
        'rounded-br': [{ 'rounded-br': E() }],
        'rounded-bl': [{ 'rounded-bl': E() }],
        'border-w': [{ border: C() }],
        'border-w-x': [{ 'border-x': C() }],
        'border-w-y': [{ 'border-y': C() }],
        'border-w-s': [{ 'border-s': C() }],
        'border-w-e': [{ 'border-e': C() }],
        'border-w-t': [{ 'border-t': C() }],
        'border-w-r': [{ 'border-r': C() }],
        'border-w-b': [{ 'border-b': C() }],
        'border-w-l': [{ 'border-l': C() }],
        'divide-x': [{ 'divide-x': C() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': C() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [
          { border: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] },
        ],
        'divide-style': [
          { divide: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] },
        ],
        'border-color': [{ border: j() }],
        'border-color-x': [{ 'border-x': j() }],
        'border-color-y': [{ 'border-y': j() }],
        'border-color-s': [{ 'border-s': j() }],
        'border-color-e': [{ 'border-e': j() }],
        'border-color-t': [{ 'border-t': j() }],
        'border-color-r': [{ 'border-r': j() }],
        'border-color-b': [{ 'border-b': j() }],
        'border-color-l': [{ 'border-l': j() }],
        'divide-color': [{ divide: j() }],
        'outline-style': [
          {
            outline: ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden'],
          },
        ],
        'outline-offset': [{ 'outline-offset': [Rf, oh, Qf] }],
        'outline-w': [{ outline: ['', Rf, ih, Jf] }],
        'outline-color': [{ outline: j() }],
        shadow: [{ shadow: ['', 'none', c, ch, rh] }],
        'shadow-color': [{ shadow: j() }],
        'inset-shadow': [{ 'inset-shadow': ['none', f, ch, rh] }],
        'inset-shadow-color': [{ 'inset-shadow': j() }],
        'ring-w': [{ ring: C() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: j() }],
        'ring-offset-w': [{ 'ring-offset': [Rf, Jf] }],
        'ring-offset-color': [{ 'ring-offset': j() }],
        'inset-ring-w': [{ 'inset-ring': C() }],
        'inset-ring-color': [{ 'inset-ring': j() }],
        'text-shadow': [{ 'text-shadow': ['none', h, ch, rh] }],
        'text-shadow-color': [{ 'text-shadow': j() }],
        opacity: [{ opacity: [Rf, oh, Qf] }],
        'mix-blend': [
          {
            'mix-blend': [
              'normal',
              'multiply',
              'screen',
              'overlay',
              'darken',
              'lighten',
              'color-dodge',
              'color-burn',
              'hard-light',
              'soft-light',
              'difference',
              'exclusion',
              'hue',
              'saturation',
              'color',
              'luminosity',
              'plus-darker',
              'plus-lighter',
            ],
          },
        ],
        'bg-blend': [
          {
            'bg-blend': [
              'normal',
              'multiply',
              'screen',
              'overlay',
              'darken',
              'lighten',
              'color-dodge',
              'color-burn',
              'hard-light',
              'soft-light',
              'difference',
              'exclusion',
              'hue',
              'saturation',
              'color',
              'luminosity',
            ],
          },
        ],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [Rf] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': $() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': $() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': j() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': j() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': $() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': $() }],
        'mask-image-t-from-color': [{ 'mask-t-from': j() }],
        'mask-image-t-to-color': [{ 'mask-t-to': j() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': $() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': $() }],
        'mask-image-r-from-color': [{ 'mask-r-from': j() }],
        'mask-image-r-to-color': [{ 'mask-r-to': j() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': $() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': $() }],
        'mask-image-b-from-color': [{ 'mask-b-from': j() }],
        'mask-image-b-to-color': [{ 'mask-b-to': j() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': $() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': $() }],
        'mask-image-l-from-color': [{ 'mask-l-from': j() }],
        'mask-image-l-to-color': [{ 'mask-l-to': j() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': $() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': $() }],
        'mask-image-x-from-color': [{ 'mask-x-from': j() }],
        'mask-image-x-to-color': [{ 'mask-x-to': j() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': $() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': $() }],
        'mask-image-y-from-color': [{ 'mask-y-from': j() }],
        'mask-image-y-to-color': [{ 'mask-y-to': j() }],
        'mask-image-radial': [{ 'mask-radial': [oh, Qf] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': $() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': $() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': j() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': j() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [
          {
            'mask-radial-at': [
              'center',
              'top',
              'bottom',
              'left',
              'right',
              'top-left',
              'left-top',
              'top-right',
              'right-top',
              'bottom-right',
              'right-bottom',
              'bottom-left',
              'left-bottom',
            ],
          },
        ],
        'mask-image-conic-pos': [{ 'mask-conic': [Rf] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': $() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': $() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': j() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': j() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: N() }],
        'mask-repeat': [
          { mask: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] },
        ],
        'mask-size': [{ mask: P() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', oh, Qf] }],
        filter: [{ filter: ['', 'none', oh, Qf] }],
        blur: [{ blur: D() }],
        brightness: [{ brightness: [Rf, oh, Qf] }],
        contrast: [{ contrast: [Rf, oh, Qf] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', p, ch, rh] }],
        'drop-shadow-color': [{ 'drop-shadow': j() }],
        grayscale: [{ grayscale: ['', Rf, oh, Qf] }],
        'hue-rotate': [{ 'hue-rotate': [Rf, oh, Qf] }],
        invert: [{ invert: ['', Rf, oh, Qf] }],
        saturate: [{ saturate: [Rf, oh, Qf] }],
        sepia: [{ sepia: ['', Rf, oh, Qf] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', oh, Qf] }],
        'backdrop-blur': [{ 'backdrop-blur': D() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [Rf, oh, Qf] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [Rf, oh, Qf] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', Rf, oh, Qf] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [Rf, oh, Qf] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', Rf, oh, Qf] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [Rf, oh, Qf] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [Rf, oh, Qf] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', Rf, oh, Qf] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': w() }],
        'border-spacing-x': [{ 'border-spacing-x': w() }],
        'border-spacing-y': [{ 'border-spacing-y': w() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              oh,
              Qf,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [Rf, 'initial', oh, Qf] }],
        ease: [{ ease: ['linear', 'initial', m, oh, Qf] }],
        delay: [{ delay: [Rf, oh, Qf] }],
        animate: [{ animate: ['none', b, oh, Qf] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [g, oh, Qf] }],
        'perspective-origin': [{ 'perspective-origin': v() }],
        rotate: [{ rotate: U() }],
        'rotate-x': [{ 'rotate-x': U() }],
        'rotate-y': [{ 'rotate-y': U() }],
        'rotate-z': [{ 'rotate-z': U() }],
        scale: [{ scale: z() }],
        'scale-x': [{ 'scale-x': z() }],
        'scale-y': [{ 'scale-y': z() }],
        'scale-z': [{ 'scale-z': z() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: F() }],
        'skew-x': [{ 'skew-x': F() }],
        'skew-y': [{ 'skew-y': F() }],
        transform: [{ transform: [oh, Qf, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: v() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: I() }],
        'translate-x': [{ 'translate-x': I() }],
        'translate-y': [{ 'translate-y': I() }],
        'translate-z': [{ 'translate-z': I() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: j() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: j() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              oh,
              Qf,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': w() }],
        'scroll-mx': [{ 'scroll-mx': w() }],
        'scroll-my': [{ 'scroll-my': w() }],
        'scroll-ms': [{ 'scroll-ms': w() }],
        'scroll-me': [{ 'scroll-me': w() }],
        'scroll-mt': [{ 'scroll-mt': w() }],
        'scroll-mr': [{ 'scroll-mr': w() }],
        'scroll-mb': [{ 'scroll-mb': w() }],
        'scroll-ml': [{ 'scroll-ml': w() }],
        'scroll-p': [{ 'scroll-p': w() }],
        'scroll-px': [{ 'scroll-px': w() }],
        'scroll-py': [{ 'scroll-py': w() }],
        'scroll-ps': [{ 'scroll-ps': w() }],
        'scroll-pe': [{ 'scroll-pe': w() }],
        'scroll-pt': [{ 'scroll-pt': w() }],
        'scroll-pr': [{ 'scroll-pr': w() }],
        'scroll-pb': [{ 'scroll-pb': w() }],
        'scroll-pl': [{ 'scroll-pl': w() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          {
            'will-change': ['auto', 'scroll', 'contents', 'transform', oh, Qf],
          },
        ],
        fill: [{ fill: ['none', ...j()] }],
        'stroke-w': [{ stroke: [Rf, ih, Jf, th] }],
        stroke: [{ stroke: ['none', ...j()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  }),
  _h = (t) => ('boolean' == typeof t ? `${t}` : 0 === t ? '0' : t),
  xh = ut,
  Mh = (t, e) => (n) => {
    var r;
    if (null == (null == e ? void 0 : e.variants))
      return xh(
        t,
        null == n ? void 0 : n.class,
        null == n ? void 0 : n.className
      );
    const { variants: o, defaultVariants: i } = e,
      a = Object.keys(o).map((t) => {
        const e = null == n ? void 0 : n[t],
          r = null == i ? void 0 : i[t];
        if (null === e) return null;
        const a = _h(e) || _h(r);
        return o[t][a];
      }),
      s =
        n &&
        Object.entries(n).reduce((t, e) => {
          let [n, r] = e;
          return (void 0 === r || (t[n] = r), t);
        }, {}),
      u =
        null == e || null === (r = e.compoundVariants) || void 0 === r
          ? void 0
          : r.reduce((t, e) => {
              let { class: n, className: r, ...o } = e;
              return Object.entries(o).every((t) => {
                let [e, n] = t;
                return Array.isArray(n)
                  ? n.includes({ ...i, ...s }[e])
                  : { ...i, ...s }[e] === n;
              })
                ? [...t, n, r]
                : t;
            }, []);
    return xh(
      t,
      a,
      u,
      null == n ? void 0 : n.class,
      null == n ? void 0 : n.className
    );
  };
export {
  Bc as $,
  gi as A,
  Se as B,
  Me as C,
  Ne as D,
  je as E,
  xe as F,
  Oe as G,
  xi as H,
  oi as I,
  si as J,
  jt as K,
  Ot as L,
  we as M,
  _e as N,
  ve as O,
  me as P,
  de as Q,
  pe as R,
  Kt as S,
  kt as T,
  ie as U,
  At as V,
  Pt as W,
  Jt as X,
  re as Y,
  ee as Z,
  Mi as _,
  Xe as a,
  gc as a0,
  Ui as a1,
  ki as a2,
  Gc as a3,
  sf as a4,
  pf as a5,
  df as a6,
  h as a7,
  F as a8,
  U as a9,
  z as aa,
  o as ab,
  m as ac,
  $ as ad,
  w as ae,
  q as af,
  y as ag,
  E as ah,
  f as ai,
  e as aj,
  at as ak,
  wh as al,
  Mh as am,
  Gt as b,
  ut as c,
  Wt as d,
  Rt as e,
  zt as f,
  t as g,
  Ut as h,
  V as i,
  Ct as j,
  Et as k,
  Ur as l,
  ao as m,
  mo as n,
  fo as o,
  po as p,
  yo as q,
  u as r,
  Z as s,
  go as t,
  jr as u,
  ho as v,
  ai as w,
  ko as x,
  Mo as y,
  di as z,
};
