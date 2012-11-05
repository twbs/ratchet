$(function() {

  var doc;
  var iphone;
  var windowWidth;
  var windowHeight;
  var pageHeight;
  var contentPadding;
  var footerHeight;
  var noticeBanner;
  var componentsList;
  var navComponentLinks;
  var contentSection;
  var currentActive;
  var topCache;
  var eventListeners;

  prettyPrint();

  var initialize = function  () {
    currentActive        = 0;
    topCache             = [];
    win                  = $(window);
    doc                  = $(document);
    bod                  = $(document.body)
    iphone               = iphone || $('.iphone');
    noticeBanner         = $('.notice-banner');
    navComponentLinks    = $('.nav-components-link');
    componentsList       = $('.components-list');
    componentLinks       = $('.component-example a');
    contentSection       = $('.component');
    topCache             = contentSection.map(function () { return $(this).offset().top })
    windowHeight         = $(window).height() / 3
    pageHeight           = $(document).height();
    contentPadding       = parseInt($('.docs-content').css('padding-bottom'));
    footerHeight         = $('.docs-footer').outerHeight(false);

    iphone.initialLeft   = iphone.offset().left;
    iphone.initialTop    = iphone.initialTop || iphone.offset().top;
    iphone.dockingOffset = ($(window).height() + 20 + $('.docs-masthead').height() - iphone.height())/2;
    checkDesktopContent();
    calculateScroll();

    if (!eventListeners) addEventListeners();
  }

  var addEventListeners = function () {
    eventListeners = true;

    noticeBanner.on('click', function () {
      $(this).hide();
    });

    iphone.on('click', function (e) {
      e.preventDefault();
    });

    navComponentLinks.click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      componentsList.toggleClass('active');
    })

    doc.on('click', function () {
      componentsList.removeClass('active');
    })

    win.on('scroll', calculateScroll);
  }

  var checkDesktopContent = function () {
    windowWidth = $(window).width();
    if (windowWidth <= 768) {
      var content = $('.content')
      if (content.length > 1) {
        $(content[0]).remove()
      }
    }
  }

  var calculateScroll = function() {
    // if small screen don't worry about this
    if (windowWidth <= 768) return

    // Save scrollTop value
    var contentSectionItem;
    var currentTop = win.scrollTop();

    // If page is scrolled to bottom near footers
    if(pageHeight - currentTop < footerHeight + contentPadding + 1400) {
      iphone[0].className = "iphone iphone-bottom";
      iphone[0].setAttribute('style','')
    } else if((iphone.initialTop - currentTop) <= iphone.dockingOffset) {
      iphone[0].className = "iphone iphone-fixed";
      iphone.css({top: iphone.dockingOffset})
    } else {
      iphone[0].className = "iphone"
      iphone[0].setAttribute('style','')
    }

    // Injection of components into phone
    for (var l = contentSection.length; l--;) {
      if ((topCache[l] - currentTop) < windowHeight) {
        if (currentActive == l) return;
        currentActive = l;
        bod.find('.component.active').removeClass('active');
        contentSectionItem = $(contentSection[l])
        contentSectionItem.addClass('active')
        if(contentSectionItem.attr('id')) {
          iphone.attr("id", contentSectionItem.attr('id') + "InPhone");
        } else {
          iphone.attr("id", "")
        }
        if (!contentSectionItem.hasClass('informational')) {
          updateContent(contentSectionItem.find('.prettyprint').not('.js').text())
        }
        break
      }
    }

    function updateContent(content) {
      $('#iwindow').html(content);
    }
  }

  $(window).on('load resize', initialize);
  $(window).on('load', function () { new FingerBlast('.iphone-content'); });
});