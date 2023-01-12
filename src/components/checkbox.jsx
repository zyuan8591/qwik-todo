import {
  useStylesScoped$,
  component$,
  useStore,
  useClientEffect$,
  $,
} from '@builder.io/qwik';
import style from './checkbox.scss?inline';
import _ from 'lodash';

export default component$(
  ({
    name = '',
    label = '',
    value = '',
    disabled = false,
    modelValue = [],
    onChange$ = () => {},
    className = {},
    onMouseenter$ = () => {},
  }) => {
    useStylesScoped$(style);

    const state = useStore({
      id: '',
      isChecked: false,
    });

    useClientEffect$(() => {
      state.id = `${name}-${value}`;
    });

    useClientEffect$(({ track }) => {
      track(() => modelValue);
      state.isChecked = modelValue.includes(value);
    });

    const changeHandler = $((e) => {
      const newModelValue = [...modelValue];
      if (e.target.checked) {
        newModelValue.push(value);
      } else {
        _.remove(newModelValue, (val) => val === value);
      }
      onChange$(newModelValue);
    });

    return (
      <div
        class={{ 'checkbox-container': true, ...className }}
        onMouseenter$={() => onMouseenter$()}
      >
        <input
          key={state.id}
          type="checkbox"
          name={name}
          value={value}
          id={state.id}
          checked={state.isChecked}
          disabled={disabled}
          class={{ disabled: disabled }}
          onChange$={changeHandler}
        />
        <label for={state.id}>{label}</label>
      </div>
    );
  }
);
