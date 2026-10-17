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
  { file: "csv-to-html.html", name: "parseCSV", next: "function convertToHTML() {" },
  { file: "csv-to-markdown.html", name: "parseCSV", next: "function escapeMarkdown(value) {" },
  { file: "csv-to-tsv.html", name: "parseCSV", next: "function tsvEscape(value) {" },
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
    ["all-empty multi-column record", "a,b,c\n,,", [["a", "b", "c"], ["", "", ""]]],
      ["empty cells in a row", "a,b,c\n1,,3", [["a", "b", "c"], ["1", "", "3"]]],
      ["all-empty multi-column record", "a,b,c\n,,", [["a", "b", "c"], ["", "", ""]]],
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

test("CSV to SQL: string and identifier escaping", () => {
  const html = fs.readFileSync(path.join(root, "csv-to-sql.html"), "utf8");
  const start = html.indexOf("function escapeSQL(value) {");
  const end = html.indexOf("function parseCSV(text) {", start);
  assert.notEqual(start, -1, "Could not find SQL escaping helpers");
  assert.notEqual(end, -1, "Could not find end of SQL escaping helpers");
  const helpers = html.slice(start, end);
  const sandbox = {};
  vm.runInNewContext(`${helpers}\nglobalThis.__escapeSQL = escapeSQL;\nglobalThis.__quoteIdentifier = quoteIdentifier;`, sandbox, {
    filename: "csv-to-sql.html",
    timeout: 1000,
  });
  assert.equal(sandbox.__escapeSQL("O'Reilly\\Path"), "'O''Reilly\\\\Path'");
  assert.equal(sandbox.__escapeSQL(""), "''");
  assert.equal(sandbox.__quoteIdentifier("user`name"), "`user``name`");
});

test("Shared CSV parser used by CSV Viewer and CSV to XML", () => {
  const parse = require("../assets/csv-utils.js").parseCsv;
  const cases = [
    ["quoted comma", 'name,city\nAli,"Karachi, Pakistan"', [["name", "city"], ["Ali", "Karachi, Pakistan"]]],
    ["doubled quote", 'name\n"Ali ""A"""', [["name"], ['Ali "A"']]],
    ["quoted multiline", 'name,note\nAli,"line 1\nline 2"', [["name", "note"], ["Ali", "line 1\nline 2"]]],
    ["CRLF", "a,b\r\n1,2\r\n", [["a", "b"], ["1", "2"]]],
    ["blank physical lines", "a,b\n\n1,2\n", [["a", "b"], ["1", "2"]]],
    ["UTF-8 BOM", "\uFEFFa,b\n1,2", [["a", "b"], ["1", "2"]]],
    ["trailing empty field", "a,b\n1,", [["a", "b"], ["1", ""]]],
  ];
  for (const [label, input, expected] of cases) {
    assert.equal(JSON.stringify(parse(input)), JSON.stringify(expected), label);
  }
  assert.throws(() => parse('a,b\n1,"unfinished'), /not closed/i);
  assert.throws(() => parse('a,b\n1,ab"cd'), /unexpected quote/i);
  assert.throws(() => parse('a,b\n1,"closed"x'), /after a closing quote/i);
});

test("CSV Viewer and CSV to XML reject inconsistent row widths", () => {
  const viewer = fs.readFileSync(path.join(root, "csv-viewer.html"), "utf8");
  const xml = fs.readFileSync(path.join(root, "csv-to-xml.html"), "utf8");
  assert.match(viewer, /rows\[rowIndex\]\.length !== width/);
  assert.match(xml, /rows\[rowIndex\]\.length !== headers\.length/);
  assert.doesNotMatch(viewer, /while \(padded\.length < width\)/);
});

test("CSV and JSON to HTML escape user-controlled markup", () => {
  for (const [file, nextMarker] of [
    ["csv-to-html.html", "function parseCSV(text) {"],
    ["json-to-html.html", "function displayValue(value) {"],
  ]) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    const start = html.indexOf("function escapeHTML(value) {");
    const end = html.indexOf(nextMarker, start);
    assert.notEqual(start, -1, `Could not find HTML escape helper in ${file}`);
    assert.notEqual(end, -1, `Could not find HTML escape helper end in ${file}`);
    const sandbox = {};
    vm.runInNewContext(`${html.slice(start, end)}\nglobalThis.__escapeHTML = escapeHTML;`, sandbox, {
      filename: file,
      timeout: 1000,
    });
    assert.equal(
      sandbox.__escapeHTML('<img src=x onerror="alert(1)">'),
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
    );
    assert.equal(sandbox.__escapeHTML("O'Reilly & Sons"), "O&#39;Reilly &amp; Sons");
  }
});
