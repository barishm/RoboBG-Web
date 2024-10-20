const Footer = () => {
    return (
        <footer className="text-center bg-body-tertiary">
            <div className="container pt-4">
                <section className="mb-4">
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.facebook.com/groups/795791053941687"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.youtube.com/@RoboBG"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-youtube"></i>
                    </a>               
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.instagram.com/robobg/"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.tiktok.com/@robobg"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-tiktok"></i>
                    </a>
                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                © 2024 Copyright: RoboBG
            </div>
        </footer>
    );
};

export default Footer;