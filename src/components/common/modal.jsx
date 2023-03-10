import { component$, useStylesScoped$, Slot } from '@builder.io/qwik';
import style from './modal.scss?inline';
import Button from '@/components/bmsSample/button';

export default component$(({ title = '標題', closeHandler$ }) => {
  useStylesScoped$(style);

  return (
    <>
      <div class="modal-wrapper">
        <div class="modal-bg" onClick$={closeHandler$} />
        <div class="modal-box">
          <i class="fa-solid fa-xmark" onClick$={closeHandler$} />
          <div class="title">{title}</div>
          <Slot name="body" />
          <div class="bottom">
            <Button
              buttonWord="關閉"
              buttonStyle="blue"
              onClick$={closeHandler$}
            />
          </div>
        </div>
      </div>
    </>
  );
});
