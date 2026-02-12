import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.educationthatinspires.com",
  integrations: [sitemap()]
});
