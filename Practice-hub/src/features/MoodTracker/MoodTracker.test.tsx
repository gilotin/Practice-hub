import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MoodTracker } from "./MoodTracker";

describe("MoodTracker - undoMood function", () => {
    it("should remove the most recent mood when undo is clicked", () => {
        render(<MoodTracker />);

        const happyButton = screen.getByRole("button", { name: "Happy" });
        const sadButton = screen.getByRole("button", { name: "Sad" });

        fireEvent.click(happyButton);
        fireEvent.click(sadButton);

        // Check mood history
        expect(screen.getByText("Sad, Happy")).toBeInTheDocument();

        const undoButton = screen.getByText("Undo");
        fireEvent.click(undoButton);

        // After undo, only Happy should remain
        expect(screen.queryByText("Sad, Happy")).not.toBeInTheDocument();
        const historySection = screen.getByText(/Mood History:/).parentElement;
        expect(historySection).toHaveTextContent("Happy");
    });

    it("should handle undo when there is only one mood", () => {
        render(<MoodTracker />);

        const calmButton = screen.getByRole("button", { name: "Calm" });
        fireEvent.click(calmButton);

        // Verify mood is in history
        let historySection = screen.getByText(/Mood History:/).parentElement;
        expect(historySection).toHaveTextContent("Calm");

        const undoButton = screen.getByText("Undo");
        fireEvent.click(undoButton);

        // History should be empty
        historySection = screen.getByText(/Mood History:/).parentElement;
        expect(historySection?.textContent).toBe("Mood History:");
    });

    it("should handle undo when mood history is already empty", () => {
        render(<MoodTracker />);

        const undoButton = screen.getByText("Undo");
        fireEvent.click(undoButton);

        // Should not crash, history stays empty
        const historySection = screen.getByText(/Mood History:/).parentElement;
        expect(historySection?.textContent).toBe("Mood History:");
    });

    it("should update topMood correctly after undo", () => {
        render(<MoodTracker />);

        const happyButton = screen.getByRole("button", { name: "Happy" });
        const angryButton = screen.getByRole("button", { name: "Angry" });

        fireEvent.click(happyButton);
        fireEvent.click(angryButton);

        // Top mood should be "Angry"
        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: Angry");

        const undoButton = screen.getByText("Undo");
        fireEvent.click(undoButton);

        // Top mood should now be "Happy"
        expect(screen.getByText(/Most recent mood:/)).toHaveTextContent("Most recent mood: Happy");
    });
});
