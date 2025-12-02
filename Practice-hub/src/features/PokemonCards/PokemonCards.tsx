import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import type { ErrorState, PokemonData } from "./types";
import styles from "./PokemonCard.module.css";
import { mapToList } from "./helper/mapToList";
import fetchData from "./api/fetchPokemonData";
import { pokemonTypesMap } from "./helper/PokemonTypesMap";

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
                console.log(data);
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
            <div>{capitalizeFirstLetter(stat.stat.name)}:</div> {stat.base_stat}
        </li>
    ));

    const pokemonTypes = mapToList(pokemonData?.types, (type, i) => (
        <li key={i}>
            <img
                height="30px"
                width="30px"
                src={pokemonTypesMap[type.type.name]}
                alt={type.type.name}
                title={type.type.name}
            />
        </li>
    ));

    function capitalizeFirstLetter(string: string | undefined) {
        if (string === undefined) {
            return;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <SearchBar setSearchResult={setSearchResult} setErrorHandler={setErrorHandler} />
            {errorHandler.hasError ? (
                <div className={styles.pokemonCard}>
                    <img className={styles.pokemonCardBack} src="/poketball.png" alt="" />
                    <p className={styles.pokemonCardText}>{errorHandler?.message}</p>
                </div>
            ) : (
                <div className={styles.pokemonCard}>
                    <div className={styles.blackBorder}>
                        {" "}
                        <section className={styles.pokemonCardFront}>
                            <h2 className={styles.pokemonCardHeader}>
                                {capitalizeFirstLetter(pokemonData?.name)}
                            </h2>
                            <div className={styles.imageBorder}>
                                <ul className={styles.pokemonCardTypes}>{pokemonTypes}</ul>
                                <img
                                    className={styles.pokemonCardImg}
                                    src={
                                        pokemonData?.sprites?.other["official-artwork"]
                                            .front_default
                                    }
                                    alt={`pokemon named ${pokemonData?.name}`}
                                />
                            </div>

                            <ul className={styles.pokemonCard__stats}>{pokemonStats}</ul>
                            <ul className="pokemon-card__measures">
                                <li>
                                    <div>Height:</div> {pokemonData?.height}
                                </li>
                                <li>
                                    <div>Weight:</div>
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
