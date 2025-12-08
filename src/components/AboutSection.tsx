import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { title: "MISSION", desc: "Revolutionize the sports industry through innovative, accessible technology" },
    { title: "VISION", desc: "A world where every sports activity happens seamlessly through technology" },
  ];

  const highlights = [
    "Industry-focused development",
    "Scalable solutions",
    "User experience first",
    "Startup-friendly pricing",
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 border-2 border-foreground text-sm font-pixel mb-6 pixel-shake">
              WHO WE ARE
            </span>

            <h2 className="font-pixel text-lg md:text-xl lg:text-2xl mb-8 leading-loose">
              NEXT-GEN SPORTS
              <span className="block text-muted-foreground">TECHNOLOGY STARTUP</span>
            </h2>

            <div className="space-y-5 font-body text-xl text-muted-foreground leading-relaxed">
              <p>
                SportifyTech is a next-generation technology startup focused on creating
                powerful, user-friendly digital solutions for the sports and fitness ecosystem.
              </p>
              <p>
                We exist to bridge the gap between sports and modern technology — transforming
                how players train, how organizations operate, and how communities connect.
              </p>
              <p>
                We build software, apps, and digital tools that empower founders, academies,
                venues, coaches, athletes, and sports brands to scale without limits.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mt-10">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 pixel-jump cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-2 h-2 bg-foreground" />
                  <span className="text-base font-body tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Mission & Vision cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                className="pixel-card bg-background p-6 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-pixel">
                    {i === 0 ? "🎯" : "👁"}
                  </div>
                  <div>
                    <h3 className="font-pixel text-xs mb-3">{value.title}</h3>
                    <p className="font-body text-xl opacity-80 group-hover:opacity-100 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Tech ecosystem visual */}
            <motion.div
              className="pixel-card bg-foreground text-background p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h3 className="font-pixel text-xs mb-4">WE BUILD FOR</h3>
              <div className="flex flex-wrap gap-2">
                {["Founders", "Academies", "Venues", "Coaches", "Athletes", "Brands"].map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-background/40 font-body text-base hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "10+", label: "projects" },
                { num: "24/7", label: "Support" },
                { num: "100%", label: "Dedicated" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="pixel-card bg-background p-4 text-center pixel-jump"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                >
                  <div className="font-pixel text-base md:text-lg">{stat.num}</div>
                  <div className="font-body text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
