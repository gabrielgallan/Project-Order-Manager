import React from "react";
import './layouts.css'

function Layouts({children}) {
    return (
        <div>
            <header className="header">


            </header>
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                &copy; Maestro

            </footer>
        </div>
    )
}

export default Layouts