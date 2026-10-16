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
    '@media(max-width:480px){#themeToggle{right:10px;bottom:10px;min-height:42px;padding:9px 12px}}',

    '#shareTools { margin: 28px auto 18px; width: min(100% - 32px, 980px); padding: 18px; border: 1px solid rgba(148,163,184,.28); border-radius: 16px; background: rgba(15,29,48,.92); color: #f8fafc; font: 14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif; }',
    '#shareTools h2 { margin: 0 0 6px; font-size: 18px; color: inherit; }',
    '#shareTools p { margin: 0 0 12px; color: #cbd5e1; }',
    '#shareTools .share-actions { display: flex; flex-wrap: wrap; gap: 8px; }',
    '#shareTools button { min-height: 40px; padding: 9px 12px; border: 1px solid rgba(148,163,184,.45); border-radius: 9px; background: #1d3552; color: #fff; font: 600 13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif; cursor: pointer; }',
    '#shareTools button:focus-visible { outline: 3px solid #60a5fa; outline-offset: 2px; }',
    'html[data-theme="light"] #shareTools { background: #fff; color: #172033; border-color: #d7e0ec; }',
    'html[data-theme="light"] #shareTools p { color: #475569; }',
    'html[data-theme="light"] #shareTools button { background: #edf4fc; color: #172033; border-color: #c6d2e1; }',
    '#shareTools button[data-share="whatsapp"] { background: #25D366; border-color: #25D366; color: #062b14; }',
    '#shareTools button[data-share="telegram"] { background: #229ED9; border-color: #229ED9; color: #fff; }',
    '#shareTools button[data-share="facebook"] { background: #1877F2; border-color: #1877F2; color: #fff; }',
    '#shareTools button[data-share="x"] { background: #000; border-color: #555; color: #fff; }',
    '#shareTools button[data-share="instagram"] { background: linear-gradient(115deg,#833AB4,#E1306C 55%,#FCAF45); border-color: #d9468f; color: #fff; }',
    '#shareTools button[data-share="copy"] { background: #D9F7BE; border: 1px solid #9BD87A; color: #205C2D; font-weight: 800; box-shadow: 0 2px 10px rgba(90,170,55,.18); }',
    '#shareTools button[data-share="copy"]:hover { background: #C4F0A0; }',
    '#shareTools button[data-share="whatsapp"]:hover { background: #1fbd59; }',
    '#shareTools button[data-share="telegram"]:hover { background: #168bc3; }',
    '#shareTools button[data-share="facebook"]:hover { background: #0f66d4; }',
    '#shareTools button[data-share="x"]:hover { background: #222; }',
    '#shareTools button[data-share="instagram"]:hover { filter: brightness(1.08); }',
    '#shareTools button[data-share] { transition: transform .15s ease, filter .15s ease, background-color .15s ease; }',
    '#shareTools button[data-share]:hover { transform: translateY(-1px); }',
    '@media(max-width:480px){#shareTools{width:calc(100% - 24px);padding:14px}#shareTools .share-actions{gap:6px}#shareTools button{flex:1 1 auto}}'
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

    if (!document.getElementById("shareTools") && document.title && !/offline/i.test(document.title)) {
      var share = document.createElement("section");
      share.id = "shareTools";
      share.setAttribute("aria-labelledby", "shareToolsTitle");
      share.innerHTML = '<h2 id="shareToolsTitle">Share this tool</h2><p>Help someone discover this free browser-based tool.</p><div class="share-actions"><button type="button" data-share="native">↗ Share</button><button type="button" data-share="whatsapp"><span aria-hidden="true">◉</span> WhatsApp</button><button type="button" data-share="telegram"><span aria-hidden="true">➤</span> Telegram</button><button type="button" data-share="facebook"><span aria-hidden="true" style="font-weight:900;font-size:16px">f</span> Facebook</button><button type="button" data-share="x"><span aria-hidden="true" style="font-weight:900">𝕏</span> X</button><button type="button" data-share="instagram"><span aria-hidden="true">◎</span> Instagram link</button><button type="button" data-share="copy"><span aria-hidden="true">🔗</span> Copy link</button></div>';
      var footer = document.querySelector("footer");
      if (footer && footer.parentNode) footer.parentNode.insertBefore(share, footer);
      else document.body.appendChild(share);
      share.addEventListener("click", async function (event) {
        var target = event.target.closest("button[data-share]");
        if (!target) return;
        var pageUrl = window.location.href.split("#")[0];
        var pageTitle = document.title || "Free online developer tool";
        var text = pageTitle + " — " + pageUrl;
        var action = target.getAttribute("data-share");
        var urls = {
          whatsapp: "https://wa.me/?text=" + encodeURIComponent(text),
          telegram: "https://t.me/share/url?url=" + encodeURIComponent(pageUrl) + "&text=" + encodeURIComponent(pageTitle),
          facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl),
          x: "https://twitter.com/intent/tweet?url=" + encodeURIComponent(pageUrl) + "&text=" + encodeURIComponent(pageTitle)
        };
        if (action === "native" && navigator.share) {
          try { await navigator.share({ title: pageTitle, text: "Try this free browser-based tool", url: pageUrl }); } catch (_) {}
          return;
        }
        if (action === "native") action = "copy";
        if (action === "instagram" || action === "copy") {
          try {
            if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(pageUrl);
            else {
              var input = document.createElement("textarea");
              input.value = pageUrl;
              input.setAttribute("readonly", "");
              input.style.position = "absolute";
              input.style.left = "-9999px";
              document.body.appendChild(input);
              input.select();
              document.execCommand("copy");
              input.remove();
            }
            target.textContent = action === "instagram" ? "Link copied — paste in Instagram" : "Link copied!";
            window.setTimeout(function () { target.textContent = action === "instagram" ? "Instagram link" : "Copy link"; }, 2600);
          } catch (_) { window.prompt("Copy this page link:", pageUrl); }
          return;
        }
        if (urls[action]) window.open(urls[action], "_blank", "noopener,noreferrer");
      });
    }

    // Add page-specific feedback contact to tool pages using this shared script.
    if (!document.getElementById("feedback") &&
        (document.body.innerText || "").indexOf("Report a Problem or Share Feedback") === -1 &&
        !/offline/i.test(document.title)) {
      var feedback = document.createElement("section");
      feedback.id = "feedbackSupport";
      feedback.style.cssText = "margin:28px auto;padding:22px;width:min(calc(100% - 32px),1180px);border:1px solid rgba(96,165,250,.35);border-radius:18px;background:rgba(37,99,235,.09);color:inherit;box-sizing:border-box";
      var heading = document.createElement("h2");
      heading.textContent = "Report a Problem or Share Feedback";
      heading.style.cssText = "margin:0 0 8px;font-size:clamp(20px,3vw,26px)";
      var description = document.createElement("p");
      description.textContent = "If you encounter any issue while using this tool, please report it so we can investigate and fix it. Suggestions and ideas to improve this tool are welcome too.";
      description.style.cssText = "margin:0 0 14px;line-height:1.65";
      var link = document.createElement("a");
      link.textContent = "Report a problem or send a suggestion";
      link.style.cssText = "display:inline-block;padding:11px 16px;border-radius:10px;background:#2563eb;color:#fff;text-decoration:none;font-weight:750";
      var pageTitle = document.title || "Developer tool";
      var pageUrl = window.location.href.split("#")[0];
      var body = "Hello CSV & JSON Developer Tools team,\n\nFeedback type: [Bug report / Suggestion / Other]\n\nTool/page: " + pageTitle + "\nPage URL: " + pageUrl + "\n\nDescribe the problem or suggestion:\n[Write details here.]\n\nSteps to reproduce (if applicable):\n1. \n2. \n\nExpected result:\nActual result:\n";
      link.href = "mailto:csvjsonsupport@gmail.com?subject=" + encodeURIComponent("Tool feedback: " + pageTitle) + "&body=" + encodeURIComponent(body);
      var note = document.createElement("small");
      note.textContent = "The email draft includes this tool's page title and URL. Please do not include passwords, API keys, private data, or sensitive files. Your email app must be configured to send email.";
      note.style.cssText = "display:block;margin-top:12px;opacity:.75;line-height:1.5";
      feedback.appendChild(heading);
      feedback.appendChild(description);
      feedback.appendChild(link);
      feedback.appendChild(note);
      var feedbackFooter = document.querySelector("footer");
      if (feedbackFooter && feedbackFooter.parentNode) feedbackFooter.parentNode.insertBefore(feedback, feedbackFooter);
      else document.body.appendChild(feedback);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();