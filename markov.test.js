const { MarkovMachine } = require("./markov");

describe("MarkovMachine", () => {
	let mm;

	beforeEach(() => {
		mm = new MarkovMachine("the cat in the hat");
	});

	test("chains are built correctly", () => {
		expect(mm.chains).toEqual({
			the: ["cat", "hat"],
			cat: ["in"],
			in: ["the"],
			hat: [null],
		});
	});

	test("choice returns an element from the array", () => {
		const arr = ["a", "b", "c"];
		const choice = mm.choice(arr);
		expect(arr).toContain(choice);
	});

	test("makeText stops at null", () => {
		const shortMm = new MarkovMachine("hello world");
		const text = shortMm.makeText(10);
		expect(text).toBe("hello world");
	});

	test("makeText handles numWords = 0", () => {
		let mm = new MarkovMachine("a b c");
		const text = mm.makeText(0);
		expect(text).toBe("");
	});

	test("makeText handles large numWords", () => {
		const text = mm.makeText(1000);
		const words = text.split(/[\r\n]+/);
		expect(words.length).toBeLessThanOrEqual(1000);
	});
});
