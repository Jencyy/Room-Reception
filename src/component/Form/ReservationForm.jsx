import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addReservationAsync, updateReservationAsync } from '../../services/Action/reservationAction';
import styled from 'styled-components';

const Wrapper = styled.div`

  `


const ResForm = styled.form`
background-color: #F3CFC6 !important;
`
  const ReservationForm = ({ reservation }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fullName: reservation ? reservation.fullName : '',
        email: reservation ? reservation.email : '',
        roomType: reservation ? reservation.roomType : '',
        arrivalDate: reservation ? reservation.arrivalDate : '',
        departureDate: reservation ? reservation.departureDate : '',
        numGuests: reservation ? reservation.numGuests : '',
        specialRequest: reservation ? reservation.specialRequest : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reservation) {
            dispatch(updateReservationAsync({ ...reservation, ...formData }));
        } else {
            dispatch(addReservationAsync(formData));
        }
    };

    return (
        <Wrapper>
            <Row className="justify-content-center ">
                <Col xs={12} md={6}>
                    <ResForm onSubmit={handleSubmit} className="p-4   shadow-sm">
                        <h2 className='display-4 mb-4'>{reservation ? 'Update Reservation' : 'New Reservation'}</h2>
                        <Form.Group>
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control
                                  type="text"
                                name="fullName"
                                placeholder="Enter Name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Room Type:</Form.Label>
                            <Form.Control
                                as="select"
                                name="roomType"
                                value={formData.roomType}
                                onChange={handleChange}
                            >
                                <option value="">Select room type</option>
                                <option value="AC">AC</option>
                                <option value="Non-AC">Non-AC</option>
                                <option value="Attached">Attached</option>
                                <option value="Non-Attached">Non-Attached</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Arrival Date:</Form.Label>
                            <Form.Control
                                type="date"
                                name="arrivalDate"
                                value={formData.arrivalDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Departure Date:</Form.Label>
                            <Form.Control
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>No. of guests:</Form.Label>
                            <Form.Control
                                type="number"
                                name="numGuests"
                                placeholder="5"
                                value={formData.numGuests}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Special Request:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="specialRequest"
                                rows="4"
                                placeholder="Type here..."
                                value={formData.specialRequest}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="dark pt-2 mt-2" type="submit">
                            {reservation ? 'Update Reservation' : 'Submit Reservation'}
                        </Button>
                    </ResForm>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default ReservationForm;
