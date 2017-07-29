const mongoose = require('mongoose');


function schema(schemaName,objects,hooks = {}) {
    let baseSchema = {
        created_at: Date,
        updated_at: Date
    };

    const GenericSchema = new mongoose.Schema(extend(objects,baseSchema));

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
    attachHooks(GenericSchema,hooks);
    const generic = mongoose.model(schemaName, GenericSchema)
    return generic;
}


function attachHooks(schema,hooks){
    if(hooks.pre){
        schema.pre('save', hooks.pre);
    }
}

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}


module.exports = schema;
