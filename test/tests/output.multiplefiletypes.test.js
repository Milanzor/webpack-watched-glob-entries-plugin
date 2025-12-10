const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Output', () => {
    it('must create the first output js file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/first.js')), true);
    });
	it('must create the first output css file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/first.css')), true);
    });
    it('must create the second output js file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/Second/second.js')), true);
    });
	it('must create the second output css file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/Second/second.css')), true);
    });
    it('must create the third output js file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/Third/Third/third.js')), true);
    });
	it('must not create the third output css file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/Third/Third/third.css')), false);
    });
});
