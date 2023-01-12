import {
  component$,
  useStylesScoped$,
  $,
  useStore,
  useClientEffect$,
} from '@builder.io/qwik';
import style from './bmsSample.scss?inline';
import Button from '@/components/button';
import Modal from '@/components/modal';
import Dropdown from '@/components/dropdown';
import Checkbox from '@/components/checkbox';

export default component$(() => {
  useStylesScoped$(style);

  const state = useStore({
    isShowModal: false,
    dropdownOne: 'property',
    dropdownTwo: 'property',
    checkboxOne: [],
    checkboxTwo: [],
    options: [
      { label: '產險', value: 'property' },
      { label: '團險', value: 'group' },
      { label: '壽險', value: 'lief' },
      { label: '防疫險', value: 'covid' },
      { label: '醫療險', value: 'medical' },
      { label: '儲蓄險', value: 'save' },
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

  const setCheckboxValue = $((val) => {
    state.checkboxOne = val;
  });

  const setCheckboxValue2 = $((val) => {
    state.checkboxTwo = val;
  });

  useClientEffect$(({ track }) => {
    track(() => state.dropdownOne);
    console.log(state.dropdownOne);
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
        <Dropdown
          title="下拉複選"
          mode="checkbox"
          value={state.checkboxTwo}
          options={state.options}
          setValue$={setCheckboxValue2}
        />
      </div>
      <div>Value: {state.checkboxOne.join(', ')}</div>
      <div class="checkbox-container">
        {state.options.map((opt) => (
          <Checkbox
            name="test"
            key={opt.value}
            value={opt.value}
            label={opt.label}
            modelValue={state.checkboxOne}
            onChange$={setCheckboxValue}
          />
        ))}
      </div>
    </div>
  );
});
