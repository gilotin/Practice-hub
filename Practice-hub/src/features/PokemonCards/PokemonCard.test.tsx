import { describe, vi } from "vitest";
import fetchData from "./api/fetchPokemonData";

describe("Pokemon card ", () => {
    it("loads initial data from the API", async () => {
        vi.mock("fetchData", vi.fn);
    });
});
