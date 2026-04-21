/**
 * CountUp — Editable wrapper component
 *
 * This file is yours to customize. It won't be overwritten when you re-export.
 * The generated component is in framer-core/CountUp.generated.jsx
 *
 * Add event handlers, wrap with your own styles, override props — anything you need.
 * 
 */
import Generated from '../framer-core/CountUp.generated'
export type { CountUpProps } from '../framer-core/CountUp.generated'

export default function CountUp(props: CountUpProps & { style?: React.CSSProperties; className?: string }) {
    return <Generated {...props} />
}

// Re-export .Responsive for viewport-aware rendering
CountUp.Responsive = Generated.Responsive
