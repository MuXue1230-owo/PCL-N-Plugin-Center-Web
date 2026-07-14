import { mkdir, readdir, rename, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDirectory = resolve("dist");
const clientDirectory = resolve(distDirectory, "client");
const serverDirectory = resolve(distDirectory, "server");

await mkdir(clientDirectory, { recursive: true });

for (const entry of await readdir(distDirectory, { withFileTypes: true })) {
  if (entry.name === "client" || entry.name === "server") continue;
  await rename(resolve(distDirectory, entry.name), resolve(clientDirectory, entry.name));
}

await mkdir(serverDirectory, { recursive: true });
await copyFile(resolve("sites", "worker.mjs"), resolve(serverDirectory, "index.js"));
