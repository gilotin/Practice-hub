import { useEffect, useState } from "react";

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

    const url: string = `https://pokeapi.co/api/v2/pokemon/${searchResult}`;
    const fetchAllNamesUrl: string = "https://pokeapi.co/api/v2/pokemon/?limit=10000";

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData<T>(
            url: string,
            setState: React.Dispatch<React.SetStateAction<T>>,
            signal: AbortSignal
        ) {
            try {
                const response = await fetch(url, { signal });
                if (response.status === 404) {
                    throw new Error(`Your Pokomen is in another ball. Try again.`);
                    // add Error state and visualize it
                }
                if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
                const data = await response.json();
                setState(data);
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== "AbortError") {
                    console.error(err.message);
                }
            }
        }

        fetchData(url, setPokemonData, signal);
        fetchData(fetchAllNamesUrl, setAllNamesList, signal);

        return () => {
            controller.abort();
        };
    }, [url]);

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
            {console.log(pokemonData)}
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
                    <ul className="pokemon-card__abilities">
                        <li>Attack1:</li>
                        <li>Attack2:</li>
                    </ul>
                </div>
            </section>
        </>
    );
}
