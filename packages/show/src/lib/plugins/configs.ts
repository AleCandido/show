export function customcontrols() {
  const configs = {
    controls: [
      {
        id: 'toggle-overview',
        title: 'Toggle overview (O)',
        icon: '<i class="fa fa-th"></i>',
        action: 'Reveal.toggleOverview();'
      },
      {
        icon: '<i class="fa fa-pen-square"></i>',
        title: 'Toggle chalkboard (B)',
        action: 'RevealChalkboard.toggleChalkboard();'
      },
      {
        icon: '<i class="fa fa-pen"></i>',
        title: 'Toggle notes canvas (C)',
        action: 'RevealChalkboard.toggleNotesCanvas();'
      }
    ]
  };

  return configs;
}

export default { customcontrols };
