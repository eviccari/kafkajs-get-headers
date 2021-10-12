# KafkaJS Get Headers

## Objective

Get and convert attribute values from [kafkajs](https://kafka.js.org) message header. To do that, use the respective data type method as follows.

### Assuming that message body looks like the follows:

```javascript
// sample of message
const message = {
    key: "key1",
    value: "hello world",
    headers: {
        "string-attribute": "string-value",
        "int-attribute": "10",
        "float-attribute" : "10,50",
        "boolean-attribute" : "false",
        "date-attribute-in-mills" : "1634023794000",
        "date-attribute": "2021-10-12T07:34:30.503Z",
    },
};
```

## Get **string** values

```javascript
const KafkajsGetHeaders = require("kafka-get-headers");

const getHeaders = new KafkajsGetHeaders(message);
const value = getHeaders.get("string-attribute").asString();
console.log(value);
```
## Get **int** values
```javascript
const value = getHeaders.get("int-attribute").asInt(10); // need the radix base, between 2 and 36 
```
## Get **float** values
```javascript
const value = getHeaders.get("float-attribute").asFloat(); 
```

## Get **boolean** values
```javascript
const value = getHeaders.get("boolean-attribute").asBoolean(); 
console.log(value);
```

## Get **date** values
```javascript
const date1 = getHeaders.get("date-attribute-in-mills").asDate(); 
console.log(date1);

const date2 = getHeaders.get("date-attribute").asDate();
console.log(date2);
```
&nbsp;

> ### REPOSITORY

```https
https://github.com/eviccari/kafkajs-get-headers
```

&nbsp;

> #### INVOLVED TECHNOLOGIES

- NodeJS 14
- Javascript
- Node Package Management
- KafkaJS

&nbsp;

> #### MASTER DEPENDENCIES

&nbsp;

> ### ROADMAP