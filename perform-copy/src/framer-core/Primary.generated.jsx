// http-url:https://framerusercontent.com/modules/ioqsqLPPvbrpGaVRU9KC/W9cMAn3LT677AqI5HMJV/Zk3hfQiuj.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getFontsFromSharedStyle, Link, RichText, SVG, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "./framer.js";
import { LayoutGroup, motion, MotionConfigContext } from "./framer.js";
import * as React from "react";
import { useRef } from "react";

// Extracted SVG assets
const __svg_1 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 16 16\"><path d=\"M 15.066 8.566 C 15.216 8.416 15.301 8.212 15.301 8 C 15.301 7.788 15.216 7.584 15.066 7.434 L 9.975 2.344 C 9.775 2.133 9.476 2.047 9.195 2.12 C 8.913 2.192 8.693 2.412 8.62 2.693 C 8.547 2.975 8.632 3.274 8.843 3.474 L 13.37 8 L 8.844 12.525 C 8.531 12.838 8.531 13.344 8.844 13.657 C 9.157 13.97 9.663 13.97 9.976 13.657 Z M 0.5 8.8 L 14.5 8.8 L 14.5 7.2 L 0.5 7.2 Z\" fill=\"var(--token-28d21c18-0fa7-4a39-8727-636fc79ae338, rgb(255, 255, 255))\"></path></svg>";


// http-url:https://framerusercontent.com/modules/YPgeAIQnbCkv0qXesHZY/UiOZpDCqkdHrshNA2BPh/HLBx5FEd4.js
import { fontStore } from "./framer.js";
import { jsx as _ctxJsx } from "react/jsx-runtime";
import { ContextProviders, WithResponsiveVariants } from "./context.jsx";

fontStore.loadFonts(["FS;Manrope-medium", "FS;Manrope-bold"]);
var fonts = [{
  explicitInter: true,
  fonts: [{
    family: "Manrope",
    source: "fontshare",
    style: "normal",
    url: "https://framerusercontent.com/third-party-assets/fontshare/wf/BNWG6MUI4RTC6WEND2VPDH4MHMIVU3XZ/R5YXY5FMVG6PXU36GNEEA24MIPMEPGSM/CIM4KQCLZSMMLWPVH25IDDSTY4ENPHEY.woff2",
    weight: "500"
  }, {
    family: "Manrope",
    source: "fontshare",
    style: "normal",
    url: "https://framerusercontent.com/third-party-assets/fontshare/wf/NGBUP45ES3F7RD5XGKPEDJ6QEPO4TMOK/EXDVWJ2EDDVVV65UENMX33EDDYBX6OF7/6P4FPMFQH7CCC7RZ4UU4NKSGJ2RLF7V5.woff2",
    weight: "700"
  }]
}];
var css = ['.framer-7hkKy .framer-styles-preset-e9oeue:not(.rich-text-wrapper), .framer-7hkKy .framer-styles-preset-e9oeue.rich-text-wrapper p { --framer-font-family: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-family-bold: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-variation-axes: normal; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-letter-spacing: 0em; --framer-line-height: 1.5em; --framer-paragraph-spacing: 20px; --framer-text-alignment: start; --framer-text-color: var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, #000000); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className = "framer-7hkKy";

// http-url:https://framerusercontent.com/modules/ioqsqLPPvbrpGaVRU9KC/W9cMAn3LT677AqI5HMJV/Zk3hfQiuj.js
var enabledGestures = {
  LyFZOrU9R: {
    hover: true
  },
  Or_LZef1K: {
    hover: true
  }
};
var cycleOrder = ["Or_LZef1K", "LyFZOrU9R"];
var serializationHash = "framer-FySKL";
var variantClassNames = {
  LyFZOrU9R: "framer-v-1ryjbf",
  Or_LZef1K: "framer-v-1qpqz07"
};
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach(variant => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = {
  delay: 0,
  duration: 0.3,
  ease: [0.12, 0.23, 0.5, 1],
  type: "tween"
};
var Transition = ({
  value,
  children
}) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({
    ...config,
    transition
  }), [JSON.stringify(transition)]);
  return <MotionConfigContext.Provider value={contextValue}>{children}</MotionConfigContext.Provider>;
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = {
  "With Border": "LyFZOrU9R",
  Main: "Or_LZef1K"
};
var getProps = ({
  buttonText,
  height,
  id,
  link,
  width,
  ...props
}) => {
  return {
    ...props,
    qQ3voyXpF: link ?? props.qQ3voyXpF,
    uucThgTIi: buttonText ?? props.uucThgTIi ?? "Get a free quote",
    variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "Or_LZef1K"
  };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = React.forwardRef(function (props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const {
    activeLocale,
    setLocale
  } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const {
    style,
    className: className2,
    layoutId,
    variant,
    uucThgTIi,
    qQ3voyXpF,
    ...restProps
  } = getProps(props);
  const {
    baseVariant,
    classNames,
    clearLoadingGesture,
    gestureHandlers,
    gestureVariant,
    isLoading,
    setGestureState,
    setVariant,
    variants
  } = useVariantState({
    cycleOrder,
    defaultVariant: "Or_LZef1K",
    enabledGestures,
    ref: refBinding,
    variant,
    variantClassNames
  });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return <LayoutGroup id={layoutId ?? defaultLayoutId}>{<Variants animate={variants} initial={false}>{<Transition value={transition1}>{<Link href={qQ3voyXpF} motionChild nodeId="Or_LZef1K" openInNewTab={false} scopeId="Zk3hfQiuj" smoothScroll>{_jsxs(motion.a, {
            ...restProps,
            ...gestureHandlers,
            className: `${cx(scopingClassNames, "framer-1qpqz07", className2, classNames)} framer-1phqhrz`,
            "data-framer-name": "Main",
            layoutDependency,
            layoutId: "Or_LZef1K",
            ref: refBinding,
            style: {
              "--border-bottom-width": "0px",
              "--border-color": "rgba(0, 0, 0, 0)",
              "--border-left-width": "0px",
              "--border-right-width": "0px",
              "--border-style": "solid",
              "--border-top-width": "0px",
              backgroundColor: "var(--token-28d21c18-0fa7-4a39-8727-636fc79ae338, rgb(255, 255, 255))",
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              ...style
            },
            variants: {
              "LyFZOrU9R-hover": {
                backgroundColor: "var(--token-efb066bc-4faf-4160-9da6-c27b02a300f6, rgb(204, 204, 204))"
              },
              "Or_LZef1K-hover": {
                "--border-bottom-width": "0px",
                "--border-left-width": "0px",
                "--border-right-width": "0px",
                "--border-top-width": "0px",
                backgroundColor: "var(--token-efb066bc-4faf-4160-9da6-c27b02a300f6, rgb(204, 204, 204))"
              },
              LyFZOrU9R: {
                "--border-bottom-width": "1px",
                "--border-color": "var(--token-96b2b273-006d-4dd2-8d16-427f13d19d4a, rgb(225, 225, 225))",
                "--border-left-width": "1px",
                "--border-right-width": "1px",
                "--border-style": "solid",
                "--border-top-width": "1px",
                backgroundColor: "var(--token-c773fe8d-8aed-4719-9dcd-b57e1bc84fdb, rgb(242, 242, 242))"
              }
            },
            ...addPropertyOverrides({
              "LyFZOrU9R-hover": {
                "data-framer-name": void 0
              },
              "Or_LZef1K-hover": {
                "data-framer-name": void 0
              },
              LyFZOrU9R: {
                "data-border": true,
                "data-framer-name": "With Border"
              }
            }, baseVariant, gestureVariant),
            children: [<RichText __fromCanvasComponent className="framer-lcrz8y" data-framer-name="Button Text" fonts={["Inter"]} layoutDependency={layoutDependency} layoutId="hOGVEpiGm" style={{
              "--framer-paragraph-spacing": "0px"
            }} text={uucThgTIi} verticalAlignment="top" withExternalLayout>{<>{_jsx(motion.p, {
                  className: "framer-styles-preset-e9oeue",
                  "data-styles-preset": "HLBx5FEd4",
                  children: "Get a free quote"
                })}</>}</RichText>, _jsx(motion.div, {
              className: "framer-rsvt93",
              "data-framer-name": "Icon Container",
              layoutDependency,
              layoutId: "WShNXP46k",
              style: {
                backgroundColor: "var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, rgb(0, 0, 0))",
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "50%",
                borderTopLeftRadius: "50%",
                borderTopRightRadius: "50%"
              },
              children: _jsx(motion.div, {
                className: "framer-1qw1xy7",
                "data-framer-name": "Arrow Icon",
                layoutDependency,
                layoutId: "NojIUNRDX",
                style: {
                  rotate: -45
                },
                variants: {
                  "LyFZOrU9R-hover": {
                    rotate: 0
                  },
                  "Or_LZef1K-hover": {
                    rotate: 0
                  }
                },
                children: <SVG className="framer-mozi2p" data-framer-name="Arrow" layout="position" layoutDependency={layoutDependency} layoutId="AbDVViCEE" opacity={1} svg={__svg_1} svgContentId={10927283782} withExternalLayout />
              })
            })]
          })}</Link>}</Transition>}</Variants>}</LayoutGroup>;
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-FySKL.framer-1phqhrz, .framer-FySKL .framer-1phqhrz { display: block; }", ".framer-FySKL.framer-1qpqz07 { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 16px; height: 48px; justify-content: center; overflow: hidden; padding: 0px 4px 0px 24px; position: relative; text-decoration: none; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-FySKL .framer-lcrz8y { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", ".framer-FySKL .framer-rsvt93 { align-content: center; align-items: center; aspect-ratio: 1 / 1; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: var(--framer-aspect-ratio-supported, 40px); justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 40px; will-change: var(--framer-will-change-override, transform); }", ".framer-FySKL .framer-1qw1xy7 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; z-index: 1; }", ".framer-FySKL .framer-mozi2p { flex: none; height: 16px; position: relative; width: 16px; }", ...css, '.framer-FySKL[data-border="true"]::after, .framer-FySKL [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var FramerZk3hfQiuj = withCSS(Component, css2, "framer-FySKL");
var Zk3hfQiuj_default = FramerZk3hfQiuj;
FramerZk3hfQiuj.displayName = "Primary";
FramerZk3hfQiuj.defaultProps = {
  height: 48,
  width: 205
};
addPropertyControls(FramerZk3hfQiuj, {
  variant: {
    options: ["Or_LZef1K", "LyFZOrU9R"],
    optionTitles: ["Main", "With Border"],
    title: "Variant",
    type: ControlType.Enum
  },
  uucThgTIi: {
    defaultValue: "Get a free quote",
    displayTextArea: false,
    title: "Button Text",
    type: ControlType.String
  },
  qQ3voyXpF: {
    title: "Link",
    type: ControlType.Link
  }
});
addFonts(FramerZk3hfQiuj, [{
  explicitInter: true,
  fonts: [{
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
    url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2",
    weight: "400"
  }, {
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2",
    weight: "400"
  }, {
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+1F00-1FFF",
    url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2",
    weight: "400"
  }, {
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+0370-03FF",
    url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2",
    weight: "400"
  }, {
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
    url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2",
    weight: "400"
  }, {
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    url: "https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2",
    weight: "400"
  }, {
    cssFamilyName: "Inter",
    source: "framer",
    style: "normal",
    uiFamilyName: "Inter",
    unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
    url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2",
    weight: "400"
  }]
}, ...getFontsFromSharedStyle(fonts)], {
  supportsExplicitInterCodegen: true
});
var __FramerMetadata__ = {
  "exports": {
    "Props": {
      "type": "tsType",
      "annotations": {
        "framerContractVersion": "1"
      }
    },
    "default": {
      "type": "reactComponent",
      "name": "FramerZk3hfQiuj",
      "slots": [],
      "annotations": {
        "framerColorSyntax": "true",
        "framerIntrinsicWidth": "205",
        "framerVariables": '{"uucThgTIi":"buttonText","qQ3voyXpF":"link"}',
        "framerComponentViewportWidth": "true",
        "framerImmutableVariables": "true",
        "framerContractVersion": "1",
        "framerDisplayContentsDiv": "false",
        "framerAutoSizeImages": "true",
        "framerIntrinsicHeight": "48",
        "framerCanvasComponentVariantDetails": '{"propertyName":"variant","data":{"default":{"layout":["auto","fixed"]},"LyFZOrU9R":{"layout":["auto","fixed"]},"oaZzOyf5l":{"layout":["auto","fixed"]},"WgZxNUeTc":{"layout":["auto","fixed"]}}}'
      }
    },
    "__FramerMetadata__": {
      "type": "variable"
    }
  }
};
var _OriginalComponent = Zk3hfQiuj_default;
function PrimaryWithContext(props) {
    return _ctxJsx(ContextProviders, { children: _ctxJsx(_OriginalComponent, { ...props }) });
}
Object.assign(PrimaryWithContext, _OriginalComponent);
PrimaryWithContext.Responsive = function PrimaryResponsive({ variants, ...rest }) {
    return _ctxJsx(ContextProviders, {
        children: _ctxJsx(WithResponsiveVariants, { Component: _OriginalComponent, variants: variants || { base: undefined }, ...rest })
    });
};
export {  __FramerMetadata__, PrimaryWithContext as default  };