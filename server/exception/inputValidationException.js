class inputValidationException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = inputValidationException;