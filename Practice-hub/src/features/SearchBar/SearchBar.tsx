import type React from "react";
import { useEffect, useState } from "react";
import fetchAllPokemonNames from "../PokemonCards/api/fetchAllPokemonName";
import fetchData from "../PokemonCards/api/fetchPokemonData";
import { useDebounce } from "../../hooks/useDebounce";

type SearchBarProps = {
    setSearchResult: React.Dispatch<React.SetStateAction<string>>;
    setErrorHandler: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function SearchBar({ setSearchResult, setErrorHandler }: SearchBarProps) {
    const [allNamesList, setAllNamesList] = useState<string[] | null>(null);
    const [searchedQuery, setSearchedQuery] = useState<string>("");
    const debouncedQuarry = useDebounce(searchedQuery, 200);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getAllPokemonNames = async () => {
            fetchAllPokemonNames(signal)
                .then(setAllNamesList)
                .catch((err) => {
                    if (err instanceof Error && err.name !== "AbortError") {
                        setErrorHandler(err.message);
                    }
                });
        };
        getAllPokemonNames();
        return () => {
            controller.abort();
        };
    }, []);

    function search(formData: FormData) {
        const searchedResult = formData.get("query");

        if (typeof searchedResult === "string") {
            return setSearchResult(searchedResult);
        }
    }

    function OnChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        let value = e.target.value;
        setSearchedQuery(value);
    }

    function handleListClick(e: React.MouseEvent<HTMLLIElement>) {
        const currentSearch = e.currentTarget.textContent;
        setSearchedQuery("");
        setSearchResult(currentSearch);
    }

    function filteredList() {
        const results = allNamesList?.filter((name) => {
            return name.toLocaleLowerCase().includes(debouncedQuarry.toLocaleLowerCase());
        });

        return results?.slice(0, 10)?.map((itemName) => {
            return (
                <li
                    tabIndex={0}
                    role="button"
                    aria-label={`Select Pokémon ${itemName}`}
                    onClick={(e) => handleListClick(e)}
                    key={itemName}
                >
                    {itemName}
                </li>
            );
        });
    }

    return (
        <>
            <div className="wrapper">
                <h1>Pokemon Cards</h1>
                <form action={search}>
                    <input
                        value={searchedQuery}
                        onChange={(e) => OnChangeSearch(e)}
                        type="text"
                        name="query"
                        placeholder="Enter name or ID"
                    />
                    <button type="submit">SEARCH</button>
                    {!searchedQuery ? "" : <ul>{filteredList()}</ul>}
                </form>
            </div>
        </>
    );
}
