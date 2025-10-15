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
            <div className="wrapper">
                <section className="moods">
                    <button id="happy" onClick={onClickHandler} className="btn">
                        Happy
                    </button>
                    <button id="sad" onClick={onClickHandler} className="btn">
                        Sad
                    </button>
                    <button id="tired" onClick={onClickHandler} className="btn">
                        Tired
                    </button>
                    <button id="angry" onClick={onClickHandler} className="btn">
                        Angry
                    </button>
                    <button id="calm" onClick={onClickHandler} className="btn">
                        Calm
                    </button>
                </section>
                <section className="redact">
                    <button id="undo" onClick={undoMood} className="btn">
                        Undo
                    </button>
                </section>
                <section className="history">
                    <p>Mood History:</p>
                    <p>{moodHistory.join(", ")}</p>
                </section>

                <section className="top-mood">
                    <p>
                        Most recent mood: <span className="highlight-mood">{topMood}</span>
                    </p>
                </section>
            </div>
        </>
    );
}
