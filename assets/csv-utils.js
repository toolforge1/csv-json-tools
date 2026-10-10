(function (root) {
  'use strict';

  function parseCsv(text) {
    var source = String(text == null ? '' : text).replace(/^\uFEFF/, '');
    if (source.length === 0) return [];

    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    var afterQuote = false;

    for (var i = 0; i < source.length; i += 1) {
      var ch = source[i];

      if (inQuotes) {
        if (ch === '"') {
          if (source[i + 1] === '"') {
            field += '"';
            i += 1;
          } else {
            inQuotes = false;
            afterQuote = true;
          }
        } else {
          field += ch;
        }
        continue;
      }

      if (ch === ',') {
        row.push(field);
        field = '';
        afterQuote = false;
        continue;
      }

      if (ch === '\r' || ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
        afterQuote = false;
        if (ch === '\r' && source[i + 1] === '\n') i += 1;
        continue;
      }

      if (ch === '"' && field === '') {
        inQuotes = true;
        afterQuote = false;
        continue;
      }

      // Ignore harmless whitespace after a closing quote; retain other characters.
      if (afterQuote && (ch === ' ' || ch === '\t')) continue;
      field += ch;
      afterQuote = false;
    }

    if (inQuotes) {
      throw new Error('A quoted field is not closed. Check for a missing double quote.');
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }

  var api = { parseCsv: parseCsv };
  root.CSVToolUtils = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
