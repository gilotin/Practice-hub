export function PokemonCard() {
    return (
        <>
            <div className="wrapper">
                <h1>Pokemon Cards</h1>
                <form method="POST">
                    <input type="text" placeholder="Pokemon..." />
                    <button>SEARCH</button>
                </form>
            </div>

            <section className="pokemon-card">
                <div className="wrapper">
                    <h2 className="pokemon-card__header">Pikachu</h2>
                    <img src="" alt="" />
                    <p className="pokemon-card__description">some description with flavour text</p>
                    <ul className="pokemon-card__types">
                        <li>grass</li>
                        <li>poison</li>
                    </ul>

                    <ul className="pokemon-card__stats">
                        <li>HP:100</li>
                        <li>Att:10</li>
                        <li>Def:50</li>
                        <li>Spd: 25</li>
                    </ul>
                    <ul className="pokemon-card__measures">
                        <li>height: 20</li>
                        <li>weight 10</li>
                    </ul>
                    <ul className="pokemon-card__abilities">
                        <li>Attack1:</li>
                        <li>Attack2:</li>
                    </ul>
                </div>
            </section>
        </>
    );
}
