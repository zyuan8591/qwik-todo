import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './button.scss?inline';

export default component$(({ className, type = 'confirm', text = '按鈕' }) => {
  useStylesScoped$(style);
  return <div class={`button-container ${className} ${type}`}>{text}</div>;
});
