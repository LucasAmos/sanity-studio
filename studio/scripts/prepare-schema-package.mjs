import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const studioDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(studioDir, "dist", "schema-package");

const { name, version, license, files, exports, main } = JSON.parse(
  await readFile(path.join(studioDir, "package.json"), "utf8")
);

if (!version) {
  throw new Error("Pass the release version as the first argument");
}

await mkdir(outputDir, { recursive: true });
await copyFile(path.join(studioDir, "schema.json"), path.join(outputDir, "schema.json"));

const manifest = {
  name,
  version,
  license,
  files,
  exports,
  main
};

await writeFile(path.join(outputDir, "package.json"), `${JSON.stringify(manifest, null, 2)}\n`);
