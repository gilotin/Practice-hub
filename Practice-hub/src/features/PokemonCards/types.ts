export type PokemonData = {
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

export type PokemonListItem = {
    name: string;
    url: string;
};

export type PokemonListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
};
