const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const parserSpecs = [
  { file: "csv-to-json.html", name: "parseCSV", next: "function convertCSV() {" },
  { file: "csv-to-jsonl.html", name: "parseCsv", next: "function parseValue(value) {" },
  { file: "csv-to-sql.html", name: "parseCSV", next: "function convertToSQL() {" },
];

function loadActualParser({ file, name, next }) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const startAt = html.indexOf(`function ${name}(text) {`);
  const endAt = html.indexOf(next, startAt);
  assert.notEqual(startAt, -1, `Could not find ${name} in ${file}`);
  assert.notEqual(endAt, -1, `Could not find end marker in ${file}`);
  const functionSource = html.slice(startAt, endAt);
  const sandbox = {};
  vm.runInNewContext(`${functionSource}\nglobalThis.__csvParser = ${name};`, sandbox, {
    filename: file,
    timeout: 1000,
  });
  return sandbox.__csvParser;
}

for (const spec of parserSpecs) {
  test(`${spec.file}: valid CSV cases`, () => {
    const parse = loadActualParser(spec);
    const cases = [
      ["quoted comma", 'name,city\nAli,"Karachi, Pakistan"', [["name", "city"], ["Ali", "Karachi, Pakistan"]]],
      ["doubled quote", 'name\n"Ali ""A"""', [["name"], ['Ali "A"']]],
      ["quoted multiline", 'name,note\nAli,"line 1\nline 2"', [["name", "note"], ["Ali", "line 1\nline 2"]]],
      ["CRLF", "a,b\r\n1,2\r\n", [["a", "b"], ["1", "2"]]],
      ["blank physical lines", "a,b\n\n1,2\n", [["a", "b"], ["1", "2"]]],
      ["UTF-8 BOM", "\uFEFFa,b\n1,2", [["a", "b"], ["1", "2"]]],
      ["trailing empty field", "a,b\n1,", [["a", "b"], ["1", ""]]],
      ["empty cells in a row", "a,b,c\n1,,3", [["a", "b", "c"], ["1", "", "3"]]],
    ];
    for (const [label, input, expected] of cases) {
      assert.equal(JSON.stringify(parse(input)), JSON.stringify(expected), label);
    }
  });

  test(`${spec.file}: malformed quotes are rejected`, () => {
    const parse = loadActualParser(spec);
    assert.throws(() => parse('a,b\n1,"unfinished'), /unclosed quoted field/i);
    assert.throws(() => parse('a,b\n1,ab"cd'), /unexpected quote/i);
    assert.throws(() => parse('a,b\n1,"closed"x'), /after a closing quote/i);
  });
}
