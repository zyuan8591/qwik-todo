import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './bmsHeader.scss?inline';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="header">
      <Link href="/" class="logo-container">
        <div class="logo-container">
          <div class="logo-word">磊山</div>
          <div class="logo-grep" />
          <div class="logo-word">ＱＷＩＫ</div>
        </div>
      </Link>
    </div>
  );
});
