function logger(req, res, next) 
{
  const time = new Date().toISOString();       // Get timestamp when request is received

  const method = req.method;    // read HTTP method from request

  const url = req.url;  // read path from request

  console.log(`[${time}] ${method} ${url}`);

  next();   // Carry on to next middleware or route handler
}

module.exports = logger;
