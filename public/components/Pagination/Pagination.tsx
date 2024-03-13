import React, { useState } from 'react';
import styles from "./pagination.module.css";

interface Props{
  elementsPerPage:number,
  dataLength:number,
  handlePagination:any,
  currentPage:number
}

export default function Pagination ({elementsPerPage, dataLength, handlePagination, currentPage}:Props) : JSX.Element {
  const paginationNumbers = [];
  const paginationsCount = Math.ceil(dataLength / elementsPerPage);
  for (let i = 1; i <= paginationsCount; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePagination(pageNumber)} className={currentPage===pageNumber ? styles.active : "" }>{pageNumber}</button>
      ))}
    </div>
  );
};