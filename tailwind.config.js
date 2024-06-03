/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}'
  ],
  prefix: '',
  theme: {
    screens: {
      xs: '320px',
      sm: '370px', // Adjust for small screens if needed, e.g. 640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xs: '4px',
        md: '1.5rem',
        lg: '2rem'
      },
      width: {
        DEFAULT: 'calc(100% - 150px)', // Full width minus sidebar width (320px)
        md: 'calc(100% - 320px)', // Adjust for medium screens if needed
        lg: 'calc(100% - 320px)', // Adjust for large screens if needed
        xl: 'calc(100% - 320px)' // Adjust for extra-large screens if needed
      },
      height: {
        DEFAULT: 'calc(100vh - 54px)', // Full height minus navbar height (64px)
        sm: 'calc(50vh - 64px)', // Adjust for small screens if needed
        md: 'calc(75vh - 64px)', // Adjust for medium screens if needed
        lg: 'calc(90vh - 64px)', // Adjust for large screens if needed
        xl: 'calc(100vh - 64px)' // Adjust for extra-large screens if needed
      }
    },

    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        secondary1: {
          DEFAULT: 'hsl(var(--secondary1))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      fontFamily: {
        tajwal: ['var(--font-Tajwal)'],
        cairo: ['var(--font-Cairo)'],
        noto: ['var(--font-Noto)']
      }
    }
  },
  plugins: [require('tailwindcss-animate'), 'prettier-plugin-tailwindcss']
}
