# Joseph.co Design System & Patterns

This document defines the core typography, spacing, and component patterns for the Joseph.co website. Use these standards when creating new pages or components to ensure a consistent, premium aesthetic.

## 1. Typography Scale

Always use the `Inter` font family (usually via `var(--font-inter)`).

| Element | Mobile Class | Desktop Class | Additional Classes | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Eyebrow / Label** | `text-sm` | `text-sm` | `font-semibold`, `uppercase`, `tracking-widest`, `text-pine-green`, `mb-4`, `block` | Standardized animated label using `motion.span` |
| **Section Heading (h2)** | `text-2xl` | `text-4xl` | `leading-[1.1]`, `font-medium`, `tracking-tight` | Primary section headline |
| **Body (Large)** | `text-lg` | `text-xl` | `leading-relaxed`, `font-medium` | Intro paragraphs or secondary headlines |
| **Body (Standard)** | `text-base` | `text-lg` | `leading-relaxed`, `text-xanadu` | Main descriptive paragraphs |
| **Card Title (h3)** | `text-xl` | `text-2xl` | `leading-[1.1]`, `font-medium`, `tracking-tight` | Titles inside grid items/cards |
| **Card Description** | `text-base` | `text-base` | `leading-relaxed` | Descriptions inside cards |
| **Stat Value** | `text-2xl` | `text-4xl` | `leading-[1.1]`, `font-medium`, `tracking-tight` | Large numbers in stats sections |

## 2. Spacing Scale

### Section Layout
- **Standard Vertical Padding**: `py-16 md:py-24`
- **Spacious Vertical Padding**: `py-20 md:py-32`
- **Horizontal Container Padding**: `px-5 md:px-10 lg:px-20`
- **Max Container Width**: `max-w-[1450px]` (centered with `mx-auto`)

### Gaps & Margins
- **Header Block Bottom Margin**: `mb-10 md:mb-16` (spacing between heading and content)
- **Large Content Gap**: `gap-6 lg:gap-12` (between image and text blocks)
- **Medium Content Gap**: `gap-6 md:gap-8` (between icon and text)
- **Small Content Gap**: `gap-3 md:gap-4` (between title and description)
- **Card Padding**: `p-6 md:p-10`

## 3. Component Patterns

### Buttons & CTAs
Always use the common UI components found in `@/components/ui/`.

- **Primary CTA**:
  ```tsx
  <ButtonLink href="/contact" variant="primary">
    Get Quote
  </ButtonLink>
  ```
- **CTA Pair (Button + Icon)**:
  ```tsx
  <div className="btn-pair">
    <ButtonLink href="/contact" variant="primary">
      See More
    </ButtonLink>
    <IconButton href="/contact" size="md" />
  </div>
  ```
- **Secondary / Ghost Button**:
  ```tsx
  <Button variant="secondary">
    Contact Us
  </Button>
  ```

### Animated Eyebrow (Section Label)
Used at the start of sections to introduce the topic.
```tsx
<motion.span 
  initial={{ opacity: 0, y: 10 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
>
  Label Text
</motion.span>
```

### Animations
Use the `ScrollReveal` component for text and elements that should animate into view.
```tsx
<ScrollReveal as="h2" containerClassName="...">
  Content to reveal
</ScrollReveal>
```

## 4. Color Palette Tokens

- **Primary Accent**: `text-yellow-green` / `bg-yellow-green`
- **Dark Background**: `bg-[#120f0c]`
- **Light Background**: `bg-white`
- **Neutral Background**: `bg-[#f5f5f3]`
- **Text (Secondary)**: `text-xanadu`
- **Text (Primary Dark)**: `text-[#1a1a1a]`

## 5. Booking & Automation Architecture

Joseph.co utilizes a centralized lead-generation engine to track sources and automatically notify both the team and the customer.

### Global CTA Strategy
Do not create isolated forms or mailto links for booking requests. Instead, every CTA across the site should point to the centralized `/contact` page and intelligently pass the context via URL parameters.

**Format**: `href="/contact?source=[Page_Name]&service=[Optional_Service]"`

**Examples**:
- Homepage CTA: `<ButtonLink href="/contact?source=Homepage Hero">Book Quote</ButtonLink>`
- Service CTA: `<ButtonLink href="/contact?source=Detailed Services&service=Industrial Cleaning">Request Visit</ButtonLink>`

### Form Submission & Flow
1. **Pre-filling**: The `/contact` page reads `?service=` and automatically selects the appropriate dropdown option.
2. **Server Action**: Form submissions are sent to the `submitBooking` Server Action in `app/actions/booking.ts`.
3. **Resend Email Engine**: 
   - Generates a beautifully formatted "Service Request" summary email for the Admin (`JosephandCol.t.d@outlook.com`).
   - Sends a premium branded confirmation to the Customer.
4. **WhatsApp Handoff**: On success, the UI gracefully transforms into a confirmation state and presents a "Fast-Track via WhatsApp" button. This contains a pre-filled `wa.me` link carrying the exact payload (Name, Service, Location, Source) straight into the company's WhatsApp inbox.

### Email Templates (React + Resend)
When sending emails via Resend, use React templates from `components/email-template.tsx` instead of raw HTML strings for maintainable, type-safe email designs.

**Example Usage**:
```tsx
import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'Hello world',
    react: <EmailTemplate firstName="John" />,
  });

  if (error) {
    return Response.json({ error });
  }

  return Response.json(data);
}
```
