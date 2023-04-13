module.exports = (searchFields, searchQuery) => {
  return {
    $or: searchFields.map((field) => ({
      [field]: {
        $regex: searchQuery.split("").join(".*"),
        $options: "i", // Case-insensitive search
      },
    })),
  };
};
