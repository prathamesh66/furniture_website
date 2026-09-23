const { countryModel } = require("../../model/countryModel");

let viewCountry = async (req, res) => {
  try {
    let filter = {
      isDeleted: false,
      countryStatus: true,
    };

    let countryData = await countryModel.find(filter);

    res.send({
      _status: true,
      _message: "View Country Data",
      countryData,
    });
  } catch (error) {
    res.send({
      _status: false,
      _message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  viewCountry,
};
