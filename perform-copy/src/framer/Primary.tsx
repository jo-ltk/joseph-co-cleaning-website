/**
 * Primary — Editable wrapper component
 *
 * This file is yours to customize. It won't be overwritten when you re-export.
 * The generated component is in framer-core/Primary.generated.jsx
 *
 * Add event handlers, wrap with your own styles, override props — anything you need.
 * // Available variants: "Main" | "With Border"
 */
import Generated from '../framer-core/Primary.generated'
export type { PrimaryProps } from '../framer-core/Primary.generated'

export default function Primary(props: PrimaryProps & { style?: React.CSSProperties; className?: string }) {
    return <Generated {...props} />
}

// Re-export .Responsive for viewport-aware rendering
Primary.Responsive = Generated.Responsive
