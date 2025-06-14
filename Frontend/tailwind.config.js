/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,tsx}', ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#156651', // Green
        secondary: '#EBB65B', // Golden Yellow
        text: '#404040', // Dark Gray
        alert: '#E44A4A', // Red
        neutral: {
          10: '#FFFFFF', //  White
          20: '#F5F5F5',
          30: '#EDEDED',
          40: '#E0E0E0',
          50: '#C2C2C2',
          60: '#9E9E9E',
          70: '#757575',
          80: '#616161',
          90: '#404040',
          100: '#0A0A0A', // Black
        },
      },
      fontFamily: {
        Manrope: ['Manrope'],
      },
      fontSize: {
        Heading1: ['40px', { lineHeight: '120%', fontWeight: '800' }],
        Heading2: ['32px', { lineHeight: '120%', fontWeight: '700' }],
        Heading3: ['24px', { lineHeight: '120%', fontWeight: '700' }],
        Heading4: ['20px', { lineHeight: '120%', fontWeight: '700' }],
        Heading5: ['18px', { lineHeight: '120%', fontWeight: '400' }],
        BodyRegular: ['16px', { lineHeight: '120%', fontWeight: '400' }],
        BodyBold: ['16px', { lineHeight: '120%', fontWeight: '700' }],
        BodySmallRegular: ['14px', { lineHeight: '120%', fontWeight: '400' }],
        BodySmallBold: ['14px', { lineHeight: '120%', fontWeight: '700' }],
        Caption: ['12px', { lineHeight: '120%', fontWeight: '400' }]
      },
    },
  },
  plugins: [],
};
