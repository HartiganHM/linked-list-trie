import { assert } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js';
import fs from 'fs';

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
		});

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

		it('Should add a selected word to trie.suggestions array', () => {
			trie.insert('pizza');
			trie.select('pizza');
			assert.deepEqual(trie.suggest('pi'), ['pizza']);
		});

		it('Should have new selected words start with a popularity value of 1', () => {
			trie.insert('pizza');
			trie.select('pizza');
			assert.equal(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 1);
		});

		it('Should have the selection value increase if a word is selected multiple times', () => {
			trie.insert('pizza');
			trie.select('pizza');
			assert.deepEqual(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 1);

			trie.select('pizza');
			assert.deepEqual(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 2);

			trie.select('pizza');
			assert.deepEqual(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 3);
		});

		it('Should be able to hold more than one word', () => {
			trie.insert('pizza');
			trie.select('pizza');
			assert.deepEqual(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 1);

			trie.insert('apple');
			trie.select('apple');
			assert.deepEqual(trie.root.children.a.children.p.children.p.children.l.children.e.popularity, 1);

			assert.deepEqual(trie.suggest(''), ['pizza', 'apple']);
		});

		it('Should move words selected more than once to the front of the suggestion array', () => {
			trie.insert('pie');
			trie.select('pie');
			assert.deepEqual(trie.root.children.p.children.i.children.e.popularity, 1);

			trie.insert('pizza');
			trie.select('pizza');
			assert.deepEqual(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 1);
			
			assert.deepEqual(trie.suggest('pi'), ['pie', 'pizza']);

			trie.select('pizza');
			assert.deepEqual(trie.root.children.p.children.i.children.z.children.z.children.a.popularity, 2);

			assert.deepEqual(trie.suggest('pi'), ['pizza', 'pie']);
		});

	});

})