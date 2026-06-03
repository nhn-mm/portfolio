# Implementation Plan: NHN Portfolio

## Overview

Build a single-page portfolio website for Naing Htet Naing using Next.js 14+ (App Router), Tailwind CSS, and TypeScript. The implementation follows a bottom-up approach: scaffolding first, then data/types, shared components, section components, animations, modal, and finally deployment configuration and testing.

## Tasks

- [x] 1. Project scaffolding and configuration
  - [x] 1.1 Initialize Next.js 14+ project with TypeScript and Tailwind CSS
    - Run `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router options
    - Ensure `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, and `package.json` are properly configured
    - Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check`
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 1.2 Configure Tailwind theme and global styles
    - Update `tailwind.config.ts` with dark theme colors and custom animation utilities
    - Write `app/globals.css` with Tailwind directives, `@keyframes fadeIn`, `@keyframes slideUp`, and utility classes `.animate-fade-in`, `.animate-slide-up`
    - Set `scroll-behavior: smooth` on the HTML element
    - _Requirements: 1.2, 1.3, 9.1, 9.2_

  - [x] 1.3 Create Vercel deployment configuration
    - Create `vercel.json` with `{ "projectSettings": { "framework": "nextjs" } }`
    - _Requirements: 12.4, 12.5_

- [x] 2. Data models and static data files
  - [x] 2.1 Define TypeScript interfaces and types
    - Create `types/index.ts` with `Project`, `Experience`, `SkillCategory`, `NavLink`, and `ContactInfo` interfaces
    - _Requirements: 5.1, 6.1, 7.1, 8.1_

  - [x] 2.2 Create project data file
    - Create `data/projects.ts` with an array of 11 `Project` objects (Ordering system, Inventory, Loyalty, Chat, Promotion, Coupon, Reward, IoT device management, Warranty system, Calendar event, Booking system)
    - Each project includes id, title, description, techStack, image (placeholder path), details, and features
    - _Requirements: 7.1, 7.2_

  - [x] 2.3 Create experience data file
    - Create `data/experience.ts` with `Experience` objects for Galaxy Wave Co.Ltd (Oct 2017 - Nov 2020), Big Bee Co.Ltd (Nov 2020 - Present), and Iris
    - Include all responsibilities listed in requirements
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 2.4 Create skills data file
    - Create `data/skills.ts` with `SkillCategory` objects grouping skills into Frontend, Backend, Database, and Tools & Services categories
    - _Requirements: 5.1, 5.2_

- [x] 3. Shared components and hooks
  - [x] 3.1 Implement useScrollAnimation custom hook
    - Create `hooks/useScrollAnimation.ts` using Intersection Observer API
    - Accept `threshold` (default 0.1) and `triggerOnce` (default true) options
    - Return `ref` and `isVisible` state
    - Clean up observer on unmount
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 3.2 Implement ScrollAnimationWrapper component
    - Create `components/ScrollAnimationWrapper.tsx` as a client component
    - Use `useScrollAnimation` hook internally
    - Apply transition classes: initial `opacity-0 translate-y-4`, animated `opacity-100 translate-y-0`
    - Transition duration 400ms
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 3.3 Create placeholder SVG image
    - Create `public/images/placeholder.svg` as a generic project screenshot placeholder
    - _Requirements: 13.1_

- [x] 4. Layout and navigation
  - [x] 4.1 Implement NavigationBar component
    - Create `components/NavigationBar.tsx` with fixed positioning at top of viewport
    - Include smooth scroll anchor links to all sections (#hero, #about, #skills, #experience, #projects, #contact)
    - Show full horizontal links on `md+` breakpoint
    - Show hamburger icon on viewports below `md`
    - _Requirements: 2.1, 2.2, 2.3, 10.2_

  - [x] 4.2 Implement MobileMenu component
    - Create `components/MobileMenu.tsx` as a slide-down overlay menu
    - Toggle visibility via hamburger button in NavigationBar
    - Include same section links as desktop navigation
    - Ensure keyboard accessibility (focusable, closable)
    - _Requirements: 2.3, 10.2, 13.4_

  - [x] 4.3 Implement root layout with SEO metadata
    - Create `app/layout.tsx` with Next.js Metadata export (title, description, Open Graph tags, canonical URL)
    - Load Inter font from next/font
    - Apply dark theme body classes
    - Render NavigationBar above page content
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 12.1_

  - [x] 4.4 Implement Footer component
    - Create `components/Footer.tsx` with copyright text and semantic `<footer>` element
    - _Requirements: 13.2_

- [x] 5. Checkpoint - Verify scaffolding and layout
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Section components
  - [x] 6.1 Implement HeroSection component
    - Create `components/HeroSection.tsx` displaying "Naing Htet Naing" and "Senior Software Engineer"
    - Full viewport height (`min-h-screen`)
    - Use `<section>` semantic element with `id="hero"`
    - Wrap content in ScrollAnimationWrapper
    - Responsive font sizes (`text-4xl md:text-6xl lg:text-7xl`)
    - _Requirements: 3.1, 3.2, 3.3, 13.2_

  - [x] 6.2 Implement AboutSection component
    - Create `components/AboutSection.tsx` with professional summary
    - Display education: B.C.Sc., Magway Computer University, 2011-2017
    - Display location: Thngangyun, Yangon
    - Use `<section>` semantic element with `id="about"`
    - Wrap in ScrollAnimationWrapper
    - _Requirements: 4.1, 4.2, 4.3, 13.2_

  - [x] 6.3 Implement SkillsSection component
    - Create `components/SkillsSection.tsx` rendering skills as categorized tags
    - Use responsive grid: 2 columns on mobile, 3-4 columns on desktop
    - Use `<section>` semantic element with `id="skills"`
    - Wrap in ScrollAnimationWrapper
    - _Requirements: 5.1, 5.2, 13.2_

  - [x] 6.4 Implement ExperienceSection component
    - Create `components/ExperienceSection.tsx` with timeline layout
    - Display all three positions with roles, companies, periods, and responsibilities
    - Use `<section>` semantic element with `id="experience"`
    - Wrap in ScrollAnimationWrapper
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 13.2_

  - [x] 6.5 Implement ContactSection component
    - Create `components/ContactSection.tsx` displaying phone, email, GitHub link, and location
    - Use `<section>` semantic element with `id="contact"`
    - Wrap in ScrollAnimationWrapper
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 13.2_

- [x] 7. Projects section and detail modal
  - [x] 7.1 Implement ProjectCard component
    - Create `components/ProjectCard.tsx` with placeholder image, title, description, and tech stack tags
    - Make clickable with button role, keyboard accessible (Enter/Space activation)
    - Include non-empty alt text on image
    - _Requirements: 7.2, 13.3, 13.4_

  - [x] 7.2 Implement ProjectDetailModal component
    - Create `components/ProjectDetailModal.tsx` as a fixed overlay with backdrop
    - Display full project details: title, description, tech stack, features
    - Close on X button click, backdrop click, and Escape key
    - Trap focus within modal when open
    - Use `role="dialog"` and `aria-modal="true"`
    - _Requirements: 7.3, 7.4, 13.4_

  - [x] 7.3 Implement ProjectsSection component
    - Create `components/ProjectsSection.tsx` rendering ProjectCard grid
    - Manage modal state (selected project, open/close)
    - Responsive grid: 1 column below `md`, 2 columns at `md`, 3 columns at `lg`
    - Use `<section>` semantic element with `id="projects"`
    - Wrap in ScrollAnimationWrapper
    - _Requirements: 7.1, 7.2, 7.3, 10.3, 10.4, 13.2_

- [x] 8. Page composition and wiring
  - [x] 8.1 Compose the home page
    - Create `app/page.tsx` importing and rendering all section components in order: HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection
    - Include Footer at the bottom
    - Apply consistent max-width container (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`) where appropriate
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 9. Checkpoint - Verify all sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Testing
  - [ ]* 10.1 Write property test for project card rendering completeness
    - **Property 1: Project card rendering completeness and structure**
    - For any project object, rendering ProjectsSection produces a ProjectCard with image (non-empty alt), description, and tech stack tags
    - **Validates: Requirements 7.1, 7.2**

  - [ ]* 10.2 Write property test for scroll animation behavior
    - **Property 2: Scroll animation application on viewport entry**
    - For any section wrapped in ScrollAnimationWrapper, when isIntersecting is true, animation classes are applied with duration ≤ 500ms
    - **Validates: Requirements 9.1, 9.2, 9.3**

  - [ ]* 10.3 Write property test for semantic HTML structure
    - **Property 3: Semantic HTML structure**
    - For any section component, the root rendered element is a semantic HTML element (section, article, nav, main, header, or footer)
    - **Validates: Requirements 13.2**

  - [ ]* 10.4 Write property test for image alt text presence
    - **Property 4: Image alt text presence**
    - For any img element rendered in the portfolio, the alt attribute is present and non-empty
    - **Validates: Requirements 13.3**

  - [ ]* 10.5 Write property test for keyboard accessibility
    - **Property 5: Interactive element keyboard accessibility**
    - For any interactive element (ProjectCard, nav links, modal close, mobile menu toggle), the element is focusable and activatable via Enter/Space
    - **Validates: Requirements 13.4**

  - [ ]* 10.6 Write unit tests for section components
    - Test HeroSection renders name and title
    - Test AboutSection renders education and location
    - Test SkillsSection renders all skill categories
    - Test ExperienceSection renders all positions
    - Test ContactSection renders all contact info
    - Test NavigationBar renders all section links
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3, 5.1, 6.1, 6.3, 8.1, 8.2, 8.3, 8.4_

  - [ ]* 10.7 Write unit tests for modal and navigation interactions
    - Test ProjectDetailModal opens on card click
    - Test modal closes on Escape key, backdrop click, and close button
    - Test navigation smooth scroll links have correct href anchors
    - Test SEO metadata is present in layout
    - _Requirements: 7.3, 7.4, 2.2, 11.1, 11.2, 11.3, 11.4_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript throughout — no language selection needed
- All animations use 400ms duration (within the 500ms constraint)
- Placeholder SVG images are used to avoid external image dependencies

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "3.3"] },
    { "id": 3, "tasks": ["3.1"] },
    { "id": 4, "tasks": ["3.2", "4.4"] },
    { "id": 5, "tasks": ["4.1", "4.3"] },
    { "id": 6, "tasks": ["4.2"] },
    { "id": 7, "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5"] },
    { "id": 8, "tasks": ["7.1"] },
    { "id": 9, "tasks": ["7.2", "7.3"] },
    { "id": 10, "tasks": ["8.1"] },
    { "id": 11, "tasks": ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.7"] }
  ]
}
```
