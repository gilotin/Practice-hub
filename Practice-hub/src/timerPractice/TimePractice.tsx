import { useState, useEffect } from "react";
export function TimePracticeDisplay() {
    const [showCountdown, setShowCountdown] = useState(false);
    const [lockButton, setLockButton] = useState(false);
    const [delayedStart, setDelayedStart] = useState(Number);

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
        }, delayedStart);
    }

    function onClickResetBtn(e: React.MouseEvent<HTMLButtonElement>) {
        setDelayedStart((prevState) => generateNumber());
        setShowCountdown((prevState) => false);
        setLockButton((prevState) => false);
    }

    return (
        <>
            <div className="wrapper-time-practice ">
                <section className="score-board">
                    <p>Best time: 234ms </p>
                </section>
                <section className="game-section">
                    <div className="display-section">
                        <p className="glow-text">{showCountdown ? "Click!" : "press Start"}</p>
                    </div>
                </section>
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
