'use strict';

var assert = require('assert');
var wintermute = require('../lib');

describe('wintermute', function () {
  it('should have unit test!', function () {
    if (wintermute == null) {
      assert(false, 'oh shit');
    } else {
      assert(true, 'wavy gravy over here baby');
    }

  });
});
