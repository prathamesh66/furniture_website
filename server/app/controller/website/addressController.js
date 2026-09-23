const addressModel = require("../../model/addressModel");

let addAddress = async (req, res) => {
  try {
    let userID = req.userID;

    let { billing, shipping } = req.body;

    let address = new addressModel({
      userID,
      billing,
      shipping,
    });

    let result = await address.save();

    res.send({
      _status: true,
      _message: "Address added successfully",
      address: result,
    });
  } catch (error) {
    res.send({
      _status: false,
      _message: "Something went wrong",
      error: error.message,
    });
  }
};

let viewAddress = async (req, res) => {
  try {
    let userID = req.userID;

    let address = await addressModel.findOne({
      userID: userID,
    });

    if (address) {
      res.send({
        _status: true,
        _message: "Address view successfully",
        address: address,
      });
    } else {
      res.send({
        _status: false,
        _message: "Address not found",
      });
    }
  } catch (error) {
    res.send({
      _status: false,
      _message: "Something went wrong",
      error: error.message,
    });
  }
};

let updateAddress = async (req, res) => {
  try {
    let userID = req.userID;

    let { billing, shipping } = req.body;

    let result = await addressModel.updateOne(
      {
        userID: userID,
      },
      {
        $set: {
          billing: billing,
          shipping: shipping,
        },
      },
    );

    res.send({
      _status: true,
      _message: "Address updated successfully",
      result: result,
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
  addAddress,
  viewAddress,
  updateAddress,
};
