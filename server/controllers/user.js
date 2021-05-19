/**
 * Send current user information to the client.
 * @param req the http request
 * @param res the http response
 */
export const getUser = async (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ message: 'User data does not exist in session' });
  }
};

export const updateUser = () => { };
