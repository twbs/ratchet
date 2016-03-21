/* ========================================================================
 * Ratchet: common.js v2.0.2
 * http://goratchet.com/
 * ========================================================================
 * Copyright 2015 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  // Compatible With CustomEvent
  if (!window.CustomEvent) {
    window.CustomEvent = function (type, config) {
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, config.bubbles, config.cancelable, config.detail);
      return e;
    };
  }

  // Create Ratchet namespace
  if (typeof window.RATCHET === 'undefined') {
    window.RATCHET = {};
  }

  // Original script from http://davidwalsh.name/vendor-prefix
  window.RATCHET.getBrowserCapabilities = (function () {
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
    return {
      prefix: '-' + pre + '-',
      transform: pre[0].toUpperCase() + pre.substr(1) + 'Transform'
    };
  })();

  window.RATCHET.getTransitionEnd = (function () {
    var el = document.createElement('ratchet');
    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition : 'transitionend',
      OTransition : 'oTransitionEnd otransitionend',
      transition : 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return transEndEventNames[name];
      }
    }

    return transEndEventNames.transition;
  })();

  window.RATCHET.emulateTransitionEnd = function (duration, target) {
    var called = false;
    target.addEventListener(window.RATCHET.getTransitionEnd, function () {
      called = true;
    });
    var callback = function () {
      if (!called) {
        var e = new CustomEvent(window.RATCHET.getTransitionEnd, {
          bubbles: true,
          cancelable: true
        });
        target.dispatchEvent(e);
      }
    };
    setTimeout(callback, duration);
  };
}());
