const {transform, types, createConfigItem} = require("@babel/core");
const {parse} = require("@babel/parser");

/**
 * This Babel plugin rewrites typeof operator usage such that Symbol and BigInt can be properly tested.
 * @type {File}
 */
const parsed = parse(
	`function __shimmedTypeof(__arg) {
		return typeof Symbol === "function" && __arg != null && __arg.constructor === Symbol && __arg !== Symbol.prototype ? "symbol" : typeof BigInt === "function" && __arg != null && __arg.constructor === BigInt && __arg !== BigInt.prototype ? "bigint" : typeof __arg;
	}`
);

const typeofPlugin = {
	name: "transform-typeof",
	visitor: {
		Program(path) {
			path.unshiftContainer("body", parsed.program.body[0]);
		},
		UnaryExpression(path) {
			const {node, parent} = path;
			if (node.operator !== "typeof") return;

			const matchingParent = path.findParent(path => path.isFunctionDeclaration());
			if (matchingParent != null && matchingParent.node.id.name === "__shimmedTypeof") {
				return;
			}

			if (path.parentPath.isBinaryExpression() && types.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
				const opposite = path.getOpposite();

				if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "bigint" && opposite.node.value !== "object") {
					return;
				}
			}

			const call = types.callExpression(types.identifier("__shimmedTypeof"), [node.argument]);

			const arg = path.get("argument");

			if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name, true)) {
				const unary = types.unaryExpression("typeof", types.cloneNode(node.argument));

				path.replaceWith(types.conditionalExpression(types.binaryExpression("===", unary, types.stringLiteral("undefined")), types.stringLiteral("undefined"), call));
			} else {
				path.replaceWith(call);
			}
		}
	}
};

const regexLiteralPlugin = {
	name: "transform-regex-literals",
	visitor: {
		RegExpLiteral(path) {
			const {node} = path;
			path.replaceWith(types.newExpression(types.identifier("RegExp"), [types.stringLiteral(node.pattern), types.stringLiteral(node.flags)]));
		}
	}
};

const plugins = [createConfigItem(typeofPlugin, {type: "plugin"}), createConfigItem(regexLiteralPlugin, {type: "plugin"})];
const options = {
	configFile: false,
	babelrc: false,
	babelrcRoots: false,
	compact: false,
	plugins
};
module.exports = test => {
	test.contents = transform(test.contents, options).code;
	return test;
};
