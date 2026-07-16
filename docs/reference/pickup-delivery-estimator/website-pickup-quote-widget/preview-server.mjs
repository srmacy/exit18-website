import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8",
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const requested = clean === "/" ? "/index.html" : clean;
  const full = path.normalize(path.join(root, requested));
  if (!full.startsWith(root)) return null;
  return full;
}

const server = http.createServer(async (req, res) => {
  try {
    const filePath = safePath(req.url || "/");
    if (!filePath) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const data = await fs.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Preview running at http://localhost:${port}/`);
});
