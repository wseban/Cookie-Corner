import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Card} from 'react-bootstrap';
import { getMyInfo } from '../../utils/api';
import AuthService from '../../utils/auth';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const testOrders = [
    { 
      orderName: 'Birthday party',
      deliveryDate: '12/15/2022',
      food: [
        {
          name: "Brown Chocolate Chip Cookie",
          price: 7.5,
          ingredients: "Browned butter, Egg, Brown sugar, Baking soda, Vanilla",
          picture: "../assets/BrownChocolateChipCookie.png" 
  
      },
      ]
    },
    { 
      orderName: 'Training session - Day 1 breakfast',
      deliveryDate: '12/15/2022',
      food: [
        {
          name: "Brown Chocolate Chip Cookie",
          price: 7.5,
          ingredients: "Browned butter, Egg, Brown sugar, Baking soda, Vanilla",
          picture: "../assets/BrownChocolateChipCookie.png" 
  
      },
      ]
    },
];

export default function Dashboard() {
  //const [userName, setUserName] = useState('');
  //const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {

  const getMyOrders = async () => {
    /* get my token */
    if(!AuthService.isLoggedIn) {
      console.log('How did we get there with no one logged in?');
      /* TBD: goto Home */
      return;
    } 
    const token = AuthService.getToken();
    if(!token) {
      return;
    }

    /* token exists, check if expired */
    if(AuthService.checkTokenExpired(token)) {
      return;
    } 

    /* use the api - to fetch the orders the user that's logged in */
    const response = await getMyInfo(token);
    if (!response.ok) {
      console.log(response.message);
      return;
    }
    const userData = await response.json();
    if(userData) {
      //setUserName(userData.fullName);
      //setOrders(userData.orders);
      setUserData(userData);
      console.log('userData = ' + userData);
      console.log('name' + userData.fullName);
      console.log('orders = ' + userData.orders);
    }
  }

    getMyOrders();
  },[userDataLength]);

//         {userData.orders? `Your orders`: `You have no orders at present`}

  return (
    <Container className='mb-30' fluid>
          <h3 className='p-4 text-center'>Your Cookie Corner</h3>
          <h2> {userData.fullName} </h2>
          <div className="d-grid gap-2 w-50 mx-auto">
          <Button variant='secondary' active>Place a new order</Button>
          </div>
          <h4 className='text-center p-3'>
          {testOrders? `Your orders`: `You have no orders at present`}
          </h4>

      {testOrders.map((order) => {
        return (
          <Container className='mb-30 col-8'>
            <Row>
              <Col className='col-12'>
                <Card className='m-1'>
                  <Card.Body>
                    <Card.Title>
                      Order name: {order.orderName}
                    </Card.Title>
                    <Card.Text>
                      Delivery Date: {order.deliveryDate}
                    </Card.Text>
                    <Button variant='secondary m-2' active>
                      <FaEdit color="#eaded2" size={25} />
                    </Button>
                    <Button variant='secondary m-2' active>
                      <FaTrashAlt color="#eaded2" size={25} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      })}

      </Container>
  );
}