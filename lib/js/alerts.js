/* ----------------------------------
 * ALERT v0.0.1
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

!function () {
  var findAlerts = function (target) {
    var i, alerts = document.querySelectorAll('a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = alerts.length; i--;) { if (alerts[i] === target) return target; }
    }
  };

  var onAlertHidden = function () {
    var alert = getAlert(event);

    alert.style.display = 'none';
    alert.removeEventListener('webkitTransitionEnd', onAlertHidden);
  }

  var getAlert = function (event) {
    var alertDismiss = findAlerts(event.target);
    if (alertDismiss && alertDismiss.hash) return document.querySelector(alertDismiss.hash);
    console.log('get alert');
  };

  window.addEventListener('click', function (event) {
    var alert = getAlert(event);
    
    if (alert) {
      if (alert && alert.classList.contains('alert')) alert.classList.add('dismiss');
      alert.addEventListener('webkitTransitionEnd', onAlertHidden);
      event.preventDefault();
    }
  });
}();
