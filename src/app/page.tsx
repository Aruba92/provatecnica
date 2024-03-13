'use client';

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Pagination from "../../public/components/Pagination/Pagination";
import PokemonElement from "../../public/components/PokemonElement/PokemonElement";
import Pokemon from "../../public/types/Pokemon";

export default function Home() {

  /*Fetch Data*/
  const [data, setData] = useState<Pokemon[]>([]);
  const urlLimit:string = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  /*Pagination*/
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [elementsPerPage, setElementsPerPage] = useState<number>(40);
  const [dataLength, setDataLength] = useState<number>(0);
  /*ViewType*/
  const [viewType, setViewType] = useState<string>("list");
  
  
  useEffect(() => {
    fetch(urlLimit)
      .then(response => response.json())
      .then(json => setData(json.results))
      .catch(error => console.error(error));
  }, [])
  
  function handlePagination (pageNumber:number) {
    setCurrentPage(pageNumber);
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>Llista de Pokemons</h1>
        <button className={styles.listViewButton}></button>
        <button className={styles.gridViewButton}></button>
      </div>
      <div className={styles.pokemons}>
        <PokemonElement pokemonList={data.slice((currentPage-1)*elementsPerPage, currentPage*elementsPerPage)}></PokemonElement>
      </div>
      <Pagination elementsPerPage={elementsPerPage} dataLength={Object.keys(data).length} handlePagination={handlePagination} currentPage={currentPage}>
      </Pagination>
    </main>
  );
}
