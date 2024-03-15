'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./pokemonDetail.module.css";
import Pokemon from "../../../public/types/Pokemon";
import {APIPokemonService} from "../../utils/API";

export default function Page () :JSX.Element{
    const [data, setData] = useState<Pokemon>();

    const searchParams = useSearchParams();
    const pokemonName = searchParams.get("pokemonName");

    const ApiService = new APIPokemonService();
    useEffect(() => {
        ApiService.APIcallPokemon(setData, "/" + pokemonName);
        /* fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
            .then(response => response.json())
            .then(json => setData(json.forms[0]))
            .catch(error => console.error(error)); */
        }, [])

    const router = useRouter();
    const handleClick = (e:any) => {
        e.preventDefault();
        router.push("/");
    }

    function PokemonDetail () {
        if (typeof data === "object"){
            const pokemonUrlFragments:string[] = data.url.split("/");
            const pokemonId:string = data.url.split("/")[pokemonUrlFragments.length-2];
            const pokemonImgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ pokemonId +".png";
            return(
                <div className={styles.pokemonPage}>
                    <div className={styles.pokemonCard}>
                        <h2 className={styles.pokemonName}>{data.name}</h2>
                        <Image src={pokemonImgUrl} alt={data.name} width={150} height={150}></Image>
                    </div>
                    <button className={styles.homeButton} onClick={handleClick}>Home</button>
                </div>
            )
        }
    }
    
    return(
        <PokemonDetail></PokemonDetail>
    );
}