import { component$, useStylesScoped$, $, useStore } from '@builder.io/qwik';
import style from './bmsSample.scss?inline';
import Button from '@/components/button';
import Modal from '@/components/modal';
import Dropdown from '@/components/dropdown';

export default component$(() => {
  useStylesScoped$(style);

  const state = useStore({
    isShowModal: false,
    dropdownOne: '',
    dropdownTwo: '',
    options: [
      { label: '全部', value: '' },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
    ],
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

  const setDropdownVal = $((val) => {
    state.dropdownOne = val;
  });

  const setDropdownVal2 = $((val) => {
    state.dropdownTwo = val;
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
      {state.isShowModal && (
        <Modal
          title="範例 Modal"
          onClose$={closeModal}
          isShow={state.isShowModal}
        >
          <div q:slot="modal-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
            alias mollitia nulla consequatur. Voluptatem minima quibusdam
            aliquam ipsum aspernatur molestiae officiis eum, dolores eaque fuga
            voluptatum, labore tempora mollitia? Dicta.
          </div>
          <div q:slot="modal-bottom">
            <Button
              buttonWord="關閉"
              buttonStyle="blue"
              onClick$={closeModal}
            />
          </div>
        </Modal>
      )}
      <div class="dropdown-container">
        <Dropdown
          title="下拉選項"
          required={true}
          value={state.dropdownOne}
          options={state.options}
          setValue$={setDropdownVal}
        />
        <Dropdown
          title="下拉選項2"
          value={state.dropdownTwo}
          options={state.options}
          setValue$={setDropdownVal2}
          searchable={true}
        />
      </div>
    </div>
  );
});
