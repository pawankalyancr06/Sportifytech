import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const comingSoonProducts = [
  {
    id: 1,
    title: "SPORTIFY",
    subtitle: "The Sports Community App",
    status: "In Development",
    description: "A modern platform where players, coaches, and sports enthusiasts can connect with local communities, discover tournaments, create teams, and share achievements.",
    features: [
      "Connect with local sports communities",
      "Discover tournaments, grounds, events",
      "Create or join teams",
      "Share progress & achievements",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-20 h-20" fill="currentColor">
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="16" r="6" />
        <circle cx="14" cy="32" r="4" />
        <circle cx="34" cy="32" r="4" />
        <line x1="24" y1="22" x2="24" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="28" x2="14" y2="32" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="28" x2="34" y2="32" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "TURFENGINE",
    subtitle: "Smart Booking & Venue Management",
    status: "In Development",
    description: "A powerful booking engine for turfs, courts, gyms, arenas, and sports clubs. Designed to eliminate double-booking and automate operations.",
    features: [
      "Eliminate double-booking",
      "Automate schedules",
      "Manage payments",
      "Track usage in real-time",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-20 h-20" fill="currentColor">
        <rect x="4" y="8" width="40" height="32" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="8" y="12" width="14" height="10" />
        <rect x="26" y="12" width="14" height="10" />
        <rect x="8" y="26" width="14" height="10" />
        <rect x="26" y="26" width="14" height="10" />
        <rect x="4" y="4" width="8" height="4" />
        <rect x="36" y="4" width="8" height="4" />
      </svg>
    ),
  },
];



const ComingSoonCard = ({ product, index }: { product: typeof comingSoonProducts[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="pixel-card bg-background p-8 group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Icon */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {product.icon}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-pixel text-sm md:text-lg mb-1">{product.title}</h3>
              <p className="font-body text-xl text-muted-foreground">{product.subtitle}</p>
            </div>
            <span className="px-3 py-1 bg-foreground text-background font-pixel text-[10px] pixel-blink">
              {product.status}
            </span>
          </div>

          <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {product.features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
              >
                <div className="w-2 h-2 bg-foreground" />
                <span className="font-body text-base">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};



const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Coming Soon Section */}
        <motion.div
          ref={ref}
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-foreground text-background text-sm font-pixel mb-6">
              🔥 COMING SOON
            </span>
            <h2 className="font-pixel text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
              MAJOR PLATFORMS
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Two game-changing platforms designed to reshape digital sports experiences
            </p>
          </div>

          <div className="space-y-6">
            {comingSoonProducts.map((product, i) => (
              <ComingSoonCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}

      </div>
    </section>
  );
};

export default PortfolioSection;
