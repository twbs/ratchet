/* ----------------------------------
 * PullToRefresh v0.004
 * By Simon Waldherr
 * https://github.com/SimonWaldherr/PullToRefresh
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

var ptr_scrollable_parent = false;

function ptr_init() {
  document.getElementsByTagName('body')[0].className = !!('ontouchstart' in window) ? 
  document.getElementsByTagName('body')[0].className+=' touch' : 
  document.getElementsByTagName('body')[0].className+=' desktop';
  var scrollables = document.getElementsByClassName('scrollable');

  for(var i = 0; i<scrollables.length; i++) {
    if(scrollables[i].hasAttribute('data-url') != false) {
      var ptr_box   = document.createElement('div'),
      ptr_container = document.createElement('div'),
      ptr_image     = document.createElement('div'),
      ptr_text      = document.createElement('div');

      ptr_box.appendChild(ptr_container);
      ptr_container.appendChild(ptr_image);
      ptr_container.appendChild(ptr_text);
      ptr_text.innerHTML = 'Pull to refresh';

      ptr_box.className       = 'ptr_box';
      ptr_container.className = 'ptr_container';
      ptr_image.className     = 'ptr_image';
      ptr_text.className      = 'ptr_text';

      scrollables[i].firstElementChild.insertBefore(ptr_box, scrollables[i].firstElementChild.firstChild);
    }
  }

  document.addEventListener('touchstart',function(e) {
    var parent  = e.target;

    if(typeof parent.className === null) {
      return false;
    }

    for(var i = 0; i < 10; i++) {
      if(typeof parent.className !== 'undefined') {

        if(parent.className.match('scrollable')) {

          ptr_scrollable_parent = i;
          i = 10;

          if(parent.hasAttribute('data-url') != false) {
            if(typeof parent.getElementsByClassName('ptr_box')[0] != 'undefined') {

            } else {
              var ptr_box   = document.createElement('div'),
              ptr_container = document.createElement('div'),
              ptr_image     = document.createElement('div'),
              ptr_text      = document.createElement('div');

              ptr_box.appendChild(ptr_container);
              ptr_container.appendChild(ptr_image);
              ptr_container.appendChild(ptr_text);
              ptr_text.innerHTML = 'Pull to refresh';

              ptr_box.className       = 'ptr_box';
              ptr_container.className = 'ptr_container';
              ptr_image.className     = 'ptr_image';
              ptr_text.className      = 'ptr_text';

              parent.firstElementChild.insertBefore(ptr_box, parent.firstElementChild.firstChild);
            }
          } else if(typeof parent.getElementsByClassName('ptr_box')[0] != 'undefined') {
            parent.removeChild(parent.getElementsByClassName('ptr_box')[0]);
          }

          if(parent.scrollTop === 0) {
            parent.scrollTop = 1;
          } else if((parent.scrollTop+parent.offsetHeight) === parent.scrollHeight) {
            parent.scrollTop = parent.scrollTop-1;
          }
        } else {

        }
      }

      if((typeof parent.parentNode.tagName === 'undefined')) {
        i = 10;
        return false;
      } else if((parent.parentNode.tagName == 'BODY')||(parent.parentNode.tagName == 'HTML')) {
        i = 10;
        return false;
      } else {
        parent = parent.parentNode;
      }
    }
  });

  document.addEventListener('touchmove',function(e) {
    var parent = e.target;
    var scroll = false;
    var rotate = 90;

    if(ptr_scrollable_parent == false) {
      e.preventDefault();
      return false;
    }

    for(var i = 0; i < ptr_scrollable_parent; i++) {
      parent = parent.parentNode;
    }

    if((ptr_scrollable_parent != false)&&(parent.hasAttribute('data-url') != false)) {

      scroll = true;

      var ptr_element = parent;
      var ptr_wrapelement = ptr_element.getElementsByClassName('wrap')[0];

      var top = ptr_element.scrollTop;
      var ptr = ptr_element.getElementsByClassName('ptr_box')[0];

      var scrolldistance = Math.abs(parseInt(ptr_element.scrollTop));

      if((ptr_wrapelement.className.indexOf(' active') === -1)&&(!ptr_wrapelement.getElementsByClassName('ptr_image')[0].className.match('loading'))) {
        if(ptr_element.scrollTop < -25) {
          rotate = (top < -40) ? -90 : 130 + (top*12+270);
        }

        if(ptr_element.scrollTop < 0) {
          ptr.style.height = (scrolldistance < 55) ? scrolldistance+'px' : '55px';
          ptr.style.top = (scrolldistance < 55) ? '-'+scrolldistance+'px' : '-55px';

          ptr_wrapelement.getElementsByClassName('ptr_image')[0].style['-webkit-transform'] = "scale(1) rotate("+rotate+"deg)";
        }

        if(ptr_element.scrollTop < -51) {
          if(ptr_wrapelement.className.indexOf(' active') === -1) {
            ptr_wrapelement.className += ' active';
            ptr_wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = 'Loading ...';
            ptr_wrapelement.getElementsByClassName('ptr_image')[0].className += ' loading';

            if(parent.getAttribute('data-url') == 'reload') {
              window.location.reload(true);
              return false;
            }

            var ptr_element = parent;
            var ptr_wrapelement = ptr_element.getElementsByClassName('wrap')[0];
            var ptr_eleId = parent.id;
            var time = new Date();

            reqwest({
                url: parent.getAttribute('data-url')+'?rt='+time.getTime()
              , type: 'html'
              , method: 'post'
              , data: { usertime: time.getTime() }
              , error: function () { 
                alert('Could not connect'); 
                ptr_wrapelement.style.top = '0px';
                ptr.getElementsByClassName('ptr_image')[0].className = ptr.getElementsByClassName('ptr_image')[0].className.replace(' loading', '');
                ptr_wrapelement.className = ptr_wrapelement.className.replace(' active', '');
                hideLoading(ptr_eleId);
              }
              , success: function (resp) {
                  var ptrbox = document.getElementById(ptr_eleId).getElementsByClassName('ptr_box')[0];
                  var insert = document.createElement('div');
                  insert.innerHTML = resp;
                  insert.className = 'inserted';

                  ptr_wrapelement.insertBefore(insert, ptrbox.nextSibling);
                  ptr_wrapelement.style.top = '0px';
                  ptr.getElementsByClassName('ptr_image')[0].className = ptr.getElementsByClassName('ptr_image')[0].className.replace(' loading', '');
                  ptr_wrapelement.className = ptr_wrapelement.className.replace(' active', '');
                  var inserted = document.getElementsByClassName('inserted')[0];
                  ptr_element.scrollTop = inserted.clientHeight-51;
                  ptr_wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = '';
                  ptr.style.opacity = 0.0;

                  ptr_wrapelement.getElementsByClassName('ptr_image')[0].className = ptr_wrapelement.getElementsByClassName('ptr_image')[0].className.replace(' loading', '');
                  ptr_wrapelement.style.top = '0px';

                  ptr_scrollable_parent = false;
                }
            })
          }
        } else if(ptr_element.scrollTop != 0) {
          ptr_wrapelement.className = ptr_wrapelement.className.replace(' active', '');
          ptr_wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = 'Pull to refresh';
        }
      }
    } else if((ptr_scrollable_parent != false)) {
      scroll = true;
    }

    if(scroll == false) {
      e.preventDefault();
    }
  });

  document.addEventListener('touchend',function(e) {
    var parent  = e.target;
    var scroll  = false;

    for(var i = 0; i < ptr_scrollable_parent; i++) {
      parent = parent.parentNode;
    }

    if((parent.hasAttribute('data-url') != false)&&(ptr_scrollable_parent != false)) {
      if((parent.hasAttribute('data-url') != false)) {

        var ptr_element = parent;
        var ptr_wrapelement = ptr_element.getElementsByClassName('wrap')[0];
        var ptr_eleId = parent.id;

        var top = ptr_element.scrollTop;
        var ptr = ptr_element.getElementsByClassName('ptr_box')[0];

        if(ptr_wrapelement.getElementsByClassName('ptr_image')[0].className.match('loading')) {
          ptr_wrapelement.className = ptr_wrapelement.className.replace(' active', '');
          ptr_wrapelement.style.top = '51px';
        } else {
          ptr.style.height = '0px';
          ptr.style.top = '0px';
        }
      }
    }

    ptr_scrollable_parent = false;
  });
}
window.onload = function() {
  ptr_init();
}
