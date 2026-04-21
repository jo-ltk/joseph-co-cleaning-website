// Auto-generated Framer context provider
// Wraps components with runtime contexts, LayoutGroup, and pre-injected CSS.
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useMemo, useSyncExternalStore } from "react";
import { prefetchDNS, preconnect } from "react-dom";
import {
    FormContext,
    LocaleInfoContext,
    LayoutGroup,
    FetchClientProvider,
    CustomCursorHost,
    combinedCSSRules,
} from "./framer.js";

const routesContext = createContext({});

function Hints() {
    try {
        prefetchDNS("https://fonts.gstatic.com");
        preconnect("https://fonts.gstatic.com");
        preconnect("https://framerusercontent.com");
    } catch {}
    return null;
}

// Pre-inject all Framer component CSS rules upfront
let cssInjected = false;
function InjectCSS() {
    if (cssInjected || typeof document === "undefined") return null;
    cssInjected = true;
    try {
        const rules = typeof combinedCSSRules !== "undefined" ? combinedCSSRules : [];
        if (rules.length > 0) {
            const style = document.createElement("style");
            style.setAttribute("data-framer-css", "");
            style.textContent = rules.join("\n");
            document.head.appendChild(style);
        }
    } catch {}
    return null;
}

export function ContextProviders({ children, locale }) {
    const localeInfo = useMemo(() => ({
        activeLocale: undefined,
        locales: [],
        setLocale: async () => {},
    }), []);

    let content = _jsx(routesContext.Provider, {
        value: {},
        children: _jsx(LocaleInfoContext, {
            value: localeInfo,
            children: _jsx(FormContext.Provider, {
                value: "",
                children: children,
            }),
        }),
    });

    try {
        if (CustomCursorHost) {
            content = _jsx(CustomCursorHost, { children: content });
        }
    } catch {}

    try {
        if (FetchClientProvider) {
            return _jsxs(FetchClientProvider, {
                children: [_jsx(Hints, {}), _jsx(InjectCSS, {}), content],
            });
        }
    } catch {}

    return _jsxs("div", {
        children: [_jsx(Hints, {}), _jsx(InjectCSS, {}), content],
    });
}

// ── FramerGroup — wrap multiple sibling Framer components for smooth layout animations ──
export function FramerGroup({ children }) {
    return _jsx(LayoutGroup, { children });
}

// ── Responsive wrapper ──────────────────────────────────────────
// Responsive breakpoint component — renders the correct variant based on viewport width
const BREAKPOINTS = { base: 0, sm: 320, md: 768, lg: 960, xl: 1200 };
const BP_NAMES = Object.keys(BREAKPOINTS).reverse();

function getBreakpoint() {
    if (typeof window === "undefined") return "lg";
    const w = window.innerWidth;
    return BP_NAMES.find((name) => w >= BREAKPOINTS[name]) || "base";
}

const onResize = (cb) => {
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
};

export function WithResponsiveVariants({ Component, variants, ...rest }) {
    const bp = useSyncExternalStore(onResize, getBreakpoint, () => "lg");

    // Find the variant for current breakpoint (fall back to smaller breakpoints)
    const bpOrder = ["base", "sm", "md", "lg", "xl"];
    let variant = variants.base;
    for (const name of bpOrder) {
        if (variants[name]) variant = variants[name];
        if (name === bp) break;
    }

    return _jsx(Component, { ...rest, variant });
}
