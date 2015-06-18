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
      return "";
    }
  }),
  parsedJsonObject: Ember.computed('jsonObject', function() {
    try {
      return JSON.parse(this.get('jsonObject'));
    }
    catch (e) {
      return "";
    }
  }),
  formattedJsonObject: Ember.computed('parsedJsonObject', function() {
    return JSON.stringify(this.get('parsedJsonObject'), null, '  ');
  }),
  formattedJsonPointerValue: Ember.computed('jsonPointerValue', function() {
    return JSON.stringify(this.get('jsonPointerValue'), null, '  ');
  })
});
