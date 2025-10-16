import { useState, useEffect } from "react";
export function TimePracticeDisplay() {
    return (
        <>
            <div className="wrapper-time-practice ">
                <section className="score-board">
                    <p>Best time: 234ms </p>
                </section>
                <section className="game-section">
                    <div className="display-section">
                        <p className="glow-text">wait...</p>
                    </div>
                </section>
                <section className="user-interface">
                    <button className="start-btn">START</button>
                    <button className="reset-btn">RESET</button>
                </section>
            </div>
        </>
    );
}
