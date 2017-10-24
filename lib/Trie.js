const Node = require('./Node.js');

class Trie {
	constructor() {
		this.root = new Node('');
		this.num = 0;
	}

	insert(word) {
		word = word.split('');

		let currentNode = this.root;
		let currentChildren = this.root.children;

		word.forEach( letter => {
			if(!currentChildren[ letter ]) {
				currentChildren[ letter ] = new Node( letter );

			}
			currentNode = currentNode.children[ letter ];
			currentChildren = currentChildren[ letter ].children;

		})

		currentNode.wordEnd = true;
		this.num++;
	}

	suggest(phrase) {
		phrase = phrase.split('');

		let currentNode = this.root;

		phrase.forEach( letter => {
			currentNode = currentNode.children[letter];
			if (currentNode === null) {
				return null;
			}
		});

		return this.findSuggestions(currentNode, phrase.join(''));
	}

	findSuggestions(currentNode, phrase) {
		let childrenLetters = Object.keys(currentNode.children);
		let suggestions = [];

		childrenLetters.forEach( childLetter => {
			let letterNode = currentNode.children[childLetter];
			let newPhrase = phrase + childLetter;

			if(letterNode.children === {}) {
				suggestions.push(newPhrase)
			} else if( letterNode.wordEnd ) {
				suggestions.push(newPhrase);
				suggestions.push(...this.findSuggestions(letterNode,newPhrase));
			} else {
				suggestions.push(...this.findSuggestions(letterNode, newPhrase));
			}
		});
		return suggestions;
	}

	populate() {

	}

	count() {

	}

	select() {

	}
}

module.exports = Trie;