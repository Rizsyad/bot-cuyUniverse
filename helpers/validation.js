const isValidVerify = (text) => {
  text = text.toLowerCase().replace(/(\r\n|\n|\r)/gm, " ");
  const regex =
    /nama kamu|umur kamu|asal kamu|pendidikan \/ pekerjaan sekarang kamu|bahasa pemograman yang kamu sukai atau kuasai/gm;
  const validate = text.match(regex) !== null;

  return validate;
};

module.exports = {
  isValidVerify,
};
