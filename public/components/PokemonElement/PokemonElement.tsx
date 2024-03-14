import React from 'react';
import Pokemon from "../../types/Pokemon";
import styles from "./pokemonElement.module.css";
import { useRouter } from 'next/navigation';

interface Props{
    pokemonList:Pokemon[]
}

export default function PokemonElement ( {pokemonList}:Props ) :JSX.Element {
    let href = "";
    const router = useRouter();
    
    const handleClick = (e:any, pokemonName:string) => {
        href = "/pokemonDetail/?pokemonName=" + pokemonName;
        e.preventDefault();
        router.push(href);
    }

    return(
        <>
            {pokemonList.map((element:any, index:number) => (
                <a href={href} onClick={()=>handleClick(event, element.name)} key={index}>
                    <p className={styles.pokemonElement}>{element.name}</p>
                </a>
            ))}
        </>
    );
}