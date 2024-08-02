/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		this.chains = {};

		for (let i = 0; i < this.words.length; i++) {
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			if (this.chains[word]) {
				this.chains[word].push(nextWord);
			} else {
				this.chains[word] = [nextWord];
			}
		}
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		if (Object.keys(this.chains).length === 0) return "";

		if (numWords == 0) return "";

		let keys = Object.keys(this.chains);

		let key = this.choice(keys);
		let out = [key];

		for (let i = 1; i < numWords; i++) {
			key = this.choice(this.chains[key]);
			if (key === null) break;
			out.push(key);
		}
		return out.join(" ");
	}

	choice(arr) {
		let idx = Math.floor(Math.random() * arr.length);
		return arr[idx];
	}
}

module.exports = {
	MarkovMachine,
};
