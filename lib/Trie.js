const Node = require('./Node.js');

class Trie {
	constructor() {
		this.root = new Node('');
		this.count = 0;
	}

	insert(word) {
		word = word.split('');

		let currentNode = this.root;
		let currentChildren = this.root.children;

		word.forEach( (letter) => {
			if(!currentChildren[ letter ]) {
				currentChildren[ letter ] = new Node('');

			}
			currentNode = currentNode.children[ letter ];
			currentChildren = currentChildren[ letter ].children;

		})

		currentNode.wordEnd = true;
		this.count++;
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

module.exports = Trie;