const packageJson = require("./package.json");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

const directoriesLib = packageJson.directories.lib;
const directoriesOrigin = packageJson.directories.origin;

function runCommand(command, cwd) {
  return new Promise((resolve) => {
    exec(
      command,
      {
        cwd,
      },
      (error, stdout, stderr) => {
        // 获取命令执行的输出
        if (error) {
          resolve(false);
          console.log(
            "error",
            error,
            path.resolve(__dirname, "..", directoriesLib)
          );
        }
        console.log(stdout);
        resolve(stdout);
      }
    );
  });
}

(async () => {
  const cwd = path.resolve(__dirname, "..", directoriesLib);
  const scriptPath = path.resolve(__dirname, "./");
  const originPath = path.resolve(__dirname, "..", directoriesOrigin);

  const packageInfo = await runCommand(
    "npm view @asow/common-client --json",
    cwd
  );
  const { versions } = JSON.parse(packageInfo);
  packageJson.version = versions[versions.length - 1];

  // 写入/lib里面的package.json
  fs.writeFileSync(
    path.resolve(__dirname, `../${directoriesLib}/package.json`),
    JSON.stringify(packageJson)
  );
  await runCommand("npm version patch", cwd);

  // 写入/script里面的package.json
  fs.writeFileSync(
    path.resolve(__dirname, "./package.json"),
    JSON.stringify(packageJson)
  );
  await runCommand("npm version patch", scriptPath);

  const gitBranchName = await runCommand(
    `git rev-parse --abbrev-ref HEAD`,
    cwd
  );

  // await runCommand(`cp -r ${originPath} ${path.resolve(cwd, "src")}`, cwd);
  await runCommand("npm publish", cwd);
})();
