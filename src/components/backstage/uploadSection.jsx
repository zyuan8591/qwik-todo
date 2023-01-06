import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './uploadSection.scss?inline';
import Button from '@/components/common/button';

export default component$(({ title }) => {
  useStylesScoped$(style);

  return (
    <div class="section-container">
      <div class="title-container">{title}</div>
      <div class="upload-form">
        <div class="file">
          <div class="upload-file">選擇上傳檔案</div>
          <div>{`${title}-202211120.xlsx`}</div>
        </div>
        <div class="button-group">
          <Button text="取消" type="cancel" className="cancel-button" />
          <Button text="上傳" />
        </div>
      </div>
    </div>
  );
});
