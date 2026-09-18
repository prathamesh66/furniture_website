const { materialModel } = require("../../model/materialModel")


let createMaterial = async (req,res) => {

    let bodyData = req.body

    try {
      let material = await materialModel(bodyData);
         // console.log(material);
      let materialRes = await material.save();
         //   console.log(materialRes)

      res.send({
        _status: true,
        _message: "Material Created",
        materialRes,
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

let viewMaterial = async (req,res) => {

    let filter = {
      isDeleted: false,
    };
    
    let materialData = await materialModel.find(filter);


    res.send({
      _status: true,
      _message: "View Material Data",
      materialData,
    });

}

let updateMaterial = async (req,res) => {

    let {id} = req.params

    let bodyData = req.body

    try {
      let materialRes = await materialModel.updateOne(
        {
          _id: id,
        },
        {
          $set: bodyData,
        },
      );

      res.send({
        _status: true,
        _message: "Material Updated",
        materialRes,
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

let deleteMaterial = async (req,res) => {

    let {id} = req.params

    let deleteData = await materialModel.updateOne(
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
        _message: "Material Deleted",
        deleteData
    })

}


let multiDeleteMaterial = async (req,res) => {

    let {ids} = req.body

    let multiDeleteData = await materialModel.updateMany(
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
        _message: "Material Deleted",
        multiDeleteData
    })

}


let changeStatusMaterial = async (req,res) => {

  let {ids} = req.body

  let statusChange = await materialModel.updateMany(
    {
      _id: ids,
    },
    [
      {
        $set: {
          materialStatus: {
            $not: "$materialStatus",
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
    _message: "Material Status Changed",
    statusChange,
  });
};

let getDetails = async (req, res) => {

    let { id } = req.params;

    let details = await materialModel.findOne({ _id: id });

    res.send({
        _status: true,
        _message: "Material Details",   
        details,
    });
    
    };

module.exports = {
  createMaterial,
  viewMaterial,
  updateMaterial,
  deleteMaterial,
  multiDeleteMaterial,
  changeStatusMaterial,
  getDetails,
};