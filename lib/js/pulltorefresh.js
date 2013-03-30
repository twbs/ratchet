/* ----------------------------------
 * PullToRefresh v0.008
 * By Simon Waldherr
 * https://github.com/SimonWaldherr/PullToRefresh
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

var ptr = [];
var ptr_init = function () {
  "use strict";
  var i = 0;
  ptr.scrollable_parent = false;
  ptr.scrollables = document.getElementsByClassName('ptr_scrollable');
  if ((window.hasOwnProperty('ontouchstart')) || (window.navigator.msPointerEnabled)) {
    document.getElementsByTagName('body')[0].className += ' touch';
  } else {
    document.getElementsByTagName('body')[0].className += ' notouch';
  }

  for (i = 0; i < ptr.scrollables.length; i += 1) {
    if (ptr.scrollables[i].hasAttribute('data-url') !== false) {
      ptr.box = document.createElement('div');
      ptr.container = document.createElement('div');
      ptr.image = document.createElement('div');
      ptr.text = document.createElement('div');

      ptr.box.appendChild(ptr.container);
      ptr.container.appendChild(ptr.image);
      ptr.container.appendChild(ptr.text);
      ptr.text.innerHTML = 'Pull to refresh';

      ptr.box.className = 'ptr_box';
      ptr.box.style.right = '99%';
      ptr.container.className = 'ptr_container';
      ptr.image.className = 'ptr_image';
      ptr.text.className = 'ptr_text';

      ptr.scrollables[i].firstElementChild.insertBefore(ptr.box, ptr.scrollables[i].firstElementChild.firstChild);
    }
  }

  document.addEventListener('touchstart', function (e) {
    var parent = e.target,
      i = 0;

    if (parent.className === undefined) {
      return false;
    }

    for (i = 0; i < 10; i += 1) {
      if (parent.className !== undefined) {

        if (parent.className.match('ptr_scrollable')) {

          ptr.scrollable_parent = i;
          i = 10;

          if (parent.hasAttribute('data-url') !== false) {
            if (parent.getElementsByClassName('ptr_box')[0] === undefined) {
              ptr.box = document.createElement('div');
              ptr.container = document.createElement('div');
              ptr.image = document.createElement('div');
              ptr.text = document.createElement('div');

              ptr.box.appendChild(ptr.container);
              ptr.container.appendChild(ptr.image);
              ptr.container.appendChild(ptr.text);
              ptr.text.innerHTML = 'Pull to refresh';

              ptr.box.className = 'ptr_box';
              ptr.box.style.right = '0px';
              ptr.container.className = 'ptr_container';
              ptr.image.className = 'ptr_image';
              ptr.text.className = 'ptr_text';

              parent.firstElementChild.insertBefore(ptr.box, parent.firstElementChild.firstChild);
            } else {
              parent.getElementsByClassName('ptr_box')[0].style.opacity = 1.0;
              parent.getElementsByClassName('ptr_text')[0].innerHTML = 'Pull to refresh';
            }
          } else if (parent.getElementsByClassName('ptr_box')[0] !== undefined) {
            parent.removeChild(parent.getElementsByClassName('ptr_box')[0]);
          }

          if (parent.scrollTop === 0) {
            parent.scrollTop = 1;
            parent.getElementsByClassName('ptr_wrap')[0].style.top = '1px';
          } else if ((parent.scrollTop + parent.offsetHeight) === parent.scrollHeight) {
            parent.scrollTop = parent.scrollTop - 1;
          }
        }
      }

      if ((parent.parentNode.tagName === undefined)) {
        i = 10;
        return false;
      }
      if ((parent.parentNode.tagName === 'BODY') || (parent.parentNode.tagName === 'HTML')) {
        i = 10;
        return false;
      }

      parent = parent.parentNode;
    }
  });

  document.addEventListener('touchmove', function (e) {
    var parent = e.target,
      scroll = false,
      rotate = 90,
      i = 0,
      top, scrolldistance, time, insert, inserted, ajax, ajaxTimeout, requrl;

    if (ptr.scrollable_parent === false) {
      e.preventDefault();
      return false;
    }

    for (i = 0; i < ptr.scrollable_parent; i += 1) {
      parent = parent.parentNode;
    }

    if ((ptr.scrollable_parent !== false) && (parent.hasAttribute('data-url') !== false)) {

      scroll = true;

      ptr.element = parent;
      ptr.wrapelement = ptr.element.getElementsByClassName('ptr_wrap')[0];
      top = ptr.element.scrollTop;
      ptr.box = ptr.element.getElementsByClassName('ptr_box')[0];
      scrolldistance = Math.abs(ptr.element.scrollTop);

      if ((ptr.wrapelement.className.indexOf(' active') === -1) && (!ptr.wrapelement.getElementsByClassName('ptr_image')[0].className.match('ptr_loading')) && (ptr.element.scrollTop < 1)) {
        if (ptr.element.scrollTop < -25) {
          rotate = (top < -40) ? -90 : 130 + parseInt(top * 12 + 270, 10);
        }

        if (ptr.element.scrollTop < 0) {
          ptr.box.style.right = '0px';
          ptr.wrapelement.getElementsByClassName('ptr_image')[0].style['-webkit-transform'] = 'scale(1) rotate(' + rotate + 'deg)';
        }

        if (ptr.element.scrollTop < -51) {
          if (ptr.wrapelement.className.indexOf(' ptr_active') === -1) {
            ptr.box.style.right = '0px';
            ptr.wrapelement.className += ' ptr_active';
            ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = 'Loading ...';
            ptr.wrapelement.getElementsByClassName('ptr_image')[0].className += ' ptr_loading';

            if (parent.getAttribute('data-url') === 'reload') {
              window.location.reload(true);
              return false;
            }

            ptr.element = parent;
            ptr.wrapelement = ptr.element.getElementsByClassName('ptr_wrap')[0];
            ptr.eleId = parent.id;
            time = new Date();

            ajax = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : (XMLHttpRequest && new XMLHttpRequest()) || null;
            ajaxTimeout = window.setTimeout(function () {
              ajax.abort();
              console.log("AJAX Timeout Error");
            }, 6000);
            ajax.onreadystatechange = function () {

              if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                  clearTimeout(ajaxTimeout);
                  //console.log("AJAX-Status: " + ajax.status + " " + ajax.statusText + " at " + time.getTime());
                  if (ajax.status !== 200) {
                    console.log("AJAX Response Error");
                    alert('Could not connect');
                    ptr.wrapelement.style.top = '0px';
                    ptr.box.getElementsByClassName('ptr_image')[0].className = ptr.getElementsByClassName('ptr_image')[0].className.replace(' loading', '');
                    ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
                  } else {
                    ptr.box = document.getElementById(ptr.eleId).getElementsByClassName('ptr_box')[0];
                    insert = document.createElement('div');
                    insert.innerHTML = ajax.responseText;
                    insert.className = 'ptr_inserted';

                    ptr.wrapelement.insertBefore(insert, ptr.box.nextSibling);
                    ptr.wrapelement.style.top = '0px';
                    ptr.box.getElementsByClassName('ptr_image')[0].className = ptr.box.getElementsByClassName('ptr_image')[0].className.replace(' ptr_loading', '');
                    ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
                    inserted = document.getElementsByClassName('ptr_inserted')[0];
                    ptr.element.scrollTop = inserted.clientHeight - 51;
                    ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = '';
                    ptr.box.style.right = '99%';

                    ptr.wrapelement.getElementsByClassName('ptr_image')[0].className = ptr.wrapelement.getElementsByClassName('ptr_image')[0].className.replace(' ptr_loading', '');

                    ptr.scrollable_parent = false;
                  }
                }
              }
            };
            requrl = parent.getAttribute('data-url') + '?rt=' + time.getTime();
            ajax.open("POST", requrl, true);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax.send();
          }
        } else if (ptr.element.scrollTop !== 0) {
          if (ptr.wrapelement.className.indexOf(' active') !== -1) {
            ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
            ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = 'Pull to refresh';
          }
        }
      }
    } else if ((ptr.scrollable_parent !== false)) {
      scroll = true;
    }

    if (scroll === false) {
      e.preventDefault();
    }
  });

  document.addEventListener('touchend', function (e) {
    var parent = e.target,
      i = 0,
      top;

    for (i = 0; i < ptr.scrollable_parent; i += 1) {
      parent = parent.parentNode;
    }

    if ((parent.hasAttribute('data-url') !== false) && (ptr.scrollable_parent !== false)) {
      if ((parent.hasAttribute('data-url') !== false)) {
        ptr.element = parent;
        ptr.wrapelement = ptr.element.getElementsByClassName('ptr_wrap')[0];
        ptr.eleId = parent.id;
        top = ptr.element.scrollTop;
        ptr.box = ptr.element.getElementsByClassName('ptr_box')[0];

        if (ptr.wrapelement.getElementsByClassName('ptr_image')[0].className.match('ptr_loading')) {
          ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
          ptr.wrapelement.style.top = '51px';
        } else {
          ptr.box.style.right = '99%';
        }
      }
    }

    ptr.scrollable_parent = false;
  });
};

window.onload = function() {
  ptr_init();
}
