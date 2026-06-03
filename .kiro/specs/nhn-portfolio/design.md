# Design Document

## Overview

This document describes the technical architecture for Naing Htet Naing's personal portfolio website. The site is a single-page scrollable application built with Next.js 14+ (App Router), Tailwind CSS, and TypeScript. It follows a dark minimal aesthetic with scroll-triggered animations and responsive design, deployed to Vercel.

## Architecture

The portfolio uses a component-based architecture with Next.js App Router. All content lives on a single page (`/`) composed of discrete section components. Data is statically defined in TypeScript files (no external API or database). Animations use the Intersection Observer API via a custom React hook.

```
┌─────────────────────────────────────────────┐
│                  Layout                      │
│  ┌───────────────────────────────────────┐  │
│  │           NavigationBar               │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │              Main                     │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │         HeroSection             │  │  │
│  │  ├─────────────────────────────────┤  │  │
│  │  │         AboutSection            │  │  │
│  │  ├─────────────────────────────────┤  │  │
│  │  │         SkillsSection           │  │  │
│  │  ├─────────────────────────────────┤  │  │
│  │  │       ExperienceSection         │  │  │
│  │  ├─────────────────────────────────┤  │  │
│  │  │       ProjectsSection           │  │  │
│  │  ├─────────────────────────────────┤  │  │
│  │  │        ContactSection           │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │         ProjectDetailModal            │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │              Footer                   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata, fonts, NavigationBar
│   ├── page.tsx            # Home page composing all sections
│   └── globals.css         # Tailwind directives and custom animations
├── components/
│   ├── NavigationBar.tsx   # Fixed top navigation with smooth scroll links
│   ├── MobileMenu.tsx      # Hamburger menu for mobile viewports
│   ├── HeroSection.tsx     # Full-viewport hero with name and title
│   ├── AboutSection.tsx    # Professional summary, education, location
│   ├── SkillsSection.tsx   # Skills displayed as categorized tags
│   ├── ExperienceSection.tsx # Work history timeline
│   ├── ProjectsSection.tsx # Project cards grid
│   ├── ProjectCard.tsx     # Individual project card component
│   ├── ProjectDetailModal.tsx # Modal for expanded project details
│   ├── ContactSection.tsx  # Contact information
│   ├── Footer.tsx          # Simple footer
│   └── ScrollAnimationWrapper.tsx # Wrapper applying scroll animations
├── hooks/
│   └── useScrollAnimation.ts # Custom hook using Intersection Observer
├── data/
│   ├── projects.ts         # Project data array
│   ├── experience.ts       # Work experience data array
│   └── skills.ts           # Skills data organized by category
├── types/
│   └── index.ts            # TypeScript interfaces and types
├── public/
│   └── images/
│       └── placeholder.svg # Placeholder image for project screenshots
├── tailwind.config.ts      # Tailwind configuration with custom theme
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment configuration
└── package.json
```

## Components and Interfaces

### Root Layout (`app/layout.tsx`)

The root layout provides:
- HTML metadata (title, description, Open Graph tags, canonical URL)
- Font loading (Inter or similar clean sans-serif)
- Dark theme body class
- NavigationBar rendered above the page content

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naing Htet Naing | Senior Software Engineer",
  description: "Portfolio of Naing Htet Naing, a Senior Software Engineer specializing in React, Next.js, Golang, and cloud technologies.",
  openGraph: {
    title: "Naing Htet Naing | Senior Software Engineer",
    description: "Portfolio of Naing Htet Naing, a Senior Software Engineer.",
    type: "website",
  },
  alternates: {
    canonical: "https://nhn.vercel.app",
  },
};
```

### NavigationBar

A fixed-position navigation bar with smooth scroll behavior.

```typescript
interface NavLink {
  label: string;
  href: string; // e.g., "#hero", "#about"
}

// Desktop: horizontal link list
// Mobile (<768px): hamburger icon toggling MobileMenu
```

**Behavior:**
- Uses `scroll-behavior: smooth` on the HTML element
- Links use anchor hrefs (`#section-id`)
- On mobile, collapses into a hamburger menu that opens a slide-down overlay

### ScrollAnimationWrapper

A client component wrapping section content to apply scroll-triggered animations.

```typescript
"use client";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "fade-in-up";
}
```

**Implementation:**
- Uses the `useScrollAnimation` hook internally
- Applies CSS classes when the element enters the viewport
- Initial state: `opacity-0 translate-y-4`
- Animated state: `opacity-100 translate-y-0`
- Transition duration: 400ms (under the 500ms requirement)

### useScrollAnimation Hook

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;    // Default: 0.1
  triggerOnce?: boolean; // Default: true
}

function useScrollAnimation(options?: UseScrollAnimationOptions): {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
}
```

**Implementation:**
- Creates an IntersectionObserver with configurable threshold
- Sets `isVisible` to true when element enters viewport
- With `triggerOnce: true`, disconnects observer after first intersection
- Cleans up observer on unmount

### ProjectCard

```typescript
interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}
```

**Behavior:**
- Renders placeholder image, project name, description, and tech stack tags
- Clickable (button role) — opens ProjectDetailModal
- Keyboard accessible: focusable, activates on Enter/Space

### ProjectDetailModal

```typescript
interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**Behavior:**
- Renders as a fixed overlay with backdrop
- Displays full project details: title, description, tech stack
- Displays the list of modules within the project, showing each module's name and description
- Close button (X) in top-right corner
- Closes on backdrop click and Escape key
- Traps focus within modal when open
- Uses `role="dialog"` and `aria-modal="true"`

## Data Models

### Types (`types/index.ts`)

```typescript
export interface ProjectModule {
  name: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;         // Path to placeholder image
  details: string;       // Extended description for modal
  modules: ProjectModule[]; // List of modules/features within the project
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  projects?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  github: string;
  location: string;
}
```

### Data Files

**`data/projects.ts`** — Array of 2 `Project` objects:
- **Big Bee**: The app built at Big Bee Co.Ltd, with modules: Ordering system, Inventory, Loyalty (point) system, Chat, Promotion, Coupon, Reward.
- **Iris**: The app built at Iris, with modules: IoT device management, Warranty system, Calendar event, Booking system.

Each project object contains a `modules` array where each entry has a `name` and `description` for the module.

**`data/experience.ts`** — Array of `Experience` objects for Galaxy Wave Co.Ltd, Big Bee Co.Ltd, and Iris.

**`data/skills.ts`** — Array of `SkillCategory` objects grouping skills into categories:
- Frontend: React Native, React, Next.js, JavaScript, TypeScript, Tailwind, Ant Design, Material UI, Shadcn UI
- Backend: Golang, Node.js, C#, ASP.NET
- Database: MySQL, PostgreSQL, Redis
- Tools & Services: Docker, Google Task, Firebase, React Query, Hasura, Zod/Yup

## Animation Approach

### CSS Animations (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 400ms ease-out forwards;
  }

  .animate-slide-up {
    animation: slideUp 400ms ease-out forwards;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Intersection Observer Strategy

- Each section is wrapped in `ScrollAnimationWrapper`
- Observer threshold: 0.1 (triggers when 10% of element is visible)
- `triggerOnce: true` — animation plays once, element stays visible
- Elements start with `opacity-0` and transition to `opacity-100`
- All animation durations are 400ms (within the 500ms constraint)

## Responsive Design

### Breakpoints (Tailwind defaults)

| Breakpoint | Width   | Behavior                                    |
|-----------|---------|---------------------------------------------|
| Default   | 320px+  | Mobile-first base styles                    |
| `sm`      | 640px+  | Minor spacing adjustments                   |
| `md`      | 768px+  | Grid layouts, desktop navigation            |
| `lg`      | 1024px+ | Wider content area, larger typography       |
| `xl`      | 1280px+ | Max-width container for content centering   |

### Layout Adaptations

- **Navigation**: Full horizontal links on `md+`, hamburger menu below `md`
- **Project Cards**: Single column stack below `md`, 2-column grid at `md`, 3-column grid at `lg`
- **Skills**: 2-column tag grid on mobile, 3-4 columns on desktop
- **Experience**: Full-width timeline on all viewports, adjusted padding
- **Hero**: Responsive font sizes using Tailwind's responsive prefixes (`text-4xl md:text-6xl lg:text-7xl`)

### Container Strategy

```typescript
// Consistent max-width container used across sections
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  {/* Section content */}
</div>
```

## Deployment Configuration

### vercel.json

```json
{
  "projectSettings": {
    "framework": "nextjs"
  }
}
```

The Vercel project is configured with name "nhn" via the Vercel dashboard or CLI (`vercel --name nhn`). The production URL will be `https://nhn.vercel.app`.

### Build Configuration

- Framework: Next.js (auto-detected by Vercel)
- Build command: `next build`
- Output directory: `.next`
- Node.js version: 18.x or 20.x

## Error Handling

### Modal State

- If `project` is `null` when modal is open, modal renders nothing (guard clause)
- Modal close resets state to `null`

### Image Loading

- Placeholder SVG used for all project images — no network image loading failures
- Alt text always provided from project data

### Navigation

- Anchor links degrade gracefully if JavaScript is disabled (browser native anchor behavior)
- Smooth scroll uses CSS `scroll-behavior: smooth` as primary mechanism

## Testing Strategy

### Unit Tests (Example-Based)

- Verify each section component renders expected content (name, title, skills list, experience entries, contact info)
- Verify navigation links point to correct section anchors
- Verify ProjectsSection renders exactly 2 project cards (Big Bee and Iris)
- Verify modal opens on card click and displays the project's modules list
- Verify modal closes on close button / Escape / backdrop click
- Verify responsive classes are applied at correct breakpoints
- Verify SEO metadata is present in the layout

### Property Tests

- Project card rendering completeness (Property 1)
- Scroll animation behavior (Property 2)
- Semantic HTML structure (Property 3)
- Image alt text presence (Property 4)
- Keyboard accessibility (Property 5)

### Tools

- **Test Runner**: Vitest
- **Component Testing**: React Testing Library
- **Property Testing**: fast-check
- **Minimum iterations**: 100 per property test

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Project card rendering completeness and structure

*For any* project object in the projects data array (Big Bee or Iris), rendering the ProjectsSection SHALL produce a ProjectCard containing: an image element with non-empty alt text, the project's name, the project's description text, and at least one tech stack tag matching the project's techStack array.

**Validates: Requirements 7.1, 7.2**

### Property 2: Scroll animation application on viewport entry

*For any* section element observed by the ScrollAnimationWrapper, when the Intersection Observer reports `isIntersecting: true`, the element SHALL have animation classes applied (transitioning from invisible to visible state) with a total animation duration not exceeding 500ms.

**Validates: Requirements 9.1, 9.2, 9.3**

### Property 3: Semantic HTML structure

*For any* section component (HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection), the root rendered element SHALL be a semantic HTML element (`<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, or `<footer>`).

**Validates: Requirements 13.2**

### Property 4: Image alt text presence

*For any* `<img>` element rendered within the Portfolio_Site, the `alt` attribute SHALL be present and contain a non-empty string.

**Validates: Requirements 13.3**

### Property 5: Interactive element keyboard accessibility

*For any* interactive element (ProjectCard, navigation links, modal close button, mobile menu toggle) rendered in the Portfolio_Site, the element SHALL be focusable via keyboard Tab navigation and activatable via Enter or Space key press.

**Validates: Requirements 13.4**
