import { defineConfig } from "vite";
import dns from "dns";
import tsconfigPaths from "vite-tsconfig-paths";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  plugins: [tsconfigPaths()],
  base: "./",
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        app: "./index.html", //Entry point
        application: "./src/config/application.json",
        applicationBase: "./src/config/applicationBase.json",
        layerExpressions: "./src/config/layerExpressions.json"
      },
      output: {
        minifyInternalExports: false,
        entryFileNames: (assetInfo) => {
          let jsonFiles = ["application", "applicationBase", "layerExpressions"];
          if (jsonFiles.includes(assetInfo.name)) {
            return "config/[name].js";
          } else {
            return "assets/js/[name]-[hash].js";
          }
        }
      }
    }
  },
  server: {
    open: true,
    port: 3000,
    host: "localhost"
  }
});
