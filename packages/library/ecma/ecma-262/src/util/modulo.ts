export function modulo(a: number, b: number): number {
	return a - Math.floor(a / b) * b;
}
