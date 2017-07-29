const mongoose = require('mongoose');


function schema(schemaName) {
    const GenericSchema = mongoose.Schema({
        created_at: Date,
        updated_at: Date
    });

    GenericSchema.pre('save', function (next) {
        // get the current date
        const currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at) {
            this.created_at = currentDate;
        }
        next();
    });
    return mongoose.model(schemaName, GenericSchema);
}



module.exports = schema;
