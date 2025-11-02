import fetchData from "./fetchPokemonData";

type PokemonListItem = {
    name: string;
    url: string;
};

type PokemonListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
};

export default async function fetchAllPokemonNames(signal: AbortSignal): Promise<string[]> {
    const maxLength = 14;
    const urls = Array.from(
        { length: maxLength },
        (_, i) => `https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${i * 100}`
    );
    const results = await Promise.all(
        urls.map((url) => fetchData<PokemonListResponse>(url, signal))
    );
    return results.flatMap((batch) => batch.results.map((p) => p.name));
}
