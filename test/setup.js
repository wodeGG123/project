var assert = require('assert');
import dom from '../src/utils/dom'
import chai from 'chai'
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let expect = chai.expect;

describe('Array', function() {
  describe('测试获取当前dom对象的所有父节点', function() {
    it('p的所有父节点应该有2个', function() {
      const $document = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
      let parents = dom.getParents($document.window.document.querySelector("p"))
      expect(parents.length).to.be.equal(2)
    });
    it('p的所有父节点应该有3个', function() {
      const $document = new JSDOM(`<!DOCTYPE html><div><p>Hello world</p><span>1</span></div>`);
      let parents = dom.getParents($document.window.document.querySelector("p"))
      expect(parents.length).to.be.equal(3)
    });
    it('html没有父节点', function() {
      const $document = new JSDOM(`<!DOCTYPE html><div><p>Hello world</p><span>1</span></div>`);
      let parents = dom.getParents($document.window.document.querySelector("html"))
      expect(parents.length).to.be.equal(0)
    });
  });
});