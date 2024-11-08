const loginfunction = (req, res) => {
  try {
    username = req.body.username;
    password = req.body.password;
    console.log(username);
    res.json({ message: "user authenticated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const test = () => {
  pass;
};
module.exports = { loginfunction, test };
