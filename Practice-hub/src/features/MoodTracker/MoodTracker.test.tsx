import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MoodTracker } from "./MoodTracker";
import userEvent from "@testing-library/user-event";

//NOTE: This is the first test for learning purposes and it's wrote by GPT-5.

// Undo Button test:

describe("MoodTracker - undoMood", () => {
    it("removes the most recent mood when undo is clicked", async () => {
        render(<MoodTracker />);
        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: "Happy" }));
        await user.click(screen.getByRole("button", { name: "Sad" }));

        // Initial state: Sad (most recent)
        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Sad");

        await user.click(screen.getByRole("button", { name: "Undo" }));

        // Now Happy should be the top mood
        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Happy");
    });

    it("clears mood history when only one mood exists", async () => {
        render(<MoodTracker />);
        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: "Calm" }));

        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Calm");

        await user.click(screen.getByRole("button", { name: "Undo" }));

        // Expect history cleared
        expect(screen.queryByText(/Most recent mood:/)).not.toHaveTextContent(/Calm/);
    });

    it("does nothing when history is empty", async () => {
        render(<MoodTracker />);
        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: "Undo" }));

        // Should not crash or show any mood
        expect(screen.getByText(/Mood History:/)).toHaveTextContent("Mood History:");
    });
});

// OnclickHandler

describe("MoodTracker - mood buttons", () => {
    it.each([["Happy"], ["Sad"], ["Angry"], ["Calm"], ["Tired"]])(
        "updates mood to %s clicked",
        async (mood) => {
            render(<MoodTracker />);

            const button = screen.getByRole("button", { name: mood });

            await userEvent.click(button);

            expect(screen.getByText(/Most recent mood:/)).toHaveTextContent(
                `Most recent mood: ${mood}`
            );
        }
    );
});

// Testing Effects (updating mood History)

describe("MoodTracker - updated history", () => {
    it("shows empty history after the update and most recent mood to none", async () => {
        render(<MoodTracker />);
        expect(screen.getByText(/Mood History:/)).toHaveTextContent("Mood History:");
        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: none");
    });

    it("updates the history and the recent mood", async () => {
        render(<MoodTracker />);
        const button = screen.getByRole("button", { name: "Happy" });

        await userEvent.click(button);

        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: Happy");

        const historySection = screen.getByText("Mood History:").parentElement;

        if (!historySection) {
            throw new Error("history section not found");
        }

        const happyResult = within(historySection).getByText("Happy");
        expect(happyResult).toHaveTextContent("Happy");
    });

    it("updates recent mood after pressing different moods", async () => {
        render(<MoodTracker />);

        function moodButtons(name: string) {
            return screen.getByRole("button", { name: name });
        }

        await userEvent.click(moodButtons("Happy"));
        await userEvent.click(moodButtons("Calm"));
        await userEvent.click(moodButtons("Sad"));

        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: Sad");

        await userEvent.click(moodButtons("Undo"));

        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: Calm");

        await userEvent.click(moodButtons("Undo"));
        await userEvent.click(moodButtons("Undo"));

        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: none");
    });
});
