describe('Common', function () {
  it('RATCHET namespace is defined', function () {
    expect(typeof RATCHET !== 'undefined').toBe(true);
  });

  it('window.CustomEvent exists', function () {
    expect(typeof window.CustomEvent !== 'undefined').toBe(true);
  });

  it('RATCHET.getBrowserCapabilities returns an object', function () {
    var result = RATCHET.getBrowserCapabilities;
    expect(typeof result === 'object').toBe(true);
  });

  it('RATCHET.getTransitionEnd returns string', function () {
    var result = RATCHET.getTransitionEnd;
    expect(typeof result === 'string').toBe(true);
    expect(result.length > 0).toBe(true);
  });
});
