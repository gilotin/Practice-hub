import { useState, useEffect } from "react";
export function TimePracticeDisplay() {
    const [showCountdown, setShowCountdown] = useState<boolean>(false);
    const [lockButton, setLockButton] = useState<boolean>(false);
    const [delayedStart, setDelayedStart] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [score, setScore] = useState<string>("0");

    const LOWER_INTEGER: number = 1;

    function generateNumber() {
        return (Math.floor(Math.random() * 3) + LOWER_INTEGER) * 1000;
    }

    useEffect(() => {
        setDelayedStart((prevState) => generateNumber());
    }, []);

    function OnClickStartBtn(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLockButton((prevState) => true);
        setTimeout(() => {
            setShowCountdown((prevState) => !prevState);
            setStartTime((prevState) => generateTime());
        }, delayedStart);
    }

    function onClickResetBtn(e: React.MouseEvent<HTMLButtonElement>) {
        setDelayedStart(generateNumber());
        setShowCountdown(false);
        setLockButton(false);
        setStartTime(0);
        setScore("0");
    }

    function handleSpeedClickButton() {
        const clickTime = generateTime();
        const result = (clickTime - startTime).toFixed();
        setScore(result);
    }

    function generateTime() {
        const generateTime = performance.now();
        return generateTime;
    }

    return (
        <>
            <div className="wrapper-time-practice">
                <section className="score-board">
                    <p>Best time: {score} ms </p>
                </section>
                {lockButton && showCountdown ? (
                    <section onClick={handleSpeedClickButton} className="game-section">
                        <p className="glow-text">Click!!!</p>
                    </section>
                ) : (
                    <section className="game-section">
                        <p className="glow-text">Press Start</p>
                    </section>
                )}
                <section className="user-interface">
                    <button className="start-btn" disabled={lockButton} onClick={OnClickStartBtn}>
                        START
                    </button>
                    <button className="reset-btn" onClick={onClickResetBtn}>
                        RESET
                    </button>
                </section>
            </div>
        </>
    );
}
