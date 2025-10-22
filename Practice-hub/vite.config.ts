import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Checker({ typescript: true })],
    server: {
        host: true, // allows access from LAN (0.0.0.0)
        port: 5173, // optional, default is 5173
        strictPort: false, // true will fail if port is taken, false will pick next available
    },
});
