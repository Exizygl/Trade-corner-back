const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        productIdList: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "product",
            required: true,
        },
        status: {
            type: String,
            lowercase: true,
        },
        transporteurId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transporteur",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


const CommandModel = mongoose.model("command", commandSchema);
module.exports = CommandModel;