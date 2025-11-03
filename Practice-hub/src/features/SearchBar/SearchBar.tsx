import type React from "react";

type SearchBarProps = {
    setSearchResult: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ setSearchResult }: SearchBarProps) {
    function search(formData: FormData) {
        const searchedResult = formData.get("query");

        if (typeof searchedResult === "string") {
            return setSearchResult(searchedResult);
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
        </>
    );
}
