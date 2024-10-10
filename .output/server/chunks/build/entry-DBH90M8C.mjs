import { version, unref, inject, defineAsyncComponent, defineComponent, h, getCurrentInstance, ref, readonly, computed, provide, shallowReactive, watch, Suspense, nextTick, Fragment, Transition, hasInjectionContext, toRef, onMounted, mergeProps, useSSRContext, shallowRef, createApp, effectScope, reactive, getCurrentScope, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, Text, isReadonly, withCtx, isRef, isShallow, isReactive, toRaw, markRaw } from 'vue';
import { $ as $fetch, h as createError$1, l as defu, m as sanitizeStatusCode, n as createHooks, t as toRouteMatcher, o as createRouter$1, p as getRequestHeaders, q as klona, r as parse$1, v as getRequestHeader, w as destr, x as isEqual$1, y as setCookie, z as getCookie, A as deleteCookie } from '../runtime.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { getActiveHead, CapoPlugin } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis[globalKey$2] || (_globalThis[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis[asyncHandlersKey$1] || (_globalThis[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const appLayoutTransition = { "name": "slide-right", "mode": "out-in" };
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "prefetch": true, "prefetchOn": { "visibility": true } };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.13.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter$1(nuxtApp, $name, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2, _b2;
    const unresolvedPluginsForThisPlugin = (_b2 = (_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) != null ? _b2 : [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function isEqual(a, b, options = {}) {
  if (!options.trailingSlash) {
    a = withTrailingSlash(a);
    b = withTrailingSlash(b);
  }
  if (!options.leadingSlash) {
    a = withLeadingSlash(a);
    b = withLeadingSlash(b);
  }
  if (!options.encoding) {
    a = decode(a);
    b = decode(b);
  }
  return a === b;
}
const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler2) {
  _global[globalKey$1] = handler2;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && false)
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis$1[globalKey] || (_globalThis$1[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const _routes = [
  {
    name: "index___en",
    path: "/",
    component: () => import('./index-cE9e7YzM.mjs')
  },
  {
    name: "index___fr",
    path: "/fr",
    component: () => import('./index-cE9e7YzM.mjs')
  },
  {
    name: "settings-data_source___en",
    path: "/settings/data_source",
    component: () => import('./data_source-CVAt8Lab.mjs')
  },
  {
    name: "settings-data_source___fr",
    path: "/fr/settings/data_source",
    component: () => import('./data_source-CVAt8Lab.mjs')
  },
  {
    name: "settings-data_sources___en",
    path: "/settings/data_sources",
    component: () => import('./data_sources-5vzFEDbU.mjs')
  },
  {
    name: "settings-data_sources___fr",
    path: "/fr/settings/data_sources",
    component: () => import('./data_sources-5vzFEDbU.mjs')
  },
  {
    name: "settings-list___en",
    path: "/settings/list",
    component: () => import('./list-Dl_zO7rg.mjs')
  },
  {
    name: "settings-list___fr",
    path: "/fr/settings/list",
    component: () => import('./list-Dl_zO7rg.mjs')
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  var _a;
  const source = (_a = route == null ? void 0 : route.meta.key) != null ? _a : route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index2]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a, _b;
    const nuxtApp = useNuxtApp();
    const behavior = (_b = (_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) != null ? _b : "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => {
      var _a2;
      return !!((_a2 = route.meta.pageTransition) != null ? _a2 : appPageTransition);
    };
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve2) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve22) => setTimeout(resolve22, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve2(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c, _d, _e;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? (_c = ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp)) != null ? _c : _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d2;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_d = nuxtApp.ssrContext) == null ? void 0 : _d.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError$1({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath
            }
          })));
        } else if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_e = nuxtApp.ssrContext) == null ? void 0 : _e.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyAutoComplete = defineAsyncComponent(() => import('./autocomplete.esm-BNEdF6-t.mjs').then((r) => r["default"] || r.default || r));
const LazyCalendar = defineAsyncComponent(() => import('./calendar.esm-DTD2EOyq.mjs').then((r) => r["default"] || r.default || r));
const LazyCascadeSelect = defineAsyncComponent(() => import('./cascadeselect.esm-DH0lS6UV.mjs').then((r) => r["default"] || r.default || r));
const LazyCheckbox = defineAsyncComponent(() => import('./checkbox.esm-C6yPu7v1.mjs').then((r) => r["default"] || r.default || r));
const LazyChips = defineAsyncComponent(() => import('./chips.esm-Bb0847DF.mjs').then((r) => r["default"] || r.default || r));
const LazyColorPicker = defineAsyncComponent(() => import('./colorpicker.esm-DNSfWUIi.mjs').then((r) => r["default"] || r.default || r));
const LazyDropdown = defineAsyncComponent(() => import('./dropdown.esm-CV7WA6-d.mjs').then((r) => r["default"] || r.default || r));
const LazyFloatLabel = defineAsyncComponent(() => import('./floatlabel.esm-C8IlSvwE.mjs').then((r) => r["default"] || r.default || r));
const LazyIconField = defineAsyncComponent(() => import('./iconfield.esm-CDf9blJE.mjs').then((r) => r["default"] || r.default || r));
const LazyInputGroup = defineAsyncComponent(() => import('./inputgroup.esm-CsQcd-FK.mjs').then((r) => r["default"] || r.default || r));
const LazyInputGroupAddon = defineAsyncComponent(() => import('./inputgroupaddon.esm-DZW2IopQ.mjs').then((r) => r["default"] || r.default || r));
const LazyInputIcon = defineAsyncComponent(() => import('./inputicon.esm-csVgtatD.mjs').then((r) => r["default"] || r.default || r));
const LazyInputMask = defineAsyncComponent(() => import('./inputmask.esm-Z_hemCF_.mjs').then((r) => r["default"] || r.default || r));
const LazyInputNumber = defineAsyncComponent(() => import('./inputnumber.esm-DK8IcHMc.mjs').then((r) => r["default"] || r.default || r));
const LazyInputOtp = defineAsyncComponent(() => import('./inputotp.esm-0H3jv3zJ.mjs').then((r) => r["default"] || r.default || r));
const LazyInputSwitch = defineAsyncComponent(() => import('./inputswitch.esm-Bk4BLnzs.mjs').then((r) => r["default"] || r.default || r));
const LazyInputText = defineAsyncComponent(() => import('./inputtext.esm-WVvhv2iX.mjs').then((r) => r["default"] || r.default || r));
const LazyKnob = defineAsyncComponent(() => import('./knob.esm-p_oM7fNT.mjs').then((r) => r["default"] || r.default || r));
const LazyListbox = defineAsyncComponent(() => import('./listbox.esm-Dd7PuUIZ.mjs').then((r) => r["default"] || r.default || r));
const LazyMultiSelect = defineAsyncComponent(() => import('./multiselect.esm-DWdJOaFy.mjs').then((r) => r["default"] || r.default || r));
const LazyPassword = defineAsyncComponent(() => import('./password.esm-BifZmAh-.mjs').then((r) => r["default"] || r.default || r));
const LazyRadioButton = defineAsyncComponent(() => import('./radiobutton.esm-BeBAOoEC.mjs').then((r) => r["default"] || r.default || r));
const LazyRating = defineAsyncComponent(() => import('./rating.esm-CHja7SQI.mjs').then((r) => r["default"] || r.default || r));
const LazySelectButton = defineAsyncComponent(() => import('./selectbutton.esm-zIP72uf2.mjs').then((r) => r["default"] || r.default || r));
const LazySlider = defineAsyncComponent(() => import('./slider.esm-DLkMhu22.mjs').then((r) => r["default"] || r.default || r));
const LazyTextarea = defineAsyncComponent(() => import('./textarea.esm-6g4qiBVq.mjs').then((r) => r["default"] || r.default || r));
const LazyToggleButton = defineAsyncComponent(() => import('./togglebutton.esm-BSd-NDbR.mjs').then((r) => r["default"] || r.default || r));
const LazyTreeSelect = defineAsyncComponent(() => import('./treeselect.esm-Cur_ENmm.mjs').then((r) => r["default"] || r.default || r));
const LazyTriStateCheckbox = defineAsyncComponent(() => import('./tristatecheckbox.esm-_zEx8znU.mjs').then((r) => r["default"] || r.default || r));
const LazyButton = defineAsyncComponent(() => import('./button.esm-BlFBN1ui.mjs').then((r) => r["default"] || r.default || r));
const LazyButtonGroup = defineAsyncComponent(() => import('./buttongroup.esm-CRnQZZAv.mjs').then((r) => r["default"] || r.default || r));
const LazySpeedDial = defineAsyncComponent(() => import('./speeddial.esm-BV1CidJO.mjs').then((r) => r["default"] || r.default || r));
const LazySplitButton = defineAsyncComponent(() => import('./splitbutton.esm-CQwQgR49.mjs').then((r) => r["default"] || r.default || r));
const LazyColumn = defineAsyncComponent(() => import('./column.esm-IdVfKx_m.mjs').then((r) => r["default"] || r.default || r));
const LazyRow = defineAsyncComponent(() => import('./row.esm-CwV6-UQF.mjs').then((r) => r["default"] || r.default || r));
const LazyColumnGroup = defineAsyncComponent(() => import('./columngroup.esm-aGcA3Q4D.mjs').then((r) => r["default"] || r.default || r));
const LazyDataTable = defineAsyncComponent(() => import('./datatable.esm-DnGa6XyQ.mjs').then((r) => r["default"] || r.default || r));
const LazyDataView = defineAsyncComponent(() => import('./dataview.esm-D3WXlsBT.mjs').then((r) => r["default"] || r.default || r));
const LazyDataViewLayoutOptions = defineAsyncComponent(() => import('./dataviewlayoutoptions.esm-Bkzzvdy7.mjs').then((r) => r["default"] || r.default || r));
const LazyOrderList = defineAsyncComponent(() => import('./orderlist.esm-CQ5jNOMD.mjs').then((r) => r["default"] || r.default || r));
const LazyOrganizationChart = defineAsyncComponent(() => import('./organizationchart.esm-cAdt9sBg.mjs').then((r) => r["default"] || r.default || r));
const LazyPaginator = defineAsyncComponent(() => import('./paginator.esm-CI19EOG3.mjs').then((r) => r["default"] || r.default || r));
const LazyPickList = defineAsyncComponent(() => import('./picklist.esm-CiAlpLyv.mjs').then((r) => r["default"] || r.default || r));
const LazyTree = defineAsyncComponent(() => import('./tree.esm-CUNkkuLa.mjs').then((r) => r["default"] || r.default || r));
const LazyTreeTable = defineAsyncComponent(() => import('./treetable.esm-C8b_U3QN.mjs').then((r) => r["default"] || r.default || r));
const LazyTimeline = defineAsyncComponent(() => import('./timeline.esm-B1A4li73.mjs').then((r) => r["default"] || r.default || r));
const LazyVirtualScroller = defineAsyncComponent(() => import('./virtualscroller.esm-nKgjdA3j.mjs').then((r) => r["default"] || r.default || r));
const LazyAccordion = defineAsyncComponent(() => import('./accordion.esm-CGYT0Pi3.mjs').then((r) => r["default"] || r.default || r));
const LazyAccordionTab = defineAsyncComponent(() => import('./accordiontab.esm-CPr5fP4-.mjs').then((r) => r["default"] || r.default || r));
const LazyCard = defineAsyncComponent(() => import('./card.esm-CQefo3Fw.mjs').then((r) => r["default"] || r.default || r));
const LazyDeferredContent = defineAsyncComponent(() => import('./deferredcontent.esm-BH3jN2Nv.mjs').then((r) => r["default"] || r.default || r));
const LazyDivider = defineAsyncComponent(() => import('./divider.esm-BviKdS6B.mjs').then((r) => r["default"] || r.default || r));
const LazyFieldset = defineAsyncComponent(() => import('./fieldset.esm-D_AAW6aV.mjs').then((r) => r["default"] || r.default || r));
const LazyPanel = defineAsyncComponent(() => import('./panel.esm-CLvSGW9N.mjs').then((r) => r["default"] || r.default || r));
const LazyScrollPanel = defineAsyncComponent(() => import('./scrollpanel.esm-CyyUFX4H.mjs').then((r) => r["default"] || r.default || r));
const LazySplitter = defineAsyncComponent(() => import('./splitter.esm-CCdE8_tP.mjs').then((r) => r["default"] || r.default || r));
const LazySplitterPanel = defineAsyncComponent(() => import('./splitterpanel.esm-BvrfjrMh.mjs').then((r) => r["default"] || r.default || r));
const LazyStepper = defineAsyncComponent(() => import('./stepper.esm-B6Jhxtei.mjs').then((r) => r["default"] || r.default || r));
const LazyStepperPanel = defineAsyncComponent(() => import('./stepperpanel.esm-CHyYRO3j.mjs').then((r) => r["default"] || r.default || r));
const LazyTabView = defineAsyncComponent(() => import('./tabview.esm-BtRYm5VH.mjs').then((r) => r["default"] || r.default || r));
const LazyTabPanel = defineAsyncComponent(() => import('./tabpanel.esm-BI6AE5zb.mjs').then((r) => r["default"] || r.default || r));
const LazyToolbar = defineAsyncComponent(() => import('./toolbar.esm-XAnvRrzI.mjs').then((r) => r["default"] || r.default || r));
const LazyConfirmDialog = defineAsyncComponent(() => import('./confirmdialog.esm-CZjN-o7R.mjs').then((r) => r["default"] || r.default || r));
const LazyConfirmPopup = defineAsyncComponent(() => import('./confirmpopup.esm-D5DenmpN.mjs').then((r) => r["default"] || r.default || r));
const LazyDialog = defineAsyncComponent(() => import('./dialog.esm-B4HW-uBS.mjs').then((r) => r["default"] || r.default || r));
const LazyDynamicDialog = defineAsyncComponent(() => import('./dynamicdialog.esm-C0qKtfcU.mjs').then((r) => r["default"] || r.default || r));
const LazyOverlayPanel = defineAsyncComponent(() => import('./overlaypanel.esm-BQK7Iz0O.mjs').then((r) => r["default"] || r.default || r));
const LazySidebar = defineAsyncComponent(() => import('./sidebar.esm-CrxgIYEO.mjs').then((r) => r["default"] || r.default || r));
const LazyFileUpload = defineAsyncComponent(() => import('./fileupload.esm-CAV9DtQK.mjs').then((r) => r["default"] || r.default || r));
const LazyBreadcrumb = defineAsyncComponent(() => import('./breadcrumb.esm-De42_WfA.mjs').then((r) => r["default"] || r.default || r));
const LazyContextMenu = defineAsyncComponent(() => import('./contextmenu.esm-D1YcAhhk.mjs').then((r) => r["default"] || r.default || r));
const LazyDock = defineAsyncComponent(() => import('./dock.esm-_IoP6IyJ.mjs').then((r) => r["default"] || r.default || r));
const LazyMenu = defineAsyncComponent(() => import('./menu.esm-jMuLiP28.mjs').then((r) => r["default"] || r.default || r));
const LazyMenubar = defineAsyncComponent(() => import('./menubar.esm-nZ_ct6bK.mjs').then((r) => r["default"] || r.default || r));
const LazyMegaMenu = defineAsyncComponent(() => import('./megamenu.esm-eWXu_091.mjs').then((r) => r["default"] || r.default || r));
const LazyPanelMenu = defineAsyncComponent(() => import('./panelmenu.esm-2N-T9Ig6.mjs').then((r) => r["default"] || r.default || r));
const LazySteps = defineAsyncComponent(() => import('./steps.esm-C9oGX59C.mjs').then((r) => r["default"] || r.default || r));
const LazyTabMenu = defineAsyncComponent(() => import('./tabmenu.esm-CeMQHatO.mjs').then((r) => r["default"] || r.default || r));
const LazyTieredMenu = defineAsyncComponent(() => import('./tieredmenu.esm-DUR97cdQ.mjs').then((r) => r["default"] || r.default || r));
const LazyMessage = defineAsyncComponent(() => import('./message.esm-Q8FElxM1.mjs').then((r) => r["default"] || r.default || r));
const LazyInlineMessage = defineAsyncComponent(() => import('./inlinemessage.esm-DScGXN2r.mjs').then((r) => r["default"] || r.default || r));
const LazyToast = defineAsyncComponent(() => import('./toast.esm-CIoHYv1e.mjs').then((r) => r["default"] || r.default || r));
const LazyCarousel = defineAsyncComponent(() => import('./carousel.esm-z1r-cGQ9.mjs').then((r) => r["default"] || r.default || r));
const LazyGalleria = defineAsyncComponent(() => import('./galleria.esm-QIhN_iSl.mjs').then((r) => r["default"] || r.default || r));
const LazyImage = defineAsyncComponent(() => import('./image.esm-DupmLp0T.mjs').then((r) => r["default"] || r.default || r));
const LazyAvatar = defineAsyncComponent(() => import('./avatar.esm-CliMwple.mjs').then((r) => r["default"] || r.default || r));
const LazyAvatarGroup = defineAsyncComponent(() => import('./avatargroup.esm-Ci4P-2ZA.mjs').then((r) => r["default"] || r.default || r));
const LazyBadge = defineAsyncComponent(() => import('./badge.esm-Bnez2rIR.mjs').then((r) => r["default"] || r.default || r));
const LazyBlockUI = defineAsyncComponent(() => import('./blockui.esm-CChbD2Sd.mjs').then((r) => r["default"] || r.default || r));
const LazyChip = defineAsyncComponent(() => import('./chip.esm-ytN22-8j.mjs').then((r) => r["default"] || r.default || r));
const LazyInplace = defineAsyncComponent(() => import('./inplace.esm-DN2Hluth.mjs').then((r) => r["default"] || r.default || r));
const LazyMeterGroup = defineAsyncComponent(() => import('./metergroup.esm-iNdLr86v.mjs').then((r) => r["default"] || r.default || r));
const LazyScrollTop = defineAsyncComponent(() => import('./scrolltop.esm-C-yEmk4V.mjs').then((r) => r["default"] || r.default || r));
const LazySkeleton = defineAsyncComponent(() => import('./skeleton.esm-CeK9za9s.mjs').then((r) => r["default"] || r.default || r));
const LazyProgressBar = defineAsyncComponent(() => import('./progressbar.esm-DYYdgqN9.mjs').then((r) => r["default"] || r.default || r));
const LazyProgressSpinner = defineAsyncComponent(() => import('./progressspinner.esm-e6l3Lf-N.mjs').then((r) => r["default"] || r.default || r));
const LazyTag = defineAsyncComponent(() => import('./tag.esm-DAkzesI3.mjs').then((r) => r["default"] || r.default || r));
const LazyTerminal = defineAsyncComponent(() => import('./terminal.esm-B3lSBkER.mjs').then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["AutoComplete", LazyAutoComplete],
  ["Calendar", LazyCalendar],
  ["CascadeSelect", LazyCascadeSelect],
  ["Checkbox", LazyCheckbox],
  ["Chips", LazyChips],
  ["ColorPicker", LazyColorPicker],
  ["Dropdown", LazyDropdown],
  ["FloatLabel", LazyFloatLabel],
  ["IconField", LazyIconField],
  ["InputGroup", LazyInputGroup],
  ["InputGroupAddon", LazyInputGroupAddon],
  ["InputIcon", LazyInputIcon],
  ["InputMask", LazyInputMask],
  ["InputNumber", LazyInputNumber],
  ["InputOtp", LazyInputOtp],
  ["InputSwitch", LazyInputSwitch],
  ["InputText", LazyInputText],
  ["Knob", LazyKnob],
  ["Listbox", LazyListbox],
  ["MultiSelect", LazyMultiSelect],
  ["Password", LazyPassword],
  ["RadioButton", LazyRadioButton],
  ["Rating", LazyRating],
  ["SelectButton", LazySelectButton],
  ["Slider", LazySlider],
  ["Textarea", LazyTextarea],
  ["ToggleButton", LazyToggleButton],
  ["TreeSelect", LazyTreeSelect],
  ["TriStateCheckbox", LazyTriStateCheckbox],
  ["Button", LazyButton],
  ["ButtonGroup", LazyButtonGroup],
  ["SpeedDial", LazySpeedDial],
  ["SplitButton", LazySplitButton],
  ["Column", LazyColumn],
  ["Row", LazyRow],
  ["ColumnGroup", LazyColumnGroup],
  ["DataTable", LazyDataTable],
  ["DataView", LazyDataView],
  ["DataViewLayoutOptions", LazyDataViewLayoutOptions],
  ["OrderList", LazyOrderList],
  ["OrganizationChart", LazyOrganizationChart],
  ["Paginator", LazyPaginator],
  ["PickList", LazyPickList],
  ["Tree", LazyTree],
  ["TreeTable", LazyTreeTable],
  ["Timeline", LazyTimeline],
  ["VirtualScroller", LazyVirtualScroller],
  ["Accordion", LazyAccordion],
  ["AccordionTab", LazyAccordionTab],
  ["Card", LazyCard],
  ["DeferredContent", LazyDeferredContent],
  ["Divider", LazyDivider],
  ["Fieldset", LazyFieldset],
  ["Panel", LazyPanel],
  ["ScrollPanel", LazyScrollPanel],
  ["Splitter", LazySplitter],
  ["SplitterPanel", LazySplitterPanel],
  ["Stepper", LazyStepper],
  ["StepperPanel", LazyStepperPanel],
  ["TabView", LazyTabView],
  ["TabPanel", LazyTabPanel],
  ["Toolbar", LazyToolbar],
  ["ConfirmDialog", LazyConfirmDialog],
  ["ConfirmPopup", LazyConfirmPopup],
  ["Dialog", LazyDialog],
  ["DynamicDialog", LazyDynamicDialog],
  ["OverlayPanel", LazyOverlayPanel],
  ["Sidebar", LazySidebar],
  ["FileUpload", LazyFileUpload],
  ["Breadcrumb", LazyBreadcrumb],
  ["ContextMenu", LazyContextMenu],
  ["Dock", LazyDock],
  ["Menu", LazyMenu],
  ["Menubar", LazyMenubar],
  ["MegaMenu", LazyMegaMenu],
  ["PanelMenu", LazyPanelMenu],
  ["Steps", LazySteps],
  ["TabMenu", LazyTabMenu],
  ["TieredMenu", LazyTieredMenu],
  ["Message", LazyMessage],
  ["InlineMessage", LazyInlineMessage],
  ["Toast", LazyToast],
  ["Carousel", LazyCarousel],
  ["Galleria", LazyGalleria],
  ["Image", LazyImage],
  ["Avatar", LazyAvatar],
  ["AvatarGroup", LazyAvatarGroup],
  ["Badge", LazyBadge],
  ["BlockUI", LazyBlockUI],
  ["Chip", LazyChip],
  ["Inplace", LazyInplace],
  ["MeterGroup", LazyMeterGroup],
  ["ScrollTop", LazyScrollTop],
  ["Skeleton", LazySkeleton],
  ["ProgressBar", LazyProgressBar],
  ["ProgressSpinner", LazyProgressSpinner],
  ["Tag", LazyTag],
  ["Terminal", LazyTerminal]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
/*!
  * shared v9.14.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = false;
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign = Object.assign;
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item, index2) => index2 === 0 ? str + item : str + separator + item, "");
}
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (isObject(src2[key]) && !isObject(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : {};
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
function isHTTPS(req, trustProxy = true) {
  const _xForwardedProto = trustProxy && req.headers ? req.headers["x-forwarded-proto"] : void 0;
  const protoCheck = typeof _xForwardedProto === "string" ? _xForwardedProto.includes("https") : void 0;
  if (protoCheck) {
    return true;
  }
  const _encrypted = req.connection ? req.connection.encrypted : void 0;
  const encryptedCheck = _encrypted !== void 0 ? _encrypted === true : void 0;
  if (encryptedCheck) {
    return true;
  }
  if (protoCheck === void 0 && encryptedCheck === void 0) {
    return void 0;
  }
  return false;
}
const localeCodes = [
  "en",
  "fr"
];
const localeLoaders = {
  "en": [{ key: "../lang/en.json", load: () => import(
    './en-_TdrO2NC.mjs'
    /* webpackChunkName: "locale__Users_air_Documents_Vscode_Nuxtjs_Docspawn_testing_and_data_source_lang_en_json" */
  ), cache: true }],
  "fr": [{ key: "../lang/fr.json", load: () => import(
    './fr-m--EbcYS.mjs'
    /* webpackChunkName: "locale__Users_air_Documents_Vscode_Nuxtjs_Docspawn_testing_and_data_source_lang_fr_json" */
  ), cache: true }]
};
const vueI18nConfigs = [
  () => import(
    './i18n.config-DtIctSZj.mjs'
    /* webpackChunkName: "___i18n_config_js_c231e734" */
  )
];
const normalizedLocales = [
  {
    "code": "en",
    "name": "English",
    "language": "en-US",
    "files": [
      {
        "path": "/Users/air/Documents/Vscode/Nuxtjs/Docspawn_testing_and_data_source/lang/en.json"
      }
    ]
  },
  {
    "code": "fr",
    "name": "Fran\xE7ais",
    "language": "fr-FR",
    "files": [
      {
        "path": "/Users/air/Documents/Vscode/Nuxtjs/Docspawn_testing_and_data_source/lang/fr.json"
      }
    ]
  }
];
const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const parallelPlugin = false;
const isSSG = false;
const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n";
const DEFAULT_COOKIE_KEY = "i18n_redirected";
const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp";
function getNormalizedLocales(locales) {
  locales = locales || [];
  const normalized = [];
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && "locale" in target && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function getI18nTarget(i18n) {
  return isI18nInstance(i18n) ? i18n.global : i18n;
}
function getComposer$3(i18n) {
  const target = getI18nTarget(i18n);
  if (isComposer(target))
    return target;
  if (isVueI18n(target))
    return target.__composer;
  return target;
}
function getLocale$1(i18n) {
  return unref(getI18nTarget(i18n).locale);
}
function getLocales(i18n) {
  return unref(getI18nTarget(i18n).locales);
}
function getLocaleCodes(i18n) {
  return unref(getI18nTarget(i18n).localeCodes);
}
function setLocale(i18n, locale) {
  const target = getI18nTarget(i18n);
  if (isRef(target.locale)) {
    target.locale.value = locale;
  } else {
    target.locale = locale;
  }
}
function getRouteName(routeName) {
  if (isString(routeName))
    return routeName;
  if (isSymbol(routeName))
    return routeName.toString();
  return "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix,
  differentDomains
}) {
  const localizedRoutes = strategy !== "no_prefix" || differentDomains;
  let name = getRouteName(routeName) + (localizedRoutes ? routesNameSeparator + locale : "");
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index2, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index2 / browserLocales.length });
      break;
    }
  }
  for (const [index2, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index2 / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales2 = [];
  for (const l of locales) {
    const { code: code2 } = l;
    const language = l.language || code2;
    normalizedLocales2.push({ code: code2, language });
  }
  const matchedLocales = matcher(normalizedLocales2, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
const cacheMessages = /* @__PURE__ */ new Map();
async function loadVueI18nOptions(vueI18nConfigs2, nuxt) {
  const vueI18nOptions = { messages: {} };
  for (const configFile of vueI18nConfigs2) {
    const { default: resolver } = await configFile();
    const resolved = isFunction(resolver) ? await nuxt.runWithContext(async () => await resolver()) : resolver;
    deepCopy(resolved, vueI18nOptions);
  }
  return vueI18nOptions;
}
function makeFallbackLocaleCodes(fallback, locales) {
  let fallbackLocales = [];
  if (isArray(fallback)) {
    fallbackLocales = fallback;
  } else if (isObject(fallback)) {
    const targets = [...locales, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (isString(fallback) && locales.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(messages, localeLoaders2, options) {
  const { defaultLocale, initialLocale, localeCodes: localeCodes2, fallbackLocale, lazy } = options;
  if (lazy && fallbackLocale) {
    const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
    await Promise.all(fallbackLocales.map((locale) => loadAndSetLocaleMessages(locale, localeLoaders2, messages)));
  }
  const locales = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes2;
  await Promise.all(locales.map((locale) => loadAndSetLocaleMessages(locale, localeLoaders2, messages)));
  return messages;
}
async function loadMessage(locale, { key, load }) {
  let message2 = null;
  try {
    const getter = await load().then((r) => r.default || r);
    if (isFunction(getter)) {
      message2 = await getter(locale);
    } else {
      message2 = getter;
      if (message2 != null && cacheMessages) {
        cacheMessages.set(key, message2);
      }
    }
  } catch (e) {
    console.error("Failed locale loading: " + e.message);
  }
  return message2;
}
async function loadLocale(locale, localeLoaders2, setter) {
  const loaders = localeLoaders2[locale];
  if (loaders == null) {
    console.warn("Could not find messages for locale code: " + locale);
    return;
  }
  const targetMessage = {};
  for (const loader of loaders) {
    let message2 = null;
    if (cacheMessages && cacheMessages.has(loader.key) && loader.cache) {
      message2 = cacheMessages.get(loader.key);
    } else {
      message2 = await loadMessage(locale, loader);
    }
    if (message2 != null) {
      deepCopy(message2, targetMessage);
    }
  }
  setter(locale, targetMessage);
}
async function loadAndSetLocaleMessages(locale, localeLoaders2, messages) {
  const setter = (locale2, message2) => {
    const base = messages[locale2] || {};
    deepCopy(message2, base);
    messages[locale2] = base;
  };
  await loadLocale(locale, localeLoaders2, setter);
}
function split(str, index2) {
  const result = [str.slice(0, index2), str.slice(index2)];
  return result;
}
function routeToObject(route) {
  const { fullPath, query, hash, name, path, params, meta, redirectedFrom, matched } = route;
  return {
    fullPath,
    params,
    query,
    hash,
    name,
    path,
    meta,
    matched,
    redirectedFrom
  };
}
function resolve({ router }, route, strategy, locale) {
  var _a, _b;
  if (strategy !== "prefix") {
    return router.resolve(route);
  }
  const [rootSlash, restPath] = split(route.path, 1);
  const targetPath = `${rootSlash}${locale}${restPath === "" ? restPath : `/${restPath}`}`;
  const _route = (_b = (_a = router.options) == null ? void 0 : _a.routes) == null ? void 0 : _b.find((r) => r.path === targetPath);
  if (_route == null) {
    return route;
  }
  const _resolvableRoute = assign({}, route, _route);
  _resolvableRoute.path = targetPath;
  return router.resolve(_resolvableRoute);
}
const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(options) {
  const { currentLocale, defaultLocale, strategy } = options;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && // no prefix for any language
  !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(common, givenRoute) {
  const { routesNameSeparator } = common.runtimeConfig.public.i18n;
  const route = unref(givenRoute);
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(common, route, locale) {
  var _a;
  if (typeof route === "string" && hasProtocol(route, { acceptRelative: true })) {
    return route;
  }
  const localizedRoute = resolveRoute(common, route, locale);
  return localizedRoute == null ? "" : ((_a = localizedRoute.redirectedFrom) == null ? void 0 : _a.fullPath) || localizedRoute.fullPath;
}
function localeRoute(common, route, locale) {
  const resolved = resolveRoute(common, route, locale);
  return resolved != null ? resolved : void 0;
}
function localeLocation(common, route, locale) {
  const resolved = resolveRoute(common, route, locale);
  return resolved != null ? resolved : void 0;
}
function resolveRoute(common, route, locale) {
  const { router, i18n } = common;
  const _locale = locale || getLocale$1(i18n);
  const { defaultLocale, strategy, trailingSlash } = common.runtimeConfig.public.i18n;
  const prefixable2 = extendPrefixable(common.runtimeConfig);
  let _route;
  if (isString(route)) {
    if (route[0] === "/") {
      const { pathname: path, search, hash } = parsePath(route);
      const query = parseQuery(search);
      _route = { path, query, hash };
    } else {
      _route = { name: route };
    }
  } else {
    _route = route;
  }
  let localizedRoute = assign({}, _route);
  const isRouteLocationPathRaw = (val) => "path" in val && !!val.path && !("name" in val);
  if (isRouteLocationPathRaw(localizedRoute)) {
    const resolvedRoute = resolve(common, localizedRoute, strategy, _locale);
    const resolvedRouteName = getRouteBaseName(common, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, common.runtimeConfig.public.i18n),
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      localizedRoute.state = resolvedRoute.state;
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !("path" in localizedRoute)) {
      localizedRoute.name = getRouteBaseName(common, router.currentRoute.value);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, common.runtimeConfig.public.i18n);
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (resolvedRoute.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e) {
    if (typeof e === "object" && "type" in e && e.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(common, route) {
  var _a;
  if (common.runtimeConfig.public.i18n.experimental.switchLocalePathLinkSSR) {
    return unref(common.metaState.value);
  }
  const meta = route.meta || {};
  return ((_a = unref(meta)) == null ? void 0 : _a[DEFAULT_DYNAMIC_PARAMS_KEY]) || {};
}
function switchLocalePath(common, locale, _route) {
  const route = _route != null ? _route : common.router.currentRoute.value;
  const name = getRouteBaseName(common, route);
  if (!name) {
    return "";
  }
  const switchLocalePathIntercepter = extendSwitchLocalePathIntercepter(common.runtimeConfig);
  const routeCopy = routeToObject(route);
  const resolvedParams = getLocalizableMetaFromDynamicParams(common, route)[locale];
  const baseRoute = { ...routeCopy, name, params: { ...routeCopy.params, ...resolvedParams } };
  const path = localePath(common, baseRoute, locale);
  return switchLocalePathIntercepter(path, locale);
}
function localeHead(common, {
  addDirAttribute = false,
  addSeoAttributes: seoAttributes = true,
  identifierAttribute: idAttribute = "hid"
}) {
  const { defaultDirection } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const i18n = getComposer$3(common.i18n);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (unref(i18n.locales) == null || unref(i18n.baseUrl) == null) {
    return metaObject;
  }
  const locale = getLocale$1(common.i18n);
  const locales = getLocales(common.i18n);
  const currentLocale = getNormalizedLocales(locales).find((l) => l.code === locale) || {
    code: locale
  };
  const currentLanguage = currentLocale.language;
  const currentDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentDir;
  }
  if (seoAttributes && locale && unref(i18n.locales)) {
    if (currentLanguage) {
      metaObject.htmlAttrs.lang = currentLanguage;
    }
    metaObject.link.push(
      ...getHreflangLinks(common, unref(locales), idAttribute),
      ...getCanonicalLink(common, idAttribute, seoAttributes)
    );
    metaObject.meta.push(
      ...getOgUrl(common, idAttribute, seoAttributes),
      ...getCurrentOgLocale(currentLocale, currentLanguage, idAttribute),
      ...getAlternateOgLocales(unref(locales), currentLanguage, idAttribute)
    );
  }
  return metaObject;
}
function getBaseUrl() {
  const nuxtApp = useNuxtApp();
  const i18n = getComposer$3(nuxtApp.$i18n);
  return joinURL(unref(i18n.baseUrl), nuxtApp.$config.app.baseURL);
}
function getHreflangLinks(common, locales, idAttribute) {
  const baseUrl = getBaseUrl();
  const { defaultLocale, strategy } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const links = [];
  if (strategy === "no_prefix")
    return links;
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    const localeLanguage = locale.language;
    if (!localeLanguage) {
      console.warn("Locale `language` ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeLanguage.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeLanguage, locale);
  }
  for (const [language, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath(common, mapLocale.code);
    if (localePath2) {
      links.push({
        [idAttribute]: `i18n-alt-${language}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: language
      });
    }
  }
  if (defaultLocale) {
    const localePath2 = switchLocalePath(common, defaultLocale);
    if (localePath2) {
      links.push({
        [idAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: "x-default"
      });
    }
  }
  return links;
}
function getCanonicalUrl(common, baseUrl, seoAttributes) {
  const route = common.router.currentRoute.value;
  const currentRoute = localeRoute(common, {
    ...route,
    path: void 0,
    name: getRouteBaseName(common, route)
  });
  if (!currentRoute)
    return "";
  let href = toAbsoluteUrl(currentRoute.path, baseUrl);
  const canonicalQueries = isObject(seoAttributes) && seoAttributes.canonicalQueries || [];
  const currentRouteQueryParams = currentRoute.query;
  const params = new URLSearchParams();
  for (const queryParamName of canonicalQueries) {
    if (queryParamName in currentRouteQueryParams) {
      const queryParamValue = currentRouteQueryParams[queryParamName];
      if (isArray(queryParamValue)) {
        queryParamValue.forEach((v) => params.append(queryParamName, v || ""));
      } else {
        params.append(queryParamName, queryParamValue || "");
      }
    }
  }
  const queryString = params.toString();
  if (queryString) {
    href = `${href}?${queryString}`;
  }
  return href;
}
function getCanonicalLink(common, idAttribute, seoAttributes) {
  const baseUrl = getBaseUrl();
  const href = getCanonicalUrl(common, baseUrl, seoAttributes);
  if (!href)
    return [];
  return [{ [idAttribute]: "i18n-can", rel: "canonical", href }];
}
function getOgUrl(common, idAttribute, seoAttributes) {
  const baseUrl = getBaseUrl();
  const href = getCanonicalUrl(common, baseUrl, seoAttributes);
  if (!href)
    return [];
  return [{ [idAttribute]: "i18n-og-url", property: "og:url", content: href }];
}
function getCurrentOgLocale(currentLocale, currentLanguage, idAttribute) {
  if (!currentLocale || !currentLanguage)
    return [];
  return [{ [idAttribute]: "i18n-og", property: "og:locale", content: hypenToUnderscore(currentLanguage) }];
}
function getAlternateOgLocales(locales, currentLanguage, idAttribute) {
  const alternateLocales = locales.filter((locale) => locale.language && locale.language !== currentLanguage);
  return alternateLocales.map((locale) => ({
    [idAttribute]: `i18n-og-alt-${locale.language}`,
    property: "og:locale:alternate",
    content: hypenToUnderscore(locale.language)
  }));
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//))
    return urlOrPath;
  return joinURL(baseUrl, urlOrPath);
}
function createLocaleFromRouteGetter() {
  const { routesNameSeparator, defaultLocaleRouteNameSuffix } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const localesPattern = `(${localeCodes.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes);
  const getLocaleFromRoute = (route) => {
    if (isObject(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
async function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function initCommonComposableOptions(i18n) {
  return {
    i18n: i18n != null ? i18n : useNuxtApp().$i18n,
    router: useRouter(),
    runtimeConfig: /* @__PURE__ */ useRuntimeConfig(),
    metaState: useState("nuxt-i18n-meta", () => ({}))
  };
}
async function loadAndSetLocale(newLocale, i18n, runtimeI18n, initial = false) {
  const { differentDomains, skipSettingLocaleOnNavigate, lazy } = runtimeI18n;
  const opts = runtimeDetectBrowserLanguage(runtimeI18n);
  const nuxtApp = useNuxtApp();
  const oldLocale = getLocale$1(i18n);
  const localeCodes2 = getLocaleCodes(i18n);
  function syncCookie(locale = oldLocale) {
    if (opts === false || !opts.useCookie)
      return;
    if (skipSettingLocaleOnNavigate)
      return;
    setCookieLocale(i18n, locale);
  }
  if (!newLocale) {
    syncCookie();
    return false;
  }
  if (!initial && differentDomains) {
    syncCookie();
    return false;
  }
  if (oldLocale === newLocale) {
    syncCookie();
    return false;
  }
  const localeOverride = await onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, nuxtApp);
  if (localeOverride && localeCodes2.includes(localeOverride)) {
    if (oldLocale === localeOverride) {
      syncCookie();
      return false;
    }
    newLocale = localeOverride;
  }
  if (lazy) {
    const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
    const setter = (locale, message2) => mergeLocaleMessage(i18n, locale, message2);
    if (i18nFallbackLocales) {
      const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(locale, localeLoaders, setter)));
    }
    await loadLocale(newLocale, localeLoaders, setter);
  }
  if (skipSettingLocaleOnNavigate) {
    return false;
  }
  syncCookie(newLocale);
  setLocale(i18n, newLocale);
  await onLanguageSwitched(i18n, oldLocale, newLocale);
  return true;
}
function createLogger(label) {
  return {
    log: console.log.bind(console, `${label}:`)
    // change to this after implementing logger across runtime code
    // log: console.log.bind(console, `[i18n:${label}]`)
  };
}
function detectLocale(route, routeLocaleGetter, initialLocaleLoader, detectLocaleContext, runtimeI18n) {
  const { strategy, defaultLocale, differentDomains, multiDomainLocales } = runtimeI18n;
  const { localeCookie } = detectLocaleContext;
  const _detectBrowserLanguage = runtimeDetectBrowserLanguage(runtimeI18n);
  createLogger("detectLocale");
  const initialLocale = isFunction(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const detectedBrowser = detectBrowserLanguage(route, detectLocaleContext, initialLocale);
  if (detectedBrowser.reason === DetectFailure.SSG_IGNORE) {
    return initialLocale;
  }
  if (detectedBrowser.locale && detectedBrowser.from != null) {
    return detectedBrowser.locale;
  }
  let detected = "";
  if (differentDomains || multiDomainLocales) {
    detected || (detected = getLocaleDomain(normalizedLocales, strategy, route));
  } else if (strategy !== "no_prefix") {
    detected || (detected = routeLocaleGetter(route));
  }
  const cookieLocale = _detectBrowserLanguage && _detectBrowserLanguage.useCookie && localeCookie;
  detected || (detected = cookieLocale || initialLocale || defaultLocale || "");
  return detected;
}
function detectRedirect({
  route,
  targetLocale,
  routeLocaleGetter,
  calledWithRouting = false
}) {
  const nuxtApp = useNuxtApp();
  const common = initCommonComposableOptions();
  const { strategy, differentDomains } = common.runtimeConfig.public.i18n;
  let redirectPath = "";
  const { fullPath: toFullPath } = route.to;
  if (!differentDomains && (calledWithRouting || strategy !== "no_prefix") && routeLocaleGetter(route.to) !== targetLocale) {
    const routePath = nuxtApp.$switchLocalePath(targetLocale) || nuxtApp.$localePath(toFullPath, targetLocale);
    if (isString(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = !(route.from && route.from.fullPath === routePath) ? routePath : "";
    }
  }
  if ((differentDomains || isSSG) && routeLocaleGetter(route.to) !== targetLocale) {
    const routePath = switchLocalePath(common, targetLocale, route.to);
    if (isString(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return isObject(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
function _navigate(redirectPath, status) {
  return navigateTo(redirectPath, { redirectCode: status });
}
async function navigate(args, { status = 302, enableNavigate = false } = {}) {
  const { nuxtApp, i18n, locale, route } = args;
  const { rootRedirect, differentDomains, multiDomainLocales, skipSettingLocaleOnNavigate, configLocales, strategy } = nuxtApp.$config.public.i18n;
  let { redirectPath } = args;
  if (route.path === "/" && rootRedirect) {
    if (isString(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    redirectPath = nuxtApp.$localePath(redirectPath, locale);
    return _navigate(redirectPath, status);
  }
  if (multiDomainLocales && strategy === "prefix_except_default") {
    const host = getHost();
    const currentDomain = configLocales.find((locale2) => {
      var _a;
      if (typeof locale2 !== "string") {
        return (_a = locale2.defaultForDomains) == null ? void 0 : _a.find((domain) => domain === host);
      }
      return false;
    });
    const defaultLocaleForDomain = typeof currentDomain !== "string" ? currentDomain == null ? void 0 : currentDomain.code : void 0;
    if (route.path.startsWith(`/${defaultLocaleForDomain}`)) {
      return _navigate(route.path.replace(`/${defaultLocaleForDomain}`, ""), status);
    } else if (!route.path.startsWith(`/${locale}`) && locale !== defaultLocaleForDomain) {
      const getLocaleFromRoute = createLocaleFromRouteGetter();
      const oldLocale = getLocaleFromRoute(route.path);
      if (oldLocale !== "") {
        return _navigate(`/${locale + route.path.replace(`/${oldLocale}`, "")}`, status);
      } else {
        return _navigate(`/${locale + (route.path === "/" ? "" : route.path)}`, status);
      }
    } else if (redirectPath && route.path !== redirectPath) {
      return _navigate(redirectPath, status);
    }
    return;
  }
  if (!differentDomains) {
    if (redirectPath) {
      return _navigate(redirectPath, status);
    }
  } else {
    const state = useRedirectState();
    if (state.value && state.value !== redirectPath) {
      {
        state.value = redirectPath;
      }
    }
  }
}
function injectNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", getI18nTarget(i18n));
  defineGetter(nuxt, "$getRouteBaseName", wrapComposable(getRouteBaseName));
  defineGetter(nuxt, "$localePath", wrapComposable(localePath));
  defineGetter(nuxt, "$localeRoute", wrapComposable(localeRoute));
  defineGetter(nuxt, "$switchLocalePath", wrapComposable(switchLocalePath));
  defineGetter(nuxt, "$localeHead", wrapComposable(localeHead));
}
function extendPrefixable(runtimeConfig = /* @__PURE__ */ useRuntimeConfig()) {
  return (opts) => {
    return DefaultPrefixable(opts) && !runtimeConfig.public.i18n.differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(runtimeConfig = /* @__PURE__ */ useRuntimeConfig()) {
  return (path, locale) => {
    if (runtimeConfig.public.i18n.differentDomains) {
      const domain = getDomainFromLocale(locale);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl() {
  return () => {
    const ctx = useNuxtApp();
    const { baseUrl, defaultLocale, differentDomains } = ctx.$config.public.i18n;
    if (isFunction(baseUrl)) {
      const baseUrlResult = baseUrl(ctx);
      return baseUrlResult;
    }
    const localeCode = isFunction(defaultLocale) ? defaultLocale() : defaultLocale;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode);
      if (domain) {
        return domain;
      }
    }
    if (baseUrl) {
      return baseUrl;
    }
    return baseUrl;
  };
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a, _b, _c;
  const opts = { ...CookieDefaults, ..._opts };
  (_a = opts.filter) != null ? _a : opts.filter = (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : (_c = cookies[name]) != null ? _c : (_b = opts.default) == null ? void 0 : _b.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual$1(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$1(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function formatMessage(message2) {
  return NUXT_I18N_MODULE_ID + " " + message2;
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = getI18nTarget(i18n);
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = getI18nTarget(i18n);
  return unref(target[name]);
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function wrapComposable(fn, common = initCommonComposableOptions()) {
  return (...args) => fn(common, ...args);
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag2) => tag2.split(";")[0]);
}
function getBrowserLocale() {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getI18nCookie() {
  const detect = runtimeDetectBrowserLanguage();
  const cookieKey = detect && detect.cookieKey || DEFAULT_COOKIE_KEY;
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: detect && detect.cookieCrossOrigin ? "none" : "lax",
    secure: detect && detect.cookieCrossOrigin || detect && detect.cookieSecure
  };
  if (detect && detect.cookieDomain) {
    cookieOptions.domain = detect.cookieDomain;
  }
  return useCookie(cookieKey, cookieOptions);
}
function getLocaleCookie(cookieRef, detect, defaultLocale) {
  var _a;
  if (detect === false || !detect.useCookie) {
    return;
  }
  const localeCode = (_a = cookieRef.value) != null ? _a : void 0;
  if (localeCode == null) {
    return;
  }
  if (localeCodes.includes(localeCode)) {
    return localeCode;
  }
  if (defaultLocale) {
    cookieRef.value = defaultLocale;
    return defaultLocale;
  }
  cookieRef.value = void 0;
  return;
}
function setLocaleCookie(cookieRef, locale, detect) {
  if (detect === false || !detect.useCookie) {
    return;
  }
  cookieRef.value = locale;
}
var DetectFailure = /* @__PURE__ */ ((DetectFailure2) => {
  DetectFailure2["NOT_FOUND"] = "not_found_match";
  DetectFailure2["FIRST_ACCESS"] = "first_access_only";
  DetectFailure2["NO_REDIRECT_ROOT"] = "not_redirect_on_root";
  DetectFailure2["NO_REDIRECT_NO_PREFIX"] = "not_redirect_on_no_prefix";
  DetectFailure2["SSG_IGNORE"] = "detect_ignore_on_ssg";
  return DetectFailure2;
})(DetectFailure || {});
const DefaultDetectBrowserLanguageFromResult = { locale: "" };
function detectBrowserLanguage(route, detectLocaleContext, locale = "") {
  createLogger("detectBrowserLanguage");
  const _detect = runtimeDetectBrowserLanguage();
  if (!_detect) {
    return DefaultDetectBrowserLanguageFromResult;
  }
  const { strategy } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const { ssg, callType, firstAccess, localeCookie } = detectLocaleContext;
  if (!firstAccess) {
    return {
      locale: strategy === "no_prefix" ? locale : "",
      reason: "first_access_only"
      /* FIRST_ACCESS */
    };
  }
  const { redirectOn, alwaysRedirect, useCookie: useCookie2, fallbackLocale } = _detect;
  const path = isString(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root" && path !== "/") {
      return {
        locale: "",
        reason: "not_redirect_on_root"
        /* NO_REDIRECT_ROOT */
      };
    }
    if (redirectOn === "no prefix" && !alwaysRedirect && path.match(getLocalesRegex(localeCodes))) {
      return {
        locale: "",
        reason: "not_redirect_on_no_prefix"
        /* NO_REDIRECT_NO_PREFIX */
      };
    }
  }
  let from;
  const cookieMatch = useCookie2 && localeCookie || void 0;
  if (useCookie2) {
    from = "cookie";
  }
  const browserMatch = getBrowserLocale();
  if (!cookieMatch) {
    from = "navigator_or_header";
  }
  const matchedLocale = cookieMatch || browserMatch;
  const resolved = matchedLocale || fallbackLocale || "";
  if (!matchedLocale && fallbackLocale) {
    from = "fallback";
  }
  return { locale: resolved, from };
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = isArray(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales, strategy, route) {
  let host = getHost() || "";
  if (host) {
    let matchingLocale;
    const matchingLocales = locales.filter((locale) => {
      if (locale && locale.domain) {
        let domain = locale.domain;
        if (hasProtocol(locale.domain)) {
          domain = locale.domain.replace(/(http|https):\/\//, "");
        }
        return domain === host;
      } else if (Array.isArray(locale == null ? void 0 : locale.domains)) {
        return locale.domains.includes(host);
      }
      return false;
    });
    if (matchingLocales.length === 1) {
      matchingLocale = matchingLocales[0];
    } else if (matchingLocales.length > 1) {
      if (strategy === "no_prefix") {
        console.warn(
          formatMessage(
            "Multiple matching domains found! This is not supported for no_prefix strategy in combination with differentDomains!"
          )
        );
        matchingLocale = matchingLocales[0];
      } else {
        if (route) {
          const routePath = isObject(route) ? route.path : isString(route) ? route : "";
          if (routePath && routePath !== "") {
            const matches = routePath.match(getLocalesRegex(matchingLocales.map((l) => l.code)));
            if (matches && matches.length > 1) {
              matchingLocale = matchingLocales.find((l) => l.code === matches[1]);
            }
          }
        }
        if (!matchingLocale) {
          matchingLocale = matchingLocales.find(
            (l) => Array.isArray(l.defaultForDomains) ? l.defaultForDomains.includes(host) : l.domainDefault
          );
        }
      }
    }
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode) {
  var _a, _b, _c, _d, _e, _f;
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const host = getHost();
  const config2 = runtimeConfig.public.i18n;
  const lang = normalizedLocales.find((locale) => locale.code === localeCode);
  const domain = ((_b = (_a = config2 == null ? void 0 : config2.locales) == null ? void 0 : _a[localeCode]) == null ? void 0 : _b.domain) || (lang == null ? void 0 : lang.domain) || ((_e = (_d = (_c = config2 == null ? void 0 : config2.locales) == null ? void 0 : _c[localeCode]) == null ? void 0 : _d.domains) == null ? void 0 : _e.find((v) => v === host)) || ((_f = lang == null ? void 0 : lang.domains) == null ? void 0 : _f.find((v) => v === host));
  if (domain) {
    if (hasProtocol(domain, { strict: true })) {
      return domain;
    }
    let protocol;
    {
      const {
        node: { req }
      } = useRequestEvent(nuxtApp);
      protocol = req && isHTTPS(req) ? "https:" : "http:";
    }
    return protocol + "//" + domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
const runtimeDetectBrowserLanguage = (opts = (/* @__PURE__ */ useRuntimeConfig()).public.i18n) => {
  if ((opts == null ? void 0 : opts.detectBrowserLanguage) === false)
    return false;
  return opts == null ? void 0 : opts.detectBrowserLanguage;
};
/*!
  * message-compiler v9.14.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileWarnCodes = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
};
function createCompileWarn(code2, loc, ...args) {
  const msg = code2;
  const message2 = { message: String(msg), code: code2 };
  if (loc) {
    message2.location = loc;
  }
  return message2;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code2;
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index22) => _buf[index22] === CHAR_CR && _buf[index22 + 1] === CHAR_LF;
  const isLF = (index22) => _buf[index22] === CHAR_LF;
  const isPS = (index22) => _buf[index22] === CHAR_PS;
  const isLS = (index22) => _buf[index22] === CHAR_LS;
  const isLineEnd = (index22) => isCRLF(index22) || isLF(index22) || isPS(index22) || isLS(index22);
  const index2 = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index: index2,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    14
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        14
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "\uFFFD";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError, onWarn } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function emitWarn(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onWarn) {
      const loc = location ? createLocation(start, end) : null;
      onWarn(createCompileWarn(code2, loc, args));
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index2) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index2, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key, modulo) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    if (modulo === true) {
      node.modulo = true;
    }
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    let modulo = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          modulo = true;
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || "", !!modulo));
          if (modulo) {
            emitWarn(tokenizer, CompileWarnCodes.USE_MODULO_SYNTAX, context.lastStartLoc, 0, getTokenCaption(token));
            modulo = null;
          }
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message2) {
  if (message2.items.length === 1) {
    const item = message2.items[0];
    if (item.type === 3 || item.type === 9) {
      message2.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message2.items.length; i++) {
      const item = message2.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message2.items.length) {
      message2.static = join(values);
      for (let i = 0; i < message2.items.length; i++) {
        const item = message2.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message2 = node;
      const items = message2.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message2.i = items;
      delete message2.items;
      if (message2.static) {
        message2.s = message2.static;
        delete message2.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code2, node) {
    _context.code += code2;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index2 = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index2 + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index2++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index2++;
    c = path[index2];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index2 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index2 : index2;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index2) => _list[index2];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message2(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message2(key)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message2,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign({}, _list, _named)
  };
  return ctx;
}
const code$1$1 = CompileWarnCodes.__EXTEND_POINT__;
const inc$1$1 = incrementer(code$1$1);
const CoreWarnCodes = {
  NOT_FOUND_KEY: code$1$1,
  // 2
  FALLBACK_TO_TRANSLATE: inc$1$1(),
  // 3
  CANNOT_FORMAT_NUMBER: inc$1$1(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: inc$1$1(),
  // 5
  CANNOT_FORMAT_DATE: inc$1$1(),
  // 6
  FALLBACK_TO_DATE_FORMAT: inc$1$1(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: inc$1$1(),
  // 8
  __EXTEND_POINT__: inc$1$1()
  // 9
};
const code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = incrementer(code$2);
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  // 17
  INVALID_DATE_ARGUMENT: inc$2(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc$2(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc$2(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: inc$2(),
  // 23
  __EXTEND_POINT__: inc$2()
  // 24
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve2 = locale();
        if (isPromise(resolve2)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve2;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.14.1";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
};
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version2 = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [_locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index2 = locales.indexOf(targetLocale);
  if (index2 === -1) {
    return false;
  }
  for (let i = index2 + 1; i < locales.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales[i])) {
      return true;
    }
  }
  return false;
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3: {
      const text = node;
      return text.v || text.value;
    }
    case 9: {
      const literal = node;
      return literal.v || literal.value;
    }
    case 4: {
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    }
    case 5: {
      const list = node;
      return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
    }
    case 6: {
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    }
    case 8: {
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message2) => message2;
let compileCache = /* @__PURE__ */ Object.create(null);
const isMessageAST = (val) => isObject(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message2, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message2, options), detectError };
}
function compile(message2, context) {
  if (isString(message2)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message2);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message2, {
      ...context,
      location: false,
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message2.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message2);
    } else {
      return format(message2);
    }
  }
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message2] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message2, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message2 = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message2 = messages[targetLocale] || {};
    if ((format2 = resolveValue2(message2, key)) === null) {
      format2 = message2[key];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message2];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message2, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message2, key);
    if (val == null && fallbackContext) {
      const [, , message22] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message22, key);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
  * vue-i18n v9.14.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.14.1";
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  // 9
  NOT_SUPPORTED_PRESERVE: inc$1(),
  // 10
  NOT_SUPPORTED_FORMATTER: inc$1(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  // 14
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  // 15
  IGNORE_OBJ_FLATTEN: inc$1(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1()
  // 18
});
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  // 26
  NOT_INSTALLED: inc(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // 28
  // directive module errors
  REQUIRED_VALUE: inc(),
  // 29
  INVALID_VALUE: inc(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // 37
  // for enhancement
  __EXTEND_POINT__: inc()
  // 38
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = shallowRef;
  const translateExistCompatible = !!options.translateExistCompatible;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler2) {
    _postTranslation = handler2;
    _context.postTranslation = handler2;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler2) {
    if (handler2 !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler2);
    }
    _missing = handler2;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (false) ;
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message2 = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message2, key);
      return !translateExistCompatible ? isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved) : resolved != null;
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message2) {
    if (flatJson) {
      const _message = { [locale2]: message2 };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message2 = _message[locale2];
    }
    _messages.value[locale2] = message2;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message2) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message2 };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message2 = _message[locale2];
    deepCopy(message2, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag2) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      const tag2 = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag2, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index2) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index2}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag2 = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag2, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register2 = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register2,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app, ...options2) {
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n.__composerExtend = opts.__composerExtend;
          i18n.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
function useSwitchLocalePath() {
  return wrapComposable(switchLocalePath);
}
const switch_locale_path_ssr_5csfIgkrBP = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:switch-locale-path-ssr",
  dependsOn: ["i18n:plugin"],
  setup(nuxt) {
    if (nuxt.$config.public.i18n.experimental.switchLocalePathLinkSSR !== true)
      return;
    const switchLocalePath2 = useSwitchLocalePath();
    const switchLocalePathLinkWrapperExpr = new RegExp(
      [
        `<!--${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-\\[(\\w+)\\]-->`,
        `.+?`,
        `<!--/${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-->`
      ].join(""),
      "g"
    );
    nuxt.hook("app:rendered", (ctx) => {
      var _a;
      if (((_a = ctx.renderResult) == null ? void 0 : _a.html) == null)
        return;
      ctx.renderResult.html = ctx.renderResult.html.replaceAll(
        switchLocalePathLinkWrapperExpr,
        (match, p1) => match.replace(/href="([^"]+)"/, `href="${encodeURI(switchLocalePath2(p1 != null ? p1 : ""))}"`)
      );
    });
  }
});
function extendI18n(i18n, {
  locales = [],
  localeCodes: localeCodes2 = [],
  baseUrl = "",
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    const pluginOptions = isPluginOptions(options[0]) ? assign({}, options[0]) : { inject: true };
    if (pluginOptions.inject == null) {
      pluginOptions.inject = true;
    }
    const orgComposerExtend = pluginOptions.__composerExtend;
    pluginOptions.__composerExtend = (localComposer) => {
      const globalComposer2 = getComposer$3(i18n);
      localComposer.locales = computed(() => globalComposer2.locales.value);
      localComposer.localeCodes = computed(() => globalComposer2.localeCodes.value);
      localComposer.baseUrl = computed(() => globalComposer2.baseUrl.value);
      let orgComposerDispose;
      if (isFunction(orgComposerExtend)) {
        orgComposerDispose = Reflect.apply(orgComposerExtend, pluginOptions, [localComposer]);
      }
      return () => {
        orgComposerDispose && orgComposerDispose();
      };
    };
    if (i18n.mode === "legacy") {
      const orgVueI18nExtend = pluginOptions.__vueI18nExtend;
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendVueI18n(vueI18n, hooks.onExtendVueI18n);
        let orgVueI18nDispose;
        if (isFunction(orgVueI18nExtend)) {
          orgVueI18nDispose = Reflect.apply(orgVueI18nExtend, pluginOptions, [vueI18n]);
        }
        return () => {
          orgVueI18nDispose && orgVueI18nDispose();
        };
      };
    }
    options[0] = pluginOptions;
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const globalComposer = getComposer$3(i18n);
    scope.run(() => {
      extendComposer(globalComposer, { locales, localeCodes: localeCodes2, baseUrl, hooks, context });
      if (i18n.mode === "legacy" && isVueI18n(i18n.global)) {
        extendVueI18n(i18n.global, hooks.onExtendVueI18n);
      }
    });
    const app = vue;
    const exported = i18n.mode === "composition" ? app.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, globalComposer, hooks.onExtendExportedGlobal);
    }
    if (pluginOptions.inject) {
      const common = initCommonComposableOptions(i18n);
      vue.mixin({
        methods: {
          getRouteBaseName: wrapComposable(getRouteBaseName, common),
          resolveRoute: wrapComposable(resolveRoute, common),
          localePath: wrapComposable(localePath, common),
          localeRoute: wrapComposable(localeRoute, common),
          localeLocation: wrapComposable(localeLocation, common),
          switchLocalePath: wrapComposable(switchLocalePath, common),
          localeHead: wrapComposable(localeHead, common)
        }
      });
    }
    if (app.unmount) {
      const unmountApp = app.unmount;
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes: localeCodes2, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes2);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  {
    _baseUrl.value = resolveBaseUrl(baseUrl, context);
  }
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendPropertyDescriptors(composer, exported, hook) {
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendExportedGlobal(exported, g, hook) {
  extendPropertyDescriptors(g, exported, hook);
}
function extendVueI18n(vueI18n, hook) {
  const c = getComposer$3(vueI18n);
  extendPropertyDescriptors(c, vueI18n, hook);
}
function isPluginOptions(options) {
  return isObject(options) && ("inject" in options || "__composerExtend" in options || "__vueI18nExtend" in options);
}
const i18n_sq1MuCrqbC = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: parallelPlugin,
  async setup(nuxt) {
    var _a, _b;
    let __temp, __restore;
    const route = useRoute();
    const { vueApp: app } = nuxt;
    const nuxtContext = nuxt;
    const host = getHost();
    const { configLocales, defaultLocale, multiDomainLocales, strategy } = nuxtContext.$config.public.i18n;
    const hasDefaultForDomains = configLocales.some(
      (l) => typeof l !== "string" && Array.isArray(l.defaultForDomains)
    );
    let defaultLocaleDomain;
    if (defaultLocale) {
      defaultLocaleDomain = defaultLocale;
    } else if (hasDefaultForDomains) {
      const findDefaultLocale = configLocales.find(
        (l) => typeof l === "string" || !Array.isArray(l.defaultForDomains) ? false : l.defaultForDomains.includes(host != null ? host : "")
      );
      defaultLocaleDomain = (_a = findDefaultLocale == null ? void 0 : findDefaultLocale.code) != null ? _a : "";
    } else {
      defaultLocaleDomain = "";
    }
    if (multiDomainLocales && (strategy === "prefix_except_default" || strategy === "prefix_and_default")) {
      const router = useRouter();
      router.getRoutes().forEach((route2) => {
        var _a2;
        if ((_a2 = route2.name) == null ? void 0 : _a2.toString().includes("___default")) {
          const routeNameLocale = route2.name.toString().split("___")[1];
          if (routeNameLocale !== defaultLocaleDomain) {
            router.removeRoute(route2.name);
          } else {
            const newRouteName = route2.name.toString().replace("___default", "");
            route2.name = newRouteName;
          }
        }
      });
    }
    const runtimeI18n = { ...nuxtContext.$config.public.i18n, defaultLocale: defaultLocaleDomain };
    runtimeI18n.baseUrl = extendBaseUrl();
    const _detectBrowserLanguage = runtimeDetectBrowserLanguage();
    const vueI18nOptions = ([__temp, __restore] = executeAsync(() => loadVueI18nOptions(vueI18nConfigs, useNuxtApp())), __temp = await __temp, __restore(), __temp);
    vueI18nOptions.messages = vueI18nOptions.messages || {};
    vueI18nOptions.fallbackLocale = (_b = vueI18nOptions.fallbackLocale) != null ? _b : false;
    const getLocaleFromRoute = createLocaleFromRouteGetter();
    const getDefaultLocale = (locale) => locale || vueI18nOptions.locale || "en-US";
    const localeCookie = getI18nCookie();
    let initialLocale = detectLocale(
      route,
      getLocaleFromRoute,
      getDefaultLocale(runtimeI18n.defaultLocale),
      {
        ssg: "normal",
        callType: "setup",
        firstAccess: true,
        localeCookie: getLocaleCookie(localeCookie, _detectBrowserLanguage, runtimeI18n.defaultLocale)
      },
      runtimeI18n
    );
    vueI18nOptions.messages = ([__temp, __restore] = executeAsync(() => loadInitialMessages(vueI18nOptions.messages, localeLoaders, {
      localeCodes,
      initialLocale,
      lazy: runtimeI18n.lazy,
      defaultLocale: runtimeI18n.defaultLocale,
      fallbackLocale: vueI18nOptions.fallbackLocale
    })), __temp = await __temp, __restore(), __temp);
    initialLocale = getDefaultLocale(initialLocale);
    const i18n = createI18n({ ...vueI18nOptions, locale: initialLocale });
    let notInitialSetup = true;
    const isInitialLocaleSetup = (locale) => initialLocale !== locale && notInitialSetup;
    extendI18n(i18n, {
      locales: runtimeI18n.configLocales,
      localeCodes,
      baseUrl: runtimeI18n.baseUrl,
      context: nuxtContext,
      hooks: {
        onExtendComposer(composer) {
          composer.strategy = runtimeI18n.strategy;
          composer.localeProperties = computed(
            () => normalizedLocales.find((l) => l.code === composer.locale.value) || { code: composer.locale.value }
          );
          composer.setLocale = async (locale) => {
            const localeSetup = isInitialLocaleSetup(locale);
            const modified = await loadAndSetLocale(locale, i18n, runtimeI18n, localeSetup);
            if (modified && localeSetup) {
              notInitialSetup = false;
            }
            const redirectPath = await nuxtContext.runWithContext(
              () => detectRedirect({
                route: { to: route },
                targetLocale: locale,
                routeLocaleGetter: getLocaleFromRoute
              })
            );
            await nuxtContext.runWithContext(
              async () => await navigate(
                {
                  nuxtApp: nuxtContext,
                  i18n,
                  redirectPath,
                  locale,
                  route
                },
                { enableNavigate: true }
              )
            );
          };
          composer.loadLocaleMessages = async (locale) => {
            const setter = (locale2, message2) => mergeLocaleMessage(i18n, locale2, message2);
            await loadLocale(locale, localeLoaders, setter);
          };
          composer.differentDomains = runtimeI18n.differentDomains;
          composer.defaultLocale = runtimeI18n.defaultLocale;
          composer.getBrowserLocale = () => getBrowserLocale();
          composer.getLocaleCookie = () => getLocaleCookie(localeCookie, _detectBrowserLanguage, runtimeI18n.defaultLocale);
          composer.setLocaleCookie = (locale) => setLocaleCookie(localeCookie, locale, _detectBrowserLanguage);
          composer.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup, context) => nuxt.callHook("i18n:beforeLocaleSwitch", { oldLocale, newLocale, initialSetup, context });
          composer.onLanguageSwitched = (oldLocale, newLocale) => nuxt.callHook("i18n:localeSwitched", { oldLocale, newLocale });
          composer.finalizePendingLocaleChange = async () => {
            if (!i18n.__pendingLocale) {
              return;
            }
            setLocale(i18n, i18n.__pendingLocale);
            if (i18n.__resolvePendingLocalePromise) {
              await i18n.__resolvePendingLocalePromise();
            }
            i18n.__pendingLocale = void 0;
          };
          composer.waitForPendingLocaleChange = async () => {
            if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
              await i18n.__pendingLocalePromise;
            }
          };
        },
        onExtendExportedGlobal(g) {
          return {
            strategy: {
              get() {
                return g.strategy;
              }
            },
            localeProperties: {
              get() {
                return g.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(g.setLocale, g, [locale]);
              }
            },
            differentDomains: {
              get() {
                return g.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return g.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(g.getBrowserLocale, g, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(g.getLocaleCookie, g, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(g.setLocaleCookie, g, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g.onBeforeLanguageSwitch, g, [oldLocale, newLocale, initialSetup, context]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(g.onLanguageSwitched, g, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(g.finalizePendingLocaleChange, g, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(g.waitForPendingLocaleChange, g, []);
              }
            }
          };
        },
        onExtendVueI18n(composer) {
          return {
            strategy: {
              get() {
                return composer.strategy;
              }
            },
            localeProperties: {
              get() {
                return composer.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
              }
            },
            loadLocaleMessages: {
              get() {
                return async (locale) => Reflect.apply(composer.loadLocaleMessages, composer, [locale]);
              }
            },
            differentDomains: {
              get() {
                return composer.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return composer.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(composer.getBrowserLocale, composer, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(composer.getLocaleCookie, composer, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [
                  oldLocale,
                  newLocale,
                  initialSetup,
                  context
                ]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
              }
            }
          };
        }
      }
    });
    const pluginOptions = {
      __composerExtend: (c) => {
        const g = getComposer$3(i18n);
        c.strategy = g.strategy;
        c.localeProperties = computed(() => g.localeProperties.value);
        c.setLocale = g.setLocale;
        c.differentDomains = g.differentDomains;
        c.getBrowserLocale = g.getBrowserLocale;
        c.getLocaleCookie = g.getLocaleCookie;
        c.setLocaleCookie = g.setLocaleCookie;
        c.onBeforeLanguageSwitch = g.onBeforeLanguageSwitch;
        c.onLanguageSwitched = g.onLanguageSwitched;
        c.finalizePendingLocaleChange = g.finalizePendingLocaleChange;
        c.waitForPendingLocaleChange = g.waitForPendingLocaleChange;
        return () => {
        };
      }
    };
    app.use(i18n, pluginOptions);
    injectNuxtHelpers(nuxtContext, i18n);
    let routeChangeCount = 0;
    addRouteMiddleware(
      "locale-changing",
      /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
        let __temp2, __restore2;
        const locale = detectLocale(
          to,
          getLocaleFromRoute,
          () => {
            return getLocale$1(i18n) || getDefaultLocale(runtimeI18n.defaultLocale);
          },
          {
            ssg: "normal",
            callType: "routing",
            firstAccess: routeChangeCount === 0,
            localeCookie: getLocaleCookie(localeCookie, _detectBrowserLanguage, runtimeI18n.defaultLocale)
          },
          runtimeI18n
        );
        const localeSetup = isInitialLocaleSetup(locale);
        const modified = ([__temp2, __restore2] = executeAsync(() => loadAndSetLocale(locale, i18n, runtimeI18n, localeSetup)), __temp2 = await __temp2, __restore2(), __temp2);
        if (modified && localeSetup) {
          notInitialSetup = false;
        }
        const redirectPath = ([__temp2, __restore2] = executeAsync(() => nuxtContext.runWithContext(
          () => detectRedirect({
            route: { to, from },
            targetLocale: locale,
            routeLocaleGetter: runtimeI18n.strategy === "no_prefix" ? () => locale : getLocaleFromRoute,
            calledWithRouting: true
          })
        )), __temp2 = await __temp2, __restore2(), __temp2);
        routeChangeCount++;
        return [__temp2, __restore2] = executeAsync(() => nuxtContext.runWithContext(
          async () => navigate({ nuxtApp: nuxtContext, i18n, redirectPath, locale, route: to })
        )), __temp2 = await __temp2, __restore2(), __temp2;
      }),
      { global: true }
    );
  }
});
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$3$1(o)) || allowArrayLike) {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$3$1(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$3$1(arr);
}
function _typeof$3$1(o) {
  "@babel/helpers - typeof";
  return _typeof$3$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3$1(o);
}
function _slicedToArray$1$1(arr, i) {
  return _arrayWithHoles$1$1(arr) || _iterableToArrayLimit$1$1(arr, i) || _unsupportedIterableToArray$3$1(arr, i) || _nonIterableRest$1$1();
}
function _nonIterableRest$1$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3$1(o, minLen);
}
function _arrayLikeToArray$3$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
var DomHandler = {
  innerWidth: function innerWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  width: function width(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  getWindowScrollTop: function getWindowScrollTop() {
    var doc = (void 0).documentElement;
    return ((void 0).pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft: function getWindowScrollLeft() {
    var doc = (void 0).documentElement;
    return ((void 0).pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth: function getOuterWidth(el, margin) {
    if (el) {
      var width2 = el.offsetWidth;
      if (margin) {
        var style = getComputedStyle(el);
        width2 += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width2;
    }
    return 0;
  },
  getOuterHeight: function getOuterHeight(el, margin) {
    if (el) {
      var height = el.offsetHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight: function getClientHeight(el, margin) {
    if (el) {
      var height = el.clientHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport: function getViewport() {
    var win = void 0, d = void 0, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h2 = win.innerHeight || e.clientHeight || g.clientHeight;
    return {
      width: w,
      height: h2
    };
  },
  getOffset: function getOffset(el) {
    if (el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + ((void 0).pageYOffset || (void 0).documentElement.scrollTop || (void 0).body.scrollTop || 0),
        left: rect.left + ((void 0).pageXOffset || (void 0).documentElement.scrollLeft || (void 0).body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function index(element) {
    if (element) {
      var _this$getParentNode;
      var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
      var num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === element)
          return num;
        if (children[i].nodeType === 1)
          num++;
      }
    }
    return -1;
  },
  addMultipleClasses: function addMultipleClasses(element, classNames) {
    var _this = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this.addClass(element, className);
        });
      });
    }
  },
  removeMultipleClasses: function removeMultipleClasses(element, classNames) {
    var _this2 = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this2.removeClass(element, className);
        });
      });
    }
  },
  addClass: function addClass(element, className) {
    if (element && className && !this.hasClass(element, className)) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += " " + className;
    }
  },
  removeClass: function removeClass(element, className) {
    if (element && className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass: function hasClass(element, className) {
    if (element) {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  addStyles: function addStyles(element) {
    var styles = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (element) {
      Object.entries(styles).forEach(function(_ref) {
        var _ref2 = _slicedToArray$1$1(_ref, 2), key = _ref2[0], value = _ref2[1];
        return element.style[key] = value;
      });
    }
  },
  find: function find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle: function findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  createElement: function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (type) {
      var element = (void 0).createElement(type);
      this.setAttributes(element, attributes);
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      element.append.apply(element, children);
      return element;
    }
    return void 0;
  },
  setAttribute: function setAttribute(element) {
    var attribute = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var value = arguments.length > 2 ? arguments[2] : void 0;
    if (this.isElement(element) && value !== null && value !== void 0) {
      element.setAttribute(attribute, value);
    }
  },
  setAttributes: function setAttributes(element) {
    var _this3 = this;
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(element)) {
      var computedStyles = function computedStyles2(rule, value) {
        var _element$$attrs, _element$$attrs2;
        var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
        return [value].flat().reduce(function(cv, v) {
          if (v !== null && v !== void 0) {
            var type = _typeof$3$1(v);
            if (type === "string" || type === "number") {
              cv.push(v);
            } else if (type === "object") {
              var _cv = Array.isArray(v) ? computedStyles2(rule, v) : Object.entries(v).map(function(_ref3) {
                var _ref4 = _slicedToArray$1$1(_ref3, 2), _k = _ref4[0], _v = _ref4[1];
                return rule === "style" && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(_v) : !!_v ? _k : void 0;
              });
              cv = _cv.length ? cv.concat(_cv.filter(function(c) {
                return !!c;
              })) : cv;
            }
          }
          return cv;
        }, styles);
      };
      Object.entries(attributes).forEach(function(_ref5) {
        var _ref6 = _slicedToArray$1$1(_ref5, 2), key = _ref6[0], value = _ref6[1];
        if (value !== void 0 && value !== null) {
          var matchedEvent = key.match(/^on(.+)/);
          if (matchedEvent) {
            element.addEventListener(matchedEvent[1].toLowerCase(), value);
          } else if (key === "p-bind") {
            _this3.setAttributes(element, value);
          } else {
            value = key === "class" ? _toConsumableArray$3(new Set(computedStyles("class", value))).join(" ").trim() : key === "style" ? computedStyles("style", value).join(";").trim() : value;
            (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
            element.setAttribute(key, value);
          }
        }
      });
    }
  },
  getAttribute: function getAttribute(element, name) {
    if (this.isElement(element)) {
      var value = element.getAttribute(name);
      if (!isNaN(value)) {
        return +value;
      }
      if (value === "true" || value === "false") {
        return value === "true";
      }
      return value;
    }
    return void 0;
  },
  isAttributeEquals: function isAttributeEquals(element, name, value) {
    return this.isElement(element) ? this.getAttribute(element, name) === value : false;
  },
  isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
    return !this.isAttributeEquals(element, name, value);
  },
  getHeight: function getHeight(el) {
    if (el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth: function getWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width2;
    }
    return 0;
  },
  absolutePosition: function absolutePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var elementOuterHeight = elementDimensions.height;
      var elementOuterWidth = elementDimensions.width;
      var targetOuterHeight = target.offsetHeight;
      var targetOuterWidth = target.offsetWidth;
      var targetOffset = target.getBoundingClientRect();
      var windowScrollTop = this.getWindowScrollTop();
      var windowScrollLeft = this.getWindowScrollLeft();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        origin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
      }
      if (targetOffset.left + elementOuterWidth > viewport.width)
        left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else
        left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  relativePosition: function relativePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var targetHeight = target.offsetHeight;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        origin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  nestedPosition: function nestedPosition(element, level) {
    if (element) {
      var parentItem = element.parentElement;
      var elementOffset = this.getOffset(parentItem);
      var viewport = this.getViewport();
      var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
      var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
      var left;
      if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
        if (parseInt(elementOffset.left, 10) < sublistWidth) {
          if (level % 2 === 1) {
            left = parseInt(elementOffset.left, 10) ? "-" + parseInt(elementOffset.left, 10) + "px" : "100%";
          } else if (level % 2 === 0) {
            left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + "px";
          }
        } else {
          left = "-100%";
        }
      } else {
        left = "100%";
      }
      element.style.top = "0px";
      element.style.left = left;
    }
  },
  getParentNode: function getParentNode(element) {
    var parent = element === null || element === void 0 ? void 0 : element.parentNode;
    if (parent && parent instanceof ShadowRoot && parent.host) {
      parent = parent.host;
    }
    return parent;
  },
  getParents: function getParents(element) {
    var parents = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var parent = this.getParentNode(element);
    return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
  },
  getScrollableParents: function getScrollableParents(element) {
    var scrollableParents = [];
    if (element) {
      var parents = this.getParents(element);
      var overflowRegex = /(auto|scroll)/;
      var overflowCheck = function overflowCheck2(node) {
        try {
          var styleDeclaration = (void 0)["getComputedStyle"](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
        } catch (err) {
          return false;
        }
      };
      var _iterator = _createForOfIteratorHelper$1(parents), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var parent = _step.value;
          var scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
          if (scrollSelectors) {
            var selectors = scrollSelectors.split(",");
            var _iterator2 = _createForOfIteratorHelper$1(selectors), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var selector = _step2.value;
                var el = this.findSingle(parent, selector);
                if (el && overflowCheck(el)) {
                  scrollableParents.push(el);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions: function getHiddenElementDimensions(element) {
    if (element) {
      var dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn: function fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      var last = +/* @__PURE__ */ new Date();
      var opacity = 0;
      var tick = function tick2() {
        opacity = +element.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +/* @__PURE__ */ new Date();
        if (+opacity < 1) {
          (void 0).requestAnimationFrame && requestAnimationFrame(tick2) || setTimeout(tick2, 16);
        }
      };
      tick();
    }
  },
  fadeOut: function fadeOut(element, ms) {
    if (element) {
      var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      var fading = setInterval(function() {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent: function getUserAgent() {
    return (void 0).userAgent;
  },
  appendChild: function appendChild(element, target) {
    if (this.isElement(target))
      target.appendChild(element);
    else if (target.el && target.elElement)
      target.elElement.appendChild(element);
    else
      throw new Error("Cannot append " + target + " to " + element);
  },
  isElement: function isElement(obj) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$3$1(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof$3$1(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView: function scrollInView(container, item) {
    var borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    var paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var offset = itemRect.top + (void 0).body.scrollTop - (containerRect.top + (void 0).body.scrollTop) - borderTop - paddingTop;
    var scroll = container.scrollTop;
    var elementHeight = container.clientHeight;
    var itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection: function clearSelection() {
    if ((void 0).getSelection) {
      if ((void 0).getSelection().empty) {
        (void 0).getSelection().empty();
      } else if ((void 0).getSelection().removeAllRanges && (void 0).getSelection().rangeCount > 0 && (void 0).getSelection().getRangeAt(0).getClientRects().length > 0) {
        (void 0).getSelection().removeAllRanges();
      }
    } else if ((void 0)["selection"] && (void 0)["selection"].empty) {
      try {
        (void 0)["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection: function getSelection() {
    if ((void 0).getSelection)
      return (void 0).getSelection().toString();
    else if ((void 0).getSelection)
      return (void 0).getSelection().toString();
    else if ((void 0)["selection"])
      return (void 0)["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth: function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
      return this.calculatedScrollbarWidth;
    var scrollDiv = (void 0).createElement("div");
    this.addStyles(scrollDiv, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-9999px"
    });
    (void 0).body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    (void 0).body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
    return (void 0).innerWidth - (void 0).documentElement.offsetWidth;
  },
  getBrowser: function getBrowser() {
    if (!this.browser) {
      var matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent: function resolveUserAgent() {
    var ua = (void 0).userAgent.toLowerCase();
    var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible: function isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod: function invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist: function isExist(element) {
    return !!(element !== null && typeof element !== "undefined" && element.nodeName && this.getParentNode(element));
  },
  isClient: function isClient() {
    return false;
  },
  focus: function focus(el, options) {
    el && (void 0).activeElement !== el && el.focus(options);
  },
  isFocusableElement: function isFocusableElement(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(element) ? element.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector)) : false;
  },
  getFocusableElements: function getFocusableElements(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var focusableElements = this.find(element, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector));
    var visibleFocusableElements = [];
    var _iterator3 = _createForOfIteratorHelper$1(focusableElements), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var focusableElement = _step3.value;
        if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
          visibleFocusableElements.push(focusableElement);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement: function getLastFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
    var focusableElements = this.getFocusableElements(container, selector);
    var index2 = focusableElements.length > 0 ? focusableElements.findIndex(function(el) {
      return el === element;
    }) : -1;
    var nextIndex = index2 > -1 && focusableElements.length >= index2 + 1 ? index2 + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    while (previousElement) {
      if (previousElement.matches(selector)) {
        return previousElement;
      } else {
        previousElement = previousElement.previousElementSibling;
      }
    }
    return null;
  },
  getNextElementSibling: function getNextElementSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    while (nextElement) {
      if (nextElement.matches(selector)) {
        return nextElement;
      } else {
        nextElement = nextElement.nextElementSibling;
      }
    }
    return null;
  },
  isClickable: function isClickable(element) {
    if (element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === "INPUT" || targetNode === "TEXTAREA" || targetNode === "BUTTON" || targetNode === "A" || parentNode === "INPUT" || parentNode === "TEXTAREA" || parentNode === "BUTTON" || parentNode === "A" || !!element.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return false;
  },
  applyStyle: function applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (var prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS: function isIOS() {
    return /iPad|iPhone|iPod/.test((void 0).userAgent) && !(void 0)["MSStream"];
  },
  isAndroid: function isAndroid() {
    return /(android)/i.test((void 0).userAgent);
  },
  isTouchDevice: function isTouchDevice() {
    return "ontouchstart" in void 0 || (void 0).maxTouchPoints > 0 || (void 0).msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function hasCSSAnimation(element) {
    if (element) {
      var style = getComputedStyle(element);
      var animationDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
      return animationDuration > 0;
    }
    return false;
  },
  hasCSSTransition: function hasCSSTransition(element) {
    if (element) {
      var style = getComputedStyle(element);
      var transitionDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
      return transitionDuration > 0;
    }
    return false;
  },
  exportCSV: function exportCSV(csv, filename) {
    var blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if ((void 0).navigator.msSaveOrOpenBlob) {
      (void 0).msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      var link = (void 0).createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        (void 0).open(encodeURI(csv));
      }
    }
  },
  blockBodyScroll: function blockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    (void 0).body.style.setProperty("--scrollbar-width", this.calculateBodyScrollbarWidth() + "px");
    this.addClass((void 0).body, className);
  },
  unblockBodyScroll: function unblockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    (void 0).body.style.removeProperty("--scrollbar-width");
    this.removeClass((void 0).body, className);
  }
};
function _typeof$2$1(o) {
  "@babel/helpers - typeof";
  return _typeof$2$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2$1(o);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey$1$1(t) {
  var i = _toPrimitive$1$1(t, "string");
  return "symbol" == _typeof$2$1(i) ? i : String(i);
}
function _toPrimitive$1$1(t, r) {
  if ("object" != _typeof$2$1(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2$1(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var ConnectedOverlayScrollHandler = /* @__PURE__ */ function() {
  function ConnectedOverlayScrollHandler2(element) {
    var listener = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    _classCallCheck$1(this, ConnectedOverlayScrollHandler2);
    this.element = element;
    this.listener = listener;
  }
  _createClass$1(ConnectedOverlayScrollHandler2, [{
    key: "bindScrollListener",
    value: function bindScrollListener2() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (var i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener2() {
      if (this.scrollableParents) {
        for (var i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener("scroll", this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
  return ConnectedOverlayScrollHandler2;
}();
function primebus() {
  var allHandlers = /* @__PURE__ */ new Map();
  return {
    on: function on(type, handler2) {
      var handlers = allHandlers.get(type);
      if (!handlers)
        handlers = [handler2];
      else
        handlers.push(handler2);
      allHandlers.set(type, handlers);
    },
    off: function off(type, handler2) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit: function emit(type, evt) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map(function(handler2) {
          handler2(evt);
        });
      }
    }
  };
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$2$1(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$4(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2$1(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$2$1(arr);
}
function _createForOfIteratorHelper$2(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$2$1(o)) || allowArrayLike) {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$2$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2$1(o, minLen);
}
function _arrayLikeToArray$2$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _typeof$1$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1$1(o);
}
var ObjectUtils = {
  equals: function equals(obj1, obj2, field) {
    if (field)
      return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else
      return this.deepEquals(obj1, obj2);
  },
  deepEquals: function deepEquals(a, b) {
    if (a === b)
      return true;
    if (a && b && _typeof$1$1(a) == "object" && _typeof$1$1(b) == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!this.deepEquals(a[i], b[i]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData: function resolveFieldData(data, field) {
    if (!data || !field) {
      return null;
    }
    try {
      var value = data[field];
      if (this.isNotEmpty(value))
        return value;
    } catch (_unused) {
    }
    if (Object.keys(data).length) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        var fields = field.split(".");
        var _value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (_value == null) {
            return null;
          }
          _value = _value[fields[i]];
        }
        return _value;
      }
    }
    return null;
  },
  getItemValue: function getItemValue(obj) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
  },
  filter: function filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      var _iterator = _createForOfIteratorHelper$2(value), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          var _iterator2 = _createForOfIteratorHelper$2(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return filteredItems;
  },
  reorderArray: function reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList: function findIndexInList(value, list) {
    var index2 = -1;
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index2 = i;
          break;
        }
      }
    }
    return index2;
  },
  contains: function contains(value, list) {
    if (value != null && list && list.length) {
      var _iterator3 = _createForOfIteratorHelper$2(list), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var val = _step3.value;
          if (this.equals(value, val))
            return true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  insertIntoOrderedArray: function insertIntoOrderedArray(item, index2, arr, sourceArr) {
    if (arr.length > 0) {
      var injected = false;
      for (var i = 0; i < arr.length; i++) {
        var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index2) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents: function removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp: function getVNodeProp(vnode, prop) {
    if (vnode) {
      var props = vnode.props;
      if (props) {
        var kebabProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
        return vnode.type["extends"].props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
      }
    }
    return null;
  },
  toFlatCase: function toFlatCase(str) {
    return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  },
  toKebabCase: function toKebabCase(str) {
    return this.isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, function(c, i) {
      return i === 0 ? c : "-" + c.toLowerCase();
    }).toLowerCase() : str;
  },
  toCapitalCase: function toCapitalCase(str) {
    return this.isString(str, {
      empty: false
    }) ? str[0].toUpperCase() + str.slice(1) : str;
  },
  isEmpty: function isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1$1(value) === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty: function isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isFunction: function isFunction2(value) {
    return !!(value && value.constructor && value.call && value.apply);
  },
  isObject: function isObject2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
  },
  isDate: function isDate2(value) {
    return value instanceof Date && value.constructor === Date;
  },
  isArray: function isArray2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return Array.isArray(value) && (empty || value.length !== 0);
  },
  isString: function isString2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return typeof value === "string" && (empty || value !== "");
  },
  isPrintableCharacter: function isPrintableCharacter() {
    var _char = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function findLast(arr, callback) {
    var item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch (_unused2) {
        item = _toConsumableArray$2(arr).reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function findLastIndex(arr, callback) {
    var index2 = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index2 = arr.findLastIndex(callback);
      } catch (_unused3) {
        index2 = arr.lastIndexOf(_toConsumableArray$2(arr).reverse().find(callback));
      }
    }
    return index2;
  },
  sort: function sort(value1, value2) {
    var order = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var comparator = arguments.length > 3 ? arguments[3] : void 0;
    var nullSortOrder = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    var result = this.compare(value1, value2, comparator, order);
    var finalSortOrder = order;
    if (this.isEmpty(value1) || this.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }
    return finalSortOrder * result;
  },
  compare: function compare(value1, value2, comparator) {
    var order = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
    var result = -1;
    var emptyValue1 = this.isEmpty(value1);
    var emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2)
      result = 0;
    else if (emptyValue1)
      result = order;
    else if (emptyValue2)
      result = -order;
    else if (typeof value1 === "string" && typeof value2 === "string")
      result = comparator(value1, value2);
    else
      result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  },
  localeComparator: function localeComparator() {
    return new Intl.Collator(void 0, {
      numeric: true
    }).compare;
  },
  nestedKeys: function nestedKeys() {
    var _this = this;
    var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(obj).reduce(function(o, _ref) {
      var _ref2 = _slicedToArray$4(_ref, 2), key = _ref2[0], value = _ref2[1];
      var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
      _this.isObject(value) ? o = o.concat(_this.nestedKeys(value, currentKey)) : o.push(currentKey);
      return o;
    }, []);
  },
  stringify: function stringify(value) {
    var _this2 = this;
    var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    var currentIndent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var currentIndentStr = " ".repeat(currentIndent);
    var nextIndentStr = " ".repeat(currentIndent + indent);
    if (this.isArray(value)) {
      return "[" + value.map(function(v) {
        return _this2.stringify(v, indent, currentIndent + indent);
      }).join(", ") + "]";
    } else if (this.isDate(value)) {
      return value.toISOString();
    } else if (this.isFunction(value)) {
      return value.toString();
    } else if (this.isObject(value)) {
      return "{\n" + Object.entries(value).map(function(_ref3) {
        var _ref4 = _slicedToArray$4(_ref3, 2), k = _ref4[0], v = _ref4[1];
        return "".concat(nextIndentStr).concat(k, ": ").concat(_this2.stringify(v, indent, currentIndent + indent));
      }).join(",\n") + "\n".concat(currentIndentStr) + "}";
    } else {
      return JSON.stringify(value);
    }
  }
};
function _typeof$8(o) {
  "@babel/helpers - typeof";
  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$8(o);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1$1(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1$1(o, minLen);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1$1(arr);
}
function _arrayLikeToArray$1$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$7(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty$7(obj, key, value) {
  key = _toPropertyKey$7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$7(t) {
  var i = _toPrimitive$7(t, "string");
  return "symbol" == _typeof$8(i) ? i : String(i);
}
function _toPrimitive$7(t, r) {
  if ("object" != _typeof$8(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$8(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _default = /* @__PURE__ */ function() {
  function _default2(_ref) {
    var init = _ref.init, type = _ref.type;
    _classCallCheck(this, _default2);
    _defineProperty$7(this, "helpers", void 0);
    _defineProperty$7(this, "type", void 0);
    this.helpers = new Set(init);
    this.type = type;
  }
  _createClass(_default2, [{
    key: "add",
    value: function add(instance) {
      this.helpers.add(instance);
    }
  }, {
    key: "update",
    value: function update() {
    }
  }, {
    key: "delete",
    value: function _delete(instance) {
      this.helpers["delete"](instance);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.helpers.clear();
    }
  }, {
    key: "get",
    value: function get(parentInstance, slots) {
      var children = this._get(parentInstance, slots);
      var computed2 = children ? this._recursive(_toConsumableArray$1(this.helpers), children) : null;
      return ObjectUtils.isNotEmpty(computed2) ? computed2 : null;
    }
  }, {
    key: "_isMatched",
    value: function _isMatched(instance, key) {
      var _parent$vnode;
      var parent = instance === null || instance === void 0 ? void 0 : instance.parent;
      return (parent === null || parent === void 0 || (_parent$vnode = parent.vnode) === null || _parent$vnode === void 0 ? void 0 : _parent$vnode.key) === key || parent && this._isMatched(parent, key) || false;
    }
  }, {
    key: "_get",
    value: function _get(parentInstance, slots) {
      var _ref2, _ref2$default;
      return ((_ref2 = slots || (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$slots)) === null || _ref2 === void 0 || (_ref2$default = _ref2["default"]) === null || _ref2$default === void 0 ? void 0 : _ref2$default.call(_ref2)) || null;
    }
  }, {
    key: "_recursive",
    value: function _recursive() {
      var _this = this;
      var helpers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var children = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      var components = [];
      children.forEach(function(child) {
        if (child.children instanceof Array) {
          components = components.concat(_this._recursive(components, child.children));
        } else if (child.type.name === _this.type) {
          components.push(child);
        } else if (ObjectUtils.isNotEmpty(child.key)) {
          components = components.concat(helpers.filter(function(c) {
            return _this._isMatched(c, child.key);
          }).map(function(c) {
            return c.vnode;
          }));
        }
      });
      return components;
    }
  }]);
  return _default2;
}();
var lastId = 0;
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  lastId++;
  return "".concat(prefix).concat(lastId);
}
function _toConsumableArray$4(arr) {
  return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$4();
}
function _nonIterableSpread$4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$6(o, minLen);
}
function _iterableToArray$4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$4(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$6(arr);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function handler() {
  var zIndexes = [];
  var generateZIndex = function generateZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 999;
    var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key,
      value: newZIndex
    });
    return newZIndex;
  };
  var revertZIndex = function revertZIndex2(zIndex) {
    zIndexes = zIndexes.filter(function(obj) {
      return obj.value !== zIndex;
    });
  };
  var getCurrentZIndex = function getCurrentZIndex2(key, autoZIndex) {
    return getLastZIndex(key, autoZIndex).value;
  };
  var getLastZIndex = function getLastZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return _toConsumableArray$4(zIndexes).reverse().find(function(obj) {
      return true;
    }) || {
      key,
      value: baseZIndex
    };
  };
  var getZIndex = function getZIndex2(el) {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: function set(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: function getCurrent(key) {
      return getCurrentZIndex(key, true);
    }
  };
}
var ZIndexUtils = handler();
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
var FilterOperator = {
  AND: "and",
  OR: "or"
};
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike) {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var FilterService = {
  filter: function filter2(value, fields, filterValue, filterMatchMode, filterLocale) {
    var filteredItems = [];
    if (!value) {
      return filteredItems;
    }
    var _iterator = _createForOfIteratorHelper(value), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item = _step.value;
        if (typeof item === "string") {
          if (this.filters[filterMatchMode](item, filterValue, filterLocale)) {
            filteredItems.push(item);
            continue;
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              var fieldValue = ObjectUtils.resolveFieldData(item, field);
              if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return filteredItems;
  },
  filters: {
    startsWith: function startsWith(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: function contains2(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: function notContains(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: function endsWith(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: function equals2(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime)
        return value.getTime() === filter22.getTime();
      else
        return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: function notEquals(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter22.getTime)
        return value.getTime() !== filter22.getTime();
      else
        return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
    },
    "in": function _in(value, filter22) {
      if (filter22 === void 0 || filter22 === null || filter22.length === 0) {
        return true;
      }
      for (var i = 0; i < filter22.length; i++) {
        if (ObjectUtils.equals(value, filter22[i])) {
          return true;
        }
      }
      return false;
    },
    between: function between(value, filter22) {
      if (filter22 == null || filter22[0] == null || filter22[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime)
        return filter22[0].getTime() <= value.getTime() && value.getTime() <= filter22[1].getTime();
      else
        return filter22[0] <= value && value <= filter22[1];
    },
    lt: function lt(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime)
        return value.getTime() < filter22.getTime();
      else
        return value < filter22;
    },
    lte: function lte(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime)
        return value.getTime() <= filter22.getTime();
      else
        return value <= filter22;
    },
    gt: function gt(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime)
        return value.getTime() > filter22.getTime();
      else
        return value > filter22;
    },
    gte: function gte(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime)
        return value.getTime() >= filter22.getTime();
      else
        return value >= filter22;
    },
    dateIs: function dateIs(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter22.toDateString();
    },
    dateIsNot: function dateIsNot(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter22.toDateString();
    },
    dateBefore: function dateBefore(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter22.getTime();
    },
    dateAfter: function dateAfter(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() > filter22.getTime();
    }
  },
  register: function register(rule, fn) {
    this.filters[rule] = fn;
  }
};
function _typeof$7(o) {
  "@babel/helpers - typeof";
  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$7(o);
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$6(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$6(obj, key, value) {
  key = _toPropertyKey$6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == _typeof$7(i) ? i : String(i);
}
function _toPrimitive$6(t, r) {
  if ("object" != _typeof$7(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$7(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  unstyled: false,
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = Symbol();
function switchTheme(currentTheme, newTheme, linkElementId, callback) {
  if (currentTheme !== newTheme) {
    var linkElement = (void 0).getElementById(linkElementId);
    var cloneLinkElement = linkElement.cloneNode(true);
    var newThemeUrl = linkElement.getAttribute("href").replace(currentTheme, newTheme);
    cloneLinkElement.setAttribute("id", linkElementId + "-clone");
    cloneLinkElement.setAttribute("href", newThemeUrl);
    cloneLinkElement.addEventListener("load", function() {
      linkElement.remove();
      cloneLinkElement.setAttribute("id", linkElementId);
      if (callback) {
        callback();
      }
    });
    linkElement.parentNode && linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  }
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = options ? _objectSpread$6(_objectSpread$6({}, defaultOptions), options) : _objectSpread$6({}, defaultOptions);
    var PrimeVue2 = {
      config: reactive(configOptions),
      changeTheme: switchTheme
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
var ConfirmationEventBus = primebus();
var PrimeVueConfirmSymbol = Symbol();
var ConfirmationService = {
  install: function install2(app) {
    var ConfirmationService2 = {
      require: function require2(options) {
        ConfirmationEventBus.emit("confirm", options);
      },
      close: function close() {
        ConfirmationEventBus.emit("close");
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService2;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService2);
  }
};
var DynamicDialogEventBus = primebus();
var PrimeVueDialogSymbol = Symbol();
var DialogService = {
  install: function install3(app) {
    var DialogService2 = {
      open: function open(content, options) {
        var instance = {
          content: content && markRaw(content),
          options: options || {},
          data: options && options.data,
          close: function close(params) {
            DynamicDialogEventBus.emit("close", {
              instance,
              params
            });
          }
        };
        DynamicDialogEventBus.emit("open", {
          instance
        });
        return instance;
      }
    };
    app.config.globalProperties.$dialog = DialogService2;
    app.provide(PrimeVueDialogSymbol, DialogService2);
  }
};
var ToastEventBus = primebus();
var PrimeVueToastSymbol = Symbol();
function useToast() {
  var PrimeVueToast = inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error("No PrimeVue Toast provided!");
  }
  return PrimeVueToast;
}
var ToastService = {
  install: function install4(app) {
    var ToastService2 = {
      add: function add(message2) {
        ToastEventBus.emit("add", message2);
      },
      remove: function remove3(message2) {
        ToastEventBus.emit("remove", message2);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
function _typeof$6(o) {
  "@babel/helpers - typeof";
  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$6(o);
}
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$5(obj, key, value) {
  key = _toPropertyKey$5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == _typeof$6(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
  if ("object" != _typeof$6(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$6(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
var _id = 0;
function useStyle(css2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css2);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? (void 0).document : void 0;
  var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load = function load2(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document)
      return;
    var _styleProps = _objectSpread$5(_objectSpread$5({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document.getElementById(_id2) || document.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css2;
      DomHandler.setAttributes(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      document.head.appendChild(styleRef.value);
      DomHandler.setAttribute(styleRef.value, "data-primevue-style-id", name);
      DomHandler.setAttributes(styleRef.value, _styleProps);
    }
    if (isLoaded.value)
      return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document || !isLoaded.value)
      return;
    stop();
    DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  return {
    id,
    name,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
function _typeof$5(o) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$5(o);
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$5(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$5(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var css = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: var(--scrollbar-width);\n}\n";
var classes$3 = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css,
  classes: classes$3,
  inlineStyles,
  loadStyle: function loadStyle() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.css ? useStyle(this.css, _objectSpread$4({
      name: this.name
    }, options)) : {};
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _props = Object.entries(props).reduce(function(acc, _ref) {
        var _ref2 = _slicedToArray$3(_ref, 2), k = _ref2[0], v = _ref2[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(this.css).concat(extendedCSS, "</style>");
    }
    return "";
  },
  extend: function extend(style) {
    return _objectSpread$4(_objectSpread$4({}, this), {}, {
      css: void 0
    }, style);
  }
};
var classes$2 = {
  root: "p-badge p-component"
};
var BadgeDirectiveStyle = BaseStyle.extend({
  name: "badge",
  classes: classes$2
});
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$4(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$4(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BaseDirective = {
  _getMeta: function _getMeta() {
    return [ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? void 0 : arguments.length <= 0 ? void 0 : arguments[0], ObjectUtils.getItemValue(ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function _getConfig(binding, vnode) {
    var _ref, _binding$instance, _vnode$ctx;
    return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
  },
  _getOptionValue: function _getOptionValue(options) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var fKeys = ObjectUtils.toFlatCase(key).split(".");
    var fKey = fKeys.shift();
    return fKey ? ObjectUtils.isObject(options) ? BaseDirective._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find(function(k) {
      return ObjectUtils.toFlatCase(k) === fKey;
    }) || ""], params), fKeys.join("."), params) : void 0 : ObjectUtils.getItemValue(options, params);
  },
  _getPTValue: function _getPTValue() {
    var _instance$binding, _instance$$primevueCo;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var searchInDefaultPT = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var getValue = function getValue2() {
      var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
      return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? {
        "class": value
      } : value;
    };
    var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$primevueCo = instance.$primevueConfig) === null || _instance$$primevueCo === void 0 ? void 0 : _instance$$primevueCo.ptOptions) || {}, _ref2$mergeSections = _ref2.mergeSections, mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections, _ref2$mergeProps = _ref2.mergeProps, useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
    var global2 = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : void 0;
    var self2 = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread$3(_objectSpread$3({}, params), {}, {
      global: global2 || {}
    }));
    var datasets = BaseDirective._getPTDatasets(instance, key);
    return mergeSections || !mergeSections && self2 ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global2, self2, datasets) : _objectSpread$3(_objectSpread$3(_objectSpread$3({}, global2), self2), datasets) : _objectSpread$3(_objectSpread$3({}, self2), datasets);
  },
  _getPTDatasets: function _getPTDatasets() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var datasetPrefix = "data-pc-";
    return _objectSpread$3(_objectSpread$3({}, key === "root" && _defineProperty$3({}, "".concat(datasetPrefix, "name"), ObjectUtils.toFlatCase(instance.$name))), {}, _defineProperty$3({}, "".concat(datasetPrefix, "section"), ObjectUtils.toFlatCase(key)));
  },
  _getPT: function _getPT(pt) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var getValue = function getValue2(value) {
      var _computedValue$_key;
      var computedValue = callback ? callback(value) : value;
      var _key = ObjectUtils.toFlatCase(key);
      return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
    };
    return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt);
  },
  _usePT: function _usePT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var pt = arguments.length > 1 ? arguments[1] : void 0;
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    var fn = function fn2(value2) {
      return callback(value2, key, params);
    };
    if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
      var _instance$$primevueCo2;
      var _ref4 = pt["_usept"] || ((_instance$$primevueCo2 = instance.$primevueConfig) === null || _instance$$primevueCo2 === void 0 ? void 0 : _instance$$primevueCo2.ptOptions) || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
      var originalValue = fn(pt.originalValue);
      var value = fn(pt.value);
      if (originalValue === void 0 && value === void 0)
        return void 0;
      else if (ObjectUtils.isString(value))
        return value;
      else if (ObjectUtils.isString(originalValue))
        return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread$3(_objectSpread$3({}, originalValue), value) : value;
    }
    return fn(pt);
  },
  _useDefaultPT: function _useDefaultPT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultPT = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    return BaseDirective._usePT(instance, defaultPT, callback, key, params);
  },
  _hook: function _hook(directiveName, hookName, el, binding, vnode, prevVnode) {
    var _binding$value, _config$pt;
    var name = "on".concat(ObjectUtils.toCapitalCase(hookName));
    var config2 = BaseDirective._getConfig(binding, vnode);
    var instance = el === null || el === void 0 ? void 0 : el.$instance;
    var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
    var defaultHook = BaseDirective._useDefaultPT(instance, config2 === null || config2 === void 0 || (_config$pt = config2.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
    var options = {
      el,
      binding,
      vnode,
      prevVnode
    };
    selfHook === null || selfHook === void 0 || selfHook(instance, options);
    defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
  },
  _mergeProps: function _mergeProps() {
    var fn = arguments.length > 1 ? arguments[1] : void 0;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
  },
  _extend: function _extend(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var handleHook = function handleHook2(hook, el, binding, vnode, prevVnode) {
      var _el$$instance$hook, _el$$instance7;
      el._$instances = el._$instances || {};
      var config2 = BaseDirective._getConfig(binding, vnode);
      var $prevInstance = el._$instances[name] || {};
      var $options = ObjectUtils.isEmpty($prevInstance) ? _objectSpread$3(_objectSpread$3({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
      el._$instances[name] = _objectSpread$3(_objectSpread$3({}, $prevInstance), {}, {
        /* new instance variables to pass in directive methods */
        $name: name,
        $host: el,
        $binding: binding,
        $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
        $value: binding === null || binding === void 0 ? void 0 : binding.value,
        $el: $prevInstance["$el"] || el || void 0,
        $style: _objectSpread$3({
          classes: void 0,
          inlineStyles: void 0,
          loadStyle: function loadStyle2() {
          }
        }, options === null || options === void 0 ? void 0 : options.style),
        $primevueConfig: config2,
        /* computed instance variables */
        defaultPT: function defaultPT() {
          return BaseDirective._getPT(config2 === null || config2 === void 0 ? void 0 : config2.pt, void 0, function(value) {
            var _value$directives;
            return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
          });
        },
        isUnstyled: function isUnstyled() {
          var _el$$instance, _el$$instance2;
          return ((_el$$instance = el.$instance) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.$binding) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.value) === null || _el$$instance === void 0 ? void 0 : _el$$instance.unstyled) !== void 0 ? (_el$$instance2 = el.$instance) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.$binding) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.value) === null || _el$$instance2 === void 0 ? void 0 : _el$$instance2.unstyled : config2 === null || config2 === void 0 ? void 0 : config2.unstyled;
        },
        /* instance's methods */
        ptm: function ptm() {
          var _el$$instance3;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return BaseDirective._getPTValue(el.$instance, (_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$binding) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.value) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.pt, key, _objectSpread$3({}, params));
        },
        ptmo: function ptmo() {
          var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
        },
        cx: function cx() {
          var _el$$instance4, _el$$instance5;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return !((_el$$instance4 = el.$instance) !== null && _el$$instance4 !== void 0 && _el$$instance4.isUnstyled()) ? BaseDirective._getOptionValue((_el$$instance5 = el.$instance) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.$style) === null || _el$$instance5 === void 0 ? void 0 : _el$$instance5.classes, key, _objectSpread$3({}, params)) : void 0;
        },
        sx: function sx() {
          var _el$$instance6;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return when ? BaseDirective._getOptionValue((_el$$instance6 = el.$instance) === null || _el$$instance6 === void 0 || (_el$$instance6 = _el$$instance6.$style) === null || _el$$instance6 === void 0 ? void 0 : _el$$instance6.inlineStyles, key, _objectSpread$3({}, params)) : void 0;
        }
      }, $options);
      el.$instance = el._$instances[name];
      (_el$$instance$hook = (_el$$instance7 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance7, el, binding, vnode, prevVnode);
      el["$".concat(name)] = el.$instance;
      BaseDirective._hook(name, hook, el, binding, vnode, prevVnode);
    };
    return {
      created: function created2(el, binding, vnode, prevVnode) {
        handleHook("created", el, binding, vnode, prevVnode);
      },
      beforeMount: function beforeMount2(el, binding, vnode, prevVnode) {
        var _config$csp, _el$$instance8, _el$$instance9, _config$csp2;
        var config2 = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config2 === null || config2 === void 0 || (_config$csp = config2.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
        });
        !((_el$$instance8 = el.$instance) !== null && _el$$instance8 !== void 0 && _el$$instance8.isUnstyled()) && ((_el$$instance9 = el.$instance) === null || _el$$instance9 === void 0 || (_el$$instance9 = _el$$instance9.$style) === null || _el$$instance9 === void 0 ? void 0 : _el$$instance9.loadStyle({
          nonce: config2 === null || config2 === void 0 || (_config$csp2 = config2.csp) === null || _config$csp2 === void 0 ? void 0 : _config$csp2.nonce
        }));
        handleHook("beforeMount", el, binding, vnode, prevVnode);
      },
      mounted: function mounted6(el, binding, vnode, prevVnode) {
        var _config$csp3, _el$$instance10, _el$$instance11, _config$csp4;
        var config2 = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config2 === null || config2 === void 0 || (_config$csp3 = config2.csp) === null || _config$csp3 === void 0 ? void 0 : _config$csp3.nonce
        });
        !((_el$$instance10 = el.$instance) !== null && _el$$instance10 !== void 0 && _el$$instance10.isUnstyled()) && ((_el$$instance11 = el.$instance) === null || _el$$instance11 === void 0 || (_el$$instance11 = _el$$instance11.$style) === null || _el$$instance11 === void 0 ? void 0 : _el$$instance11.loadStyle({
          nonce: config2 === null || config2 === void 0 || (_config$csp4 = config2.csp) === null || _config$csp4 === void 0 ? void 0 : _config$csp4.nonce
        }));
        handleHook("mounted", el, binding, vnode, prevVnode);
      },
      beforeUpdate: function beforeUpdate(el, binding, vnode, prevVnode) {
        handleHook("beforeUpdate", el, binding, vnode, prevVnode);
      },
      updated: function updated4(el, binding, vnode, prevVnode) {
        handleHook("updated", el, binding, vnode, prevVnode);
      },
      beforeUnmount: function beforeUnmount(el, binding, vnode, prevVnode) {
        handleHook("beforeUnmount", el, binding, vnode, prevVnode);
      },
      unmounted: function unmounted6(el, binding, vnode, prevVnode) {
        handleHook("unmounted", el, binding, vnode, prevVnode);
      }
    };
  },
  extend: function extend2() {
    var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe2 = _slicedToArray$2(_BaseDirective$_getMe, 2), name = _BaseDirective$_getMe2[0], options = _BaseDirective$_getMe2[1];
    return _objectSpread$3({
      extend: function extend3() {
        var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe4 = _slicedToArray$2(_BaseDirective$_getMe3, 2), _name = _BaseDirective$_getMe4[0], _options = _BaseDirective$_getMe4[1];
        return BaseDirective.extend(_name, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
      }
    }, BaseDirective._extend(name, options));
  }
};
var BaseBadgeDirective = BaseDirective.extend({
  style: BadgeDirectiveStyle
});
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$3(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BadgeDirective = BaseBadgeDirective.extend("badge", {
  mounted: function mounted(el, binding) {
    var id = UniqueComponentId() + "_badge";
    var badge2 = DomHandler.createElement("span", {
      id,
      "class": !this.isUnstyled() && this.cx("root"),
      "p-bind": this.ptm("root", {
        context: _objectSpread$2(_objectSpread$2({}, binding.modifiers), {}, {
          nogutter: String(binding.value).length === 1,
          dot: binding.value == null
        })
      })
    });
    el.$_pbadgeId = badge2.getAttribute("id");
    for (var modifier in binding.modifiers) {
      !this.isUnstyled() && DomHandler.addClass(badge2, "p-badge-" + modifier);
    }
    if (binding.value != null) {
      if (_typeof$3(binding.value) === "object")
        el.$_badgeValue = binding.value.value;
      else
        el.$_badgeValue = binding.value;
      badge2.appendChild((void 0).createTextNode(el.$_badgeValue));
      if (String(el.$_badgeValue).length === 1 && !this.isUnstyled()) {
        !this.isUnstyled() && DomHandler.addClass(badge2, "p-badge-no-gutter");
      }
    } else {
      !this.isUnstyled() && DomHandler.addClass(badge2, "p-badge-dot");
    }
    el.setAttribute("data-pd-badge", true);
    !this.isUnstyled() && DomHandler.addClass(el, "p-overlay-badge");
    el.setAttribute("data-p-overlay-badge", "true");
    el.appendChild(badge2);
    this.$el = badge2;
  },
  updated: function updated(el, binding) {
    !this.isUnstyled() && DomHandler.addClass(el, "p-overlay-badge");
    el.setAttribute("data-p-overlay-badge", "true");
    if (binding.oldValue !== binding.value) {
      var badge2 = (void 0).getElementById(el.$_pbadgeId);
      if (_typeof$3(binding.value) === "object")
        el.$_badgeValue = binding.value.value;
      else
        el.$_badgeValue = binding.value;
      if (!this.isUnstyled()) {
        if (el.$_badgeValue) {
          if (DomHandler.hasClass(badge2, "p-badge-dot"))
            DomHandler.removeClass(badge2, "p-badge-dot");
          if (el.$_badgeValue.length === 1)
            DomHandler.addClass(badge2, "p-badge-no-gutter");
          else
            DomHandler.removeClass(badge2, "p-badge-no-gutter");
        } else if (!el.$_badgeValue && !DomHandler.hasClass(badge2, "p-badge-dot")) {
          DomHandler.addClass(badge2, "p-badge-dot");
        }
      }
      badge2.innerHTML = "";
      badge2.appendChild((void 0).createTextNode(el.$_badgeValue));
    }
  }
});
var classes$1 = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = BaseStyle.extend({
  name: "tooltip",
  classes: classes$1
});
var BaseTooltip = BaseDirective.extend({
  style: TooltipStyle
});
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
var Tooltip = BaseTooltip.extend("tooltip", {
  beforeMount: function beforeMount(el, options) {
    var _options$instance$$pr;
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    if (!options.value)
      return;
    else if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipFitContent = true;
      target.$_ptooltipIdAttr = UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
    } else if (_typeof$2(options.value) === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "")
        return;
      else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
      }
    }
    target.$_ptooltipZIndex = (_options$instance$$pr = options.instance.$primevue) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.config) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.zIndex) === null || _options$instance$$pr === void 0 ? void 0 : _options$instance$$pr.tooltip;
    this.bindEvents(target, options);
    el.setAttribute("data-pd-tooltip", true);
  },
  updated: function updated2(el, options) {
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    this.unbindEvents(target);
    if (!options.value) {
      return;
    }
    if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipIdAttr = target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
      this.bindEvents(target, options);
    } else if (_typeof$2(options.value) === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "") {
        this.unbindEvents(target, options);
        return;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
        this.bindEvents(target, options);
      }
    }
  },
  unmounted: function unmounted(el, options) {
    var target = this.getTarget(el);
    this.remove(target);
    this.unbindEvents(target, options);
    if (target.$_ptooltipScrollHandler) {
      target.$_ptooltipScrollHandler.destroy();
      target.$_ptooltipScrollHandler = null;
    }
  },
  timer: void 0,
  methods: {
    bindEvents: function bindEvents(el, options) {
      var _this = this;
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.$_focusevent = function(event) {
          return _this.onFocus(event, options);
        };
        el.addEventListener("focus", el.$_focusevent);
        el.addEventListener("blur", this.onBlur.bind(this));
      } else {
        el.$_mouseenterevent = function(event) {
          return _this.onMouseEnter(event, options);
        };
        el.addEventListener("mouseenter", el.$_mouseenterevent);
        el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.addEventListener("click", this.onClick.bind(this));
      }
      el.addEventListener("keydown", this.onKeydown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.removeEventListener("focus", el.$_focusevent);
        el.$_focusevent = null;
        el.removeEventListener("blur", this.onBlur.bind(this));
      } else {
        el.removeEventListener("mouseenter", el.$_mouseenterevent);
        el.$_mouseenterevent = null;
        el.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.removeEventListener("click", this.onClick.bind(this));
      }
      el.removeEventListener("keydown", this.onKeydown.bind(this));
    },
    bindScrollListener: function bindScrollListener(el) {
      var _this2 = this;
      if (!el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler = new ConnectedOverlayScrollHandler(el, function() {
          _this2.hide(el);
        });
      }
      el.$_ptooltipScrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener(el) {
      if (el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler.unbindScrollListener();
      }
    },
    onMouseEnter: function onMouseEnter(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onMouseLeave: function onMouseLeave(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      var autoHide = el.$_ptooltipAutoHide;
      if (!autoHide) {
        var valid = DomHandler.getAttribute(event.target, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.target, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.target, "data-pc-section") === "text" || DomHandler.getAttribute(event.relatedTarget, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "text";
        !valid && this.hide(el, hideDelay);
      } else {
        this.hide(el, hideDelay);
      }
    },
    onFocus: function onFocus(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onBlur: function onBlur(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onClick: function onClick(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onKeydown: function onKeydown(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      event.code === "Escape" && this.hide(event.currentTarget, hideDelay);
    },
    tooltipActions: function tooltipActions(el, options) {
      if (el.$_ptooltipDisabled || !DomHandler.isExist(el)) {
        return;
      }
      var tooltipElement = this.create(el, options);
      this.align(el);
      !this.isUnstyled() && DomHandler.fadeIn(tooltipElement, 250);
      var $this = this;
      (void 0).addEventListener("resize", function onWindowResize() {
        if (!DomHandler.isTouchDevice()) {
          $this.hide(el);
        }
        (void 0).removeEventListener("resize", onWindowResize);
      });
      tooltipElement.addEventListener("mouseleave", function onTooltipLeave() {
        $this.hide(el);
        tooltipElement.removeEventListener("mouseleave", onTooltipLeave);
      });
      this.bindScrollListener(el);
      ZIndexUtils.set("tooltip", tooltipElement, el.$_ptooltipZIndex);
    },
    show: function show(el, options, showDelay) {
      var _this3 = this;
      if (showDelay !== void 0) {
        this.timer = setTimeout(function() {
          return _this3.tooltipActions(el, options);
        }, showDelay);
      } else {
        this.tooltipActions(el, options);
      }
    },
    tooltipRemoval: function tooltipRemoval(el) {
      this.remove(el);
      this.unbindScrollListener(el);
    },
    hide: function hide(el, hideDelay) {
      var _this4 = this;
      clearTimeout(this.timer);
      if (hideDelay !== void 0) {
        setTimeout(function() {
          return _this4.tooltipRemoval(el);
        }, hideDelay);
      } else {
        this.tooltipRemoval(el);
      }
    },
    getTooltipElement: function getTooltipElement(el) {
      return (void 0).getElementById(el.$_ptooltipId);
    },
    create: function create(el) {
      var modifiers = el.$_ptooltipModifiers;
      var tooltipArrow = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("arrow"),
        "p-bind": this.ptm("arrow", {
          context: modifiers
        })
      });
      var tooltipText = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("text"),
        "p-bind": this.ptm("text", {
          context: modifiers
        })
      });
      if (!el.$_ptooltipEscape) {
        tooltipText.innerHTML = el.$_ptooltipValue;
      } else {
        tooltipText.innerHTML = "";
        tooltipText.appendChild((void 0).createTextNode(el.$_ptooltipValue));
      }
      var container = DomHandler.createElement("div", {
        id: el.$_ptooltipIdAttr,
        role: "tooltip",
        style: {
          display: "inline-block",
          width: el.$_ptooltipFitContent ? "fit-content" : void 0,
          pointerEvents: !this.isUnstyled() && el.$_ptooltipAutoHide && "none"
        },
        "class": [!this.isUnstyled() && this.cx("root"), el.$_ptooltipClass],
        "p-bind": this.ptm("root", {
          context: modifiers
        })
      }, tooltipArrow, tooltipText);
      (void 0).body.appendChild(container);
      el.$_ptooltipId = container.id;
      this.$el = container;
      return container;
    },
    remove: function remove(el) {
      if (el) {
        var tooltipElement = this.getTooltipElement(el);
        if (tooltipElement && tooltipElement.parentElement) {
          ZIndexUtils.clear(tooltipElement);
          (void 0).body.removeChild(tooltipElement);
        }
        el.$_ptooltipId = null;
      }
    },
    align: function align(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.top) {
        this.alignTop(el);
        if (this.isOutOfBounds(el)) {
          this.alignBottom(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
          }
        }
      } else if (modifiers.left) {
        this.alignLeft(el);
        if (this.isOutOfBounds(el)) {
          this.alignRight(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignLeft(el);
              }
            }
          }
        }
      } else if (modifiers.bottom) {
        this.alignBottom(el);
        if (this.isOutOfBounds(el)) {
          this.alignTop(el);
          if (this.isOutOfBounds(el)) {
            this.alignBottom(el);
          }
        }
      } else {
        this.alignRight(el);
        if (this.isOutOfBounds(el)) {
          this.alignLeft(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignRight(el);
              }
            }
          }
        }
      }
    },
    getHostOffset: function getHostOffset(el) {
      var offset = el.getBoundingClientRect();
      var targetLeft = offset.left + DomHandler.getWindowScrollLeft();
      var targetTop = offset.top + DomHandler.getWindowScrollTop();
      return {
        left: targetLeft,
        top: targetTop
      };
    },
    alignRight: function alignRight(el) {
      this.preAlign(el, "right");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + DomHandler.getOuterWidth(el);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignLeft: function alignLeft(el) {
      this.preAlign(el, "left");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left - DomHandler.getOuterWidth(tooltipElement);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignTop: function alignTop(el) {
      this.preAlign(el, "top");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top - DomHandler.getOuterHeight(tooltipElement);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignBottom: function alignBottom(el) {
      this.preAlign(el, "bottom");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top + DomHandler.getOuterHeight(el);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    preAlign: function preAlign(el, position) {
      var tooltipElement = this.getTooltipElement(el);
      tooltipElement.style.left = "-999px";
      tooltipElement.style.top = "-999px";
      DomHandler.removeClass(tooltipElement, "p-tooltip-".concat(tooltipElement.$_ptooltipPosition));
      !this.isUnstyled() && DomHandler.addClass(tooltipElement, "p-tooltip-".concat(position));
      tooltipElement.$_ptooltipPosition = position;
      tooltipElement.setAttribute("data-p-position", position);
      var arrowElement = DomHandler.findSingle(tooltipElement, '[data-pc-section="arrow"]');
      arrowElement.style.top = position === "bottom" ? "0" : position === "right" || position === "left" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "50%" : null;
      arrowElement.style.bottom = position === "top" ? "0" : null;
      arrowElement.style.left = position === "right" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "0" : position === "top" || position === "bottom" ? "50%" : null;
      arrowElement.style.right = position === "left" ? "0" : null;
    },
    isOutOfBounds: function isOutOfBounds(el) {
      var tooltipElement = this.getTooltipElement(el);
      var offset = tooltipElement.getBoundingClientRect();
      var targetTop = offset.top;
      var targetLeft = offset.left;
      var width2 = DomHandler.getOuterWidth(tooltipElement);
      var height = DomHandler.getOuterHeight(tooltipElement);
      var viewport = DomHandler.getViewport();
      return targetLeft + width2 > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    },
    getTarget: function getTarget(el) {
      return DomHandler.hasClass(el, "p-inputwrapper") ? DomHandler.findSingle(el, "input") : el;
    },
    getModifiers: function getModifiers(options) {
      if (options.modifiers && Object.keys(options.modifiers).length) {
        return options.modifiers;
      }
      if (options.arg && _typeof$2(options.arg) === "object") {
        return Object.entries(options.arg).reduce(function(acc, _ref) {
          var _ref2 = _slicedToArray$1(_ref, 2), key = _ref2[0], val = _ref2[1];
          if (key === "event" || key === "position")
            acc[val] = true;
          return acc;
        }, {});
      }
      return {};
    }
  }
});
var classes = {
  root: "p-ink"
};
var RippleStyle = BaseStyle.extend({
  name: "ripple",
  classes
});
var BaseRipple = BaseDirective.extend({
  style: RippleStyle
});
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1(arr);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var Ripple = BaseRipple.extend("ripple", {
  mounted: function mounted2(el) {
    var _el$$instance;
    var config2 = el === null || el === void 0 || (_el$$instance = el.$instance) === null || _el$$instance === void 0 ? void 0 : _el$$instance.$primevueConfig;
    if (config2 && config2.ripple) {
      this.create(el);
      this.bindEvents(el);
      el.setAttribute("data-pd-ripple", true);
    }
  },
  unmounted: function unmounted2(el) {
    this.remove(el);
  },
  timeout: void 0,
  methods: {
    bindEvents: function bindEvents2(el) {
      el.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function unbindEvents2(el) {
      el.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    create: function create2(el) {
      var ink = DomHandler.createElement("span", {
        role: "presentation",
        "aria-hidden": true,
        "data-p-ink": true,
        "data-p-ink-active": false,
        "class": !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this),
        "p-bind": this.ptm("root")
      });
      el.appendChild(ink);
      this.$el = ink;
    },
    remove: function remove2(el) {
      var ink = this.getInk(el);
      if (ink) {
        this.unbindEvents(el);
        ink.removeEventListener("animationend", this.onAnimationEnd);
        ink.remove();
      }
    },
    onMouseDown: function onMouseDown(event) {
      var _this = this;
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === "none") {
        return;
      }
      !this.isUnstyled() && DomHandler.removeClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "false");
      if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
        var d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
        ink.style.height = d + "px";
        ink.style.width = d + "px";
      }
      var offset = DomHandler.getOffset(target);
      var x = event.pageX - offset.left + (void 0).body.scrollTop - DomHandler.getWidth(ink) / 2;
      var y = event.pageY - offset.top + (void 0).body.scrollLeft - DomHandler.getHeight(ink) / 2;
      ink.style.top = y + "px";
      ink.style.left = x + "px";
      !this.isUnstyled() && DomHandler.addClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "true");
      this.timeout = setTimeout(function() {
        if (ink) {
          !_this.isUnstyled() && DomHandler.removeClass(ink, "p-ink-active");
          ink.setAttribute("data-p-ink-active", "false");
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && DomHandler.removeClass(event.currentTarget, "p-ink-active");
      event.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray(el.children).find(function(child) {
        return DomHandler.getAttribute(child, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
var BaseStyleClass = BaseDirective.extend({});
var StyleClass = BaseStyleClass.extend("styleclass", {
  mounted: function mounted3(el, binding) {
    el.setAttribute("data-pd-styleclass", true);
    this.bind(el, binding);
  },
  unmounted: function unmounted3(el) {
    this.unbind(el);
  },
  methods: {
    bind: function bind(el, binding) {
      var _this = this;
      var target = this.resolveTarget(el, binding);
      this.$el = target;
      el.$_pstyleclass_clicklistener = function() {
        if (binding.value.toggleClass) {
          if (DomHandler.hasClass(target, binding.value.toggleClass))
            DomHandler.removeClass(target, binding.value.toggleClass);
          else
            DomHandler.addClass(target, binding.value.toggleClass);
        } else {
          if (target.offsetParent === null)
            _this.enter(target, el, binding);
          else
            _this.leave(target, binding);
        }
      };
      el.addEventListener("click", el.$_pstyleclass_clicklistener);
    },
    unbind: function unbind(el) {
      if (el.$_pstyleclass_clicklistener) {
        el.removeEventListener("click", el.$_pstyleclass_clicklistener);
        el.$_pstyleclass_clicklistener = null;
      }
      this.unbindDocumentListener(el);
    },
    enter: function enter(target, el, binding) {
      if (binding.value.enterActiveClass) {
        if (!target.$_pstyleclass_animating) {
          target.$_pstyleclass_animating = true;
          if (binding.value.enterActiveClass === "slidedown") {
            target.style.height = "0px";
            DomHandler.removeClass(target, "hidden");
            target.style.maxHeight = target.scrollHeight + "px";
            DomHandler.addClass(target, "hidden");
            target.style.height = "";
          }
          DomHandler.addClass(target, binding.value.enterActiveClass);
          if (binding.value.enterClass) {
            DomHandler.removeClass(target, binding.value.enterClass);
          }
          if (binding.value.enterFromClass) {
            DomHandler.removeClass(target, binding.value.enterFromClass);
          }
          target.$p_styleclass_enterlistener = function() {
            DomHandler.removeClass(target, binding.value.enterActiveClass);
            if (binding.value.enterToClass) {
              DomHandler.addClass(target, binding.value.enterToClass);
            }
            target.removeEventListener("animationend", target.$p_styleclass_enterlistener);
            if (binding.value.enterActiveClass === "slidedown") {
              target.style.maxHeight = "";
            }
            target.$_pstyleclass_animating = false;
          };
          target.addEventListener("animationend", target.$p_styleclass_enterlistener);
        }
      } else {
        if (binding.value.enterClass) {
          DomHandler.removeClass(target, binding.value.enterClass);
        }
        if (binding.value.enterFromClass) {
          DomHandler.removeClass(target, binding.value.enterFromClass);
        }
        if (binding.value.enterToClass) {
          DomHandler.addClass(target, binding.value.enterToClass);
        }
      }
      if (binding.value.hideOnOutsideClick) {
        this.bindDocumentListener(target, el, binding);
      }
    },
    leave: function leave(target, binding) {
      if (binding.value.leaveActiveClass) {
        if (!target.$_pstyleclass_animating) {
          target.$_pstyleclass_animating = true;
          DomHandler.addClass(target, binding.value.leaveActiveClass);
          if (binding.value.leaveClass) {
            DomHandler.removeClass(target, binding.value.leaveClass);
          }
          if (binding.value.leaveFromClass) {
            DomHandler.removeClass(target, binding.value.leaveFromClass);
          }
          target.$p_styleclass_leavelistener = function() {
            DomHandler.removeClass(target, binding.value.leaveActiveClass);
            if (binding.value.leaveToClass) {
              DomHandler.addClass(target, binding.value.leaveToClass);
            }
            target.removeEventListener("animationend", target.$p_styleclass_leavelistener);
            target.$_pstyleclass_animating = false;
          };
          target.addEventListener("animationend", target.$p_styleclass_leavelistener);
        }
      } else {
        if (binding.value.leaveClass) {
          DomHandler.removeClass(target, binding.value.leaveClass);
        }
        if (binding.value.leaveFromClass) {
          DomHandler.removeClass(target, binding.value.leaveFromClass);
        }
        if (binding.value.leaveToClass) {
          DomHandler.addClass(target, binding.value.leaveToClass);
        }
      }
      if (binding.value.hideOnOutsideClick) {
        this.unbindDocumentListener(target);
      }
    },
    resolveTarget: function resolveTarget(el, binding) {
      switch (binding.value.selector) {
        case "@next":
          return el.nextElementSibling;
        case "@prev":
          return el.previousElementSibling;
        case "@parent":
          return el.parentElement;
        case "@grandparent":
          return el.parentElement.parentElement;
        default:
          return (void 0).querySelector(binding.value.selector);
      }
    },
    bindDocumentListener: function bindDocumentListener(target, el, binding) {
      var _this2 = this;
      if (!target.$p_styleclass_documentlistener) {
        target.$p_styleclass_documentlistener = function(event) {
          if (!_this2.isVisible(target) || getComputedStyle(target).getPropertyValue("position") === "static") {
            _this2.unbindDocumentListener(target);
          } else if (_this2.isOutsideClick(event, target, el)) {
            _this2.leave(target, binding);
          }
        };
        target.ownerDocument.addEventListener("click", target.$p_styleclass_documentlistener);
      }
    },
    unbindDocumentListener: function unbindDocumentListener(target) {
      if (target.$p_styleclass_documentlistener) {
        target.ownerDocument.removeEventListener("click", target.$p_styleclass_documentlistener);
        target.$p_styleclass_documentlistener = null;
      }
    },
    isVisible: function isVisible2(target) {
      return target.offsetParent !== null;
    },
    isOutsideClick: function isOutsideClick(event, target, el) {
      return !el.isSameNode(event.target) && !el.contains(event.target) && !target.contains(event.target);
    }
  }
});
var FocusTrapStyle = {};
var BaseFocusTrap = BaseDirective.extend({
  style: FocusTrapStyle
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : String(i);
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var FocusTrap = BaseFocusTrap.extend("focustrap", {
  mounted: function mounted4(el, binding) {
    var _ref = binding.value || {}, disabled = _ref.disabled;
    if (!disabled) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoElementFocus(el, binding);
    }
    el.setAttribute("data-pd-focustrap", true);
    this.$el = el;
  },
  updated: function updated3(el, binding) {
    var _ref2 = binding.value || {}, disabled = _ref2.disabled;
    disabled && this.unbind(el);
  },
  unmounted: function unmounted4(el) {
    this.unbind(el);
  },
  methods: {
    getComputedSelector: function getComputedSelector(selector) {
      return ':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(selector !== null && selector !== void 0 ? selector : "");
    },
    bind: function bind2(el, binding) {
      var _this = this;
      var _ref3 = binding.value || {}, onFocusIn = _ref3.onFocusIn, onFocusOut = _ref3.onFocusOut;
      el.$_pfocustrap_mutationobserver = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
          if (mutation.type === "childList" && !el.contains((void 0).activeElement)) {
            var findNextFocusableElement = function findNextFocusableElement2(_el) {
              var focusableElement = DomHandler.isFocusableElement(_el) ? DomHandler.isFocusableElement(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : DomHandler.getFirstFocusableElement(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : DomHandler.getFirstFocusableElement(_el);
              return ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && findNextFocusableElement2(_el.nextSibling);
            };
            DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
          }
        });
      });
      el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_mutationobserver.observe(el, {
        childList: true
      });
      el.$_pfocustrap_focusinlistener = function(event) {
        return onFocusIn && onFocusIn(event);
      };
      el.$_pfocustrap_focusoutlistener = function(event) {
        return onFocusOut && onFocusOut(event);
      };
      el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
      el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
    },
    unbind: function unbind2(el) {
      el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
      el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    },
    autoFocus: function autoFocus(options) {
      this.autoElementFocus(this.$el, {
        value: _objectSpread$1(_objectSpread$1({}, options), {}, {
          autoFocus: true
        })
      });
    },
    autoElementFocus: function autoElementFocus(el, binding) {
      var _ref4 = binding.value || {}, _ref4$autoFocusSelect = _ref4.autoFocusSelector, autoFocusSelector = _ref4$autoFocusSelect === void 0 ? "" : _ref4$autoFocusSelect, _ref4$firstFocusableS = _ref4.firstFocusableSelector, firstFocusableSelector = _ref4$firstFocusableS === void 0 ? "" : _ref4$firstFocusableS, _ref4$autoFocus = _ref4.autoFocus, autoFocus2 = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
      var focusableElement = DomHandler.getFirstFocusableElement(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
      autoFocus2 && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(el, this.getComputedSelector(firstFocusableSelector)));
      DomHandler.focus(focusableElement);
    },
    onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
      var _this$$el;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      DomHandler.focus(focusableElement);
    },
    onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
      var _this$$el2;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? DomHandler.getLastFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      DomHandler.focus(focusableElement);
    },
    createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
      var _this2 = this;
      var _ref5 = binding.value || {}, _ref5$tabIndex = _ref5.tabIndex, tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex, _ref5$firstFocusableS = _ref5.firstFocusableSelector, firstFocusableSelector = _ref5$firstFocusableS === void 0 ? "" : _ref5$firstFocusableS, _ref5$lastFocusableSe = _ref5.lastFocusableSelector, lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? "" : _ref5$lastFocusableSe;
      var createFocusableElement = function createFocusableElement2(onFocus2) {
        return DomHandler.createElement("span", {
          "class": "p-hidden-accessible p-hidden-focusable",
          tabIndex,
          role: "presentation",
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus2 === null || onFocus2 === void 0 ? void 0 : onFocus2.bind(_this2)
        });
      };
      var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
      var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
      firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
      firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
      firstFocusableElement.setAttribute("data-pc-section", "firstfocusableelement");
      lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
      lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
      lastFocusableElement.setAttribute("data-pc-section", "lastfocusableelement");
      el.prepend(firstFocusableElement);
      el.append(lastFocusableElement);
    }
  }
});
var BaseAnimateOnScroll = BaseDirective.extend({});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var AnimateOnScroll = BaseAnimateOnScroll.extend("animateonscroll", {
  created: function created() {
    this.$value = this.$value || {};
    this.$el.style.opacity = this.$value.enterClass ? "0" : "";
  },
  mounted: function mounted5() {
    this.$el.setAttribute("data-pd-animateonscroll", true);
    this.bindIntersectionObserver();
  },
  unmounted: function unmounted5() {
    this.unbindAnimationEvents();
    this.unbindIntersectionObserver();
  },
  observer: void 0,
  resetObserver: void 0,
  isObserverActive: false,
  animationState: void 0,
  animationEndListener: void 0,
  methods: {
    bindAnimationEvents: function bindAnimationEvents() {
      var _this = this;
      if (!this.animationEndListener) {
        this.animationEndListener = function() {
          DomHandler.removeMultipleClasses(_this.$el, [_this.$value.enterClass, _this.$value.leaveClass]);
          !_this.$modifiers.once && _this.resetObserver.observe(_this.$el);
          _this.unbindAnimationEvents();
        };
        this.$el.addEventListener("animationend", this.animationEndListener);
      }
    },
    bindIntersectionObserver: function bindIntersectionObserver() {
      var _this2 = this;
      var _this$$value = this.$value, root = _this$$value.root, rootMargin = _this$$value.rootMargin, _this$$value$threshol = _this$$value.threshold, threshold = _this$$value$threshol === void 0 ? 0.5 : _this$$value$threshol;
      var options = {
        root,
        rootMargin,
        threshold
      };
      this.observer = new IntersectionObserver(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), entry2 = _ref2[0];
        if (_this2.isObserverActive) {
          if (entry2.boundingClientRect.top > 0) {
            entry2.isIntersecting ? _this2.enter() : _this2.leave();
          }
        } else if (entry2.isIntersecting) {
          _this2.enter();
        }
        _this2.isObserverActive = true;
      }, options);
      setTimeout(function() {
        return _this2.observer.observe(_this2.$el);
      }, 0);
      this.resetObserver = new IntersectionObserver(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1), entry2 = _ref4[0];
        if (entry2.boundingClientRect.top > 0 && !entry2.isIntersecting) {
          _this2.$el.style.opacity = _this2.$value.enterClass ? "0" : "";
          DomHandler.removeMultipleClasses(_this2.$el, [_this2.$value.enterClass, _this2.$value.leaveClass]);
          _this2.resetObserver.unobserve(_this2.$el);
        }
        _this2.animationState = void 0;
      }, _objectSpread(_objectSpread({}, options), {}, {
        threshold: 0
      }));
    },
    enter: function enter2() {
      if (this.animationState !== "enter" && this.$value.enterClass) {
        this.$el.style.opacity = "";
        DomHandler.removeMultipleClasses(this.$el, this.$value.leaveClass);
        DomHandler.addMultipleClasses(this.$el, this.$value.enterClass);
        this.$modifiers.once && this.unbindIntersectionObserver(this.$el);
        this.bindAnimationEvents();
        this.animationState = "enter";
      }
    },
    leave: function leave2() {
      if (this.animationState !== "leave" && this.$value.leaveClass) {
        this.$el.style.opacity = this.$value.enterClass ? "0" : "";
        DomHandler.removeMultipleClasses(this.$el, this.$value.enterClass);
        DomHandler.addMultipleClasses(this.$el, this.$value.leaveClass);
        this.bindAnimationEvents();
        this.animationState = "leave";
      }
    },
    unbindAnimationEvents: function unbindAnimationEvents() {
      if (this.animationEndListener) {
        this.$el.removeEventListener("animationend", this.animationEndListener);
        this.animationEndListener = void 0;
      }
    },
    unbindIntersectionObserver: function unbindIntersectionObserver() {
      var _this$observer, _this$resetObserver;
      (_this$observer = this.observer) === null || _this$observer === void 0 || _this$observer.unobserve(this.$el);
      (_this$resetObserver = this.resetObserver) === null || _this$resetObserver === void 0 || _this$resetObserver.unobserve(this.$el);
      this.isObserverActive = false;
    }
  }
});
const accordion = {
  accordiontab: {
    root: {
      class: "mb-1"
    },
    header: ({ props }) => ({
      class: [
        // State
        { "select-none pointer-events-none cursor-default opacity-60": props == null ? void 0 : props.disabled }
      ]
    }),
    headerAction: ({ context }) => ({
      class: [
        //Font
        "font-bold",
        "leading-none",
        // Alignments
        "flex items-center",
        "relative",
        // Sizing
        "p-5",
        // Shape
        "rounded-t-md",
        { "rounded-br-md rounded-bl-md": !context.active, "rounded-br-0 rounded-bl-0": context.active },
        // Color
        "border border-surface-200 dark:border-surface-700",
        "bg-surface-50 dark:bg-surface-800",
        "text-surface-600 dark:text-surface-0/80",
        { "text-surface-900": context.active },
        // Transition
        "transition duration-200 ease-in-out",
        "transition-shadow duration-200",
        // States
        "hover:bg-surface-100 dark:hover:bg-surface-700/40",
        "hover:text-surface-900",
        "focus:outline-none focus:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 ring-inset dark:focus-visible:ring-primary-300/50",
        // Focus
        // Misc
        "cursor-pointer no-underline select-none"
      ]
    }),
    headerIcon: {
      class: "inline-block mr-2"
    },
    headerTitle: {
      class: "leading-none"
    },
    content: {
      class: [
        // Spacing
        "p-5",
        //Shape
        "rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg",
        "border-t-0",
        // Color
        "bg-surface-0 dark:bg-surface-800",
        "border border-surface-200 dark:border-surface-700",
        "text-surface-700 dark:text-surface-0/80"
      ]
    },
    transition: {
      enterFromClass: "max-h-0",
      enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0"
    }
  }
};
const autocomplete = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flex
      "inline-flex",
      // Size
      { "w-full": props.multiple },
      // Color
      "text-surface-900 dark:text-surface-0",
      //States
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  container: ({ props, state }) => ({
    class: [
      // Font
      "font-sans text-base leading-none",
      // Flex
      "flex items-center flex-wrap",
      "gap-2",
      // Spacing
      "m-0 list-none",
      "px-3 py-1.5",
      // Size
      "w-full",
      "min-h-[2.877rem]",
      // Shape
      "appearance-none rounded-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // States
      "hover:border-primary-500 dark:hover:border-primary-400",
      "focus:outline-none focus:outline-offset-0",
      { "ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
      { "ring ring-primary-400/50 dark:ring-primary-300/50": state.hovered },
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-text overflow-hidden"
    ]
  }),
  inputtoken: {
    class: ["py-1.5 px-0", "inline-flex flex-auto"]
  },
  input: ({ props }) => ({
    class: [
      // Font
      "font-sans text-base leading-none",
      // Shape
      "appearance-none rounded-md",
      { "rounded-tr-none rounded-br-none": props.dropdown },
      { "outline-none shadow-none rounded-none": props.multiple },
      // Size
      { "w-full": props.multiple },
      // Spacing
      "m-0",
      { "p-3": !props.multiple, "p-0": props.multiple },
      // Colors
      "text-surface-700 dark:text-white/80",
      {
        "bg-surface-0 dark:bg-surface-900": !props.multiple,
        "border border-surface-300 dark:border-surface-700": !props.multiple,
        "border-0 bg-transparent": props.multiple
      },
      // States
      { "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !props.multiple },
      // Transition
      "transition-colors duration-200"
    ]
  }),
  token: {
    class: [
      // Flex
      "inline-flex items-center",
      // Spacings
      "py-1.5 px-3",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "bg-surface-200 dark:bg-surface-700",
      "text-surface-700 dark:text-white/70",
      // Misc
      "cursor-default"
    ]
  },
  label: {
    class: "leading-5"
  },
  removeTokenIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  },
  dropdownbutton: {
    root: {
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom",
        // Shape
        "rounded-r-md",
        // Size
        "px-4 py-3 leading-none",
        // Colors
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50"
      ]
    }
  },
  loadingicon: {
    class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[0.5rem] -mt-2 animate-spin"]
  },
  panel: {
    class: [
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-white/80",
      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",
      // Size
      "max-h-[200px] overflow-auto"
    ]
  },
  list: {
    class: "py-3 px-0 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      "relative",
      // Font
      "font-normal text-base leading-none",
      // Spacing
      "m-0 px-5 py-3",
      // Shape
      "border-0 rounded-none",
      // Colors
      {
        "text-surface-700 dark:text-white/80": !context.focused && !context.selected,
        "bg-surface-200 dark:bg-surface-600/60": context.focused && !context.selected,
        "text-surface-700 dark:text-white/80": context.focused && !context.selected,
        "text-primary-700 dark:text-white/80": context.focused && context.selected,
        "bg-primary-100 dark:bg-primary-400": context.focused && context.selected,
        "text-primary-700 dark:text-white/80": !context.focused && context.selected,
        "bg-primary-50 dark:bg-primary-300": !context.focused && context.selected
      },
      //States
      { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
      { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
      // Transition
      "transition-shadow duration-200",
      // Misc
      "cursor-pointer overflow-hidden whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      "font-bold",
      // Spacing
      "m-0 p-3",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-800 dark:text-white/80",
      // Misc
      "cursor-auto"
    ]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-3 px-5",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const avatar = {
  root: ({ props, parent }) => {
    var _a, _b, _c;
    return {
      class: [
        // Font
        {
          "text-xl": props.size == "large",
          "text-2xl": props.size == "xlarge"
        },
        // Alignments
        "inline-flex items-center justify-center",
        "relative",
        // Sizes
        {
          "h-8 w-8": props.size == null || props.size == "normal",
          "w-12 h-12": props.size == "large",
          "w-16 h-16": props.size == "xlarge"
        },
        { "-ml-4": ((_a = parent.instance.$style) == null ? void 0 : _a.name) == "avatargroup" },
        // Shapes
        {
          "rounded-lg": props.shape == "square",
          "rounded-full": props.shape == "circle"
        },
        { "border-2": ((_b = parent.instance.$style) == null ? void 0 : _b.name) == "avatargroup" },
        // Colors
        "bg-surface-300 dark:bg-surface-700",
        { "border-white dark:border-surface-800": ((_c = parent.instance.$style) == null ? void 0 : _c.name) == "avatargroup" }
      ]
    };
  },
  image: {
    class: "h-full w-full rounded-full"
  }
};
const avatargroup = {
  root: {
    class: "flex items-center"
  }
};
const badge = {
  root: ({ props }) => ({
    class: [
      // Font
      "font-bold",
      {
        "text-xs leading-[1rem]": props.size == "small",
        "text-xs leading-[1.5rem]": props.size == null,
        "text-lg leading-[2.25rem]": props.size == "large",
        "text-2xl leading-[3rem]": props.size == "xlarge"
      },
      // Alignment
      "text-center inline-block",
      // Size
      "p-0 px-1",
      {
        "min-w-[1rem] h-[1rem]": props.size == "small",
        "min-w-[1.5rem] h-[1.5rem]": props.size == null,
        "min-w-[2.25rem] h-[2.25rem]": props.size == "large",
        "min-w-[3rem] h-[3rem]": props.size == "xlarge"
      },
      // Shape
      {
        "rounded-full": props.value.length == 1,
        "rounded-[0.71rem]": props.value.length !== 1
      },
      // Color
      "text-white dark:text-surface-900",
      {
        "bg-primary-500 dark:bg-primary-400": props.severity == null || props.severity == "primary",
        "bg-surface-500 dark:bg-surface-400": props.severity == "secondary",
        "bg-green-500 dark:bg-green-400": props.severity == "success",
        "bg-blue-500 dark:bg-blue-400": props.severity == "info",
        "bg-orange-500 dark:bg-orange-400": props.severity == "warning",
        "bg-purple-500 dark:bg-purple-400": props.severity == "help",
        "bg-red-500 dark:bg-red-400": props.severity == "danger"
      }
    ]
  })
};
const badgedirective = {
  root: ({ context }) => ({
    class: [
      // Font
      "font-bold font-sans",
      "text-xs leading-5",
      // Alignment
      "flex items-center justify-center",
      "text-center",
      // Position
      "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-top-right",
      // Size
      "m-0",
      {
        "p-0": context.nogutter || context.dot,
        "px-2": !context.nogutter && !context.dot,
        "min-w-[0.5rem] w-2 h-2": context.dot,
        "min-w-[1.5rem] h-6": !context.dot
      },
      // Shape
      {
        "rounded-full": context.nogutter || context.dot,
        "rounded-[10px]": !context.nogutter && !context.dot
      },
      // Color
      "text-white dark:text-surface-900",
      {
        "bg-primary-500 dark:bg-primary-400": !context.info && !context.success && !context.warning && !context.danger && !context.help && !context.secondary,
        "bg-surface-500 dark:bg-surface-400": context.secondary,
        "bg-green-500 dark:bg-green-400": context.success,
        "bg-blue-500 dark:bg-blue-400": context.info,
        "bg-orange-500 dark:bg-orange-400": context.warning,
        "bg-purple-500 dark:bg-purple-400": context.help,
        "bg-red-500 dark:bg-red-400": context.danger
      }
    ]
  })
};
const breadcrumb = {
  root: {
    class: [
      // Shape
      "rounded-md",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-700",
      "border border-surface-200 dark:border-surface-700",
      // Misc
      "overflow-x-auto"
    ]
  },
  menu: {
    class: [
      // Flex & Alignment
      "flex items-center flex-nowrap",
      // Spacing
      "m-0 p-0 list-none leading-none"
    ]
  },
  action: {
    class: [
      // Flex & Alignment
      "flex items-center",
      // Shape
      "rounded-md",
      // Color
      "text-surface-600 dark:text-white/70",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      // Transitions
      "transition-shadow duration-200",
      // Misc
      "text-decoration-none"
    ]
  },
  icon: {
    class: "text-surface-600 dark:text-white/70"
  },
  separator: {
    class: [
      // Flex & Alignment
      "flex items-center",
      // Spacing
      " mx-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  }
};
const button = {
  root: ({ props, context, parent }) => ({
    class: [
      "relative",
      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",
      // Sizes & Spacing
      "leading-[normal]",
      {
        "px-4 py-3": props.size === null && props.label !== null,
        "text-sm py-2 px-3": props.size === "small",
        "text-xl py-3 px-4": props.size === "large"
      },
      {
        "w-12 p-0 py-3": props.label == null
      },
      // Shapes
      { "shadow-lg": props.raised },
      { "rounded-lg": !props.rounded, "rounded-full": props.rounded },
      {
        "rounded-none first:rounded-l-md last:rounded-r-md": parent.instance.$name == "InputGroup"
      },
      // Link Button
      { "text-primary-600 bg-transparent border-transparent": props.link },
      // Plain Button
      {
        "text-white bg-gray-500 border border-gray-500": props.plain && !props.outlined && !props.text
      },
      // Plain Text Button
      { "text-surface-500": props.plain && props.text },
      // Plain Outlined Button
      {
        "text-surface-500 border border-gray-500": props.plain && props.outlined
      },
      // Text Button
      { "bg-transparent border-transparent": props.text && !props.plain },
      // Outlined Button
      { "bg-transparent border": props.outlined && !props.plain },
      // --- Severity Buttons ---
      // Primary Button
      {
        "text-white dark:text-surface-900": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        "bg-primaryBlue dark:bg-primary-400": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        "border primaryBlue dark:border-primary-400": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      // Primary Text Button
      {
        "text-primary-500 dark:text-primary-400": props.text && props.severity === null && !props.plain
      },
      // Primary Outlined Button
      {
        "text-primary-500 border border-primary-500 hover:bg-primary-300/20": props.outlined && props.severity === null && !props.plain
      },
      // Secondary Button
      {
        "text-white dark:text-surface-900": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
        "bg-surface-500 dark:bg-surface-400": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
        "border border-surface-500 dark:border-surface-400": props.severity === "secondary" && !props.text && !props.outlined && !props.plain
      },
      // Secondary Text Button
      {
        "text-surface-500 dark:text-surface-300": props.text && props.severity === "secondary" && !props.plain
      },
      // Secondary Outlined Button
      {
        "text-surface-500 dark:text-surface-300 border border-surface-500 hover:bg-surface-300/20": props.outlined && props.severity === "secondary" && !props.plain
      },
      // Success Button
      {
        "text-white dark:text-green-900": props.severity === "success" && !props.text && !props.outlined && !props.plain,
        "bg-[#43AF79] dark:bg-300/20": props.severity === "success" && !props.text && !props.outlined && !props.plain,
        "border border-[#43AF79] dark:border-green-400": props.severity === "success" && !props.text && !props.outlined && !props.plain
      },
      // Success Text Button
      {
        "text-[#43AF79] dark:text-green-400": props.text && props.severity === "success" && !props.plain
      },
      // Success Outlined Button
      {
        "text-[#43AF79] border border-[#43AF79] hover:bg-green-200/20": props.outlined && props.severity === "success" && !props.plain
      },
      // Info Button
      {
        "text-white dark:text-surface-900": props.severity === "info" && !props.text && !props.outlined && !props.plain,
        "bg-blue-500 dark:bg-blue-400": props.severity === "info" && !props.text && !props.outlined && !props.plain,
        "border border-blue-500 dark:border-blue-400": props.severity === "info" && !props.text && !props.outlined && !props.plain
      },
      // Info Text Button
      {
        "text-blue-500 dark:text-blue-400": props.text && props.severity === "info" && !props.plain
      },
      // Info Outlined Button
      {
        "text-blue-500 border border-blue-500 hover:bg-blue-300/20 ": props.outlined && props.severity === "info" && !props.plain
      },
      // Warning Button
      {
        "text-white dark:text-surface-900": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
        "bg-[#FCB603] dark:bg-orange-400": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
        "border border-[#FCB603] dark:border-orange-400": props.severity === "warning" && !props.text && !props.outlined && !props.plain
      },
      // Warning Text Button
      {
        "text-[#FCB603] dark:text-orange-400": props.text && props.severity === "warning" && !props.plain
      },
      // Warning Outlined Button
      {
        "text-[#FCB603] border border-[#FCB603] hover:bg-orange-200/20": props.outlined && props.severity === "warning" && !props.plain
      },
      // Help Button
      {
        "text-white dark:text-surface-900": props.severity === "help" && !props.text && !props.outlined && !props.plain,
        "bg-purple-500 dark:bg-purple-400": props.severity === "help" && !props.text && !props.outlined && !props.plain,
        "border border-purple-500 dark:border-purple-400": props.severity === "help" && !props.text && !props.outlined && !props.plain
      },
      // Help Text Button
      {
        "text-purple-500 dark:text-purple-400": props.text && props.severity === "help" && !props.plain
      },
      // Help Outlined Button
      {
        "text-purple-500 border border-purple-500 hover:bg-purple-300/20": props.outlined && props.severity === "help" && !props.plain
      },
      // Danger Button
      {
        "text-white dark:text-surface-900": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
        "bg-red-500 dark:bg-red-400": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
        "border border-red-500 dark:border-red-400": props.severity === "danger" && !props.text && !props.outlined && !props.plain
      },
      // Danger Text Button
      {
        "text-red-500 dark:text-red-400": props.text && props.severity === "danger" && !props.plain
      },
      // Danger Outlined Button
      {
        "text-red-500 border border-red-500 hover:bg-red-300/20": props.outlined && props.severity === "danger" && !props.plain
      },
      // --- Severity Button States ---
      "focus:outline-none focus:outline-offset-0 ",
      // Link
      {
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": props.link
      },
      // Plain
      {
        "hover:bg-gray-600 hover:border-gray-600": props.plain && !props.outlined && !props.text
      },
      // Text & Outlined Button
      {
        "hover:bg-surface-300/20": props.plain && (props.text || props.outlined)
      },
      // Primary
      {
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      // Secondary
      {
        "hover:bg-surface-600 dark:hover:bg-surface-300 hover:border-surface-600 dark:hover:border-surface-300": props.severity === "secondary" && !props.text && !props.outlined && !props.plain
      },
      // Text & Outlined Button
      {
        "hover:bg-surface-300/20": (props.text || props.outlined) && props.severity === "secondary" && !props.plain
      },
      // Success
      {
        "hover:bg-green-600 dark:hover:bg-green-300 hover:border-green-600 dark:hover:border-green-300": props.severity === "success" && !props.text && !props.outlined && !props.plain
      },
      // Text & Outlined Button
      {
        "hover:bg-green-300/20": (props.text || props.outlined) && props.severity === "success" && !props.plain
      },
      // Info
      {
        "hover:bg-blue-600 dark:hover:bg-blue-300 hover:border-blue-600 dark:hover:border-blue-300": props.severity === "info" && !props.text && !props.outlined && !props.plain
      },
      // Text & Outlined Button
      {
        "hover:bg-blue-300/20": (props.text || props.outlined) && props.severity === "info" && !props.plain
      },
      // Warning
      {
        "hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300": props.severity === "warning" && !props.text && !props.outlined && !props.plain
      },
      // {
      //   "focus:ring-orange-400/50 dark:focus:ring-orange-300/50":
      //     props.severity === "warning",
      // },
      // Text & Outlined Button
      {
        "hover:bg-orange-300/20": (props.text || props.outlined) && props.severity === "warning" && !props.plain
      },
      // Help
      {
        "hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300": props.severity === "help" && !props.text && !props.outlined && !props.plain
      },
      // Text & Outlined Button
      {
        "hover:bg-purple-300/20": (props.text || props.outlined) && props.severity === "help" && !props.plain
      },
      // Danger
      {
        "hover:bg-red-600 dark:hover:bg-red-300 hover:border-red-600 dark:hover:border-red-300": props.severity === "danger" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-red-400/50 dark:focus:ring-red-300/50": props.severity === "danger"
      },
      // Text & Outlined Button
      {
        "hover:bg-red-300/20": (props.text || props.outlined) && props.severity === "danger" && !props.plain
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": context.disabled },
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer overflow-hidden select-none"
    ]
  }),
  label: ({ props }) => ({
    class: [
      "duration-200",
      "font-bold",
      {
        "hover:underline": props.link
      },
      { "flex-1": props.label !== null, "invisible w-0": props.label == null }
    ]
  }),
  icon: ({ props }) => ({
    class: [
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null
      }
    ]
  }),
  loadingicon: ({ props }) => ({
    class: [
      "h-4 w-4",
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null
      },
      "animate-spin"
    ]
  }),
  badge: ({ props }) => ({
    class: [
      {
        "ml-2 w-4 h-4 leading-none flex items-center justify-center": props.badge
      }
    ]
  })
};
const calendar = {
  root: ({ props }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "max-w-full",
      "relative",
      // Misc
      { "opacity-60 select-none pointer-events-none cursor-default": props.disabled }
    ]
  }),
  input: ({ props }) => ({
    class: [
      // Font
      "font-sans leading-none",
      // Colors
      "text-surface-600 dark:text-surface-200",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-600",
      // Spacing
      "m-0 p-3",
      // Shape
      "appearance-none",
      { "rounded-md": !props.showIcon || props.iconDisplay == "input" },
      { "rounded-l-md  flex-1 pr-9": props.showIcon && props.iconDisplay !== "input" },
      { "rounded-md flex-1 pr-9": props.showIcon && props.iconDisplay === "input" },
      // Transitions
      "transition-colors",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-400",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50"
    ]
  }),
  inputicon: {
    class: ["absolute top-[50%] -mt-2", "text-surface-600 dark:text-surface-200", "right-[.75rem]"]
  },
  dropdownbutton: {
    root: {
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom",
        // Shape
        "rounded-r-md",
        // Size
        "px-4 py-3 leading-none",
        // Colors
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50"
      ]
    }
  },
  panel: ({ props }) => ({
    class: [
      // Display & Position
      {
        absolute: !props.inline,
        "inline-block": props.inline
      },
      // Size
      { "w-auto p-2 ": !props.inline },
      { "min-w-[80vw] w-auto p-2 ": props.touchUI },
      { "p-2 min-w-full": props.inline },
      // Shape
      "border rounded-lg",
      {
        "shadow-md": !props.inline
      },
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      //misc
      { "overflow-x-auto": props.inline }
    ]
  }),
  datepickerMask: {
    class: ["fixed top-0 left-0 w-full h-full", "flex items-center justify-center", "bg-black bg-opacity-90"]
  },
  header: {
    class: [
      //Font
      "font-semibold",
      // Flexbox and Alignment
      "flex items-center justify-between",
      // Spacing
      "p-2",
      "m-0",
      // Shape
      "border-b",
      "rounded-t-md",
      // Colors
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700"
    ]
  },
  previousbutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-8 h-8",
      "p-0 m-0",
      // Shape
      "rounded-full",
      // Colors
      "text-surface-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      // Transitions
      "transition-colors duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  },
  title: {
    class: [
      // Text
      "leading-8",
      "mx-auto my-0"
    ]
  },
  monthTitle: {
    class: [
      // Font
      "text-base leading-5",
      "font-semibold",
      // Colors
      "text-surface-700 dark:text-white/80",
      // Transitions
      "transition duration-200",
      // Spacing
      "p-2",
      "m-0 mr-2",
      // States
      "hover:text-primary-500 dark:hover:text-primary-400",
      // Misc
      "cursor-pointer"
    ]
  },
  yearTitle: {
    class: [
      // Font
      "text-base leading-5",
      "font-semibold",
      // Colors
      "text-surface-700 dark:text-white/80",
      // Transitions
      "transition duration-200",
      // Spacing
      "p-2",
      "m-0",
      // States
      "hover:text-primary-500 dark:hover:text-primary-400",
      // Misc
      "cursor-pointer"
    ]
  },
  nextbutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-8 h-8",
      "p-0 m-0",
      // Shape
      "rounded-full",
      // Colors
      "text-surface-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      // Transitions
      "transition-colors duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  },
  table: {
    class: [
      // Font
      "text-base leading-none",
      // Size & Shape
      "border-collapse",
      "w-full",
      // Spacing
      "m-0 my-2"
    ]
  },
  tableheadercell: {
    class: [
      // Spacing
      "p-0 md:p-2"
    ]
  },
  weekheader: {
    class: ["leading-5", "text-surface-600 dark:text-white/70", "opacity-60 cursor-default"]
  },
  weeknumber: {
    class: ["text-surface-600 dark:text-white/70", "opacity-60 cursor-default"]
  },
  weekday: {
    class: [
      // Colors
      "text-surface-500 dark:text-white/60"
    ]
  },
  day: {
    class: [
      // Spacing
      "p-0 md:p-2"
    ]
  },
  weeklabelcontainer: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",
      // Colors
      {
        "text-surface-600 dark:text-white/70 bg-transparent": !context.selected && !context.disabled,
        "text-primary-700 bg-primary-100": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-surface-100 dark:hover:bg-surface-800/80": !context.selected && !context.disabled,
        "hover:bg-primary-200": context.selected && !context.disabled
      },
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled
      }
    ]
  }),
  daylabel: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",
      // Colors
      {
        "text-primary-500 dark:text-primary-400": context.date.today,
        "text-surface-600 dark:text-white/70 bg-transparent": !context.selected && !context.disabled && !context.date.today,
        "text-primary-700 bg-primary-100 dark:text-surface-0 dark:bg-primary-300/40": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.selected && !context.disabled,
        "hover:bg-primary-200 dark:hover:bg-primary-200/40": context.selected && !context.disabled
      },
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled
      }
    ]
  }),
  monthpicker: {
    class: [
      // Spacing
      "my-2"
    ]
  },
  month: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "p-2",
      // Shape
      "rounded-md",
      // Colors
      {
        "text-surface-600 dark:text-white/70 bg-transparent": !context.selected && !context.disabled,
        "text-primary-700 bg-primary-100 dark:text-surface-0 dark:bg-primary-300/40": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.selected && !context.disabled,
        "hover:bg-primary-200 dark:hover:bg-primary-200/40": context.selected && !context.disabled
      },
      // Misc
      "cursor-pointer"
    ]
  }),
  yearpicker: {
    class: [
      // Spacing
      "my-2"
    ]
  },
  year: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "p-2",
      // Shape
      "rounded-md",
      // Colors
      {
        "text-surface-600 dark:text-white/70 bg-transparent": !context.selected && !context.disabled,
        "text-primary-700 bg-primary-100 dark:text-surface-0 dark:bg-primary-300/40": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.selected && !context.disabled,
        "hover:bg-primary-200 dark:hover:bg-primary-200/40": context.selected && !context.disabled
      },
      // Misc
      "cursor-pointer"
    ]
  }),
  timepicker: {
    class: [
      // Flexbox
      "flex",
      "justify-center items-center",
      // Borders
      "border-t-1",
      "border-solid border-surface-200",
      // Spacing
      "p-2"
    ]
  },
  separatorcontainer: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  separator: {
    class: [
      // Text
      "text-xl"
    ]
  },
  hourpicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  minutepicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  ampmpicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  incrementbutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-8 h-8",
      "p-0 m-0",
      // Shape
      "rounded-full",
      // Colors
      "text-surface-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      // Transitions
      "transition-colors duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  },
  decrementbutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-8 h-8",
      "p-0 m-0",
      // Shape
      "rounded-full",
      // Colors
      "text-surface-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      // Transitions
      "transition-colors duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  },
  groupcontainer: {
    class: [
      // Flexbox
      "flex"
    ]
  },
  group: {
    class: [
      // Flexbox and Sizing
      "flex-1",
      // Borders
      "border-l",
      "border-surface-200",
      // Spacing
      "pr-0.5",
      "pl-0.5",
      "pt-0",
      "pb-0",
      // Pseudo-Classes
      "first:pl-0",
      "first:border-l-0"
    ]
  },
  buttonbar: {
    class: [
      // Flexbox
      "flex justify-between items-center",
      // Spacing
      "py-3 px-0",
      // Shape
      "border-t border-surface-200 dark:border-surface-700"
    ]
  },
  todaybutton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",
        // Spacing
        "px-4 py-3 leading-none",
        // Shape
        "rounded-md",
        // Colors
        "bg-transparent border-transparent",
        "text-primary-500 dark:text-primary-400",
        // Transitions
        "transition-colors duration-200 ease-in-out",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-primary-300/20",
        // Misc
        "cursor-pointer"
      ]
    }
  },
  clearbutton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",
        // Spacing
        "px-4 py-3 leading-none",
        // Shape
        "rounded-md",
        // Colors
        "bg-transparent border-transparent",
        "text-primary-500 dark:text-primary-400",
        // Transitions
        "transition-colors duration-200 ease-in-out",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-primary-300/20",
        // Misc
        "cursor-pointer"
      ]
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const card = {
  root: {
    class: [
      //Shape
      "rounded-md",
      "shadow-md",
      //Color
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0"
    ]
  },
  body: {
    class: "p-5"
  },
  title: {
    class: "text-xl font-medium mb-2 text-surface-600"
  },
  subtitle: {
    class: [
      //Font
      "font-normal",
      //Spacing
      "mb-2",
      //Color
      "text-surface-600 dark:text-surface-0/60"
    ]
  },
  content: {
    class: "py-5"
    // Vertical padding.
  },
  footer: {
    class: "pt-5"
    // Top padding.
  }
};
const carousel = {
  root: {
    class: [
      // Flexbox
      "flex flex-col"
    ]
  },
  content: {
    class: [
      // Flexbox & Overflow
      "flex flex-col overflow-auto"
    ]
  },
  container: ({ props }) => ({
    class: [
      // Flexbox
      "flex",
      // Orientation
      {
        "flex-row": props.orientation !== "vertical",
        "flex-col": props.orientation == "vertical"
      }
    ]
  }),
  previousbutton: {
    class: [
      // Flexbox & Alignment
      "flex justify-center items-center self-center",
      // Sizing & Overflow
      "overflow-hidden w-8 h-8",
      // Spacing
      "mx-2",
      // Shape
      "rounded-full",
      // Border & Background
      "border-0 bg-transparent",
      // Color
      "text-surface-600",
      // Transitions
      "transition duration-200 ease-in-out"
    ]
  },
  nextbutton: {
    class: [
      // Flexbox & Alignment
      "flex justify-center items-center self-center",
      // Sizing & Overflow
      "overflow-hidden w-8 h-8",
      // Spacing
      "mx-2",
      // Shape
      "rounded-full",
      // Border & Background
      "border-0 bg-transparent",
      // Color
      "text-surface-600",
      // Transitions
      "transition duration-200 ease-in-out"
    ]
  },
  itemscontent: {
    class: [
      // Overflow & Width
      "overflow-hidden w-full"
    ]
  },
  itemscontainer: ({ props }) => ({
    class: [
      // Flexbox
      "flex",
      // Orientation & Sizing
      {
        "flex-row": props.orientation !== "vertical",
        "flex-col h-full": props.orientation == "vertical"
      }
    ]
  }),
  item: ({ props }) => ({
    class: [
      // Flexbox
      "flex shrink-0 grow",
      // Width
      {
        "w-1/3": props.orientation !== "vertical",
        "w-full": props.orientation == "vertical"
      }
    ]
  }),
  indicators: {
    class: [
      // Flexbox & Alignment
      "flex flex-row justify-center flex-wrap"
    ]
  },
  indicator: {
    class: [
      // Spacing
      "mr-2 mb-2"
    ]
  },
  indicatorbutton: ({ context }) => ({
    class: [
      // Sizing & Shape
      "w-8 h-2 rounded-0",
      // Transitions
      "transition duration-200",
      // Focus Styles
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Color & Background
      {
        "bg-surface-200 hover:bg-surface-300 dark:bg-surface-700 dark:hover:bg-surface-600": !context.highlighted,
        "bg-primary-500 hover:bg-primary-600": context.highlighted
      }
    ]
  })
};
const cascadeselect = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "w-full md:w-56",
      "rounded-md",
      // Color and Background
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // Transitions
      "transition-all",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
      // Misc
      "cursor-pointer",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
    ]
  }),
  label: ({ props }) => ({
    class: [
      //Font
      "font-sans",
      "leading-none",
      // Flex & Alignment
      " flex flex-auto",
      // Sizing and Spacing
      "w-[1%]",
      "p-3",
      //Shape
      "rounded-none",
      // Color and Background
      "bg-transparent",
      "border-0",
      { "text-surface-800 dark:text-white/80": props.modelValue, "text-surface-400 dark:text-surface-500": !props.modelValue },
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      // Transitions
      "transition",
      "duration-200",
      // States
      "focus:outline-none focus:shadow-none",
      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none"
    ]
  }),
  dropdownbutton: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      // Shape
      "border-0 dark:border",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-800 dark:text-white/80",
      "dark:border-surface-700"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "py-3 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "font-normal",
      "leading-none",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": context.focused && !context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": context.focused && context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.active,
        "hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80": context.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  content: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-3",
      "px-5",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  groupicon: {
    class: [
      // Alignment
      "ml-auto"
    ]
  },
  sublist: {
    class: [
      // Size
      "w-full",
      // Spacing
      "py-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Position
      "static sm:absolute",
      "z-10",
      // Color
      "bg-surface-0 dark:bg-surface-700"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const checkbox = {
  root: {
    class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "cursor-pointer", "select-none"]
  },
  box: ({ props, context }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-6",
      "h-6",
      // Shape
      "rounded-md",
      "border-2",
      // Colors
      {
        "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked && !props.invalid,
        "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
      },
      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },
      // States
      {
        "peer-hover:border-primary-500 dark:peer-hover:border-primary-400": !props.disabled && !context.checked && !props.invalid,
        "peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300": !props.disabled && context.checked,
        "peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20": !props.disabled,
        "cursor-default opacity-60": props.disabled
      },
      // Transitions
      "transition-colors",
      "duration-200"
    ]
  }),
  input: {
    class: ["peer", "w-full ", "h-full", "absolute", "top-0 left-0", "z-10", "p-0", "m-0", "opacity-0", "rounded-md", "outline-none", "border-2 border-surface-200 dark:border-surface-700", "appearance-none", "cursor-pointer"]
  },
  icon: {
    class: ["text-base leading-none", "w-4", "h-4", "text-white dark:text-surface-900", "transition-all", "duration-200"]
  }
};
const chip = {
  root: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "px-3",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "text-surface-700 dark:text-white/70",
      "bg-surface-200 dark:bg-surface-700"
    ]
  },
  label: {
    class: "leading-6 my-1.5 mx-0"
  },
  icon: {
    class: "leading-6 mr-2"
  },
  image: {
    class: ["w-9 h-9 -ml-3 mr-2", "rounded-full"]
  },
  removeIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  }
};
const chips = {
  root: ({ props }) => ({
    class: [
      "flex",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  container: ({ state }) => ({
    class: [
      // Font
      "font-sans text-base leading-none",
      // Flex
      "flex items-center flex-wrap gap-2",
      // Spacing
      "m-0 py-1.5 px-3",
      // Size
      "w-full",
      "min-h-[2.877rem]",
      // Shape
      "list-none",
      "rounded-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // States
      "hover:border-primary-500 dark:hover:border-primary-400",
      "focus:outline-none focus:outline-offset-0",
      { "ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
      { "ring ring-primary-400/50 dark:ring-primary-300/50": state.hovered },
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-text overflow-hidden",
      "appearance-none"
    ]
  }),
  inputtoken: {
    class: ["py-1.5 px-0", "inline-flex flex-auto"]
  },
  input: {
    class: [
      // Font
      "font-sans text-base leading-[1.2]",
      // Size
      "w-full",
      // Spacing
      "p-0 m-0",
      // Shape
      "appearance-none rounded-none",
      "border-0 outline-none",
      "shadow-none",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-transparent"
    ]
  },
  token: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "py-1.5 px-3",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "text-surface-700 dark:text-white/70",
      "bg-surface-200 dark:bg-surface-700"
    ]
  },
  label: {
    class: "leading-5"
  },
  removeTokenIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  }
};
const colorpicker = {
  root: ({ props }) => ({
    class: [
      // Display
      "inline-block",
      // Misc
      { "opacity-60 select-none pointer-events-none cursor-default": props.disabled }
    ]
  }),
  input: {
    class: [
      // Font
      "font-sans text-base ",
      // Spacing
      "m-0",
      "p-3",
      // Size & Shape
      "rounded-lg w-8 h-8",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // States
      "hover:border-primary-500 dark:hover:border-primary-400",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer"
    ]
  },
  panel: ({ props }) => ({
    class: [
      // Position & Size
      {
        "relative h-48 w-52": props.inline,
        "absolute h-48 w-52": !props.inline
      },
      // Shape
      "shadow-md border",
      // Colors
      "bg-surface-800 border-surface-900 dark:border-surface-600"
    ]
  }),
  selector: {
    class: [
      // Position
      "absolute top-2 left-2",
      // Size
      "h-44 w-40"
    ]
  },
  color: {
    class: [
      // Size
      "h-44 w-40"
    ],
    style: "background: linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)"
  },
  colorhandle: {
    class: [
      "absolute",
      // Shape
      "rounded-full border border-solid",
      // Size
      "h-3 w-3",
      // Colors
      "border-white",
      // Misc
      "cursor-pointer  opacity-85"
    ]
  },
  hue: {
    class: [
      // Position
      "absolute top-2 left-44",
      // Size
      "h-44 w-6",
      // Opacity
      "opacity-85"
    ],
    style: "background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)"
  },
  huehandle: {
    class: [
      // Position
      "absolute left-0 -ml-1 -mt-1",
      // Size
      "h-2 w-8",
      // Shape
      "border-solid border-2",
      // Misc
      "cursor-pointer opacity-85"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const confirmpopup = {
  root: {
    class: [
      // Shape
      "rounded-lg",
      "shadow-lg",
      "border-0",
      // Positioning
      "z-40 transform origin-center",
      "mt-3 absolute left-0 top-0",
      // Color
      "dark:border",
      "dark:border-surface-700",
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80",
      // Before: Arrow
      "before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-surface-0 dark:before:border-b-surface-800"
    ]
  },
  content: {
    class: "p-5 items-center flex"
  },
  icon: {
    class: "text-2xl mr-4"
  },
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-2",
      // Spacing
      "px-6",
      "pb-6",
      // Shape
      "border-t-0",
      "rounded-b-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  rejectbutton: {
    root: {
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "px-4 py-3 leading-none",
        // Shape
        "rounded-md",
        // Color
        "text-primary-500 dark:text-primary-400",
        // States
        "hover:bg-primary-300/20",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50"
      ]
    }
  },
  acceptbutton: {
    root: {
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "px-4 py-3 leading-none",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // States
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50"
      ]
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const contextmenu = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      "shadow-md",
      // Spacing
      "py-2",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-700 dark:text-white/80",
      "dark:border dark:border-surface-700"
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  menuitem: {
    class: "relative"
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-none",
      // Colors
      "text-surface-700 dark:text-white/80",
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": context.focused && !context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": context.focused && context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": !context.focused && context.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.active,
        "hover:bg-primary-400/30 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80": context.active
      }
    ]
  }),
  action: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-3",
      "px-5",
      // Color
      "text-surface-700 dark:text-white/80",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  },
  label: {
    class: ["leading-none"]
  },
  submenu: ({ props }) => ({
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "py-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-md",
      "rounded-md",
      "dark:border dark:border-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": props.level > 1 },
      // Color
      "bg-surface-0 dark:bg-surface-700"
    ]
  }),
  submenuicon: {
    class: ["ml-auto"]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-250"
  }
};
const datatable = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flex & Alignment
      { "flex flex-col": props.scrollable && props.scrollHeight === "flex" },
      // Size
      { "h-full": props.scrollable && props.scrollHeight === "flex" }
    ]
  }),
  loadingoverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",
      // Flex & Alignment
      "flex items-center justify-center",
      // Size
      "w-full h-full",
      // Color
      "bg-surface-100/40 dark:bg-surface-800/40",
      // Transition
      "transition duration-200"
    ]
  },
  loadingicon: {
    class: "w-8 h-8 animate-spin"
  },
  wrapper: ({ props }) => ({
    class: [
      { relative: props.scrollable, "flex flex-col grow": props.scrollable && props.scrollHeight === "flex" },
      // Size
      { "h-full": props.scrollable && props.scrollHeight === "flex" }
    ]
  }),
  header: ({ props }) => ({
    class: [
      "font-bold",
      // Shape
      props.showGridlines ? "border-x border-t border-b-0" : "border-y border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-50 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  }),
  table: {
    class: "w-full border-spacing-0 border-separate"
  },
  thead: ({ context }) => ({
    class: [
      {
        "bg-surface-50 top-0 z-40 sticky": context.scrollable
      }
    ]
  }),
  tbody: ({ instance, context }) => ({
    class: [
      {
        "sticky z-20": instance.frozenRow && context.scrollable
      }
    ]
  }),
  tfoot: ({ context }) => ({
    class: [
      {
        "bg-surface-50 bottom-0 z-0": context.scrollable
      }
    ]
  }),
  footer: {
    class: [
      "font-bold",
      // Shape
      "border-t-0 border-b border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-50 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  },
  column: {
    headercell: ({ context, props }) => ({
      class: [
        "font-bold",
        // Position
        { "sticky z-20 border-b": props.frozen || props.frozen === "" },
        { relative: context.resizable },
        // Alignment
        "text-left",
        // Shape
        { "first:border-l border-y border-r": context == null ? void 0 : context.showGridlines },
        "border-0 border-b border-solid",
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "p-2" : (context == null ? void 0 : context.size) === "large" ? "p-5" : "p-4",
        // Color
        (props.sortable === "" || props.sortable) && context.sorted ? "bg-primary-50 text-primary-700" : "bg-surface-50 text-surface-700",
        (props.sortable === "" || props.sortable) && context.sorted ? "dark:text-white dark:bg-primary-400/30" : "dark:text-white/80 dark:bg-surface-800",
        "border-surface-200 dark:border-surface-700 ",
        // States
        { "hover:bg-surface-100 dark:hover:bg-surface-400/30": (props.sortable === "" || props.sortable) && !(context == null ? void 0 : context.sorted) },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
        // Transition
        { "transition duration-200": props.sortable === "" || props.sortable },
        // Misc
        { "cursor-pointer": props.sortable === "" || props.sortable },
        {
          "overflow-hidden space-nowrap border-y bg-clip-padding": context.resizable
          // Resizable
        }
      ]
    }),
    headercontent: {
      class: "flex items-center"
    },
    sort: ({ context }) => ({
      class: [context.sorted ? "text-primary-500" : "text-surface-700", context.sorted ? "dark:text-primary-400" : "dark:text-white/80"]
    }),
    bodycell: ({ props, context, state, parent }) => ({
      class: [
        //Position
        { "sticky box-border border-b": parent.instance.frozenRow },
        { "sticky box-border border-b": props.frozen || props.frozen === "" },
        // Alignment
        "text-left",
        // Shape
        "border-0 border-b border-solid",
        { "first:border-l border-r border-b": context == null ? void 0 : context.showGridlines },
        { "bg-surface-0 dark:bg-surface-800": parent.instance.frozenRow || props.frozen || props.frozen === "" },
        // Spacing
        { "p-2": (context == null ? void 0 : context.size) === "small" && !state["d_editing"] },
        { "p-5": (context == null ? void 0 : context.size) === "large" && !state["d_editing"] },
        { "p-4": (context == null ? void 0 : context.size) !== "large" && (context == null ? void 0 : context.size) !== "small" && !state["d_editing"] },
        { "py-[0.6rem] px-2": state["d_editing"] },
        // Color
        "border-surface-200 dark:border-surface-700"
      ]
    }),
    footercell: ({ context }) => ({
      class: [
        // Font
        "font-bold",
        // Alignment
        "text-left",
        // Shape
        "border-0 border-b border-solid",
        { "border-x border-y": context == null ? void 0 : context.showGridlines },
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "p-2" : (context == null ? void 0 : context.size) === "large" ? "p-5" : "p-4",
        // Color
        "border-surface-200 dark:border-surface-700",
        "text-surface-700 dark:text-white/80",
        "bg-surface-50 dark:bg-surface-800"
      ]
    }),
    sorticon: ({ context }) => ({
      class: ["ml-2", context.sorted ? "text-primary-700 dark:text-white/80" : "text-surface-700 dark:text-white/70"]
    }),
    sortbadge: {
      class: [
        // Flex & Alignment
        "flex items-center justify-center align-middle",
        // Shape
        "rounded-full",
        // Size
        "w-[1.143rem] leading-[1.143rem]",
        // Spacing
        "ml-2",
        // Color
        "text-primary-700 dark:text-white",
        "bg-primary-50 dark:bg-primary-400/30"
      ]
    },
    columnfilter: {
      class: "inline-flex items-center ml-auto"
    },
    filteroverlay: {
      class: [
        // Position
        "absolute top-0 left-0",
        // Shape
        "border-0 dark:border",
        "rounded-md",
        "shadow-md",
        // Size
        "min-w-[12.5rem]",
        // Color
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-800 dark:text-white/80",
        "dark:border-surface-700"
      ]
    },
    filtermatchmodedropdown: {
      root: ({ state }) => ({
        class: [
          // Display and Position
          "flex",
          "relative",
          // Spacing
          "my-2",
          // Shape
          "w-full",
          "rounded-md",
          // Color and Background
          "bg-surface-0 dark:bg-surface-900",
          "border border-surface-300 dark:border-surface-700",
          "text-surface-800 dark:text-white/80",
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          // Transitions
          "transition-all",
          "duration-200",
          // States
          "hover:border-primary-500 dark:hover:border-primary-300",
          { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
          // Misc
          "cursor-pointer",
          "select-none"
        ]
      })
    },
    filterrowitems: {
      class: "m-0 p-0 py-3 list-none"
    },
    filterrowitem: ({ context }) => ({
      class: [
        // Font
        "font-normal",
        "leading-none",
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-3 px-5",
        // Color
        { "text-surface-700 dark:text-white/80": !(context == null ? void 0 : context.highlighted) },
        { "bg-surface-0 dark:bg-surface-800 text-surface-700 dark:text-white/80": !(context == null ? void 0 : context.highlighted) },
        { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context == null ? void 0 : context.highlighted },
        { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context == null ? void 0 : context.highlighted },
        //States
        { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !(context == null ? void 0 : context.highlighted) },
        { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": !(context == null ? void 0 : context.highlighted) },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
        // Transitions
        "transition-shadow",
        "duration-200",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    }),
    filteroperator: {
      class: [
        // Spacing
        "px-5 py-3",
        // Shape
        "border-b border-solid",
        "rounded-t-md",
        // Color
        "text-surface-700 dark:text-white/80",
        "border-surface-200 dark:border-surface-800",
        "bg-surface-0 dark:bg-surface-700"
      ]
    },
    filteroperatordropdown: {
      root: ({ state }) => ({
        class: [
          // Display and Position
          "inline-flex",
          "relative",
          // Shape
          "w-full",
          "rounded-md",
          // Color and Background
          "bg-surface-0 dark:bg-surface-900",
          "border border-surface-300 dark:border-surface-700",
          // Transitions
          "transition-all",
          "duration-200",
          // States
          "hover:border-primary-500 dark:hover:border-primary-300",
          { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
          // Misc
          "cursor-pointer",
          "select-none"
        ]
      }),
      input: ({ props }) => ({
        class: [
          //Font
          "font-sans",
          "leading-none",
          // Display
          "block",
          "flex-auto",
          // Color and Background
          "bg-transparent",
          "border-0",
          { "text-surface-800 dark:text-white/80": props.modelValue, "text-surface-400 dark:text-surface-500": !props.modelValue },
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          // Sizing and Spacing
          "w-[1%]",
          "p-3",
          //Shape
          "rounded-none",
          // Transitions
          "transition",
          "duration-200",
          // States
          "focus:outline-none focus:shadow-none",
          // Misc
          "relative",
          "cursor-pointer",
          "overflow-hidden overflow-ellipsis",
          "whitespace-nowrap",
          "appearance-none"
        ]
      }),
      trigger: {
        class: [
          // Flexbox
          "flex items-center justify-center",
          "shrink-0",
          // Color and Background
          "bg-transparent",
          "text-surface-500",
          // Size
          "w-12",
          // Shape
          "rounded-tr-md",
          "rounded-br-md"
        ]
      },
      panel: {
        class: [
          // Position
          "absolute top-0 left-0",
          // Shape
          "border-0 dark:border",
          "rounded-md",
          "shadow-md",
          // Color
          "bg-surface-0 dark:bg-surface-800",
          "text-surface-800 dark:text-white/80",
          "dark:border-surface-700"
        ]
      },
      item: ({ context }) => ({
        class: [
          // Font
          "font-normal",
          "leading-none",
          // Position
          "relative",
          // Shape
          "border-0",
          "rounded-none",
          // Spacing
          "m-0",
          "py-3 px-5",
          // Color
          { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
          { "bg-surface-50 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
          { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
          { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
          //States
          { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
          { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
          // Transitions
          "transition-shadow",
          "duration-200",
          // Misc
          "cursor-pointer",
          "overflow-hidden",
          "whitespace-nowrap"
        ]
      })
    },
    filterconstraint: {
      class: [
        // Spacing
        "py-3 px-5",
        // Shape
        "border-b border-solid",
        // Color
        "border-surface-200 dark:border-surface-700"
      ]
    },
    filteraddrule: {
      class: "py-3 px-5"
    },
    filteraddrulebutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm py-2 px-3 w-full",
          // Shape
          "rounded-md",
          "bg-transparent border-transparent",
          "text-primary-500 dark:text-primary-400",
          "hover:bg-primary-300/20",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      },
      label: {
        class: "flex-auto grow-0"
      },
      icon: {
        class: "mr-2"
      }
    },
    filterremovebutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm py-2 px-3 w-full mt-2",
          // Shape
          "rounded-md",
          "bg-transparent border-transparent",
          "text-red-500 dark:text-red-400",
          "hover:bg-red-300/20",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      },
      label: {
        class: "flex-auto grow-0"
      },
      icon: {
        class: "mr-2"
      }
    },
    filterbuttonbar: {
      class: [
        // Flex & Alignment
        "flex items-center justify-between",
        // Space
        "py-3 px-5"
      ]
    },
    filterclearbutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm py-2 px-3",
          // Shape
          "rounded-md",
          "text-primary-500 border border-primary-500",
          "hover:bg-primary-300/20",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      }
    },
    filterapplybutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm py-2 px-3",
          // Shape
          "rounded-md",
          "text-white dark:text-surface-900",
          "bg-primary-500 dark:bg-primary-400",
          "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      }
    },
    filtermenubutton: ({ context }) => ({
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        // Size
        "w-8 h-8",
        // Spacing
        "ml-2",
        // Shape
        "rounded-full",
        // Color
        { "bg-primary-50 text-primary-700": context.active },
        "dark:text-white/70 dark:hover:text-white/80 dark:bg-surface-800",
        // States
        "hover:text-surface-700 hover:bg-surface-300/20",
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        // Transition
        "transition duration-200",
        // Misc
        "cursor-pointer no-underline overflow-hidden"
      ]
    }),
    headerfilterclearbutton: ({ context }) => ({
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Shape
        "border-none",
        // Spacing
        "m-0 p-0 ml-2",
        // Color
        "bg-transparent",
        // Misc
        "cursor-pointer no-underline overflow-hidden select-none",
        {
          invisible: !context.hidden
        }
      ]
    }),
    rowtoggler: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Spacing
        "m-0 p-0",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-500 dark:text-white/70",
        "bg-transparent",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    columnresizer: {
      class: [
        "block",
        // Position
        "absolute top-0 right-0",
        // Sizing
        "w-2 h-full",
        // Spacing
        "m-0 p-0",
        // Color
        "border border-transparent",
        // Misc
        "cursor-col-resize"
      ]
    },
    rowreordericon: {
      class: "cursor-move"
    },
    roweditorinitbutton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-700 dark:text-white/70",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        "hover:text-surface-700 hover:bg-surface-300/20",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    roweditorsavebutton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-700 dark:text-white/70",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        "hover:text-surface-700 hover:bg-surface-300/20",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    roweditorcancelbutton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-700 dark:text-white/70",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        "hover:text-surface-700 hover:bg-surface-300/20",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    radiobuttonwrapper: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex align-bottom",
        // Size
        "w-6 h-6",
        // Misc
        "cursor-pointer select-none"
      ]
    },
    radiobutton: ({ context }) => ({
      class: [
        // Flexbox
        "flex justify-center items-center",
        // Size
        "w-[1.571rem] h-[1.571rem]",
        // Shape
        "border-2 rounded-full",
        // Color
        { "text-surface-700 dark:text-white/80": !context.checked },
        { "bg-surface-0 dark:bg-surface-900": !context.checked },
        { "border-surface-300 dark:border-surface-700": !context.checked },
        { "border-primary-500 dark:border-primary-400": context.checked },
        { "bg-primary-500 dark:bg-primary-400": context.checked },
        // States
        { "hover:border-primary-500 dark:hover:border-primary-400": !context.disabled },
        { "outline-none outline-offset-0 ring ring-primary-400/50 ring-inset dark:ring-primary-300/50": context.focused },
        // Transition
        "transition duration-200 ease-in-out",
        // Misc
        { "cursor-default opacity-60": context.disabled }
      ]
    }),
    radiobuttonicon: ({ context }) => ({
      class: [
        "block",
        // Shape
        "rounded-full",
        // Size
        "w-3 h-3",
        // Color
        "bg-surface-0 dark:bg-surface-900",
        // Transition
        "transition duration-200 transform",
        {
          "backface-hidden scale-10 invisible": context.checked === false,
          "transform scale-100 visible": context.checked === true
        }
      ]
    }),
    headercheckboxwrapper: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex align-bottom",
        // Size
        "w-6 h-6",
        // Misc
        "cursor-pointer select-none"
      ]
    },
    headercheckbox: ({ context }) => ({
      class: [
        // Flex & Alignment
        "flex items-center justify-center",
        // Shape
        "border-2 rounded-lg",
        // Size
        "w-6 h-6",
        // Color
        "text-surface-600",
        {
          "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        // States
        "focus:outline-none focus:outline-offset-0",
        {
          "ring ring-primary-400/50 dark:ring-primary-300/50": context.focused
        },
        // Transition
        "transition-colors duration-200",
        // Misc
        { "cursor-default opacity-60": context.disabled }
      ]
    }),
    headercheckboxicon: {
      class: [
        // Size
        "w-4 h-4",
        "text-base leading-none",
        // Color
        "text-white dark:text-surface-900",
        // Transition
        "transition-all duration-200"
      ]
    },
    checkboxwrapper: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex align-bottom",
        // Size
        "w-6 h-6",
        // Misc
        "cursor-pointer select-none"
      ]
    },
    checkbox: ({ context }) => ({
      class: [
        // Flex & Alignment
        "flex items-center justify-center",
        // Shape
        "border-2 rounded-lg",
        // Size
        "w-6 h-6",
        // Color
        "text-surface-600",
        {
          "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        // States
        "focus:outline-none focus:outline-offset-0",
        {
          "ring ring-primary-400/50 dark:ring-primary-300/50": context.focused
        },
        // Transition
        "transition-colors duration-200",
        // Misc
        { "cursor-default opacity-60": context.disabled }
      ]
    }),
    checkboxicon: {
      class: [
        // Size
        "w-4 h-4",
        "text-base leading-none",
        // Color
        "text-white dark:text-surface-900",
        // Transition
        "transition-all duration-200"
      ]
    },
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  },
  bodyrow: ({ context, props }) => ({
    class: [
      // Color
      "dark:text-white/80",
      { "bg-primary-50 text-primary-700 dark:bg-primary-400/30": context.selected },
      { "bg-surface-0 text-surface-600 dark:bg-surface-800": !context.selected },
      { "font-bold bg-surface-0 dark:bg-surface-800": props.frozenRow },
      { "odd:bg-surface-0 odd:text-surface-600 dark:odd:bg-surface-800 even:bg-surface-50 even:text-surface-600 dark:even:bg-surface-900/50": context.stripedRows },
      // State
      { "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 ring-inset dark:focus:ring-primary-300/50": context.selectable },
      { "hover:bg-surface-300/20 hover:text-surface-600": props.selectionMode && !context.selected },
      // Transition
      { "transition duration-200": props.selectionMode && !context.selected || props.rowHover },
      // Misc
      { "cursor-pointer": props.selectionMode }
    ]
  }),
  rowexpansion: {
    class: "bg-surface-0 dark:bg-surface-800 text-surface-600 dark:text-white/80"
  },
  rowgroupheader: {
    class: ["sticky z-20", "bg-surface-0 text-surface-600 dark:text-white/70", "dark:bg-surface-800"]
  },
  rowgroupfooter: {
    class: ["sticky z-20", "bg-surface-0 text-surface-600 dark:text-white/70", "dark:bg-surface-800"]
  },
  rowgrouptoggler: {
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      "text-left",
      // Spacing
      "m-0 p-0",
      // Size
      "w-8 h-8",
      // Shape
      "border-0 rounded-full",
      // Color
      "text-surface-500 dark:text-white/70",
      "bg-transparent",
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      // Transition
      "transition duration-200",
      // Misc
      "overflow-hidden",
      "cursor-pointer select-none"
    ]
  },
  rowgrouptogglericon: {
    class: "inline-block w-4 h-4"
  },
  resizehelper: {
    class: "absolute hidden w-[2px] z-20 bg-primary-500 dark:bg-primary-400"
  }
};
const dataview = {
  content: {
    class: ["p-0", "border-0", "text-surface-700 dark:text-white/80", "bg-surface-0 dark:bg-surface-800"]
  },
  grid: {
    class: ["flex flex-wrap", "ml-0 mr-0 mt-0", "bg-surface-0 dark:bg-surface-800"]
  },
  header: {
    class: ["rounded-lg", "p-4", "text-surface-600 dark:text-white/80", "bg-surface-50 dark:bg-surface-800", "border-surface-100 dark:border-surface-700 border-b"]
  }
};
const dataviewlayoutoptions = {
  listbutton: ({ props }) => ({
    class: [
      // Font
      "leading-none",
      // Flex Alignment
      "inline-flex items-center align-bottom text-center",
      // Shape
      "border rounded-md rounded-r-none",
      // Spacing
      "px-4 py-3  h-[43px]",
      // Color
      props.modelValue === "list" ? "bg-primary-500 dark:bg-primary-400  dark:border-primary-400 text-white dark:text-surface-900" : "bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-white/80",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      props.modelValue === "list" ? "hover:bg-primary-600 dark:hover:bg-primary-300" : "hover:bg-surface-50 dark:hover:bg-surface-800/80",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none overflow-hidden"
    ]
  }),
  gridbutton: ({ props }) => ({
    class: [
      // Font
      "leading-none",
      // Flex Alignment
      "inline-flex items-center align-bottom text-center",
      // Shape
      "border rounded-md rounded-l-none h-[43px]",
      // Spacing
      "px-4 py-3",
      // Color
      props.modelValue === "grid" ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900" : "bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-white/80",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      props.modelValue === "grid" ? "hover:bg-primary-600 dark:hover:bg-primary-300" : "hover:bg-surface-50 dark:hover:bg-surface-800/80",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none overflow-hidden"
    ]
  })
};
const dialog = {
  root: ({ state }) => ({
    class: [
      // Shape
      "rounded-lg",
      "shadow-lg",
      "border-0",
      // Size
      "max-h-[90vh]",
      "w-[50vw]",
      "m-0",
      // Color
      "dark:border",
      "dark:border-surface-700",
      // Transitions
      "transform",
      "scale-100",
      // Maximized State
      {
        "transition-none": state.maximized,
        "transform-none": state.maximized,
        "!w-screen": state.maximized,
        "!h-screen": state.maximized,
        "!max-h-full": state.maximized,
        "!top-0": state.maximized,
        "!left-0": state.maximized
      }
    ]
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between",
      "shrink-0",
      // Spacing
      "p-6",
      // Shape
      "border-t-0",
      "rounded-tl-lg",
      "rounded-tr-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  title: {
    class: ["font-bold text-lg"]
  },
  icons: {
    class: ["flex items-center"]
  },
  closeButton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-8 h-8",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "overflow-hidden"
    ]
  },
  maximizablebutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-8 h-8",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "overflow-hidden"
    ]
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-4",
      "h-4"
    ]
  },
  maximizableicon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-4",
      "h-4"
    ]
  },
  content: ({ state, instance }) => ({
    class: [
      // Spacing
      "px-6",
      "pb-8",
      "pt-0",
      // Shape
      {
        grow: state.maximized,
        "rounded-bl-lg": !instance.$slots.footer,
        "rounded-br-lg": !instance.$slots.footer
      },
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80",
      // Misc
      "overflow-y-auto"
    ]
  }),
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-2",
      // Spacing
      "px-6",
      "pb-6",
      // Shape
      "border-t-0",
      "rounded-b-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  mask: ({ props, state }) => ({
    class: [
      // Transitions
      "transition",
      "duration-200",
      { "p-5": !state.maximized },
      // Background and Effects
      { "bg-black/40": props.modal, "backdrop-blur-sm": props.modal }
    ]
  }),
  transition: ({ props }) => {
    return props.position === "top" ? {
      enterFromClass: "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0"
    } : props.position === "bottom" ? {
      enterFromClass: "opacity-0 scale-75 translate-y-full",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0"
    } : props.position === "left" || props.position === "topleft" || props.position === "bottomleft" ? {
      enterFromClass: "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0"
    } : props.position === "right" || props.position === "topright" || props.position === "bottomright" ? {
      enterFromClass: "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0"
    } : {
      enterFromClass: "opacity-0 scale-75",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75"
    };
  }
};
const divider = {
  root: ({ props }) => ({
    class: [
      // Flex and Position
      "flex relative",
      { "justify-center": props.layout == "vertical" },
      { "items-center": props.layout == "vertical" },
      {
        "justify-start": (props == null ? void 0 : props.align) == "left" && props.layout == "horizontal",
        "justify-center": (props == null ? void 0 : props.align) == "center" && props.layout == "horizontal",
        "justify-end": (props == null ? void 0 : props.align) == "right" && props.layout == "horizontal",
        "items-center": (props == null ? void 0 : props.align) == "top" && props.layout == "vertical",
        "items-start": (props == null ? void 0 : props.align) == "center" && props.layout == "vertical",
        "items-end": (props == null ? void 0 : props.align) == "bottom" && props.layout == "vertical"
      },
      // Spacing
      {
        "my-5 mx-0 py-0 px-5": props.layout == "horizontal",
        "mx-4 md:mx-5 py-5": props.layout == "vertical"
      },
      // Size
      {
        "w-full": props.layout == "horizontal",
        "min-h-full": props.layout == "vertical"
      },
      // Before: Line
      "before:block",
      // Position
      {
        "before:absolute before:left-0 before:top-1/2": props.layout == "horizontal",
        "before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2": props.layout == "vertical"
      },
      // Size
      {
        "before:w-full": props.layout == "horizontal",
        "before:min-h-full": props.layout == "vertical"
      },
      // Shape
      {
        "before:border-solid": props.type == "solid",
        "before:border-dotted": props.type == "dotted",
        "before:border-dashed": props.type == "dashed"
      },
      // Color
      {
        "before:border-t before:border-surface-200 before:dark:border-surface-600": props.layout == "horizontal",
        "before:border-l before:border-surface-200 before:dark:border-surface-600": props.layout == "vertical"
      }
    ]
  }),
  content: {
    class: [
      // Space and Position
      "px-1 z-10",
      // Color
      "bg-surface-0 dark:bg-surface-800"
    ]
  }
};
const dock = {
  root: ({ props }) => ({
    class: [
      // Positioning
      "absolute z-1",
      {
        "left-0 bottom-0 w-full": props.position == "bottom",
        "left-0 top-0 w-full": props.position == "top",
        "left-0 top-0 h-full": props.position == "left",
        "right-0 top-0 h-full": props.position == "right"
      },
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Interactivity
      "pointer-events-none"
    ]
  }),
  container: {
    class: [
      // Flexbox
      "flex",
      // Shape & Border
      "rounded-md",
      // Color
      "bg-surface-0/10 dark:bg-surface-900/20 border border-surface-0/20",
      "backdrop-blur-sm",
      // Spacing
      "p-2",
      // Misc
      "pointer-events-auto"
    ]
  },
  menu: ({ props }) => ({
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      {
        "flex-col": props.position == "left" || props.position == "right"
      },
      // List Style
      "m-0 p-0 list-none",
      // Shape
      "outline-none"
    ]
  }),
  menuitem: ({ props, context, instance }) => ({
    class: [
      // Spacing & Shape
      "p-2 rounded-md",
      // Conditional Scaling
      {
        "hover:scale-150": instance.currentIndex === context.index,
        "scale-125": instance.currentIndex - 1 === context.index || instance.currentIndex + 1 === context.index,
        "scale-110": instance.currentIndex - 2 === context.index || instance.currentIndex + 2 === context.index
      },
      // Positioning & Hover States
      {
        "origin-bottom hover:mx-6": props.position == "bottom",
        "origin-top hover:mx-6": props.position == "top",
        "origin-left hover:my-6": props.position == "left",
        "origin-right hover:my-6": props.position == "right"
      },
      // Transitions & Transform
      "transition-all duration-200 ease-cubic-bezier-will-change-transform transform"
    ]
  }),
  action: {
    class: [
      // Flexbox & Alignment
      "flex flex-col items-center justify-center",
      // Position
      "relative",
      // Size
      "w-16 h-16",
      // Misc
      "cursor-default overflow-hidden"
    ]
  }
};
const dropdown = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "w-full md:w-56",
      "rounded-md",
      // Color and Background
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // Transitions
      "transition-all",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
      "font-poppins",
      // Misc
      "cursor-pointer",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
    ]
  }),
  input: ({ props }) => ({
    class: [
      //Font
      "font-poppins",
      "leading-none",
      // Display
      "block",
      "flex-auto",
      // Color and Background
      "bg-transparent",
      "border-0",
      { "text-surface-800 dark:text-white/80": props.modelValue, "text-surface-500 dark:text-surface-500": !props.modelValue },
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      // Sizing and Spacing
      "w-[1%]",
      "p-3",
      { "pr-7": props.showClear },
      //Shape
      "rounded-none",
      // Transitions
      "transition",
      "duration-200",
      // States
      "focus:outline-none focus:shadow-none",
      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none"
    ]
  }),
  trigger: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      // Shape
      "border-0 dark:border",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-800 dark:text-white/80",
      "dark:border-surface-700"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "py-3 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "font-normal font-poppins",
      "leading-none",
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Color
      { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
      { "bg-surface-200 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
      { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
      { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
      //States
      { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
      { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      // Transitions
      "transition-shadow",
      "duration-200",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-600/80",
      // Misc
      "cursor-auto"
    ]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-3 px-5",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  header: {
    class: [
      // Spacing
      "py-3 px-5",
      "m-0",
      //Shape
      "border-b",
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-100 dark:bg-surface-800",
      "border-surface-300 dark:border-surface-700"
    ]
  },
  filtercontainer: {
    class: "relative"
  },
  filterinput: {
    class: [
      // Font
      "font-poppins",
      "leading-none",
      // Sizing
      "pr-7 py-3 px-3",
      "-mr-7",
      "w-full",
      //Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      // Shape
      "border",
      "rounded-lg",
      "appearance-none",
      // Transitions
      "transition",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      "focus:ring focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "appearance-none"
    ]
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"]
  },
  clearicon: {
    class: [
      // Color
      "text-surface-500",
      // Position
      "absolute",
      "top-1/2",
      "right-12",
      // Spacing
      "-mt-2"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const fieldset = {
  root: {
    class: [
      "block",
      // Spacing
      "px-4 pt-2 py-3",
      "inline-size-min",
      // Shape
      "rounded-md",
      // Color
      "border border-surface-200 dark:border-surface-700",
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  legend: ({ props }) => ({
    class: [
      // Font
      "font-bold",
      "leading-none",
      //Spacing
      { "p-0": props.toggleable, "p-5": !props.toggleable },
      // Shape
      "rounded-md",
      // Color
      "text-surface-700 dark:text-surface-0/80",
      "border border-surface-200 dark:border-surface-700",
      "bg-surface-50 dark:bg-surface-900",
      // Transition
      "transition-none",
      // States
      { "hover:bg-surface-100 hover:border-surface-200 hover:text-surface-900 dark:hover:text-surface-0/80 dark:hover:bg-surface-800/80": props.toggleable }
    ]
  }),
  toggler: ({ props }) => ({
    class: [
      // Alignments
      "flex items-center justify-center",
      "relative",
      //Spacing
      { "p-5": props.toggleable },
      // Shape
      { "rounded-md": props.toggleable },
      // Color
      { "text-surface-700 dark:text-surface-200 hover:text-surface-900 hover:text-surface-900": props.toggleable },
      // States
      { "hover:text-surface-900 dark:hover:text-surface-100": props.toggleable },
      { "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50": props.toggleable },
      // Misc
      {
        "transition-none cursor-pointer overflow-hidden select-none": props.toggleable
      }
    ]
  }),
  togglerIcon: {
    class: "mr-2 inline-block"
  },
  legendTitle: {
    class: "flex items-center justify-center leading-none"
  },
  content: {
    class: "p-5"
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
};
const fileupload = {
  input: {
    class: "hidden"
  },
  buttonbar: {
    class: ["flex", "flex-wrap", "justify-center", "bg-surface-50", "dark:bg-surface-800", "text-surface-700", "dark:text-white/80", "p-5", "gap-2", "border", "border-solid", "border-surface-200", "dark:border-surface-700", "border-b-0", "rounded-tr-lg", "rounded-tl-lg"]
  },
  chooseButton: {
    class: ["relative", "items-center inline-flex text-center align-bottom justify-center", "px-4 py-3", "rounded-md", "leading-[normal]", "font-bold", "text-primary-inverse", "bg-surface-100", "border-surface-100", "hover:bg-primary-hover", "overflow-hidden", "cursor-pointer"]
  },
  chooseIcon: {
    class: ["mr-2", "inline-block"]
  },
  chooseButtonLabel: {
    class: ["flex-1", "font-bold"]
  },
  uploadbutton: {
    icon: {
      class: "mr-2"
    }
  },
  cancelbutton: {
    icon: {
      class: "mr-2"
    }
  },
  content: {
    class: ["relative", "bg-surface-0", "dark:bg-surface-900", "text-surface-700", "dark:text-white/80", "p-8", "border", "border-surface-200", "dark:border-surface-700", "rounded-b-lg"]
  },
  file: {
    class: ["flex", "items-center", "flex-wrap", "p-4", "mb-2", "last:mb-0", "border", "border-surface-200", "dark:border-surface-700", "gap-2", "rounded"]
  },
  thumbnail: {
    class: "shrink-0"
  },
  fileName: {
    class: "mb-2 break-all"
  },
  fileSize: {
    class: "mr-2"
  },
  uploadicon: {
    class: "mr-2"
  },
  progressbar: {
    root: {
      class: ["overflow-hidden", "absolute top-0 left-0", "border-0", "h-2", "rounded-md", "w-full", "bg-surface-100 dark:bg-surface-700"]
    },
    value: {
      class: ["absolute flex items-center justify-center overflow-hidden", "bg-primary", "m-0", "h-full w-0", "border-0", "transition-width duration-1000 ease-in-out"]
    }
  }
};
const global$1 = {
  css: `
    *[data-pd-ripple="true"]{
        overflow: hidden;
        position: relative;
    }
    span[data-p-ink-active="true"]{
        animation: ripple 0.4s linear;
    }
    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }

    .progress-spinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progress-spinner-dash{
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progress-spinner-color {
        100%, 0% {
            stroke: #ff5757;
        }
        40% {
            stroke: #696cff;
        }
        66% {
            stroke: #1ea97c;
        }
        80%, 90% {
            stroke: #cc8925;
        }
    }

    .progressbar-value-animate::after {
        will-change: left, right;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }
    .progressbar-value-animate::before {
        will-change: left, right;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }
    @keyframes p-progressbar-indeterminate-anim {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }

    .p-fadein {
        animation: p-fadein 250ms linear;
    }

    @keyframes p-fadein {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`
};
const inlinemessage = {
  root: ({ props }) => ({
    class: [
      "inline-flex items-center justify-center align-top gap-2",
      "p-3 m-0 rounded-md dark:border",
      {
        "bg-blue-100/70 dark:bg-blue-500/20": props.severity == "info",
        "bg-green-100/70 dark:bg-green-500/20": props.severity == "success",
        "bg-orange-100/70 dark:bg-orange-500/20": props.severity == "warn",
        "bg-red-100/70 dark:bg-red-500/20": props.severity == "error"
      },
      {
        "dark:border-blue-400": props.severity == "info",
        "dark:border-green-400": props.severity == "success",
        "dark:border-orange-400": props.severity == "warn",
        "dark:border-red-400": props.severity == "error"
      },
      {
        "text-blue-700 dark:text-blue-300": props.severity == "info",
        "text-green-700 dark:text-green-300": props.severity == "success",
        "text-orange-700 dark:text-orange-300": props.severity == "warn",
        "text-red-700 dark:text-red-300": props.severity == "error"
      }
    ]
  }),
  icon: {
    class: "text-base"
  },
  text: {
    class: [
      // Font and Text
      "text-base leading-none",
      "font-medium"
    ]
  }
};
const inputgroup = {
  root: {
    class: ["flex items-stretch", "w-full"]
  }
};
const inputgroupaddon = {
  root: {
    class: [
      // Flex
      "flex items-center justify-center",
      // Shape
      "first:rounded-l-md",
      "last:rounded-r-md",
      "border-y",
      "last:border-r",
      "border-l",
      "border-r-0",
      // Space
      "p-3",
      // Size
      "min-w-[3rem]",
      // Color
      "bg-surface-50 dark:bg-surface-800",
      "text-surface-600 dark:text-surface-400",
      "border-surface-300 dark:border-surface-600"
    ]
  }
};
const inputmask = {
  root: ({ context }) => ({
    class: [
      // Font
      "font-sans leading-none",
      // Spacing
      "m-0 p-3",
      // Colors
      "text-surface-600 dark:text-surface-200",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-600",
      // States
      {
        "hover:border-primary-500 dark:hover:border-primary-400": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50": !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": context.disabled
      },
      // Misc
      "rounded-md",
      "appearance-none",
      "transition-colors duration-200"
    ]
  })
};
const inputnumber = {
  root: ({ props, parent }) => ({
    class: [
      // Display
      "inline-flex",
      { "flex-col": props.showButtons && props.buttonLayout == "vertical" },
      // Shape
      { "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup" && !props.showButtons },
      { "border-0 border-y border-l last:border-r border-surface-300 dark:border-surface-600": parent.instance.$name == "InputGroup" && !props.showButtons },
      { "first:ml-0 ml-[-1px]": parent.instance.$name == "InputGroup" && !props.showButtons },
      //Sizing
      { "!w-16": props.showButtons && props.buttonLayout == "vertical" }
    ]
  }),
  input: {
    root: ({ parent, context }) => {
      var _a, _b;
      return {
        class: [
          // Display
          "flex flex-auto",
          // Font
          "font-sans leading-none",
          //Text
          { "text-center": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
          // Spacing
          "p-3",
          "m-0",
          // Shape
          "rounded-lg",
          { "rounded-tr-none rounded-br-none": parent.props.showButtons },
          { "rounded-tl-none rounded-bl-none": parent.props.showButtons && parent.props.buttonLayout == "horizontal" },
          { "rounded-none": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
          { "!rounded-none": ((_a = parent.instance.$parentInstance) == null ? void 0 : _a.$name) == "InputGroup" && !parent.props.showButtons },
          { "border-0": ((_b = parent.instance.$parentInstance) == null ? void 0 : _b.$name) == "InputGroup" && !parent.props.showButtons },
          // Colorsh
          "text-surface-600 dark:text-surface-200",
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          "bg-surface-0 dark:bg-surface-900",
          "border border-surface-300 dark:border-surface-600",
          // States
          "hover:border-primary-500 dark:hover:border-primary-400",
          "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50",
          { "opacity-60 select-none pointer-events-none cursor-default": context.disabled },
          //Position
          { "order-2": parent.props.buttonLayout == "horizontal" || parent.props.buttonLayout == "vertical" }
        ]
      };
    }
  },
  buttongroup: ({ props }) => ({
    class: [
      // Flex
      "flex",
      "flex-col"
    ]
  }),
  incrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        "flex flex-auto",
        // Alignment
        "items-center",
        "justify-center",
        "text-center align-bottom",
        //Position
        "relative",
        { "order-3": parent.props.showButtons && parent.props.buttonLayout == "horizontal" },
        { "order-1": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
        //Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Sizing
        "w-[3rem]",
        { "px-4 py-3": parent.props.showButtons && parent.props.buttonLayout !== "stacked" },
        { "p-0": parent.props.showButtons && parent.props.buttonLayout == "stacked" },
        { "w-full": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
        // Shape
        "rounded-md",
        { "rounded-tl-none rounded-br-none rounded-bl-none": parent.props.showButtons && parent.props.buttonLayout == "stacked" },
        { "rounded-bl-none rounded-tl-none": parent.props.showButtons && parent.props.buttonLayout == "horizontal" },
        { "rounded-bl-none rounded-br-none": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
        //States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        //Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: {
      class: "h-0 w-0"
    }
  },
  decrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        "flex flex-auto",
        // Alignment
        "items-center",
        "justify-center",
        "text-center align-bottom",
        //Position
        "relative",
        { "order-1": parent.props.showButtons && parent.props.buttonLayout == "horizontal" },
        { "order-3": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
        //Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Sizing
        "w-[3rem]",
        { "px-4 py-3": parent.props.showButtons && parent.props.buttonLayout !== "stacked" },
        { "p-0": parent.props.showButtons && parent.props.buttonLayout == "stacked" },
        { "w-full": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
        // Shape
        "rounded-md",
        { "rounded-tr-none rounded-tl-none rounded-bl-none": parent.props.showButtons && parent.props.buttonLayout == "stacked" },
        { "rounded-tr-none rounded-br-none ": parent.props.showButtons && parent.props.buttonLayout == "horizontal" },
        { "rounded-tr-none rounded-tl-none ": parent.props.showButtons && parent.props.buttonLayout == "vertical" },
        //States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        //Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: {
      class: "h-0 w-0"
    }
  }
};
const inputswitch = {
  root: ({ props, state }) => ({
    class: [
      "inline-block relative",
      "w-12 h-7",
      "rounded-2xl",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      },
      { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused }
    ]
  }),
  slider: ({ props }) => ({
    class: [
      // Position
      "absolute top-0 left-0 right-0 bottom-0",
      { "before:transform before:translate-x-5": props.modelValue },
      // Shape
      "rounded-2xl",
      // Before:
      "before:absolute before:top-1/2 before:left-1",
      "before:-mt-2.5",
      "before:h-5 before:w-5",
      "before:rounded-full",
      "before:duration-200",
      "before:bg-surface-0 before:dark:bg-surface-900",
      // Colors
      "border border-transparent",
      {
        "bg-surface-200 dark:bg-surface-700": !props.modelValue,
        "bg-primary-500 dark:bg-primary-400": props.modelValue
      },
      // States
      { "hover:bg-surface-300 hover:dark:bg-surface-600 ": !props.modelValue },
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer"
    ]
  })
};
const inputtext = {
  root: ({ props, context, parent }) => ({
    class: [
      // Font
      "font-poppins",
      // Spacing
      "m-0",
      {
        "px-4 py-4": props.size == "large",
        "px-2 py-2": props.size == "small",
        "p-3": props.size == null
      },
      // Shape
      { "rounded-md": parent.instance.$name !== "InputGroup" },
      {
        "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup"
      },
      {
        "border-0 border-y border-l last:border-r": parent.instance.$name == "InputGroup"
      },
      {
        "first:ml-0 ml-[-1px]": parent.instance.$name == "InputGroup" && !props.showButtons
      },
      // Colors
      "text-surface-600 dark:text-surface-200",
      "placeholder:text-surface-500 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "border",
      { "border-surface-300 dark:border-surface-600": !props.invalid },
      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },
      // States
      {
        "hover:border-primary-500 dark:hover:border-primary-400": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50": !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": context.disabled
      },
      // Misc
      "appearance-none",
      "transition-colors duration-200"
    ]
  })
};
const knob = {
  root: ({ props }) => ({
    class: [
      // Misc
      { "opacity-60 select-none pointer-events-none cursor-default": props.disabled }
    ]
  }),
  range: {
    class: [
      // Stroke
      "stroke-current",
      // Color
      "stroke-surface-200 dark:stroke-surface-700",
      // Fill
      "fill-none",
      // Transition
      "transition duration-100 ease-in"
    ]
  },
  value: {
    class: [
      // Animation
      "animate-dash-frame",
      // Color
      "stroke-primary-500 dark:stroke-primary-400",
      // Fill
      "fill-none"
    ]
  },
  label: {
    class: [
      // Text Style
      "text-center text-xl",
      // Color
      "fill-surface-600 dark:fill-surface-200"
    ]
  }
};
const listbox = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-white/80",
      "border border-surface-200 dark:border-surface-600"
    ]
  },
  wrapper: {
    class: [
      // Overflow
      "overflow-auto"
    ]
  },
  list: {
    class: "py-3 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "font-normal",
      "leading-none",
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Color
      { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
      { "bg-surface-200 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
      { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
      { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
      //States
      { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
      { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      // Transitions
      "transition-shadow",
      "duration-200",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-600/80",
      // Misc
      "cursor-auto"
    ]
  },
  header: {
    class: [
      // Spacing
      "py-3 px-5",
      "m-0",
      //Shape
      "border-b",
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-100 dark:bg-surface-800",
      "border-surface-300 dark:border-surface-600"
    ]
  },
  filtercontainer: {
    class: "relative"
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",
      // Sizing
      "pr-7 py-3 px-3",
      "-mr-7",
      "w-full",
      //Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      // Shape
      "border",
      "rounded-lg",
      "appearance-none",
      // Transitions
      "transition",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      "focus:ring focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "appearance-none"
    ]
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-3 px-5",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  }
};
const megamenu = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flexbox
      "flex",
      // Shape & Size
      "rounded-md",
      // Color
      "bg-surface-50 dark:bg-surface-700",
      "border border-surface-200 dark:border-surface-700",
      { "p-2 items-center": props.orientation == "horizontal", "flex-col sm:w-48 p-0 py-1": props.orientation !== "horizontal" }
    ]
  }),
  menu: ({ props }) => ({
    class: [
      // Flexbox
      "sm:flex",
      "items-center",
      "flex-wrap",
      "flex-col sm:flex-row",
      { hidden: !(props == null ? void 0 : props.mobileActive), flex: props == null ? void 0 : props.mobileActive },
      // Position
      "absolute sm:relative",
      "top-full left-0",
      "sm:top-auto sm:left-auto",
      // Size
      "w-full sm:w-auto",
      // Spacing
      "m-0",
      "py-1 sm:py-0 sm:p-0",
      "list-none",
      // Shape
      "shadow-md sm:shadow-none",
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-700 sm:bg-transparent dark:sm:bg-transparent",
      // Misc
      "outline-none"
    ]
  }),
  menuitem: ({ props }) => ({
    class: [
      "sm:relative static",
      {
        "sm:w-auto w-full": props.horizontal,
        "w-full": !props.horizontal
      }
    ]
  }),
  content: ({ props, context }) => ({
    class: [
      // Shape
      { "rounded-md": props.level < 1 && props.horizontal },
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": context.focused && !context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": context.focused && context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.active,
        "hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80": context.active
      },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }),
  action: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-3",
      "px-5",
      // Size
      "py-3 pr-5 pl-9 sm:pl-5",
      "leading-none",
      // Misc
      "select-none",
      "cursor-pointer",
      "no-underline ",
      "overflow-hidden"
    ]
  },
  icon: {
    class: "mr-2"
  },
  submenuicon: ({ props }) => ({
    class: [
      {
        "ml-auto sm:ml-2": props.horizontal,
        "ml-auto": !props.horizontal
      }
    ]
  }),
  panel: ({ props }) => ({
    class: [
      // Size
      "w-auto",
      // Spacing
      "py-1",
      "m-0",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      {
        "sm:left-full top-0": !props.horizontal
      }
    ]
  }),
  grid: {
    class: "flex flex-wrap sm:flex-nowrap"
  },
  column: {
    class: "w-full sm:w-1/2"
  },
  submenu: {
    class: ["m-0 list-none", "py-1 px-2 w-full sm:min-w-[14rem]"]
  },
  submenuheader: {
    class: [
      "font-semibold",
      // Spacing
      "py-3 px-5",
      "m-0",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-700"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  },
  menubutton: {
    class: [
      // Flexbox
      "flex sm:hidden",
      "items-center justify-center",
      // Size
      "w-8",
      "h-8",
      // Shape
      "rounded-full",
      // Color
      "text-surface-500 dark:text-white/80",
      // States
      "hover:text-surface-600 dark:hover:text-white/60",
      "hover:bg-surface-100 dark:hover:bg-surface-600/80",
      "focus:outline-none focus:outline-offset-0",
      "focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer",
      "no-underline"
    ]
  },
  end: {
    class: "ml-auto self-center"
  }
};
const menu = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      // Spacing
      "py-2",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-700 dark:text-white/80",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-none",
      // Colors
      "text-surface-700 dark:text-white/80",
      {
        "bg-surface-200 text-surface-700 dark:bg-surface-300/10 dark:text-white": context.focused
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:bg-surface-700 dark:hover:bg-surface-400/10"
    ]
  }),
  action: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-3",
      "px-5",
      // Color
      "text-surface-700 dark:text-white/80",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  },
  label: {
    class: ["leading-none"]
  },
  submenuheader: {
    class: [
      // Font
      "font-bold",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Shape
      "rounded-tl-none",
      "rounded-tr-none",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-700 dark:text-white"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const menubar = {
  root: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "p-2",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-50 dark:bg-surface-700",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  menu: ({ props }) => ({
    class: [
      // Flexbox
      "sm:flex",
      "items-center",
      "flex-wrap",
      "flex-col sm:flex-row",
      { hidden: !(props == null ? void 0 : props.mobileActive), flex: props == null ? void 0 : props.mobileActive },
      // Position
      "absolute sm:relative",
      "top-full left-0",
      "sm:top-auto sm:left-auto",
      // Size
      "w-full sm:w-auto",
      // Spacing
      "m-0",
      "py-1 sm:py-0 sm:p-0",
      "list-none",
      // Shape
      "shadow-md sm:shadow-none",
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-700 sm:bg-transparent",
      // Misc
      "outline-none"
    ]
  }),
  menuitem: {
    class: "sm:relative sm:w-auto w-full static"
  },
  content: ({ props, context }) => ({
    class: [
      // Shape
      { "rounded-md": props.root },
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": context.focused && !context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": context.focused && context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.active,
        "hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80": context.active
      },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }),
  action: ({ context }) => ({
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-3",
      "px-5",
      // Size
      {
        "pl-9 sm:pl-5": context.level === 1,
        "pl-14 sm:pl-5": context.level === 2
      },
      "leading-none",
      // Misc
      "select-none",
      "cursor-pointer",
      "no-underline ",
      "overflow-hidden"
    ]
  }),
  icon: {
    class: "mr-2"
  },
  submenuicon: ({ props }) => ({
    class: [
      {
        "ml-auto sm:ml-2": props.root,
        "ml-auto": !props.root
      }
    ]
  }),
  submenu: ({ props }) => ({
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "py-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": props.level > 1 },
      // Color
      "bg-surface-0 dark:bg-surface-700"
    ]
  }),
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  },
  button: {
    class: [
      // Flexbox
      "flex sm:hidden",
      "items-center justify-center",
      // Size
      "w-8",
      "h-8",
      // Shape
      "rounded-full",
      // Color
      "text-surface-500 dark:text-white/80",
      // States
      "hover:text-surface-600 dark:hover:text-white/60",
      "hover:bg-surface-100 dark:hover:bg-surface-600/80",
      "focus:outline-none focus:outline-offset-0",
      "focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer",
      "no-underline"
    ]
  },
  end: {
    class: "ml-auto self-center"
  }
};
const message = {
  root: ({ props }) => ({
    class: [
      // Spacing and Shape
      "my-4 mx-0",
      "rounded-md",
      "border-solid border-0 border-l-[6px]",
      // Colors
      {
        "bg-blue-100/70 dark:bg-blue-500/20": props.severity == "info",
        "bg-green-100/70 dark:bg-green-500/20": props.severity == "success",
        "bg-orange-100/70 dark:bg-orange-500/20": props.severity == "warn",
        "bg-red-100/70 dark:bg-red-500/20": props.severity == "error"
      },
      {
        "border-blue-500 dark:border-blue-400": props.severity == "info",
        "border-green-500 dark:border-green-400": props.severity == "success",
        "border-orange-500 dark:border-orange-400": props.severity == "warn",
        "border-red-500 dark:border-red-400": props.severity == "error"
      },
      {
        "text-blue-700 dark:text-blue-300": props.severity == "info",
        "text-green-700 dark:text-green-300": props.severity == "success",
        "text-orange-700 dark:text-orange-300": props.severity == "warn",
        "text-red-700 dark:text-red-300": props.severity == "error"
      }
    ]
  }),
  wrapper: {
    class: [
      // Flexbox
      "flex items-center",
      // Spacing
      "py-5 px-7"
    ]
  },
  icon: {
    class: [
      // Sizing and Spacing
      "w-6 h-6",
      "text-lg leading-none mr-2 shrink-0"
    ]
  },
  text: {
    class: [
      // Font and Text
      "text-base leading-none",
      "font-medium"
    ]
  },
  button: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-8 h-8",
      // Spacing and Misc
      "ml-auto  relative",
      // Shape
      "rounded-full",
      // Colors
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:bg-surface-0/50 dark:hover:bg-surface-0/10",
      // Misc
      "overflow-hidden"
    ]
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-300",
    leaveFromClass: "max-h-40",
    leaveActiveClass: "overflow-hidden transition-all duration-300 ease-in",
    leaveToClass: "max-h-0 opacity-0 !m-0"
  }
};
const multiselect = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-lg",
      // Color and Background
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // Transitions
      "transition-all",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
      // Misc
      "cursor-pointer",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
    ]
  }),
  labelContainer: {
    class: "overflow-hidden flex flex-auto cursor-pointer "
  },
  label: ({ props }) => {
    var _a, _b;
    return {
      class: [
        "leading-none font-poppins mt-1",
        "block ",
        // Spacing
        {
          "p-3": props.display !== "chip",
          "py-3 px-3": props.display === "chip" && !((_a = props == null ? void 0 : props.modelValue) != null && _a.length),
          "py-1.5 px-3": props.display === "chip" && ((_b = props == null ? void 0 : props.modelValue) == null ? void 0 : _b.length) > 0
        },
        // Color
        { "text-surface-600 dark:text-white/80": props.modelValue, "text-surface-500 dark:text-surface-500": !props.modelValue },
        "placeholder:text-surface-400 dark:placeholder:text-surface-500",
        // Transitions
        "transition duration-200",
        // Misc
        "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
      ]
    };
  },
  token: {
    class: ["inline-flex items-center", "py-1.5 px-3 mr-2", "rounded-[1.14rem]", "bg-surface-200 dark:bg-surface-700", "text-surface-700 dark:text-white/70", "cursor-default"]
  },
  removeTokenIcon: {
    class: ["rounded-md leading-6", "ml-2", "w-4 h-4", "transition duration-200 ease-in-out", "cursor-pointer"]
  },
  trigger: {
    class: ["flex items-center justify-center", "shrink-0", "bg-transparent", "text-surface-500", "w-12", "rounded-tr-md", "rounded-br-md"]
  },
  panel: {
    class: ["absolute top-0 left-0", "border-0 dark:border", "rounded-md", "shadow-md", "bg-surface-0 dark:bg-surface-800", "text-surface-800 dark:text-white/80", "dark:border-surface-700"]
  },
  header: {
    class: ["flex items-center justify-between", "py-3 px-5", "m-0", "border-b", "rounded-tl-md", "rounded-tr-md", "text-surface-700 dark:text-white/80", "bg-surface-100 dark:bg-surface-800", "border-surface-300 dark:border-surface-700"]
  },
  headerCheckboxContainer: {
    class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "cursor-pointer", "select-none"]
  },
  headerCheckbox: {
    root: {
      class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "mr-2", "cursor-pointer", "select-none"]
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",
        // Size
        "w-6",
        "h-6",
        // Shape
        "rounded-md",
        "border-2",
        // Colors
        {
          "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        // States
        {
          "peer-hover:border-primary-500 dark:peer-hover:border-primary-400": !props.disabled && !context.checked,
          "peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300": !props.disabled && context.checked,
          "peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20": !props.disabled,
          "cursor-default opacity-60": props.disabled
        },
        // Transitions
        "transition-colors",
        "duration-200"
      ]
    }),
    input: {
      class: ["peer", "w-full ", "h-full", "absolute", "top-0 left-0", "z-10", "p-0", "m-0", "opacity-0", "rounded-md", "outline-none", "border-2 border-surface-200 dark:border-surface-700", "appareance-none", "cursor-pointer"]
    },
    icon: {
      class: ["text-base leading-none", "w-4", "h-4", "text-white dark:text-surface-900", "transition-all", "duration-200"]
    }
  },
  itemCheckbox: {
    root: {
      class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "mr-2", "cursor-pointer", "select-none"]
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",
        // Size
        "w-6",
        "h-6",
        // Shape
        "rounded-md",
        "border-2",
        // Colors
        {
          "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        // States
        {
          "peer-hover:border-primary-500 dark:peer-hover:border-primary-400": !props.disabled && !context.checked,
          "peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300": !props.disabled && context.checked,
          "peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20": !props.disabled,
          "cursor-default opacity-60": props.disabled
        },
        // Transitions
        "transition-colors",
        "duration-200"
      ]
    }),
    input: {
      class: ["peer", "w-full ", "h-full", "absolute", "top-0 left-0", "z-10", "p-0", "m-0", "opacity-0", "rounded-md", "outline-none", "border-2 border-surface-200 dark:border-surface-700", "appareance-none", "cursor-pointer"]
    },
    icon: {
      class: ["text-base leading-none", "w-4", "h-4", "text-white dark:text-surface-900", "transition-all", "duration-200"]
    }
  },
  closeButton: {
    class: ["relative", "flex items-center justify-center", "mr-2", "last:mr-0", "w-8 h-8", "border-0", "rounded-full", "text-surface-500", "bg-transparent", "transition duration-200 ease-in-out", "hover:text-surface-700 dark:hover:text-white/80", "hover:bg-surface-100 dark:hover:bg-surface-800/80", "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset", "focus:ring-primary-400/50 dark:focus:ring-primary-300/50", "overflow-hidden"]
  },
  closeButtonIcon: {
    class: "w-4 h-4 inline-block"
  },
  wrapper: {
    class: ["max-h-[200px]", "overflow-auto"]
  },
  list: {
    class: "py-3 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "font-normal font-poppins",
      "leading-none",
      // Flexbox
      "flex items-center",
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Color
      { "text-surface-600 dark:text-white/80": !context.focused && !context.selected },
      { "bg-surface-200 dark:bg-surface-600/60 text-surface-600 dark:text-white/80": context.focused && !context.selected },
      { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
      { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
      //States
      { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
      { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
      // Transitions
      "transition-shadow",
      "duration-200",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: ["font-bold", "m-0", "p-3 px-5", "text-surface-800 dark:text-white/80", "bg-surface-0 dark:bg-surface-600/80", "cursor-auto"]
  },
  filtercontainer: {
    class: "relative w-full mx-2"
  },
  filterinput: {
    class: ["font-poppins", "leading-none", "pr-7 py-3 px-3", "-mr-7", "w-full", "text-surface-700 dark:text-white/80", "bg-surface-0 dark:bg-surface-900", "border-surface-200 dark:border-surface-700", "placeholder:text-surface-400 dark:placeholder:text-surface-500", "border", "rounded-lg", "appearance-none", "transition", "duration-200", "hover:border-primary-500 dark:hover:border-primary-300", "focus:ring focus:outline-none focus:outline-offset-0", "focus:ring-primary-400/50 dark:focus:ring-primary-300/50", "appearance-none"]
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"]
  },
  clearicon: {
    class: ["text-surface-500", "absolute", "top-1/2", "right-12", "-mt-2"]
  },
  emptymessage: {
    class: ["leading-none", "py-3 px-5", "text-surface-800 dark:text-white/80", "bg-transparent"]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const orderlist = {
  root: {
    class: [
      // Flexbox
      "flex"
    ]
  },
  controls: {
    class: [
      // Flexbox & Alignment
      "flex flex-col justify-center gap-2",
      // Spacing
      "p-5"
    ]
  },
  moveupbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movedownbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movetopbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movebottombutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  container: {
    class: ["flex-auto"]
  },
  header: {
    class: [
      "font-bold",
      // Shape
      "border-b-0 rounded-t-md",
      // Spacing
      "p-5",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-50 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  list: {
    class: [
      // Spacing
      "list-none m-0 p-0",
      // Size
      "min-h-[12rem] max-h-[24rem]",
      // Shape
      "rounded-b-md",
      // Color
      "text-surface-600 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700",
      // Spacing
      "py-3 px-0",
      // Focus & Outline
      "outline-none",
      // Misc
      "overflow-auto"
    ]
  },
  item: ({ context }) => ({
    class: [
      // Position
      "relative",
      // Spacing
      "py-3 px-5 m-0",
      // Shape
      "border-none",
      // Transition
      "transition duration-200",
      // Color
      "text-surface-700 dark:text-white/80",
      { "bg-primary-500/20 dark:bg-primary-300/20": context.active && !context.focused },
      { "bg-primary-500/30 dark:bg-primary-400/30": context.active && context.focused },
      { "bg-surface-100 dark:bg-surface-700/70": !context.active && context.focused },
      // State
      "hover:bg-surface-100 dark:hover:bg-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  })
};
const organizationchart = {
  table: {
    class: [
      // Spacing & Position
      "mx-auto my-0",
      // Table Style
      "border-spacing-0 border-separate"
    ]
  },
  cell: {
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3"
    ]
  },
  node: ({ props, context }) => ({
    class: [
      "relative inline-block",
      // Spacing
      "p-5",
      // Shape
      "border",
      // Color
      {
        "text-surface-600 dark:text-white/80": !(context == null ? void 0 : context.selected),
        "bg-surface-0 dark:bg-surface-800": !(context == null ? void 0 : context.selected),
        "border-surface-200 dark:border-surface-700": !(context == null ? void 0 : context.selected),
        "text-primary-700 dark:text-surface-0": context == null ? void 0 : context.selected,
        "bg-primary-50 dark:bg-primary-400/30": context == null ? void 0 : context.selected,
        "border-primary-200 dark:border-primary-600": context == null ? void 0 : context.selected
      },
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-700": (context == null ? void 0 : context.selectable) && !(context == null ? void 0 : context.selected),
        "hover:bg-primary-100 dark:hover:bg-primary-300/30": (context == null ? void 0 : context.selectable) && (context == null ? void 0 : context.selected)
      },
      { "cursor-pointer": context == null ? void 0 : context.selectable }
    ]
  }),
  linecell: {
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3"
    ]
  },
  linedown: {
    class: [
      // Spacing
      "mx-auto my-0",
      // Size
      "w-px h-[20px]",
      // Color
      "bg-surface-200 dark:bg-surface-700"
    ]
  },
  lineleft: ({ context }) => ({
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3",
      // Shape
      "rounded-none border-r",
      { "border-t": context.lineTop },
      // Color
      "border-surface-200 dark:border-surface-700"
    ]
  }),
  lineright: ({ context }) => ({
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3",
      // Shape
      "rounded-none",
      // Color
      { "border-t border-surface-200 dark:border-surface-700": context.lineTop }
    ]
  }),
  nodecell: {
    class: "text-center align-top py-0 px-3"
  },
  nodetoggler: {
    class: [
      // Position
      "absolute bottom-[-0.75rem] left-2/4 -ml-3",
      "z-20",
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-6 h-6",
      // Shape
      "rounded-full",
      // Color
      "bg-inherit text-inherit",
      // Focus
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "cursor-pointer no-underline select-none"
    ]
  },
  nodetogglericon: {
    class: [
      // Position
      "relative inline-block",
      // Size
      "w-4 h-4"
    ]
  }
};
const overlaypanel = {
  root: {
    class: [
      // Shape
      "rounded-md shadow-lg",
      "border-0 dark:border",
      // Position
      "absolute left-0 top-0 mt-2",
      "z-40 transform origin-center",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80",
      "dark:border-surface-700",
      // Before: Triangle
      "before:absolute before:-top-2 before:ml-4",
      "before:w-0 before:h-0",
      "before:border-transparent before:border-solid",
      "before:border-x-[0.5rem] before:border-b-[0.5rem]",
      "before:border-t-0 before:border-b-surface-0 dark:before:border-b-surface-800"
    ]
  },
  content: {
    class: "p-5 items-center flex"
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const paginator = {
  root: {
    class: [
      // Flex & Alignment
      "flex items-center justify-center flex-wrap",
      // Spacing
      "px-4 py-2",
      // Shape
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-500 dark:text-white/60"
    ]
  },
  firstpagebutton: ({ context }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full dark:rounded-md",
      // Size
      "min-w-[3rem] h-12 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-surface-700/70": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  previouspagebutton: ({ context }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full dark:rounded-md",
      // Size
      "min-w-[3rem] h-12 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-surface-700/70": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  nextpagebutton: ({ context }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full dark:rounded-md",
      // Size
      "min-w-[3rem] h-12 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-surface-700/70": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  lastpagebutton: ({ context }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full dark:rounded-md",
      // Size
      "min-w-[3rem] h-12 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-surface-700/70": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  pagebutton: ({ context }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full dark:rounded-md",
      // Size
      "min-w-[3rem] h-12 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/80",
      {
        "bg-primary-50 border-primary-50 dark:border-transparent text-primary-700 dark:text-surface-0 dark:bg-primary-400/30": context.active
      },
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-surface-700/70": !context.disabled && !context.active,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  rowperpagedropdown: {
    root: ({ props, state }) => ({
      class: [
        // Display and Position
        "inline-flex",
        "relative",
        // Shape
        "h-12",
        "rounded-md",
        // Spacing
        "mx-2",
        // Color and Background
        "bg-surface-0 dark:bg-surface-900",
        "border border-surface-300 dark:border-surface-700",
        // Transitions
        "transition-all",
        "duration-200",
        // States
        "hover:border-primary-500 dark:hover:border-primary-300",
        { "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !state.focused },
        // Misc
        "cursor-pointer",
        "select-none",
        { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
      ]
    }),
    input: {
      class: [
        //Font
        "font-sans",
        "leading-5",
        // Display
        "block",
        "flex-auto",
        // Color and Background
        "bg-transparent",
        "border-0",
        "text-surface-800 dark:text-white/80",
        // Sizing and Spacing
        "w-[1%]",
        "p-3 pr-0",
        //Shape
        "rounded-none",
        // Transitions
        "transition",
        "duration-200",
        // States
        "focus:outline-none focus:shadow-none",
        // Misc
        "relative",
        "cursor-pointer",
        "overflow-hidden overflow-ellipsis",
        "whitespace-nowrap",
        "appearance-none"
      ]
    },
    trigger: {
      class: [
        // Flexbox
        "flex items-center justify-center",
        "shrink-0",
        // Color and Background
        "bg-transparent",
        "text-surface-500",
        // Size
        "w-12",
        // Shape
        "rounded-tr-md",
        "rounded-br-md"
      ]
    },
    panel: {
      class: [
        // Position
        "absolute top-0 left-0",
        // Shape
        "border-0 dark:border",
        "rounded-md",
        "shadow-md",
        // Color
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-800 dark:text-white/80",
        "dark:border-surface-700"
      ]
    },
    wrapper: {
      class: [
        // Sizing
        "max-h-[200px]",
        // Misc
        "overflow-auto"
      ]
    },
    list: {
      class: "py-3 list-none m-0"
    },
    item: ({ context }) => ({
      class: [
        // Font
        "font-normal",
        "leading-none",
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-3 px-5",
        // Color
        { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
        { "bg-surface-50 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
        { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
        { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
        //States
        { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
        { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
        // Transitions
        "transition-shadow",
        "duration-200",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    })
  },
  jumptopageinput: {
    root: {
      class: "inline-flex mx-2"
    },
    input: {
      root: {
        class: [
          "relative",
          //Font
          "font-sans",
          "leading-none",
          // Display
          "block",
          "flex-auto",
          // Colors
          "text-surface-600 dark:text-surface-200",
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          "bg-surface-0 dark:bg-surface-900",
          "border border-surface-300 dark:border-surface-600",
          // Sizing and Spacing
          "w-[1%] max-w-[3rem]",
          "p-3 m-0",
          //Shape
          "rounded-md",
          // Transitions
          "transition",
          "duration-200",
          // States
          "hover:border-primary-500 dark:hover:border-primary-400",
          "focus:outline-none focus:shadow-none",
          "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50",
          // Misc
          "cursor-pointer",
          "overflow-hidden overflow-ellipsis",
          "whitespace-nowrap",
          "appearance-none"
        ]
      }
    }
  },
  jumptopagedropdown: {
    root: ({ props, state }) => ({
      class: [
        // Display and Position
        "inline-flex",
        "relative",
        // Shape
        "h-12",
        "rounded-md",
        // Color and Background
        "bg-surface-0 dark:bg-surface-900",
        "border border-surface-300 dark:border-surface-700",
        // Transitions
        "transition-all",
        "duration-200",
        // States
        "hover:border-primary-500 dark:hover:border-primary-300",
        { "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !state.focused },
        // Misc
        "cursor-pointer",
        "select-none",
        { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
      ]
    }),
    input: {
      class: [
        //Font
        "font-sans",
        "leading-none",
        // Display
        "block",
        "flex-auto",
        // Color and Background
        "bg-transparent",
        "border-0",
        "text-surface-800 dark:text-white/80",
        // Sizing and Spacing
        "w-[1%]",
        "p-3",
        //Shape
        "rounded-none",
        // Transitions
        "transition",
        "duration-200",
        // States
        "focus:outline-none focus:shadow-none",
        // Misc
        "relative",
        "cursor-pointer",
        "overflow-hidden overflow-ellipsis",
        "whitespace-nowrap",
        "appearance-none"
      ]
    },
    trigger: {
      class: [
        // Flexbox
        "flex items-center justify-center",
        "shrink-0",
        // Color and Background
        "bg-transparent",
        "text-surface-500",
        // Size
        "w-12",
        // Shape
        "rounded-tr-md",
        "rounded-br-md"
      ]
    },
    panel: {
      class: [
        // Position
        "absolute top-0 left-0",
        // Shape
        "border-0 dark:border",
        "rounded-md",
        "shadow-md",
        // Color
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-800 dark:text-white/80",
        "dark:border-surface-700"
      ]
    },
    wrapper: {
      class: [
        // Sizing
        "max-h-[200px]",
        // Misc
        "overflow-auto"
      ]
    },
    list: {
      class: "py-3 list-none m-0"
    },
    item: ({ context }) => ({
      class: [
        // Font
        "font-normal",
        "leading-none",
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-3 px-5",
        // Color
        { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
        { "bg-surface-50 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
        { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
        { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
        //States
        { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
        { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
        // Transitions
        "transition-shadow",
        "duration-200",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    })
  }
};
const panel = {
  header: ({ props }) => ({
    class: [
      // Flex
      "flex items-center justify-between",
      // Colors
      "text-surface-700 dark:text-surface-0/80",
      "bg-surface-50 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700",
      //Shape
      "rounded-tl-lg rounded-tr-lg",
      // Conditional Spacing
      { "p-5": !props.toggleable, "py-3 px-5": props.toggleable }
    ]
  }),
  title: {
    class: "leading-none font-bold"
  },
  toggler: {
    class: [
      // Alignments
      "inline-flex items-center justify-center",
      "relative",
      // Sized
      "w-8 h-8",
      "m-0 p-0",
      //Shape
      "border-0 rounded-full",
      //Color
      "bg-transparent",
      "text-surface-600 dark:text-surface-0/80",
      // States
      "hover:text-surface-800 dark:hover:text-surface-0/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 focus-visible:ring-inset dark:focus-visible:ring-primary-300/50",
      // Transitions
      "transition-all duration-200 ease-in-out",
      // Misc
      "overflow-hidden no-underline",
      "cursor-pointer"
    ]
  },
  togglerIcon: {
    class: "inline-block"
  },
  content: {
    class: [
      // Spacing
      "p-5",
      // Shape
      "border border-t-0 last:rounded-br-lg last:rounded-bl-lg",
      //Color
      "border-surface-200 dark:border-surface-700",
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  footer: {
    class: [
      // Spacing
      "py-3 p-5",
      // Shape
      "border border-t-0 rounded-br-lg rounded-bl-lg",
      //Color
      "border-surface-200 dark:border-surface-700",
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
};
const panelmenu = {
  panel: {
    class: "mb-1"
  },
  header: {
    class: ["rounded-md", "outline-none", "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50"]
  },
  headercontent: ({ context, instance }) => {
    var _a, _b;
    return {
      class: [
        // Shape
        "rounded-t-md",
        { "rounded-br-md rounded-bl-md": !context.active || ((_a = instance.activeItem) == null ? void 0 : _a.items) === void 0, "rounded-br-0 rounded-bl-0": context.active && ((_b = instance.activeItem) == null ? void 0 : _b.items) !== void 0 },
        // Color
        "border border-surface-200 dark:border-surface-700",
        "bg-surface-50 dark:bg-surface-800",
        "text-surface-600 dark:text-surface-0/80",
        { "text-surface-900": context.active },
        // States
        "hover:bg-surface-100 dark:hover:bg-surface-700/80",
        "hover:text-surface-900",
        // Transition
        "transition duration-200 ease-in-out",
        "transition-shadow duration-200"
      ]
    };
  },
  headeraction: {
    class: [
      "relative",
      // Font
      "font-bold",
      "leading-none",
      // Flex & Alignments
      "flex items-center",
      // Spacing
      "p-5",
      // Misc
      "select-none cursor-pointer no-underline"
    ]
  },
  headerlabel: {
    class: "leading-none"
  },
  headerIcon: {
    class: "mr-2"
  },
  submenuicon: {
    class: "mr-2"
  },
  menucontent: {
    class: [
      // Spacing
      "py-2",
      // Shape
      "border border-t-0",
      "rounded-t-none rounded-br-md rounded-bl-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700"
    ]
  },
  menu: {
    class: ["outline-none", "m-0 p-0 list-none"]
  },
  content: {
    class: [
      // Shape
      "border-none rounded-none",
      // Color
      "text-surface-700 dark:text-white/80",
      // Transition
      "transition-shadow duration-200"
    ]
  },
  action: ({ context }) => ({
    class: [
      "relative",
      // Font
      "leading-none",
      // Flex & Alignments
      "flex items-center",
      // Spacing
      "py-3 px-5",
      // Color
      "text-surface-700 dark:text-white/80",
      // States
      "hover:bg-surface-100 dark:hover:bg-surface-700/80 hover:text-surface-700 dark:hover:text-white/80",
      {
        "bg-surface-200 text-surface-700 dark:text-white/80 dark:bg-surface-600/90": context.focused
      },
      // Misc
      "cursor-pointer no-underline",
      "select-none overflow-hidden"
    ]
  }),
  icon: {
    class: "mr-2"
  },
  submenu: {
    class: "p-0 pl-4 m-0 list-none"
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
};
const password = {
  root: ({ props }) => ({
    class: [
      "inline-flex relative",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      },
      { "[&>input]:pr-10": props.toggleMask }
    ]
  }),
  panel: {
    class: ["p-5", "border-0 dark:border", "shadow-md rounded-md", "bg-surface-0 dark:bg-surface-900", "text-surface-700 dark:text-white/80", "dark:border-surface-700"]
  },
  meter: {
    class: ["overflow-hidden", "relative", "border-0", "h-3", "mb-2", "bg-surface-100 dark:bg-surface-700"]
  },
  meterlabel: ({ instance }) => {
    var _a, _b, _c;
    return {
      class: [
        // Size
        "h-full",
        // Colors
        {
          "bg-red-500 dark:bg-red-400/50": ((_a = instance == null ? void 0 : instance.meter) == null ? void 0 : _a.strength) == "weak",
          "bg-orange-500 dark:bg-orange-400/50": ((_b = instance == null ? void 0 : instance.meter) == null ? void 0 : _b.strength) == "medium",
          "bg-green-500 dark:bg-green-400/50": ((_c = instance == null ? void 0 : instance.meter) == null ? void 0 : _c.strength) == "strong"
        },
        // Transitions
        "transition-all duration-1000 ease-in-out"
      ]
    };
  },
  showicon: {
    class: ["absolute top-1/2 right-3 -mt-2 z-10", "text-surface-600 dark:text-white/70"]
  },
  hideicon: {
    class: ["absolute top-1/2 right-3 -mt-2 z-10", "text-surface-600 dark:text-white/70"]
  },
  input: {
    root: ({ props, context, parent }) => {
      var _a, _b, _c;
      return {
        class: [
          // Font
          "leading-[normal] font-poppins pl-10",
          // Flex
          { "flex-1 w-[1%]": parent.instance.$name == "InputGroup" },
          // Spacing
          "m-0",
          {
            "px-4 py-4": props.size == "large",
            "px-2 py-2": props.size == "small",
            "p-3": props.size == null
          },
          "w-full",
          // Shape
          { "rounded-md": parent.instance.$name !== "InputGroup" },
          { "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup" },
          { "border-0 border-y border-l last:border-r": parent.instance.$name == "InputGroup" },
          { "first:ml-0 -ml-px": parent.instance.$name == "InputGroup" && !props.showButtons },
          // Colors
          "text-surface-600 dark:text-surface-200",
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          "bg-surface-0 dark:bg-surface-900",
          "border",
          { "border-surface-300 dark:border-surface-600": !parent.props.invalid },
          // Invalid State
          { "border-red-500 dark:border-red-400": parent.props.invalid },
          // States
          {
            "hover:border-primary": !context.disabled && !parent.props.invalid,
            "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:z-10": !context.disabled,
            "opacity-60 select-none pointer-events-none cursor-default": context.disabled
          },
          // Filled State *for FloatLabel
          { filled: ((_b = (_a = parent.instance) == null ? void 0 : _a.$parentInstance) == null ? void 0 : _b.$name) == "FloatLabel" && parent.props.modelValue !== null && ((_c = parent.props.modelValue) == null ? void 0 : _c.length) !== 0 },
          // Misc
          "appearance-none",
          "transition-colors duration-200"
        ]
      };
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const picklist = {
  root: {
    class: [
      // Flexbox
      "flex lg:flex-row flex-col"
    ]
  },
  sourcecontrols: {
    class: [
      // Flexbox & Alignment
      "flex lg:flex-col justify-center gap-2",
      // Spacing
      "p-5"
    ]
  },
  sourcemoveupbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcemovetopbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcemovedownbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcemovebottombutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcewrapper: {
    class: "grow shrink basis-2/4"
  },
  sourceheader: {
    class: [
      "font-bold",
      // Shape
      "border-b-0 rounded-t-md",
      // Spacing
      "p-5",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-50 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  sourcelist: {
    class: [
      // Spacing
      "list-none m-0 p-0",
      // Size
      "min-h-[12rem] max-h-[24rem]",
      // Shape
      "rounded-b-md",
      // Color
      "text-surface-600 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700",
      // Spacing
      "py-3 px-0",
      // Focus & Outline
      "outline-none",
      // Misc
      "overflow-auto"
    ]
  },
  item: ({ context }) => ({
    class: [
      // Position
      "relative",
      // Spacing
      "py-3 px-5 m-0",
      // Shape
      "border-none",
      // Transition
      "transition duration-200",
      // Color
      "text-surface-700 dark:text-white/80",
      { "bg-primary-500/20 dark:bg-primary-300/20": context.active && !context.focused },
      { "bg-primary-500/30 dark:bg-primary-400/30": context.active && context.focused },
      { "bg-surface-100 dark:bg-surface-700/70": !context.active && context.focused },
      // State
      "hover:bg-surface-100 dark:hover:bg-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  }),
  buttons: {
    class: "flex lg:flex-col justify-center gap-2 p-5"
  },
  movetotargetbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movealltotargetbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movetosourcebutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movealltosourcebutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetcontrols: {
    class: "flex lg:flex-col justify-center gap-2 p-5"
  },
  targetmoveupbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetmovetopbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetmovedownbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetmovebottombutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "w-12",
        "m-0",
        "px-0 py-3",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetwrapper: {
    class: "grow shrink basis-2/4"
  },
  targetheader: {
    class: [
      "font-bold",
      // Shape
      "border-b-0 rounded-t-md",
      // Spacing
      "p-5",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-50 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  targetlist: {
    class: [
      // Spacing
      "list-none m-0 p-0",
      // Size
      "min-h-[12rem] max-h-[24rem]",
      // Shape
      "rounded-b-md",
      // Color
      "text-surface-600 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700",
      // Spacing
      "py-3 px-0",
      // Focus & Outline
      "outline-none",
      // Misc
      "overflow-auto"
    ]
  },
  transition: {
    enterFromClass: "!transition-none",
    enterActiveClass: "!transition-none",
    leaveActiveClass: "!transition-none",
    leaveToClass: "!transition-none"
  }
};
const progressbar = {
  root: {
    class: [
      // Position and Overflow
      "overflow-hidden",
      "relative",
      // Shape and Size
      "border-0",
      "h-6",
      "rounded-md",
      // Colors
      "bg-surface-100 dark:bg-surface-700"
    ]
  },
  value: ({ props }) => ({
    class: [
      // Flexbox & Overflow & Position
      {
        "absolute flex items-center justify-center overflow-hidden": props.mode !== "indeterminate"
      },
      // Colors
      "bg-primary-500 dark:bg-primary-400",
      // Spacing & Sizing
      "m-0",
      { "h-full w-0": props.mode !== "indeterminate" },
      // Shape
      "border-0",
      // Transitions
      {
        "transition-width duration-1000 ease-in-out": props.mode !== "indeterminate",
        "progressbar-value-animate": props.mode == "indeterminate"
      },
      // Before & After (indeterminate)
      {
        "before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit ": props.mode == "indeterminate",
        "after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000": props.mode == "indeterminate"
      }
    ]
  }),
  label: {
    class: [
      // Flexbox
      "inline-flex",
      "display-none",
      // Font and Text
      "text-white dark:text-surface-900",
      "leading-6"
    ]
  }
};
const radiobutton = {
  root: {
    class: [
      "relative",
      // Flexbox & Alignment
      "inline-flex",
      "align-bottom",
      // Size
      "w-[1.571rem] h-[1.571rem]",
      // Misc
      "cursor-pointer",
      "select-none"
    ]
  },
  input: ({ props, state }) => ({
    class: [
      // Flexbox
      "flex justify-center items-center",
      // Size
      "w-[1.571rem] h-[1.571rem]",
      // Shape
      "border-2",
      "rounded-full",
      // Transition
      "transition duration-200 ease-in-out",
      // Colors
      {
        "text-surface-700 dark:text-white/80": props.value !== props.modelValue && props.value !== void 0,
        "bg-surface-0 dark:bg-surface-900": props.value !== props.modelValue && props.value !== void 0,
        "border-surface-300 dark:border-surface-700": props.value !== props.modelValue && props.value !== void 0,
        "border-primary-500 dark:border-primary-400": props.value == props.modelValue && props.value !== void 0,
        "bg-primary-500 dark:bg-primary-400": props.value == props.modelValue && props.value !== void 0
      },
      // States
      {
        "hover:border-primary-600 dark:hover:border-primary-300": !props.disabled,
        "outline-none outline-offset-0": !props.disabled && state.focused,
        "ring ring-primary-400/50 dark:ring-primary-300/50": !props.disabled && state.focused,
        "opacity-60 cursor-default": props.disabled
      }
    ]
  }),
  icon: ({ props }) => ({
    class: [
      "block",
      // Shape
      "rounded-full",
      // Size
      "w-3",
      "h-3",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      // Conditions
      {
        "backface-hidden scale-10 invisible": props.value !== props.modelValue,
        "transform visible scale-[1.1]": props.value == props.modelValue
      },
      // Transition
      "transition duration-200"
    ]
  })
};
const rating = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "flex items-center",
      "gap-2",
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  cancelitem: ({ context }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",
      //State
      {
        "outline-none ring ring-primary-500/50 dark:ring-primary-400/50": context.focused
      },
      // Misc
      "cursor-pointer"
    ]
  }),
  cancelicon: {
    class: [
      // Size
      "w-5 h-5",
      // Color
      "text-red-500 dark:text-red-400",
      // State
      "hover:text-red-600 dark:hover:text-red-300",
      // Transition
      "transition duration-200 ease-in"
    ]
  },
  item: ({ props, context }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",
      // State
      {
        "outline-none ring ring-primary-500/50 dark:ring-primary-400/50": context.focused
      },
      // Misc
      {
        "cursor-pointer": !props.readonly,
        "cursor-default": props.readonly
      }
    ]
  }),
  officon: ({ props }) => ({
    class: [
      // Size
      "w-5 h-5",
      // Color
      "text-surface-700 dark:text-surface-0/80",
      // State
      { "hover:text-primary-500 dark:hover:text-primary-400": !props.readonly },
      // Transition
      "transition duration-200 ease-in"
    ]
  }),
  onicon: ({ props }) => ({
    class: [
      // Size
      "w-5 h-5",
      // Color
      "text-primary-500 dark:text-primary-400",
      // State
      { "hover:text-primary-600 dark:hover:text-primary-300": !props.readonly },
      // Transition
      "transition duration-200 ease-in"
    ]
  })
};
const ripple = {
  root: {
    class: ["block absolute bg-surface-0/50 rounded-full pointer-events-none"],
    style: "transform: scale(0)"
  }
};
const scrollpanel = {
  wrapper: {
    class: [
      // Size & Position
      "h-full w-full",
      // Layering
      "z-[1]",
      // Spacing
      "overflow-hidden",
      // Misc
      "relative float-left"
    ]
  },
  content: {
    class: [
      // Size & Spacing
      "h-[calc(100%+18px)] w-[calc(100%+18px)] pr-[18px] pb-[18px] pl-0 pt-0",
      // Overflow & Scrollbar
      "overflow-scroll scrollbar-none",
      // Box Model
      "box-border",
      // Position
      "relative",
      // Webkit Specific
      "[&::-webkit-scrollbar]:hidden"
    ]
  },
  barX: {
    class: [
      // Size & Position
      "h-[9px] bottom-0",
      // Appearance
      "bg-surface-50 dark:bg-surface-700 rounded",
      // Interactivity
      "cursor-pointer",
      // Visibility & Layering
      "invisible z-20",
      // Transition
      "transition duration-[250ms] ease-linear",
      // Misc
      "relative"
    ]
  },
  barY: {
    class: [
      // Size & Position
      "w-[9px] top-0",
      // Appearance
      "bg-surface-50 dark:bg-surface-700 rounded",
      // Interactivity
      "cursor-pointer",
      // Visibility & Layering
      "z-20",
      // Transition
      "transition duration-[250ms] ease-linear",
      // Misc
      "relative"
    ]
  }
};
const scrolltop = {
  root: ({ props }) => ({
    class: [
      // Flex & Alignment
      "flex items-center justify-center",
      // Positioning
      {
        sticky: props.target === "parent",
        fixed: props.target === "window"
      },
      "bottom-[20px] right-[20px]",
      "ml-auto",
      // Shape & Size
      {
        "rounded-md h-8 w-8": props.target === "parent",
        "h-12 w-12 rounded-full shadow-md": props.target === "window"
      },
      // Color
      "text-white dark:text-surface-900",
      {
        "bg-primary-500 dark:bg-primary-400 hover:bg-primary-600 dark:hover:bg-primary-300": props.target === "parent",
        "bg-surface-500 dark:bg-surface-400 hover:bg-surface-600 dark:hover:bg-surface-300": props.target === "window"
      },
      // States
      {
        "hover:bg-primary-600 dark:hover:bg-primary-300": props.target === "parent",
        "hover:bg-surface-600 dark:hover:bg-surface-300": props.target === "window"
      }
    ]
  }),
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-150",
    leaveActiveClass: "transition-opacity duration-150",
    leaveToClass: "opacity-0"
  }
};
const selectbutton = {
  root: ({ props }) => ({
    class: [{ "opacity-60 select-none pointer-events-none cursor-default": props.disabled }]
  }),
  button: ({ context }) => ({
    class: [
      "relative",
      // Font
      "leading-none",
      // Flex Alignment
      "inline-flex items-center align-bottom text-center",
      // Spacing
      "px-4 py-3",
      // Shape
      "border border-r-0",
      "first:rounded-l-md first:rounded-tr-none first:rounded-br-none",
      "last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md",
      // Color
      {
        "bg-surface-0 dark:bg-surface-900": !context.active,
        "text-surface-700 dark:text-white/80": !context.active,
        "border-surface-200 dark:border-surface-700": !context.active,
        "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900": context.active
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-surface-50 dark:hover:bg-surface-800/80": !context.active,
        "hover:bg-primary-600 dark:hover:bg-primary-300": context.active
      },
      { "opacity-60 select-none pointer-events-none cursor-default": context.disabled },
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none overflow-hidden"
    ]
  }),
  label: {
    class: "font-bold"
  }
};
const sidebar = {
  root: ({ props }) => ({
    class: [
      // Flexbox
      "flex flex-col",
      // Position
      "relative",
      { "!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0": props.position == "full" },
      // Size
      {
        "h-full w-80": props.position == "left" || props.position == "right",
        "h-auto w-full": props.position == "top" || props.position == "bottom"
      },
      // Shape
      "border-0 dark:border",
      "shadow-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-white/80",
      "dark:border-surface-700",
      // Transitions
      "transition-transform",
      "duration-300",
      // Misc
      "pointer-events-auto"
    ]
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between",
      "shrink-0",
      // Spacing
      "p-5",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  title: {
    class: ["font-bold text-lg"]
  },
  icons: {
    class: ["flex items-center"]
  },
  closeButton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-8 h-8",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "overflow-hidden"
    ]
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-4",
      "h-4"
    ]
  },
  content: {
    class: [
      // Spacing and Size
      "p-5",
      "pt-0",
      "h-full",
      "w-full",
      // Growth and Overflow
      "grow",
      "overflow-y-auto"
    ]
  },
  mask: ({ props }) => ({
    class: [
      // Transitions
      "transition",
      "duration-200",
      { "p-5": !props.position == "full" },
      // Background and Effects
      { "bg-black/40": props.modal, "backdrop-blur-sm": props.modal }
    ]
  }),
  transition: ({ props }) => {
    return props.position === "top" ? {
      enterFromClass: "translate-x-0 -translate-y-full translate-z-0",
      leaveToClass: "translate-x-0 -translate-y-full translate-z-0"
    } : props.position === "bottom" ? {
      enterFromClass: "translate-x-0 translate-y-full translate-z-0",
      leaveToClass: "translate-x-0 translate-y-full translate-z-0"
    } : props.position === "left" ? {
      enterFromClass: "-translate-x-full translate-y-0 translate-z-0",
      leaveToClass: "-translate-x-full translate-y-0 translate-z-0"
    } : props.position === "right" ? {
      enterFromClass: "translate-x-full translate-y-0 translate-z-0",
      leaveToClass: "translate-x-full translate-y-0 translate-z-0"
    } : {
      enterFromClass: "opacity-0",
      enterActiveClass: "transition-opacity duration-400 ease-in",
      leaveActiveClass: "transition-opacity duration-400 ease-in",
      leaveToClass: "opacity-0"
    };
  }
};
const skeleton = {
  root: ({ props }) => ({
    class: [
      "overflow-hidden",
      {
        "animate-pulse": props.animation !== "none"
      },
      // Round
      { "rounded-full": props.shape === "circle", "rounded-md": props.shape !== "circle" },
      // Colors
      "bg-surface-200 dark:bg-surface-700"
    ]
  })
};
const slider = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Size
      { "h-1 w-60": props.orientation == "horizontal", "w-1 h-56": props.orientation == "vertical" },
      // Shape
      "border-0",
      // Colors
      "bg-surface-100 dark:bg-surface-700",
      // States
      { "opacity-60 select-none pointer-events-none cursor-default": props.disabled }
    ]
  }),
  range: ({ props }) => ({
    class: [
      // Position
      "block absolute",
      {
        "top-0 left-0": props.orientation == "horizontal",
        "bottom-0 left-0": props.orientation == "vertical"
      },
      //Size
      {
        "h-full": props.orientation == "horizontal",
        "w-full": props.orientation == "vertical"
      },
      // Colors
      "bg-primary-500 dark:bg-primary-400"
    ]
  }),
  handle: ({ props }) => ({
    class: [
      "block",
      // Size
      "h-[1.143rem]",
      "w-[1.143rem]",
      {
        "top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]": props.orientation == "horizontal",
        "left-[50%] mb-[-0.5715rem] ml-[-0.5715rem]": props.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "border-2",
      // Colors
      "bg-surface-0 dark:bg-surface-600",
      "border-primary-500 dark:border-primary-400",
      // States
      "hover:bg-primary-500 hover:border-primary-500",
      "focus:outline-none focus:outline-offset-0 focus:ring",
      "ring-primary-400/50 dark:ring-primary-300/50",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  }),
  starthandler: ({ props }) => ({
    class: [
      "block",
      // Size
      "h-[1.143rem]",
      "w-[1.143rem]",
      {
        "top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]": props.orientation == "horizontal",
        "left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]": props.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "border-2",
      // Colors
      "bg-surface-0 dark:bg-surface-600",
      "border-primary-500 dark:border-primary-400",
      // States
      "hover:bg-primary-500 hover:border-primary-500",
      "focus:outline-none focus:outline-offset-0 focus:ring",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  }),
  endhandler: ({ props }) => ({
    class: [
      "block",
      // Size
      "h-[1.143rem]",
      "w-[1.143rem]",
      {
        "top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]": props.orientation == "horizontal",
        "left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]": props.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "border-2",
      // Colors
      "bg-surface-0 dark:bg-surface-600",
      "border-primary-500 dark:border-primary-400",
      // States
      "hover:bg-primary-500 hover:border-primary-500",
      "focus:outline-none focus:outline-offset-0 focus:ring",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  })
};
const speeddial = {
  root: {
    class: "absolute flex"
  },
  button: {
    root: ({ props, context }) => ({
      class: [
        "relative",
        "z-20",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "leading-[normal]",
        "w-16 h-16 p-0 py-3",
        // Shapes
        "rounded-full",
        "shadow-md",
        // Link Button
        { "text-primary-600 bg-transparent border-transparent": props.link },
        // Plain Button
        { "text-white bg-gray-500 border border-gray-500": props.plain && !props.outlined && !props.text },
        // Plain Text Button
        { "text-surface-500": props.plain && props.text },
        // Plain Outlined Button
        { "text-surface-500 border border-gray-500": props.plain && props.outlined },
        // Text Button
        { "bg-transparent border-transparent": props.text && !props.plain },
        // Outlined Button
        { "bg-transparent border": props.outlined && !props.plain },
        // --- Severity Buttons ---
        // Primary Button
        {
          "text-white dark:text-surface-900": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
          "bg-primary-500 dark:bg-primary-400": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
          "border border-primary-500 dark:border-primary-400": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
        },
        // Primary Text Button
        { "text-primary-500 dark:text-primary-400": props.text && props.severity === null && !props.plain },
        // Primary Outlined Button
        { "text-primary-500 border border-primary-500 hover:bg-primary-300/20": props.outlined && props.severity === null && !props.plain },
        // Secondary Button
        {
          "text-white dark:text-surface-900": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
          "bg-surface-500 dark:bg-surface-400": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
          "border border-surface-500 dark:border-surface-400": props.severity === "secondary" && !props.text && !props.outlined && !props.plain
        },
        // Secondary Text Button
        { "text-surface-500 dark:text-surface-300": props.text && props.severity === "secondary" && !props.plain },
        // Secondary Outlined Button
        { "text-surface-500 dark:text-surface-300 border border-surface-500 hover:bg-surface-300/20": props.outlined && props.severity === "secondary" && !props.plain },
        // Success Button
        {
          "text-white dark:text-green-900": props.severity === "success" && !props.text && !props.outlined && !props.plain,
          "bg-green-500 dark:bg-green-400": props.severity === "success" && !props.text && !props.outlined && !props.plain,
          "border border-green-500 dark:border-green-400": props.severity === "success" && !props.text && !props.outlined && !props.plain
        },
        // Success Text Button
        { "text-green-500 dark:text-green-400": props.text && props.severity === "success" && !props.plain },
        // Success Outlined Button
        { "text-green-500 border border-green-500 hover:bg-green-300/20": props.outlined && props.severity === "success" && !props.plain },
        // Info Button
        {
          "text-white dark:text-surface-900": props.severity === "info" && !props.text && !props.outlined && !props.plain,
          "bg-blue-500 dark:bg-blue-400": props.severity === "info" && !props.text && !props.outlined && !props.plain,
          "border border-blue-500 dark:border-blue-400": props.severity === "info" && !props.text && !props.outlined && !props.plain
        },
        // Info Text Button
        { "text-blue-500 dark:text-blue-400": props.text && props.severity === "info" && !props.plain },
        // Info Outlined Button
        { "text-blue-500 border border-blue-500 hover:bg-blue-300/20 ": props.outlined && props.severity === "info" && !props.plain },
        // Warning Button
        {
          "text-white dark:text-surface-900": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
          "bg-orange-500 dark:bg-orange-400": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
          "border border-orange-500 dark:border-orange-400": props.severity === "warning" && !props.text && !props.outlined && !props.plain
        },
        // Warning Text Button
        { "text-orange-500 dark:text-orange-400": props.text && props.severity === "warning" && !props.plain },
        // Warning Outlined Button
        { "text-orange-500 border border-orange-500 hover:bg-orange-300/20": props.outlined && props.severity === "warning" && !props.plain },
        // Help Button
        {
          "text-white dark:text-surface-900": props.severity === "help" && !props.text && !props.outlined && !props.plain,
          "bg-purple-500 dark:bg-purple-400": props.severity === "help" && !props.text && !props.outlined && !props.plain,
          "border border-purple-500 dark:border-purple-400": props.severity === "help" && !props.text && !props.outlined && !props.plain
        },
        // Help Text Button
        { "text-purple-500 dark:text-purple-400": props.text && props.severity === "help" && !props.plain },
        // Help Outlined Button
        { "text-purple-500 border border-purple-500 hover:bg-purple-300/20": props.outlined && props.severity === "help" && !props.plain },
        // Danger Button
        {
          "text-white dark:text-surface-900": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
          "bg-red-500 dark:bg-red-400": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
          "border border-red-500 dark:border-red-400": props.severity === "danger" && !props.text && !props.outlined && !props.plain
        },
        // Danger Text Button
        { "text-red-500 dark:text-red-400": props.text && props.severity === "danger" && !props.plain },
        // Danger Outlined Button
        { "text-red-500 border border-red-500 hover:bg-red-300/20": props.outlined && props.severity === "danger" && !props.plain },
        // --- Severity Button States ---
        "focus:outline-none focus:outline-offset-0 focus:ring",
        // Link
        { "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": props.link },
        // Plain
        { "hover:bg-gray-600 hover:border-gray-600": props.plain && !props.outlined && !props.text },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": props.plain && (props.text || props.outlined) },
        // Primary
        { "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
        { "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": props.severity === null },
        // Text & Outlined Button
        { "hover:bg-primary-300/20": (props.text || props.outlined) && props.severity === null && !props.plain },
        // Secondary
        { "hover:bg-surface-600 dark:hover:bg-surface-300 hover:border-surface-600 dark:hover:border-surface-300": props.severity === "secondary" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-surface-400/50 dark:focus:ring-surface-300/50": props.severity === "secondary" },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": (props.text || props.outlined) && props.severity === "secondary" && !props.plain },
        // Success
        { "hover:bg-green-600 dark:hover:bg-green-300 hover:border-green-600 dark:hover:border-green-300": props.severity === "success" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-green-400/50 dark:focus:ring-green-300/50": props.severity === "success" },
        // Text & Outlined Button
        { "hover:bg-green-300/20": (props.text || props.outlined) && props.severity === "success" && !props.plain },
        // Info
        { "hover:bg-blue-600 dark:hover:bg-blue-300 hover:border-blue-600 dark:hover:border-blue-300": props.severity === "info" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-blue-400/50 dark:focus:ring-blue-300/50": props.severity === "info" },
        // Text & Outlined Button
        { "hover:bg-blue-300/20": (props.text || props.outlined) && props.severity === "info" && !props.plain },
        // Warning
        { "hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300": props.severity === "warning" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-orange-400/50 dark:focus:ring-orange-300/50": props.severity === "warning" },
        // Text & Outlined Button
        { "hover:bg-orange-300/20": (props.text || props.outlined) && props.severity === "warning" && !props.plain },
        // Help
        { "hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300": props.severity === "help" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-purple-400/50 dark:focus:ring-purple-300/50": props.severity === "help" },
        // Text & Outlined Button
        { "hover:bg-purple-300/20": (props.text || props.outlined) && props.severity === "help" && !props.plain },
        // Danger
        { "hover:bg-red-600 dark:hover:bg-red-300 hover:border-red-600 dark:hover:border-red-300": props.severity === "danger" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-red-400/50 dark:focus:ring-red-300/50": props.severity === "danger" },
        // Text & Outlined Button
        { "hover:bg-red-300/20": (props.text || props.outlined) && props.severity === "danger" && !props.plain },
        // Disabled
        { "opacity-60 pointer-events-none cursor-default": context.disabled },
        // Transitions
        "transition duration-200 ease-in-out",
        // Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: ({ props }) => ({
      class: [
        "duration-200",
        "font-bold",
        {
          "hover:underline": props.link
        },
        { "flex-1": props.label !== null, "invisible w-0": props.label == null }
      ]
    }),
    icon: ({ props }) => ({
      class: [
        "mx-0",
        {
          "mr-2": props.iconPos == "left" && props.label != null,
          "ml-2 order-1": props.iconPos == "right" && props.label != null,
          "mb-2": props.iconPos == "top" && props.label != null,
          "mt-2": props.iconPos == "bottom" && props.label != null
        }
      ]
    }),
    loadingicon: ({ props }) => ({
      class: [
        "h-4 w-4",
        "mx-0",
        {
          "mr-2": props.iconPos == "left" && props.label != null,
          "ml-2 order-1": props.iconPos == "right" && props.label != null,
          "mb-2": props.iconPos == "top" && props.label != null,
          "mt-2": props.iconPos == "bottom" && props.label != null
        },
        "animate-spin"
      ]
    }),
    badge: ({ props }) => ({
      class: [{ "ml-2 w-4 h-4 leading-none flex items-center justify-center": props.badge }]
    })
  },
  menu: {
    class: ["m-0 p-0", "list-none flex items-center justify-center", "transition delay-200", "z-20"]
  },
  menuitem: ({ props, context }) => ({
    class: [
      "transform transition-transform duration-200 ease-out transition-opacity duration-800",
      // Conditional Appearance
      context.hidden ? "opacity-0 scale-0" : "opacity-100 scale-100",
      // Conditional Spacing
      {
        "my-1 first:mb-2": props.direction == "up" && props.type == "linear",
        "my-1 first:mt-2": props.direction == "down" && props.type == "linear",
        "mx-1 first:mr-2": props.direction == "left" && props.type == "linear",
        "mx-1 first:ml-2": props.direction == "right" && props.type == "linear"
      },
      // Conditional Positioning
      { absolute: props.type !== "linear" }
    ]
  }),
  action: {
    class: ["flex items-center justify-center", "w-12 h-12", "rounded-full relative overflow-hidden", "bg-surface-600 dark:bg-surface-0/80 text-white dark:text-surface-900/80", "hover:bg-surface-700 dark:hover:bg-surface-200/80"]
  },
  mask: ({ state }) => ({
    class: [
      // Base Styles
      "absolute left-0 top-0 w-full h-full transition-opacity duration-250 ease-in-out bg-black/40 z-0",
      // Conditional Appearance
      {
        "opacity-0 pointer-events-none": !state.d_visible,
        "opacity-100 transition-opacity duration-400 ease-in-out": state.d_visible
      }
    ]
  })
};
const splitbutton = {
  root: ({ props }) => ({
    class: [
      // Flexbox and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      { "shadow-lg": props.raised }
    ]
  }),
  button: {
    root: ({ parent }) => ({
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        {
          "px-4 py-3 leading-none": parent.props.size === null && parent.props.label !== null,
          "text-xs py-2 px-3": parent.props.size === "small",
          "text-xl py-3 px-4": parent.props.size === "large"
        },
        {
          "h-12 w-12 p-0": parent.props.label == null
        },
        // Shape
        "rounded-r-none",
        "border-r-0",
        { "rounded-l-full": parent.props.rounded },
        { "rounded-md": !parent.props.rounded, "rounded-full": parent.props.rounded },
        // Link Button
        { "text-primary-600 bg-transparent border-transparent": parent.props.link },
        // Plain Button
        { "text-white bg-gray-500 border border-gray-500": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Plain Text Button
        { "text-surface-500": parent.props.plain && parent.props.text },
        // Plain Outlined Button
        { "text-surface-500 border border-gray-500": parent.props.plain && parent.props.outlined },
        // Text Button
        { "bg-transparent border-transparent": parent.props.text && !parent.props.plain },
        // Outlined Button
        { "bg-transparent border": parent.props.outlined && !parent.props.plain },
        // --- Severity Buttons ---
        // Primary Button
        {
          "text-white dark:text-surface-900": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-primary-500 dark:bg-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-primary-500 dark:border-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Primary Text Button
        { "text-primary-500 dark:text-primary-400": parent.props.text && parent.props.severity === null && !parent.props.plain },
        // Primary Outlined Button
        { "text-primary-500 border border-primary-500 hover:bg-primary-300/20": parent.props.outlined && parent.props.severity === null && !parent.props.plain },
        // Secondary Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-surface-500 dark:bg-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-surface-500 dark:border-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Secondary Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Secondary Outlined Button
        { "text-surface-500 border border-surface-500 hover:bg-surface-300/20": parent.props.outlined && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-green-500 dark:bg-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-green-500 dark:border-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Success Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Outlined Button
        { "text-green-500 border border-green-500 hover:bg-green-300/20": parent.props.outlined && parent.props.severity === "success" && !parent.props.plain },
        // Info Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-blue-500 dark:bg-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-blue-500 dark:border-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Info Text Button
        { "text-blue-500 dark:text-blue-400": parent.props.text && parent.props.severity === "info" && !parent.props.plain },
        // Info Outlined Button
        { "text-blue-500 border border-blue-500 hover:bg-blue-300/20 ": parent.props.outlined && parent.props.severity === "info" && !parent.props.plain },
        // Warning Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-orange-500 dark:bg-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-orange-500 dark:border-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Warning Text Button
        { "text-orange-500 dark:text-orange-400": parent.props.text && parent.props.severity === "warning" && !parent.props.plain },
        // Warning Outlined Button
        { "text-orange-500 border border-orange-500 hover:bg-orange-300/20": parent.props.outlined && parent.props.severity === "warning" && !parent.props.plain },
        // Help Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-purple-500 dark:bg-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-purple-500 dark:border-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Help Text Button
        { "text-purple-500 dark:text-purple-400": parent.props.text && parent.props.severity === "help" && !parent.props.plain },
        // Help Outlined Button
        { "text-purple-500 border border-purple-500 hover:bg-purple-300/20": parent.props.outlined && parent.props.severity === "help" && !parent.props.plain },
        // Danger Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-red-500 dark:bg-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-red-500 dark:border-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Danger Text Button
        { "text-red-500 dark:text-red-400": parent.props.text && parent.props.severity === "danger" && !parent.props.plain },
        // Danger Outlined Button
        { "text-red-500 border border-red-500 hover:bg-red-300/20": parent.props.outlined && parent.props.severity === "danger" && !parent.props.plain },
        // --- Severity Button States ---
        "focus:outline-none focus:outline-offset-0 focus:ring",
        // Link
        { "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": parent.props.link },
        // Plain
        { "hover:bg-gray-600 hover:border-gray-600": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": parent.props.plain && (parent.props.text || parent.props.outlined) },
        // Primary
        { "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        // Text & Outlined Button
        { "hover:bg-primary-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === null && !parent.props.plain },
        // Secondary
        { "hover:bg-surface-600 dark:hover:bg-surface-300 hover:border-surface-600 dark:hover:border-surface-300": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-surface-400/50 dark:focus:ring-surface-300/50": parent.props.severity === "secondary" },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "secondary" && !parent.props.plain },
        // Success
        { "hover:bg-green-600 dark:hover:bg-green-300 hover:border-green-600 dark:hover:border-green-300": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-green-400/50 dark:focus:ring-green-300/50": parent.props.severity === "success" },
        // Text & Outlined Button
        { "hover:bg-green-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "success" && !parent.props.plain },
        // Info
        { "hover:bg-blue-600 dark:hover:bg-blue-300 hover:border-blue-600 dark:hover:border-blue-300": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-blue-400/50 dark:focus:ring-blue-300/50": parent.props.severity === "info" },
        // Text & Outlined Button
        { "hover:bg-blue-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "info" && !parent.props.plain },
        // Warning
        { "hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-orange-400/50 dark:focus:ring-orange-300/50": parent.props.severity === "warning" },
        // Text & Outlined Button
        { "hover:bg-orange-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "warning" && !parent.props.plain },
        // Help
        { "hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-purple-400/50 dark:focus:ring-purple-300/50": parent.props.severity === "help" },
        // Text & Outlined Button
        { "hover:bg-purple-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "help" && !parent.props.plain },
        // Warning
        { "hover:bg-red-600 dark:hover:bg-red-300 hover:border-red-600 dark:hover:border-red-300": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-red-400/50 dark:focus:ring-red-300/50": parent.props.severity === "danger" },
        // Text & Outlined Button
        { "hover:bg-red-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "danger" && !parent.props.plain },
        // Transitions
        "transition duration-200 ease-in-out",
        // Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    icon: {
      class: [
        // Margins
        "mr-2"
      ]
    }
  },
  menubutton: {
    root: ({ parent }) => ({
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        {
          "px-4 py-3 leading-none": parent.props.size === null && parent.props.label !== null,
          "text-xs py-2 px-3": parent.props.size === "small",
          "text-xl py-3 px-4": parent.props.size === "large"
        },
        {
          "h-12 w-12 p-0": parent.props.label == null
        },
        // Shape
        "rounded-l-none",
        { "rounded-l-full": parent.props.rounded },
        { "rounded-md": !parent.props.rounded, "rounded-full": parent.props.rounded },
        // Link Button
        { "text-primary-600 bg-transparent border-transparent": parent.props.link },
        // Plain Button
        { "text-white bg-gray-500 border border-gray-500": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Plain Text Button
        { "text-surface-500": parent.props.plain && parent.props.text },
        // Plain Outlined Button
        { "text-surface-500 border border-gray-500": parent.props.plain && parent.props.outlined },
        // Text Button
        { "bg-transparent border-transparent": parent.props.text && !parent.props.plain },
        // Outlined Button
        { "bg-transparent border": parent.props.outlined && !parent.props.plain },
        // --- Severity Buttons ---
        // Primary Button
        {
          "text-white dark:text-surface-900": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-primary-500 dark:bg-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-primary-500 dark:border-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Primary Text Button
        { "text-primary-500 dark:text-primary-400": parent.props.text && parent.props.severity === null && !parent.props.plain },
        // Primary Outlined Button
        { "text-primary-500 border border-primary-500 hover:bg-primary-300/20": parent.props.outlined && parent.props.severity === null && !parent.props.plain },
        // Secondary Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-surface-500 dark:bg-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-surface-500 dark:border-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Secondary Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Secondary Outlined Button
        { "text-surface-500 border border-surface-500 hover:bg-surface-300/20": parent.props.outlined && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-green-500 dark:bg-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-green-500 dark:border-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Success Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Outlined Button
        { "text-green-500 border border-green-500 hover:bg-green-300/20": parent.props.outlined && parent.props.severity === "success" && !parent.props.plain },
        // Info Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-blue-500 dark:bg-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-blue-500 dark:border-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Info Text Button
        { "text-blue-500 dark:text-blue-400": parent.props.text && parent.props.severity === "info" && !parent.props.plain },
        // Info Outlined Button
        { "text-blue-500 border border-blue-500 hover:bg-blue-300/20 ": parent.props.outlined && parent.props.severity === "info" && !parent.props.plain },
        // Warning Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-orange-500 dark:bg-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-orange-500 dark:border-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Warning Text Button
        { "text-orange-500 dark:text-orange-400": parent.props.text && parent.props.severity === "warning" && !parent.props.plain },
        // Warning Outlined Button
        { "text-orange-500 border border-orange-500 hover:bg-orange-300/20": parent.props.outlined && parent.props.severity === "warning" && !parent.props.plain },
        // Help Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-purple-500 dark:bg-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-purple-500 dark:border-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Help Text Button
        { "text-purple-500 dark:text-purple-400": parent.props.text && parent.props.severity === "help" && !parent.props.plain },
        // Help Outlined Button
        { "text-purple-500 border border-purple-500 hover:bg-purple-300/20": parent.props.outlined && parent.props.severity === "help" && !parent.props.plain },
        // Danger Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-red-500 dark:bg-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "border border-red-500 dark:border-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Danger Text Button
        { "text-red-500 dark:text-red-400": parent.props.text && parent.props.severity === "danger" && !parent.props.plain },
        // Danger Outlined Button
        { "text-red-500 border border-red-500 hover:bg-red-300/20": parent.props.outlined && parent.props.severity === "danger" && !parent.props.plain },
        // --- Severity Button States ---
        "focus:outline-none focus:outline-offset-0 focus:ring",
        // Link
        { "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": parent.props.link },
        // Plain
        { "hover:bg-gray-600 hover:border-gray-600": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": parent.props.plain && (parent.props.text || parent.props.outlined) },
        // Primary
        { "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-primary-400/50 dark:focus:ring-primary-300/50": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        // Text & Outlined Button
        { "hover:bg-primary-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === null && !parent.props.plain },
        // Secondary
        { "hover:bg-surface-600 dark:hover:bg-surface-300 hover:border-surface-600 dark:hover:border-surface-300": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-surface-400/50 dark:focus:ring-surface-300/50": parent.props.severity === "secondary" },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "secondary" && !parent.props.plain },
        // Success
        { "hover:bg-green-600 dark:hover:bg-green-300 hover:border-green-600 dark:hover:border-green-300": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-green-400/50 dark:focus:ring-green-300/50": parent.props.severity === "success" },
        // Text & Outlined Button
        { "hover:bg-green-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "success" && !parent.props.plain },
        // Info
        { "hover:bg-blue-600 dark:hover:bg-blue-300 hover:border-blue-600 dark:hover:border-blue-300": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-blue-400/50 dark:focus:ring-blue-300/50": parent.props.severity === "info" },
        // Text & Outlined Button
        { "hover:bg-blue-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "info" && !parent.props.plain },
        // Warning
        { "hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-orange-400/50 dark:focus:ring-orange-300/50": parent.props.severity === "warning" },
        // Text & Outlined Button
        { "hover:bg-orange-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "warning" && !parent.props.plain },
        // Help
        { "hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-purple-400/50 dark:focus:ring-purple-300/50": parent.props.severity === "help" },
        // Text & Outlined Button
        { "hover:bg-purple-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "help" && !parent.props.plain },
        // Warning
        { "hover:bg-red-600 dark:hover:bg-red-300 hover:border-red-600 dark:hover:border-red-300": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-red-400/50 dark:focus:ring-red-300/50": parent.props.severity === "danger" },
        // Text & Outlined Button
        { "hover:bg-red-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "danger" && !parent.props.plain },
        // Transitions
        "transition duration-200 ease-in-out",
        // Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: {
      class: ["hidden"]
    }
  }
};
const steps = {
  root: {
    class: "relative"
  },
  menu: {
    class: "p-0 m-0 list-none flex"
  },
  menuitem: {
    class: [
      // Flexbox and Position
      "relative",
      "flex",
      "justify-center",
      "flex-1",
      "overflow-hidden",
      // Before
      "before:border-t",
      "before:border-surface-200",
      "before:dark:border-surface-700",
      "before:w-full",
      "before:absolute",
      "before:top-1/2",
      "before:left-0",
      "before:transform",
      "before:-mt-4"
    ]
  },
  action: ({ props }) => ({
    class: [
      // Flexbox
      "inline-flex items-center",
      "flex-col",
      // Transitions and Shape
      "transition-shadow",
      "rounded-md",
      // Colors
      "bg-surface-0",
      "dark:bg-transparent",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Misc
      "overflow-hidden",
      { "cursor-pointer": !props.readonly }
    ]
  }),
  step: ({ context, props }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Position
      "z-20",
      // Shape
      "rounded-full",
      "border",
      // Size
      "w-[2rem]",
      "h-[2rem]",
      "text-sm",
      "leading-[2rem]",
      // Colors
      {
        "text-surface-400 dark:text-white/60": !context.active,
        "border-surface-100 dark:border-surface-700": !context.active,
        "bg-surface-0 dark:bg-surface-800": !context.active,
        "bg-primary-500 dark:bg-primary-400": context.active,
        "border-primary-500 dark:border-primary-400": context.active,
        "text-surface-0 dark:text-surface-900": context.active
      },
      // States
      {
        "hover:border-surface-300 dark:hover:border-surface-500": !context.active && !props.readonly
      },
      // Transition
      "transition-colors duration-200 ease-in-out"
    ]
  }),
  label: ({ context }) => ({
    class: [
      // Font
      "leading-5",
      { "font-bold": context.active },
      // Display
      "block",
      // Spacing
      "mt-2",
      // Colors
      { "text-surface-400 dark:text-white/60": !context.active, "text-surface-800 dark:text-white/80": context.active },
      // Text and Overflow
      "whitespace-nowrap",
      "overflow-hidden",
      "overflow-ellipsis",
      "max-w-full"
    ]
  })
};
const stepper = {
  root: ({ props }) => ({
    class: ["flex-1", props.orientation === "vertical" ? "flex-col" : "flex-row"]
  }),
  nav: ({ props }) => ({
    class: ["flex", "justify-between", "items-center", "relative", "list-none", "overflow-x-auto", props.orientation === "vertical" ? "p-0" : "px-96"]
  }),
  stepperpanel: {
    panel: ({ context, parent }) => ({
      class: [context.active ? "flex-1" : "", parent.props.orientation === "vertical" ? "flex flex-col flex-initial" : ""]
    }),
    header: ({ parent, context }) => ({
      class: [
        // Position
        "relative",
        // Flexbox
        "flex",
        "items-center",
        context.last ? "flex-initial" : "flex-1",
        parent.props.orientation === "vertical" ? "flex-initial" : "",
        // Spacing
        "p-2"
      ]
    }),
    action: {
      class: ["border-0", "border-none", "inline-flex", "items-center", "text-decoration-none", "transition", "transition-shadow", "duration-200", "rounded-md", "bg-transparent", "outline-none"]
    },
    number: ({ context }) => ({
      class: [
        // Flexbox
        "flex",
        "items-center",
        "justify-center",
        // Colors (Conditional)
        context.active ? "bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900" : "border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-0",
        // Adjust colors as needed
        // Size and Shape
        "min-w-[2rem]",
        "h-[2rem]",
        "line-height-[2rem]",
        "rounded-full",
        // Text
        "text-lg",
        // Borders
        context.active ? "border-0 border-none" : "border-solid border-2",
        // Transitions
        "transition",
        "transition-colors",
        "transition-shadow",
        "duration-200"
      ]
    }),
    title: ({ context }) => ({
      class: [
        // Layout
        "block",
        "whitespace-nowrap",
        "overflow-hidden",
        "text-ellipsis",
        "max-w-full",
        // Spacing
        "ml-2",
        // Text
        context.active ? "text-primary-500 dark:text-surface-0" : "text-surface-600 dark:text-surface-0/80",
        "font-medium",
        "font-poppins",
        " text-lg leading-8",
        // Transitions
        "transition",
        "transition-colors",
        "transition-shadow",
        "duration-200"
      ]
    }),
    separator: ({ context, state, parent }) => ({
      class: [
        // Colors (Conditional for active step)
        state.d_activeStep <= context.index ? "bg-surface-200 dark:bg-surface-700" : "bg-primary-500 dark:bg-primary-400",
        // Conditional for Vertical Orientation
        parent.props.orientation === "vertical" ? ["flex-none", "w-[2px]", "h-auto", "ml-[calc(1.29rem+2px)]"] : ["flex-1", "w-full", "h-[2px]", "ml-4"],
        // Transitions
        "transition-shadow",
        "duration-200"
      ]
    }),
    transition: {
      class: ["flex flex-1", "bg-surface-0 dark:bg-surface-800", "text-surface-900 dark:text-surface-0"],
      enterFromClass: "max-h-0",
      enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0"
    },
    content: ({ parent }) => ({
      class: [parent.props.orientation === "vertical" ? "w-full pl-4" : ""]
    })
  },
  panelcontainer: {
    class: ["bg-surface-0 dark:bg-surface-800", "text-surface-900 dark:text-surface-0", "p-4"]
  }
};
const tabmenu = {
  root: {
    class: "overflow-x-auto"
  },
  menu: {
    class: [
      // Flexbox
      "flex flex-1",
      // Spacing
      "list-none",
      "p-0 m-0",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "border-b-2 border-surface-200 dark:border-surface-700",
      "text-surface-900 dark:text-surface-0/80"
    ]
  },
  menuitem: {
    class: "mr-0"
  },
  action: ({ context, state }) => ({
    class: [
      "relative",
      // Font
      "font-bold",
      // Flexbox and Alignment
      "flex items-center",
      // Spacing
      "p-5",
      "-mb-[2px]",
      // Shape
      "border-b-2",
      "rounded-t-md",
      // Colors and Conditions
      {
        "border-surface-200 dark:border-surface-700": state.d_activeIndex !== context.index,
        "bg-surface-0 dark:bg-surface-800": state.d_activeIndex !== context.index,
        "text-surface-700 dark:text-surface-0/80": state.d_activeIndex !== context.index,
        "bg-surface-0 dark:bg-surface-800": state.d_activeIndex === context.index,
        "border-primary-500 dark:border-primary-400": state.d_activeIndex === context.index,
        "text-primary-500 dark:text-primary-400": state.d_activeIndex === context.index
      },
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset",
      "focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      {
        "hover:bg-surface-0 dark:hover:bg-surface-800/80": state.d_activeIndex !== context.index,
        "hover:border-surface-400 dark:hover:border-primary-400": state.d_activeIndex !== context.index,
        "hover:text-surface-900 dark:hover:text-surface-0": state.d_activeIndex !== context.index
      },
      // Transitions
      "transition-all duration-200",
      // Misc
      "cursor-pointer select-none text-decoration-none",
      "overflow-hidden",
      "user-select-none"
    ]
  }),
  icon: {
    class: "mr-2"
  }
};
const tabview = {
  navContainer: ({ props }) => ({
    class: [
      // Position
      "relative",
      // Misc
      { "overflow-hidden": props.scrollable }
    ]
  }),
  navContent: {
    class: [
      // Overflow and Scrolling
      "overflow-y-hidden overscroll-contain",
      "overscroll-auto",
      "scroll-smooth",
      "[&::-webkit-scrollbar]:hidden"
    ]
  },
  previousButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Position
      "!absolute",
      "top-0 left-0",
      "z-20",
      // Size and Shape
      "h-full w-12",
      "rounded-none",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-primary-500 dark:text-primary-400",
      "shadow-md"
    ]
  },
  nextButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Position
      "!absolute",
      "top-0 right-0",
      "z-20",
      // Size and Shape
      "h-full w-12",
      "rounded-none",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-primary-500 dark:text-primary-400",
      "shadow-md"
    ]
  },
  nav: {
    class: [
      // Flexbox
      "flex flex-1",
      // Spacing
      "list-none",
      "p-0 m-0",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "border-b-2 border-surface-200 dark:border-surface-700",
      "text-surface-900 dark:text-surface-0/80"
    ]
  },
  tabpanel: {
    header: ({ props }) => ({
      class: [
        // Spacing
        "mr-0",
        // Misc
        {
          "opacity-60 cursor-default user-select-none select-none pointer-events-none": props == null ? void 0 : props.disabled
        }
      ]
    }),
    headerAction: ({ parent, context }) => ({
      class: [
        "relative",
        // Font
        "font-bold",
        // Flexbox and Alignment
        "flex items-center",
        // Spacing
        "p-5",
        "-mb-[2px]",
        // Shape
        "border-b-2",
        "rounded-t-md",
        // Colors and Conditions
        {
          "border-surface-200 dark:border-surface-700": parent.state.d_activeIndex !== context.index,
          "bg-surface-0 dark:bg-surface-800": parent.state.d_activeIndex !== context.index,
          "text-surface-700 dark:text-surface-0/80": parent.state.d_activeIndex !== context.index,
          "bg-surface-0 dark:bg-surface-800": parent.state.d_activeIndex === context.index,
          "border-primary-500 dark:border-primary-400": parent.state.d_activeIndex === context.index,
          "text-primary-500 dark:text-primary-400": parent.state.d_activeIndex === context.index
        },
        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset",
        "focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
        {
          "hover:bg-surface-0 dark:hover:bg-surface-800/80": parent.state.d_activeIndex !== context.index,
          "hover:border-surface-400 dark:hover:border-primary-400": parent.state.d_activeIndex !== context.index,
          "hover:text-surface-900 dark:hover:text-surface-0": parent.state.d_activeIndex !== context.index
        },
        // Transitions
        "transition-all duration-200",
        // Misc
        "cursor-pointer select-none text-decoration-none",
        "overflow-hidden",
        "user-select-none"
      ]
    }),
    headerTitle: {
      class: [
        // Text
        "leading-none",
        "whitespace-nowrap"
      ]
    },
    content: {
      class: [
        // Spacing
        "p-5",
        // Shape
        "rounded-b-md",
        // Colors
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-700 dark:text-surface-0/80",
        "border-0"
      ]
    }
  }
};
const tag = {
  root: ({ props }) => ({
    class: [
      //Font
      "text-xs font-bold",
      //Alignments
      "inline-flex items-center justify-center",
      //Spacing
      "px-2 py-1",
      //Shape
      {
        "rounded-md": !props.rounded,
        "rounded-full": props.rounded
      },
      //Colors
      "text-white dark:text-surface-900",
      {
        "bg-primary-500 dark:bg-primary-400": props.severity == null || props.severity == "primary",
        "bg-green-500 dark:bg-green-400": props.severity == "success",
        "bg-blue-500 dark:bg-blue-400": props.severity == "info",
        "bg-orange-500 dark:bg-orange-400": props.severity == "warning",
        "bg-red-500 dark:bg-red-400": props.severity == "danger"
      }
    ]
  }),
  value: {
    class: "leading-normal"
  },
  icon: {
    class: "mr-1 text-sm"
  }
};
const terminal = {
  root: {
    class: [
      // Spacing
      "p-5",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-900 text-white",
      "border border-surface-700",
      // Sizing & Overflow
      "h-72 overflow-auto"
    ]
  },
  container: {
    class: [
      // Flexbox
      "flex items-center"
    ]
  },
  prompt: {
    class: [
      // Color
      "text-surface-400"
    ]
  },
  response: {
    class: [
      // Color
      "text-primary-400"
    ]
  },
  command: {
    class: [
      // Color
      "text-primary-400"
    ]
  },
  commandtext: {
    class: [
      // Flexbox
      "flex-1 shrink grow-0",
      // Shape
      "border-0",
      // Spacing
      "p-0",
      // Color
      "bg-transparent text-inherit",
      // Outline
      "outline-none"
    ]
  }
};
const textarea = {
  root: ({ context, props }) => ({
    class: [
      // Font
      "font-sans leading-none",
      // Spacing
      "m-0",
      "p-3",
      // Shape
      "rounded-md",
      // Colors
      "text-surface-600 dark:text-surface-200",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "border",
      { "border-surface-300 dark:border-surface-600": !props.invalid },
      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },
      // States
      {
        "hover:border-primary-500 dark:hover:border-primary-400": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50": !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": context.disabled
      },
      // Misc
      "appearance-none",
      "transition-colors duration-200"
    ]
  })
};
const tieredmenu = {
  root: {
    class: [
      // Shape
      "rounded-md",
      // Size
      "min-w-[12rem]",
      "py-1",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  menuitem: {
    class: [
      // Position
      "relative"
    ]
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-none",
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": context.focused && !context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": context.focused && context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.active,
        "hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80": context.active
      },
      // Transitions
      "transition-shadow",
      "duration-200"
    ]
  }),
  action: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-3",
      "px-5",
      // Color
      "text-surface-700 dark:text-white/80",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  },
  label: {
    class: ["leading-none"]
  },
  submenuicon: {
    class: [
      // Position
      "ml-auto"
    ]
  },
  submenu: {
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "py-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Position
      "static sm:absolute",
      "z-10",
      // Color
      "bg-surface-0 dark:bg-surface-700"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  }
};
const toast = {
  root: ({ props }) => ({
    class: [
      //Size and Shape
      "w-96 rounded-md",
      // Positioning
      { "-translate-x-2/4": props.position == "top-center" || props.position == "bottom-center" }
    ]
  }),
  container: ({ props }) => ({
    class: [
      "my-4 rounded-md w-full",
      "border-solid border-0 border-l-[6px]",
      "backdrop-blur-[10px] shadow-md",
      // Colors
      {
        "bg-blue-100/70 dark:bg-blue-500/20": props.message.severity == "info",
        "bg-green-100/70 dark:bg-green-500/20": props.message.severity == "success",
        "bg-orange-100/70 dark:bg-orange-500/20": props.message.severity == "warn",
        "bg-red-100/70 dark:bg-red-500/20": props.message.severity == "error"
      },
      {
        "border-blue-500 dark:border-blue-400": props.message.severity == "info",
        "border-green-500 dark:border-green-400": props.message.severity == "success",
        "border-orange-500 dark:border-orange-400": props.message.severity == "warn",
        "border-red-500 dark:border-red-400": props.message.severity == "error"
      },
      {
        "text-blue-700 dark:text-blue-300": props.message.severity == "info",
        "text-green-700 dark:text-green-300": props.message.severity == "success",
        "text-orange-700 dark:text-orange-300": props.message.severity == "warn",
        "text-error dark:text-red-300": props.message.severity == "error"
      }
    ]
  }),
  content: {
    class: "flex items-start p-4"
  },
  icon: {
    class: [
      // Sizing and Spacing
      "w-6 h-6",
      "text-lg leading-none mr-2 shrink-0"
    ]
  },
  text: {
    class: [
      // Font and Text
      "text-lg leading-none",
      "ml-2",
      "flex-1"
    ]
  },
  summary: {
    class: "font-bold block"
  },
  detail: {
    class: "mt-2 block"
  },
  closebutton: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-8 h-8",
      // Spacing and Misc
      "ml-auto  relative",
      // Shape
      "rounded-full",
      // Colors
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:bg-surface-0/50 dark:hover:bg-surface-0/10",
      // Misc
      "overflow-hidden"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 translate-y-2/4",
    enterActiveClass: "transition-[transform,opacity] duration-300",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "!transition-[max-height_.45s_cubic-bezier(0,1,0,1),opacity_.3s,margin-bottom_.3s] overflow-hidden",
    leaveToClass: "max-h-0 opacity-0 mb-0"
  }
};
const togglebutton = {
  root: ({ props, context }) => ({
    class: [
      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",
      // Sizes & Spacing
      "px-4 py-3 leading-none",
      // Shapes
      "rounded-md border",
      // Colors
      {
        "bg-surface-0 dark:bg-surface-900 ": !props.modelValue,
        "border-surface-200 dark:border-surface-700 ": !props.modelValue,
        "text-surface-700 dark:text-white/80": !props.modelValue,
        "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900": props.modelValue
      },
      // States
      {
        "hover:bg-surface-50 dark:hover:bg-surface-800/80 hover:border-surface-200 dark:hover:bg-surface-700 hover:text-surface-700 dark:hover:text-white/80": !props.modelValue,
        "hover:bg-primary-600 hover:border-primary-600 dark:hover:bg-primary-300 dark:hover:border-primary-300": props.modelValue,
        "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": context.focused && !props.disabled
      },
      // Transitions
      "transition-all duration-200",
      // Misc
      { "cursor-pointer": !props.disabled, "opacity-60 select-none pointer-events-none cursor-default": props.disabled }
    ]
  }),
  label: {
    class: "font-bold text-center w-full"
  },
  icon: ({ props }) => ({
    class: [
      " mr-2",
      {
        "text-surface-600 dark:text-white/70": !props.modelValue,
        "text-white dark:text-surface-900": props.modelValue
      }
    ]
  })
};
const toolbar = {
  root: {
    class: [
      // Flex & Alignment
      "flex items-center justify-between flex-wrap",
      "gap-2",
      // Spacing
      "p-5",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-50 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  start: {
    class: "flex items-center"
  },
  center: {
    class: "flex items-center"
  },
  end: {
    class: "flex items-center"
  }
};
const tooltip = {
  root: ({ context, props }) => ({
    class: [
      // Position and Shadows
      "absolute",
      "",
      "",
      // Spacing
      {
        "py-0 px-1": (context == null ? void 0 : context.right) || (context == null ? void 0 : context.left) || !(context == null ? void 0 : context.right) && !(context == null ? void 0 : context.left) && !(context == null ? void 0 : context.top) && !(context == null ? void 0 : context.bottom),
        "py-1 px-0": (context == null ? void 0 : context.top) || (context == null ? void 0 : context.bottom)
      }
    ]
  }),
  arrow: ({ context, props }) => ({
    class: [
      // Position
      "absolute",
      "shadow-lg",
      "p-fadein",
      // Size
      "w-1",
      "h-1",
      // Shape
      "bg-transparent",
      "border-transparent",
      "border-solid",
      {
        "border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-surface-500": (context == null ? void 0 : context.right) || !(context == null ? void 0 : context.right) && !(context == null ? void 0 : context.left) && !(context == null ? void 0 : context.top) && !(context == null ? void 0 : context.bottom),
        "border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-surface-500": context == null ? void 0 : context.left,
        "border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-surface-500": context == null ? void 0 : context.top,
        "border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-surface-500": context == null ? void 0 : context.bottom
      },
      // Spacing
      {
        "-mt-1 ": (context == null ? void 0 : context.right) || !(context == null ? void 0 : context.right) && !(context == null ? void 0 : context.left) && !(context == null ? void 0 : context.top) && !(context == null ? void 0 : context.bottom),
        "-mt-1": context == null ? void 0 : context.left,
        "-ml-1": (context == null ? void 0 : context.top) || (context == null ? void 0 : context.bottom)
      }
    ]
  }),
  text: {
    class: ["p-3", "bg-surface-500 dark:bg-surface-200", "text-white dark:text-surface-200", "text-base", "leading-none", "rounded-md", "font-poppins font-normal", "break-words"]
  }
};
const tree = {
  root: {
    class: [
      // Space
      "p-5",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-white/80",
      "border border-solid border-surface-200 dark:border-surface-700"
    ]
  },
  wrapper: {
    class: ["overflow-auto"]
  },
  container: {
    class: [
      // Spacing
      "m-0 p-0",
      // Misc
      "list-none overflow-auto"
    ]
  },
  node: {
    class: ["p-1", "rounded-md", "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset focus:ring-primary-400/50 dark:focus:ring-primary-300/50"]
  },
  content: ({ context, props }) => ({
    class: [
      // Flex and Alignment
      "flex items-center",
      // Shape
      "rounded-md",
      // Spacing
      "p-2",
      // Colors
      "text-surface-600 dark:text-white/70",
      { "bg-primary-50 dark:bg-primary-400/30 text-primary-600 dark:text-surface-0": context.selected },
      // States
      { "hover:bg-surface-50 dark:hover:bg-surface-700/40": (props.selectionMode == "single" || props.selectionMode == "multiple") && !context.selected },
      // Transition
      "transition-shadow duration-200",
      { "cursor-pointer select-none": props.selectionMode == "single" || props.selectionMode == "multiple" }
    ]
  }),
  toggler: ({ context }) => ({
    class: [
      // Flex and Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "w-8 h-8",
      // Spacing
      "mr-2",
      // Colors
      "bg-transparent",
      {
        "text-surface-500 dark:text-white": !context.selected,
        "text-primary-600 dark:text-white": context.selected,
        invisible: context.leaf
      },
      // States
      "hover:bg-surface-200/20 dark:hover:bg-surface-500/20",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none"
    ]
  }),
  checkboxcontainer: {
    class: "mr-2"
  },
  checkbox: ({ context, props }) => ({
    class: [
      "relative",
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-6",
      "h-6",
      // Shape
      "rounded-lg",
      "border-2",
      // Colors
      "text-surface-600",
      {
        "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
        "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
      },
      // States
      "focus:outline-none focus:outline-offset-0",
      {
        "hover:border-primary-500 dark:hover:border-primary-400": !props.disabled,
        "ring ring-primary-400/50 dark:ring-primary-300/50": !props.disabled && context.focused,
        "cursor-default opacity-60": props.disabled
      },
      // Transitions
      "transition-colors",
      "duration-200",
      // Misc
      "cursor-pointer"
    ]
  }),
  checkboxicon: {
    class: [
      // Font
      "text-base leading-none",
      // Size
      "w-4",
      "h-4",
      // Colors
      "text-white dark:text-surface-900",
      // Transitions
      "transition-all",
      "duration-200"
    ]
  },
  nodeicon: {
    class: [
      // Space
      "mr-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  },
  subgroup: {
    class: ["m-0 list-none p-0 pl-2 mt-1"]
  },
  filtercontainer: {
    class: [
      "relative block",
      // Space
      "mb-2",
      // Size
      "w-full"
    ]
  },
  input: {
    class: [
      "relative",
      // Font
      "font-sans leading-none",
      // Spacing
      "m-0",
      "p-3 pr-10",
      // Size
      "w-full",
      // Shape
      "rounded-md",
      // Colors
      "text-surface-600 dark:text-surface-200",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-600",
      // States
      "hover:border-primary-500 dark:hover:border-primary-400",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50",
      // Transition & Misc
      "appearance-none",
      "transition-colors duration-200"
    ]
  },
  loadingicon: {
    class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin"]
  },
  searchicon: {
    class: [
      // Position
      "absolute top-1/2 -mt-2 right-3",
      // Color
      "text-surface-600 dark:hover:text-white/70"
    ]
  }
};
const treeselect = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      // Color and Background
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // Transitions
      "transition-all",
      "duration-200",
      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
      // Misc
      "cursor-pointer",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
    ]
  }),
  labelContainer: {
    class: ["overflow-hidden flex flex-auto cursor-pointer"]
  },
  label: {
    class: [
      "block leading-5",
      // Space
      "p-3",
      // Color
      "text-surface-800 dark:text-white/80",
      // Transition
      "transition duration-200",
      // Misc
      "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
    ]
  },
  trigger: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      // Shape
      "border-0 dark:border",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-800 dark:text-white/80",
      "dark:border-surface-700"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  tree: {
    root: {
      class: [
        // Space
        "p-5"
      ]
    },
    wrapper: {
      class: ["overflow-auto"]
    },
    container: {
      class: [
        // Spacing
        "m-0 p-0",
        // Misc
        "list-none overflow-auto"
      ]
    },
    node: {
      class: ["p-1", "rounded-md", "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset focus:ring-primary-400/50 dark:focus:ring-primary-300/50"]
    },
    content: ({ context, props }) => ({
      class: [
        // Flex and Alignment
        "flex items-center",
        // Shape
        "rounded-md",
        // Spacing
        "p-2",
        // Colors
        "text-surface-600 dark:text-white/70",
        { "bg-primary-50 dark:bg-primary-400/30 text-primary-600 dark:text-surface-0": context.selected },
        // States
        { "hover:bg-surface-50 dark:hover:bg-surface-700/40": (props.selectionMode == "single" || props.selectionMode == "multiple") && !context.selected },
        // Transition
        "transition-shadow duration-200",
        { "cursor-pointer select-none": props.selectionMode == "single" || props.selectionMode == "multiple" }
      ]
    }),
    toggler: ({ context }) => ({
      class: [
        // Flex and Alignment
        "inline-flex items-center justify-center",
        // Shape
        "border-0 rounded-full",
        // Size
        "w-8 h-8",
        // Spacing
        "mr-2",
        // Colors
        "bg-transparent",
        {
          "text-surface-500 dark:text-white": !context.selected,
          "text-primary-600 dark:text-white": context.selected,
          invisible: context.leaf
        },
        // States
        "hover:bg-surface-200/20 dark:hover:bg-surface-500/20",
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
        // Transition
        "transition duration-200",
        // Misc
        "cursor-pointer select-none"
      ]
    }),
    checkboxcontainer: {
      class: "mr-2"
    },
    checkbox: ({ context, props }) => ({
      class: [
        "relative",
        // Alignment
        "flex",
        "items-center",
        "justify-center",
        // Size
        "w-6",
        "h-6",
        // Shape
        "rounded-lg",
        "border-2",
        // Colors
        "text-surface-600",
        {
          "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        // States
        "focus:outline-none focus:outline-offset-0",
        {
          "hover:border-primary-500 dark:hover:border-primary-400": !props.disabled,
          "ring ring-primary-400/50 dark:ring-primary-300/50": !props.disabled && context.focused,
          "cursor-default opacity-60": props.disabled
        },
        // Transitions
        "transition-colors",
        "duration-200",
        // Misc
        "cursor-pointer"
      ]
    }),
    checkboxicon: {
      class: [
        // Font
        "text-base leading-none",
        // Size
        "w-4",
        "h-4",
        // Colors
        "text-white dark:text-surface-900",
        // Transitions
        "transition-all",
        "duration-200"
      ]
    },
    nodeicon: {
      class: [
        // Space
        "mr-2",
        // Color
        "text-surface-600 dark:text-white/70"
      ]
    },
    subgroup: {
      class: ["m-0 list-none p-0 pl-2 mt-1"]
    },
    filtercontainer: {
      class: [
        "relative block",
        // Space
        "mb-2",
        // Size
        "w-full"
      ]
    },
    input: {
      class: [
        "relative",
        // Font
        "font-sans leading-none",
        // Spacing
        "m-0",
        "p-3 pr-10",
        // Size
        "w-full",
        // Shape
        "rounded-md",
        // Colors
        "text-surface-600 dark:text-surface-200",
        "placeholder:text-surface-400 dark:placeholder:text-surface-500",
        "bg-surface-0 dark:bg-surface-900",
        "border border-surface-300 dark:border-surface-600",
        // States
        "hover:border-primary-500 dark:hover:border-primary-400",
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50",
        // Transition & Misc
        "appearance-none",
        "transition-colors duration-200"
      ]
    },
    loadingicon: {
      class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin"]
    },
    searchicon: {
      class: [
        // Position
        "absolute top-1/2 -mt-2 right-3",
        // Color
        "text-surface-600 dark:hover:text-white/70"
      ]
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const treetable = {
  root: ({ props }) => ({
    class: [
      "relative",
      {
        "flex flex-col h-full": props.scrollHeight === "flex"
      }
    ]
  }),
  loadingoverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",
      // Flex & Alignment
      "flex items-center justify-center",
      // Size
      "w-full h-full",
      // Color
      "bg-surface-100/40 dark:bg-surface-800/40",
      // Transition
      "transition duration-200"
    ]
  },
  loadingicon: {
    class: "w-8 h-8 animate-spin"
  },
  wrapper: ({ props }) => ({
    class: [
      // Overflow
      {
        "relative overflow-auto": props.scrollable,
        "overflow-x-auto": props.resizableColumns
      }
    ]
  }),
  header: ({ props }) => ({
    class: [
      "font-bold",
      // Shape
      props.showGridlines ? "border-x border-t border-b-0" : "border-y border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-50 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  }),
  footer: {
    class: [
      // Background, Border & Text
      "bg-slate-50 text-slate-700",
      "border border-x-0 border-t-0 border-surface-50",
      // Padding & Font
      "p-4 font-bold",
      // Dark Mode
      "dark:bg-surface-900 dark:text-white/70 dark:border-surface-700"
    ]
  },
  table: {
    class: [
      // Table & Width
      "border-collapse table-fixed w-full "
    ]
  },
  thead: ({ props }) => ({
    class: [
      // Position & Z-index
      {
        "top-0 z-40 sticky": props.scrollable
      }
    ]
  }),
  tbody: ({ props }) => ({
    class: [
      // Block Display
      {
        block: props.scrollable
      }
    ]
  }),
  tfoot: ({ props }) => ({
    class: [
      // Block Display
      {
        block: props.scrollable
      }
    ]
  }),
  headerrow: ({ props }) => ({
    class: [
      // Flexbox & Width
      {
        "flex flex-nowrap w-full": props.scrollable
      }
    ]
  }),
  row: ({ context, props }) => ({
    class: [
      // Flex
      { "flex flex-nowrap w-full": context.scrollable },
      // Color
      "dark:text-white/80",
      { "bg-primary-50 text-primary-700 dark:bg-primary-400/30": context.selected },
      { "bg-surface-0 text-surface-600 dark:bg-surface-800": !context.selected },
      // Hover & Flexbox
      {
        "hover:bg-surface-300/20 hover:text-surface-600": context.selectable && !context.selected
      },
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 ring-inset dark:focus:ring-primary-300/50",
      // Transition
      { "transition duration-200": props.selectionMode && !context.selected || props.rowHover }
    ]
  }),
  headercell: ({ context, props }) => ({
    class: [
      "font-bold",
      // Position
      { "sticky z-40": context.scrollable && context.scrollDirection === "both" && context.frozen },
      // Flex & Alignment
      {
        "flex flex-1 items-center": context.scrollable,
        "flex-initial shrink-0": context.scrollable && context.scrollDirection === "both" && !context.frozen
      },
      "text-left",
      // Shape
      { "first:border-l border-y border-r": context == null ? void 0 : context.showGridlines },
      "border-0 border-b border-solid",
      // Spacing
      (context == null ? void 0 : context.size) === "small" ? "p-2" : (context == null ? void 0 : context.size) === "large" ? "p-5" : "p-4",
      // Color
      (props.sortable === "" || props.sortable) && context.sorted ? "bg-primary-50 text-primary-700" : "bg-surface-50 text-surface-700",
      (props.sortable === "" || props.sortable) && context.sorted ? "dark:text-white dark:bg-primary-400/30" : "dark:text-white/80 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      // States
      { "hover:bg-surface-100 dark:hover:bg-surface-400/30": (props.sortable === "" || props.sortable) && !(context == null ? void 0 : context.sorted) },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      // Transition
      { "transition duration-200": props.sortable === "" || props.sortable },
      // Misc
      {
        "overflow-hidden relative bg-clip-padding": context.resizable && !context.frozen
      }
    ]
  }),
  column: {
    headercell: ({ context, props }) => ({
      class: [
        "font-bold",
        // Position
        { "sticky z-40": context.scrollable && context.scrollDirection === "both" && context.frozen },
        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0": context.scrollable && context.scrollDirection === "both" && !context.frozen
        },
        "text-left",
        // Shape
        { "first:border-l border-y border-r": context == null ? void 0 : context.showGridlines },
        "border-0 border-b border-solid",
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "p-2" : (context == null ? void 0 : context.size) === "large" ? "p-5" : "p-4",
        // Color
        (props.sortable === "" || props.sortable) && context.sorted ? "bg-primary-50 text-primary-700" : "bg-surface-50 text-surface-700",
        (props.sortable === "" || props.sortable) && context.sorted ? "dark:text-white dark:bg-primary-400/30" : "dark:text-white/80 dark:bg-surface-800",
        "border-surface-200 dark:border-surface-700",
        // States
        { "hover:bg-surface-100 dark:hover:bg-surface-400/30": (props.sortable === "" || props.sortable) && !(context == null ? void 0 : context.sorted) },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
        // Transition
        { "transition duration-200": props.sortable === "" || props.sortable },
        // Misc
        {
          "overflow-hidden relative bg-clip-padding": context.resizable && !context.frozen
        }
      ]
    }),
    bodycell: ({ context }) => ({
      class: [
        // Position
        {
          sticky: context.scrollable && context.scrollDirection === "both" && context.frozen
        },
        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0": context.scrollable && context.scrollDirection === "both" && !context.frozen
        },
        "text-left",
        // Shape
        "border-0 border-b border-solid",
        "border-surface-200 dark:border-surface-700",
        {
          "border-x-0 border-l-0": !context.showGridlines
        },
        { "first:border-l border-r border-b": context == null ? void 0 : context.showGridlines },
        // Color
        "bg-surface-0 dark:bg-surface-800",
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "p-2" : (context == null ? void 0 : context.size) === "large" ? "p-5" : "p-4",
        // Misc
        "dark:border-surface-700",
        {
          "cursor-pointer": context.selectable,
          sticky: context.scrollable && context.scrollDirection === "both" && context.frozen,
          "border-x-0 border-l-0": !context.showGridlines
        }
      ]
    }),
    rowtoggler: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left align-middle",
        // Spacing
        "m-0 mr-2 p-0",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-500 dark:text-white/70",
        "bg-transparent",
        // States
        "hover:bg-surface-50 dark:hover:bg-surface-700",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    sorticon: ({ context }) => ({
      class: ["ml-2 inline-block", context.sorted ? "fill-primary-700 dark:fill-white/80" : "fill-surface-700 dark:fill-white/70"]
    }),
    sortbadge: {
      class: [
        // Flex & Alignment
        "inline-flex items-center justify-center align-middle",
        // Shape
        "rounded-full",
        // Size
        "w-[1.143rem] leading-[1.143rem]",
        // Spacing
        "ml-2",
        // Color
        "text-primary-700 dark:text-white",
        "bg-primary-50 dark:bg-primary-400/30"
      ]
    },
    columnresizer: {
      class: [
        "block",
        // Position
        "absolute top-0 right-0",
        // Sizing
        "w-2 h-full",
        // Spacing
        "m-0 p-0",
        // Color
        "border border-transparent",
        // Misc
        "cursor-col-resize"
      ]
    },
    checkboxwrapper: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex align-bottom",
        // Size
        "w-6 h-6",
        // Spacing
        "mr-2",
        // Misc
        "cursor-pointer select-none"
      ]
    },
    checkbox: ({ context }) => ({
      class: [
        // Flex & Alignment
        "flex items-center justify-center",
        // Shape
        "border-2 rounded-lg",
        // Size
        "w-6 h-6",
        // Color
        "text-surface-600",
        {
          "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        // States
        "focus:outline-none focus:outline-offset-0",
        {
          "ring ring-primary-400/50 dark:ring-primary-300/50": context.focused
        },
        // Transition
        "transition-colors duration-200",
        // Misc
        { "cursor-default opacity-60": context.disabled }
      ]
    }),
    checkboxicon: {
      class: [
        // Size
        "w-4 h-4",
        "text-base leading-none",
        // Color
        "text-white dark:text-surface-900",
        // Transition
        "transition-all duration-200"
      ]
    },
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  },
  resizehelper: {
    class: "absolute hidden w-[2px] z-20 bg-primary-500 dark:bg-primary-400"
  }
};
const tristatecheckbox = {
  root: {
    class: ["cursor-pointer inline-flex relative select-none align-bottom", "w-6 h-6"]
  },
  checkbox: ({ props, context }) => ({
    class: [
      "relative",
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-6",
      "h-6",
      // Shape
      "rounded-lg",
      "border-2",
      // Colors
      "text-surface-600",
      {
        "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": props.modelValue == null,
        "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": props.modelValue !== null
      },
      // States
      "focus:outline-none focus:outline-offset-0",
      {
        "hover:border-primary-500 dark:hover:border-primary-400": !props.disabled,
        "ring ring-primary-400/50 dark:ring-primary-300/50": !props.disabled && context.focused,
        "cursor-default opacity-60": props.disabled
      },
      // Transitions
      "transition-colors",
      "duration-200"
    ]
  }),
  checkicon: {
    class: [
      // Font
      "text-base leading-none",
      // Size
      "w-4",
      "h-4",
      // Colors
      "text-white dark:text-surface-900",
      // Transitions
      "transition-all",
      "duration-200"
    ]
  },
  uncheckicon: {
    class: [
      // Font
      "text-base leading-none",
      // Size
      "w-4",
      "h-4",
      // Colors
      "text-white dark:text-surface-900",
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }
};
const TailwindLara = {
  global: global$1,
  directives: {
    badge: badgedirective,
    ripple,
    tooltip
  },
  //forms
  autocomplete,
  dropdown,
  inputnumber,
  inputtext,
  calendar,
  checkbox,
  radiobutton,
  inputswitch,
  selectbutton,
  slider,
  chips,
  rating,
  multiselect,
  togglebutton,
  cascadeselect,
  listbox,
  colorpicker,
  inputgroup,
  inputgroupaddon,
  inputmask,
  knob,
  treeselect,
  tristatecheckbox,
  textarea,
  password,
  //buttons
  button,
  splitbutton,
  speeddial,
  //data
  paginator,
  datatable,
  tree,
  dataview,
  dataviewlayoutoptions,
  organizationchart,
  orderlist,
  picklist,
  treetable,
  //panels
  accordion,
  panel,
  fieldset,
  fileupload,
  card,
  tabview,
  divider,
  toolbar,
  scrollpanel,
  //menu
  contextmenu,
  menu,
  menubar,
  stepper,
  steps,
  tieredmenu,
  breadcrumb,
  panelmenu,
  megamenu,
  dock,
  tabmenu,
  //overlays
  dialog,
  overlaypanel,
  sidebar,
  confirmpopup,
  //messages
  message,
  inlinemessage,
  toast,
  //media
  carousel,
  //misc
  badge,
  avatar,
  avatargroup,
  tag,
  chip,
  progressbar,
  skeleton,
  scrolltop,
  terminal
};
const primevue_plugin_egKpok8Auk = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  var _a, _b;
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  const config2 = (_b = (_a = runtimeConfig == null ? void 0 : runtimeConfig.public) == null ? void 0 : _a.primevue) != null ? _b : {};
  const { usePrimeVue = true, options = {} } = config2;
  const pt = { pt: TailwindLara };
  usePrimeVue && vueApp.use(PrimeVue, { ...options, ...pt });
  vueApp.use(ConfirmationService);
  vueApp.use(DialogService);
  vueApp.use(ToastService);
  vueApp.directive("badge", BadgeDirective);
  vueApp.directive("tooltip", Tooltip);
  vueApp.directive("ripple", Ripple);
  vueApp.directive("styleclass", StyleClass);
  vueApp.directive("focustrap", FocusTrap);
  vueApp.directive("animateonscroll", AnimateOnScroll);
});
config.autoAddCss = false;
library.add(fas, far, fab, fad, fat, fal);
const fontawesome_KQNRGomcw2 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  switch_locale_path_ssr_5csfIgkrBP,
  i18n_sq1MuCrqbC,
  primevue_plugin_egKpok8Auk,
  fontawesome_KQNRGomcw2
];
const layouts = {};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a, _b;
      let layout2 = (_b = (_a = unref(props.name)) != null ? _a : route.meta.layout) != null ? _b : "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      var _a;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a = route.meta.layoutTransition) != null ? _a : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => {
          var _a;
          return name === ((_a = route.meta.layout) != null ? _a : "default");
        }
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!((_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index2 = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index2 < newRoute.matched.length - 1;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-col w-full"${_scopeId}><div class="flex fixed h-screen w-screen"${_scopeId}><div class="flex flex-col w-full"${_scopeId}><div class="flex flex-row h-full bg-secondary p-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
        _push2(`</div></div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col w-full" }, [
            createVNode("div", { class: "flex fixed h-screen w-screen" }, [
              createVNode("div", { class: "flex flex-col w-full" }, [
                createVNode("div", { class: "flex flex-row h-full bg-secondary p-4" }, [
                  createVNode(_component_NuxtPage)
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = (_a = _error.statusMessage) != null ? _a : is404 ? "Page Not Found" : "Internal Server Error";
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-D2p-gcB8.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-CkQpz7WR.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);
const entry$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: entry$1
}, Symbol.toStringTag, { value: "Module" }));

export { BaseStyle as B, ConnectedOverlayScrollHandler as C, DomHandler as D, FilterMatchMode as F, ObjectUtils as O, Ripple as R, ToastEventBus as T, UniqueComponentId as U, ZIndexUtils as Z, _export_sfc as _, navigateTo as a, useNuxtApp as b, useRuntimeConfig as c, withoutTrailingSlash as d, resolveUnrefHeadInput as e, useToast as f, FilterOperator as g, hasProtocol as h, injectHead as i, joinURL as j, FocusTrap as k, useStyle as l, _default as m, nuxtLinkDefaults as n, FilterService as o, parseQuery as p, primebus as q, resolveRouteObject as r, showError as s, Tooltip as t, useRouter as u, ConfirmationEventBus as v, withTrailingSlash as w, DynamicDialogEventBus as x, entry$2 as y };
//# sourceMappingURL=entry-DBH90M8C.mjs.map
