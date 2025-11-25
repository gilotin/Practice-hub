import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { PokemonCard } from "./features/PokemonCards/PokemonCards";
import { MoodTracker } from "./features/MoodTracker/MoodTracker";
import { TimePracticeDisplay } from "./features/timerPractice/TimePractice";
import { Navigation } from "./features/Navigation/Navigation";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/pokemon-card" element={<PokemonCard />} />
                    <Route path="/mood-tracker" element={<MoodTracker />} />
                    <Route path="/time-practice" element={<TimePracticeDisplay />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
