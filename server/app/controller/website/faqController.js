const { faqModel } = require("../../model/faqModel");

let websiteFaq = async (req, res) => {
  try {
    let faqData = await faqModel
      .find({
        isDeleted: false,
        faqStatus: true,
      })
      .sort({
        faqOrder: 1,
      });

    res.send({
      _status: true,
      _message: "FAQ Data Found",
      faqData,
    });
  } catch (error) {
    console.log("WEBSITE FAQ ERROR:", error);

    res.send({
      _status: false,
      _message: "Something went wrong",
      errors: [
        {
          error: error.message,
        },
      ],
    });
  }
};

module.exports = {
  websiteFaq,
};
