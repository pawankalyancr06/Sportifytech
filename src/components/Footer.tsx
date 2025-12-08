import { motion } from "framer-motion";
import BasketballGame from "./BasketballGame";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="font-pixel text-lg inline-flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="SportifyTech Logo" className="w-8 h-8" />
              <span>SPORTIFY<span className="text-muted-foreground">TECH</span></span>
            </a>
            <p className="text-muted-foreground font-body text-lg max-w-sm leading-relaxed">
              Building the future of sports technology. Empowering founders, academies,
              venues, coaches, athletes, and sports brands to scale without limits.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-base uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["About", "Services", "Portfolio", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors animated-underline inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-base uppercase tracking-widest mb-4">Connect</h4>
            <ul className="space-y-2">
              {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors animated-underline inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-base text-muted-foreground">
            © {currentYear} SportifyTech. All rights reserved.
          </div>

          {/* Mini Basketball Game - Interactive Footer Element */}
          <div className="hidden lg:block">
            <BasketballGame />
          </div>

          <div className="flex items-center gap-6 text-base text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Large decorative text */}
        <motion.div
          className="mt-16 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="font-pixel text-[6vw] font-bold text-foreground whitespace-nowrap marquee flex opacity-100 rendering-pixelated">
            <span className="mr-8">SPORTIFYTECH</span>
            <span className="mr-8">•</span>
            <span className="mr-8">INNOVATION</span>
            <span className="mr-8">•</span>
            <span className="mr-8">TECHNOLOGY</span>
            <span className="mr-8">•</span>
            <span className="mr-8">SPORTIFYTECH</span>
            <span className="mr-8">•</span>
            <span className="mr-8">INNOVATION</span>
            <span className="mr-8">•</span>
            <span className="mr-8">TECHNOLOGY</span>
            <span className="mr-8">•</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
