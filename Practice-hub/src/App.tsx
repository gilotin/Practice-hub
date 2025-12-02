import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { PokemonCard } from "./features/PokemonCards/PokemonCards";
import { MoodTracker } from "./features/MoodTracker/MoodTracker";
import { TimePractice } from "./features/timerPractice/TimePractice";
import { Navigation } from "./components/Navigation/Navigation";
import { HomePage } from "./components/Homepage/HomePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pokemon-card" element={<PokemonCard />} />
                        <Route path="/mood-tracker" element={<MoodTracker />} />
                        <Route path="/time-practice" element={<TimePractice />} />
                        <Route path="*" element={<div>404 - Page Not Found</div>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
