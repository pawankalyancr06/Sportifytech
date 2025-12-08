import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    id: 1,
    title: "MOBILE APP DEVELOPMENT",
    description: "Intuitive Android and iOS applications built for performance, engagement, and scalability.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <rect x="8" y="2" width="16" height="28" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="10" y="6" width="12" height="18" />
        <rect x="14" y="26" width="4" height="2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "WEBSITE DESIGN & WEB PLATFORMS",
    description: "Responsive, modern, and functional websites — from portfolio sites to complete platform solutions.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <rect x="2" y="4" width="28" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="6" width="24" height="14" />
        <rect x="12" y="24" width="8" height="2" />
        <rect x="8" y="26" width="16" height="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "CUSTOM SPORTS SOFTWARE",
    description: "Management systems, automation tools, athlete tracking, academy management portals, and more.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <rect x="12" y="4" width="8" height="6" />
        <rect x="4" y="12" width="8" height="6" />
        <rect x="20" y="12" width="8" height="6" />
        <rect x="12" y="22" width="8" height="6" />
        <rect x="14" y="10" width="4" height="2" />
        <rect x="10" y="14" width="2" height="4" />
        <rect x="20" y="14" width="2" height="4" />
        <rect x="14" y="20" width="4" height="2" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "DEPLOYMENT & SUPPORT",
    description: "We publish and maintain products on App Store, Google Play, and provide ongoing updates and support.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <rect x="6" y="20" width="4" height="8" />
        <rect x="12" y="14" width="4" height="14" />
        <rect x="18" y="8" width="4" height="20" />
        <rect x="24" y="4" width="4" height="24" />
        <circle cx="8" cy="16" r="2" />
        <circle cx="14" cy="10" r="2" />
        <circle cx="20" cy="4" r="2" />
      </svg>
    ),
  },
];

const processSteps = [
  "Research & Requirement Analysis",
  "Design (UI/UX & System Architecture)",
  "Development & Integration",
  "Testing & Optimization",
  "Store Deployment / Launch",
  "Maintenance, Updates & Scaling",
];

const focusAreas = [
  "Turf & court booking systems",
  "Sports academy management",
  "Community networking apps",
  "Gym & fitness platforms",
  "Match & league management",
  "Sports e-commerce",
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="pixel-card bg-background p-6 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        backgroundColor: "hsl(var(--foreground))",
        color: "hsl(var(--background))",
      }}
    >
      <motion.div
        className="mb-4"
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {service.icon}
      </motion.div>

      <h3 className="font-pixel text-xs mb-3 leading-relaxed">
        {service.title}
      </h3>

      <p className="font-body text-xl opacity-70 group-hover:opacity-100 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 border-2 border-foreground text-sm font-pixel mb-6 pixel-shake">
            WHAT WE DO
          </span>
          <h2 className="font-pixel text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
            OUR SERVICES
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            We specialize in designing and developing digital products tailored exclusively for sports and fitness.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Development Process */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 border-2 border-foreground text-sm font-pixel mb-4">
              DEVELOPMENT APPROACH
            </span>
            <p className="font-body text-xl text-muted-foreground">
              We follow a structured, outcome-driven process
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="pixel-card bg-background p-4 text-center pixel-jump"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              >
                <div className="font-pixel text-xl mb-2 text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-body text-lg leading-relaxed">{step}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          className="pixel-card bg-foreground text-background p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-pixel text-sm mb-3">OUR FOCUS AREAS</h3>
            <p className="font-body text-2xl opacity-80">
              We don't just build products — we build long-term digital systems
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {focusAreas.map((area, i) => (
              <motion.div
                key={i}
                className="p-4 border border-background/30 text-center hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
              >
                <span className="font-body text-lg">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
