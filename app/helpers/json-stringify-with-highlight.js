import Ember from 'ember';

class JsonStringifier {
  constructor(pointer, parents, indentLevel) {
    this.pointer     = typeof pointer !== 'undefined' ? pointer : '';
    this.parents     = typeof parents !== 'undefined' ? parents : '';
    this.indentLevel = typeof indentLevel !== 'undefined' ? indentLevel : '';
  }

  stringify(value) {
    switch (Ember.$.type(value)) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'null':
      case 'undefined':
        return this.stringifyDefault(value);
      case 'array':
        return this.stringifyArray(value);
      case 'object':
        return this.stringifyObject(value);
      default:
        throw 'Invalid type to stringify.';
    }
  }

  stringifyDefault(value) {
    return this._withHighlight(JSON.stringify(value));
  }

  stringifyArray(value) {
    var jsonString = '[\n  ' + this.indentLevel;

    jsonString += value.map(function(item, index) {
      var stringifier = this._createChildStringifier(index);
      if (typeof item === 'undefined') { return stringifier.stringify(null); }
      return stringifier.stringify(item);
    }.bind(this)).join(',\n  ' + this.indentLevel);

    jsonString += '\n' + this.indentLevel + ']';

    return this._withHighlight(jsonString);
  }

  stringifyObject(object) {
    var jsonString = '{\n  ' + this.indentLevel,
        objectPropertyJsonStrings = [],
        stringifier,
        stringified;

    for (var key in object) {
      if (object.hasOwnProperty(key) && typeof object[key] !== 'undefined') {
        stringifier = this._createChildStringifier(key);
        stringified = stringifier.stringify(object[key]);
        objectPropertyJsonStrings.push('"' + key + '": ' + stringified);
      }
    }

    jsonString += objectPropertyJsonStrings.join(',\n  ' + this.indentLevel);
    jsonString += '\n' + this.indentLevel + '}';

    return this._withHighlight(jsonString);
  }

  _shouldHighlight() {
    return this.pointer && this.pointer === this.parents;
  }

  _withHighlight(value) {
    if (this._shouldHighlight()) { return '*' + value + '*'; }
    return value;
  }

  _createChildStringifier(childKey) {
    return new JsonStringifier(this.pointer,
                               this.parents + '/' + childKey,
                               '  ' + this.indentLevel);
  }
}

export function jsonStringifyWithHighlight(value, pointer) {
  var stringifier = new JsonStringifier(pointer);
  return stringifier.stringify(value);
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringifyWithHighlight);
