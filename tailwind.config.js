/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
        extend: {
            maxHeight: {
                '200': '520px',
            },
            colors: {
                primary: 'orange',
                secondary: {
                    100: '#E2E2D5',
                    200: '#888883'
                },
                third: '#232323',
                fourth: '#213145',
                priority: {
                    5: '#00FF00',
                    4: '#ADFF2F',
                    3: '#FFD700',
                    2: '#FF8C00',
                    1: '#FF0000',
                }
            },
            fontFamily: {
                body: ['Nunito'],
            },
            keyframes: {
                appear: {
                    '0%': { opacity: '0.25'},
                    '100%': {opacity: '1'},
                } 
            },
            animation: {
                appear: 'appear 1s ease-in-out',
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px'
        }
    },
    plugins: [],
}

