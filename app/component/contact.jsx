import { assets } from '@/assets/assets';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const Contact = () => {
    const [result, setResult] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult('Sending....');
        const formData = new FormData(event.target);
        formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORM_KEY);

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setResult('Form Submitted Successfully');
            event.target.reset();
        } else {
            console.log('Error', data);
            setResult(data.message);
        }
    };

    return (
        <div
            id="contact"
            className="w-full px-4 sm:px-[10%] py-10 scroll-mt-20 overflow-x-hidden"
        >
            {/* Heading */}
            <motion.h4
                className="text-center mb-2 text-lg font-Ovo"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
            >
                Want to connect with me!
            </motion.h4>

            <motion.h2
                className="text-center text-4xl sm:text-5xl font-Ovo"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
            >
                Get in touch
            </motion.h2>

            <motion.p
                className="text-center text-gray-600 mt-6 mb-10 max-w-2xl mx-auto font-Ovo leading-relaxed"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.4}
            >
                Let's build something amazing together! Whether it's an idea, a project, or just a tech chat — I'm just a message away.
            </motion.p>

            {/* Form */}
            <motion.form
                onSubmit={onSubmit}
                className="max-w-2xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.15 },
                    },
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
                    <motion.input
                        variants={fadeInUp}
                        custom={0}
                        className="w-full p-3 outline-none border border-gray-400 rounded-md bg-white"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        required
                    />
                    <motion.input
                        variants={fadeInUp}
                        custom={1}
                        className="w-full p-3 outline-none border border-gray-400 rounded-md bg-white"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        required
                    />
                </div>

                <motion.textarea
                    variants={fadeInUp}
                    custom={2}
                    rows={6}
                    placeholder="Enter your message"
                    name="message"
                    required
                    className="w-full p-4 outline-none border border-gray-400 rounded-md bg-white mb-6"
                ></motion.textarea>

                <motion.button
                    type="submit"
                    variants={fadeInUp}
                    custom={3}
                    className="flex font-sans gap-2 items-center mx-auto bg-gray-700 text-white py-3 px-10 rounded-full font-semibold hover:bg-black transition-all duration-300"
                >
                    Submit now <Image src={assets.right_arrow_white} alt="" className="w-4" />
                </motion.button>

                {result && (
                    <motion.p
                        className="font-sm font-sans mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {result}
                    </motion.p>
                )}
            </motion.form>
        </div>
    );
};

export default Contact;
