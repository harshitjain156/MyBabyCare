const mongoose=require('mongoose')

const vaccineSchema=mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {type:String},
    age:{type:String},
    // tags:{type:[String],default:["laptop","google","computer"]},
    tag: {
        type: String,
        enum: ['general', 'particular'],
        default: 'general'
    },
    desc:{type:String,default:''},
    image:{type: String,default:'https://picsum.photos/300/200'}

})

module.exports=mongoose.model('Vaccines',vaccineSchema);
