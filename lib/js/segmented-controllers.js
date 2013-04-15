/* ----------------------------------
 * TABS v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

!function () {
  var getTarget = function (target) {
    var i, popovers = document.querySelectorAll('.segmented-controller li a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = popovers.length; i--;) { if (popovers[i] === target) return target; }
    }
  };

  window.addEventListener("touchend", function (e) {
    var activeTab;
    var activeBodies;
    var targetBody;
    var targetTab;
    var className     = 'active';
    var classSelector = '.' + className;
    var targetAnchor  = getTarget(e.target);

    if (!targetAnchor) return;

    targetTab = targetAnchor.parentNode;
    activeTab = targetTab.parentNode.querySelector(classSelector);

    if (activeTab) activeTab.classList.remove(className);

    targetTab.classList.add(className);

    if (!targetAnchor.hash) return;

    targetBody = document.querySelector(targetAnchor.hash);

    if (!targetBody) return;

    activeBodies = targetBody.parentNode.querySelectorAll(classSelector);

    for (var i = 0; i < activeBodies.length; i++) {
      activeBodies[i].classList.remove(className);
    }

    targetBody.classList.add(className);
  });

  window.addEventListener('click', function (e) { if (getTarget(e.target)) e.preventDefault(); });
}();