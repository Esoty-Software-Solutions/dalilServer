function replaceKey(object, newKey, oldKey) {
  // check if the document has the old key
  if (!object.hasOwnProperty(oldKey)) {
    return object; // return the original document if oldKey is not found
  }

  const newKey = 'newKey';
  oldObj[newKey] = oldObj[oldKey]
  delete oldObj[oldKey];

  return newDocument;
}

module.exports = { replaceKey };
