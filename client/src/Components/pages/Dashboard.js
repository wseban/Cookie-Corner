import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Card, ButtonGroup} from 'react-bootstrap';
import { getMyInfo, deleteOrder } from '../../utils/api';
import AuthService from '../../utils/auth';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [orders, setOrders] = useState([]);

  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getMyOrders = async () => {
      /* get my token */
      if(!AuthService.isLoggedIn) {
        console.log('How did we get there with no one logged in?');
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
        console.log(response.ok);
        return;
      }

      const userData = await response.json();

      if(userData) {
        setUserData(userData);
        setUserName(userData.fullName);
        setOrders(userData.orders);
      }
    }

    getMyOrders();
  }, [userDataLength]);

  const placeNewOrder = () => {
    console.log('in placeNewOrder');
    document.location.href = '/orderForm';
  }

  const requestCatering = () => {
    console.log('in requestCatering');
    document.location.href = '/cater';
  }

  const handleEditOrder = (order) => {
    console.log('in handleEditOrder: order =' + JSON.stringify(order));
    const orderId = order.order._id;
    document.location.href = `/viewOrder/${orderId}`;
  }

  const handleDeleteOrder = async (order) => {
    console.log('in handleDeleteOrder: order =' + JSON.stringify(order));
    const orderId = order.order._id;

    /* get my token */
    if(!AuthService.isLoggedIn) {
      console.log('How did we get there with no one logged in?');
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
    const response = await deleteOrder(token, orderId);
    if (!response.ok) {
      console.log(response.ok);
      return;
    }

    const userData = await response.json();
    console.log('userData' + userData);

  }

  return (
    <Container className='mb-30' fluid>
          <h3 className='p-4 text-center'>Your Cookie Corner</h3>
          <h4 className='p-1 text-center'> {userName} </h4>

            <div className='text-center'>
            <ButtonGroup size="lg" >
                <Button variant='secondary m-1' onClick={placeNewOrder} active>
                  Place new order
                </Button> 
                <Button variant='secondary m-1' onClick={requestCatering} active>
                  Cater an event
                </Button>
              </ButtonGroup>
            </div>

          <h4 className='text-center p-3'>
          {orders.length? `Your orders`: `You have no orders at present`}
          </h4>

      {orders.map((order) => {
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
                    <Button variant='secondary m-2'  onClick={() => handleEditOrder({order})} active>
                      <FaEdit color="#eaded2" size={25} />
                    </Button>
                    <Button variant='secondary m-2' onClick={() => handleDeleteOrder({order})} active>
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