import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { assets, serviceData } from '@/assets/assets';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Services = () => {
  return (
    <div
      id="service"
      className="w-full px-4 sm:px-[10%] py-10 scroll-mt-20 overflow-x-hidden"
    >
      {/* Headings */}
      <motion.h4
        className="text-center mb-2 text-lg font-Ovo"
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        What I offer
      </motion.h4>

      <motion.h2
        className="text-center text-4xl sm:text-5xl font-Ovo"
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        My Services
      </motion.h2>

      <motion.p
        className="text-center text-gray-600 mt-6 mb-10 max-w-2xl mx-auto font-Ovo leading-relaxed"
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Modern problems need modern solutions, let’s code yours!
      </motion.p>

      {/* Grid of services */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {serviceData.map(({ icon, title, description, link }, index) => (
          <motion.div
            key={index}
            className="bg-white/10 cursor-pointer backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-purple-400 hover:scale-[1.03]"
            variants={itemVariants}
          >
            <Image src={icon} alt="" className="w-10 mb-3" />
            <h3 className="text-lg my-2 font-semibold text-gray-700">{title}</h3>
            <p className="text-sm text-gray-600 leading-5">{description}</p>
            <a
              href={link}
              className="flex items-center cursor-pointer gap-2 text-sm mt-5 text-purple-600 hover:text-purple-800 font-medium transition"
            >
              Read More <Image src={assets.right_arrow} alt="" className="w-4" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
