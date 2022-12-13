import React, {useState} from 'react';
import { Container, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import { BsFillBagDashFill, BsFillBagPlusFill } from "react-icons/bs";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";



function CookieCounter(props) {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);

    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <div>
            <Button className="justify-content-center border-0 m-2" style={{ backgroundColor: "#504A6D" }} onClick={handleDecrement} active>
                <BsFillBagDashFill color="#eaded2" size={30} />
            </Button>
            <Button className="justify-content-center border-0 m-2" style={{ backgroundColor: "#504A6D" }} onClick={handleIncrement} active>
                <BsFillBagPlusFill color="#eaded2" size={30} />
            </Button>
            <InputGroup className="col-2 border-0 m-2">
                <InputGroup.Text style={{ color: "#eaded2", backgroundColor: "#504A6D" }}><FaShoppingCart color="#eaded2" size={20} /></InputGroup.Text>
                <InputGroup.Text style={{ color: "#eaded2", backgroundColor: "#504A6D" }}>{count}</InputGroup.Text>
            </InputGroup>
            <InputGroup className="col-2 border-0 m-2">
                <InputGroup.Text style={{ color: "#eaded2", backgroundColor: "#504A6D" }}><FaDollarSign color="#eaded2" size={20} /></InputGroup.Text>
                <InputGroup.Text style={{ color: "#eaded2", backgroundColor: "#504A6D" }}>{count*props.price }</InputGroup.Text>
            </InputGroup>
        </div>

    );
}

export default CookieCounter;