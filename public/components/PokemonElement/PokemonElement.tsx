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
                <p key={index} className={styles.pokemonElement}>{element.name}</p>
            ))}
        </>
    );
}