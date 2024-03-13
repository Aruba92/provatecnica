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

  for (let i = 1; i <= Math.ceil(dataLength / elementsPerPage); i++) {
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