let payments = 
[
  { id: 1, bookingId: 1, amount: 499, method: "card", status: "paid" },     // Dummy data
  { id: 2, bookingId: 2, amount: 650, method: "paypal", status: "pending" },
];

class Payment {
  static findAll() 
  {
    return payments;    // returns all payments
  }

  static findById(id) 
  {
    return payments.find(p => p.id === id);     // returns payment with matching ID
  }

  static create({ bookingId, amount, method }) // creates a new payment 
  {
    const newPayment = {
      id: payments.length + 1,  // next number in array
      bookingId,
      amount,
      method,   // accepts the above parameters
      status: "paid"    // automatically sets status to "paid"
    };
    payments.push(newPayment);
    return newPayment;
  }

  static deleteById(id) {
    const index = payments.findIndex(p => p.id === id); // finds index of payment with matching ID
    if (index === -1) return null;  // return -1 if payment not found
    return payments.splice(index, 1)[0];
  }
}

module.exports = Payment;   // makes class visible to other files