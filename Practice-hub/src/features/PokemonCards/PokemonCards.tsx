import { useEffect, useState, type JSX } from "react";
import fetchData from "./api/fetchpokemonData";

type PokemonData = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    height: number;
    weight: number;
    stats: [
        {
            base_stat: number;
            stat: {
                name: string;
            };
        }
    ];
    types: [
        {
            type: {
                name: string;
            };
        }
    ];
};

type allNamesList = {
    results: {
        names: string;
    };
};

export function PokemonCard() {
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [allNamesList, setAllNamesList] = useState<allNamesList | null>(null);
    const [searchResult, getSearchResult] = useState<string>("1");
    const [errorHandler, setErrorHandler] = useState<string | null>(null);

    const url: string = `https://pokeapi.co/api/v2/pokemon/${searchResult}`;
    const fetchAllNamesUrl: string = "https://pokeapi.co/api/v2/pokemon/?limit=10000";

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getPokemonData = async () => {
            try {
                const data = await fetchData<PokemonData>(url, signal);
                setPokemonData(data);
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setErrorHandler(err.message); // component decides how to show errors
                }
            }
        };
        getPokemonData();

        return () => {
            controller.abort();
        };
    }, [url]);

    // LATTER TO ABSTRACT THE MAPS!!!
    const pokemonStats = pokemonData?.stats.map((pokemonStats, statId) => {
        return (
            <li key={statId}>
                {pokemonStats?.stat.name}:{pokemonStats?.base_stat}
            </li>
        );
    });

    const pokemonTypes = pokemonData?.types.map((pokemonType, typeId) => {
        return <li key={typeId}>{pokemonType?.type.name}</li>;
    });

    function search(formData: FormData) {
        const query = formData.get("query");

        if (typeof query === "string") {
            getSearchResult(query);
        }
    }

    return (
        <>
            <div className="wrapper">
                <h1>Pokemon Cards</h1>
                <form action={search}>
                    <input type="text" name="query" placeholder="Enter name or ID" />
                    <button type="submit">SEARCH</button>
                </form>
            </div>

            <section className="pokemon-card">
                <div className="wrapper">
                    <h2 className="pokemon-card__header">{pokemonData?.name}</h2>
                    <img
                        width="200px"
                        // hard coded for now !!!
                        src={pokemonData?.sprites?.other["official-artwork"].front_default}
                        alt={`pokemon named${pokemonData?.name}`}
                    />
                    <p className="pokemon-card__description">some description with flavour text</p>
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
