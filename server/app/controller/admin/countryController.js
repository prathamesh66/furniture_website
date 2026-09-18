const { countryModel } = require("../../model/countryModel")


let createCountry = async (req,res) => {

    let bodyData = req.body

    try {
        let country = await countryModel(bodyData)

        let countryRes = await country.save()

        res.send({
            _status: true,
            _message: "Country Created",
            countryRes
        })
    }

    catch(dbError) {
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

let viewCountry = async (req,res) => {


    let filter = {
      isDeleted: false,
    };

    let countryData = await countryModel.find(filter);

    res.send({
      _status: true,
      _message: "View Country Data",
      countryData,
    });

}

let updateCountry = async (req,res) => {

    let {id} = req.params

    let bodyData = req.body

    try {
      let countryRes = await countryModel.updateOne(
        {
          _id: id,
        },
        {
          $set: bodyData,
        },
      );

      res.send({
        _status: true,
        _message: "Country Data Updated",
        countryRes,
      });

    } 
    
    catch (dbError) {
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

let deleteCountry = async (req,res) => {

    let {id}  = req.params

    let deleteData = await countryModel.updateOne(
        {
            _id: id
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
      _message: "Country Deleted",
      deleteData,
    });

}


let multiDeleteCountry = async (req,res) => {

    let {ids} = req.body

    let multiDeleteData = await countryModel.updateMany(
      {
        _id: ids,
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: Date.now(),
        },
      },
    )

    res.send({
      _status: true,
      _message: "Country Deleted",
      multiDeleteData,
    });

}


let changeStatusCountry = async (req,res) => {

  let {ids} = req.body

  let statusChange = await countryModel.updateMany(
    {
      _id: ids,
    },
    [
      {
        $set: {
          countryStatus: {
            $not: "$countryStatus",
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
    _message: "Country Status Changed",
    statusChange,
  });
}; 


let getDetails = async (req, res) => {

    let { id } = req.params;

    let details = await countryModel.findOne({ _id: id });

    res.send({
        _status: true,
        _message: "Country Details",   
        details,
    });
    
    };
    

module.exports = {
  createCountry,
  viewCountry,
  updateCountry,
  deleteCountry,
  multiDeleteCountry,
  changeStatusCountry,
  getDetails,
};