export default {
  jwt: {
    secret: process.env.JWT_SECRET || "skljaksdj9983498327453lsldkjf",
    expiresIn: process.env.JWT_EXPIRES_IN || "10m",
  },
};
