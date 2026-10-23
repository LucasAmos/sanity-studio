const studioDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagePath = path.join(studioDir, "package.json");

const { name, license, files, exports, main } = JSON.parse(await readFile(packagePath, "utf8"));

const version = process.argv[2];

if (!version) {
  throw new Error("Pass the release version as the first argument");
}

const manifest = { name, version, license, files, exports, main };

await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
