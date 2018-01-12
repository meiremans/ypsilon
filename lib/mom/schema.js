const mongoose = require('mongoose');
let postFind = require('mongoose-post-find');



function schema(schemaName,objects,hooks = {}) {
    if(schemaName === 'sub'){
        return subSchema(objects,hooks);
    }

    let baseSchema = {
        created_at: { type: Date, index: true },
        updated_at: { type: Date, index: true }
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

    //for legacy reasons pre/post is aliased respectively to preSave/postSave
    if(hooks.pre){
        console.log("Using deprecated yspilon function pre, use preSave for the same functionality");
        hooks.preSave = hooks.pre
    }
    if(hooks.post){
        console.log("Using deprecated yspilon function post, use postSave for the same functionality");
        hooks.postSave = hooks.post
    }


    if(hooks.preSave){
        schema.pre('save', hooks.preSave);
    }
    if(hooks.postSave){
        schema.post('save', hooks.postSave);
    }

    if(hooks.preFind){
        schema.pre('find', hooks.preFind);
    }

    if(hooks.postFind){
        //TODO: only works with callback, promisify this
        schema.plugin(postFind, {
            find: function (results, done) {
                hooks.postFind(results,function (results){
                    done(null, results) //Results must be passed to callback
                })

            }
        });

        // schema.post('find', hooks.postFind);
    }
}

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}


module.exports = schema;
