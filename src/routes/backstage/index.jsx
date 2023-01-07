import { component$, useStore, useStylesScoped$, $ } from '@builder.io/qwik';
import style from './backstage.scss?inline';
import UploadSection from './uploadSection';

export default component$(() => {
  useStylesScoped$(style);

  const state = useStore(
    {
      productList: [
        { name: '四贏商品', downloadFileName: '' },
        { name: '特定商品', downloadFileName: '' },
        { name: '競賽自訂商品', downloadFileName: '' },
      ],
    },
    { recursive: true }
  );

  const uploadHandler = $((name, file) => {
    if (!file) return { state: 404, msg: '請上傳檔案' };
    if (file.split('.')[1] !== 'xlsx')
      return { state: 404, msg: '檔案類型錯誤' };
    state.productList = state.productList.map((prod) => {
      if (prod.name === name) return { name, downloadFileName: file };
      return prod;
    });
    return { state: 200, msg: '檔案上傳成功' };
  });

  return (
    <div class="backstage-wrapper">
      <div class="title">商品後台</div>
      <div>檔案上傳區</div>
      <div class="upload-container">
        {state.productList.map((prod) => {
          return (
            <UploadSection
              key={prod.name}
              title={prod.name}
              uploadProdHandler$={uploadHandler}
              downloadFileName={
                prod.downloadFileName
                  ? prod.downloadFileName
                  : '下載內容為上次編輯的檔案'
              }
            />
          );
        })}
      </div>
    </div>
  );
});
