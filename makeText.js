/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, "utf8", (err, data) => {
			if (err) {
				reject(
					`Error reading file ${path}: ${err.message}`
				);
			} else {
				resolve(data);
			}
		});
	});
}

function fetchUrl(url) {
	return axios
		.get(url)
		.then((response) => response.data)
		.catch((err) => {
			throw new Error(
				`Error fetching ${url}: ${err.message}`
			);
		});
}

// Main function to process command line arguments
async function main() {
	const [, , type, path] = process.argv;

	if (!type || !path) {
		console.error(
			"Usage: node makeText.js <file|url> <path>"
		);
		process.exit(1);
	}

	try {
		let text;
		if (type === "file") {
			text = await readFile(path);
		} else if (type === "url") {
			text = await fetchUrl(path);
		} else {
			console.error('Invalid type. Use "file" or "url".');
			process.exit(1);
		}

		const mm = new MarkovMachine(text);
		console.log(mm.makeText());
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

main();
