const assert = require('chai').assert;
const Node = require('../lib/Node.js');
const Trie = require('../lib/Trie.js');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

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
		it('Should be a method', () => {
			assert.isFunction(trie.insert);
		});

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

		it('Should set wordEnd property to true when no letters left', () => {
			trie.insert('p');
			assert.equal(trie.root.children.p.wordEnd, true);
		});

		it('Should change words to lowercase', () => {
			trie.insert('FUN');
			assert.deepEqual(trie.suggest('fu'), ['fun']);
		})

	});

	describe('Sugggest', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.suggest);
		});

		it('Should return an array', () => {
			trie.insert('pizza');
			assert.isArray(trie.suggest('piz'));
		});

		it('Should suggest words that have been inserted', () => {
			trie.insert('pizza');
			assert.deepEqual(trie.suggest('piz'), ['pizza']);
		});

		it('Should suggest multiple words that have been inserted', () => {
			trie.insert('pizza');
			trie.insert('pizzeria');
			assert.deepEqual(trie.suggest('piz'), ['pizza', 'pizzeria']);
		});

		it('Should not suggest words that do not partially match the inserted phrase', () => {
			trie.insert('pizza');
			trie.insert('apple');
			trie.insert('ape');
			assert.deepEqual(trie.suggest('ap'), ['apple', 'ape']);
		});

		it('Should suggest all inserted words on an empty string', () => {
			trie.insert('pizza');
			trie.insert('pie');
			trie.insert('apple');
			trie.insert('ape');
			assert.deepEqual(trie.suggest(''), ['pizza', 'pie', 'apple', 'ape']);
		});

		it('Should change pharses to lowercase to match inserted words', () => {
			trie.insert('bologna');
			assert.deepEqual(trie.suggest('BOLOG'), ['bologna']);
		});

	});

	describe('Populate', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.populate);
		});

		it('Should populate with 235886 words from dictionary', () => {
			trie.populate(dictionary);
			assert.equal(trie.count, 235886);
		});

		it('Should suggest words from the dictionary', () => {
			trie.populate(dictionary);
			assert.deepEqual(trie.suggest('piz'), [ 'pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ])
		})

		it('Should suggest populated words', () => {
			trie.populate(['ape', 'apple', 'ascot']);
			assert.equal(trie.count, 3);
			assert.deepEqual(trie.suggest('a'), ['ape', 'apple', 'ascot']);
		});



	});

	describe('Select', () => {
		it('Should be a method', () => {
			assert.isFunction(trie.select);
		});

	});

})