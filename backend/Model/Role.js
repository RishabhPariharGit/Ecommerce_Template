const mongoose = require("mongoose");


const RoleSchema= mongoose.Schema({
    USerId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
    name: {type:String}
})
const RoleModel = mongoose.model( "Role",RoleSchema);

module.exports = RoleModel;