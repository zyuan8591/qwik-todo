import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './Xbutton.scss?inline';

export default component$(({ className, onClick$ }) => {
  useStylesScoped$(style);
  return (
    <button class={`x-cancel-icon ${className}`} onClick$={onClick$}></button>
  );
});
