import React, { useRef, ChangeEvent } from 'react';

import Button from './Button';
import './ImageUpload.css';

type Props = {
  id: string,
  center: boolean,
};

const ImageUpload: React.FC<Props> = props => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  const pickImageHandler = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  );
};

export default ImageUpload;
