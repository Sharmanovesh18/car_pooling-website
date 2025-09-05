import React from 'react';

// --- SVG Icons for App Stores ---
const AppleIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3999 15.62C18.2999 16.9 17.3999 18.23 16.0999 18.23C14.7999 18.23 14.1999 17.39 13.0999 17.39C11.9999 17.39 11.2999 18.22 10.0999 18.22C8.7999 18.22 7.7999 16.93 7.7999 15.15C7.7999 12.8 9.5999 11.22 11.2999 11.22C12.4999 11.22 13.3999 11.89 13.9999 11.89C14.5999 11.89 15.7999 11.08 17.0999 11.08C17.2999 11.08 18.6999 11.1 19.4999 12.63C18.4999 13.2 18.3999 14.48 18.3999 15.62Z" />
        <path d="M13.5 6.99998C14.2 6.10998 14.5 4.93998 14.3 3.79998C13.3 3.90998 12.2 4.47998 11.5 5.34998C10.8 6.18998 10.5 7.34998 10.7 8.48998C11.7 8.39998 12.8 7.85998 13.5 6.99998Z" />
    </svg>
);

const GooglePlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.24,2.94,13.89,12,3.24,21.06a.5.5,0,0,0,.35.88l1.19.09.07,0A10.8,10.8,0,0,0,12,17.4V6.6A10.8,10.8,0,0,0,4.85,2l-.07,0-1.19.09A.5.5,0,0,0,3.24,2.94Z" />
        <path d="M15.06,10.6,18.1,9a.48.48,0,0,0,0-.82L15.06,6.51Z" />
        <path d="M15.06,17.49l3.06-1.68a.48.48,0,0,0,0-.82l-3.06-1.68Z" />
        <path d="M20.89,12.35a3.48,3.48,0,0,0,0-.7l-2.73-1.5-3.06,1.68,3.06,1.68Z" />
    </svg>
);

// --- Component Styles ---
const CtaStyles = () => (
    <style>{`
        .cta-section-wrapper {
            padding: 0 5%;
            margin: 6rem auto;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #1A1A1A 0%, #000000 100%);
            color: #FFFFFF;
            padding: 0 4rem;
            max-width: 1200px;
            margin: 0 auto;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            min-height: 450px;
            overflow: hidden;
            position: relative;
        }
        
        .cta-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 30%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .cta-content {
            flex: 1;
            max-width: 500px;
            text-align: left;
            z-index: 1;
        }

        .cta-content h2 {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1rem;
        }

        .cta-content p {
            font-size: 1.1rem;
            color: #B0B0B0;
            margin-bottom: 2rem;
        }

        .cta-buttons {
            display: flex;
            gap: 1.5rem;
        }

        .store-button {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background-color: rgba(255, 255, 255, 0.08);
            color: #FFFFFF;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 1rem 1.8rem;
            border-radius: 14px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .store-button:hover {
            background-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .store-button .button-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .store-button .button-text span:first-child {
            font-size: 0.8rem;
            line-height: 1.2;
            opacity: 0.8;
        }

        .store-button .button-text span:last-child {
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 1;
        }

        .cta-image {
            flex-shrink: 0;
            align-self: flex-end;
            z-index: 1;
        }

        .cta-image img {
            display: block;
            width: 300px;
            filter: drop-shadow(0 20px 25px rgba(0,0,0,0.4));
            transform: translateY(20px) rotate(5deg);
        }
        
        @media (max-width: 992px) {
            .cta-section {
                flex-direction: column;
                text-align: center;
                padding: 4rem 2rem;
                min-height: auto;
            }
            .cta-content {
                max-width: 100%;
            }
            .cta-buttons {
                justify-content: center;
            }
            .cta-image {
                display: none; /* Hide phone on smaller screens for a cleaner look */
            }
        }
        
        @media (max-width: 576px) {
             .cta-buttons {
                flex-direction: column;
                align-items: center;
                width: 100%;
            }
            .store-button {
                width: 100%;
                max-width: 250px;
                justify-content: center;
            }
        }
    `}</style>
);

function AppCTA() {
    return (
        <>
            <CtaStyles />
            <div className="cta-section-wrapper">
                <section id="download" className="cta-section">
                    <div className="cta-content">
                        <h2>Take RideWell With You</h2>
                        <p>Download our app for a seamless booking experience, real-time tracking, and exclusive offers. Your next ride is just a tap away.</p>
                        <div className="cta-buttons">
                            <a href="#" className="store-button">
                                <AppleIcon />
                                <div className="button-text">
                                    <span>Download on the</span>
                                    <span>App Store</span>
                                </div>
                            </a>
                            <a href="#" className="store-button">
                                <GooglePlayIcon />
                                <div className="button-text">
                                    <span>GET IT ON</span>
                                    <span>Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="cta-image">
                        <img src="https://www.transparentpng.com/thumb/smartphone/KIIRsE-smartphone-photos.png" alt="RideWell App on Smartphone" />
                    </div>
                </section>
            </div>
        </>
    );
}

export default AppCTA;

