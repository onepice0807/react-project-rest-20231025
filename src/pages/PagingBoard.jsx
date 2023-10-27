import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PagingBoard.css';

const PagingBoard = () => {
  const [pageNo, setPageNo] = useState(1); // 현재 페이지 번호
  const [boards, setBoards] = useState([]); // 게시글 목록
  const [total_pages, setTotal_pages] = useState(null); // 총 페이지 수

  useEffect(() => {
    fetchData(); // 게시글 목록 가져오기
  }, [pageNo]); // 페이지 번호가 변경될 때마다 다시 실행

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=f36b2ff2255450dd445a75c6c53c578c&lanuage=ko_KR&page=${pageNo}`,
    );
    const { results, total_pages } = response.data;
    setBoards(results);
    setTotal_pages(total_pages);
    console.log(response.data);
  };

  const handlePageChange = (newPageNo) => {
    setPageNo(newPageNo); // 새로운 페이지 번호 설정
    fetchData(); // 게시글 목록 다시 가져오기
  };

  // 현재 페이지가 첫 번째 페이지인지 검사
  const isFirstPage = pageNo === 1;

  // 현재 페이지가 마지막 페이지인지 검사
  const isLastPage = pageNo === total_pages;

  // 페이지 번호 범위 계산
  const startPage = Math.floor((pageNo - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, total_pages);

  return (
    <div className='boards'>
      {/* 게시글 목록 렌더링 */}
      {boards.map((board) => {
        return (
          <div key={board.id}>
            <div className='board'>
              <div>{board.title}</div>
              <div>{board.writer}</div>
              <div>{board.overview}</div>
            </div>
            <div>{new Date(board.postDate).toLocaleString()}</div>
          </div>
        );
      })}

      {/* 페이징 버튼 렌더링 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* 이전 버튼 렌더링 */}
        {!isFirstPage && (
          <button onClick={() => handlePageChange(pageNo - 1)}>이전</button>
        )}

        {/* 처음 버튼 렌더링 */}
        {isFirstPage && <button disabled>처음</button>}

        {/* 페이지 번호 버튼 렌더링 */}
        {[...Array(endPage - startPage + 1)].map((_value, index) => (
          <button
            className='page-button'
            key={index}
            onClick={() => handlePageChange(startPage + index)}
            style={{
              backgroundColor: pageNo === startPage + index ? '#ccc' : '#fff',
            }}
          >
            {startPage + index}
          </button>
        ))}

        {/* 다음 버튼 렌더링 */}
        {!isLastPage && (
          <button onClick={() => handlePageChange(pageNo + 1)}>다음</button>
        )}

        {/* 마지막 버튼 렌더링 */}
        {isLastPage && <button disabled>마지막</button>}
      </div>
    </div>
  );
};

export default PagingBoard;
