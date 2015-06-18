import Ember from 'ember';

export default Ember.Controller.extend({
  jsonObject: '',
  parsedJsonObject: Ember.computed('jsonObject', function() {
    try {
      return JSON.parse(this.get('jsonObject'));
    } catch (e) {
      return "";
    }
  }),
  formattedJsonObject: Ember.computed('parsedJsonObject', function() {
    return JSON.stringify(this.get('parsedJsonObject'), null, '  ');
  })
});
