import React from "react";
import { Container } from "react-bootstrap";
import { HiBuildingStorefront, HiPhone, HiClock } from "react-icons/hi2";

function Footer() {
    return (
        <Container className="col-12 min-h-100 d-flex flex-column justify-content-end" >
            <footer className="col-12" style={{ backgroundColor: "#504A6D" }}>
                <div className="d-flex justify-content-evenly pt-2" style={{ color: "#eaded2" }}>
                    <p>
                        <HiBuildingStorefront color="#eaded2" size={50} /> <b> 81 Market St, San Francisco </b>
                    </p>
                    <p>
                        <HiPhone color="#eaded2" size={50} />  <b> (123) 456 7890 </b>
                    </p>
                    <p>
                        <HiClock color="#eaded2" size={50} />  <b> Open Tue-Sun: 12pm-10pm </b>
                    </p>
                </div>
            </footer>
        </Container >
    )
}

export default Footer;
