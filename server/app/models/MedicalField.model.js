const mongoose = require('mongoose');

const MedicalFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true
    }
   

})

const MedicalField = mongoose.model('MedicalField', MedicalFieldSchema);

module.exports = { MedicalField };