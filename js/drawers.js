/* ========================================================================
 * Ratchet: drawer.js v2.0.2
 * http://goratchet.com/components#drawer
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var findDrawers = function (target) {
    var i;
    var drawers = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = drawers.length; i--;) {
        if (drawers[i] === target) {
          return target;
        }
      }
    }
  };

  var getDrawer = function (event) {
    var drawerToggle = findDrawers(event.target);
    if (drawerToggle && drawerToggle.hash) {
      return document.querySelector(drawerToggle.hash);
    }
  };

  window.addEventListener('touchend', function (event) {
    if (event.target.classList.contains('drawer')) {
      // click directly on the drawer, but not on it's inner element
      event.target.classList.remove('active');
      return;
    }

    var drawer = getDrawer(event);
    if (drawer) {
      if (drawer && drawer.classList.contains('drawer')) {
        drawer.classList.toggle('active');
      }
      event.preventDefault(); // prevents rewriting url (apps can still use hash values in url)
    }
  });
}());
