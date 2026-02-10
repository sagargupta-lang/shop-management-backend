const testAPI = (req, res) => {
  res.json({
    success: true,
    message: "API is working perfectly",
    timestamp: new Date(),
  });
};

module.exports = { testAPI };
