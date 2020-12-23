function toButton(button) {
  const json = JSON.stringify(button.value);
  const meta = `data-type="button"
                data-value='${json}'
                `;
  return `
          <div class="button ${button.active ? 'active' : ''}"
          ${meta}
          >
            <i class="material-icons"
            ${meta}
            >${button.icon}</i>
          </div>
          `;
}
export function createToolbar(state) {
  const buttons = [
    {
      value: { textAlign: 'left' },
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
    },
    {
      value: { textAlign: 'center' },
      icon: 'format_align_justify',
      active: state['textAlign'] === 'center',
    },
    {
      value: { textAlign: 'right' },
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
      icon: 'format_bold',
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'normal' : 'underline',
      },
    },
  ];

  return buttons.map(toButton).join('');
}
