import {
  component$,
  useStylesScoped$,
  Slot,
  useClientEffect$,
  $,
  useStore,
  useSignal,
} from '@builder.io/qwik';
import style from './modal.scss?inline';
import XButton from './Xbutton';

export default component$(
  ({
    isShow = true,
    title = '',
    width = '',
    isLoading = true,
    isSuccess = '',
    isFloat = '',
    // transition = 'fade',
    onClose$,
  }) => {
    useStylesScoped$(style);
    const contentRef = useSignal();
    const modalBottomRef = useSignal();

    const state = useStore({
      isShowScrollBar: false,
    });

    const setHasScrollBar = $(() => {
      const content = contentRef.value;
      state.isShowScrollBar = content.scrollHeight > content.clientHeight;
    });

    const setVisibleModal = $(() => {
      // TODO: 當isFloat，點擊Modal外的地方關閉Modal
      // if (!this.$el.contains(e.target)) this.turnOffModal();
    });

    useClientEffect$(({ track }) => {
      track(() => isShow);

      if (isShow) {
        const content = contentRef.value;
        let domDetector = new ResizeObserver(setHasScrollBar);
        domDetector.observe(content);
      }

      // Modal 顯示時使 body 無法 scroll
      const body = document.querySelector('body');
      if (isShow) {
        body.classList.add('not-scroll');
        if (isFloat) {
          this.$removeAllClass(body, 'not-scroll');
        }
      } else {
        body.classList.remove('not-scroll');
      }

      if (isShow) {
        // 顯示modal，modal裡內容scroll至最上方
        const modalSize = document.querySelector('.modal-size');
        modalSize.scrollTo({
          top: 0,
        });
        // TODO: 當isFloat，點擊Modal外的地方關閉Modal
        if (isFloat) {
          setTimeout(() => {
            document.addEventListener('click', setVisibleModal);
          }, 300);
        }
      } else {
        document.removeEventListener('click', setVisibleModal);
      }
    });

    if (!isShow) return;
    return (
      <div class={{ modal: true, float: isFloat }}>
        <div
          class={{ 'modal-background': true, float: isFloat }}
          onClick$={onClose$}
        >
          <div
            class={{ 'modal-area modal-size': true, float: isFloat }}
            style={{ width: width }}
            onClick$={(e) => e.stopPropagation()}
            ref={contentRef}
          >
            {title && (
              <div class="modal-title">
                <div class="title">
                  <div class="title-content">
                    {title}
                    {isLoading && (
                      <span class="loading">
                        <span v-text="`.`" />
                        <span v-text="`.`" />
                        <span v-text="`.`" />
                      </span>
                    )}
                    {isSuccess && <li class="success-icon" />}
                    <Slot name="modal-title-icon" />
                  </div>
                  <XButton className="x-button" onClick$={onClose$} />
                </div>
                <div>
                  <Slot name="modal-title" />
                </div>
              </div>
            )}
            <div class="modal-content">
              <Slot name="modal-content" />
            </div>
            <div
              class={{
                'modal-bottom': true,
                'to-right': true,
                shadow: state.isShowScrollBar,
              }}
              // style={{
              //   display: modalBottomRef.value?.children.length === 0 && 'none',
              // }}
              ref={modalBottomRef}
            >
              <Slot name="modal-bottom" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
