const { Types } = require("mongoose");
const mongoose=require("../config/db");

const leaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Leave", leaveSchema);
