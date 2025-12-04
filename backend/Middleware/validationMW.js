function validateBooking (req, res, next)
{
    const {name, date} = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') // if name is missing or invalid, it returns 400 error
        {
        return res.status(400).json({ error: 'Invalid or missing name' });
        }

    if (!date || isNaN(Date.parse(date))) // if date is missing or invalid, it returns 400 error
        {
        return res.status(400).json({ error: 'Invalid or missing date' });
        }
    next(); // move on to next MW
}

Module.exports = {validateBooking}; // exports function