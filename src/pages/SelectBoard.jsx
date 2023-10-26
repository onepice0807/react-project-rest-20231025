import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import axios from 'axios';
import { useEffect } from 'react';
import DetailInfoModal from '../components/Modal';
import SuccessAlert from '../components/SuccesAlert';

const columns = [
  { field: 'no', headerName: '글번호', width: 90 },
  {
    field: 'writer',
    headerName: '작성자',
    width: 150,
    editable: true,
  },
  {
    field: 'title',
    headerName: '글 제목',
    width: 250,
    editable: true,
  },
  {
    field: '작성일',
    headerName: '작성일',
    width: 100,
    valueGetter: (params) =>
      `${new Date(params.row.postDate).toLocaleDateString()}`,
  },
  {
    field: 'boardImg',
    headerName: '이미지',
    width: 200,
    renderCell: (params) => <img src={params.value} width={50} />,
  },
];

const SelectBoard = () => {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedNo, setClickedNo] = useState(-1);
  const [successAlertVisible, setSuccessAlertVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessAlertVisible(false);
    }, 3000); // 3초간 표시

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, []);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await axios.get('http://localhost:8081/restboard/');
      console.log(response.data);
      setBoards(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const handelRowClick = (params) => {
    setClickedNo(Number(params.row.no));
    setModalOpen(true);
  };

  if (error) {
    return <ErrorAlert title='에러발생' msg='서버와 연결이 불안정합니다' />;
  } else {
    return (
      <>
        {successAlertVisible ? (
          <SuccessAlert title='접속성공' msg='서버와 연결이 완벽합니다' />
        ) : null}
        <Box sx={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={boards}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(boards) => boards.no}
            onRowClick={handelRowClick}
          />

          {modalOpen ? (
            <DetailInfoModal
              setModalOpen={setModalOpen}
              clickedNo={clickedNo}
            />
          ) : null}
        </Box>
      </>
    );
  }
};

export default SelectBoard;
