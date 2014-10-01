!(function () {
  'use strict';

  // Ratchet's layout includes fixed position headers & footers that should always
  // appear before the main .content div within <body>
  //
  // These fixed bars will have new content swapped in, ignoring any
  // transitions (slide-in, slide-out & fade).
  //
  // These following selectors define which elements are transitioned with
  // simple DOM replacement and are always immediate children of <body>
  var barSelectors = [
    '.bar-tab',
    '.bar-nav',
    '.bar-footer',
    '.bar-header-secondary'
  ];

  // Other than any fixed bars, '.content' should be the only other child of body
  var contentSelector = '.content';

  // For any bar elements in `newMarkup`, either:
  //   * replace an existing bar elements with new content
  //   * add new bar elements when an existing one isn't present
  //   * remove any bar elements not found in `newMarkup`
  var updateBars = function (newMarkup) {
    for (var i=0; i < barSelectors.length; i++ ) {
      var selector = barSelectors[i];
      var newBar = newMarkup.querySelector(selector);
      var existingBar = document.querySelector(selector);

      if (newBar) {
        displayBar(newBar, existingBar);
      } else if (existingBar) {
        existingBar.parentNode.removeChild(existingBar);
      }
    }
  };

  var displayBar = function (bar, container) {
    if (container) {
      container.innerHTML = bar.innerHTML;
    } else {
      // per Ratchet's CSS, bar elements must be the first thing in <body>
      // here we assume `.content` is an immediate child of <body>
      document.body.insertBefore(bar, document.querySelector(contentSelector));
    }
  };

  var transitionContent = function (swap, container, transition, complete) {
    var enter;
    var containerDirection;
    var swapDirection;

    enter  = /in$/.test(transition);

    if (transition === 'fade') {
      container.classList.add('in');
      container.classList.add('fade');
      swap.classList.add('fade');
    }

    if (/slide/.test(transition)) {
      swap.classList.add('sliding-in', enter ? 'right' : 'left');
      swap.classList.add('sliding');
      container.classList.add('sliding');
    }

    container.parentNode.insertBefore(swap, container);
    complete && complete();

    if (transition === 'fade') {
      container.offsetWidth; // force reflow
      container.classList.remove('in');
      var fadeContainerEnd = function () {
        container.removeEventListener(window.RATCHET.getTransitionEnd, fadeContainerEnd);
        swap.classList.add('in');
        swap.addEventListener(window.RATCHET.getTransitionEnd, fadeSwapEnd);
      };
      var fadeSwapEnd = function () {
        swap.removeEventListener(window.RATCHET.getTransitionEnd, fadeSwapEnd);
        container.parentNode.removeChild(container);
        swap.classList.remove('fade');
        swap.classList.remove('in');
        complete && complete();
      };
      container.addEventListener(window.RATCHET.getTransitionEnd, fadeContainerEnd);
    }

    if (/slide/.test(transition)) {
      var slideEnd = function () {
        swap.removeEventListener(window.RATCHET.getTransitionEnd, slideEnd);
        swap.classList.remove('sliding', 'sliding-in');
        swap.classList.remove(swapDirection);
        container.parentNode.removeChild(container);
        complete && complete();
      };

      container.offsetWidth; // force reflow
      swapDirection      = enter ? 'right' : 'left';
      containerDirection = enter ? 'left' : 'right';
      container.classList.add(containerDirection);
      swap.classList.remove(swapDirection);
      swap.addEventListener('webkitTransitionEnd', slideEnd);
    }
  };

  // `contents` must include an element with the class 'content' and can
  // optionally include a number of Ratchet bar elements (see `barSelectors`)
  var TRANSITION = function (contents, transition, complete) {
    if (transition) {
      updateBars(contents);

      var existingContentDiv = document.querySelector(contentSelector);
      var newContentDiv      = contents.querySelector(contentSelector);
      transitionContent(newContentDiv, existingContentDiv,
                        transition, complete);
    } else {
      document.body.innerHTML = contents.innerHTML;
      complete && complete();
    }
  };

  window.TRANSITION = TRANSITION;
}());
