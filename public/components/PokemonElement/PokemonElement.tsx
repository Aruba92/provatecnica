import React from 'react';
import Pokemon from "../../types/Pokemon";
import styles from "./pokemonElement.module.css";

interface Props{
    pokemonList:Pokemon[]
}

export default function PokemonElement ( {pokemonList}:Props ) :JSX.Element {
    return(
        <>
            {pokemonList.map((element:any, index:number) => (
                <div key={index} className={styles.pokemonElement}>
                    <p>{element.name}</p>
                </div>
            ))}
        </>
    );
}