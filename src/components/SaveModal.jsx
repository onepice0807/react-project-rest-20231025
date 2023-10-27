import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoArrowBackSharp, IoDownloadOutline } from 'react-icons/io5';
import ImageUploading from 'react-images-uploading';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SaveModal({ setModalShow }) {
  const [errorWriter, setErrorWriter] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(true);
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const [dataChange, setDataChange] = useState(false);

  useEffect(() => {
    handleSend();
  }, [dataChange]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleClose = () => {
    setOpen(false);
    setModalShow(false);
  };

  const handleTextChange = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'writer':
        setWriter(e.target.value);
        break;

      case 'title':
        setTitle(e.target.value);
        break;

      case 'content':
        setContent(e.target.value);
        break;

      default:
        break;
    }
  };

  const validWriter = () => {
    if (writer.length < 1) {
      setErrorWriter(true);
      return false;
    } else {
      setErrorWriter(false);
      return true;
    }
  };

  const validTitle = () => {
    if (title.length < 2) {
      setErrorTitle(true);
      return false;
    } else {
      setErrorTitle(false);
      return true;
    }
  };

  const handleSend = async () => {
    if (validWriter() && validTitle()) {
      console.log('입력 잘됨!!');
      const newBoard = {
        writer: writer,
        title: title,
        content: content,
      };
      console.log(newBoard);

      const response = await axios.post(
        'http://localhost:8081/restboard/',
        newBoard,
      );
      console.log(response);

      if (response.data === 'success' && images.length > 0) {
        let formData = new FormData();
        formData.append('boardImg', images[0].file);

        fetch(`http://localhost:8081/restboard/file/`, {
          method: 'POST',
          headers: {},
          body: formData,
        }).then((response) =>
          response.status === 200 ? setDataChange(true) : null,
        );

        handleClose();
      }
    }
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}>
          <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
            게시물 저장
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TextField
              fullWidth
              error={errorWriter}
              id='writer'
              label='작성자'
              variant='standard'
              placeholder='작성자를 입력하세요!'
              helperText='필수 입력사항입니다!'
              onChange={handleTextChange}
            />

            <TextField
              fullWidth
              error={errorTitle}
              id='title'
              label='글 제목'
              variant='standard'
              placeholder='제목을 입력하세요!'
              helperText='2자 이상 필수 입력사항입니다!'
              onChange={handleTextChange}
            />

            <TextField
              fullWidth
              id='content'
              label='글 내용'
              multiline
              rows={5}
              placeholder='자유롭게 내용을 입력해주세요'
              onChange={handleTextChange}
            />

            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className='upload__image-wrapper'>
                  <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  &nbsp;
                  <button onClick={onImageRemoveAll}>Remove all images</button>
                  {imageList.map((image, index) => (
                    <div key={index} className='image-item'>
                      <img src={image['data_url']} alt='' width='100' />
                      <div className='image-item__btn-wrapper'>
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>

            <Button
              variant='outlined'
              startIcon={<IoArrowBackSharp />}
              onClick={handleClose}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              endIcon={<IoDownloadOutline />}
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
