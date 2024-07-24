const mongoose = require("mongoose");

const parameterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        base_parameters: [String],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Parameter", parameterSchema)