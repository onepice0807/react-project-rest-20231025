import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';

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

export default function DetailInfoModal({ setModalOpen, clickedNo }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    // 게시물 가져오기
    fetchBoard();
  }, [clickedNo]);

  const fetchBoard = async () => {
    // 요청 uri : /restboard/clickedNo/
    const response = await axios.get(
      `http://localhost:8081/restboard/${clickedNo}`,
    );
    console.log(response);
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
            게시물 상세 정보
          </Typography>
          <Typography id='keep-mounted-modal-description' sx={{ mt: 2 }}>
            {clickedNo} 정보를 출력하자
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
