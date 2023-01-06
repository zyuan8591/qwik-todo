import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './backstage.scss?inline';
import UploadSection from '@/components/backstage/uploadSection';

export default component$(() => {
  useStylesScoped$(style);

  return (
    <div class="backstage-wrapper">
      <div class="title">商品後台</div>
      <div>檔案上傳區</div>
      <div class="upload-container">
        <UploadSection title="四贏商品" />
        <UploadSection title="特定商品" />
        <UploadSection title="競賽自訂商品" />
      </div>
    </div>
  );
});
