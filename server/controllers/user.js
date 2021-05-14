// eslint-disable-next-line import/prefer-default-export
export const getUser = async (req, res) => {
  console.log('/user hit');
  console.log(req.user);
  res.send(req.user);
};
