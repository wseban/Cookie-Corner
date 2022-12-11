import React from "react";
import CookieMonster from "../assets/CookieMonster.png";


export default function Home() {

    return (
        <div className="container pt-5">
            <div className="d-flex flex-row align-items-center">
            <div className="col-6">
            <img className="pt-5" style={{maxWidth: "350px" }} src={CookieMonster} alt="CookieMonster" ></img>
            </div>
            <div className="col-6 pt-5" style={{ color: "#504A6D" }}>
                <h2 style={{ fontSize:"350%"}}> <b>Our Story</b> </h2>
                <p style={{ fontSize:"150%"}}> Eveything started with a dream... A dream of baking delicious cookies everyone
                will love. With authentic cookie recipes that have stood the test of time, we have something delicious 
                cooking for you. You are only a click away from the most delicious cookie you have ever had. 
                Act quick though, get your cookie before the Cookie Monster eats it all. </p>
            </div>
            </div>
        </div>
    )

}