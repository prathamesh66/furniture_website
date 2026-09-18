let slugify = require("slugify")

const nodemailer = require("nodemailer");



let mySlug = (title) => {

return slugify(title, {
  replacement: "-", // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: false, // strip special characters except replacement, defaults to `false`
  locale: "vi", // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
})
}



// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "prathamdeshmukh81@gmail.com",
    pass: "jppsexdryxeiakxh",
  },
});

module.exports = { mySlug, transporter };