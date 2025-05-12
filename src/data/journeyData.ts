import * as THREE from "three";

// This array defines the key events in your career/life journey.
export const milestones = [
  {
    year: "2015 - 2019",
    title: "University of Toronto",
    description:
      "Pursued Honours Bachelor of Science in Chemistry and Biology Majors, developing strong analytical and critical thinking skills.",
    position: 1 / 15,
  },
  {
    year: "May 2016 - Sep 2016",
    title: "Peer Helper - Writer",
    description:
      "Took notes for accessibility students at University of Toronto Mississauga, ensuring they understood important course information.",
    position: 2 / 15,
  },
  {
    year: "Jan 2017 - Feb 2019",
    title: "Medical First Responder",
    description:
      "Volunteered with Erindale College Special Response Team, administering professional first aid during emergency situations.",
    position: 3 / 15,
  },
  {
    year: "Nov 2017 - May 2018",
    title: "Cashier/Merchandiser at Shoppers Drug Mart",
    description:
      "Managed inventory, customer transactions, and merchandise presentation at retail location.",
    position: 4 / 15,
  },
  {
    year: "Feb 2018",
    title: "Marketing Volunteer",
    description:
      "Collaborated with students to develop marketing strategy for Many Feathers Food Co-op.",
    position: 5 / 15,
  },
  {
    year: "Apr 2018 - Aug 2018",
    title: "Research Assistant",
    description:
      "Conducted study design, collected data for 5000+ samples, and presented findings to professors at University of Toronto.",
    position: 6 / 15,
  },
  {
    year: "Aug 2018 - Jul 2021",
    title: "Point of Sale Associate",
    description:
      "Assisted customers with purchases and course materials at University of Toronto Press.",
    position: 7 / 15,
  },
  {
    year: "Nov 2018 - Apr 2019",
    title: "Pharmacy Assistant at Shoppers",
    description:
      "Supported pharmacists with prescriptions, customer service, and medication organization.",
    position: 8 / 15,
  },
  {
    year: "Dec 2017 - Jun 2019",
    title: "Financial Director",
    description:
      "Managed financial statements and reported to the University of Toronto Student Union for PreDentalClub.",
    position: 9 / 15,
  },
  {
    year: "Nov 2019 - Nov 2020",
    title: "Pharmacy Assistant at Loblaw",
    description:
      "Handled medication packaging, inventory management, and customer service in pharmacy setting.",
    position: 10 / 15,
  },
  {
    year: "Sep 2021 - Dec 2024",
    title: "Software Engineering Technology",
    description:
      "Pursued diploma at Centennial College with 89% grade average, developing skills in various programming languages and technologies.",
    position: 11 / 15,
  },
  {
    year: "Jun 2021 - Present",
    title: "Pharmacy Assistant",
    description:
      "Provide ongoing pharmacy support at Loblaw Companies, utilizing analytical and communication skills.",
    position: 12 / 15,
  },
  {
    year: "Jan 2023 - Apr 2023",
    title: "Application Support Analyst",
    description:
      "First co-op at CIBC providing technological support for clients and employees, troubleshooting systems and resolving incidents.",
    position: 13 / 15,
  },
  {
    year: "Sep 2023 - Dec 2023",
    title: "Application Support Analyst",
    description:
      "Second co-op at CIBC enhancing incident management and collaborative problem-solving skills.",
    position: 14 / 15,
  },
];

// This array defines the 3D path that the road will follow.
export const roadPath = [
  { x: 0, z: 0, curve: "straight" }, // Start of road
  { x: 5, z: -20, curve: "right" }, // Curve right ending at x=5, z=-40
  { x: 5, z: -40, curve: "straight" },
  { x: -5, z: -60, curve: "left" }, // Second curve (left)
  { x: -5, z: -80, curve: "straight" },
  { x: 10, z: -100, curve: "right" }, // Third curve (right)
  { x: 10, z: -120, curve: "straight" },
  { x: -10, z: -140, curve: "left" }, // Fourth curve (left)
  { x: -10, z: -160, curve: "straight" },
];

// Helper function to create a unified curve from roadPath points
export function createUnifiedCurve() {
  const points = roadPath.map((pt) => new THREE.Vector3(pt.x, -0.9, pt.z));
  return new THREE.CatmullRomCurve3(points);
}
