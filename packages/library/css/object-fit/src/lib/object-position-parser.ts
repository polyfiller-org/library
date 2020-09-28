interface CreateSyntaxTokenOptions {
	kind: TokenKind;
	position: number;
	value: string;
}

function createTextSpan(position: number, length: number): TextSpan {
	return {
		start: position,
		length,
		end: position + length
	};
}

function createSyntaxToken({kind, position, value}: CreateSyntaxTokenOptions): SyntaxToken {
	return {
		kind,
		span: createTextSpan(position, value.length),
		value
	};
}

export const enum TokenKind {
	NumberWithUnitToken = "NumberWithUnitToken",
	WhitespaceToken = "WhitespaceToken",
	PositionLiteralToken = "PositionLiteralToken",
	BadCharacterToken = "BadCharacterToken",
	EndOfFileToken = "EndOfFileToken"
}

interface TextSpan {
	readonly start: number;
	readonly end: number;
	readonly length: number;
}

interface SyntaxToken<Kind extends TokenKind = TokenKind> {
	readonly kind: Kind;
	readonly value: string;
	readonly span: TextSpan;
}

export class ObjectPositionParser {
	/**
	 * The current position within the source text
	 */
	private position: number = 0;

	/**
	 * The start position within the source text
	 */
	private start: number = 0;

	/**
	 * The current value within the source text
	 */
	private value: string | undefined;

	/**
	 * The current TokenKind
	 */
	private kind: TokenKind | undefined;

	constructor(private readonly text: string) {}

	/**
	 * Lexes the input text
	 */
	public lex(): SyntaxToken {
		this.start = this.position;
		this.kind = undefined;
		this.value = undefined;

		const current = this.current();

		switch (current) {
			case "\0":
				this.kind = TokenKind.EndOfFileToken;
				this.value = "";
				break;

			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				this.readNumberWithUnit();
				break;

			case " ":
			case "\t":
			case "\n":
			case "\r":
				this.readWhitespace();
				break;

			default:
				if (this.isLetter(current)) {
					this.readLetters();
				}

				break;
		}

		return createSyntaxToken({
			kind: this.kind ?? TokenKind.BadCharacterToken,
			value: this.value ?? this.current(),
			position: this.start
		});
	}

	/**
	 * Gets the current char
	 * @type {string}
	 */
	private current(): string {
		return this.peek(0);
	}

	/**
	 * Returns true if the given char is a digit
	 * @param {string} char
	 * @return {boolean}
	 */
	private isDigit(char: string): boolean {
		return /[0-9.]/.test(char);
	}

	/**
	 * Returns true if the given char represents a letter
	 * @param {string} char
	 * @return {boolean}
	 */
	private isLetter(char: string): boolean {
		return char.toLowerCase() !== char.toUpperCase();
	}

	/**
	 * Returns true if the given char represents whitespace
	 * @param {string} char
	 * @return {boolean}
	 */
	private isWhitespace(char: string): boolean {
		return /[\s\t\n\r]/.test(char);
	}

	/**
	 * Peeks into the source text from the current position with the given offset
	 * @param {number} offset
	 * @return {string}
	 */
	private peek(offset: number): string {
		const index = this.position + offset;

		if (index >= this.text.length) {
			return "\0";
		}

		return this.text[index];
	}

	/**
	 * Reads the number from the text
	 *
	 */
	private readNumberWithUnit(): void {
		while (this.isDigit(this.current())) {
			this.position++;
		}

		while (this.isLetter(this.current()) || this.current() === "%") {
			this.position++;
		}

		const length = this.position - this.start;
		this.value = this.text.slice(this.start, this.start + length);
		this.kind = TokenKind.NumberWithUnitToken;
	}

	/**
	 * Reads whitespace from the input text
	 */
	private readWhitespace() {
		while (this.isWhitespace(this.current())) {
			this.position++;
		}

		const length = this.position - this.start;
		this.value = this.text.slice(this.start, this.start + length);
		this.kind = TokenKind.WhitespaceToken;
	}

	/**
	 * Reads a sequence of letters
	 */
	private readLetters(): void {
		while (this.isLetter(this.current())) {
			this.position++;
		}

		const length = this.position - this.start;
		const text = this.text.slice(this.start, this.start + length);

		switch (text) {
			case "left":
			case "right":
			case "top":
			case "bottom":
			case "center":
			case "inherit":
			case "initial":
			case "unset":
			case "revert":
				this.kind = TokenKind.PositionLiteralToken;
				this.value = text;
				break;
		}
	}
}
