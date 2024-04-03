const mongoose = require('mongoose');

const { Schema } = mongoose;

const myMealSchema = new Schema({
  userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
  },
  date: { type: Date },
  breakfast: [{
      mealId: {
          type: Schema.Types.ObjectId,
          ref: "Meals"
      }
  }],
  lunch: [{
      mealId: {
          type: Schema.Types.ObjectId,
          ref: "Meals"
      }
  }],
  snacks: [{
      mealId: {
          type: Schema.Types.ObjectId,
          ref: "Meals"
      }
  }],
  dinner: [{
      mealId: {
          type: Schema.Types.ObjectId,
          ref: "Meals"
      }
  }]
}, { timestamps: true });

// Remove unique index constraint from breakfast.mealId field
myMealSchema.index({ "breakfast.mealId": 1 }, { unique: false });

module.exports = mongoose.model("MyMeals", myMealSchema);


// const myMealSchema = new Schema({
//       userId: {
//         type: Schema.Types.ObjectId,  // Reference to a User document
//         ref: "User",                     // The 'User' is the model that will be used
        
//       },
//       date:{type:Date},
      
//       breakfast:{type:[{
//         mealId:{
//             type:Schema.Types.ObjectId,
//             ref:"Meals",
           
//         }
//       }],default:[{}]},
//       lunch:{type:[{
//         mealId:{
//             type:Schema.Types.ObjectId,
//             ref:"Meals",
            
//         }
//       }],default:[{}]},
//       snacks:{type:[{
//         mealId:{
//             type:Schema.Types.ObjectId,
//             ref:"Meals"
           
//         }
//       }],default:[]},

//       dinner:{type:[{
//         mealId:{
//             type:Schema.Types.ObjectId,
//             ref:"Meals"
            
//         }
//       }],default:[]}


// }, { timestamps: true });

// module.exports = mongoose.model("MyMeals", myMealSchema);
