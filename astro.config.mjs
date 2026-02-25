import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// port 3000
const port = 3535;
// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  server: {
    port,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { "@": new URL("./src", import.meta.url).pathname },
    },
  },
});
