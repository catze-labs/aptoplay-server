export const registerWithEmailAddressSchema = {
  schema: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string",
        minLength: 8
      }
    },
    example: {
      email: "test@test.com",
      password: "1234qwer!"
    }
  }
};

export const loginWithEmailAddressSchema = {
  schema: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string",
        minLength: 8
      }
    }
  }
};

export const registerWithGoogleAccountSchema = {
  schema: {
    type: "object",
    required: ["accessToken"],
    properties: {
      accessToken: {
        type: "string",
        format: "email"
      }
    }
  }
};
