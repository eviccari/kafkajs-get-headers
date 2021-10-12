const validation = require("./validation");
const NonconvertibleDataException = require("./nonconvertible-data-exception");

class KafkaGetHeaders {
  /**
   * Default constructor with a valid kafka message
   * @param kafkaMessage
   */
  constructor(kafkaMessage) {
    if (validation.isEmpty(kafkaMessage)) {
      throw new Error(`kafka message is required`);
    }

    this.kafkaMessage = kafkaMessage;
    this.selectedAttribute = null;
  }

  /**
   * Get attribute value in default data type (Buffer)
   * @param attribute {string}
   * @return KafkaGetHeaders instance with selected attribute
   */
  get(attribute) {
    if (validation.isEmpty(this.kafkaMessage.headers[attribute])) {
      this.selectedAttribute = null;
    } else {
      this.selectedAttribute = this.kafkaMessage.headers[attribute];
    }

    return this;
  }

  /**
   * convert selected attribute to string and returns
   */
  asString() {
    if (validation.isEmpty(this.selectedAttribute)) {
      return null;
    } else {
      return this.selectedAttribute.toString();
    }
  }

  /**
   * convert selected attribute to float and returns
   * @return {null|number}
   * @throws NonconvertibleDataException
   */
  asFloat() {
    if (validation.isEmpty(this.selectedAttribute)) {
      return null;
    } else {
      try {
        return parseFloat(
          this.selectedAttribute.toString().replaceAll(",", ".")
        );
      } catch (error) {
        throw new NonconvertibleDataException(error.message);
      }
    }
  }

  /**
   * convert selected attribute to int and returns
   * @param base {number}
   * @return {null|number}
   * @throws NonconvertibleDataException
   */
  asInt(radix) {
    if (validation.isEmpty(this.selectedAttribute)) {
      return null;
    } else {
      try {
        return parseInt(this.selectedAttribute.toString(), radix);
      } catch (error) {
        throw new NonconvertibleDataException(error.message);
      }
    }
  }

  /**
   * convert selected attribute to date and returns
   * @return {null|Date}
   * @throws NonconvertibleDataException
   */
  asDate() {
    if (validation.isEmpty(this.selectedAttribute)) {
      return null;
    } else {
      try {
        const value = this.selectedAttribute.toString();
        if (!isNaN(value)) {
          return new Date(parseInt(value, 10));
        } else {
          const result = new Date(this.selectedAttribute.toString());
          if (result.toString() === "Invalid Date") {
            throw new Error(
              `Attribute value ${value} cannot be convert into Date`
            );
          } else {
            return result;
          }
        }
      } catch (error) {
        throw new NonconvertibleDataException(error.message);
      }
    }
  }

  /**
   * convert selected attribute to boolean and returns
   * @return {null|boolean}
   */
  asBoolean() {
    if (validation.isEmpty(this.selectedAttribute)) {
      return null;
    } else {
      return this.selectedAttribute.toString() === "true";
    }
  }
}

module.exports = KafkaGetHeaders;
