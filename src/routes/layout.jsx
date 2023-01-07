import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import BmsHeader from '@/components/bmsHeader/bmsHeader';
import Navbar from '@/components/nav/nav';
import styles from './layout.scss?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <main>
        <BmsHeader />
        {/* <Header />   */}
        <section>
          <Navbar />
          <div class="slot-container">
            <Slot />
          </div>
        </section>
      </main>
    </>
  );
});
