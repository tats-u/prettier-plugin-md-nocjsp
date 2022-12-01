// Functions located in ./printer-markdown.js and used in both ./printer-markdown.js and ./print-whitespace.js have been moved here.

function getAncestorCounter(path, typeOrTypes) {
  const types = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];

  let counter = -1;
  let ancestorNode;

  while ((ancestorNode = path.getParentNode(++counter))) {
    if (types.includes(ancestorNode.type)) {
      return counter;
    }
  }

  return -1;
}

function getAncestorNode(path, typeOrTypes) {
  const counter = getAncestorCounter(path, typeOrTypes);
  return counter === -1 ? null : path.getParentNode(counter);
}

module.exports = {
  getAncestorCounter,
  getAncestorNode,
};
