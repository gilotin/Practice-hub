import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import type { ErrorState, PokemonData } from "./types";
import styles from "./PokemonCard.module.css";
import { mapToList } from "./helper/mapToList";
import fetchData from "../../api/fetchPokemonData";

export function PokemonCard() {
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [searchResult, setSearchResult] = useState<string>("1");
    const [errorHandler, setErrorHandler] = useState<ErrorState>({ hasError: false, message: "" });

    const url: string = `https://pokeapi.co/api/v2/pokemon/${searchResult}`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getPokemonData = async () => {
            try {
                const data = await fetchData<PokemonData>(url, signal);
                setPokemonData(data);
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setErrorHandler({ hasError: true, message: err.message });
                }
            }
        };
        getPokemonData();

        return () => {
            controller.abort();
        };
    }, [url]);

    const pokemonStats = mapToList(pokemonData?.stats, (stat, i) => (
        <li key={i}>
            {stat.stat.name}: {stat.base_stat}
        </li>
    ));

    const pokemonTypes = mapToList(pokemonData?.types, (type, i) => (
        <li key={i}> {type.type.name}</li>
    ));

    return (
        <>
            {console.log(errorHandler)}
            <SearchBar setSearchResult={setSearchResult} setErrorHandler={setErrorHandler} />
            <section className={styles.pokemon_card}>
                <div className="pokemon__wrapper">
                    <h2 className="pokemon-card__header">{pokemonData?.name}</h2>
                    <img
                        width="200px"
                        // width is hard coded for now !!!
                        src={pokemonData?.sprites?.other["official-artwork"].front_default}
                        alt={`pokemon named${pokemonData?.name}`}
                    />
                    <ul className="pokemon-card__types">{pokemonTypes}</ul>

                    <ul className="pokemon-card__stats">{pokemonStats}</ul>
                    <ul className="pokemon-card__measures">
                        <li>height: {pokemonData?.height}</li>
                        <li>weight {pokemonData?.weight}</li>
                    </ul>
                </div>
            </section>
        </>
    );
}
