$(function() {
  'use strict';

  var doc;
  var device;
  var platformToggle;
  var windowWidth;
  var windowHeight;
  var pageHeight;
  var contentPadding;
  var footerHeight;
  var navComponentLinks;
  var componentsList;
  var contentSection;
  var currentActive;
  var topCache;
  var eventListeners;
  var toolbarToggle;
  var toggleTop;
  var toggleHeight;


  var initialize = function () {
    currentActive        = 0;
    topCache             = [];
    win                  = $(window);
    doc                  = $(document);
    bod                  = $(document.body)
    device               = device || $('.js-device');
    navComponentLinks    = $('.js-jump-menu');
    componentsList       = $('.js-component-group');
    componentLinks       = $('.component-example a');
    contentSection       = $('.component');
    topCache             = contentSection.map(function () { return $(this).offset().top })
    windowHeight         = $(window).height() / 3
    windowWidth          = $(window).width();
    pageHeight           = $(document).height();
    contentPadding       = parseInt($('.docs-content').css('padding-bottom'));
    footerHeight         = $('.docs-footer').outerHeight(false);
    toolbarToggle       = $('.js-docs-component-toolbar');

    // Device placement
    if (windowWidth >= 768) {
      device.initialLeft   = device.offset().left;
      device.initialTop    = device.initialTop || device.offset().top;
      device.dockingOffset = ($(window).height() - device.height())/2; 
    }

    checkDesktopContent();
    calculateScroll();
    calculateToggle();

    if (!eventListeners) addEventListeners();
  }

  var addEventListeners = function () {
    eventListeners = true;

    device.on('click', function (e) {
      e.preventDefault();
    });

    // Mobile navigation
    $('.js-docs-nav-trigger').on('click', function () {
      var nav     = $('.docs-nav-group');
      var trigger = $('.js-docs-nav-trigger');

      trigger.toggleClass('active');
      nav.toggleClass('active'); 
    });

    navComponentLinks.click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      componentsList.toggleClass('active');
    })

    doc.on('click', function () {
      componentsList.removeClass('active');
    })

    // Platform switcher
    $('.platform-switch').on('click', function () {
      var components = $('.docs-components');
      var platform   = $(this).attr('data-platform');

      // Set platform
      if (components.hasClass('platform-ios')) {
        components.removeClass('platform-ios');
        components.addClass(platform);
      } else if (components.hasClass('platform-android')) {
        components.removeClass('platform-android');
        components.addClass(platform);
      } else {
        components.addClass(platform);
      }

      // Deal with active states
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
    });

    win.on('scroll', calculateScroll);
    win.on('scroll', calculateToggle);
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

    if((device.initialTop - currentTop) <= device.dockingOffset) {
      device[0].className = "device device-fixed";
      device.css({top: device.dockingOffset})
    } else {
      device[0].className = "device"
      device[0].setAttribute('style','')
    }

    // Injection of components into device
    for (var l = contentSection.length; l--;) {
      if ((topCache[l] - currentTop) < windowHeight) {
        if (currentActive == l) return;
        currentActive = l;
        bod.find('.component.active').removeClass('active');
        contentSectionItem = $(contentSection[l])
        contentSectionItem.addClass('active')
        if(contentSectionItem.attr('id')) {
          device.attr("id", contentSectionItem.attr('id') + "InDevice");
        } else {
          device.attr("id", "")
        }
        if (!contentSectionItem.hasClass('informational')) {
          updateContent(contentSectionItem.find('.highlight .html').text())
        }
        break
      }
    }

    function updateContent(content) {
      $('#iwindow').html(content);
    }
  }

  // Toolbar toggle
  var calculateToggle = function () {
    var currentTop   = win.scrollTop();
    var headerHeight = $('.docs-sub-header').outerHeight();

    if(currentTop >= headerHeight) {
      toolbarToggle.addClass('visible');
    } else if (currentTop <= headerHeight) {
      toolbarToggle.removeClass('visible');
      componentsList.removeClass('active');
    }
  }

  $(window).on('load resize', initialize);
  $(window).on('load', function () { new FingerBlast('.device-content'); });
});
