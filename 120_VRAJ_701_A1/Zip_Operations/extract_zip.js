import extract from "extract-zip";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const zipPath = path.join(__dirname, "./Hello.zip");
const extractTo = path.join(__dirname, "./unzipped_output");

extract(zipPath, { dir: extractTo })
  .then(() => {
    console.log(" The Zip file is Extracted!");
  })
  .catch((err) => {
    console.error(" Extraction failed:", err.message);
  });
