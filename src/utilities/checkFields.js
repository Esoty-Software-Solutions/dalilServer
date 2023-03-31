module.exports = (feilds, res) => {
  const errors = [];

  Object.keys(feilds).forEach((key) => {
    if (!feilds[key]) errors.push(key);
  });

  if (errors.length > 0) {
    res.status(400).send({
      text: `Please insert ${errors}`,
      error: true,
    });
  }

  if (errors.length > 0) {
    return true;
  } else {
    return false;
  }
};
