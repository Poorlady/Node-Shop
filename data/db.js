db.createCollection("members", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName", "address"],
      properties: {
        firstName: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        lastName: {
          bsonType: "string",
          description: "must be a string adn is required",
        },
        address: {
          bsonType: "object",
          required: ["street", "city", "posCode"],
          properties: {
            street: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            city: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            posCode: {
              bsonType: "string",
              description: "must be a string and is required",
            },
          },
        },
        bDate: {
          bsonType: "date",
          description: "must be a date",
        },
      },
    },
  },
});
