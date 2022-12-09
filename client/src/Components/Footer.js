import React from "react";
import { HiBuildingStorefront, HiPhone, HiClock } from "react-icons/hi2";

function Footer() {
    return (
        <footer>
            <div className="d-flex justify-content-evenly mpt-3">
                <p>
                    <HiBuildingStorefront color="black" size={50} /> <b> 81 Market St </b>
                </p>
                <p>
                    <HiPhone color="black" size={50} />  <b> 640 348 7070</b>
                </p>
                <p>
                    <HiClock color="black" size={50} />  <b> Tue-Sun: 12pm-10pm</b>
                </p>
            </div>
        </footer>
    )
}

export default Footer;
