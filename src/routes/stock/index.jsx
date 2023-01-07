import { component$, useStore, useStylesScoped$, $ } from '@builder.io/qwik';
import style from './stock.scss?';

export default component$(() => {
  useStylesScoped$(style);

  return (
    <div class="stock-wrapper">
      <div class="title">Stock</div>
    </div>
  );
});
