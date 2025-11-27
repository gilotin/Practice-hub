import styles from "./MoodTracker.module.css";
import { useEffect, useState } from "react";

export function MoodTracker() {
    const [moodHistory, setMoodHistory] = useState<string[]>([]);
    const [topMood, setTopMood] = useState<string>("none");

    useEffect(() => {
        if (moodHistory.length === 0) {
            setTopMood("none");
            return;
        }

        const counts: Record<string, number> = {};
        let maxCount = 0;
        let top = moodHistory[0];

        for (const mood of moodHistory) {
            counts[mood] = (counts[mood] || 0) + 1;
            if (counts[mood] > maxCount) {
                maxCount = counts[mood];
                top = mood;
            }
        }

        setTopMood(top);
    }, [moodHistory]);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let mood: string = e.currentTarget.id;
        mood = mood.charAt(0).toUpperCase() + mood.slice(1);
        setMoodHistory((prevState) => [mood, ...prevState]);
    };

    const undoMood = () => {
        setMoodHistory((prevState) => prevState.slice(1));
    };

    return (
        <>
            <div className={styles.moodTrackerWrapper}>
                <section className={styles.moodSectionList}>
                    <button id="happy" onClick={onClickHandler} className={styles.moodButton}>
                        Happy
                    </button>
                    <button id="sad" onClick={onClickHandler} className={styles.moodButton}>
                        Sad
                    </button>
                    <button id="tired" onClick={onClickHandler} className={styles.moodButton}>
                        Tired
                    </button>
                    <button id="angry" onClick={onClickHandler} className={styles.moodButton}>
                        Angry
                    </button>
                    <button id="calm" onClick={onClickHandler} className={styles.moodButton}>
                        Calm
                    </button>
                </section>
                <section className={styles.redact}>
                    <button id="undo" onClick={undoMood} className={styles.moodButton}>
                        Undo
                    </button>
                </section>
                <section className={styles.moodHistory}>
                    <p>Mood History:</p>
                    <p>{moodHistory.join(", ")}</p>
                </section>

                <section className={styles.topMood}>
                    <p>
                        Most recent mood: <span className={styles.moodHighlight}>{topMood}</span>
                    </p>
                </section>
            </div>
        </>
    );
}
