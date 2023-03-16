const sequenceGenerator = (prefix, number) => {
  // const lastUser = users[0].userId;
  //   const idNumber = Number(userId.split(`-`)[1]);

  let newId = `${prefix}-${number + 1}`;
  // sd: idNumber + 1,
  return newId;
};

module.exports = { sequenceGenerator };
