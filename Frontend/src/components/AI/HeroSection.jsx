import "./HeroSection.css";

import { motion } from "framer-motion";

import bhula from "../../assets/ai/bhula.png";

import TypewriterText from "./TypewriterText";
import WelcomeCard from "./WelcomeCard";
import SuggestionChips from "./SuggestionChips";
import { useEffect, useState } from "react";
import {
  fadeUp,
  scaleIn,
  floatAnimation,
  staggerContainer,
} from "../../animations/variants";

export default function HeroSection() {
    const [step, setStep] = useState(0);

useEffect(() => {
  const timers = [
    setTimeout(() => setStep(1), 500),   // Bhula
    setTimeout(() => setStep(2), 1200),  // Namaste
    setTimeout(() => setStep(3), 1800),  // Title
    setTimeout(() => setStep(4), 2600),  // Subtitle
    setTimeout(() => setStep(5), 3400),  // Welcome Card
    setTimeout(() => setStep(6), 4000),  // Chips
    setTimeout(() => setStep(7), 4700),  // Button
  ];

  return () => timers.forEach(clearTimeout);
}, []);
  return (
    <motion.section
      className="hero-section"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-content">

  {step >= 2 && (
    <motion.span
      className="hero-tag"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      Namaste 🙏
    </motion.span>
  )}

    {step >= 1 && (
    <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
    >
        <motion.img
        src={bhula}
        alt="Bhula"
        className="hero-mascot"
        animate={floatAnimation}
        />
    </motion.div>
    )}

  {step >= 3 && (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      Your Pahadi Bhula
    </motion.h1>
  )}

  {step >= 4 && (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <TypewriterText
        text="Your trusted Himalayan companion for authentic products, wellness, recipes, traditions and creativity."
        speed={25}
        delay={100}
        className="hero-subtitle"
      />
    </motion.div>
  )}

  {step >= 5 && (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <WelcomeCard />
    </motion.div>
  )}

  {step >= 6 && (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <SuggestionChips />
    </motion.div>
  )}

  {step >= 7 && (
    <motion.button
      className="explore-btn"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      whileTap={{
        scale: 0.96,
      }}
    >
      ✨ Start Exploring
    </motion.button>
  )}

</motion.div>
    </motion.section>
  );
}