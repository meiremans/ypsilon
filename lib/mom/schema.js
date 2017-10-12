const mongoose = require('mongoose');



function schema(schemaName,objects,hooks = {}) {
    if(schemaName === 'sub'){
        return subSchema(objects,hooks);
    }

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

function subSchema(objects,hooks = {}){
    const SubSchema = new mongoose.Schema(objects);
    attachHooks(SubSchema,hooks);
    return SubSchema;
}


function attachHooks(schema,hooks){
    if(hooks.pre){
        schema.pre('save', hooks.pre);
    }
    if(hooks.post){
        schema.post('save', hooks.post);
    }
}

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}


module.exports = schema;
