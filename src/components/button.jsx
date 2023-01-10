import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './button.scss?inline';

export default component$(
  ({
    buttonWord = '',
    iconClass = '',
    buttonStyle = '',
    buttonSize = 'default',
    disabled = false,
    width = {},
    onClick$,
  }) => {
    useStylesScoped$(style);

    const getButtonStyle = () => {
      const className = {};
      className['small-button'] = buttonSize === 'small';
      className['default-button'] = buttonSize === 'default';
      className['large-button'] = buttonSize === 'large';
      className['red-button'] = buttonStyle === 'red';
      className['grey-button'] = buttonStyle === 'grey';
      className['blue-button'] = buttonStyle === 'blue';
      className['hollow-button'] = buttonStyle === 'hollow';
      className['blue-hollow-button'] = buttonStyle === 'blue-hollow';
      className['dashboard-button'] = buttonStyle === 'dashboard';
      className['dashed-border-button'] = buttonStyle === 'dashed-border';
      className['disabled'] = disabled;
      return className;
    };

    const buttonStyleClass = getButtonStyle();

    const getContainerStyle = () => {
      const style = {};
      if (typeof width === 'string' && width.includes('%')) {
        style['width'] = width;
      } else if (typeof width === 'number') {
        style['width'] = `${width}px`;
      }
      return style;
    };

    const containerStyle = getContainerStyle();

    return (
      <button
        class={{ button: true, ...buttonStyleClass }}
        style={containerStyle}
        disabled={disabled}
        onClick$={onClick$}
      >
        {iconClass && <div class={`button-icon ${iconClass}`}></div>}
        <div class="button-word">{buttonWord}</div>
      </button>
    );
  }
);
