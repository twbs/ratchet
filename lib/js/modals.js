/* ----------------------------------
 * MODAL v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

!function () {
  var findModals = function (target) {
    var i;
    var modals = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = modals.length; i--;) { if (modals[i] === target) return target; }
    }
  };

  var getModal = function (event) {
    var modalToggle = findModals(event.target);
    if (!modalToggle || !modalToggle.hash) return;
    
    return document.querySelector(modalToggle.hash);
  };

  window.addEventListener('touchend', function (event) {
    var modal = getModal(event);

    if (!modal) return; 
    modal.classList.toggle('active');
  });

  window.addEventListener('click', function (event) { 
    if (getModal(event)) event.preventDefault();
  });
}();