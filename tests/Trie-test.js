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

	it('Should have a default starting num of 0', () => {
		assert.equal(trie.num, 0);
	});

	describe('Insert', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.insert);
		});

		it('Should have an empty starting root', () => {
			trie.insert('pizza');
			assert.equal(trie.root.letter, '');
		});

		it('Should have num increase when a word is inserted', () => {
			assert.equal(trie.num, 0);
			trie.insert('pizza');
			assert.equal(trie.num, 1);
		});

		it('Should have num increase with mutiple words', () => {
			assert.equal(trie.num, 0);
			trie.insert('hog');
			assert.equal(trie.num, 1);
			trie.insert('branch');
			assert.equal(trie.num, 2);
			trie.insert('stupid');
			assert.equal(trie.num, 3);
		});

		it('Should have a child of p from the empty root', () => {
			trie.insert('pizza');
			assert.equal(trie.root.children.p.letter, 'p');
		});

		it('Should have a child of i from the letter p', () => {
			trie.insert('pizza');
			assert.equal(trie.root.children.p.children.i.letter, 'i');
		});

		it('Should break words out into separate nodes by letter', () => {
			trie.insert('pizza');
			assert.equal(trie.root.children.p.letter, 'p');
			assert.equal(trie.root.children.p.children.i.letter, 'i');
			assert.equal(trie.root.children.p.children.i.children.z.letter, 'z');
			assert.equal(trie.root.children.p.children.i.children.z.children.z.letter, 'z');
			assert.equal(trie.root.children.p.children.i.children.z.children.z.children.a.letter, 'a');
		});
	});

	describe('Sugggest', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.suggest);
		});

	});

	describe('Populate', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.populate);
		});

	});

	describe('Count', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.count);
		});

	});

	describe('Select', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.select);
		});

	});

})