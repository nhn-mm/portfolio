import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "bigbee-app",
    title: "BigBee",
    description:
      "A comprehensive super-app platform for Big Bee Co.Ltd encompassing ordering, inventory, loyalty, chat, promotions, coupons, and rewards.",
    techStack: [
      "React Native",
      "React",
      "TypeScript",
      "Golang",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Firebase",
      "Google Cloud Pub/Sub",
      "Google Cloud Tasks",
      "Docker",
    ],
    image: "/images/bigbee.png",
    details:
      "Built and maintained a large-scale super-app platform at Big Bee Co.Ltd, handling multiple interconnected business modules. The system serves thousands of users with real-time features, asynchronous messaging, and robust backend services.",
    features: [
      "Ordering system — menu browsing, cart, payment, and real-time order tracking",
      "Inventory — stock management, warehouse tracking, and automated reorder alerts",
      "Loyalty (point) system — configurable earning rules, tiered membership, and redemption",
      "Chat — real-time messaging with Firebase, media sharing, and push notifications",
      "Promotion — campaign scheduling, audience targeting, and performance analytics",
      "Coupon — bulk code generation, validation rules, and redemption tracking",
      "Reward — reward catalog, claim processing, and fulfillment coordination",
    ],
    link: "https://play.google.com/store/apps/dev?id=6021761269007531564",
  },
  {
    id: "iris-app",
    title: "IRIS",
    description:
      "An IoT-focused platform (similar to Tuya) for device management, warranty tracking, calendar events, and booking services. Built at Living With Logic.",
    techStack: [
      "React",
      "React Native",
      "TypeScript",
      "Golang",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Firebase",
    ],
    image: "/images/iris.png",
    details:
      "Developing an IoT-centric platform at Living With Logic that manages smart devices, handles warranty claims, and provides scheduling and booking capabilities. The system supports thousands of concurrent device connections with real-time telemetry and automated alerting.",
    features: [
      "IoT device management — device provisioning, firmware updates, real-time telemetry (like Tuya)",
      "Warranty system — product registration, warranty tracking, and claims processing",
      "Calendar event — recurring scheduling, multi-user calendars, and automated reminders",
      "Booking system — availability management, reservation handling, and confirmation workflows",
    ],
    link: "https://play.google.com/store/apps/details?id=com.kh.autohome",
  },
];
