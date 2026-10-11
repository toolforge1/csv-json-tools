(function () {
  "use strict";
  var key = "csv-json-tools-theme";
  var lightCss = [
    'html[data-theme="light"] { color-scheme: light; }',
    'html[data-theme="light"] body { background: #f3f7fb !important; color: #172033 !important; }',
    'html[data-theme="light"] .site-header, html[data-theme="light"] header { background: rgba(248,251,255,.96) !important; color: #172033 !important; border-color: #d5deea !important; }',
    'html[data-theme="light"] .brand, html[data-theme="light"] .brand-text, html[data-theme="light"] nav, html[data-theme="light"] nav a { color: #172033 !important; }',
    'html[data-theme="light"] main, html[data-theme="light"] section { color: #172033; }',
    'html[data-theme="light"] .panel, html[data-theme="light"] .content-card, html[data-theme="light"] .tool, html[data-theme="light"] .feature, html[data-theme="light"] .bottom-cta, html[data-theme="light"] .hero-card { background: #ffffff !important; color: #172033 !important; border-color: #d7e0ec !important; box-shadow: 0 10px 30px rgba(15,35,60,.07) !important; }',
    'html[data-theme="light"] .hero { background: linear-gradient(135deg,#edf5ff,#f7fbff 55%,#e7f9fc) !important; color: #172033 !important; border-color: #d7e0ec !important; }',
    'html[data-theme="light"] h1, html[data-theme="light"] h2, html[data-theme="light"] h3, html[data-theme="light"] h4, html[data-theme="light"] strong, html[data-theme="light"] .tool strong, html[data-theme="light"] summary { color: #172033 !important; }',
    'html[data-theme="light"] p, html[data-theme="light"] li, html[data-theme="light"] .tool span, html[data-theme="light"] .muted, html[data-theme="light"] .feature span { color: #475569 !important; }',
    'html[data-theme="light"] a { color: #075eaa; }',
    'html[data-theme="light"] textarea, html[data-theme="light"] input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), html[data-theme="light"] select { background: #ffffff !important; color: #172033 !important; border-color: #c6d2e1 !important; }',
    'html[data-theme="light"] pre, html[data-theme="light"] code, html[data-theme="light"] table { background: #f8fafc !important; color: #172033 !important; border-color: #d7e0ec !important; }',
    'html[data-theme="light"] th { background: #e6eef8 !important; color: #172033 !important; } html[data-theme="light"] td { color: #334155 !important; }',
    'html[data-theme="light"] details { background: #fff !important; border-color: #d7e0ec !important; }',
    'html[data-theme="light"] .site-footer, html[data-theme="light"] footer { background: #eaf0f7 !important; color: #475569 !important; border-color: #d7e0ec !important; }',
    'html[data-theme="light"] .nav-link, html[data-theme="light"] .button, html[data-theme="light"] button:not(#themeToggle), html[data-theme="light"] .secondary-btn { color: #172033; }',
    '#themeToggle { position: fixed; right: 16px; bottom: 16px; z-index: 99999; display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 10px 14px; border: 1px solid rgba(148,163,184,.45); border-radius: 999px; background: #0d1b2d; color: #fff; box-shadow: 0 8px 28px rgba(0,0,0,.22); font: 700 13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif; cursor: pointer; }',
    'html[data-theme="light"] #themeToggle { background: #fff; color: #172033; border-color: #c6d2e1; box-shadow: 0 8px 24px rgba(15,35,60,.16); }',
    '@media(max-width:480px){#themeToggle{right:10px;bottom:10px;min-height:42px;padding:9px 12px}}'
  ].join("\n");
  function init() {
    var theme = "dark";
    try { theme = localStorage.getItem(key) || "dark"; } catch (_) {}
    if (theme !== "light") theme = "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var style = document.createElement("style");
    style.id = "csv-json-theme-styles";
    style.textContent = lightCss;
    document.head.appendChild(style);
    var button = document.createElement("button");
    button.type = "button";
    button.id = "themeToggle";
    button.setAttribute("aria-label", "Switch color theme");
    button.addEventListener("click", function () {
      theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      try { localStorage.setItem(key, theme); } catch (_) {}
      renderLabel();
    });
    function renderLabel() {
      var light = document.documentElement.getAttribute("data-theme") === "light";
      button.textContent = light ? "🌙 Dark mode" : "☀️ Light mode";
      button.setAttribute("aria-pressed", light ? "true" : "false");
    }
    renderLabel();
    document.body.appendChild(button);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();