(function (root) {
  'use strict';

  function parseCsv(text) {
    var source = String(text == null ? '' : text).replace(/^\uFEFF/, '');
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    var afterQuote = false;
    var fieldStarted = false;

    function finishField() {
      row.push(field);
      field = '';
      afterQuote = false;
      fieldStarted = false;
    }

    function finishRow() {
      finishField();
      if (!(row.length === 1 && row[0].trim() === '')) rows.push(row);
      row = [];
    }

    for (var i = 0; i < source.length; i += 1) {
      var ch = source[i];
      var next = source[i + 1];

      if (inQuotes) {
        if (ch === '"' && next === '"') {
          field += '"';
          i += 1;
        } else if (ch === '"') {
          inQuotes = false;
          afterQuote = true;
        } else {
          field += ch;
        }
        continue;
      }

      if (afterQuote) {
        if (ch === ',') {
          finishField();
        } else if (ch === '\n' || ch === '\r') {
          if (ch === '\r' && next === '\n') i += 1;
          finishRow();
        } else {
          throw new Error('Unexpected character after a closing quote in CSV.');
        }
        continue;
      }

      if (ch === '"' && !fieldStarted && field === '') {
        inQuotes = true;
        fieldStarted = true;
      } else if (ch === '"') {
        throw new Error('Unexpected quote in an unquoted CSV field.');
      } else if (ch === ',') {
        finishField();
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && next === '\n') i += 1;
        finishRow();
      } else {
        field += ch;
        fieldStarted = true;
      }
    }

    if (inQuotes) throw new Error('A quoted field is not closed. Check for a missing double quote.');
    if (afterQuote || fieldStarted || field.length > 0 || row.length > 0) finishRow();
    return rows;
  }

  var api = { parseCsv: parseCsv };
  root.CSVToolUtils = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
