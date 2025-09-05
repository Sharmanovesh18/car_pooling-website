import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icon for the Gift ---
const GiftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12v10H4V12" />
        <path d="M16 6H8v6h8V6z" />
        <path d="M12 2v4" />
        <path d="M12 12v10" />
        <path d="M20 6h-4" />
        <path d="M4 6h4" />
    </svg>
);


// --- Component Styles ---
const DiscountCtaStyles = () => (
    <style>{`
        .discount-section-wrapper {
            padding: 0 5%;
            margin: 6rem auto;
        }

        .discount-section {
            background: linear-gradient(110deg, #4F46E5, #818CF8, #4F46E5);
            background-size: 600% 600%;
            color: #FFFFFF;
            padding: 3rem 4rem;
            max-width: 1800px;
            margin: 0 auto;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: left;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.5);
            animation: pulse-glow 4s infinite ease-in-out, animated-gradient 10s ease infinite;
        }
        
        @keyframes animated-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes pulse-glow {
            0% { box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.5); }
            50% { box-shadow: 0 20px 50px -10px rgba(129, 140, 248, 0.7); }
            100% { box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.5); }
        }

        .discount-content {
             position: relative;
             z-index: 2;
             width: 100%;
             display: flex;
             justify-content: space-between;
             align-items: center;
             gap: 3rem;
        }
        
        .discount-text-column {
            flex-basis: 60%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .discount-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.5rem 1rem;
            border-radius: 999px;
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .discount-text-column h2 {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1rem;
            text-align: left;
        }

        .discount-text-column p {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.8);
            max-width: 500px;
            margin: 0 0 2rem 0;
            text-align: left;
        }

        .discount-timer-column {
            flex-basis: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.15);
            padding: 2.5rem 2rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .timer-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            opacity: 0.9;
            text-align: center;
        }

        .countdown-timer {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }

        .timer-box {
            background: rgba(0, 0, 0, 0.2);
            padding: 0.8rem;
            border-radius: 12px;
            width: 80px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }

        .timer-number {
            font-size: 2rem;
            font-weight: 700;
            display: block;
            line-height: 1;
        }

        .timer-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            opacity: 0.7;
            display: block;
        }
        
        .timer-separator {
            font-size: 2rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.5);
            align-self: center;
            padding-bottom: 1.5rem;
        }

        .discount-button {
            background-color: #FFFFFF;
            color: #635dc5ff;
            border: none;
            padding: 1rem 2.5rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            position: relative;
            z-index: 2;
        }

        .discount-button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .confetti-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        }
        
        .confetti {
            position: absolute;
            opacity: 0;
            animation: confetti-fall linear forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-10vh) rotateZ(var(--start-angle)) rotateX(0);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotateZ(var(--end-angle)) rotateX(1080deg);
                opacity: 0;
            }
        }
    `}</style>
);

function DiscountCTA() {
    const [timeLeft, setTimeLeft] = useState({});
    const [confetti, setConfetti] = useState([]);
    const animationFrameId = useRef(null);
    const lastSpawnTime = useRef(0);

    // Countdown Timer Effect
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            
            const difference = endOfDay - now;
            let timeLeftData = {};

            if (difference > 0) {
                timeLeftData = {
                    hours: Math.floor(difference / (1000 * 60 * 60)),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return Object.fromEntries(
                Object.entries(timeLeftData).map(([key, value]) => [
                    key, value.toString().padStart(2, '0')
                ])
            );
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Constant and Smooth Confetti Stream Effect
    useEffect(() => {
        const shapes = ['rect', 'circle', 'squiggle'];
        const colors = ['#FFFFFF', '#818CF8', '#A78BFA', '#F472B6'];

        const animateConfetti = (timestamp) => {
            if (timestamp - lastSpawnTime.current > 50) { // Control spawn rate
                lastSpawnTime.current = timestamp;

                const newParticleId = timestamp + Math.random();
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                let style = {
                    left: `${Math.random() * 100}%`,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    animationDuration: `${4 + Math.random() * 3}s`,
                    '--start-angle': `${Math.random() * 360}deg`,
                    '--end-angle': `${720 + Math.random() * 720}deg`,
                };

                if (shape === 'rect') {
                    style.width = '8px';
                    style.height = '15px';
                } else if (shape === 'circle') {
                    style.width = '10px';
                    style.height = '10px';
                    style.borderRadius = '50%';
                } else if (shape === 'squiggle') {
                    style.width = '12px';
                    style.height = '12px';
                    style.backgroundColor = 'transparent';
                    style.border = `2px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                    style.borderRadius = '50%';
                    style.clipPath = 'polygon(0 0, 100% 0, 100% 50%, 0 50%)';
                }


                const newParticle = { id: newParticleId, style };

                setConfetti(current => [...current, newParticle]);

                setTimeout(() => {
                    setConfetti(current => current.filter(p => p.id !== newParticleId));
                }, 7000);
            }
            animationFrameId.current = requestAnimationFrame(animateConfetti);
        };
        
        animationFrameId.current = requestAnimationFrame(animateConfetti);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);
    

    return (
        <>
            <DiscountCtaStyles />
            <div className="discount-section-wrapper">
                <section id="discount" className="discount-section">
                    <div className="confetti-container">
                        {confetti.map(c => <div key={c.id} className="confetti" style={c.style}></div>)}
                    </div>
                    <div className="discount-content">
                         <div className="discount-text-column">
                            <div className="discount-badge">
                                <GiftIcon />
                                <span>Offer Ends Today!</span>
                            </div>
                            <h2>Get 25% OFF On Your First Ride</h2>
                            <p>Sign up now and enjoy a special discount on your first journey. This exclusive offer is only available for a limited time!</p>
                            <a href="#" className="discount-button">
                                Claim My 25% Discount
                            </a>
                        </div>
                        <div className="discount-timer-column">
                            <h3 className="timer-title">Hurry, Deal Ends In!</h3>
                            <div className="countdown-timer">
                                <div className="timer-box">
                                    <span className="timer-number">{timeLeft.hours || '00'}</span>
                                    <span className="timer-label">Hours</span>
                                </div>
                                <div className="timer-separator">:</div>
                                <div className="timer-box">
                                    <span className="timer-number">{timeLeft.minutes || '00'}</span>
                                    <span className="timer-label">Minutes</span>
                                </div>
                                <div className="timer-separator">:</div>
                                <div className="timer-box">
                                    <span className="timer-number">{timeLeft.seconds || '00'}</span>
                                    <span className="timer-label">Seconds</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default DiscountCTA;
