import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        'layout-x-large': '9vw',
      },
      backgroundImage: {
        'gradient-black-bezier':
          'linear-gradient(to bottom, var(--gradient-black-bezier))',
        'black-bezier-to-top':
          'linear-gradient(to top, var(--gradient-black-bezier))',
        'black-bezier-merged': `
          linear-gradient(to top, var(--gradient-black-bezier)),
          linear-gradient(to right, var(--gradient-black-bezier))
        `,
        'black-bezier-to-top-right':
          'linear-gradient(to top right, var(--gradient-black-bezier))',
      },
      colors: {
        background: '#111619',
        textlight: 'ECF0F1',
        primaryLight: '#01D6EA',
        tertiaryLight: '#414649',
        primaryButtonColor: 'linearGradient(180deb,#02dae6 0%,#00beff 100%)',
        almostWhite: '#ecf0f1',
        almostBlack: '#111619',
        darkGreyTransparent: 'rgba(65, 70, 73, .8)',
        'category-button-bg': 'rgba(17, 22, 25, .8)',
        'dark-turquoise': '#02c7e1',
        'dark-turquoise-hover': '#02e1d6',
        'player-button-hover-blue': '#22b1ff',
        'almost-black': '#111619',
        'darker-grey': '#252c30',
        'darker-grey-transparent': '#252c3099',
        'dark-grey': '#414649',
        'dark-grey-transparent': 'rgba(65, 70, 73, 0.8)',
        'dark-grey-half-transparent': 'rgba(65, 70, 73, 0.5)',
        'mid-grey': '#5b6267',
        'light-grey': '#9da2a5',
        'lighter-grey': '#b7bbbd',
        'almost-white': '#ecf0f1',
        nine: '#00beff',
        gem: '#ff1c4a',
        go: '#f68912',
        life: '#1fbf2b',
        rush: '#fc5432',
        'success-green': '#1db980',
        'warning-orange': '#ff7b47',
        'error-red': '#f2453f',
        'hyperlink-visited': '#00beff',
        'hyperlink-visited-hover': '#66d8ff',
        'gradient-turquoise-top': '#02dae6',
        'gradient-turquoise-bottom': '#00beff',
        'gradient-9now-top': '#02dae6',
        'gradient-9now-bottom': '#0084cc',
        'gradient-nine-top': '#2321b7',
        'gradient-nine-bottom': '#54dbfe',
        'gradient-gem-top': '#ff1d4b',
        'gradient-gem-bottom': '#c40b87',
        'gradient-go-top': '#fff200',
        'gradient-go-bottom': '#ed1c24',
        'gradient-life-top': '#1fbf2b',
        'gradient-life-bottom': '#b2ec2e',
        'gradient-rush-top': '#f28723',
        'gradient-rush-bottom': '#fc5432',
        'ways-to-watch-background': '#101e26',
        'footer-bottom': 'rgb(26, 34, 39)',
      },
    },
  },
  plugins: [],
}
export default config

// Colors for reference
/*
--dark-turquoise: #02c7e1;
    --dark-turquoise-hover: #02e1d6;
    --player-button-hover-blue: #22b1ff;
    --almost-black: #111619;
    --almost-black-values: 17, 22, 25;
    --darker-grey: #252c30;
    --darker-grey-transparent: #252c3099;
    --dark-grey: #414649;
    --dark-grey-transparent: rgba(65, 70, 73, .8);
    --dark-grey-half-transparent: rgba(65, 70, 73, .5);
    --mid-grey: #5b6267;
    --light-grey: #9da2a5;
    --lighter-grey: #b7bbbd;
    --almost-white: #ecf0f1;
    --almost-white-values: 236, 240, 241;
    --nine: #00beff;
    --gem: #ff1c4a;
    --go: #f68912;
    --life: #1fbf2b;
    --rush: #fc5432;
    --success-green: #1db980;
    --warning-orange: #ff7b47;
    --error-red: #f2453f;
    --hyperlink-visited: var(--nine);
    --hyperlink-visited-hover: #66d8ff;
    --gradient-turquoise-top: #02dae6;
    --gradient-turquoise-bottom: #00beff;
    --gradient-9now-top: #02dae6;
    --gradient-9now-bottom: #0084cc;
    --gradient-nine-top: #2321b7;
    --gradient-nine-bottom: #54dbfe;
    --gradient-gem-top: #ff1d4b;
    --gradient-gem-bottom: #c40b87;
    --gradient-go-top: #fff200;
    --gradient-go-bottom: #ed1c24;
    --gradient-life-top: #1fbf2b;
    --gradient-life-bottom: #b2ec2e;
    --gradient-rush-top: #f28723;
    --gradient-rush-bottom: #fc5432;
    --ways-to-watch-background-color: #101e26;
*/
