# Framer React Export

## Quick Start

```bash
npm install && npm run dev
```

That's it — the project is ready to run.

## Using Components

Import from `src/framer/` and use `.Responsive` for viewport-aware rendering:

```jsx
import './framer/styles.css'
import CountUp from './framer/CountUp'

export default function App() {
    return <CountUp.Responsive />
}
```

Or import multiple via the barrel:

```jsx
import { CountUp, Primary, Testimonials } from './framer'
```

## Responsive Variants

```jsx
<CountUp.Responsive
    variants={{
        lg: 'Desktop',
        md: 'Tablet',
        base: 'Mobile',
    }}
/>
```

Breakpoints: `base` (0), `sm` (320px), `md` (768px), `lg` (960px), `xl` (1200px)

## Styling

```jsx
<CountUp style={{ width: '100%' }} />
```

## Layout Coordination

Wrap sibling Framer components in `<FramerGroup>` for smooth animations:

```jsx
import { FramerGroup } from './framer/context'

<FramerGroup>
    <CountUp />
    <AnotherComponent />
</FramerGroup>
```

## Important

- **Do NOT install framer-motion** — it's bundled. Installing it separately breaks animations.
- **React Strict Mode is disabled** by default (Framer needs it off).
- **No bundler alias needed** — runtime is imported via relative paths.
- Run the plugin again to re-export after Framer changes.

---

## All Available Components

### CountUp

```jsx
import CountUp from './framer/CountUp'

<CountUp.Responsive />
```

**File:** `CountUp.jsx` | **Original name:** CountUp

**Props:**
```ts
  targetNumber?: number;
  durationS?: number;
  fontFamily?: string;
  color?: string;
  fontSizePx?: number;
  lineHeightPx?: number;
  fontWeight?: "Thin" | "Extra Light" | "Light" | "Regular" | "Medium" | "Semi Bold" | "Bold" | "Extra Bold" | "Black";
```

### Primary

```jsx
import Primary from './framer/Primary'

<Primary.Responsive />
```

**File:** `Primary.jsx` | **Original name:** Primary

**Props:**
```ts
  variant?: "Main" | "With Border";
  buttonText?: string;
  link?: string;
```

### Testimonials

```jsx
import Testimonials from './framer/Testimonials'

<Testimonials.Responsive />
```

**File:** `Testimonials.jsx` | **Original name:** Testimonials

**Props:**
```ts
  variant?: "Main" | "Selected" | "Selected Colored";
  click?: (...args: any[]) => void;
  image?: string | { src: string; srcSet?: string; alt?: string
```

