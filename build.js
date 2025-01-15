import * as dts from "dts-bundle-generator"
import * as esbuild from "esbuild";
import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2)

const VERSION = "1.0.0"

const name = (n) => `${n}@${VERSION}`

if(args.includes("src")) {
  esbuild.build({
    outdir: "dist",
    entryPoints: [
      {in: "src/mod.ts", out: name("ivysaur")},
      {in: "src/playground.tsx", out: "playground"},
    ],
    loader: {
      ".tsx": "tsx",
    },
    jsxFactory: "h",
    jsxFragment: "Fragment",
    bundle: true,
    minify: true,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
    treeShaking: true,
    lineLimit: 80,
  })
}

if (args.includes("types")) {
  const blackberryTypes = dts.generateDtsBundle([
      {
        filePath: "src/mod.ts",
        libraries: {
          inlinedLibraries: ["@vue/reactivity", "alien-signals"]
        },
      },
    ]).join("\n")
  await writeFile(`dist/${name("ivysaur")}.d.ts`, blackberryTypes)
}
