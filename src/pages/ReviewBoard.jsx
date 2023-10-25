import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';

const ReviewBoard = () => {
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    const subcategory = 'S000208698551';
    try {
      const response = await axios.get(
        `http://localhost:8081/review/all/${subcategory}`,
      );
      console.log(response);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorAlert title='에러발생' msg='서버와 연결이 불안정합니다' />;
  } else {
    return (
      <div>
        <div>ReviewBoard</div>
      </div>
    );
  }
};

export default ReviewBoard;
