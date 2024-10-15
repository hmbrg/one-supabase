import type { UserConfig } from "vite";
import { one } from "one/vite";
import { tamaguiPlugin } from "@tamagui/vite-plugin";

export default {
  plugins: [
    one({
      web: {
        deploy: "vercel",
        defaultRenderMode: "ssg",
      },

      app: {
        key: "one-example",
      },

      deps: {
        "react-native-url-polyfill": "interop",
      },
    }),

    tamaguiPlugin({
      optimize: true,
      components: ["tamagui"],
      config: "./config/tamagui.config.ts",
      outputCSS: "./code/styles/tamagui.css",
    }),
  ],
} satisfies UserConfig;
