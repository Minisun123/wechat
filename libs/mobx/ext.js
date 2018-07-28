import {isObservableObject, isObservableMap, isObservableArray, defineObservableProperty, invariant, getAdministration} from './mobx';

function values(obj) {
  if (isObservableObject(obj)) {
      return Object.keys(obj).map(function (key) { return obj[key]; });
  }
  if (isObservableMap(obj)) {
      return Object.keys(obj).map(function (key) { return obj.get(key); });
  }
  if (isObservableArray(obj)) {
      return obj.slice();
  }
  return [];
}
function set(obj, key, value) {
  if (arguments.length === 2) {
      var values_1 = key;
      try {
          for (var key_1 in values_1) {
              set(obj, key_1, values_1[key_1]);
          }
      } catch (e) {
          console.log(e)
      }
      finally {
      }
      return;
  }
  if (isObservableObject(obj)) {
      var adm = obj.$mobx;
      var existingObservable = adm.values[key];
      if (existingObservable) {
          adm.write(obj, key, value);
      }
      else {
          defineObservableProperty(obj, key, value, adm.defaultEnhancer);
      }
  }
  else if (isObservableMap(obj)) {
      obj.set(key, value);
  }
  else if (isObservableArray(obj)) {
      if (typeof key !== "number")
          key = parseInt(key, 10);
      invariant(key >= 0, "Not a valid index: '" + key + "'");
      if (key >= obj.length)
          obj.length = key + 1;
      obj[key] = value;
  }
  else {
      return false;
  }
}
function remove(obj, key) {
  if (isObservableObject(obj)) {
      
      obj.$mobx.remove(key);
  }
  else if (isObservableMap(obj)) {
      obj.delete(key);
  }
  else if (isObservableArray(obj)) {
      if (typeof key !== "number")
          key = parseInt(key, 10);
      invariant(key >= 0, "Not a valid index: '" + key + "'");
      obj.splice(key, 1);
  }
  else {
      return false;
  }
}
function has$1(obj, key) {
  if (isObservableObject(obj)) {
      // return keys(obj).indexOf(key) >= 0
      var adm = getAdministration(obj);
      adm.getKeys(); // make sure we get notified of key changes, but for performance, use the values map to look up existence
      return adm.values[key] instanceof ObservableValue;
  }
  else if (isObservableMap(obj)) {
      return obj.has(key);
  }
  else if (isObservableArray(obj)) {
      return key >= 0 && key < obj.length;
  }
  else {
      return null;
  }
}
function get(obj, key) {
  if (!has$1(obj, key))
      return undefined;
  if (isObservableObject(obj)) {
      return obj[key];
  }
  else if (isObservableMap(obj)) {
      return obj.get(key);
  }
  else if (isObservableArray(obj)) {
      return obj[key];
  }
  else {
      return null;
  }
}

export default {
  get,
  set,
  remove,
  values,
}