// http-url:https://framerusercontent.com/modules/cKtU7WoTyvjPZdRP19CL/jJGKI9rtjA9h37REgi9Q/CountUp.js

import { useEffect, useRef, useState } from "react";
import { addPropertyControls, ControlType } from "./framer.js";
import { jsx as _ctxJsx } from "react/jsx-runtime";
import { ContextProviders, WithResponsiveVariants } from "./context.jsx";

function CountUp(props) {
  const {
    targetNumber,
    duration,
    font,
    color,
    fontSize,
    lineHeight,
    fontWeight
  } = props;
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
        let start = 0;
        const increment = targetNumber / (duration * 60);
        const updateCounter = () => {
          start += increment;
          if (start < targetNumber) {
            setCount(Math.ceil(start));
            requestAnimationFrame(updateCounter);
          } else {
            setCount(targetNumber);
          }
        };
        updateCounter();
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetNumber, duration, hasAnimated]);
  return <div style={containerStyle} ref={ref}>{<span style={{
      ...textStyle,
      fontFamily: font,
      color,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      fontWeight,
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.5s ease-in-out"
    }}>{count.toLocaleString()}+</span>}</div>;
}
var containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
};
var textStyle = {
  letterSpacing: "0em",
  textAlign: "center",
  margin: "0"
};
addPropertyControls(CountUp, {
  targetNumber: {
    type: ControlType.Number,
    title: "Target Number",
    defaultValue: 100
  },
  duration: {
    type: ControlType.Number,
    title: "Duration (s)",
    defaultValue: 2,
    step: 0.1
  },
  font: {
    type: ControlType.String,
    title: "Font Family",
    defaultValue: "Montaga, serif"
  },
  color: {
    type: ControlType.Color,
    title: "Color",
    defaultValue: "#000000"
  },
  fontSize: {
    type: ControlType.Number,
    title: "Font Size (px)",
    defaultValue: 54,
    unit: "px"
  },
  lineHeight: {
    type: ControlType.Number,
    title: "Line Height (px)",
    defaultValue: 54,
    unit: "px"
  },
  fontWeight: {
    type: ControlType.Enum,
    title: "Font Weight",
    options: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    optionTitles: ["Thin", "Extra Light", "Light", "Regular", "Medium", "Semi Bold", "Bold", "Extra Bold", "Black"],
    defaultValue: "400"
  }
});
var __FramerMetadata__ = {
  "exports": {
    "default": {
      "type": "reactComponent",
      "name": "CountUp",
      "slots": [],
      "annotations": {
        "framerSupportedLayoutHeight": "auto",
        "framerSupportedLayoutWidth": "auto",
        "framerContractVersion": "1"
      }
    },
    "__FramerMetadata__": {
      "type": "variable"
    }
  }
};
var _OriginalComponent = CountUp;
function CountUpWithContext(props) {
    return _ctxJsx(ContextProviders, { children: _ctxJsx(_OriginalComponent, { ...props }) });
}
Object.assign(CountUpWithContext, _OriginalComponent);
CountUpWithContext.Responsive = function CountUpResponsive({ variants, ...rest }) {
    return _ctxJsx(ContextProviders, {
        children: _ctxJsx(WithResponsiveVariants, { Component: _OriginalComponent, variants: variants || { base: undefined }, ...rest })
    });
};
export {  __FramerMetadata__, CountUpWithContext as default  };