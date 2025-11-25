import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

export function Navigation() {
    return (
        <>
            <nav>
                <ul className={styles.nav}>
                    <li>
                        <NavLink to="/pokemon-card">Pokemon Cards</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mood-tracker">Mood Tracker</NavLink>
                    </li>
                    <li>
                        <NavLink to="/time-practice">Time Practice</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}
