import styles from "./TimePractice.module.css";
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
        setDelayedStart(generateNumber());
    }, []);

    function OnClickStartBtn(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLockButton(true);
        setTimeout(() => {
            setShowCountdown((prevState) => !prevState);
            setStartTime(generateTime());
        }, delayedStart);
    }

    function onClickResetBtn() {
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
            <div className={styles.timePracticeWrapper}>
                <section className={styles.scoreBoard}>
                    <p>Best time: {score} ms </p>
                </section>
                {lockButton && showCountdown ? (
                    <section onClick={handleSpeedClickButton} className={styles.gameSection}>
                        <p className={styles.glowText}>Click!!!</p>
                    </section>
                ) : (
                    <section className={styles.gameSection}>
                        <p className={styles.glowText}>Press Start</p>
                    </section>
                )}
                <section className={styles.userInterface}>
                    <button
                        className={styles.startButton}
                        disabled={lockButton}
                        onClick={OnClickStartBtn}
                    >
                        START
                    </button>
                    <button className={styles.resetButton} onClick={onClickResetBtn}>
                        RESET
                    </button>
                </section>
            </div>
        </>
    );
}
