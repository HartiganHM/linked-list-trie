const assert = require('chai').assert;
const Node = require('../lib/Node.js');
const Trie = require('../lib/Trie.js');

let node;
let trie;

describe('Trie', () => {

	beforeEach( () => {
		trie = new Trie();
		node = new Node('');
	});

	it('Should be a function', () => {
		assert.isFunction(Trie);
	});

	it('Should take a node as the root property', () => {
		assert.deepEqual(trie.root, node);
	});

	it('Should have a default starting count of 0', () => {
		assert.equal(trie.count, 0);
	});

	describe('Insert', () => {
		it('Should have an empty starting root', () => {
			trie.insert('pizza');
			assert.equal(trie.root.letter, '');
		});

		it('Should have count increase when a word is inserted', () => {
			assert.equal(trie.count, 0);
			trie.insert('pizza');
			assert.equal(trie.count, 1);
		});

		it('Should have count increase with mutiple words', () => {
			assert.equal(trie.count, 0);
			trie.insert('hog');
			assert.equal(trie.count, 1);
			trie.insert('branch');
			assert.equal(trie.count, 2);
			trie.insert('stupid');
			assert.equal(trie.count, 3);
		});

		it('Should have a child of p from the empty root', () => {
			trie.insert('p');
			console.log(Object.keys(trie.root.children));
			assert.equal(trie.root.children.letter, 'p');
		});

		it.skip('Should split a word into an array of letters', () => {
			assert.deepEqual(trie.insert('pizza'), )
		})
	})

})