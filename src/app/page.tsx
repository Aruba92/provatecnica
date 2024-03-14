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
  let viewTypeValue = "list";
  if (window.localStorage.getItem("viewType")){
    viewTypeValue = window.localStorage.getItem("viewType")!;
  }
  const [viewType, setViewType] = useState<string>(viewTypeValue);
  /*Pagination*/
  let currentPageValue = 1;
  if (window.localStorage.getItem("currentPage")){
    currentPageValue = parseInt(window.localStorage.getItem("currentPage")!);
  }
  const [currentPage, setCurrentPage] = useState<number>(currentPageValue);
  /* const [elementsPerPage, setElementsPerPage] = useState<number>(10); */
  const elementsPerPage:number = 40;
  
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=160')
      .then(response => response.json())
      .then(json => setData(json.results))
      .catch(error => console.error(error));
  }, [])

  useEffect(()=>{
    window.localStorage.setItem("currentPage", currentPage.toString());
  },[currentPage])
  useEffect(()=>{
    window.localStorage.setItem("viewType", viewType);
  },[viewType])
  
  function handlePagination (pageNumber:number) {
    setCurrentPage(pageNumber);
  }

  function setView(type:string){
    if (type==="list") {
      setViewType("list");
      setCurrentPage(1);
    }else{
      setViewType("grid");
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

      <div className={viewType==="list" ? styles.pokemonsBoxList : styles.pokemonsBoxGrid}>
        <PokemonElement pokemonList={data.slice((currentPage-1)*elementsPerPage, currentPage*elementsPerPage)}></PokemonElement>
      </div>

      <Pagination elementsPerPage={elementsPerPage} dataLength={Object.keys(data).length} handlePagination={handlePagination} currentPage={currentPage}></Pagination>
    </main>
  );
}
