let bookings = 
[
  { id: 1, name: "John", date: "12-12-2025" },  //dummy data
  { id: 2, name: "Joe", date: "11-01-2026" },
];

class Booking 
{
  static findAll() 
  {
    return bookings;  //returns all bookings
  }

  static findById(id) 
  {
    return bookings.find(b => b.id === id); //finds booking by ID
  }

  static create({ name, date })   // creates new booking with name and date
  {
    const newBooking = {
      id: bookings.length + 1,
      name,
      date
    };
    bookings.push(newBooking);  
    return newBooking;
  }

  static deleteById(id)   // deletes booking by ID
  {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    return bookings.splice(index, 1)[0];
  }
}

module.exports = Booking;   // makes it available to other files