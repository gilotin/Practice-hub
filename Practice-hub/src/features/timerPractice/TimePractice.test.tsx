import { describe, expect, it, vi, afterEach } from "vitest";
import { TimePractice } from "./TimePractice";
import * as TimePracticeModule from "./TimePractice";
import { act, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const ui = {
    startBtn: () => screen.getByRole("button", { name: /start/i }),
    resetBtn: () => screen.getByRole("button", { name: /reset/i }),
};

describe("TimePractice testing start button functionality", () => {
    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("disabled after pressing start button", async () => {
        render(<TimePractice />);
        const user = userEvent.setup();

        expect(ui.startBtn()).toBeEnabled();

        await user.click(ui.startBtn());

        expect(ui.startBtn()).toBeDisabled();
    });

    // This test was written partially from Claude

    it("tests timers and changing game section", () => {
        vi.useFakeTimers();

        let mockTime = 0;
        vi.spyOn(performance, "now").mockImplementation(() => {
            return mockTime;
        });

        vi.spyOn(TimePracticeModule, "generateRandomDelay").mockReturnValue(1000);

        render(<TimePractice />);

        expect(screen.getByText(/Press Start/i)).toHaveTextContent(/Press Start/i);
        expect(ui.startBtn()).toBeEnabled();

        act(() => {
            fireEvent.click(ui.startBtn());
        });

        expect(ui.startBtn()).toBeDisabled();

        act(() => {
            mockTime = 1000;
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText(/click/i)).toBeInTheDocument();
    });

    it("tests game section enable/disable functionality", async () => {
        render(<TimePractice />);

        const user = userEvent.setup();
        expect(screen.getByText(/press start/i)).toBeInTheDocument();

        await user.click(ui.startBtn());
        expect(await screen.findByText(/click/i, {}, { timeout: 5000 })).toBeInTheDocument();

        const clickText = await screen.findByText(/click/i, {}, { timeout: 5000 });
        expect(clickText).toBeInTheDocument();

        const scoreDisplay = screen.getByText(/best time:/i);
        await user.click(clickText);

        expect(scoreDisplay).not.toHaveTextContent(/0 ms /);
    });
});
