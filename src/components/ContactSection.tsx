import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "MESSAGE SENT!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    { label: "EMAIL", value: "support@sportifytech.co.in", href: "mailto:support@sportifytech.co.in" },
    { label: "PHONE", value: "+91 9372446534", href: "tel:+919372446534" },
    { label: "LOCATION", value: "India", href: "#" },
  ];

  const socialLinks = [
    { name: "TWITTER", href: "#" },
    { name: "LINKEDIN", href: "#" },
    { name: "INSTAGRAM", href: "#" },
    { name: "GITHUB", href: "#" },
  ];

  const whyChooseUs = [
    "Industry-focused development approach",
    "Scalable, future-proof solutions",
    "Strong focus on user experience",
    "Transparent workflow and timelines",
    "Built for real-world operational efficiency",
    "Startup-friendly mindset and pricing",
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 border-2 border-foreground text-sm font-pixel mb-6 pixel-shake">
            GET IN TOUCH
          </span>
          <h2 className="font-pixel text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
            LET'S BUILD TOGETHER
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-xl mx-auto">
            We build tech that works today and evolves tomorrow.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mb-16 pixel-card bg-foreground text-background p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-pixel text-sm mb-6 text-center">⭐ WHY CHOOSE US</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-3 border border-background/20 hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              >
                <div className="w-2 h-2 bg-background group-hover:bg-foreground" />
                <span className="font-body text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center max-w-2xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block pixel-card bg-background p-4 pixel-jump"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                >
                  <div className="font-pixel text-xs text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="font-body text-xl pixel-underline inline-block">
                    {item.value}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              className="mt-6 pixel-card bg-background p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="font-pixel text-xs text-muted-foreground mb-4">
                FOLLOW US
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <div key={link.name} className="relative group">
                    <a
                      href={link.href}
                      className="px-4 py-2 border-2 border-foreground font-body text-base hover:bg-foreground hover:text-background transition-colors pixel-jump block"
                    >
                      {link.name}
                    </a>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-[8px] px-1 font-pixel opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      COMING SOON
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              className="mt-6 pixel-card bg-foreground text-background p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-background pixel-blink" />
                <span className="font-pixel text-xs">OPEN FOR PROJECTS</span>
              </div>
              <p className="font-body text-lg opacity-80">
                Response time: typically within 24 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form removed */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
