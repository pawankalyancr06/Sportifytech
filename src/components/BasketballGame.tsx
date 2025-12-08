import { useEffect, useRef, useState } from 'react';

const BasketballGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Game configuration
    const SCALE = 2; // Pixel scaling factor
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 200;

    // Refs for game state to avoid stale closures in the loop
    const stateRef = useRef({
        screen: 'START', // START, PLAYING, GAMEOVER
        score: 0,
        highScore: 0,
        keys: {} as { [key: string]: boolean },
        difficulty: 1.0,

        player: {
            x: 50,
            y: 0, // Calculated in init
            w: 14,
            h: 24,
            vx: 0,
            speed: 3
        },

        ball: {
            x: 0,
            y: 0,
            r: 5,
            vx: 0,
            vy: 0,
            isHeld: true,
            active: false, // If true, ball is in air
            scored: false
        },

        hoop: {
            x: 340,
            y: 110, // Lower start height
            w: 24,
            h: 4,
            targetY: 110
        },

        particles: [] as { x: number, y: number, vx: number, vy: number, life: number, color: string }[]
    });

    // Force re-render for UI overlays only
    const [, setTick] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Setup Canvas
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        ctx.imageSmoothingEnabled = false;

        // Constants
        const FLOOR_Y = CANVAS_HEIGHT - 10;
        const GRAVITY = 0.4;

        // Init State
        const init = () => {
            const s = stateRef.current;
            s.player.y = FLOOR_Y - s.player.h;
            resetBall();
        };

        const resetBall = () => {
            const s = stateRef.current;
            s.ball.isHeld = true;
            s.ball.active = false;
            s.ball.scored = false;
            s.ball.vx = 0;
            s.ball.vy = 0;
        };

        const randomizeHoop = () => {
            const s = stateRef.current;
            // Random height between 80 and 150
            s.hoop.y = Math.floor(Math.random() * 70) + 80;
        };

        const spawnConfetti = (x: number, y: number) => {
            const s = stateRef.current;
            for (let i = 0; i < 15; i++) {
                s.particles.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 5,
                    vy: (Math.random() - 0.5) * 5,
                    life: 1.0,
                    color: Math.random() > 0.5 ? '#FFD700' : '#FFFFFF'
                });
            }
        };

        const startGame = () => {
            const s = stateRef.current;
            s.score = 0;
            s.difficulty = 1.0;
            s.screen = 'PLAYING';
            s.hoop.y = 110; // Starting lower
            resetBall();
            setTick(t => t + 1);
        };

        const gameOver = () => {
            const s = stateRef.current;
            s.screen = 'GAMEOVER';
            if (s.score > s.highScore) s.highScore = s.score;
            setTick(t => t + 1);
        };

        // --- DRAWING HELPERS ---

        const drawRect = (x: number, y: number, w: number, h: number, color: string) => {
            ctx.fillStyle = color;
            ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
        };

        const drawPixelText = (text: string, x: number, y: number, size: number, color: string, align: 'left' | 'center' | 'right' = 'left') => {
            ctx.fillStyle = color;
            ctx.font = `${size}px "VT323", monospace`;
            ctx.textAlign = align;
            ctx.fillText(text, x, y);
        };

        // --- SPRITES ---

        const drawBall = (x: number, y: number, r: number) => {
            // Main body
            const d = r * 2;
            drawRect(x - r + 1, y - r, d - 2, d, '#F97316'); // Orange
            drawRect(x - r, y - r + 1, d, d - 2, '#F97316');

            // Highlights/Shading (Pixel art style)
            drawRect(x - r + 2, y - r + 2, 2, 2, '#FECCB1'); // Highlight
            drawRect(x + 1, y + 1, r, 1, '#EA580C'); // Shadow line
            drawRect(x - r + 2, y + 2, d - 4, 1, '#EA580C'); // Center line
        };

        const drawPlayer = (x: number, y: number, w: number, h: number, isShooting: boolean) => {
            // Body (Black outline aesthetic like site)
            ctx.fillStyle = '#000000';
            ctx.fillRect(x, y, w, h);

            // Inner fill (White/Grey)
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(x + 2, y + 2, w - 4, h - 4);

            // Face/Visor
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 4, y + 4, w - 6, 4);

            // Arm
            ctx.fillStyle = '#000000';
            if (isShooting) {
                // Upward arm
                ctx.fillRect(x + w, y + 2, 4, 10);
            } else {
                // Downward arm
                ctx.fillRect(x + 4, y + 10, 4, 8);
            }
        };

        const drawHoop = (hx: number, hy: number) => {
            // Pole
            drawRect(hx + 20, hy, 6, FLOOR_Y - hy, '#333333');
            drawRect(hx + 18, hy, 2, FLOOR_Y - hy, '#111111'); // Shading

            // Backboard
            drawRect(hx + 10, hy - 25, 4, 40, '#FFFFFF');
            drawRect(hx + 12, hy - 23, 2, 36, '#EEEEEE'); // Detail
            // Backboard Border
            drawRect(hx + 10, hy - 25, 4, 1, '#000000');
            drawRect(hx + 10, hy + 15, 4, 1, '#000000');

            // Rim
            drawRect(hx - 12, hy, 24, 3, '#DC2626'); // Red

            // Net
            ctx.strokeStyle = '#CCCCCC';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(hx - 12, hy + 3);
            ctx.lineTo(hx - 8, hy + 12);
            ctx.lineTo(hx - 4, hy + 3);
            ctx.lineTo(hx, hy + 12);
            ctx.lineTo(hx + 4, hy + 3);
            ctx.lineTo(hx + 8, hy + 12);
            ctx.lineTo(hx + 12, hy + 3);
            ctx.stroke();
        };

        // --- LOOP ---

        const update = () => {
            const s = stateRef.current;

            // Update Particles
            for (let i = s.particles.length - 1; i >= 0; i--) {
                const p = s.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.05;
                if (p.life <= 0) s.particles.splice(i, 1);
            }

            if (s.screen === 'PLAYING') {
                const { keys, player, ball, hoop } = s;

                // Player Move
                if (keys['ArrowLeft'] || keys['a']) player.x = Math.max(10, player.x - player.speed);
                if (keys['ArrowRight'] || keys['d']) player.x = Math.min(CANVAS_WIDTH / 2, player.x + player.speed);

                // Restart (R key)
                if (keys['r']) {
                    if (s.screen === 'GAMEOVER') startGame();
                    else if (s.screen === 'PLAYING') resetBall();
                }

                // Shoot logic
                if ((keys[' '] || keys['Spacebar']) && ball.isHeld) {
                    ball.isHeld = false;
                    ball.active = true;
                    ball.x = player.x + player.w;
                    ball.y = player.y; // Release height

                    // Velocity calculation
                    const speed = (5 + Math.random()) * s.difficulty;
                    ball.vx = speed;
                    ball.vy = -7.5; // Arc
                }

                // Ball Physics
                if (ball.isHeld) {
                    ball.x = player.x + player.w;
                    ball.y = player.y + 10;
                } else if (ball.active) {
                    ball.x += ball.vx;
                    ball.y += ball.vy;
                    ball.vy += GRAVITY;

                    // Rim Collision Check
                    const rimLeft = hoop.x - 12;
                    const rimRight = hoop.x + 12;
                    const rimY = hoop.y;

                    // Simple Rim Bounce (hitting the front of the rim)
                    const dx = ball.x - rimLeft;
                    const dy = ball.y - rimY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < ball.r + 2) {
                        ball.vx *= -0.7;
                        ball.vy *= -0.7;
                    }

                    // Backboard Collision & Anti-Stick
                    if (ball.x + ball.r > hoop.x + 10 && ball.y < hoop.y + 15 && ball.y > hoop.y - 25) {
                        // Check if hitting the front of backboard
                        if (Math.abs(ball.x - (hoop.x + 10)) < ball.r + 4) {
                            ball.vx *= -0.5;
                            // Force move ball away so it doesn't get stuck inside
                            ball.x = hoop.x + 10 - ball.r - 2;
                        }
                    }

                    // Scoring Logic
                    if (!ball.scored && ball.vy > 0 &&
                        ball.x > rimLeft + 2 && ball.x < rimRight - 2 &&
                        ball.y > rimY && ball.y < rimY + 10) {

                        s.score++;
                        ball.scored = true;
                        s.difficulty += 0.05;
                        spawnConfetti(ball.x, ball.y);
                        randomizeHoop();

                        ball.vy *= 0.8;
                    }

                    // Floor / Game Over
                    if (ball.y >= FLOOR_Y - ball.r) {
                        ball.y = FLOOR_Y - ball.r;
                        ball.vy *= -0.5;
                        ball.vx *= 0.9;

                        if (Math.abs(ball.vy) < 1) {
                            ball.active = false;
                            if (ball.scored) {
                                resetBall();
                            } else {
                                gameOver();
                            }
                        }
                    }

                    // Out of bounds right
                    if (ball.x > CANVAS_WIDTH + 20) {
                        ball.active = false;
                        if (ball.scored) resetBall();
                        else gameOver();
                    }
                }
            }
        };

        const draw = () => {
            const s = stateRef.current;

            // Clear
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Grid Background (subtle)
            ctx.strokeStyle = '#F5F5F5';
            ctx.lineWidth = 1;
            for (let x = 0; x < CANVAS_WIDTH; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke(); }
            for (let y = 0; y < CANVAS_HEIGHT; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke(); }

            // Floor
            drawRect(0, FLOOR_Y, CANVAS_WIDTH, CANVAS_HEIGHT - FLOOR_Y, '#000000');

            // Hoop
            drawHoop(s.hoop.x, s.hoop.y);

            // Player
            drawPlayer(s.player.x, s.player.y, s.player.w, s.player.h, !s.ball.isHeld);

            // Ball
            if (s.ball.x > -50) {
                drawBall(s.ball.x, s.ball.y, s.ball.r);
            }

            // Particles
            s.particles.forEach(p => {
                ctx.globalAlpha = p.life;
                drawRect(p.x, p.y, 4, 4, p.color);
                ctx.globalAlpha = 1.0;
            });

            // HUD
            if (s.screen === 'PLAYING' || s.screen === 'GAMEOVER') {
                drawPixelText(`SCORE ${s.score}`, 10, 30, 24, '#000000');
            }

            // Screens
            if (s.screen === 'START') {
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                drawPixelText("PIXEL HOOPS", CANVAS_WIDTH / 2, 80, 48, '#000000', 'center');
                if (Math.floor(Date.now() / 500) % 2 === 0) {
                    drawPixelText("PRESS ENTER TO START", CANVAS_WIDTH / 2, 130, 20, '#333333', 'center');
                }
                drawPixelText("ARROWS: MOVE  SPACE: SHOOT  R: RESET", CANVAS_WIDTH / 2, 160, 14, '#666666', 'center');
            } else if (s.screen === 'GAMEOVER') {
                ctx.fillStyle = 'rgba(0,0,0,0.85)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                drawPixelText("GAME OVER", CANVAS_WIDTH / 2, 70, 48, '#FFFFFF', 'center');
                drawPixelText(`FINAL SCORE: ${s.score}`, CANVAS_WIDTH / 2, 110, 24, '#FFD700', 'center');

                // Button visualization
                const btnY = 140;
                drawRect(CANVAS_WIDTH / 2 - 100, btnY, 200, 40, '#FFFFFF');
                drawRect(CANVAS_WIDTH / 2 - 96, btnY + 4, 192, 32, '#000000');
                drawPixelText("CLICK TO REPLAY", CANVAS_WIDTH / 2, btnY + 28, 20, '#FFFFFF', 'center');
            }
        };

        // Loop
        let rafId: number;
        const loop = () => {
            update();
            draw();
            rafId = requestAnimationFrame(loop);
        };
        init();
        loop();

        // Input Events
        const onKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();

            stateRef.current.keys[e.key] = true;

            if (stateRef.current.screen === 'START' && e.key === 'Enter') {
                startGame();
            }
            // Force R restart even in event listener for responsiveness
            if ((stateRef.current.screen === 'PLAYING' || stateRef.current.screen === 'GAMEOVER') && e.key.toLowerCase() === 'r') {
                if (stateRef.current.screen === 'GAMEOVER') startGame();
                else resetBall();
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            stateRef.current.keys[e.key] = false;
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            cancelAnimationFrame(rafId);
        };
    }, []); // Run once on mount

    const handleContainerClick = (e: React.MouseEvent) => {
        const s = stateRef.current;
        containerRef.current?.focus();
        if (s.screen === 'GAMEOVER') {
            s.screen = 'START';
            setTick(t => t + 1);
        }
    };

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onClick={handleContainerClick}
            className="flex flex-col items-center justify-center p-2 border-2 border-foreground bg-background outline-none transition-all cursor-pointer relative"
            style={{ width: 'fit-content' }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    imageRendering: 'pixelated'
                }}
                className="bg-background border border-foreground/10"
            />
        </div>
    );
};

export default BasketballGame;
