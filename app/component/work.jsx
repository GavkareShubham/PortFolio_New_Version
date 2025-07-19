import { assets, workData } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const Work = () => {
    return (
        <div id="work" className="w-full px-4 sm:px-[10%] py-10 scroll-mt-20 overflow-x-hidden">
            {/* Text Section */}
            <motion.h4
                className="text-center mb-2 text-lg font-Ovo"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                My Portfolio
            </motion.h4>

            <motion.h2
                className="text-center text-4xl sm:text-5xl font-Ovo"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                My Latest Work
            </motion.h2>

            <motion.p
                className="text-center text-gray-600 mt-6 mb-10 max-w-2xl mx-auto font-Ovo leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                "🚀 Solutions engineered to perform — creative, clean, and fast." <br />
                A glimpse into the projects where code meets creativity
            </motion.p>

            {/* Grid of Projects */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {workData.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
                        style={{ backgroundImage: `url(${project.bgImage})` }}
                    >
                        <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                            <div>
                                <h2 className="mb-2 font-sans font-semibold leading-relaxed">
                                    {project.title}
                                </h2>
                                <p className="text-sm">{project.description}</p>
                            </div>
                            <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                               <a href="https://github.com/GavkareShubham" target='_blank' ><Image src={assets.send_icon} alt="send icon" className="w-5" /></a>   
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Button */}
            <motion.a
                href=""
                className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 
         transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:scale-105"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                Show more
                <Image src={assets.right_arrow_bold} alt="right arrow" className="w-4" />
            </motion.a>
        </div>
    );
};

export default Work;
