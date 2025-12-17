import fs from "node:fs";

const logPath = process.argv[2] || ".autopilot/tsc.log";
const outPath = process.argv[3] || ".autopilot/reports/errors.json";

const raw = fs.readFileSync(logPath, "utf8");

// Works with standard tsc format: path(line,col): error TSxxxx: message
const re = /^(.+)\((\d+),(\d+)\): error (TS\d+): (.+)$/gm;

const errors = [];
let m;
while ((m = re.exec(raw)) !== null) {
  const [, file, line, col, code, msg] = m;
  errors.push({
    file: file.trim(),
    line: Number(line),
    col: Number(col),
    code,
    msg: msg.trim(),
  });
}

errors.sort((a, b) =>
  a.file === b.file ? a.line - b.line : a.file.localeCompare(b.file)
);

fs.writeFileSync(outPath, JSON.stringify({ count: errors.length, errors }, null, 2));
console.log(`Parsed ${errors.length} errors -> ${outPath}`);
