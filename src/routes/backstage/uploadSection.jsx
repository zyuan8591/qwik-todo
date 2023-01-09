import { component$, useSignal, useStylesScoped$, $ } from '@builder.io/qwik';
import style from './uploadSection.scss?inline';
import Button from '@/components/bmsSample/button';
import Modal from '@/components/bmsSample/modal';

export default component$(({ title, uploadProdHandler$, downloadFileName }) => {
  useStylesScoped$(style);
  const fileName = useSignal(`${title}-202211120.xlsx`);
  const errorMsg = useSignal('');
  const showModal = useSignal(false);

  const chooseFileHandler = $(() => {
    errorMsg.value = '';
    let timestamp = new Date().getTime();
    let randomNum = Math.floor(Math.random() * 2);
    let name = `${title}-${timestamp}`;
    if (!randomNum) return (fileName.value = `${name}.pdf`);
    fileName.value = `${name}.xlsx`;
  });

  const uploadProdHandler = $(async () => {
    errorMsg.value = '';
    const res = await uploadProdHandler$(title, fileName.value);
    if (res.state === 404) errorMsg.value = res.msg;
  });

  const clearFilename = $(() => {
    fileName.value = '';
    errorMsg.value = '';
  });

  const toggleModal = $((state) => {
    showModal.value = state;
  });

  const closeModal = $(() => {
    toggleModal(false);
  });

  const downloadFile = $(() => {
    toggleModal(true);
  });

  return (
    <div class="section-container">
      <div class="title-container">{title}</div>
      <Modal isShow={showModal.value} title={title} onClose$={closeModal}>
        <div q:slot="modal-content">下載成功</div>
        <div q:slot="modal-bottom">
          <Button buttonWord="關閉" buttonStyle="blue" onClick$={closeModal} />
        </div>
      </Modal>
      <div class="upload-form">
        {/* 上傳檔案區塊 */}
        <div class="upload-row">
          <Button
            buttonWord="選擇上傳檔案"
            buttonStyle="blue-hollow"
            onClick$={chooseFileHandler}
          />
          <div class="file-name">
            {fileName.value && (
              <span>
                <i class="fa-solid fa-xmark" onClick$={clearFilename} />
                {fileName.value}
              </span>
            )}
            <span class="error-msg">
              {errorMsg.value && `*${errorMsg.value}`}
            </span>
          </div>
          <Button
            buttonWord="上傳"
            buttonStyle="blue"
            onClick$={uploadProdHandler}
          />
        </div>
        {/* 下載檔案區塊 */}
        <div class="download-row">
          <Button
            buttonWord="下載檔案"
            buttonStyle="blue-hollow"
            onClick$={downloadFile}
          />
          <div class="file-name">{downloadFileName}</div>
        </div>
      </div>
    </div>
  );
});
