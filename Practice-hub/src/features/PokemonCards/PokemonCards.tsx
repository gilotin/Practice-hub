import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import type { ErrorState, PokemonData } from "./types";
import styles from "./PokemonCard.module.css";
import { mapToList } from "./helper/mapToList";
import fetchData from "./api/fetchPokemonData";

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
        setErrorHandler((prevState) => ({ ...prevState, hasError: false }));
        getPokemonData();

        return () => {
            controller.abort();
        };
    }, [url]);

    const pokemonStats = mapToList(pokemonData?.stats, (stat, i) => (
        <li key={i}>
            <div>{stat.stat.name.toUpperCase()}:</div> {stat.base_stat}
        </li>
    ));

    const pokemonTypes = mapToList(pokemonData?.types, (type, i) => (
        <li key={i}> {type.type.name}</li>
    ));

    return (
        <>
            <SearchBar setSearchResult={setSearchResult} setErrorHandler={setErrorHandler} />
            {errorHandler.hasError ? (
                <div className={styles.pokemon_card}>
                    <img className={styles.pokemon_card__img} src="/poketball.png" alt="" />
                    <p className={styles.pokemon_card__text}>{errorHandler?.message}</p>
                </div>
            ) : (
                <div className={styles.pokemon_card}>
                    <div className={styles.black_border}>
                        {" "}
                        <section className={styles.pokemon_card_front}>
                            <h2 className={styles.pokemon_card__header}>{pokemonData?.name}</h2>
                            <div className={styles.image_border}>
                                <ul className={styles.pokemon_card__types}>{pokemonTypes}</ul>
                                <img
                                    className={styles.pokemon_card_img}
                                    src={
                                        pokemonData?.sprites?.other["official-artwork"]
                                            .front_default
                                    }
                                    alt={`pokemon named${pokemonData?.name}`}
                                />
                            </div>

                            <ul className={styles.pokemon_card__stats}>{pokemonStats}</ul>
                            <ul className="pokemon-card__measures">
                                <li>
                                    <div>height:</div> {pokemonData?.height}
                                </li>
                                <li>
                                    <div>weight:</div>
                                    {pokemonData?.weight}
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}
