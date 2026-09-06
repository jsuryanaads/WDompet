(function(){
  'use strict';

  // WDompet V3.0.1 — two presentation modes: desktop / mobile.
  // Width is the primary signal; pointer + touch validate tablet-like widths;
  // user-agent is used only as a fallback when layout signals are unavailable.
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

  function applyMode(){
    var mode = detectMode();
    var root = document.documentElement;
    root.classList.remove('ui-desktop', 'ui-mobile');
    root.classList.add(mode === 'mobile' ? 'ui-mobile' : 'ui-desktop');
    root.dataset.uiMode = mode;
    root.dataset.uiDetector = 'v3.0.1';
  }

  applyMode();
  window.addEventListener('resize', applyMode, {passive:true});
  window.addEventListener('orientationchange', applyMode, {passive:true});
  if (window.matchMedia) {
    try { window.matchMedia('(pointer: fine)').addEventListener('change', applyMode); } catch(e) {}
    try { window.matchMedia('(pointer: coarse)').addEventListener('change', applyMode); } catch(e) {}
  }

  window.wdompetUIDetector = {
    version: '3.0.1',
    getMode: detectMode,
    apply: applyMode
  };
})();
