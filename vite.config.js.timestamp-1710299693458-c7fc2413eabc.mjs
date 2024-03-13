// vite.config.js
import { defineConfig } from "file:///E:/teamproject/nutrimate/nutrimate-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/teamproject/nutrimate/nutrimate-frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import envCompatible from "file:///E:/teamproject/nutrimate/nutrimate-frontend/node_modules/vite-plugin-env-compatible/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\teamproject\\nutrimate\\nutrimate-frontend";
var vite_config_default = defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [react(), envCompatible()],
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: path.resolve(__vite_injected_original_dirname, "src")
      }
    ]
  },
  server: {
    host: "0.0.0.0",
    port: 5555,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx0ZWFtcHJvamVjdFxcXFxudXRyaW1hdGVcXFxcbnV0cmltYXRlLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx0ZWFtcHJvamVjdFxcXFxudXRyaW1hdGVcXFxcbnV0cmltYXRlLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi90ZWFtcHJvamVjdC9udXRyaW1hdGUvbnV0cmltYXRlLWZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGVudkNvbXBhdGlibGUgZnJvbSAndml0ZS1wbHVnaW4tZW52LWNvbXBhdGlibGUnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBlbnZQcmVmaXg6ICdSRUFDVF9BUFBfJyxcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgZW52Q29tcGF0aWJsZSgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0BzcmMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgcG9ydDogNTU1NSxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgfSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVCxTQUFTLG9CQUFvQjtBQUN4VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBSDFCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFdBQVc7QUFBQSxFQUNYLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDbEMsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUFRLGFBQWEsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==