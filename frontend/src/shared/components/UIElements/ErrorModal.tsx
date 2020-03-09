import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

type Props = {
  error: string,
  onClear: () => void,
};

const ErrorModal: React.FC<Props> = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
