const { buildShortcut, withVariables } = require('@joshfarrant/shortcuts-js');
const { calculate, comment, number, showResult } = require('@joshfarrant/shortcuts-js/actions');

// We'll use this later to reference the output of a calculation
let calcId;

// Define our list of actions
const actions = [
  comment({
    text: 'Hello, world!'
  }),
  number({
    number: 42
  }),
  calculate(
    {
      operand: 3,
      operation: '/'
    },
    id => {
      // We'll use this again in a moment
      calcId = id;
    }
  ),
  showResult({
    /**
     * We can use the result of the calculation in this Shortcuts's input
     * by passing the string to the 'withVariables' tag function
     */
    text: withVariables`Total is ${calcId}!`
  })
];

module.exports = {
  name: 'Calculate',
  shortcut: buildShortcut(actions)
};
