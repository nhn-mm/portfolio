import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "galaxy-wave",
    role: "Software Engineer",
    company: "Galaxy Wave Co.Ltd",
    period: "Oct 2017 - Nov 2020",
    responsibilities: [
      "Collaborated with UI/UX designers to translate wireframes and mockups into functional interfaces",
      "Built responsive, pixel-perfect UIs ensuring consistent experience across devices and browsers",
      "Managed application state using Redux for predictable data flow",
      "Integrated front-end applications with MySQL backend services",
      "Optimized SQL queries for improved database performance",
    ],
  },
  {
    id: "big-bee",
    role: "Senior Software Engineer",
    company: "Big Bee Co.Ltd",
    period: "Nov 2020 - Dec 2025",
    responsibilities: [
      "Developed responsive designs ensuring seamless experience across mobile, tablet, and desktop devices",
      "Built and maintained MySQL backend services and database schemas",
      "Implemented Google Cloud Pub/Sub for asynchronous messaging between services",
      "Configured Google Cloud Tasks for reliable job scheduling and task execution",
      "Integrated third-party APIs including Firebase and Facebook authentication",
      "Implemented Redis caching strategies to improve application performance",
      "Collaborated with cross-functional teams including designers, product managers, and backend engineers",
      "Built and maintained internal tools using Github Actions, Circle CI, and Firebase App Distribution",
    ],
    projects: [
      "Ordering system",
      "Inventory",
      "Loyalty (point) system",
      "Chat",
      "Promotion",
      "Coupon",
      "Reward",
    ],
  },
  {
    id: "living-with-logic",
    role: "Software Engineer",
    company: "Living With Logic",
    period: "Apr 2025 - Present",
    responsibilities: [
      "Developing IoT device management platform similar to Tuya for smart device provisioning and control",
      "Building warranty registration and claims management system",
      "Implementing calendar event scheduling with recurring events and reminders",
      "Developing booking and reservation system with real-time availability management",
    ],
    projects: [
      "IoT device management",
      "Warranty system",
      "Calendar event",
      "Booking system",
    ],
  },
];
