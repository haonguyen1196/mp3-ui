/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0F7070",
        "overlay-300": "rgba(0,0,0,0.3)"
      },
      colors: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0F7070",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px);",
                    transform: "translateX(-500px);"
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
                    transform: "translateX(0);"
          }
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px);",
                    transform: "translateX(500px);"
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
                    transform: "translateX(0);"
          }
        },
        "slide-left-2": {
          "0%": {
            "-webkit-transform": "translateX(500px);",
                    transform: "translateX(500px);"
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
                    transform: "translateX(0);"
          }
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
                    transform: "rotate(0)"
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
                    transform: "rotate(360deg)"
          }
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(0)",
                    transform: "rotate(0)",
                    borderRadius: "999px"
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
                    transform: "rotate(360deg)"
          }
        },
        "scale-up-img": {
          "0%": {
            "-webkit-transform": "scale(1)",
                    transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.2)",
                    transform: "scale(1.2)"
          }
        },
        "scale-down-img": {
          "0%": {
            "-webkit-transform": "scale(1.2)",
                    transform: "scale(1.2)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
                    transform: "scale(1)"
          }
        }
      },
      animation: {
        "slide-right": "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left": "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left-2": "slide-left-2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "rotate-center": "rotate-center 8s linear infinite;",
        "rotate-center-pause": "rotate-center-pause 0.3s linear;",
        "scale-up-img": "scale-up-img 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "scale-down-img": "scale-down-img 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        },
      flex: {
        '3': '3 3 0%',
        '7': '7 7 0%',
      }
      },
    screens: {
      '1600': '1600px'
    }
    },
  plugins: [],
}