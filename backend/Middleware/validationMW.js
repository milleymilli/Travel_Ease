function validateBooking(req, res, next) {
    const { name, date, destination_id } = req.body;

    // 1. Check Name
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Invalid or missing name' });
    }

    // 2. Check Date
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ error: 'Invalid or missing date' });
    }

    // 3. Check Destination (New! Ensures we know WHAT is being booked)
    if (!destination_id) {
        return res.status(400).json({ error: 'Missing destination ID' });
    }

    next(); // Move on to the controller
}

// Fixed: lowercase 'module'
module.exports = { validateBooking };