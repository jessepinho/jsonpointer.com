import Ember from 'ember';
import pointer from 'npm:json-pointer';

export default Ember.Controller.extend({
  objectString: '',
  pointer: '',

  object: Ember.computed('objectString', function() {
    try { return JSON.parse(this.get('objectString')); }
    catch (e) { return undefined; }
  }),

  stringifiedObject: Ember.computed('object', function() {
    if (typeof this.get('object') === 'undefined') {
      return 'Please enter a valid JSON object.';
    }
    return JSON.stringify(this.get('object'), null, '  ');
  }),

  pointerObject: Ember.computed('pointer', 'object', function() {
    try {
      return pointer.get(this.get('object'), this.get('pointer'));
    }
    catch (e) { return undefined; }
  }),

  stringifiedPointerObject: Ember.computed('pointerObject', function() {
    if (typeof this.get('pointerObject') === 'undefined') {
      return 'Please enter a valid JSON object and pointer.';
    }
    return JSON.stringify(this.get('pointerObject'), null, '  ');
  })
});
