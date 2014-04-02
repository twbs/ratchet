/* ========================================================================
 * Ratchet: modals.js v2.0.2
 * http://goratchet.com/components#modals
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var findModals = function (target) {
    var i;
    var modals = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = modals.length; i--;) {
        if (modals[i] === target) {
          return target;
        }
      }
    }
  };

  var getModal = function (event) {
    var modalToggle = findModals(event.target);
    if (modalToggle && modalToggle.hash) {
      return document.querySelector(modalToggle.hash);
    }
  };

  window.addEventListener('touchend', function (event) {
    var modal = getModal(event);
    if (modal) {
      if (modal && modal.classList.contains('modal')) {
        modal.classList.toggle('active');
      }
      event.preventDefault(); // prevents rewriting url (apps can still use hash values in url)
    }
  });
}());
