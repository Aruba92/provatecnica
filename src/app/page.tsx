'use client';

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Pagination from "../../public/components/Pagination/Pagination";
import PokemonElement from "../../public/components/PokemonElement/pokemonElement";
import Pokemon from "../../public/types/Pokemon";

export default function Home() {

  /*Fetch Data*/
  const [data, setData] = useState<Pokemon[]>([]);
  /*ViewType*/
  const [viewType, setViewType] = useState<string>("list");
  const elementsPerPageList:number = 10;
  const elementsPerPageGrid:number = 40;
  /*Pagination*/
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [elementsPerPage, setElementsPerPage] = useState<number>(elementsPerPageList);
  //const [dataLength, setDataLength] = useState<number>(0);
  
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=80')
      .then(response => response.json())
      .then(json => setData(json.results))
      .catch(error => console.error(error));
  }, [])
  
  function handlePagination (pageNumber:number) {
    setCurrentPage(pageNumber);
  }

  function setView(type:string){
    if (type==="list") {
      setViewType("list");
      setElementsPerPage(elementsPerPageList);
      setCurrentPage(1);
    }else{
      setViewType("grid");
      setElementsPerPage(elementsPerPageGrid);
      setCurrentPage(1);
    }
  }

  return (
    <main className={styles.main}>
      <h1>Llista de Pokemons</h1>
      <div className={styles.viewButtons}>
        <button className={viewType==="list" ? styles.active:""} onClick={()=>setView("list")}>List</button>
        <button className={viewType==="grid" ? styles.active:""} onClick={()=>setView("grid")}>Grid</button>
      </div>

      <div className={`${styles.pokemonsBox} ${viewType==="list" ? styles.pokemonsBoxList : styles.pokemonsBoxGrid}`}>
        <PokemonElement pokemonList={data.slice((currentPage-1)*elementsPerPage, currentPage*elementsPerPage)}></PokemonElement>
      </div>

      <Pagination elementsPerPage={elementsPerPage} dataLength={Object.keys(data).length} handlePagination={handlePagination} currentPage={currentPage}></Pagination>
    </main>
  );
}
