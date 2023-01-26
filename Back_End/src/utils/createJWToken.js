import jwt from "jsonwebtoken";

export default (user) => {
  const token = jwt.sign(
    {
        _id: user._id
    },
    'secretToken',
    {
        expiresIn: '30d'
    }
);
};
