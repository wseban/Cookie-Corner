import React from "react";
import { HiBuildingStorefront, HiPhone, HiClock } from "react-icons/hi2";

function Footer() {
    return (
        <footer className="fixed-bottom">
            <div className="d-flex justify-content-evenly pb-3">
                <p>
                    <HiBuildingStorefront color="black" size={50} /> <b> 81 Market St, San Francisco </b>
                </p>
                <p>
                    <HiPhone color="black" size={50} />  <b> (123) 456 7890 </b>
                </p>
                <p>
                    <HiClock color="black" size={50} />  <b> Open Tue-Sun: 12pm-10pm</b>
                </p>
            </div>
        </footer>
    )
}

export default Footer;
