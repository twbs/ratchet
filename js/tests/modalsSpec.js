describe('Modals', function () {
  beforeEach(function () {
    var templateModal = [
        '<a id="linkOpenModal" href="#myModal" class="btn">Open modal</a>',
        '<div id="myModal" class="modal">',
          '<header class="bar bar-nav">',
            '<a id="linkCloseModal" class="icon icon-close pull-right" href="#myModal"></a>',
            '<h1 class="title">Modal</h1>',
          '</header>',
          '<div class="content">',
            '<p class="content-padded">The contents of my modal go here.</p>',
          '</div>',
        '</div>'
    ].join('');
    document.body.innerHTML += templateModal;
  });

  afterEach(function () {
    var linkModal = document.getElementById('linkOpenModal');
    var modal = document.getElementById('myModal');
    linkModal.parentNode.removeChild(linkModal);
    modal.parentNode.removeChild(modal);
  });

  it('Modal should fire modalOpen event', function (done) {
    window.addEventListener('modalOpen', function () {
      expect(true).toBe(true);
      done();
    });
    var link = document.getElementById('linkOpenModal');
    var eventTouchEnd = new CustomEvent('touchend', {
      bubbles: true,
      cancelable: true
    });
    link.dispatchEvent(eventTouchEnd);
  });

  it('Modal should fire modalClose event', function (done) {
    var link = document.getElementById('linkOpenModal');
    var eventTouchEnd = new CustomEvent('touchend', {
      bubbles: true,
      cancelable: true
    });
    window.addEventListener('modalClose', function () {
      expect(true).toBe(true);
      done();
    });
    link.dispatchEvent(eventTouchEnd);
    var closeLink = document.getElementById('linkCloseModal');
    closeLink.dispatchEvent(eventTouchEnd);
  });
});
