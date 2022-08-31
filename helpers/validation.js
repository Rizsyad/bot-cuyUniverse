const isValidVerify = (text) => {
  text = text.toLowerCase().replace(/(\r\n|\n|\r)/gm, " ");
  const regex =
    /nama kamu|umur kamu|asal kamu|pendidikan \/ pekerjaan sekarang kamu|bahasa pemograman yang kamu sukai atau kuasai/gm;
  const validate = text.match(regex) !== null;

  return validate;
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const isValidURL = (string) => {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};

module.exports = {
  isValidVerify,
  validateEmail,
  isValidURL,
};
