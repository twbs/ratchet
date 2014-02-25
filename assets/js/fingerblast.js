// FINGERBLAST.js
// --------------
// Adapted from phantom limb by brian cartensen

function FingerBlast(element) {
  this.element = typeof element == 'string' ? document.querySelector(element) : element;
  this.listen();
}

FingerBlast.prototype = {
  x: NaN,
  y: NaN,

  startDistance: NaN,
  startAngle:    NaN,

  mouseIsDown: false,

  listen: function () {

    var activate = this.activate.bind(this);
    var deactivate = this.deactivate.bind(this);

    function contains (element, ancestor) {
      var descendants, index, descendant;
      if ("compareDocumentPosition" in ancestor) {
        return !!(ancestor.compareDocumentPosition(element) & 16);
      } else if ("contains" in ancestor) {
        return ancestor != element && ancestor.contains(element);
      } else {
        for (descendants = ancestor.getElementsByTagName("*"), index = 0; descendant = descendants[index++];) {
          if (descendant == element) return true;
        }
        return false;
      }
    }

    this.element.addEventListener('mouseover', function (e) {
      var target = e.relatedTarget;
      if (target != this && !contains(target, this)) activate();
    });

    this.element.addEventListener("mouseout", function (e) {
      var target = e.relatedTarget;
      if (target != this && !contains(target, this)) deactivate(e);
    });
  },

  activate: function () {
    if (this.active) return;
    this.element.addEventListener('mousedown', (this.touchStart = this.touchStart.bind(this)), true);
    this.element.addEventListener('mousemove', (this.touchMove  = this.touchMove.bind(this)),  true);
    this.element.addEventListener('mouseup',   (this.touchEnd   = this.touchEnd.bind(this)),   true);
    this.element.addEventListener('click',     (this.click      = this.click.bind(this)),      true);
    this.active = true;
  },

  deactivate: function (e) {
    this.active = false;
    if (this.mouseIsDown) this.touchEnd(e);
    this.element.removeEventListener('mousedown', this.touchStart, true);
    this.element.removeEventListener('mousemove', this.touchMove,  true);
    this.element.removeEventListener('mouseup',   this.touchEnd,   true);
    this.element.removeEventListener('click',     this.click,      true);
  },

  click: function (e) {
    if (e.synthetic) return;
    e.preventDefault();
    e.stopPropagation();
  },

  touchStart: function (e) {
    if (e.synthetic || /input|textarea/.test(e.target.tagName.toLowerCase())) return;

    this.mouseIsDown = true;

    e.preventDefault();
    e.stopPropagation();

    this.fireTouchEvents('touchstart', e);
  },

  touchMove: function (e) {
    if (e.synthetic) return;

    e.preventDefault();
    e.stopPropagation();

    this.move(e.clientX, e.clientY);

    if (this.mouseIsDown) this.fireTouchEvents('touchmove', e);
  },

  touchEnd: function (e) {
    if (e.synthetic) return;

    this.mouseIsDown = false;

    e.preventDefault();
    e.stopPropagation();

    this.fireTouchEvents('touchend', e);

    if (!this.target) return;

    // Mobile Safari moves all the mouse events to fire after the touchend event.
    this.target.dispatchEvent(this.createMouseEvent('mouseover', e));
    this.target.dispatchEvent(this.createMouseEvent('mousemove', e));
    this.target.dispatchEvent(this.createMouseEvent('mousedown', e));
  },

  fireTouchEvents: function (eventName, originalEvent) {
    var events   = [];
    var gestures = [];

    if (!this.target) return;

    // Convert "ontouch*" properties and attributes to listeners.
    var onEventName = 'on' + eventName;

    if (onEventName in this.target) {
      console.warn('Converting `' + onEventName + '` property to event listener.', this.target);
      this.target.addEventListener(eventName, this.target[onEventName], false);
      delete this.target[onEventName];
    }

    if (this.target.hasAttribute(onEventName)) {
      console.warn('Converting `' + onEventName + '` attribute to event listener.', this.target);
      var handler = new GLOBAL.Function('event', this.target.getAttribute(onEventName));
      this.target.addEventListener(eventName, handler, false);
      this.target.removeAttribute(onEventName);
    }

    // Set up a new event with the coordinates of the finger.
    var touch = this.createMouseEvent(eventName, originalEvent);

    events.push(touch);

    // Figure out scale and rotation.
    if (events.length > 1) {
      var x = events[0].pageX - events[1].pageX;
      var y = events[0].pageY - events[1].pageY;

      var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      var angle = Math.atan2(x, y) * (180 / Math.PI);

      var gestureName = 'gesturechange';

      if (eventName === 'touchstart') {
        gestureName = 'gesturestart';
        this.startDistance = distance;
        this.startAngle = angle;
      }

      if (eventName === 'touchend') gestureName = 'gestureend';

      events.forEach(function(event) {
        var gesture = this.createMouseEvent.call(event._finger, gestureName, event);
        gestures.push(gesture);
      }.bind(this));

      events.concat(gestures).forEach(function(event) {
        event.scale = distance / this.startDistance;
        event.rotation = this.startAngle - angle;
      });
    }

    // Loop through the events array and fill in each touch array.
    events.forEach(function(touch) {
      touch.touches = events.filter(function(e) {
        return ~e.type.indexOf('touch') && e.type !== 'touchend';
      });

      touch.changedTouches = events.filter(function(e) {
        return ~e.type.indexOf('touch') && e._finger.target === touch._finger.target;
      });

      touch.targetTouches = touch.changedTouches.filter(function(e) {
        return ~e.type.indexOf('touch') && e.type !== 'touchend';
      });
    });

    // Then fire the events.
    events.concat(gestures).forEach(function(event, i) {
      event.identifier = i;
      event._finger.target.dispatchEvent(event);
    });
  },

  createMouseEvent: function (eventName, originalEvent) {
    var e = document.createEvent('MouseEvent');

    e.initMouseEvent(eventName, true, true,
      originalEvent.view, originalEvent.detail,
      this.x || originalEvent.screenX, this.y || originalEvent.screenY,
      this.x || originalEvent.clientX, this.y || originalEvent.clientY,
      originalEvent.ctrlKey, originalEvent.shiftKey,
      originalEvent.altKey, originalEvent.metaKey,
      originalEvent.button, this.target || originalEvent.relatedTarget
    );

    e.synthetic = true;
    e._finger   = this;

    return e;
  },

  move: function (x, y) {
    if (isNaN(x) || isNaN(y)) {
      this.target = null;
    } else {
      this.x = x;
      this.y = y;

      if (!this.mouseIsDown) {
        this.target = document.elementFromPoint(x, y);
      }
    }
  }
};