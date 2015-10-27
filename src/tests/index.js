var chai = require('chai');
var chaiBackbone = require("chai-backbone");
var expect = require('chai').expect;

chai.use(chaiBackbone);

var OptionsView = require('../views/options');

describe("OptionsView", function() {

  it('should be a function', function() {
    expect(OptionsView).to.be.a('function');
  });

  describe("Sample OptionsView", function() {
    var view = new OptionsView();
    it('should have a render() method', function() {
      expect(view.render).to.be.a('function');
    });
  });

});
