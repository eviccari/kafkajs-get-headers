class NonconvertibleDataException extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }
}

module.exports = NonconvertibleDataException;
