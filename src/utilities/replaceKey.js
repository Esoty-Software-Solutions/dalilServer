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
  // if old keys are not present in the document then return the og doc
  if(!document[oldKeys]) {
    return document;
  }
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
      if (Array.isArray(value)) {
        // if the value is an array, rename each element of the array recursively
        newDocument[newKeys[index]] = value.map((element) =>
          typeof element === "object" ? renameKey(element, newKeys, oldKeys) : element
        );
      } else if (typeof value === "object" && value !== null) {
        // if the value is an object, rename its keys recursively
        newDocument[newKeys[index]] = renameKey(value, newKeys, oldKeys);
      } else {
        newDocument[newKeys[index]] = value;
      }
    } else {
      // use the original key
      if (Array.isArray(value)) {
        // if the value is an array, rename each element of the array recursively
        newDocument[key] = value.map((element) =>
          typeof element === "object" ? renameKey(element, newKeys, oldKeys) : element
        );
      } else if (typeof value === "object" && value !== null) {
        // if the value is an object, rename its keys recursively
        newDocument[key] = renameKey(value, newKeys, oldKeys);
      } else {
        newDocument[key] = value;
      }
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

// converts string to array
function convertStringToArray (document , key) {
  if(document[key]) {
    if(!Array.isArray(document[key])) {
      const newArr = document[key].split(",");
      const filteredPhoneNums = newArr.filter(val => val.length && !/[^0-9]/g.test(val));
      document[key] = filteredPhoneNums;
    }
    return document;
  }else{
    return document;
  }
}

module.exports = { replaceKey , renameKey , removeKey , convertStringToArray };
