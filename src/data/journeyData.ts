import * as THREE from "three";

// This array defines the key events in my career/life journey.
// Positions are fractions (0-1) along the road curve, spaced evenly over /18.
export const milestones = [
  {
    year: "2015 - 2019",
    title: "University of Toronto",
    description:
      "Pursued Honours Bachelor of Science in Chemistry and Biology Majors, developing strong analytical and critical thinking skills.",
    position: 1 / 18,
  },
  {
    year: "May 2016 - Sep 2016",
    title: "Peer Helper - Writer",
    description:
      "Took notes for accessibility students at University of Toronto Mississauga, ensuring they understood important course information.",
    position: 2 / 18,
  },
  {
    year: "Jan 2017 - Feb 2019",
    title: "Medical First Responder",
    description:
      "Volunteered with Erindale College Special Response Team, administering professional first aid during emergency situations.",
    position: 3 / 18,
  },
  {
    year: "Nov 2017 - May 2018",
    title: "Cashier/Merchandiser at Shoppers Drug Mart",
    description:
      "Managed inventory, customer transactions, and merchandise presentation at retail location.",
    position: 4 / 18,
  },
  {
    year: "Feb 2018",
    title: "Marketing Volunteer",
    description:
      "Collaborated with students to develop marketing strategy for Many Feathers Food Co-op.",
    position: 5 / 18,
  },
  {
    year: "Apr 2018 - Aug 2018",
    title: "Research Assistant",
    description:
      "Conducted study design, collected data for 5000+ samples, and presented findings to professors at University of Toronto.",
    position: 6 / 18,
  },
  {
    year: "Aug 2018 - Jul 2021",
    title: "Point of Sale Associate",
    description:
      "Assisted customers with purchases and course materials at University of Toronto Press.",
    position: 7 / 18,
  },
  {
    year: "Nov 2018 - Apr 2019",
    title: "Pharmacy Assistant at Shoppers",
    description:
      "Supported pharmacists with prescriptions, customer service, and medication organization.",
    position: 8 / 18,
  },
  {
    year: "Dec 2017 - Jun 2019",
    title: "Financial Director",
    description:
      "Managed financial statements and reported to the University of Toronto Student Union for PreDentalClub.",
    position: 9 / 18,
  },
  {
    year: "Nov 2019 - Nov 2020",
    title: "Pharmacy Assistant at Loblaw",
    description:
      "Handled medication packaging, inventory management, and customer service in pharmacy setting.",
    position: 10 / 18,
  },
  {
    year: "Sep 2021 - Dec 2024",
    title: "Software Engineering Technology",
    description:
      "Completed diploma at Centennial College with an 89% grade average, building a technical foundation I now bring into the classroom.",
    position: 11 / 18,
  },
  {
    year: "Jan 2023 - Apr 2023",
    title: "Application Support Analyst",
    description:
      "First co-op at CIBC providing technological support for clients and employees, troubleshooting systems and resolving incidents.",
    position: 12 / 18,
  },
  {
    year: "Sep 2023 - Dec 2023",
    title: "Application Support Analyst",
    description:
      "Second co-op at CIBC enhancing incident management and collaborative problem-solving skills.",
    position: 13 / 18,
  },
  {
    year: "Jun 2021 - Present",
    title: "Pharmacy Assistant",
    description:
      "My ongoing, on-your-feet chapter at Loblaw Companies \u2014 thinking fast, helping people directly, and keeping care personal in a busy environment.",
    position: 14 / 18,
  },
  {
    year: "Aug 2025 - Present",
    title: "Vice Principal \u2014 Spirit of Math Schools",
    description:
      "Leading the Willowdale campus alongside the Campus Principal: supporting teachers, guiding students, and partnering with parents to help bright young minds excel.",
    position: 15 / 18,
  },
  {
    year: "Apr 2026 - Jun 2026",
    title: "Remedial Teacher \u2014 YAAACE",
    description:
      "Teaching the Spirit of Math curriculum for Grades 1\u20137 at YAAACE, supporting students through homework, test prep, and encouragement to close the opportunity gap.",
    position: 16 / 18,
  },
  {
    year: "Present & Onward",
    title: "Educator & Human-Centered Technologist",
    description:
      "Working toward my OCT license and a career rooted in education \u2014 blending a technical background with a genuine love for teaching, mentorship, and human-centered learning.",
    position: 17 / 18,
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
