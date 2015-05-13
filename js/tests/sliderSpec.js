describe('Slider', function () {
  var slider = null;
  beforeEach(function () {
    var templateSlider = [
    '<div class="slider" id="mySlider">',
      '<div id="mySlider" class="slide-group">',
        '<div id="firstSlide" class="slide">',
          '<img src="http://goratchet.com/assets/img/slide-2.jpg">',
        '</div>',
        '<div class="slide">',
          '<img src="http://goratchet.com/assets/img/slide-3.jpg">',
        '</div>',
      '</div>',
    '</div>'
    ].join('');
    document.body.innerHTML += templateSlider;
    slider = document.getElementById('mySlider');
  });

  afterEach(function () {
    slider.parentNode.removeChild(slider);
    slider = null;
  });

  it('Slider should fire slide event', function (done) {
    slider.addEventListener('slide', function () {
      expect(true).toBe(true);
      done();
    });
    TouchFaker.fakeEvent('touchstart', '#firstSlide');
  });
});
