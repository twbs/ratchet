/* ========================================================================
 * Ratchet: popovers.js v2.0.2
 * http://goratchet.com/components#popovers
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var popover;
  var listener;

  var findPopovers = function (target) {
    var i;
    var popovers = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = popovers.length; i--;) {
        if (popovers[i] === target) {
          return target;
        }
      }
    }
  };

  var hidePopover = function () {
    popover.addEventListener('webkitTransitionEnd', (listener = onPopoverHidden));
    popover.classList.remove('visible');
    popover.parentNode.removeChild(backdrop);
  };

  var onPopoverHidden = function () {
    popover.style.display = 'none';
    listener = popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
  };

  var backdrop = (function () {
    var element = document.createElement('div');

    element.classList.add('backdrop');
    element.addEventListener('touchend', hidePopover);
    element.addEventListener('click', hidePopover);

    return element;
  }());

  var getPopover = function (e, id) {
    var anchor = e && findPopovers(e.target);

    if ((!anchor || !anchor.hash || (anchor.hash.indexOf('/') > 0)) && !id) {
      return;
    }

    try {
      popover = document.querySelector(id || anchor.hash);
    }
    catch (error) {
      popover = null;
    }

    if (popover === null) {
      return;
    }

    if (!popover || !popover.classList.contains('popover')) {
      return;
    }

    return popover;
  };

  var showHidePopover = function (e, id) {
    var popover = getPopover(e, id);

    if (!popover || !!listener) {
      return;
    }

    if (popover.classList.contains('visible')) {
      return hidePopover();
    }

    popover.style.display = 'block';
    popover.offsetHeight;
    popover.classList.add('visible');

    popover.parentNode.appendChild(backdrop);
  };

  window.addEventListener('touchend', showHidePopover);
  window.addEventListener('click', showHidePopover);
  window.POPOVER = {
    show: function (id) {
      showHidePopover(null, id);
    },
    hide: function () {
      popover && hidePopover();
    }
  };
}());
