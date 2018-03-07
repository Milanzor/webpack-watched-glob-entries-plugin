const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Output', () => {
    it('must create the first output file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/first.js')), true);
    });
    it('must create the second output file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/Second/second.js')), true);
    });
    it('must create the third output file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/Third/Third/third.js')), true);
    });
});
