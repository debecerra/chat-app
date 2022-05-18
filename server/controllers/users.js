/* eslint-disable import/prefer-default-export */

/**
 * Send current user information to the client.
 *
 * @param req The HTTP request
 * @param res The HTTP response
 */
export const getUser = async (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ message: 'User data does not exist in session' });
  }
};
