import React from "react";
import './loader.css'

function Loader({user}) {
    return (
            <div className="loader-container">
                    <div class="spinner"></div>
                    <p className="welcome">Bem-vindo {user.name}</p>
            </div>
    )
}

export default Loader