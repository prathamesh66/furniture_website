const { colorModel } = require("../../model/colorModel");

let viewAllColors = async (req, res) => {
  try {
    let filter = {
      isDeleted: false,
    };

    let colorData = await colorModel.find(filter).sort({
      _id: "desc",
    });

    res.send({
      _status: true,
      _message: "All Color Data",
      colorData,
    });
  } catch (error) {
    res.send({
      _status: false,
      _message: "Something went wrong",
      _error: error.message,
    });
  }
};

module.exports = { viewAllColors };
