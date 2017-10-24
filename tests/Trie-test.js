const assert = require('chai').assert;
const Node = require('../lib/Node.js');
const Trie = require('../lib/Trie.js');

let node;
let trie;

describe('Trie', () => {

	beforeEach( () => {
		trie = new Trie('');
	});

	it('Should be a function', () => {
		assert.isFunction(Trie);
	});



})