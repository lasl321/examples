import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src"],
      exclude: [...coverageConfigDefaults.exclude, "src/index.ts"],
      reportsDirectory: ".coverage",
      skipFull: true,
      thresholds: {
        "100": true,
      },
    },
    exclude: [...configDefaults.exclude, "dist"],
  },
});
