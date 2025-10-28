import { useEffect, useState, type MouseEventHandler } from "react";

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

export function PokemonCard() {
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

    const url: string = `https://pokeapi.co/api/v2/pokemon/${"1"}`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            try {
                const response = await fetch(url, { signal });
                if (!response.ok) {
                    throw new Error(`Response status:${response.status}`);
                }
                const data = await response.json();
                setPokemonData(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    if (err.name !== "AbortError") {
                        console.error(err);
                    }
                }
            }
        }

        fetchData();
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

    return (
        <>
            {console.log(pokemonData)}
            <div className="wrapper">
                <h1>Pokemon Cards</h1>
                <form method="POST">
                    <input type="text" placeholder="Pokemon..." />
                    <button>SEARCH</button>
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
