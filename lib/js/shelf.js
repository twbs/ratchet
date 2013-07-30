/* ----------------------------------
 * SHELF v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */
 
!function () {
  
  var shelfButton = false;
  
  var findOpenShelfButton = function(target) {
    var i, buttons = document.querySelectorAll('.open-shelf');
    for (; target && target !== document; target = target.parentNode) {
      for (i = buttons.length; i--;) { if (buttons[i] == target) return target; }
    }
  };
  
  window.addEventListener('touchend', function(e) {
    e = e.originalEvent || e;
    
    shelfButton = findOpenShelfButton(e.target);
    
    if (!shelfButton) return;
    
    var padding = 10,
        right = document.body.offsetWidth - shelfButton.offsetWidth - padding,
        childNodes, i, l;
    
    if (shelfButton.classList.contains('active')) {
      shelfButton.classList.remove('active');
      
      childNodes = document.body.childNodes;
      for (i=0, l=childNodes.length; i<l; i+=1) {
        if (childNodes[i].nodeType == Node.ELEMENT_NODE && !childNodes[i].classList.contains('shelf')) {
          childNodes[i].style['-webkit-transform'] = 'translateX(0)';
        }
      }
    } else {
      shelfButton.classList.add('active');
      
      childNodes = document.body.childNodes;
      for (i=0, l=childNodes.length; i<l; i+=1) {
        if (childNodes[i].nodeType == Node.ELEMENT_NODE && !childNodes[i].classList.contains('shelf')) {
          childNodes[i].style['-webkit-transition'] = '-webkit-transform 0.3s ease-in-out';
          childNodes[i].style['-webkit-transform'] = 'translateX(' + right + 'px)';
        }
      }
    }
  }, false);
  
}();