import React from 'react';
import Image from 'next/image';
import { assets } from "@/assets/assets";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.8, ease: 'easeOut' }
    }),
};

const popIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, duration: 1 } }
};

const shake = {
    animate: {
        rotate: [0, -10, 10, -10, 0],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const Header = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-white">
            {/* Background Shapes */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
                    className="absolute w-64 h-64 bg-purple-600 rounded-full filter blur-3xl top-10 left-10"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: 'mirror' }}
                    className="absolute w-80 h-80 bg-pink-400 rounded-full filter blur-3xl bottom-10 right-10"
                />
            </div>

            {/* Abstract Objects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    className="absolute w-20 h-20 border-4 border-purple-500 rounded-lg rotate-[25deg] top-[20%] left-[8%] shadow-xl"
                    initial={{ y: 0, rotate: 0, scale: 1 }}
                    animate={{ y: [0, -10, 0], rotate: [0, 45, 0], scale: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-20 h-20 border-4 border-purple-500 rounded-lg rotate-[25deg] top-[80%] left-[18%] shadow-xl"
                    initial={{ y: 0, rotate: 0, scale: 1 }}
                    animate={{ y: [0, -10, 0], rotate: [0, 30, 0], scale: [0.2, 0.3, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-40 h-40 bg-gradient-to-tr from-pink-300 to-red-400 opacity-30 blur-3xl clip-blob top-[20%] right-[10%]"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Header Content */}
            <div className='relative z-10 w-full px-6 sm:px-8 max-w-3xl text-center mx-auto h-full flex flex-col items-center justify-center gap-4 sm:gap-6'>

                {/* Profile Image */}
                <motion.div variants={popIn} initial="hidden" animate="visible">
                    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareColor="white" className="rounded-full mx-auto">
                        <Image
                            src={assets.profile_img}
                            alt='Profile'
                            className='rounded-full w-38 h-38 shadow-[0_0_20px_rgba(156,39,176,0.5)] transition duration-500 hover:shadow-[0_0_30px_rgba(156,39,176,0.9)] mt-28'
                        />
                    </Tilt>
                </motion.div>

                {/* Greeting */}
                <motion.h3
                    className='flex items-center justify-center gap-2 text-xl sm:text-2xl mb-1'
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                >
                    Hi! I'm Shubham Gavkare
                    <motion.span {...shake}>
                        <Image src={assets.hand_icon} className='w-5' alt='Hand' />
                    </motion.span>
                </motion.h3>

                {/* Typewriter Title */}
                <motion.h1
                    className='text-2xl sm:text-5xl lg:text-[50px] font-Ovo leading-tight'
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                >
                    I’m a{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-text font-bold">
                        <Typewriter
                            words={['Software Developer', 'C++ Developer', 'Fullstack Developer', 'Freelancer']}
                            loop={true}
                            cursor
                            cursorStyle='|'
                            typeSpeed={80}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    className='max-w-2xl mx-auto font-Ovo text-gray-600 mt-2 text-sm sm:text-lg'
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                >
                    💡 I'm a Creative Developer passionate about building ✨ beautiful web experiences and 🔧 robust backend systems using modern technologies like Modern C++, Data Structures, OOD
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className='flex flex-col sm:flex-row items-center gap-4 mt-3'
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                >
                    <a
                        href="#contact"
                        className='group relative px-10 py-3 bg-black text-white border border-white rounded-full flex items-center gap-2 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-purple-500/40'
                    >
                        <span className="absolute inset-0 w-0 group-hover:w-full bg-purple-600 transition-all duration-500 ease-out z-0"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            Contact me
                            <Image src={assets.right_arrow_white} alt='Arrow' className='w-4' />
                        </span>
                    </a>

                    <a
                        href="/Shubham-Gavkare-Resume"
                        download
                        className='group relative px-10 py-2 border border-gray-500 text-gray-800 rounded-full flex items-center gap-2 transition-all duration-300 overflow-hidden hover:text-white hover:border-transparent shadow-md hover:shadow-indigo-500/40'
                    >
                        <span className="absolute inset-0 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out z-0"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            My Resume
                            <Image src={assets.download_icon} alt='Download' className='w-4 font-Ovo' />
                        </span>
                    </a>
                </motion.div>

                {/* Scroll-down */}
                <motion.div
                    className="mt-3 animate-bounce"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <a href="#about" className="text-gray-400 text-sm hover:text-black transition">
                        ↓ Scroll down
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;
