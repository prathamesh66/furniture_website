// let jwt = require("jsonwebtoken");

// let checkToken = (req,res,next) =>{

//     try {

//         let token = req.headers.authorization.split(" ")[1];

//         // console.log(token)

//         let decoded = jwt.verify(token, process.env.TOKENKEY);

//         // console.log(decoded)

//         let {id} = decoded

// //         {
// //     "oldPassword": "prathamesh123",
// //     "newPassword": "prathamesh321",
// //     "confirmPassword": "prathamesh321"
// // }

// // in this add the userID

//         req.body.userID = id

//         next()

//     }

//     catch {

//         res.send({
//             _status: false,
//             _message: "Token Invalid"
//         })

//     }

// }

// module.exports = { checkToken };

let jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    let decoded = jwt.verify(token, process.env.TOKENKEY);

    let { id } = decoded;

    req.userID = id;

    next();
  } catch (error) {
    console.log("TOKEN ERROR:", error);

    res.send({
      _status: false,
      _message: "Token Invalid",
    });
  }
};

module.exports = {
  checkToken,
};