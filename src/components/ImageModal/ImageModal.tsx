import React from 'react';
import Modal from 'react-modal';
import types from '../types';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onOpenButton: () => void;
  content: string;
}

const customStyles: Modal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(57, 55, 55, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, content }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Modal"
      >
        <div>
          <img src={content} alt="" width="800" height="600" />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
