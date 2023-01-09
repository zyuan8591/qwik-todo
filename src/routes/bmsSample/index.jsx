import { component$, useStylesScoped$, $, useStore } from '@builder.io/qwik';
import style from './bmsSample.scss?inline';
import Button from '@/components/bmsSample/button';
import Modal from '@/components/bmsSample/modal';

export default component$(() => {
  useStylesScoped$(style);

  const state = useStore({
    isShowModal: false,
  });

  const buttonClick = $(() => {
    console.log('Button Click!');
  });

  const closeModal = $(() => {
    state.isShowModal = false;
  });

  const openModal = $(() => {
    state.isShowModal = true;
  });

  return (
    <div class="sample-container">
      <div class="title">BMS sample</div>
      <div class="button-components">
        <Button buttonWord="套用" buttonStyle="blue" onClick$={buttonClick} />
        <Button buttonWord="不能套用" buttonStyle="blue" disabled="true" />
        <Button buttonWord="設定" buttonStyle="hollow" />
        <Button buttonWord="下載" buttonStyle="blue-hollow" />
        <Button buttonWord="取消" buttonStyle="grey" />
        <Button buttonWord="刪除" buttonStyle="red" />
        <Button buttonWord="隱藏" buttonStyle="dashed-border" />
      </div>
      <Button
        buttonWord="開啟 Modal"
        buttonStyle="hollow"
        onClick$={openModal}
      />
      <Modal
        title="範例 Modal"
        onClose$={closeModal}
        isShow={state.isShowModal}
      >
        <div q:slot="modal-content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum alias
          mollitia nulla consequatur. Voluptatem minima quibusdam aliquam ipsum
          aspernatur molestiae officiis eum, dolores eaque fuga voluptatum,
          labore tempora mollitia? Dicta.
        </div>
        <div q:slot="modal-bottom">
          <Button buttonWord="關閉" buttonStyle="blue" onClick$={closeModal} />
        </div>
      </Modal>
    </div>
  );
});
