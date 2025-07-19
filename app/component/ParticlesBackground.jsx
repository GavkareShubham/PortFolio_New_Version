// components/ParticlesBackground.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: true, zIndex: -1 },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                particles: {
                    number: { value: 60 },
                    color: { value: "#aaa" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3 },
                    size: { value: 2 },
                    links: {
                        enable: true,
                        distance: 120,
                        color: "#999",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        outModes: {
                            default: "bounce",
                        },
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "repulse" },
                        onClick: { enable: true, mode: "push" },
                    },
                    modes: {
                        repulse: { distance: 80 },
                        push: { quantity: 4 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;
