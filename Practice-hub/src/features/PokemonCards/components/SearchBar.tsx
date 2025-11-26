import type React from "react";
import { useEffect, useState } from "react";
import fetchAllPokemonNames from "../api/fetchAllPokemonName";
import { useDebounce } from "../../../hooks/useDebounce";
import type { ErrorState } from "../types";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
    setSearchResult: React.Dispatch<React.SetStateAction<string>>;
    setErrorHandler: React.Dispatch<React.SetStateAction<ErrorState>>;
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
                        setErrorHandler({ hasError: true, message: err.message });
                    }
                });
        };
        getAllPokemonNames();
        return () => {
            controller.abort();
        };
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = formData.get("query");

        if (typeof result == "string" && result != "") {
            setSearchResult(result);
        }
    }

    function OnChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        let value = e.target.value;
        setSearchedQuery(value);
    }

    function handleListClick(e: React.FormEvent<HTMLLIElement>) {
        const currentSearch = e.currentTarget.textContent;
        setSearchedQuery("");
        setSearchResult(currentSearch);
    }

    function filteredList() {
        const results = allNamesList?.filter((name) => {
            return name.toLocaleLowerCase().includes(debouncedQuarry.toLocaleLowerCase());
        });

        return results?.slice(0, 100)?.map((itemName) => {
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
            <div className={styles.searchBar}>
                <h2 className={styles.searchHeader}>Pokemon Cards</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={searchedQuery}
                        onChange={(e) => OnChangeSearch(e)}
                        type="text"
                        name="query"
                        placeholder="Enter name"
                    />

                    <button className={styles.searchBtn} type="submit">
                        <img src="/search_icon.png" alt="search icon" />
                    </button>
                    {!searchedQuery ? (
                        ""
                    ) : (
                        <ul className={styles.filteredList}>{filteredList()}</ul>
                    )}
                </form>
            </div>
        </>
    );
}
