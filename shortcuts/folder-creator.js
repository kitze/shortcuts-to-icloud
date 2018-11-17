const { buildShortcut } = require('@joshfarrant/shortcuts-js');
const { chooseFromMenu, runShortcut } = require('@joshfarrant/shortcuts-js/actions');

const foldersArr = [
  [
    'Health',
    [
      // The name of the folder
      'Log Sleep', // The names of Shortcuts to contain in that folder
      'Log Run',
      'Log Cycle'
    ]
  ],
  [
    'Home',
    [
      [
        'Lights',
        [
          'Lights On', // We can go as many levels deep as we like
          'Lights Off'
        ]
      ],
      ['Heating', ['Heating On', 'Heating Off']],
      ['Cameras', ['Cameras On', 'Cameras Off']],
      ['Door', ['Lock Door', 'Unlock Door']]
    ]
  ],
  ['Audio', ['Play Playlist', 'Resume Podcast']]
];

const buildFolders = arr =>
  arr.map(
    shortcut =>
      Array.isArray(shortcut)
        ? {
            label: shortcut[0],
            actions: [
              chooseFromMenu({
                prompt: shortcut[0],
                items: buildFolders(shortcut[1])
              })
            ]
          }
        : {
            label: shortcut,
            actions: [
              runShortcut({
                name: shortcut
              })
            ]
          }
  );

const actions = [
  chooseFromMenu({
    prompt: 'Open',
    items: buildFolders(foldersArr)
  })
];

const shortcut = buildShortcut(actions);

module.exports = {
  name: 'Folder Creator',
  shortcut
};
