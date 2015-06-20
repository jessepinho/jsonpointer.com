import Ember from 'ember';

export function jsonStringifierHighlighter(params) {
  var jsonString = params[0];
  return Ember.String.htmlSafe(jsonString.replace(/(\_JSONPointerHighlight\_)((.|\n)*)(\_\/JSONPointerHighlight\_)/, '<span class="json-pointer-highlight">$2</span>'));
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringifierHighlighter);
