import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { tsPathsResolve } from "rollup-plugin-ts-paths-resolve"

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, command }) => {
    // Load ENV for vite.config.js
    const ENV = loadEnv(mode, process.cwd())

    const VitePluginHtmlEnv = () => ({
        name: "vite-plugin-html-env",
        transformIndexHtml(html: string) {
            return html.replace(/<% (\w+) \/>/g, (_, key) => {
                return `${ENV[key]}`
            })
        },
    })

    const tailwind = require("tailwindcss")
    const tailwindPlugin = tailwind({
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        mode: "jit",
        theme: {
            extend: {
                colors: {
                    "primary-cyan": "#00B4D8",
                    "primary-black": "#212936",
                    "input-color": "#f7f7f7",
                },
                fontFamily: {
                    poppins: "Poppins",
                },
            },
        },
        plugins: [require("@tailwindcss/forms")],
    })

    return {
        css: {
            postcss: {
                plugins: [tailwindPlugin, require("autoprefixer")],
            },
        },
        plugins: [tsPathsResolve(), VitePluginHtmlEnv(), react()],
        build: {
            assetsDir: "_resources",
        },
    }
})
