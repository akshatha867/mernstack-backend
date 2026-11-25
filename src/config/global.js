export const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },

  ERROR: {
    code: 500,
    message: "Something went wrong",
  },

  REQUIRED: {
    code: 201,
    message: " is Required",
  },

  INVALID: {
    code: 300,
    message: " is invalid",
  },

  ALREADY_EXISTS: {
    code: 301,
    message: " already exists",
  },

  NOT_FOUND: {
    code: 101,
    message: " not found",
  },

  ACCESS_DENIED: {
    code: 404,
    message: " access denied",
  },

  MULTER_ERROR: {
    code: 800,
    message: "file upload error",
  },
};
