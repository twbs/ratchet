!function () {

  var backPane;
  
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
			body.classList.remove('openPaneLeft');
		} else {
			body.classList.add('openPaneLeft');
		}
	} else {
		if(body.classList.contains('openPaneRight')){
			content.addEventListener('webkitTransitionEnd', function(){
				backPane.classList.remove('marginLeft');
			});
			body.classList.remove('openPaneRight');
		} else {
			backPane.classList.add('marginLeft');
			body.classList.add('openPaneRight');
		}
	}
	
  });

  window.addEventListener('click', function (e) { if (getPane(e)) e.preventDefault(); });

}();
