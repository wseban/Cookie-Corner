import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Card, ButtonGroup} from 'react-bootstrap';
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
  const [userName, setUserName] = useState('');
  const [orders, setOrders] = useState([]);

  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  console.log("userDataLength 1: " + userDataLength);

  useEffect(() => {
    const getMyOrders = async () => {
      console.log("in getMyOrders()");
      /* get my token */
      if(!AuthService.isLoggedIn) {
        console.log('How did we get there with no one logged in?');
        /* TBD: goto Home */
        return;
      } 

      console.log('isLoggedIn');
      const token = AuthService.getToken();
      if(!token) {
        return;
      }

      console.log('got token');

      /* token exists, check if expired */
      if(AuthService.checkTokenExpired(token)) {
        return;
      } 

      console.log('token has not expired');

      /* use the api - to fetch the orders the user that's logged in */
      const response = await getMyInfo(token);
      if (!response.ok) {
        console.log(response.ok);
        return;
      }

      console.log('getMyInfo returned');

      const userData = await response.json();

      console.log('userData' + userData);

      if(userData) {

        setUserData(userData);
        setUserName(userData.fullName);
        setOrders(userData.orders);
        console.log('name' + userData.fullName);
        console.log('orders = ' + userData.orders);
      }
    }

    getMyOrders();
  }, [userDataLength]);

  if (!userDataLength) {
    return <h2 className='p-4 text-center'>Loading...</h2>;
  }
  console.log("userDataLength 2: " + userDataLength);

  const placeNewOrder = () => {
    console.log('in placeNewOrder');
    document.location.href = '/orderForm';
  }

  const requestCatering = () => {
    console.log('in requestCatering');
    document.location.href = '/cater';
  }

  return (
    <Container className='mb-30' fluid>
          <h3 className='p-4 text-center'>Your Cookie Corner</h3>
          <h4 className='p-1 text-center'> {userName} </h4>

          <Row className="justify-content-md-center">
            <Col className="col-4 p-2 mt-5">
              <ButtonGroup size="lg">
                <Button variant='secondary m-1 justify-content-md-center' onClick={placeNewOrder} active>
                  Place new order
                </Button> 
                <Button variant='secondary m-1 justify-content-md-center' onClick={requestCatering} active>
                  Cater an event
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          <h4 className='text-center p-3'>
          {orders.length? `Your orders`: `You have no orders at present`}
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