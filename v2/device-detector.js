(function(){
  'use strict';

  // WDompet V3.0.7 — detector + two presentation modes.
  function detectMode(){
    var width = Number(window.innerWidth) || 0;
    var hasFinePointer = false;
    var hasCoarsePointer = false;
    var touchPoints = Number(navigator.maxTouchPoints) || 0;
    var ua = String(navigator.userAgent || '').toLowerCase();
    var touchUA = /android|iphone|ipad|ipod|mobile|tablet/.test(ua);

    try {
      hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    } catch(e) {}

    if (width > 0) {
      if (width <= 850) return 'mobile';
      if (width >= 1100) return 'desktop';
      if (hasCoarsePointer && touchPoints > 0) return 'mobile';
      if (hasFinePointer) return 'desktop';
    }

    if (touchPoints > 0 && touchUA) return 'mobile';
    if (hasFinePointer) return 'desktop';
    return touchUA ? 'mobile' : 'desktop';
  }

  function installPresentationCSS(){
    if (document.getElementById('wdompet-presentation-v307')) return;
    var style = document.createElement('style');
    style.id = 'wdompet-presentation-v307';
    style.textContent = '\
html.ui-desktop body{padding-left:220px!important;padding-bottom:0!important}\
html.ui-desktop .appbar{position:fixed!important;left:0!important;top:0!important;width:220px!important;height:100vh!important;padding:28px 18px!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:24px!important}\
html.ui-desktop .appbar .brand{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;text-align:center!important;width:100%!important}\
html.ui-desktop .appbar .brand-logo{width:108px!important;height:108px!important;margin:0 auto!important}\
html.ui-desktop .appbar .brand b{font-size:24px!important}\
html.ui-desktop .appbar .brand span{font-size:10px!important;line-height:1.4!important}\
html.ui-desktop .nav{position:fixed!important;left:0!important;top:245px!important;bottom:0!important;width:220px!important;padding:10px 18px 22px!important;display:flex!important;flex-direction:column!important}\
html.ui-desktop main{width:min(1220px,calc(100% - 44px))!important;margin:34px auto!important}\
html.ui-desktop .appbar-actions{margin-top:auto!important;justify-content:center!important}\
html.ui-mobile body{padding-left:86px!important;padding-bottom:24px!important}\
html.ui-mobile .appbar{position:sticky!important;left:auto!important;top:0!important;width:calc(100% - 86px)!important;height:70px!important;padding:8px 12px!important}\
html.ui-mobile .appbar .brand{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;text-align:left!important;width:auto!important;min-width:0!important}\
html.ui-mobile .appbar .brand-logo{width:48px!important;height:48px!important;margin:0!important}\
html.ui-mobile .appbar .brand b{font-size:17px!important}\
html.ui-mobile .appbar .brand span{font-size:9px!important}\
html.ui-mobile .nav{position:fixed!important;left:0!important;top:0!important;bottom:0!important;width:86px!important;height:100vh!important;padding:76px 8px 14px!important;display:flex!important;flex-direction:column!important;gap:6px!important;overflow-y:auto!important}\
html.ui-mobile .nav-item{width:100%!important;min-height:48px!important;padding:8px 4px!important;justify-content:center!important;text-align:center!important}\
html.ui-mobile .nav-item small{font-size:8px!important;line-height:1.2!important;white-space:normal!important;word-break:break-word!important;text-align:center!important}\
html.ui-mobile main{width:calc(100% - 24px)!important;margin:22px auto!important;padding-top:0!important}\
html.ui-mobile .welcome{flex-direction:column!important;align-items:stretch!important}\
html.ui-mobile .quick-stats{grid-template-columns:1fr!important}\
html.ui-mobile .split{grid-template-columns:1fr!important}\
html.ui-mobile .tools{flex-direction:column!important}\
html.ui-mobile .tools input{width:100%!important}\
html.ui-mobile .tablewrap table{min-width:720px!important}\
html.ui-mobile .appbar .appbar-actions{display:none!important}\
html.ui-mobile footer{padding-bottom:20px!important}\
@media(min-width:561px) and (max-width:850px){html.ui-mobile .quick-stats{grid-template-columns:repeat(3,1fr)!important}html.ui-mobile .split{grid-template-columns:1fr 1fr!important}}\
@media(max-width:560px){html.ui-mobile body{padding-left:78px!important}html.ui-mobile .appbar{width:calc(100% - 78px)!important;padding:8px!important}html.ui-mobile .nav{width:78px!important;padding-left:5px!important;padding-right:5px!important}.ui-mobile .nav-item{min-height:46px!important;padding:8px 3px!important}.ui-mobile .nav-item small{font-size:7.5px!important}.ui-mobile .appbar .brand-logo{width:42px!important;height:42px!important}.ui-mobile .appbar .brand b{font-size:15px!important}}';
    document.head.appendChild(style);
  }

  function updateVersion(){
    var version = 'V3.0.7';
    document.title = document.title.replace(/V3\.0\.[1-6]/g, version);
    var nodes = document.querySelectorAll('.version, footer');
    for (var i=0;i<nodes.length;i++) {
      nodes[i].textContent = nodes[i].textContent.replace(/V3\.0\.[1-6]/g, version);
    }
  }

  function applyMode(){
    var mode = detectMode();
    var root = document.documentElement;
    root.classList.remove('ui-desktop', 'ui-mobile');
    root.classList.add(mode === 'mobile' ? 'ui-mobile' : 'ui-desktop');
    root.dataset.uiMode = mode;
    root.dataset.uiDetector = 'v3.0.7';
    installPresentationCSS();
    updateVersion();
  }

  // Important: run again after all linked CSS has loaded so detector presentation rules win.
  applyMode();
  document.addEventListener('DOMContentLoaded', applyMode, {once:true});
  window.addEventListener('resize', applyMode, {passive:true});
  window.addEventListener('orientationchange', applyMode, {passive:true});
  if (window.matchMedia) {
    try { window.matchMedia('(pointer: fine)').addEventListener('change', applyMode); } catch(e) {}
    try { window.matchMedia('(pointer: coarse)').addEventListener('change', applyMode); } catch(e) {}
  }

  window.wdompetUIDetector = {
    version: '3.0.7',
    getMode: detectMode,
    apply: applyMode
  };
})();
