import Ember from 'ember';

export function jsonStringifierHighlighter(params) {
  var jsonString = params[0];
  var escaped = Ember.Handlebars.Utils.escapeExpression(jsonString);
  var highlighted = escaped.replace(/(\_JSONPointerHighlight\_)((.|\n)*)(\_\/JSONPointerHighlight\_)/, '<span class="json-pointer-highlight">$2</span>');

  return Ember.String.htmlSafe(highlighted);
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringifierHighlighter);
