

// These properties are commoon among all schemas so I thought we should create a dedicated schema for this.
// audit = {
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         set: (v) => mongoose.Types.ObjectId(v),
//         ref: "users",
//         // required: [true, `please record the user who created this`],
//       },
//       createdTimeStamp: {
//         type: Date,
//         set: (v) => Date(v),
//         get: (v) => v.toISOString(),
//         required: [true, `please record the datetime this was created`],
//         default: new Date(),
//       },
    
//       updatedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         set: (v) => mongoose.Types.ObjectId(v),
//         ref: "users",
//       },
//       updatedTimeStamp: {
//         type: Date,
//         set: (v) => Date(v),
//         get: (v) => v.toISOString(),
//       },
// }

// module.exports = { audit };
