import {
  component$,
  useStore,
  useStylesScoped$,
  $,
  useClientEffect$,
  useSignal,
} from '@builder.io/qwik';
import style from './dropdown.scss?inline';
import Checkbox from './checkbox';

export default component$(
  ({
    title = '',
    placeholder = '請選擇...',
    value = '',
    required = false,
    name = '',
    disabled = false,
    searchable = false,
    isError = false,
    // errorMessage = '輸入有誤',
    width = {},
    options = [],
    // tips = '',
    mode = 'select',
    // isCheckboxNum,
    setValue$ = () => {},
  }) => {
    useStylesScoped$(style);

    const dropdownRef = useSignal();
    const optionListRef = useSignal();

    const state = useStore({
      searchValue: '',
      isShowList: false,
      hoveredIndex: 0,
      selectedOption: '',
      filterOption: [],
      containerStyle: {},
      dropdownStyleClass: {},
      isComposing: false,
    });

    const getFilterOption = $(() => {
      if (searchable) {
        return options.filter((item) => {
          const LABEL = JSON.stringify(item.label);
          return LABEL.includes(state.searchValue);
        });
      } else {
        return options;
      }
    });

    const getSelectedOption = $(() => {
      return options.find((option) => {
        return option.value === value;
      });
    });

    const getContainerStyle = $(() => {
      const style = {};
      if (typeof width === 'string' && width.includes('%')) {
        style['width'] = width;
      } else if (typeof width === 'number') {
        style['width'] = `${width}px`;
      }
      return style;
    });

    const getDropdownStyleClass = $(() => {
      const className = {};
      if (isError) className['error'] = true;
      if (disabled) className['disabled'] = true;
      if (value === '') className['placeholder'] = true;
      return className;
    });

    useClientEffect$(async () => {
      state.selectedOption = await getSelectedOption();
      state.containerStyle = await getContainerStyle();
      state.dropdownStyleClass = await getDropdownStyleClass();
      state.selectedOption = await getSelectedOption();
    });

    useClientEffect$(async ({ track }) => {
      track(() => state.searchValue);
      state.filterOption = await getFilterOption();
      if (state.searchValue === '') setValue$('');
    });

    useClientEffect$(({ track }) => {
      track(() => state.selectedOption);

      if (mode === 'checkbox') return;
      state.searchValue = state.selectedOption?.label ?? '';

      // hover選取到的選項
      const index = state.filterOption.indexOf(state.selectedOption);
      state.hoveredIndex = index;
    });

    useClientEffect$(async ({ track }) => {
      track(() => state.isShowList);
      state.selectedOption = await getSelectedOption();

      if (state.isShowList || mode === 'checkbox') return;
      // if (state.searchValue !== state.selectedOption?.label) {
      //   state.searchValue = '';
      // }
    });

    useClientEffect$(({ track }) => {
      track(() => state.filterOption);
      state.hoveredIndex = 0;
    });

    const scrollToOption = $(() => {
      const list = optionListRef.value;
      const options = list.querySelectorAll('.option');
      if (!options) return;
      const hoveredOption = options[state.hoveredIndex];
      if (!hoveredOption) return;
      hoveredOption.scrollIntoView(false);
    });

    const changeHandler = $((option) => {
      if (option?.isDivider) {
        return;
      } else {
        state.searchValue = option.label;
        state.isShowList = false;
        setValue$(option.value);
      }
    });

    const deleteInputValue = $(() => {
      state.searchValue = '';
      setValue$('');
    });

    const focusInput = $(() => {
      if (disabled) return;
      state.isShowList = true;
    });

    const clickBlankHandler = $((e) => {
      if (!dropdownRef.value.contains(e.target)) {
        state.isShowList = false;
      }
    });

    const compositionStartHandler = $(() => {
      state.isComposing = true;
    });

    const hoverOptionByKeyboard = $((direct, e) => {
      state.isShowList = true;
      if (direct === 'down') {
        if (state.hoveredIndex < state.filterOption.length - 1) {
          state.hoveredIndex++;
          if (state.filterOption[state.hoveredIndex].isDivider)
            state.hoveredIndex++;
        }
      } else {
        if (state.hoveredIndex > 0) {
          state.hoveredIndex--;
          if (state.filterOption[state.hoveredIndex].isDivider)
            state.hoveredIndex--;
        }
      }
      scrollToOption();
      e.preventDefault();
    });

    const setHoveredToValue = $(() => {
      if (state.isComposing) {
        state.isComposing = false;
        return;
      }
      const option = state.filterOption[state.hoveredIndex];
      if (!option) return;
      changeHandler(option);
    });

    const keydownHandler = $((e) => {
      const KEY = e.key;
      switch (KEY) {
        case 'Escape':
        case 'Tab':
          state.isShowList = false;
          break;
        case 'ArrowUp':
          hoverOptionByKeyboard('up', e);
          break;
        case 'ArrowDown':
          hoverOptionByKeyboard('down', e);
          break;
        case 'Enter':
          setHoveredToValue();
          break;
        default:
          if (!searchable) e.preventDefault();
          break;
      }
    });

    const InputHandler = $((e) => {
      state.searchValue = e.target.value;
      state.isShowList = true;
    });

    const getOptionLabel = $(() => {
      const labelArr = [];
      state.filterOption.forEach((opt) => {
        if (value.includes(opt.value)) labelArr.push(opt.label);
      });

      if (labelArr.length === state.filterOption.length) {
        return '全部';
      }

      return labelArr.join(',');
    });

    useClientEffect$(async ({ track }) => {
      track(() => value);
      if (mode === 'select') return;
      state.searchValue = await getOptionLabel();
    });

    return (
      <div
        ref={dropdownRef}
        class="input-container"
        style={state.containerStyle}
        document:onClick$={clickBlankHandler}
        document:onCompositionStart$={compositionStartHandler}
      >
        {title && (
          <div class="form-label">
            {required && <span class="required">*</span>}
            <span>{title}</span>
            {/* <div
              v-if="tips"
              class="info-icon"
              :tooltip="tips" tooltip-touch
            /> */}
          </div>
        )}
        <input
          name={name}
          required={required}
          disabled={true}
          value={value}
          style={{ display: 'none' }}
          isComposing={state.isComposing}
        />
        <div class="select-container">
          <div class="textbox-container">
            <input
              type="text"
              name={name}
              autocomplete="off"
              tabindex="0"
              readonly={!searchable && state.filterOption.length}
              class={{
                select: true,
                target: true,
                ...state.dropdownStyleClass,
              }}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              value={state.searchValue}
              onInput$={InputHandler}
              onFocus$={focusInput}
              onKeyDown$={keydownHandler}
            />
            <div class="arrow" />
            {!disabled &&
              searchable &&
              state.isShowList &&
              state.searchValue && (
                <div class="x-cancel-icon" onClick$={deleteInputValue} />
              )}
          </div>
          {!disabled && state.isShowList && (
            <div
              ref={optionListRef}
              class={{
                'option-container': true,
                'options-checkbox-container': mode === 'checkbox',
              }}
            >
              {mode === 'select' &&
                state.filterOption.length > 0 &&
                state.filterOption.map((opt, idx) => (
                  <div
                    key={idx}
                    data-value={opt.value}
                    // TODO: other class: opt.className
                    class={{
                      option: true,
                      disabled: opt?.isDivider,
                      hover: idx === state.hoveredIndex,
                    }}
                    onMouseenter$={() => (state.hoveredIndex = idx)}
                    onClick$={() => changeHandler(opt)}
                  >
                    <div class={{ 'option-divider': opt?.isDivider }}>
                      {opt.label}
                    </div>
                  </div>
                ))}
              {mode === 'checkbox' &&
                state.filterOption.map((opt, idx) => (
                  <Checkbox
                    key={idx}
                    name={opt.label}
                    label={opt.label}
                    value={opt.value}
                    onChange$={setValue$}
                    modelValue={value}
                    className={{
                      option: true,
                      hover: state.hoveredIndex === idx,
                    }}
                    onMouseenter$={() => {
                      state.hoveredIndex = idx;
                    }}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
