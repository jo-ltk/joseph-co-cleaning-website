// http-url:https://framerusercontent.com/modules/reIfQoC6JDjKBgIY2hAa/25mh0gJnl3vR8qCKR9zO/XN15OwYE0.js
import { jsx as _jsx2, jsxs as _jsxs2 } from "react/jsx-runtime";
import { addFonts as addFonts2, addPropertyControls as addPropertyControls2, ComponentViewportProvider, ControlType as ControlType2, cx as cx2, getFonts, getFontsFromSharedStyle, RichText, SmartComponentScopedContainer, SVG, useActiveVariantCallback as useActiveVariantCallback2, useComponentViewport as useComponentViewport2, useLocaleInfo as useLocaleInfo2, useOnVariantChange as useOnVariantChange2, useVariantState as useVariantState2, withCSS as withCSS2 } from "./framer.js";
import { LayoutGroup as LayoutGroup2, motion as motion2, MotionConfigContext as MotionConfigContext2 } from "./framer.js";
import * as React2 from "react";
import { useRef as useRef2 } from "react";

// Extracted SVG assets
const __svg_1 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 118 24\"><path d=\"M 106.551 2.927 C 106.252 2.006 104.948 2.006 104.649 2.927 L 103.13 7.601 C 102.996 8.013 102.612 8.291 102.179 8.291 L 97.265 8.291 C 96.296 8.291 95.894 9.531 96.677 10.101 L 100.653 12.989 C 101.003 13.244 101.15 13.695 101.016 14.107 L 99.498 18.781 C 99.198 19.703 100.253 20.469 101.036 19.899 L 105.012 17.011 C 105.363 16.756 105.837 16.756 106.188 17.011 L 110.164 19.899 C 110.947 20.469 112.002 19.702 111.702 18.781 L 110.184 14.107 C 110.05 13.695 110.197 13.244 110.547 12.989 L 114.523 10.101 C 115.306 9.531 114.904 8.291 113.935 8.291 L 109.021 8.291 C 108.588 8.291 108.204 8.013 108.07 7.601 Z M 82.551 2.927 C 82.251 2.006 80.948 2.006 80.649 2.927 L 79.13 7.601 C 78.996 8.013 78.613 8.292 78.18 8.292 L 73.265 8.292 C 72.296 8.292 71.894 9.532 72.677 10.102 L 76.653 12.99 C 77.003 13.245 77.15 13.696 77.016 14.108 L 75.498 18.781 C 75.198 19.703 76.253 20.469 77.036 19.899 L 81.012 17.011 C 81.363 16.756 81.837 16.756 82.188 17.011 L 86.163 19.899 C 86.947 20.469 88.002 19.703 87.703 18.781 L 86.183 14.108 C 86.049 13.696 86.196 13.244 86.547 12.99 L 90.523 10.101 C 91.307 9.531 90.903 8.292 89.935 8.292 L 85.021 8.292 C 84.588 8.292 84.204 8.014 84.07 7.602 L 82.55 2.926 Z M 58.551 2.927 C 58.251 2.006 56.948 2.006 56.649 2.927 L 55.13 7.601 C 54.996 8.013 54.613 8.292 54.18 8.292 L 49.265 8.292 C 48.296 8.292 47.894 9.532 48.677 10.102 L 52.653 12.99 C 53.003 13.245 53.15 13.696 53.016 14.108 L 51.498 18.781 C 51.198 19.703 52.253 20.469 53.036 19.899 L 57.012 17.011 C 57.363 16.756 57.837 16.756 58.188 17.011 L 62.163 19.899 C 62.947 20.469 64.002 19.703 63.703 18.781 L 62.183 14.108 C 62.049 13.696 62.196 13.244 62.547 12.99 L 66.523 10.101 C 67.307 9.531 66.903 8.292 65.935 8.292 L 61.021 8.292 C 60.588 8.292 60.204 8.014 60.07 7.602 L 58.55 2.926 Z M 34.551 2.927 C 34.251 2.006 32.948 2.006 32.649 2.927 L 31.13 7.601 C 30.996 8.013 30.613 8.292 30.18 8.292 L 25.265 8.292 C 24.296 8.292 23.893 9.532 24.677 10.102 L 28.653 12.99 C 29.003 13.245 29.15 13.696 29.016 14.108 L 27.498 18.781 C 27.198 19.703 28.253 20.469 29.036 19.899 L 33.012 17.011 C 33.363 16.756 33.837 16.756 34.188 17.011 L 38.163 19.899 C 38.947 20.469 40.002 19.703 39.703 18.781 L 38.183 14.108 C 38.049 13.696 38.196 13.244 38.547 12.99 L 42.523 10.101 C 43.306 9.531 42.903 8.292 41.935 8.292 L 37.021 8.292 C 36.588 8.292 36.204 8.014 36.07 7.602 L 34.55 2.926 Z M 10.551 2.927 C 10.251 2.006 8.948 2.006 8.649 2.927 L 7.13 7.601 C 6.996 8.013 6.613 8.292 6.18 8.292 L 1.264 8.292 C 0.295 8.292 -0.107 9.532 0.676 10.102 L 4.652 12.99 C 5.002 13.245 5.149 13.696 5.015 14.108 L 3.498 18.78 C 3.198 19.702 4.253 20.468 5.036 19.898 L 9.012 17.01 C 9.363 16.755 9.837 16.755 10.188 17.01 L 14.164 19.898 C 14.947 20.468 16.002 19.702 15.702 18.78 L 14.184 14.107 C 14.05 13.695 14.197 13.244 14.547 12.989 L 18.523 10.1 C 19.307 9.53 18.903 8.291 17.935 8.291 L 13.021 8.291 C 12.588 8.291 12.204 8.013 12.07 7.601 L 10.55 2.926 Z\" fill=\"var(--token-ad96cd96-c832-459f-bb48-2ba796f3179b, rgb(245, 182, 20))\"></path></svg>";


// http-url:https://framerusercontent.com/modules/z6QuL166GSjhrOr7sAbp/u979kkxKEFzOhAUudBZf/Iz6fkU9FB.js
import { fontStore } from "./framer.js";
fontStore.loadFonts(["FS;Manrope-regular", "FS;Manrope-bold"]);
var fonts = [{
  explicitInter: true,
  fonts: [{
    family: "Manrope",
    source: "fontshare",
    style: "normal",
    url: "https://framerusercontent.com/third-party-assets/fontshare/wf/2TYFCBHUANEXS6QGR5EQDUNAFH6LSWM3/AYNOU3VEA4LRTDNKJQUFNVNUTYSGOUOP/UXO4O7K2G3HI3D2VKD7UXVJVJD26P4BQ.woff2",
    weight: "400"
  }, {
    family: "Manrope",
    source: "fontshare",
    style: "normal",
    url: "https://framerusercontent.com/third-party-assets/fontshare/wf/NGBUP45ES3F7RD5XGKPEDJ6QEPO4TMOK/EXDVWJ2EDDVVV65UENMX33EDDYBX6OF7/6P4FPMFQH7CCC7RZ4UU4NKSGJ2RLF7V5.woff2",
    weight: "700"
  }]
}];
var css = ['.framer-MnHLN .framer-styles-preset-1yhjbal:not(.rich-text-wrapper), .framer-MnHLN .framer-styles-preset-1yhjbal.rich-text-wrapper p { --framer-font-family: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-family-bold: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-letter-spacing: 0em; --framer-line-height: 1.5em; --framer-paragraph-spacing: 20px; --framer-text-alignment: start; --framer-text-color: var(--token-28d21c18-0fa7-4a39-8727-636fc79ae338, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className = "framer-MnHLN";

// http-url:https://framerusercontent.com/modules/y58EgkHCQ7uRvPLh1th9/pIhhnyQY5CaJqyYTh868/WJJyCc90q.js
import { fontStore as fontStore2 } from "./framer.js";
fontStore2.loadFonts(["FS;Manrope-medium", "FS;Manrope-bold"]);
var fonts2 = [{
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
var css2 = ['.framer-kVMze .framer-styles-preset-pbqkq1:not(.rich-text-wrapper), .framer-kVMze .framer-styles-preset-pbqkq1.rich-text-wrapper h3 { --framer-font-family: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-family-bold: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 32px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-variation-axes: normal; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-letter-spacing: -0.03em; --framer-line-height: 1.3em; --framer-paragraph-spacing: 40px; --framer-text-alignment: left; --framer-text-color: var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, #000000); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }', '@media (max-width: 1199px) and (min-width: 810px) { .framer-kVMze .framer-styles-preset-pbqkq1:not(.rich-text-wrapper), .framer-kVMze .framer-styles-preset-pbqkq1.rich-text-wrapper h3 { --framer-font-family: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-family-bold: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 28px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-variation-axes: normal; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-letter-spacing: -0.03em; --framer-line-height: 1.3em; --framer-paragraph-spacing: 40px; --framer-text-alignment: left; --framer-text-color: var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, #000000); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; } }', '@media (max-width: 809px) and (min-width: 0px) { .framer-kVMze .framer-styles-preset-pbqkq1:not(.rich-text-wrapper), .framer-kVMze .framer-styles-preset-pbqkq1.rich-text-wrapper h3 { --framer-font-family: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-family-bold: "Manrope", "Manrope Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 24px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-variation-axes: normal; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-letter-spacing: -0.03em; --framer-line-height: 1.4em; --framer-paragraph-spacing: 40px; --framer-text-alignment: left; --framer-text-color: var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, #000000); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; } }'];
var className2 = "framer-kVMze";

// http-url:https://framerusercontent.com/modules/gKGpfwi5lOsH13d4RWTL/9eTBMoL46LRQ1lvlauPw/ML6jbCMjZ.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getLoadingLazyAtYPosition, Image, useActiveVariantCallback, useComponentViewport, useLocaleInfo, useOnVariantChange, useVariantState, withCSS } from "./framer.js";
import { LayoutGroup, motion, MotionConfigContext } from "./framer.js";
import * as React from "react";
import { useRef } from "react";
import { jsx as _ctxJsx } from "react/jsx-runtime";
import { ContextProviders, WithResponsiveVariants } from "./context.jsx";

var cycleOrder = ["ySuVEiaxp", "vwiqzPlfq", "vv5iIWWfH"];
var serializationHash = "framer-I1AMp";
var variantClassNames = {
  vv5iIWWfH: "framer-v-sg5qs8",
  vwiqzPlfq: "framer-v-1n8feyb",
  ySuVEiaxp: "framer-v-3ti3qf"
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
var transition2 = {
  delay: 0,
  duration: 7.7,
  ease: [0.12, 0.23, 0.5, 1],
  type: "tween"
};
var toResponsiveImage = value => {
  if (typeof value === "object" && value !== null && typeof value.src === "string") {
    return value;
  }
  return typeof value === "string" ? {
    src: value
  } : void 0;
};
var transformTemplate1 = (_, t) => `translateY(-50%) ${t}`;
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
  "Selected Colored": "vv5iIWWfH",
  Main: "ySuVEiaxp",
  Selected: "vwiqzPlfq"
};
var getProps = ({
  click,
  height,
  id,
  image,
  width,
  ...props
}) => {
  return {
    ...props,
    INcP_fVGc: image ?? props.INcP_fVGc ?? {
      alt: "",
      src: "https://framerusercontent.com/images/CD3L3PqkdrNUHs06U58RQxOMo.png?scale-down-to=512",
      srcSet: "https://framerusercontent.com/images/CD3L3PqkdrNUHs06U58RQxOMo.png?scale-down-to=512 512w,https://framerusercontent.com/images/CD3L3PqkdrNUHs06U58RQxOMo.png 1024w"
    },
    MDZ6kxuhF: click ?? props.MDZ6kxuhF,
    variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "ySuVEiaxp"
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
    className: className3,
    layoutId,
    variant,
    MDZ6kxuhF,
    INcP_fVGc,
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
    defaultVariant: "ySuVEiaxp",
    ref: refBinding,
    variant,
    variantClassNames
  });
  const layoutDependency = createLayoutDependency(props, variants);
  const {
    activeVariantCallback,
    delay
  } = useActiveVariantCallback(baseVariant);
  const onAppearo1svtp = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("vv5iIWWfH", true), 300);
  });
  const onTapm1kxd1 = activeVariantCallback(async (...args) => {
    if (MDZ6kxuhF) {
      const res = await MDZ6kxuhF(...args);
      if (res === false) return false;
    }
  });
  useOnVariantChange(baseVariant, {
    vwiqzPlfq: onAppearo1svtp
  });
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return <LayoutGroup id={layoutId ?? defaultLayoutId}>{<Variants animate={variants} initial={false}>{<Transition value={transition1} {...addPropertyOverrides({
        vv5iIWWfH: {
          value: transition2
        }
      }, baseVariant, gestureVariant)}>{_jsxs(motion.div, {
          ...restProps,
          ...gestureHandlers,
          className: cx(scopingClassNames, "framer-3ti3qf", className3, classNames),
          "data-framer-name": "Main",
          layoutDependency,
          layoutId: "ySuVEiaxp",
          ref: refBinding,
          style: {
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            ...style
          },
          ...addPropertyOverrides({
            vv5iIWWfH: {
              "data-framer-name": "Selected Colored"
            },
            vwiqzPlfq: {
              "data-framer-name": "Selected",
              "data-highlight": true
            }
          }, baseVariant, gestureVariant),
          children: [_jsx(motion.div, {
            className: "framer-xya6pb",
            "data-framer-name": "Colored Photo Container",
            layoutDependency,
            layoutId: "PeRAFEbVx",
            style: {
              opacity: 0
            },
            variants: {
              vv5iIWWfH: {
                opacity: 1
              },
              vwiqzPlfq: {
                opacity: 1
              }
            },
            children: <Image background={{
              alt: "",
              fit: "fill",
              loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + 0 + (((componentViewport?.height || 200) - 0) * 0.5000000000000002 - 20)),
              sizes: "48px",
              ...toResponsiveImage(INcP_fVGc)
            }} className="framer-1yvt9tz" data-framer-name="Colored Photo" data-highlight layoutDependency={layoutDependency} layoutId="Q8M_43NdY" onTap={onTapm1kxd1} style={{
              borderBottomLeftRadius: "50%",
              borderBottomRightRadius: "50%",
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "50%",
              filter: "grayscale(0)",
              WebkitFilter: "grayscale(0)"
            }} transformTemplate={transformTemplate1} />
          }), <Image background={{
            alt: "",
            fit: "fill",
            loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + (0 + ((componentViewport?.height || 200) - 0 - 408) / 2)),
            sizes: "40px",
            ...toResponsiveImage(INcP_fVGc)
          }} className="framer-1uhodvp" data-framer-name="Grayscale Photo" data-highlight layoutDependency={layoutDependency} layoutId="cswF641tK" onTap={onTapm1kxd1} style={{
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            filter: "grayscale(1)",
            WebkitFilter: "grayscale(1)"
          }} {...addPropertyOverrides({
            vv5iIWWfH: {
              background: {
                alt: "",
                fit: "fill",
                loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + (0 + ((componentViewport?.height || 200) - 0 - 40) / 2)),
                sizes: "48px",
                ...toResponsiveImage(INcP_fVGc)
              }
            },
            vwiqzPlfq: {
              background: {
                alt: "",
                fit: "fill",
                loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + (0 + ((componentViewport?.height || 200) - 0 - 40) / 2)),
                sizes: "48px",
                ...toResponsiveImage(INcP_fVGc)
              }
            }
          }, baseVariant, gestureVariant)} />]
        })}</Transition>}</Variants>}</LayoutGroup>;
});
var css3 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-I1AMp.framer-16bj2l2, .framer-I1AMp .framer-16bj2l2 { display: block; }", ".framer-I1AMp.framer-3ti3qf { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-I1AMp .framer-xya6pb { bottom: 0px; flex: none; left: -1px; overflow: hidden; position: absolute; top: 0px; width: 1px; z-index: 1; }", ".framer-I1AMp .framer-1yvt9tz { aspect-ratio: 1 / 1; cursor: pointer; flex: none; height: var(--framer-aspect-ratio-supported, 40px); left: 0px; overflow: hidden; position: absolute; top: 50%; width: 48px; will-change: var(--framer-will-change-override, transform); }", ".framer-I1AMp .framer-1uhodvp { aspect-ratio: 1 / 1; cursor: pointer; flex: none; height: var(--framer-aspect-ratio-supported, 408px); overflow: hidden; position: relative; width: 40px; will-change: var(--framer-will-change-override, transform); }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-I1AMp.framer-3ti3qf { gap: 0px; } .framer-I1AMp.framer-3ti3qf > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-I1AMp.framer-3ti3qf > :first-child { margin-left: 0px; } .framer-I1AMp.framer-3ti3qf > :last-child { margin-right: 0px; } }", ".framer-I1AMp.framer-v-1n8feyb .framer-1uhodvp, .framer-I1AMp.framer-v-sg5qs8 .framer-1uhodvp { height: var(--framer-aspect-ratio-supported, 40px); width: 48px; }", ".framer-I1AMp.framer-v-sg5qs8 .framer-xya6pb { left: 0px; width: 48px; }"];
var FramerML6jbCMjZ = withCSS(Component, css3, "framer-I1AMp");
var ML6jbCMjZ_default = FramerML6jbCMjZ;
FramerML6jbCMjZ.displayName = "Testimonial Author";
FramerML6jbCMjZ.defaultProps = {
  height: 40,
  width: 40
};
addPropertyControls(FramerML6jbCMjZ, {
  variant: {
    options: ["ySuVEiaxp", "vwiqzPlfq", "vv5iIWWfH"],
    optionTitles: ["Main", "Selected", "Selected Colored"],
    title: "Variant",
    type: ControlType.Enum
  },
  MDZ6kxuhF: {
    title: "Click",
    type: ControlType.EventHandler
  },
  INcP_fVGc: {
    __defaultAssetReference: "data:framer/asset-reference,CD3L3PqkdrNUHs06U58RQxOMo.png?originalFilename=image.png&preferredSize=auto",
    __vekterDefault: {
      alt: "",
      assetReference: "data:framer/asset-reference,CD3L3PqkdrNUHs06U58RQxOMo.png?originalFilename=image.png&preferredSize=auto"
    },
    title: "Image",
    type: ControlType.ResponsiveImage
  }
});
addFonts(FramerML6jbCMjZ, [{
  explicitInter: true,
  fonts: []
}], {
  supportsExplicitInterCodegen: true
});

// http-url:https://framerusercontent.com/modules/reIfQoC6JDjKBgIY2hAa/25mh0gJnl3vR8qCKR9zO/XN15OwYE0.js
var TestimonialAuthorFonts = getFonts(ML6jbCMjZ_default);
var cycleOrder2 = ["hhsGUVYNW", "ojgkNP01q", "DAblup47Q", "ELBHZvJ1x"];
var serializationHash2 = "framer-7NFOD";
var variantClassNames2 = {
  DAblup47Q: "framer-v-fd6hed",
  ELBHZvJ1x: "framer-v-1w97yxx",
  hhsGUVYNW: "framer-v-di1n94",
  ojgkNP01q: "framer-v-1247hjo"
};
function addPropertyOverrides2(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach(variant => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var numberToPixelString = value => {
  if (typeof value !== "number") return value;
  if (!Number.isFinite(value)) return void 0;
  return Math.max(0, value) + "px";
};
var transition12 = {
  delay: 0,
  duration: 0.3,
  ease: [0.12, 0.23, 0.5, 1],
  type: "tween"
};
var addImageAlt = (image, alt) => {
  if (!image || typeof image !== "object") {
    return;
  }
  return {
    ...image,
    alt
  };
};
var Transition2 = ({
  value,
  children
}) => {
  const config = React2.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({
    ...config,
    transition
  }), [JSON.stringify(transition)]);
  return <MotionConfigContext2.Provider value={contextValue}>{children}</MotionConfigContext2.Provider>;
};
var Variants2 = motion2.create(React2.Fragment);
var humanReadableVariantMap2 = {
  "Testimonial 1": "hhsGUVYNW",
  "Testimonial 2": "ojgkNP01q",
  "Testimonial 3": "DAblup47Q",
  "Testimonial 4": "ELBHZvJ1x"
};
var getProps2 = ({
  height,
  id,
  padding,
  width,
  ...props
}) => {
  return {
    ...props,
    oYurli1eg: padding ?? props.oYurli1eg ?? "160px 40px 160px 40px",
    variant: humanReadableVariantMap2[props.variant] ?? props.variant ?? "hhsGUVYNW"
  };
};
var createLayoutDependency2 = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component2 = React2.forwardRef(function (props, ref) {
  const fallbackRef = useRef2(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const {
    activeLocale,
    setLocale
  } = useLocaleInfo2();
  const componentViewport = useComponentViewport2();
  const {
    style,
    className: className3,
    layoutId,
    variant,
    oYurli1eg,
    ...restProps
  } = getProps2(props);
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
  } = useVariantState2({
    cycleOrder: cycleOrder2,
    defaultVariant: "hhsGUVYNW",
    ref: refBinding,
    variant,
    variantClassNames: variantClassNames2
  });
  const layoutDependency = createLayoutDependency2(props, variants);
  const {
    activeVariantCallback,
    delay
  } = useActiveVariantCallback2(baseVariant);
  const onAppear19m5e2 = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("ojgkNP01q", true), 8e3);
  });
  const onAppearxkus5l = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("DAblup47Q", true), 8e3);
  });
  const onAppear1cy084l = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("ELBHZvJ1x", true), 8e3);
  });
  const onAppear6erhlv = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("hhsGUVYNW", true), 8e3);
  });
  const MDZ6kxuhF1r76y5u = activeVariantCallback(async (...args) => {
    setVariant("hhsGUVYNW");
  });
  const MDZ6kxuhFf5jk3x = activeVariantCallback(async (...args) => {
    setVariant("ojgkNP01q");
  });
  const MDZ6kxuhF725huy = activeVariantCallback(async (...args) => {
    setVariant("DAblup47Q");
  });
  const MDZ6kxuhF9224v0 = activeVariantCallback(async (...args) => {
    setVariant("ELBHZvJ1x");
  });
  useOnVariantChange2(baseVariant, {
    DAblup47Q: onAppear1cy084l,
    default: onAppear19m5e2,
    ELBHZvJ1x: onAppear6erhlv,
    ojgkNP01q: onAppearxkus5l
  });
  const sharedStyleClassNames = [className2, className];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  return <LayoutGroup2 id={layoutId ?? defaultLayoutId}>{<Variants2 animate={variants} initial={false}>{<Transition2 value={transition12}>{_jsx2(motion2.section, {
          ...restProps,
          ...gestureHandlers,
          className: cx2(scopingClassNames, "framer-di1n94", className3, classNames),
          "data-framer-name": "Testimonial 1",
          "data-highlight": true,
          layoutDependency,
          layoutId: "hhsGUVYNW",
          ref: refBinding,
          style: {
            "--1mexm9j": numberToPixelString(oYurli1eg),
            backgroundColor: "var(--token-28d21c18-0fa7-4a39-8727-636fc79ae338, rgb(255, 255, 255))",
            ...style
          },
          ...addPropertyOverrides2({
            DAblup47Q: {
              "data-framer-name": "Testimonial 3"
            },
            ELBHZvJ1x: {
              "data-framer-name": "Testimonial 4"
            },
            ojgkNP01q: {
              "data-framer-name": "Testimonial 2"
            }
          }, baseVariant, gestureVariant),
          children: _jsx2(motion2.div, {
            className: "framer-1grwh1j",
            "data-framer-name": "Container",
            layoutDependency,
            layoutId: "njQmKZ4en",
            children: _jsxs2(motion2.div, {
              className: "framer-95qcoa",
              "data-framer-name": "Testimonials",
              layoutDependency,
              layoutId: "SIDOHAA4n",
              children: [_jsxs2(motion2.div, {
                className: "framer-1ifa1g",
                "data-framer-name": "Testimonial",
                layoutDependency,
                layoutId: "to3JstioV",
                children: [_jsxs2(motion2.div, {
                  className: "framer-1x4g0g6",
                  "data-framer-name": "Body",
                  layoutDependency,
                  layoutId: "i1RWpXl4K",
                  children: [<SVG className="framer-mrj9wp" data-framer-name="Stars Vector" layout="position" layoutDependency={layoutDependency} layoutId="kaxFyLHmW" opacity={1} svg={__svg_1} svgContentId={12214099448} withExternalLayout />, <RichText __fromCanvasComponent className="framer-nkurqb" data-framer-name="Testimonial Text" fonts={["Inter"]} layoutDependency={layoutDependency} layoutId="mjX1ibVM5" style={{
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline"
                  }} verticalAlignment="top" withExternalLayout {...addPropertyOverrides2({
                    DAblup47Q: {
                      children: <React2.Fragment>{_jsx2(motion2.p, {
                          className: "framer-styles-preset-pbqkq1",
                          "data-styles-preset": "WJJyCc90q",
                          style: {
                            "--framer-text-alignment": "center"
                          },
                          children: "I\u2019ve learned more in the past few months with my coach than I did in years on my own. Their personalized approach made all the difference."
                        })}</React2.Fragment>
                    },
                    ELBHZvJ1x: {
                      children: <React2.Fragment>{_jsx2(motion2.p, {
                          className: "framer-styles-preset-pbqkq1",
                          "data-styles-preset": "WJJyCc90q",
                          style: {
                            "--framer-text-alignment": "center"
                          },
                          children: "Training with a coach who really knows the sport has been a game-changer. I\u2019ve shaved minutes off my time and am in the best shape of my life."
                        })}</React2.Fragment>
                    },
                    ojgkNP01q: {
                      children: <React2.Fragment>{_jsx2(motion2.p, {
                          className: "framer-styles-preset-pbqkq1",
                          "data-styles-preset": "WJJyCc90q",
                          style: {
                            "--framer-text-alignment": "center"
                          },
                          children: "The difference between training on your own and with an expert coach is huge. I\u2019ve never felt more confident and prepared for my races."
                        })}</React2.Fragment>
                    }
                  }, baseVariant, gestureVariant)}>{<React2.Fragment>{_jsx2(motion2.p, {
                        className: "framer-styles-preset-pbqkq1",
                        "data-styles-preset": "WJJyCc90q",
                        style: {
                          "--framer-text-alignment": "center"
                        },
                        children: "With the right coaching, I was able to push past my limits. I couldn't have reached my goals without the guidance and support of an experienced coach."
                      })}</React2.Fragment>}</RichText>]
                }), <RichText __fromCanvasComponent className="framer-e02ltn" data-framer-name="Author" fonts={["Inter"]} layoutDependency={layoutDependency} layoutId="dJFYu2lTH" style={{
                  "--extracted-r6o4lv": "var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, rgb(0, 0, 0))",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline"
                }} verticalAlignment="top" withExternalLayout {...addPropertyOverrides2({
                  DAblup47Q: {
                    children: <React2.Fragment>{_jsx2(motion2.p, {
                        className: "framer-styles-preset-1yhjbal",
                        "data-styles-preset": "Iz6fkU9FB",
                        style: {
                          "--framer-text-alignment": "center",
                          "--framer-text-color": "var(--extracted-r6o4lv, var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, rgb(0, 0, 0)))"
                        },
                        children: "Sarah Miller, Lawyer"
                      })}</React2.Fragment>
                  },
                  ELBHZvJ1x: {
                    children: <React2.Fragment>{_jsx2(motion2.p, {
                        className: "framer-styles-preset-1yhjbal",
                        "data-styles-preset": "Iz6fkU9FB",
                        style: {
                          "--framer-text-alignment": "center",
                          "--framer-text-color": "var(--extracted-r6o4lv, var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, rgb(0, 0, 0)))"
                        },
                        children: "James Carter, Journalist"
                      })}</React2.Fragment>
                  },
                  ojgkNP01q: {
                    children: <React2.Fragment>{_jsx2(motion2.p, {
                        className: "framer-styles-preset-1yhjbal",
                        "data-styles-preset": "Iz6fkU9FB",
                        style: {
                          "--framer-text-alignment": "center",
                          "--framer-text-color": "var(--extracted-r6o4lv, var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, rgb(0, 0, 0)))"
                        },
                        children: "David Thompson, Architect"
                      })}</React2.Fragment>
                  }
                }, baseVariant, gestureVariant)}>{<React2.Fragment>{_jsx2(motion2.p, {
                      className: "framer-styles-preset-1yhjbal",
                      "data-styles-preset": "Iz6fkU9FB",
                      style: {
                        "--framer-text-alignment": "center",
                        "--framer-text-color": "var(--extracted-r6o4lv, var(--token-1b7bb1c4-3a89-4ec2-aee2-16abaf604d08, rgb(0, 0, 0)))"
                      },
                      children: "Emily Johnson, Yoga Instructor"
                    })}</React2.Fragment>}</RichText>]
              }), _jsxs2(motion2.div, {
                className: "framer-qrf6e2",
                "data-framer-name": "Authors",
                layoutDependency,
                layoutId: "dJ6Uyteo6",
                children: [<ComponentViewportProvider height={40}>{<SmartComponentScopedContainer className="framer-1cn56xk-container" layoutDependency={layoutDependency} layoutId="YN1UQuse7-container" nodeId="YN1UQuse7" rendersWithMotion scopeId="XN15OwYE0">{<ML6jbCMjZ_default height="100%" id="YN1UQuse7" layoutId="YN1UQuse7" MDZ6kxuhF={MDZ6kxuhF1r76y5u} variant="vwiqzPlfq" width="100%" {...addPropertyOverrides2({
                      DAblup47Q: {
                        variant: "ySuVEiaxp"
                      },
                      ELBHZvJ1x: {
                        variant: "ySuVEiaxp"
                      },
                      ojgkNP01q: {
                        variant: "ySuVEiaxp"
                      }
                    }, baseVariant, gestureVariant)} />}</SmartComponentScopedContainer>}</ComponentViewportProvider>, <ComponentViewportProvider height={40}>{<SmartComponentScopedContainer className="framer-1xrv9ao-container" layoutDependency={layoutDependency} layoutId="VEWYNbgaA-container" nodeId="VEWYNbgaA" rendersWithMotion scopeId="XN15OwYE0">{<ML6jbCMjZ_default height="100%" id="VEWYNbgaA" INcP_fVGc={addImageAlt({
                      pixelHeight: 1024,
                      pixelWidth: 1024,
                      src: "https://framerusercontent.com/images/jwidccx1HGr0Ikx3zmSAJdtBOU.png?width=1024&height=1024",
                      srcSet: "https://framerusercontent.com/images/jwidccx1HGr0Ikx3zmSAJdtBOU.png?scale-down-to=512&width=1024&height=1024 512w,https://framerusercontent.com/images/jwidccx1HGr0Ikx3zmSAJdtBOU.png?width=1024&height=1024 1024w"
                    }, "")} layoutId="VEWYNbgaA" MDZ6kxuhF={MDZ6kxuhFf5jk3x} variant="ySuVEiaxp" width="100%" {...addPropertyOverrides2({
                      ojgkNP01q: {
                        variant: "vwiqzPlfq"
                      }
                    }, baseVariant, gestureVariant)} />}</SmartComponentScopedContainer>}</ComponentViewportProvider>, <ComponentViewportProvider height={40}>{<SmartComponentScopedContainer className="framer-14cfxim-container" layoutDependency={layoutDependency} layoutId="K2Tf9Lif5-container" nodeId="K2Tf9Lif5" rendersWithMotion scopeId="XN15OwYE0">{<ML6jbCMjZ_default height="100%" id="K2Tf9Lif5" INcP_fVGc={addImageAlt({
                      pixelHeight: 1024,
                      pixelWidth: 1024,
                      src: "https://framerusercontent.com/images/aIX32saaQEM73IN2MQsuknbz4Fw.png?width=1024&height=1024",
                      srcSet: "https://framerusercontent.com/images/aIX32saaQEM73IN2MQsuknbz4Fw.png?scale-down-to=512&width=1024&height=1024 512w,https://framerusercontent.com/images/aIX32saaQEM73IN2MQsuknbz4Fw.png?width=1024&height=1024 1024w"
                    }, "")} layoutId="K2Tf9Lif5" MDZ6kxuhF={MDZ6kxuhF725huy} variant="ySuVEiaxp" width="100%" {...addPropertyOverrides2({
                      DAblup47Q: {
                        variant: "vwiqzPlfq"
                      }
                    }, baseVariant, gestureVariant)} />}</SmartComponentScopedContainer>}</ComponentViewportProvider>, <ComponentViewportProvider height={40}>{<SmartComponentScopedContainer className="framer-1mveu6z-container" layoutDependency={layoutDependency} layoutId="Alxhetyn5-container" nodeId="Alxhetyn5" rendersWithMotion scopeId="XN15OwYE0">{<ML6jbCMjZ_default height="100%" id="Alxhetyn5" INcP_fVGc={addImageAlt({
                      pixelHeight: 1024,
                      pixelWidth: 1024,
                      src: "https://framerusercontent.com/images/x3RmbAAY64fTviZGAdyQxDzLTJI.png?width=1024&height=1024",
                      srcSet: "https://framerusercontent.com/images/x3RmbAAY64fTviZGAdyQxDzLTJI.png?scale-down-to=512&width=1024&height=1024 512w,https://framerusercontent.com/images/x3RmbAAY64fTviZGAdyQxDzLTJI.png?width=1024&height=1024 1024w"
                    }, "")} layoutId="Alxhetyn5" MDZ6kxuhF={MDZ6kxuhF9224v0} variant="ySuVEiaxp" width="100%" {...addPropertyOverrides2({
                      ELBHZvJ1x: {
                        variant: "vwiqzPlfq"
                      }
                    }, baseVariant, gestureVariant)} />}</SmartComponentScopedContainer>}</ComponentViewportProvider>]
              })]
            })
          })
        })}</Transition2>}</Variants2>}</LayoutGroup2>;
});
var css4 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-7NFOD.framer-1y53cxn, .framer-7NFOD .framer-1y53cxn { display: block; }", ".framer-7NFOD.framer-di1n94 { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: visible; padding: var(--1mexm9j); position: relative; width: 1200px; }", ".framer-7NFOD .framer-1grwh1j { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 32px; height: min-content; justify-content: center; max-width: 1120px; overflow: visible; padding: 0px; position: relative; width: 100%; }", ".framer-7NFOD .framer-95qcoa { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 32px; height: min-content; justify-content: center; max-width: 736px; overflow: hidden; padding: 0px; position: relative; width: 1px; }", ".framer-7NFOD .framer-1ifa1g { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 32px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }", ".framer-7NFOD .framer-1x4g0g6 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-7NFOD .framer-mrj9wp { flex: none; height: 24px; position: relative; width: 118px; }", ".framer-7NFOD .framer-nkurqb, .framer-7NFOD .framer-e02ltn { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }", ".framer-7NFOD .framer-qrf6e2 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-7NFOD .framer-1cn56xk-container, .framer-7NFOD .framer-1xrv9ao-container, .framer-7NFOD .framer-14cfxim-container, .framer-7NFOD .framer-1mveu6z-container { flex: none; height: auto; position: relative; width: auto; }", ...css2, ...css];
var FramerXN15OwYE0 = withCSS2(Component2, css4, "framer-7NFOD");
var XN15OwYE0_default = FramerXN15OwYE0;
FramerXN15OwYE0.displayName = "Testimonials";
FramerXN15OwYE0.defaultProps = {
  height: 629,
  width: 1200
};
addPropertyControls2(FramerXN15OwYE0, {
  variant: {
    options: ["hhsGUVYNW", "ojgkNP01q", "DAblup47Q", "ELBHZvJ1x"],
    optionTitles: ["Testimonial 1", "Testimonial 2", "Testimonial 3", "Testimonial 4"],
    title: "Variant",
    type: ControlType2.Enum
  },
  oYurli1eg: {
    defaultValue: "160px 40px 160px 40px",
    title: "Padding",
    type: ControlType2.Padding
  }
});
addFonts2(FramerXN15OwYE0, [{
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
}, ...TestimonialAuthorFonts, ...getFontsFromSharedStyle(fonts2), ...getFontsFromSharedStyle(fonts)], {
  supportsExplicitInterCodegen: true
});
var __FramerMetadata__ = {
  "exports": {
    "default": {
      "type": "reactComponent",
      "name": "FramerXN15OwYE0",
      "slots": [],
      "annotations": {
        "framerDisplayContentsDiv": "false",
        "framerIntrinsicWidth": "1200",
        "framerColorSyntax": "true",
        "framerComponentViewportWidth": "true",
        "framerAutoSizeImages": "true",
        "framerIntrinsicHeight": "629",
        "framerCanvasComponentVariantDetails": '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"ojgkNP01q":{"layout":["fixed","auto"]},"DAblup47Q":{"layout":["fixed","auto"]},"ELBHZvJ1x":{"layout":["fixed","auto"]}}}',
        "framerContractVersion": "1",
        "framerImmutableVariables": "true",
        "framerVariables": '{"oYurli1eg":"padding"}'
      }
    },
    "Props": {
      "type": "tsType",
      "annotations": {
        "framerContractVersion": "1"
      }
    },
    "__FramerMetadata__": {
      "type": "variable"
    }
  }
};
var _OriginalComponent = XN15OwYE0_default;
function TestimonialsWithContext(props) {
    return _ctxJsx(ContextProviders, { children: _ctxJsx(_OriginalComponent, { ...props }) });
}
Object.assign(TestimonialsWithContext, _OriginalComponent);
TestimonialsWithContext.Responsive = function TestimonialsResponsive({ variants, ...rest }) {
    return _ctxJsx(ContextProviders, {
        children: _ctxJsx(WithResponsiveVariants, { Component: _OriginalComponent, variants: variants || { base: undefined }, ...rest })
    });
};
export {  __FramerMetadata__, TestimonialsWithContext as default  };