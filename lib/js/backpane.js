/* ----------------------------------
 * BACKPANE v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

!function () {

  var backPane, content;
  
  var onPaneHidden = function(){
  	var content = document.querySelector('.content');
  	backPane.classList.remove('rightPane');
  	backPane.classList.remove('visible');
	content.removeEventListener('webkitTransitionEnd', onPaneHidden);
  };
  
  var findPanes = function (target) {
    var i, panes = document.querySelectorAll('a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = panes.length; i--;) { if (panes[i] === target) return target; }
    }
  };

  var getPane = function (e) {
    var anchor = findPanes(e.target);

    if (!anchor || !anchor.hash) return;

    backPane = document.querySelector(anchor.hash);

    if (!backPane || !backPane.classList.contains('backPane')) return;

    return backPane;
  }

  window.addEventListener('touchend', function (e) {
    var backPane = getPane(e),
    	paneSide = e.srcElement.dataset.pane ? e.srcElement.dataset.pane : 'left',
    	body = document.body,
    	content = document.querySelector('.content');
	
    if (!backPane) return;
	
	if(paneSide=="left"){
		if(body.classList.contains('openPaneLeft')){
			content.addEventListener('webkitTransitionEnd', onPaneHidden);
			body.classList.remove('openPaneLeft');
		} else {
			backPane.classList.add('visible');
			body.classList.add('openPaneLeft');
		}
	} else {
		if(body.classList.contains('openPaneRight')){
			content.addEventListener('webkitTransitionEnd', onPaneHidden);
			body.classList.remove('openPaneRight');
		} else {
			backPane.classList.add('rightPane');
			backPane.classList.add('visible');
			body.classList.add('openPaneRight');
		}
	}
  });

  window.addEventListener('click', function (e) { if (getPane(e)) e.preventDefault(); });

}();
