/* ----------------------------------
 * POPOVER v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

!function () {

  var popover;

  var findPopovers = function (target) {
    var i, popovers = document.querySelectorAll('a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = popovers.length; i--;) { if (popovers[i] === target) return target; }
    }
  };

  var onPopoverHidden = function () {
    document.body.removeChild(backdrop);
    popover.style.display = 'none';
    popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
  }

  var backdrop = function () {
    var element = document.createElement('div');

    element.classList.add('backdrop');

    element.addEventListener('touchend', function () {
      popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
      popover.classList.remove('visible');
    });

    return element;
  }();

  var getPopover = function (e) {
    var anchor = findPopovers(e.target);

    if (!anchor || !anchor.hash) return;

    popover = document.querySelector(anchor.hash);

    if (!popover || !popover.classList.contains('popover')) return;

    return popover;
  }

  window.addEventListener('touchend', function (e) {
    var popover = getPopover(e);

    if (!popover) return;

    popover.style.display = 'block';
    popover.offsetHeight;
    popover.classList.add('visible');

    popover.parentNode.appendChild(backdrop);
  });

  window.addEventListener('click', function (e) { if (getPopover(e)) e.preventDefault(); });

}();
