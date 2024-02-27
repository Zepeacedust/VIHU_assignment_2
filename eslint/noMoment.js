// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    return {
      Identifier: function (node) {
        if (
          node.name != node.name.toUpperCase() &&
          node.name.includes("_") &&
          node.name[0] != "_"
        )
          context.report({
            node,
            message: "Should use Camelcase",
          });
      },
    };
  },
};
