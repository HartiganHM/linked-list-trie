const assert = require('chai').assert;
const Node = require('../lib/Node.js');

let node;

describe('Node', () => {

	beforeEach( () => {
		node = new Node('p');
	});

	it('Should be a function', () => {
		assert.isFunction(Node);
	});

	it('Should have a letter when passed in', () => {
		assert.equal(node.letter, 'p');
	});

	it('Should start with an empty object in the children property', () => {
		assert.deepEqual(node.children, {});
	});

	it('Should start with a default value of false for the wordEnd property', () => {
		assert.equal(node.wordEnd, false);
	});
})