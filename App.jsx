import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [seatsLeft, setSeatsLeft] = useState(100);
  const [reservations, setReservations] = useState([]);

  // Handle reservation form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const guestCount = parseInt(event.target.guestCount.value);

    if (guestCount > seatsLeft) {
      alert("Not enough seats available.");
      return;
    }

    // Check for duplicate reservation by name
    if (reservations.some((reservation) => reservation.name === name)) {
      alert("Duplicate reservation. Please enter a unique name.");
      return;
    }

    const newReservation = {
      name,
      phone,
      guestCount,
      checkInTime: new Date().toLocaleString(),
      checkoutStatus: false,
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
  };

  // Handle checkout
  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkoutStatus = true;
    setReservations(updatedReservations);

    // Update available seats
    setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
  };

  // Handle delete
  const handleDelete = (index) => {
    const updatedReservations = [...reservations];
    const guestCount = updatedReservations[index].guestCount;
    updatedReservations.splice(index, 1);
    setReservations(updatedReservations);
    setSeatsLeft(seatsLeft + guestCount);
  };

  return (
    <div className="app">
      <h1>Restaurant Reservation System</h1>
      
      <section className="form-section">
        <h2>Reservation Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Customer Name:</label>
          <input type="text" name="name" required /><br />

          <label>Phone Number:</label>
          <input type="text" name="phone" required /><br />

          <label>Guest Count:</label>
          <input type="number" name="guestCount" required min="1" /><br />

          <button type="submit">Book Reservation</button>
        </form>
      </section>

      <section className="seats-section">
        <h2>Seats Available: {seatsLeft}</h2>
      </section>

      <section className="reservations-section">
        <h2>Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check-in Time</th>
              <th>Checkout Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.name}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.checkInTime}</td>
                <td>{reservation.checkoutStatus ? 'Checked Out' : 'Not Checked Out'}</td>
                <td>
                  {!reservation.checkoutStatus && <button onClick={() => handleCheckout(index)}>Click to Checkout</button>}
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
