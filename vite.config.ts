import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'

export default (({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = env;
  // const isBuild = command === "build";

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue()],
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@image': fileURLToPath(new URL('./src/assets/image', import.meta.url)),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/index.scss";`, // 引入全局sass
        }
      }
    },
    server: {
      port: 3200
    }
  }
});
