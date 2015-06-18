import Ember from 'ember';
import pointer from 'npm:json-pointer';

export default Ember.Controller.extend({
  jsonObject: '',
  jsonPointer: '',
  jsonPointerValue: Ember.computed('jsonPointer', 'parsedJsonObject', function() {
    try {
      return pointer.get(this.get('parsedJsonObject'), this.get('jsonPointer'));
    }
    catch (e) {
      return undefined;
    }
  }),
  parsedJsonObject: Ember.computed('jsonObject', function() {
    try {
      return JSON.parse(this.get('jsonObject'));
    }
    catch (e) {
      return undefined;
    }
  }),
  formattedJsonObject: Ember.computed('parsedJsonObject', function() {
    if (typeof this.get('parsedJsonObject') === 'undefined') {
      return 'Please enter a valid JSON object.';
    }
    return JSON.stringify(this.get('parsedJsonObject'), null, '  ');
  }),
  formattedJsonPointerValue: Ember.computed('jsonPointerValue', function() {
    if (typeof this.get('jsonPointerValue') === 'undefined') {
      return 'Please enter a valid JSON object and pointer.';
    }
    return JSON.stringify(this.get('jsonPointerValue'), null, '  ');
  })
});
