/**
 * Send current user information to the client.
 * @param req the http request
 * @param res the http response
 */
export const getUser = async (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(400).json({ message: 'User is not authenticated' });
  }
};

export const updateUser = () => { };
