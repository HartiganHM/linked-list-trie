const Node = require('./Node.js');

class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
    this.selections = [];
  }

  insert(word) {
    word = word.toLowerCase().split('');

    let currentNode = this.root;
    let currentChildren = this.root.children;

    word.forEach( letter => {
      if (!currentChildren[ letter ]) {
        currentChildren[ letter ] = new Node( letter );

      }
      currentNode = currentNode.children[ letter ];
      currentChildren = currentChildren[ letter ].children;

    });

    currentNode.wordEnd = true;
    this.count++;
  }

  suggest(phrase) {
    phrase = phrase.toLowerCase().split('');

    let currentNode = this.root;

    phrase.forEach( letter => {
      currentNode = currentNode.children[letter];
    });

    return this.findSuggestions(currentNode, phrase.join(''));
  }

  findSuggestions(currentNode, phrase) {
    let childrenLetters = Object.keys(currentNode.children);

    childrenLetters.forEach( childLetter => {
    	let letterNode = currentNode.children[childLetter];
    	let newPhrase = phrase + childLetter;

    	if (letterNode.wordEnd) {
    		this.suggestions.push({word: newPhrase, popCount: letterNode.popularity});
  		}
  		return this.findSuggestions(letterNode, newPhrase);
    })

    this.suggestions.sort( (a,b) => {
    	return b.popCount - a.popCount;
    })

    return this.suggestions.map( newWord => {
    	return newWord.word;
    })
  }

  populate(dictionary) {
    dictionary.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
  	let currentNode = this.root;
  	word = word.split('');

  	word.forEach( letter => {
  		currentNode = currentNode.children[letter];
  	})

  	currentNode.popularity++;
  }
}

module.exports = Trie;
