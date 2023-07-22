import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [million.vite(), react()],
    base: "./",
    server: {
      cors: false,
    },
  });
};
