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
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<div>Welcome! Choose a feature from the menu.</div>}
                        />
                        <Route path="/pokemon-card" element={<PokemonCard />} />
                        <Route path="/mood-tracker" element={<MoodTracker />} />
                        <Route path="/time-practice" element={<TimePracticeDisplay />} />
                        <Route path="*" element={<div>404 - Page Not Found</div>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
