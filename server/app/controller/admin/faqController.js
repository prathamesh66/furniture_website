const { faqModel } = require("../../model/faqModel")


let createFaq = async (req,res) => {

    let bodyData = req.body

    try {
      let faq = await faqModel(bodyData);

      let faqRes = await faq.save();

      res.send({
        _status: true,
        _message: "Faq Created",
        faqRes,
      });
    }
    
    catch (dbError) {
      let errors = [];
      let obj = {};

      for (let errorkey in dbError.errors) {
        obj[errorkey] = dbError.errors[errorkey].message;
        errors.push(obj);
        obj = {};
      }

      res.send({
        _status: false,
        _message: "Error Found...",
        errors,
      });
    }

}


// let viewFaq = async (req,res) => {

//     let filter = {
//       isDeleted: false,
//     };

//     let faqData = await faqModel.find(filter)

//     res.send({
//         _status: true,
//         _message: "View Faq Data",
//         faqData
//     })
// }

let viewFaq = async (req, res) => {

  let filter = {
    isDeleted: false,
  }

  let faqData = await faqModel.find(filter);

  res.send({
    _status: true,
    _message: "View Faq Data",
    faqData,
  });
}


let updateFaq = async (req,res) => {

    let {id} = req.params

    let bodyData = req.body

    try {
      let faqRes = await faqModel.updateOne(
        {
          _id: id,
        },
        {
          $set: bodyData,
        },
      );

      res.send({
        _status: true,
        _message: "Faq Data Updated",
        faqRes,
      });
    } catch (dbError) {
      // console.log("this is teh error", dbError.errors);

      let errors = [];
      let obj = {};

      for (let errorkey in dbError.errors) {
        obj[errorkey] = dbError.errors[errorkey].message;
        errors.push(obj);
        obj = {};
      }
      res.send({
        _status: false,
        _message: "Error Found...",
        errors,
      });
    }

}


let deleteFaq = async (req,res) => {

    let {id} = req.params

    let deleteData = await faqModel.updateOne(
        {
            _id: id
        },
        {
            $set: {
                isDeleted: true,
                deletedAt: Date.now()
            }
        }
    )

    res.send({
        _status: true,
        _message: "Faq Deleted",
        deleteFaq
    })

}


let multiDeleteFaq = async (req,res) => {

    let {ids} = req.body

    let multiDeleteData = await faqModel.updateMany(
        {
            _id: ids
        },
        {
            $set : {
                isDeleted: true,
                deletedAt: Date.now()
            }
        }
    )

    res.send({
      _status: true,
      _message: "Faq Deleted",
      multiDeleteData,
    });

}



let changeStatusFaq = async (req,res) => {

  let {ids} = req.body

  let statusChange = await faqModel.updateMany(
    {
      _id: ids,
    },
    [
      {
        $set: {
          faqStatus: {
            $not: "$faqStatus",
          },
        },
      },
    ],

    {
      updatePipeline: true,
    },
  );

  res.send({
    _status: true,
    _message: "Faq Status Changed",
    statusChange,
  });
};


let getDetails = async (req, res) => {

    let { id } = req.params;

    let details = await faqModel.findOne({ _id: id });

    res.send({
        _status: true,
        _message: "Faq Details",   
        details,
    });
    
    };


module.exports = {
  createFaq,
  viewFaq,
  updateFaq,
  deleteFaq,
  multiDeleteFaq,
  changeStatusFaq,
  getDetails,
};


