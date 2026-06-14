export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      green: {
        50: '#F0FDF4',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
      },
      red: {
        500: '#EF4444',
        600: '#DC2626',
      },
      blue: {
        500: '#3B82F6',
        600: '#2563EB',
      },
    },
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};
