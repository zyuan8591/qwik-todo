import { component$, useStylesScoped$, $ } from '@builder.io/qwik';
import style from './bmsSample.scss?inline';
import Button from '@/components/bmsSample/button';

export default component$(() => {
  useStylesScoped$(style);

  const buttonClick = $(() => {
    console.log('Button Click!');
  });

  return (
    <div class="sample-container">
      <div class="title">BMS sample</div>
      <div class="button-components">
        <Button
          buttonWord="我是按鈕"
          buttonStyle="blue"
          onClick$={buttonClick}
        />
        <Button buttonWord="我是按鈕" buttonStyle="blue" disabled="true" />
      </div>
    </div>
  );
});
