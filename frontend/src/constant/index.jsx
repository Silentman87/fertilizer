import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


import user1 from "../asset/profile-pictures/user11.jpg";
import user2 from "../asset/profile-pictures/user22.jpg";
import user3 from "../asset/profile-pictures/user33.jpg";
import user4 from "../asset/profile-pictures/user44.jpg";
import user5 from "../asset/profile-pictures/user55.jpg";
import user6 from "../asset/profile-pictures/user66.jpg";
import { href } from "react-router-dom";

export  const societyData = {
    Bharad: ["Tukrana", "Dalod", "Rampura", "Bhainslana", "Kanpura", "Sangod", "Devli", "Khajuri", "Mundiyad", "Dhamaniya"],
    Shujalpur: ["Goriyakheda", "Kaladera", "Barwala", "Lalpura", "Bhojpura", "Kumharia", "Bilochi", "Dholi", "Hanspur", "Kachroda"],
    Sarangpur: ["Ghat ki Guni", "Maujmabad", "Dudu", "Sambhar", "Jobner", "Kishorpura", "Bhankrota", "Bagru", "Narena", "Renwal"],
    Maksi: ["Chomu", "Amer", "Sanganer", "Kotputli", "Bassi", "Jhotwara", "Chaksu", "Jamwa Ramgarh", "Phulera", "Manoharpura"],
    kalapipal: ["Bhandana", "Salempura", "Murlipura", "Charanwas", "Raghunathpura", "Goneda", "Madhorajpura", "Barh", "Rangpura", "Dudka"]
  };
  
export const navItems = [
  {label: "Home", href:"/"},
  { label: "Feature", href: "/feature" },
  { label: "Workflow", href: "/workflow" },
  {label: "Services", href: "/herosection"},
  { label: "Opinion", href: "/opinion" }
];


export const testimonials = [
 {
  user: "Ramesh Patel",
  company: "Bhainsrodgarh Village Society",
  image: user1,
  text: "The digital fertilizer tracking system made it so easy for us to monitor stock and serve farmers efficiently. It has improved transparency like never before.",
},
{
  user: "Suresh Patidar",
  company: "Rampura Farmers Cooperative",
  image: user2,
  text: "We can now verify farmers quickly and avoid misuse. The platform has saved us time and brought fairness to the process.",
},
{
  user: "Anil Choudhary",
  company: "Dalod Distribution Unit",
  image: user3,
  text: "Earlier we had to manage everything manually. Now, with this system, distribution records and reports are just a click away. It’s a game-changer.",
},
{
  user: "Motilal",
  company: "Tukrana Agriculture Department",
  image: user4,
  text: "This tool helped our team serve hundreds of farmers faster, especially during the peak season. We’re truly grateful for the simplicity and effectiveness.",
},
{
  user: "Vinod dhakad",
  company: "Shajapur District Supply Center",
  image: user5,
  text: "From arrival logs to farmer records, everything is tracked in real-time. No more delays, no more confusion. Excellent work!",
},
{
  user: "Rameshwar modi",
  company: "Society Admin, Bhainslay",
  image: user6,
  text: "The collaboration between societies has become so smooth. We can now share info, manage stocks, and handle demand with total transparency.",
}
];

export const features = [
  {
  icon: <BotMessageSquare />,
  text: "Check Fertilizer Availability",
  description:
    "Instantly view available fertilizer types, quantities, and arrival dates at your nearest society.",
},
{
  icon: <Fingerprint />,
  text: "Farmer Verification",
  description:
    "Secure and easy verification using Aadhaar-linked profiles to prevent misuse and ensure fair distribution.",
},
{
  icon: <ShieldHalf />,
  text: "Predefined Distribution Templates",
  description:
    "Use built-in templates to streamline society-level fertilizer planning and transparent delivery scheduling.",
},
{
  icon: <BatteryCharging />,
  text: "Live Stock Updates",
  description:
    "Get real-time stock status as fertilizers are added or distributed to ensure accuracy and trust.",
},
{
  icon: <PlugZap />,
  text: "Society Collaboration",
  description:
    "Multiple village societies can coordinate and share data to avoid duplication and enhance reach.",
},
{
  icon: <GlobeLock />,
  text: "Distribution Analytics",
  description:
    "Track fertilizer usage, seasonal demand trends, and beneficiary stats through an integrated analytics dashboard.",
}

];

export const checklistItems = [
 {
  title: "Real-Time Fertilizer Tracking",
  description:
    "Monitor stock levels and movement of fertilizers across societies to ensure timely delivery and prevent shortages.",
},
{
  title: "Verified Farmer Access",
  description:
    "Only verified farmers can request or receive fertilizer, ensuring fair and transparent distribution.",
},
{
  title: "Automated Allocation Suggestions",
  description:
    "AI-powered logic recommends fertilizer allocation based on seasonal needs, soil health, and demand trends.",
},
{
  title: "Instant Report Generation",
  description:
    "Generate and share reports on stock, usage, and farmer distribution in just a few clicks.",
}

];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];