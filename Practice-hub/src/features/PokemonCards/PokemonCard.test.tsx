import { describe, it, expect, MockedFunction, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonCard } from "./PokemonCards";
import fetchData from "./api/fetchPokemonData";

vi.mock("./api/fetchPokemonData", () => ({
    default: vi.fn(),
}));

vi.mock("./api/fetchAllPokemonName", () => ({
    default: vi.fn().mockResolvedValue([]),
}));

const fakeData = {
    name: "bulbasaur",
    height: 7,
    weight: 69,
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [
        { base_stat: 45, stat: { name: "hp" } },
        { base_stat: 49, stat: { name: "attack" } },
    ],
    sprites: {
        other: {
            "official-artwork": {
                front_default: "/fake.png",
            },
        },
    },
};

describe("PokemonCard", () => {
    it("loads initial data from the API", async () => {
        // 1. Make the mock return fake data
        const mockedFetchData = fetchData as MockedFunction<typeof fetchData>;
        mockedFetchData.mockResolvedValue(fakeData);

        // 2. Render the component
        render(<PokemonCard />);
        screen.debug();
        // 3. Wait for UI to update

        // 4. You will write your own expectations below:
        expect(await screen.findByText(/Bulbasaur/i)).toBeInTheDocument();

        // Add your own:
        // - image
        // - height
        // - weight
        // - stats
    });
});
