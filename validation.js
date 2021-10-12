class Validation {
  /**
   * Check if value is empty
   * @param value
   * @returns {boolean}
   */
  isEmpty(value) {
    return value === undefined || value === null;
  }
}

module.exports = new Validation();
