// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                lightHover: '#fcf4ff',
                darkHover: '#21004a',
                darkTheme: '#11001F',
            },
            fontFamily: {
                Outfit: ["Outfit", 'sans-serif'],
                Ovo: ["Ovo", 'serif'],
            },
            animation: {
                fadeInUp: 'fadeInUp 0.6s ease-out',
                text: 'text 5s ease infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                text: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
            boxShadow: {
                'black' : '4px 4px 0 #000',
                'white' : '4px 4px 0 #fff',
            }
        },
    },
    darkMode : 'selector',
    plugins: [],
};
