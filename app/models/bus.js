// app/models/bus.js

/**
 *
 * [ Bus Schema ]
 * id: Number -- bus body number
 * reg_number: String -- bus registration number
 * roadtax_date: Date -- road tax expiry date
 * puspakom_date: Date -- road tax expiry date
 */
var mongoose  = require('mongoose');

var busSchema = new mongoose.Schema({
  id: Number,
  reg_number: String,
  owner: String,
  roadtax_expiry: Date,
  puspakom_expiry: Date,
  availability: Boolean,
  milage: {
    current_milage: {
      timestamp: { type:Date, default: Date.now() },
      milage_reading: Number
    },
    milage_history: [
      {
        timestamp: { type: Date, default: Date.now() },
        milage_reading: Number
      }
    ]
  },
  service_history: [
    {
      date: Date,
    }
  ],
  current_job: {
    issued_timestamp: Date,
    issued_by: Number,
    received_timestamp: Date,
    received_by: Number, //or should be user id?
    completed_timestamp: Date,
    completed_by: Number,
    current_status: String, // ISSUED, RECEIVED, ON REPAIR, KIV, WAITING PARTS, REJECTED, READY
    done: Boolean
  },
  current_job_history: {
  }
});

module.exports = mongoose.model('BusTest', {
  name: {type: String, default: '' }
});
