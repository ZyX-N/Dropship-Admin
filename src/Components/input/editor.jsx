import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Underline, Mention, Paragraph, Undo, CloudServices, EasyImage, Image, ImageUpload, List } from 'ckeditor5';
import { SlashCommand, ImportWord } from 'ckeditor5-premium-features';
import { ckEditorLicenseKey } from "../../config/editor.config";

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const HTMLEditor = ({ data, setData }) => {
  const changeHandler = (event, editor) => {
    setData(editor.getData() || "");
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', "importWord", '|', 'uploadImage', '|', 'bulletedList', 'numberedList'],
        },
        plugins: [
          Bold, Essentials, Italic, Underline, Mention, Paragraph, SlashCommand, Undo, ImportWord, CloudServices, EasyImage, Image, ImageUpload, List
        ],
        licenseKey: ckEditorLicenseKey,

        cloudServices: {
          tokenUrl: 'https://113472.cke-cs.com/token/dev/e87f008b97aca968916c14a42b953a98c1f7aea308d3b6d1a9e0c3a71162?limit=10',
          uploadUrl: 'https://113472.cke-cs.com/easyimage/upload/'
        },
        importWord: {
          tokenUrl: 'https://113472.cke-cs.com/token/dev/e87f008b97aca968916c14a42b953a98c1f7aea308d3b6d1a9e0c3a71162?limit=10'
        },
        initialData: data,
      }}
      onChange={changeHandler}
    />
  );
}

export default HTMLEditor;