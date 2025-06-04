const { StatusCodes } = require("http-status-codes");

// Authorization middleware factory
// Accepts a list of roles that are allowed to access the route
const authorizeMiddleware =
  (accessGrantedRoles = []) =>
  (req, res, next) => {
    // If roles are specified and the user's role is not in the list, deny access
    if (
      accessGrantedRoles.length !== 0 &&
      !accessGrantedRoles.includes(req.user.role)
    ) {
      return res.status(StatusCodes.FORBIDDEN).send("Access refused");
    }

    next();
  };

module.exports = { authorizeMiddleware };
