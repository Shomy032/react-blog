const Ajv = require("ajv");
const ajv = new Ajv();

//schema for login for now , todo : remove username requirment , and hash password
const schema = {
    properties: {
      username: { type: "string" }, //todo : remove it later , dont need name for login
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["username", "email", "password"],
    additionalProperties: false,
  };


module.exports = {
    schema  : schema ,
}