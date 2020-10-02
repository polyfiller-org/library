import {format} from "prettier";
import {join} from "path";
import {mkdirSync, writeFileSync} from "fs";

export const MAX_ELEMENTS = 16;
const BASE_INTERFACE_NAME = "List";
const BASE_TYPE_ARGUMENT_NAME = "T";
const DESTINATION_DIRECTORY = join(__dirname, "../src/lib/list");
const DESTINATION_FILE = join(DESTINATION_DIRECTORY, "list.ts");

let str = "";
const trailingStatements: string[] = [];

str += `import {makeListImplementation} from "./make-list-implementation";\n\n`;

for (let i = 0; i < MAX_ELEMENTS; i++) {
	let allTypesIntersection = "";
	let allTypeArguments = "";
	let allParameters = "";
	let interfaceName = `${BASE_INTERFACE_NAME}${i === 0 ? "" : i + 1}`;

	if (i === 0) {
		allTypesIntersection = BASE_TYPE_ARGUMENT_NAME;
		allTypeArguments = BASE_TYPE_ARGUMENT_NAME;
		allParameters = `${BASE_TYPE_ARGUMENT_NAME.toLowerCase()}: ${BASE_TYPE_ARGUMENT_NAME}`;
	} else {
		for (let j = 0; j <= i; j++) {
			allTypesIntersection += `${BASE_TYPE_ARGUMENT_NAME}${j}`;
			allTypeArguments += `${BASE_TYPE_ARGUMENT_NAME}${j}`;
			allParameters += `${BASE_TYPE_ARGUMENT_NAME.toLowerCase()}${j}: ${BASE_TYPE_ARGUMENT_NAME}${j}`;
			if (j !== i) {
				allTypesIntersection += ` | `;
				allTypeArguments += `, `;
				allParameters += `, `;
			}
		}
	}

	str += `export interface ${interfaceName}<${allTypeArguments}${i === 0 ? ` = unknown` : ``}> {\n`;

	// "length" property
	str += `readonly length: number;\n`;

	// Indexed access properties
	for (let j = 0; j <= i; j++) {
		str += `readonly ${j}: ${BASE_TYPE_ARGUMENT_NAME}${i === 0 ? "" : j};\n\n`;
	}

	// "set" methods
	for (let j = 0; j <= i; j++) {
		str += `set(index: ${j}, item: ${BASE_TYPE_ARGUMENT_NAME}${i === 0 ? "" : j}): void;\n`;
	}
	str += `set(index: number, item: ${allTypesIntersection}): void;\n\n`;

	// "get" methods
	for (let j = 0; j <= i; j++) {
		str += `get(index: ${j}): ${BASE_TYPE_ARGUMENT_NAME}${i === 0 ? "" : j};\n`;
	}
	str += `get(index: number): ${allTypesIntersection};\n\n`;

	// "delete" method
	str += `delete(item: ${allTypesIntersection}): boolean;\n\n`;

	// "deleteIndex" method
	str += `deleteIndex(index: number): boolean;\n\n`;

	// "clear" method
	str += `clear(): void;\n\n`;

	// "append" method
	str += `append(item: ${allTypesIntersection}): void;\n\n`;

	// "indexOf" methods
	for (let j = 0; j <= i; j++) {
		str += `indexOf(item: ${BASE_TYPE_ARGUMENT_NAME}${i === 0 ? "" : j}): ${j}|-1;\n`;
	}
	str += `indexOf(item: ${allTypesIntersection}): number;\n\n`;

	// "has" method
	str += `has(item: ${allTypesIntersection}): boolean;\n\n`;

	// "some" method
	str += `some(cb: (item: ${allTypesIntersection}, index: number, list: List<${allTypesIntersection}>) => boolean): boolean;\n\n`;

	// End the interface declaration
	str += `}\n`;

	// Prepare overloads for 'makeList'
	if (i === 0) {
		trailingStatements.unshift(`export function make${BASE_INTERFACE_NAME}<${allTypeArguments}>(this: {}): ${interfaceName}<${allTypeArguments}> {\n
			return makeListImplementation.apply(this, (arguments as unknown) as []) as List<T>;
		}`);
		trailingStatements.unshift(
			`export function make${BASE_INTERFACE_NAME}<${allTypeArguments}>(...elements: ${allTypeArguments}[]): ${interfaceName}<${allTypeArguments}>;\n`
		);
		trailingStatements.unshift(`export function make${BASE_INTERFACE_NAME}<${allTypeArguments}>(): ${interfaceName}<${allTypeArguments}>;\n`);
		trailingStatements.unshift(
			`export function make${BASE_INTERFACE_NAME}<${allTypeArguments}>(${allParameters}): ${interfaceName}<${allTypeArguments}>;\n`
		);
	} else {
		trailingStatements.unshift(
			`export function make${BASE_INTERFACE_NAME}<${allTypeArguments}>(${allParameters}): ${interfaceName}<${allTypeArguments}>;\n`
		);
	}
}
trailingStatements.forEach(statement => (str += statement));

// Create the output directory
mkdirSync(DESTINATION_DIRECTORY, {recursive: true});

// Write all files
console.log(`Writing generated file to ${DESTINATION_FILE}`);
writeFileSync(DESTINATION_FILE, format(str, {parser: "typescript"}));
