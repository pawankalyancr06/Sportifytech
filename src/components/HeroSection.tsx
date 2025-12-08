import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

// Pixel art ball component
const PixelBall = ({ type }: { type: string }) => {
  const balls: Record<string, JSX.Element> = {
    tennis: (
      <svg width="32" height="32" viewBox="0 0 16 16" className="pixel-ball">
        <rect x="5" y="1" width="6" height="1" fill="currentColor" />
        <rect x="3" y="2" width="2" height="1" fill="currentColor" />
        <rect x="11" y="2" width="2" height="1" fill="currentColor" />
        <rect x="2" y="3" width="1" height="2" fill="currentColor" />
        <rect x="13" y="3" width="1" height="2" fill="currentColor" />
        <rect x="1" y="5" width="1" height="6" fill="currentColor" />
        <rect x="14" y="5" width="1" height="6" fill="currentColor" />
        <rect x="2" y="11" width="1" height="2" fill="currentColor" />
        <rect x="13" y="11" width="1" height="2" fill="currentColor" />
        <rect x="3" y="13" width="2" height="1" fill="currentColor" />
        <rect x="11" y="13" width="2" height="1" fill="currentColor" />
        <rect x="5" y="14" width="6" height="1" fill="currentColor" />
        <rect x="4" y="6" width="1" height="4" fill="currentColor" />
        <rect x="5" y="5" width="1" height="1" fill="currentColor" />
        <rect x="5" y="10" width="1" height="1" fill="currentColor" />
        <rect x="11" y="6" width="1" height="4" fill="currentColor" />
        <rect x="10" y="5" width="1" height="1" fill="currentColor" />
        <rect x="10" y="10" width="1" height="1" fill="currentColor" />
      </svg>
    ),
    cricket: (
      <svg width="28" height="28" viewBox="0 0 16 16" className="pixel-ball">
        <rect x="6" y="1" width="4" height="1" fill="currentColor" />
        <rect x="4" y="2" width="2" height="1" fill="currentColor" />
        <rect x="10" y="2" width="2" height="1" fill="currentColor" />
        <rect x="3" y="3" width="1" height="1" fill="currentColor" />
        <rect x="12" y="3" width="1" height="1" fill="currentColor" />
        <rect x="2" y="4" width="1" height="2" fill="currentColor" />
        <rect x="13" y="4" width="1" height="2" fill="currentColor" />
        <rect x="1" y="6" width="1" height="4" fill="currentColor" />
        <rect x="14" y="6" width="1" height="4" fill="currentColor" />
        <rect x="2" y="10" width="1" height="2" fill="currentColor" />
        <rect x="13" y="10" width="1" height="2" fill="currentColor" />
        <rect x="3" y="12" width="1" height="1" fill="currentColor" />
        <rect x="12" y="12" width="1" height="1" fill="currentColor" />
        <rect x="4" y="13" width="2" height="1" fill="currentColor" />
        <rect x="10" y="13" width="2" height="1" fill="currentColor" />
        <rect x="6" y="14" width="4" height="1" fill="currentColor" />
        <rect x="7" y="3" width="2" height="1" fill="currentColor" />
        <rect x="7" y="12" width="2" height="1" fill="currentColor" />
      </svg>
    ),
    football: (
      <svg width="36" height="36" viewBox="0 0 20 20" className="pixel-ball">
        <rect x="7" y="1" width="6" height="1" fill="currentColor" />
        <rect x="5" y="2" width="2" height="1" fill="currentColor" />
        <rect x="13" y="2" width="2" height="1" fill="currentColor" />
        <rect x="3" y="3" width="2" height="1" fill="currentColor" />
        <rect x="15" y="3" width="2" height="1" fill="currentColor" />
        <rect x="2" y="4" width="1" height="2" fill="currentColor" />
        <rect x="17" y="4" width="1" height="2" fill="currentColor" />
        <rect x="1" y="6" width="1" height="8" fill="currentColor" />
        <rect x="18" y="6" width="1" height="8" fill="currentColor" />
        <rect x="2" y="14" width="1" height="2" fill="currentColor" />
        <rect x="17" y="14" width="1" height="2" fill="currentColor" />
        <rect x="3" y="16" width="2" height="1" fill="currentColor" />
        <rect x="15" y="16" width="2" height="1" fill="currentColor" />
        <rect x="5" y="17" width="2" height="1" fill="currentColor" />
        <rect x="13" y="17" width="2" height="1" fill="currentColor" />
        <rect x="7" y="18" width="6" height="1" fill="currentColor" />
        <rect x="8" y="7" width="4" height="1" fill="currentColor" />
        <rect x="7" y="8" width="1" height="4" fill="currentColor" />
        <rect x="12" y="8" width="1" height="4" fill="currentColor" />
        <rect x="8" y="12" width="4" height="1" fill="currentColor" />
      </svg>
    ),
    basketball: (
      <svg width="34" height="34" viewBox="0 0 18 18" className="pixel-ball">
        <rect x="6" y="1" width="6" height="1" fill="currentColor" />
        <rect x="4" y="2" width="2" height="1" fill="currentColor" />
        <rect x="12" y="2" width="2" height="1" fill="currentColor" />
        <rect x="2" y="4" width="2" height="1" fill="currentColor" />
        <rect x="14" y="4" width="2" height="1" fill="currentColor" />
        <rect x="1" y="6" width="1" height="6" fill="currentColor" />
        <rect x="16" y="6" width="1" height="6" fill="currentColor" />
        <rect x="2" y="13" width="2" height="1" fill="currentColor" />
        <rect x="14" y="13" width="2" height="1" fill="currentColor" />
        <rect x="4" y="15" width="2" height="1" fill="currentColor" />
        <rect x="12" y="15" width="2" height="1" fill="currentColor" />
        <rect x="6" y="16" width="6" height="1" fill="currentColor" />
        <rect x="8" y="2" width="1" height="14" fill="currentColor" />
        <rect x="2" y="8" width="14" height="1" fill="currentColor" />
      </svg>
    ),
    volleyball: (
      <svg width="30" height="30" viewBox="0 0 16 16" className="pixel-ball">
        <rect x="5" y="1" width="6" height="1" fill="currentColor" />
        <rect x="3" y="2" width="2" height="1" fill="currentColor" />
        <rect x="11" y="2" width="2" height="1" fill="currentColor" />
        <rect x="2" y="3" width="1" height="2" fill="currentColor" />
        <rect x="13" y="3" width="1" height="2" fill="currentColor" />
        <rect x="1" y="5" width="1" height="6" fill="currentColor" />
        <rect x="14" y="5" width="1" height="6" fill="currentColor" />
        <rect x="2" y="11" width="1" height="2" fill="currentColor" />
        <rect x="13" y="11" width="1" height="2" fill="currentColor" />
        <rect x="3" y="13" width="2" height="1" fill="currentColor" />
        <rect x="11" y="13" width="2" height="1" fill="currentColor" />
        <rect x="5" y="14" width="6" height="1" fill="currentColor" />
        <rect x="7" y="2" width="1" height="5" fill="currentColor" />
        <rect x="4" y="7" width="4" height="1" fill="currentColor" />
        <rect x="8" y="8" width="5" height="1" fill="currentColor" />
        <rect x="7" y="9" width="1" height="4" fill="currentColor" />
      </svg>
    ),
    shuttlecock: (
      <svg width="26" height="26" viewBox="0 0 16 16" className="pixel-ball">
        <rect x="7" y="1" width="2" height="2" fill="currentColor" />
        <rect x="6" y="3" width="4" height="2" fill="currentColor" />
        <rect x="5" y="5" width="6" height="1" fill="currentColor" />
        <rect x="4" y="6" width="2" height="4" fill="currentColor" />
        <rect x="10" y="6" width="2" height="4" fill="currentColor" />
        <rect x="7" y="6" width="2" height="6" fill="currentColor" />
        <rect x="3" y="10" width="2" height="4" fill="currentColor" />
        <rect x="11" y="10" width="2" height="4" fill="currentColor" />
        <rect x="5" y="12" width="2" height="2" fill="currentColor" />
        <rect x="9" y="12" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    logo: (
      <img
        src="/grid-logo.png"
        alt="S"
        className="pixel-ball w-14 h-14 object-contain rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
      />
    ),
  };
  return balls[type] || balls.tennis;
};

// Single ball in the grid
interface GridBall {
  id: number;
  x: number;
  y: number;
  type: string;
  baseX: number;
  baseY: number;
}

const AntigravityBall = ({ ball, mouseX, mouseY }: {
  ball: GridBall;
  mouseX: number;
  mouseY: number;
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { damping: 15, stiffness: 150 });
  const springY = useSpring(0, { damping: 15, stiffness: 150 });

  useEffect(() => {
    const dx = mouseX - ball.baseX;
    const dy = mouseY - ball.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 30;
      const angle = Math.atan2(dy, dx);
      springX.set(-Math.cos(angle) * force);
      springY.set(-Math.sin(angle) * force);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mouseX, mouseY, ball.baseX, ball.baseY, springX, springY]);

  return (
    <motion.div
      className="absolute text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
      style={{
        left: ball.baseX,
        top: ball.baseY,
        x: springX,
        y: springY,
      }}
      whileHover="hover"
      initial="idle"
      animate="idle"
    >
      <motion.div
        variants={{
          idle: {
            rotate: [0, 5, -5, 0],
            transition: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          },
          hover: {
            scale: 1.3,
            rotate: [0, -10, 10, -10, 10, 0],
            transition: {
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror"
            }
          }
        }}
      >
        <PixelBall type={ball.type} />
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [balls, setBalls] = useState<GridBall[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const ballTypes = ["tennis", "cricket", "football", "basketball", "volleyball", "shuttlecock", "logo", "logo", "logo", "logo"];

  // Generate grid of balls
  useEffect(() => {
    const generateBalls = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });

      const gridCols = Math.floor(width / 120);
      const gridRows = Math.floor(height / 120);
      const cellWidth = width / gridCols;
      const cellHeight = height / gridRows;

      const newBalls: GridBall[] = [];
      let id = 0;

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          // Skip center area for content
          const centerX = width / 2;
          const centerY = height / 2;
          const ballX = col * cellWidth + cellWidth / 2;
          const ballY = row * cellHeight + cellHeight / 2;

          const distFromCenter = Math.sqrt(
            Math.pow(ballX - centerX, 2) + Math.pow(ballY - centerY, 2)
          );

          // Leave center clear for text
          if (distFromCenter < 200) continue;

          // Add some randomness to position
          const offsetX = (Math.random() - 0.5) * 40;
          const offsetY = (Math.random() - 0.5) * 40;

          newBalls.push({
            id: id++,
            x: ballX + offsetX,
            y: ballY + offsetY,
            baseX: ballX + offsetX,
            baseY: ballY + offsetY,
            type: ballTypes[Math.floor(Math.random() * ballTypes.length)],
          });
        }
      }

      setBalls(newBalls);
    };

    generateBalls();
    window.addEventListener("resize", generateBalls);
    return () => window.removeEventListener("resize", generateBalls);
  }, []);

  // Track mouse position
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Antigravity balls grid */}
      <div className="absolute inset-0 pointer-events-none">
        {balls.map((ball) => (
          <AntigravityBall
            key={ball.id}
            ball={ball}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
          />
        ))}
      </div>

      {/* Main content - minimal & centered */}
      <div className="relative z-20 pixel-card bg-background px-8 py-10 max-w-xl mx-auto w-fit text-center space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none border-2 border-foreground">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-pixel text-xl md:text-2xl lg:text-3xl mb-3 leading-relaxed tracking-wider">
            SPORTIFYTECH
          </h1>
          <p className="font-pixel text-xs md:text-sm text-muted-foreground mb-2">
            Building the Future of Sports Technology
          </p>
        </motion.div>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground mb-6 tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Sports. Motion. Technology.
        </motion.p>

        <motion.a
          href="#about"
          className="inline-block px-8 py-4 bg-foreground text-background font-pixel text-[10px] pixel-button hover:bg-background hover:text-foreground border-2 border-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          EXPLORE PORTFOLIO
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span
            className="font-body text-3xl"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ▼
          </motion.span>
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </section>
  );
};

export default HeroSection;
