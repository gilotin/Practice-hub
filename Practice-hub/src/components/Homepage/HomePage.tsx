import styles from "./Homepage.module.css";

export function HomePage() {
    return (
        <>
            <section className={styles.homePage}>
                <p>
                    Hi! I'm Nikolay, and this is my practice playground for learning new tech. Here
                    I'm testing different technologies and code patterns. If you want to know more
                    about my projects you can check my{" "}
                    <a
                        className={styles.homePageAnchor}
                        href="https://github.com/gilotin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    .{" "}
                </p>
            </section>
        </>
    );
}
