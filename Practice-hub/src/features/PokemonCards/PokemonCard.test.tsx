import { describe, it, expect, vi, MockedFunction } from "vitest";
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
        { base_stat: 49, stat: { name: "defense" } },
        { base_stat: 65, stat: { name: "special-attack" } },
        { base_stat: 65, stat: { name: "special-defense" } },
        { base_stat: 45, stat: { name: "speed" } },
    ],
    sprites: {
        other: {
            "official-artwork": {
                front_default: "/fake.png",
            },
        },
    },
};

describe("PokemonCard - API Rendering", () => {
    it.each([
        ["name", "bulbasaur", "header"],
        ["hp", 45, "stat"],
        ["attack", 49, "stat"],
        ["defense", 49, "stat"],
        ["special-attack", 65, "stat"],
        ["special-defense", 65, "stat"],
        ["speed", 45, "stat"],
    ])("renders %s correctly", async (statName, value, type) => {
        const mockedFetch = fetchData as MockedFunction<typeof fetchData>;
        mockedFetch.mockResolvedValue(fakeData);

        render(<PokemonCard />);

        if (type === "header") {
            expect(await screen.findByText(/Bulbasaur/i)).toBeInTheDocument();
        }

        if (type === "stat") {
            await screen.findByText(/hp/i);

            const allListItems = screen.getAllByRole("listitem");

            const normalizedStatName = statName.toString().replace(/-/g, "[\\s-]");
            const regex = new RegExp(`${normalizedStatName}:\\s*${value}`, "i");

            const statElement = allListItems.find((li) => {
                const text = li.textContent || "";
                return regex.test(text);
            });

            expect(statElement).toBeDefined();
            expect(statElement).toBeInTheDocument();
        }
    });

    it("renders height & weight", async () => {
        const mockedFetch = fetchData as MockedFunction<typeof fetchData>;
        mockedFetch.mockResolvedValue(fakeData);

        render(<PokemonCard />);

        await screen.findByText(/height/i);

        expect(screen.getByText(/height:/i)).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();

        expect(screen.getByText(/weight:/i)).toBeInTheDocument();
        expect(screen.getByText("69")).toBeInTheDocument();
    });

    it("renders the pokemon artwork", async () => {
        const mockedFetch = fetchData as MockedFunction<typeof fetchData>;
        mockedFetch.mockResolvedValue(fakeData);

        render(<PokemonCard />);

        const img = await screen.findByAltText(/pokemon named bulbasaur/i);
        expect(img).toHaveAttribute("src", "/fake.png");
    });
});
