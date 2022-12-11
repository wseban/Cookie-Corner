import React from "react";
import CookieMonster from "../assets/CookieMonster.png";


export default function Home() {

    return (
        <div className="d-flex flex-row justify-content-around align-items-center pt-3">
            <div>
            <img className="pt-3" style={{maxWidth: "300px" }} src={CookieMonster} alt="CookieMonster" ></img>
            </div>
            <div className="pt-3" style={{ color: "#504A6D" }}>
                <h2 className=""> <b>Our Story</b> </h2>
                <p className=""> Eveything started with a dream...</p>
            </div>
        </div>
    )

}