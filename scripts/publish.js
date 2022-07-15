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
  const originPath = path.resolve(__dirname, "..", directoriesOrigin);
  console.log(cwd);
  const packageInfo = await runCommand(
    "npm view @asow/common-client --json",
    cwd
  );
  const { versions } = JSON.parse(packageInfo);
  const remoteVersion = versions[versions.length - 1];
  console.log(remoteVersion);
  packageJson.version = remoteVersion;
  fs.writeFileSync(
    path.resolve(__dirname, `../${directoriesLib}/package.json`),
    JSON.stringify(packageJson),
    { flag: "w" }
  );

  const gitBranchName = await runCommand(
    `git rev-parse --abbrev-ref HEAD`,
    cwd
  );

  await runCommand(`cp -r ${originPath} ${path.resolve(cwd, "src")}`, cwd);

  await runCommand("npm version patch", cwd);
  await runCommand("npm publish", cwd);
})();
