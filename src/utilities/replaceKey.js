function replaceKey(object, newKey, oldKey) {
  // check if the document has the old key
  // if (!object.hasOwnProperty(oldKey)) {
  //   return object; // return the original document if oldKey is not found
  // }

  // const newKey = 'newKey';
  // oldObj[newKey] = oldObj[oldKey]
  // delete oldObj[oldKey];

  // return newDocument;
}

function renameKey(document, newKeys, oldKeys) {
  // check if newKeys and oldKeys are strings and convert them to arrays if necessary
  if (typeof newKeys === "string" && typeof oldKeys === "string") {
    newKeys = [newKeys];
    oldKeys = [oldKeys];
  }

  // if newKeys or oldKeys are not arrays or have different lengths, return the original document
  if (!Array.isArray(newKeys) || !Array.isArray(oldKeys) || newKeys.length !== oldKeys.length) {
    return document;
  }

  // create a new object to hold the renamed keys
  const newDocument = {};

  // loop through the keys in the original document
  for (const [key, value] of Object.entries(document)) {
    // check if the current key matches any oldKey
    const index = oldKeys.indexOf(key);
    if (index !== -1) {
      // use the corresponding newKey instead
      newDocument[newKeys[index]] = value;
    } else {
      // use the original key
      newDocument[key] = value;
    }
  }

  // also rename any key that matches an oldKey in subdocuments recursively
  for (const [key, value] of Object.entries(newDocument)) {
    if (typeof value === "object" && value !== null) {
      newDocument[key] = renameKey(value, newKeys, oldKeys);
    }
  }

  return newDocument;
}



// a new utility function , it can be used to remove the keys from document, multiple or single
function removeKey (document , removeArg) {
  if(Array.isArray(removeArg)) {
    for (let i = 0 ; i <= removeArg.length - 1 ; i++) {
      deleteKey(document , removeArg[i]);
    }  
  }else{
    deleteKey(document , removeArg);
  }
  function deleteKey (object , toRemoveKey) {
    delete object[toRemoveKey];
    return object;
  }
  return document; 
}
module.exports = { replaceKey , renameKey , removeKey };
