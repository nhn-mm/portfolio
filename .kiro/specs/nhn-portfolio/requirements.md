# Requirements Document

## Introduction

A personal portfolio website for Naing Htet Naing, a Senior Software Engineer. The portfolio follows a dark and minimal aesthetic with a single-page scrollable layout built using Next.js (App Router), Tailwind CSS, and TypeScript. The site showcases professional experience, technical skills, and project work with smooth animations and responsive design, deployed to Vercel.

## Glossary

- **Portfolio_Site**: The Next.js web application serving as the personal portfolio for Naing Htet Naing
- **Hero_Section**: The top-most viewport section displaying the name, title, and a brief introduction
- **About_Section**: The section presenting a professional summary and personal background
- **Skills_Section**: The section displaying technical skills organized by category
- **Experience_Section**: The section listing professional work history in chronological order
- **Projects_Section**: The section showcasing project cards for major projects worked on
- **Contact_Section**: The section providing contact information and communication methods
- **Project_Card**: A UI component displaying a project's placeholder screenshot, company/project name, brief description, and tech stack tags
- **Project_Detail_View**: A modal or expanded view showing full project details including the list of modules/features within that project when a Project_Card is clicked
- **Project_Module**: A distinct feature or subsystem within a project (e.g., Ordering system, IoT device management)
- **Navigation_Bar**: The fixed navigation component providing smooth scroll links to each section
- **Scroll_Animation**: A CSS/JS animation triggered when an element enters the viewport (fade-in or slide-up)
- **Visitor**: Any person viewing the Portfolio_Site in a web browser

## Requirements

### Requirement 1: Single-Page Layout Structure

**User Story:** As a Visitor, I want to see all portfolio content on a single scrollable page with clearly defined sections, so that I can browse the entire portfolio without navigating to separate pages.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render a single-page layout containing the following sections in order: Hero_Section, About_Section, Skills_Section, Experience_Section, Projects_Section, Contact_Section.
2. THE Portfolio_Site SHALL apply a dark background color scheme with clean typography across all sections.
3. THE Portfolio_Site SHALL use a developer-focused minimal aesthetic with sufficient contrast between text and background elements.

### Requirement 2: Navigation

**User Story:** As a Visitor, I want a fixed navigation bar with links to each section, so that I can quickly jump to any part of the portfolio.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL remain fixed at the top of the viewport during scrolling.
2. WHEN a Visitor clicks a navigation link, THE Portfolio_Site SHALL smooth-scroll to the corresponding section.
3. THE Navigation_Bar SHALL contain links to the Hero_Section, About_Section, Skills_Section, Experience_Section, Projects_Section, and Contact_Section.

### Requirement 3: Hero Section

**User Story:** As a Visitor, I want to immediately see the portfolio owner's name and professional title, so that I understand whose portfolio I am viewing.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the name "Naing Htet Naing" prominently.
2. THE Hero_Section SHALL display the title "Senior Software Engineer".
3. THE Hero_Section SHALL occupy the full viewport height on initial page load.

### Requirement 4: About Section

**User Story:** As a Visitor, I want to read a professional summary, so that I can understand the portfolio owner's background and expertise.

#### Acceptance Criteria

1. THE About_Section SHALL display a professional summary of Naing Htet Naing.
2. THE About_Section SHALL display the education credential: B.C.Sc., Magway Computer University, 2011-2017.
3. THE About_Section SHALL display the location: Thngangyun, Yangon.

### Requirement 5: Skills Section

**User Story:** As a Visitor, I want to see a comprehensive list of technical skills, so that I can evaluate the portfolio owner's technical capabilities.

#### Acceptance Criteria

1. THE Skills_Section SHALL display the following skills: React Native, React, Next.js, Golang, JavaScript, TypeScript, MySQL, PostgreSQL, Redis, Docker, Google Task, Firebase, React Query, Hasura, Zod/Yup, Node.js, C#, ASP.NET, Tailwind, Ant Design, Material UI, Shadcn UI.
2. THE Skills_Section SHALL present skills in a visually organized layout using tags or grouped categories.

### Requirement 6: Experience Section

**User Story:** As a Visitor, I want to see the portfolio owner's work history with roles, companies, and responsibilities, so that I can assess professional experience.

#### Acceptance Criteria

1. THE Experience_Section SHALL display the role "Software Engineer" at "Galaxy Wave Co.Ltd" with the period "Oct 2017 - Nov 2020".
2. THE Experience_Section SHALL list responsibilities for Galaxy Wave Co.Ltd including: UI/UX collaboration, responsive pixel-perfect UIs, Redux state management, front-end and MySQL backend integration, and SQL query optimization.
3. THE Experience_Section SHALL display the role "Senior Software Engineer" at "Big Bee Co.Ltd" with the period "Nov 2020 - Present".
4. THE Experience_Section SHALL list responsibilities for Big Bee Co.Ltd including: responsive design across devices, MySQL backend and database schemas, Google Cloud Pub/Sub for async messaging, Google Cloud Tasks for job scheduling, third-party API integrations (Firebase, Facebook auth), Redis caching, cross-functional collaboration, and internal tools (Github Actions, Circle CI, Firebase App Distribution).
5. THE Experience_Section SHALL display work at "Iris" with associated projects.

### Requirement 7: Projects Section

**User Story:** As a Visitor, I want to browse project cards showing the major projects I worked on, so that I can understand the portfolio owner's project work and the modules/features built within each project.

#### Acceptance Criteria

1. THE Projects_Section SHALL display 2 Project_Cards for the following projects: "Big Bee" (the app built at Big Bee Co.Ltd) and "Iris" (the app built at Iris).
2. WHEN the Projects_Section renders a Project_Card, THE Project_Card SHALL display a placeholder image, the project name, a brief description, and tech stack tags.
3. WHEN a Visitor clicks the "Big Bee" Project_Card, THE Portfolio_Site SHALL display a Project_Detail_View listing the following Project_Modules: Ordering system, Inventory, Loyalty (point) system, Chat, Promotion, Coupon, Reward.
4. WHEN a Visitor clicks the "Iris" Project_Card, THE Portfolio_Site SHALL display a Project_Detail_View listing the following Project_Modules: IoT device management, Warranty system, Calendar event, Booking system.
5. THE Project_Detail_View SHALL display each Project_Module with its name and a brief description.
6. THE Project_Detail_View SHALL include a mechanism to close and return to the Projects_Section.

### Requirement 8: Contact Section

**User Story:** As a Visitor, I want to find contact information easily, so that I can reach out to the portfolio owner.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the phone number "+959423911746".
2. THE Contact_Section SHALL display the email address "gwdeveloper1@gmail.com".
3. THE Contact_Section SHALL display a link to "github.com/black10000".
4. THE Contact_Section SHALL display the location "Thngangyun, Yangon".

### Requirement 9: Scroll Animations

**User Story:** As a Visitor, I want subtle animations as I scroll through the page, so that the browsing experience feels polished and engaging.

#### Acceptance Criteria

1. WHEN a section element enters the viewport, THE Portfolio_Site SHALL apply a fade-in Scroll_Animation to the element.
2. WHEN a section element enters the viewport, THE Portfolio_Site SHALL apply a slide-up Scroll_Animation to the element.
3. THE Portfolio_Site SHALL ensure Scroll_Animations do not block or delay content visibility beyond 500ms.

### Requirement 10: Responsive Design

**User Story:** As a Visitor, I want the portfolio to display correctly on mobile, tablet, and desktop devices, so that I can view the portfolio on any device.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL adapt its layout for viewport widths of 320px and above.
2. THE Portfolio_Site SHALL adjust the Navigation_Bar to a mobile-friendly format on viewports below 768px width.
3. THE Portfolio_Site SHALL stack Project_Cards vertically on viewports below 768px width.
4. THE Portfolio_Site SHALL display Project_Cards in a grid layout on viewports of 768px width and above.

### Requirement 11: SEO and Meta Tags

**User Story:** As a Visitor, I want the portfolio to appear in search engine results with proper metadata, so that the portfolio is discoverable online.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a descriptive page title in the HTML head element.
2. THE Portfolio_Site SHALL include a meta description tag summarizing the portfolio content.
3. THE Portfolio_Site SHALL include Open Graph meta tags for social media sharing (og:title, og:description, og:image).
4. THE Portfolio_Site SHALL include a canonical URL meta tag.

### Requirement 12: Technology Stack and Deployment

**User Story:** As a developer, I want the portfolio built with Next.js App Router, Tailwind CSS, and TypeScript deployed to Vercel, so that the site uses modern tooling and is publicly accessible.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be built using Next.js with the App Router architecture.
2. THE Portfolio_Site SHALL use Tailwind CSS for styling.
3. THE Portfolio_Site SHALL be written in TypeScript.
4. THE Portfolio_Site SHALL be deployable to Vercel with the project name "nhn".
5. THE Portfolio_Site SHALL be deployed to Vercel production environment.

### Requirement 13: Performance and Accessibility

**User Story:** As a Visitor, I want the portfolio to load quickly and be accessible, so that I have a smooth browsing experience regardless of my device or abilities.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use placeholder images for project screenshots to minimize initial load size.
2. THE Portfolio_Site SHALL use semantic HTML elements for content structure.
3. THE Portfolio_Site SHALL provide alt text for all images.
4. THE Portfolio_Site SHALL ensure all interactive elements are keyboard-accessible.
