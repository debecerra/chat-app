// eslint-disable-next-line import/prefer-default-export
export const getUser = async (req, res) => {
  res.send(req.user);
};
