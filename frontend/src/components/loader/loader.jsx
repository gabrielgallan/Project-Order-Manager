import React from "react";
import './loader.css'

function Loader({userName}) {
    return (
            <div className="loader-container">
                    <div class="spinner"></div>
                    <p className="welcome">Bem-vindo {userName}</p>
            </div>
    )
}

export default Loader