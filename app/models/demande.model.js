const mongoose = require("mongoose");

const demandeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        copieCNIUrl: {
            type: string,
            required: true,
        },
        status: {
            type: string,
            default: false
        },
    },
    {
        timestamps: true,
    }
);


const DemandeModel = mongoose.model("demande", demandeSchema);
module.exports = DemandeModel;