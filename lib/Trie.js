import Node from './Node.js';

export default class Trie {
	constructor() {
		this.root = new Node('');
		this.count = 0;
	}

	insert(word) {
		this.count++;
		word = word.split('');

		let currentPosition = this.root.children;
		let currentParent = this.root;

		for (let i = 0; i < word.length; i++) {
			currentPosition[word[i]] = new Node(word[i]);
			currentPosition = currentPosition[word[i]].children;
			currentParent = currentParent.children[word[i]];
		}

		currentParent.wordEnd = true;
	}

	suggest() {

	}

	populate() {

	}

	count() {

	}

	select() {

	}
}