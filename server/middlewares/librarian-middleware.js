const librarianMiddleware = (req, res, next) => {
    if (req.user.type !== 'LIBRARIAN') {
        return res.status(403).send({ message: "Access denied. Librarian privileges required." });
    }   
    next();
};

module.exports = librarianMiddleware;