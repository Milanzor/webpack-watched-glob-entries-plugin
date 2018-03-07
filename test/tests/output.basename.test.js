const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Output', () => {
    it('must create the first output file without the full path', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/first.js')), true);
    });
    it('must create the second output file without the full path', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/second.js')), true);
    });
    it('must create the third output file without the full path', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/third.js')), true);
    });
});
