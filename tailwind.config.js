/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      mmd: "980px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
        inter: "'Inter', sans-serif",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        default: "var(--default)",
        accent: "var(--accent)",
        teal: "var(--teal)",
        borderColor: "var(--border)",
        borderTopColor: "var(--border-top)",
        inputError: "var(--input-error)",
        secondaryButton: "var(--secondary-button)",
        selectedOptionBg: "var(--selected-option-bg)",
        accentInvert: "var(--accent-invert)",
        modalBg: "var(--modal-bg)",
        warning: "var(--warning)",
        tabBg: "var(--tab-bg)",
        listItemBorder: "var(--list-item-border)",
        listItemHoverBorder: "var(--list-item-hover-border)",
        listItemHoverBg: "var(--list-item-hover-bg)",
        linkText: "var(--link-text)",
        hoverText: "var(--hover-text)",
        yellow: "var(--yellow)",
        amber: "var(--amber)",
        helperText: "var(--helper-text)",
      },
      padding: {
        13: "52px",
      },
      transitionProperty: {
        width: "width",
      },
      fontSize: {
        "inherit-size": "inherit",
      },
    },
  },
  plugins: [],
};
