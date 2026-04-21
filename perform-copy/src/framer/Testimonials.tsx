/**
 * Testimonials — Editable wrapper component
 *
 * This file is yours to customize. It won't be overwritten when you re-export.
 * The generated component is in framer-core/Testimonials.generated.jsx
 *
 * Add event handlers, wrap with your own styles, override props — anything you need.
 * // Available variants: "Main" | "Selected" | "Selected Colored"
 */
import Generated from '../framer-core/Testimonials.generated'
export type { TestimonialsProps } from '../framer-core/Testimonials.generated'

export default function Testimonials(props: TestimonialsProps & { style?: React.CSSProperties; className?: string }) {
    return <Generated {...props} />
}

// Re-export .Responsive for viewport-aware rendering
Testimonials.Responsive = Generated.Responsive
