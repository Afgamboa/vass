export const expectValues = {

  email: "test@example.com",
  password: "password",
  userId: "6485eb2bb172hba482cb2e5f",
  jwtSecret: "sfadgsdsfgadgrfndfhfga",

  userDataLogin: {
    _id: "id",
    name: "test",
    email: "test@example.com",
    password: "password",
  },
  req: {
    body: {
      email: "test@example.com",
      password: "password",
    },
  },
  res: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },

  responseUserLoginSuccess: {
    message: "success",
    token: "afwfasfff",
    user: "userDataLogin",
  },
};
