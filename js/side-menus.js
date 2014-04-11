/* ========================================================================
 * Ratchet: side-menus.js v2.0.2
 * http://goratchet.com/components#sideMenus
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var findSideMenus = function (target) {
    var i;
    var sideMenus = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = sideMenus.length; i--;) {
        if (sideMenus[i] === target) {
          return target;
        }
      }
    }
  };

  var getSideMenu = function (event) {
    var sideMenuToggle = findSideMenus(event.target);
    if (sideMenuToggle && sideMenuToggle.hash) {
      var sideMenu = document.querySelector(sideMenuToggle.hash);
      if (sideMenu && sideMenu.classList.contains('side-menu')) {
        return sideMenu;
      }
    }
  };

  var getSideMenuSiblings = function (sideMenu) {
    var siblings = [].slice.call(sideMenu.parentNode.children);
    siblings = siblings.filter(function(val) {
      return [sideMenu].indexOf(val) === -1 && val.nodeName !== 'SCRIPT';
    });
    return siblings;
  };

  window.addEventListener('touchend', function (event) {
    var sideMenu = getSideMenu(event);
    if (sideMenu) {
      var siblings = getSideMenuSiblings(sideMenu);
      var i;
      var l;
      var hasBlocker = false;
      for (i = 0, l = siblings.length; i < l; i++) {
        if (!hasBlocker && siblings[i].classList.contains('side-menu-blocker')) {
          hasBlocker = true;
        }
        if (siblings[i].classList.contains('activeSideMenu')) {
          siblings[i].classList.remove('activeSideMenu');
          siblings[i].classList.add('inactiveSideMenu');
        } else {
          siblings[i].classList.remove('inactiveSideMenu');
          siblings[i].classList.add('activeSideMenu');
        }
      }
      if (hasBlocker === false) {
        var blocker = document.createElement('a');
        blocker.href = '#' + sideMenu.id;
        blocker.classList.add('side-menu-blocker');
        sideMenu.parentElement.appendChild(blocker);
        siblings.push(blocker);
        blocker.classList.add('activeSideMenu');
      }

      event.preventDefault(); // prevents rewriting url (apps can still use hash values in url)
    }
  });
}());
