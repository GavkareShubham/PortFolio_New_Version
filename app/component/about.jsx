import { assets, infoList, toolsData } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const About = () => {
    return (
        <div
            id='about'
            className='w-full px-4 sm:px-[10%] py-10 scroll-mt-20 overflow-x-hidden'
        >
            <h4 className='text-center mb-2 text-lg font-Ovo'>Introduction</h4>
            <h2 className='text-center text-4xl sm:text-5xl font-Ovo'>About me</h2>

            <div className='flex w-full flex-col lg:flex-row items-center gap-12 lg:gap-20 my-16'>
                {/* Profile Image */}
                <div className='w-40 sm:w-60 md:w-72 rounded-3xl'>
                    <Image
                        src={assets.user_image}
                        alt='user'
                        className='w-full rounded-3xl shadow-md'
                    />
                </div>

                {/* Right Content */}
                <div className='flex-1 w-full'>
                    <p className='font-Ovo text-base sm:text-lg mb-6'>
                       Software Engineer with hands-on experience in C++11/14/17, strong understanding of Object-Oriented Design, STL,
and Design Patterns. Skilled in developing scalable software for real-time systems on Linux/Unix platforms, Shell
Scripting, and unit testing. Proven ability to debug complex systems, optimize code, and work in Agile development
teams.

                    </p>

                    {/* Info Cards */}
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-full'>
                        {infoList.map(({ icon, iconDark, title, description }, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className='border border-gray-300 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-sm 
                hover:shadow-xl hover:scale-[1.03] hover:bg-gradient-to-br from-white/20 to-purple-100/30 
                transition-all duration-300 ease-in-out cursor-pointer'
                            >
                                <Image src={icon} alt={title} className='w-7 mb-3' />
                                <h3 className='my-2 font-serif font-semibold text-gray-700'>
                                    {title}
                                </h3>
                                <p className='text-gray-500 font-sans text-sm'>{description}</p>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Tools */}
                    <h4 className='my-6 text-gray-700 font-Ovo'>Tools I use</h4>
                    <ul className='flex flex-wrap items-center gap-4'>
                        {toolsData.map((tool, index) => (
                            <li
                                key={index}
                                className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'
                            >
                                <Image
                                    src={tool}
                                    alt='tool'
                                    className='w-5 sm:w-7 object-contain'
                                />
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <motion.div
                className='mt-16'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <h3 className='text-2xl font-Ovo mb-6 text-gray-800'>Work Experience</h3>

                <div className='relative border-l-4 border-purple-300 pl-6 ml-2 space-y-10'>

                    {/* Associate Software Engineer */}
                    <div className='relative bg-white/10 border border-gray-200 rounded-xl shadow-lg p-4 backdrop-blur-sm'>
                        {/* Timeline Dot */}
                        <div className='absolute -left-[1.1rem] top-4 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md  flex items-center justify-center'>
                            <FaBriefcase className='text-white text-sm ' />
                        </div>

                        {/* Header with green dot */}
                        <div className='flex items-center gap-2 mb-1'>
                            <h4 className='text-lg font-semibold font-sans text-purple-700'>Associate Software Engineer</h4>
                            {/* Live status dot */}
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping relative">
                                <span className="absolute inline-block w-2.5 h-2.5 bg-green-500 rounded-full top-0 left-0"></span>
                            </span>
                        </div>

                        <p className='text-gray-700 text-sm'>KPIT Technologies, Pune</p>
                        <p className='text-xs font-mono text-gray-500 mb-2'>Jan 2025 – Present</p>
                        <p className='text-sm  text-gray-600'>
                            • Engineered high-performance application-level modules in Linux using Modern C++, applying STL, OOP, and design
patterns to build scalable and maintainable systems. <br />
• Designed and optimized CAN Bus communication modules using bit-fields, applying low-level programming
techniques to ensure efficient data flow and memory usage. <br />
• Developed template-based utilities leveraging smart pointers (unique_ptr, shared_ptr) and pointer arithmetic,
ensuring safe and performant memory management across modules. <br />
• Upgraded and refactored legacy C++ codebases to support new features, improving code readability, modularity, and
minimizing regression risks. <br />
• Employed Google Test for writing comprehensive unit and death tests, and utilized GDB for debugging segmentation
faults, race conditions, and memory leaks. <br />
• Automated build and deployment processes using Shell scripting and CMake, and maintained version control
through Git and GitLab.   <br />
• Performed static code analysis with Katapult, ensuring compliance with coding standards and enhancing code quality
in critical automotive systems.  <br />
• Built and deployed AI-powered LLM agents using Langflow and OpenAI models, integrating with custom codebases to  <br />
deliver context-aware, task-specific automation. <br />
• Designed end-to-end pipelines using Langflow’s flow-based editor, orchestrating APIs, agent communication, and file
processing to create intelligent, adaptive behaviors in production-like AI environments.

                        </p>
                    </div>

                    {/* Trainee */}
                    <div className='relative bg-white/10 border border-gray-200 rounded-xl shadow-lg p-4 backdrop-blur-sm'>
                        {/* Timeline Dot */}
                        <div className='absolute -left-[1.1rem] top-4 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md flex items-center justify-center'>
                            <FaBriefcase className='text-white text-sm' />
                        </div>

                        <h4 className='text-lg font-semibold font-sans text-purple-700'>Trainee</h4>
                        <p className='text-gray-700 text-sm'>KPIT Technologies, Pune</p>
                        <p className='text-xs text-gray-500 font-mono mb-2'>Dec 2023 – Dec 2024</p>
                        <p className='text-sm text-gray-600'>
                            • Joined as a Trainee, where I contributed to automotive software modules and gained hands-on experience in modern C++ and embedded systems.
                        </p>
                    </div>
                </div>
            </motion.div>


        </div>
    );
};

export default About;
