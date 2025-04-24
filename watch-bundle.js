const chokidar = require("chokidar");
const { exec } = require("child_process");
const path = require("path");

const projects = ["admin", "admin-agent", "order"];

function bundle(project) {
  const input = `/spec/openapi/${project}/root.yml`;
  const output = `/spec/docs/${project}/openapi.yml`;

  const cmd = `docker run --rm -v ${process.cwd()}:/spec redocly/cli bundle ${input} --output ${output}`;

  console.log(`[bundle] Bundling ${project}...`);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`[error] ${project}:`, error.message);
    } else {
      console.log(`[success] ${project}: Bundle completed.`);
    }
  });
}

const watchPath = "/home/gonzuiswimmer/ito_k/swagger_docs/openapi/";
chokidar
  .watch(watchPath, {
    ignored: /(^|[/\\])\../, // dotfiles無視
    persistent: true,
    usePolling: true, // <--- ここがポイント
    interval: 300,
  })
  .on("change", (filePath) => {
    console.log(`[watch] Change detected in: ${filePath}`);
    projects.forEach((project) => {
      if (filePath.indexOf(project) > 0) {
        bundle(project);
      }
    });
  });
