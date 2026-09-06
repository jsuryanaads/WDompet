(function(){
  'use strict';

  // WDompet V3.0.5 — detector + two presentation modes.
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
    if (document.getElementById('wdompet-presentation-v305')) return;
    var style = document.createElement('style');
    style.id = 'wdompet-presentation-v305';
    style.textContent = '\
html.ui-desktop body{padding-left:220px;padding-bottom:0}\
html.ui-desktop .appbar{position:fixed;left:0;top:0;width:220px;height:100vh;padding:28px 18px;display:flex;flex-direction:column;align-items:stretch;gap:24px}\
html.ui-desktop .appbar .brand{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:8px;text-align:center;width:100%}\
html.ui-desktop .appbar .brand-logo{width:108px;height:108px;margin:0 auto}\
html.ui-desktop .appbar .brand b{font-size:24px}\
html.ui-desktop .appbar .brand span{font-size:10px;line-height:1.4}\
html.ui-desktop .nav{position:fixed;left:0;top:245px;bottom:0;width:220px;padding:10px 18px 22px;display:flex;flex-direction:column}\
html.ui-desktop main{width:min(1220px,calc(100% - 44px));margin:34px auto}\
html.ui-desktop .appbar-actions{margin-top:auto;justify-content:center}\
html.ui-mobile body{padding-left:86px;padding-bottom:24px}\
html.ui-mobile .appbar{position:sticky;left:auto;top:0;width:calc(100% - 86px);height:70px;padding:8px 12px}\
html.ui-mobile .appbar .brand{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:8px;text-align:left;width:auto;min-width:0}\
html.ui-mobile .appbar .brand-logo{width:48px;height:48px;margin:0}\
html.ui-mobile .appbar .brand b{font-size:17px}\
html.ui-mobile .appbar .brand span{font-size:9px}\
html.ui-mobile .nav{position:fixed;left:0;top:0;bottom:0;width:86px;height:100vh;padding:76px 8px 14px;display:flex;flex-direction:column;gap:6px;overflow-y:auto}\
html.ui-mobile .nav-item{width:100%;min-height:48px;padding:8px 4px;justify-content:center;text-align:center}\
html.ui-mobile .nav-item small{font-size:8px;line-height:1.2;white-space:normal;word-break:break-word;text-align:center}\
html.ui-mobile main{width:calc(100% - 24px);margin:22px auto;padding-top:0!important}\
html.ui-mobile .welcome{flex-direction:column;align-items:stretch}\
html.ui-mobile .quick-stats{grid-template-columns:1fr}\
html.ui-mobile .split{grid-template-columns:1fr}\
html.ui-mobile .tools{flex-direction:column}\
html.ui-mobile .tools input{width:100%}\
html.ui-mobile .tablewrap table{min-width:720px}\
html.ui-mobile .appbar .appbar-actions{display:none}\
html.ui-mobile footer{padding-bottom:20px}\
html.ui-mobile .account-panel{top:74px;right:8px;left:auto;max-width:calc(100vw - 96px)}\
html.ui-mobile .user-email{max-width:100px;font-size:8px}\
html.ui-mobile .account-btn{min-height:30px;padding:0 7px;font-size:8px}\
@media(min-width:561px) and (max-width:850px){html.ui-mobile .quick-stats{grid-template-columns:repeat(3,1fr)}html.ui-mobile .split{grid-template-columns:1fr 1fr}}\
@media(max-width:560px){html.ui-mobile body{padding-left:78px}html.ui-mobile .appbar{width:calc(100% - 78px);padding:8px}.ui-mobile .nav{width:78px;padding-left:5px;padding-right:5px}.ui-mobile .nav-item{min-height:46px;padding:8px 3px}.ui-mobile .nav-item small{font-size:7.5px}.ui-mobile .appbar .brand-logo{width:42px;height:42px}.ui-mobile .appbar .brand b{font-size:15px}.ui-mobile .account-panel{top:72px;right:6px;max-width:calc(100vw - 84px)}.ui-mobile .user-email{max-width:82px;font-size:7.5px}.ui-mobile .account-btn{font-size:7.5px;padding:0 6px}}';
    document.head.appendChild(style);
  }

  function updateVersion(){
    var version = 'V3.0.5';
    document.title = document.title.replace(/V3\.0\.[1-4]/g, version);
    var nodes = document.querySelectorAll('.version, footer');
    for (var i=0;i<nodes.length;i++) {
      nodes[i].textContent = nodes[i].textContent.replace(/V3\.0\.[1-4]/g, version);
    }
  }

  function applyMode(){
    var mode = detectMode();
    var root = document.documentElement;
    root.classList.remove('ui-desktop', 'ui-mobile');
    root.classList.add(mode === 'mobile' ? 'ui-mobile' : 'ui-desktop');
    root.dataset.uiMode = mode;
    root.dataset.uiDetector = 'v3.0.5';
    installPresentationCSS();
    updateVersion();
  }

  applyMode();
  document.addEventListener('DOMContentLoaded', updateVersion, {once:true});
  window.addEventListener('resize', applyMode, {passive:true});
  window.addEventListener('orientationchange', applyMode, {passive:true});
  if (window.matchMedia) {
    try { window.matchMedia('(pointer: fine)').addEventListener('change', applyMode); } catch(e) {}
    try { window.matchMedia('(pointer: coarse)').addEventListener('change', applyMode); } catch(e) {}
  }

  window.wdompetUIDetector = {
    version: '3.0.5',
    getMode: detectMode,
    apply: applyMode
  };
})();
