/**
 * Courtesy of Mathias Bynens (https://mathiasbynens.be/demo/sort-stability-512)
 */
export function testStableSort(): boolean {
	const baseDoggos = [
		{name: "A", rating: 12},
		{name: "B", rating: 13},
		{name: "C", rating: 13},
		{name: "D", rating: 13},
		{name: "E", rating: 13},
		{name: "F", rating: 13},
		{name: "G", rating: 14},
		{name: "H", rating: 12},
		{name: "I", rating: 12},
		{name: "J", rating: 13},
		{name: "K", rating: 14}
	];
	const MIN_LENGTH = 496;
	const n = Math.ceil(MIN_LENGTH / baseDoggos.length);
	const padLength = String(n).length;
	const doggos = [];
	for (const doggo of baseDoggos) {
		for (let i = 0; i <= n; i++) {
			doggos.push({
				name: doggo.name + String(i).padStart(padLength, "0"),
				rating: doggo.rating
			});
		}
	}

	doggos.sort((a, b) => b.rating - a.rating);

	const reduced = doggos.reduce((acc, dog) => {
		const letter = dog.name.slice(0, 1);
		const previousLetter = acc.slice(-1);
		if (previousLetter === letter) {
			return acc;
		}
		return acc + letter;
	}, "");
	return reduced === "GKBCDEFJAHI";
}
