import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Footer = () => {
    return (
        <footer className='mt-20 px-4 mb-2 sm:px-[10%]'>
            {/* Logo & Email */}
            <div className='text-center mb-10 relative'>
                {/* Blurred gray blob behind the logo */}
<div className="absolute w-36 h-30 bg-gray-400 blur-xl rounded-full -z-10 top-[30%] left-1/2 opacity-40 transform -translate-x-1/2 -translate-y-1/2" />

                <Image src={assets.logo} alt='Logo' className='w-35  mx-auto mb-2 relative z-10' />
                <div className='flex items-center justify-center gap-2 text-gray-700'>
                    <Image src={assets.mail_icon} alt='Email Icon' className='w-5' />
                    <span className='font-sans font-sm'>shubhamgavkare07@gmail.com</span>
                </div>
            </div>

            {/* Bottom Section */}
            <div className='border-t font-sans font-bold border-gray-400 pt-6 sm:flex sm:items-center sm:justify-between text-center'>
                <p className='text-sm text-gray-600'>&copy; 2025. All rights reserved.</p>

                <ul className='flex flex-wrap justify-center gap-6 mt-4 sm:mt-0 text-sm text-gray-700'>
                    <li><a href='https://linkedin.com/in/shubhamgavkare' target='_blank'>LinkedIn</a></li>
                    <li><a href='https://github.com/GavkareShubham' target='_blank'>GitHub</a></li>
                    <li><a href='https://leetcode.com/u/shubhamgavkare/' target='_blank'>LeetCode</a></li>
                    <li><a href='https://www.instagram.com/shubham.gvk/' target='_blank'>Instagram</a></li>
                    <li><a href='#' target='_blank'>Twitter</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
