var should    = require('should');
var whichWin  = require('../index.js');

describe('which-win', function () {

  it('should describe win2012', function (done) {
    this.timeout(5000)
    whichWin(function (err, info) {
      info.name.should.match(/Server 2012/)
      info.version.should.match(/^6[.]/)
      done();
    })
  })

})
