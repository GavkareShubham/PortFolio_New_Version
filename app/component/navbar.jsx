import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { assets } from "@/assets/assets";

const Navbar = () => {

    const [isScroll, setisScroll] = useState(false);
    const sideMenuref = useRef();

    const openMenu = () => {
        sideMenuref.current.style.transform = 'translateX(-16rem)'
    }

    const closeMenu = () => {
        sideMenuref.current.style.transform = 'translateX(16rem)'
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setisScroll(true);
            } else {
                setisScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <div className="fixed  top-0 right-0 w-11/12 -z-10 translate-y-[-80%] ">
                <Image src={assets.header_bg_color} alt="" className="w-full" />
            </div>
            <nav className={`w-full fixed lg:px-8 xl:px[8%] flex items-center justify-between px-12 py-3 z-50 ${isScroll ? "bg-white/30 backdrop-blur-md shadow-md transition duration-300" : ""}
`}>
                <div className="relative mr-14">
                    {/* Aesthetic Gray Blob Behind Logo */}
                    <div className="absolute -top-4 -left-2 w-30 h-20 bg-gray-600 opacity-50 blur-2xl rounded-full z-[-1]" />

                    {/* Logo */}
                    <a href="#top">
                        <Image src={assets.logo} alt="Logo" className="w-28 cursor-pointer relative z-10" />
                    </a>
                </div>


                {/* <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50 ">
                    <li><a href="#top">Home</a></li>
                    <li><a href="#about">About me</a></li>
                    <li><a href="#service">Services</a></li>
                    <li><a href="#blogs">Blogs</a></li>
                    <li><a href="#worl">My work</a></li>
                    <li><a href="#contact">Contact me</a></li>
                </ul> */}

                <ul className="font-Ovo hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-4 bg-white shadow-sm  bg-opacity-30">
                    {[
                        { label: "Home", href: "#top" },
                        { label: "About me", href: "#about" },
                        { label: "Services", href: "#service" },
                        { label: "Blogs", href: "#blogs" },
                        { label: "My work", href: "#work" },
                        { label: "Contact me", href: "#contact" },
                    ].map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="relative font-medium text-gray-700 transition duration-300
          hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600
          before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-0.5
          before:bg-gradient-to-r before:from-cyan-500 before:to-blue-600
          before:rounded-full before:transition-all before:duration-300
          hover:before:w-full hover:before:left-0"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>


                <div className="flex items-center gap-4">
                    {/* Dark mode toggle */}
                    <button>
                        <Image src={assets.moon_icon} alt="" className="w-6" />
                    </button>

                    {/* Contact Button */}
                    <a
                        href="#contact"
                        className="hidden lg:flex items-center gap-2 px-6 py-2 relative border border-gray-600  
                        bg-white/10 backdrop-blur-md rounded-full transition-all duration-300 text-gray-800
                        hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r from-cyan-500 to-red-500 group font-Ovo"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            Contact
                        </span>
                        <span className="relative z-10 transition-transform duration-300 transform group-hover:translate-x-1">
                            <Image src={assets.arrow_icon} alt="arrow" className="w-3" />
                        </span>
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-red-500 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-80"></span>
                    </a>

                    {/* Mobile menu button */}
                    <button className="block md:hidden ml-3" onClick={openMenu}>
                        <Image src={assets.menu_black} alt="" className="w-6" />
                    </button>
                </div>


                {/* mobile menu */}
                <ul ref={sideMenuref} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 ">
                    <div className="absolute right-6 top-6" onClick={closeMenu} >
                        <Image src={assets.close_black} alt="" className="w-5 cursor-pointer" />
                    </div>
                    <li><a onClick={closeMenu} className='font-Ovo' href="#top">Home</a></li>
                    <li><a onClick={closeMenu} className='font-Ovo' href="#about">About me</a></li>
                    <li><a onClick={closeMenu} className='font-Ovo' href="#service">Services</a></li>
                    <li><a onClick={closeMenu} className='font-Ovo' href="#blogs">Blogs</a></li>
                    <li><a onClick={closeMenu} className='font-Ovo' href="#worl">My work</a></li>
                    <li><a onClick={closeMenu} className='font-Ovo' href="#contact">Contact me</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar