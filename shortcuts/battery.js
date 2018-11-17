const { withVariables, buildShortcut } = require('@joshfarrant/shortcuts-js');

const {
  conditional,
  getBatteryLevel,
  setLowPowerMode,
  showResult
} = require('@joshfarrant/shortcuts-js/actions');

let batteryLevel;

const actions = [
  getBatteryLevel({}, id => {
    batteryLevel = id;
  }),
  conditional({
    input: '<',
    value: 20,
    ifTrue: [
      setLowPowerMode({
        value: true
      }),
      showResult({
        text: withVariables`Battery is at ${batteryLevel}%, you might want to charge it.`
      })
    ],
    ifFalse: [
      showResult({
        text: withVariables`Your battery is at ${batteryLevel}%, you're probably fine for now.`
      })
    ]
  })
];

module.exports = {
  name: 'Battery',
  shortcut: buildShortcut(actions)
};
