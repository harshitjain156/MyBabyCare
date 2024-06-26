const express = require('express');
const mealModel = require('../model/mealModel');
// const { find } = require('../model/childModel');
const myMealsModel = require('../model/myMealsModel');
const router = express.Router();
const moment = require('moment'); 
const NodeCache = require( "node-cache" );
const myCache =new NodeCache( { stdTTL: 100, checkperiod: 120 } );

router.get('/dietplans',(req,res)=>{
    const date=req.query.date;
    console.log(date);
    const newDate=new Date(date);
    console.log(newDate)
    const currentDate = moment(newDate.toISOString().split("T")[0]).toDate();
    console.log(currentDate);
    console.log(new Date(newDate.toISOString().split("T")[0]))
    res.json("Success")
})


router.post('/add-meal', async (req, res) => {
    try {
        // Create the vaccine
       const {name, desc} = req.body
       if(!name){
        return res.status(400).json({ success: false, message: "Name is required"});
       }
       if(!desc){
        return res.status(400).json({ success: false, message: "Description is required"});
       }
       
       const newMeal=await mealModel.create({
        name,desc
       })
       
        return res.status(201).json({ message: 'Meal added',data:newMeal });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
})



router.get('/get-all-meal', async (req, res) => {
    try {
        if(myCache.has("all-meals")){
            console.log("cached data");
            return res.status(200).json({ message: 'Meal added',data:myCache.get("all-meals")});
        }
       else{

      
       const allMeals= await mealModel.find();
       myCache.set("all-meals",allMeals);
        return res.status(200).json({ message: 'Meal added',data:allMeals });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
})

function isMealIdAlreadyAdded(mealArray, newMealId) {
    console.log(mealArray.some(item => item.mealId == newMealId));
    return mealArray.some(item => item.mealId == newMealId);
}
router.post('/add-my-meal/:userId', async (req, res) => {
    try {
        // Create the vaccine
       const {mealId,date,type} = req.body;
       const userId=req.params.userId;
       if(!mealId){
        return res.status(400).json({ success: false, message: "Meal id is required"});
       }
       if(!date){
        return res.status(400).json({ success: false, message: "Date is required"});
       }

       const d = new Date("01/05/12");
        d.setHours(0,0,0,0);
        
        console.log(d.toISOString(),"123");
       let findMyMeal= await myMealsModel.find({userId,date});
       console.log(findMyMeal,findMyMeal.length);
       if(findMyMeal.length>0){
            if(isMealIdAlreadyAdded(findMyMeal[0][type],mealId)){
                return res.status(201).json({ message: 'Meal already added'});

            }
            else{
                const myArray=findMyMeal[0][type];
                myArray.push({
                    mealId:mealId
                })
                console.log(myArray)
        
                const updateMeal=await myMealsModel.findOneAndUpdate({_id:findMyMeal[0]._id},{[type]:findMyMeal[0][type]},{new:true}).select();
        
                return res.status(201).json({ message: 'Meal added',data:updateMeal});
            }
        

       }else{
            const mealType=type;
            console.log("err")
            const mealData=myMealsModel({
                userId:userId,
                date:date,
                [type]:[{mealId}]
            })
            // const myMeal=await myMealsModel.create({
            //     userId:userId,
            //     date:date,
            //     [type]:[{mealId}]
            // })
            const myMeal=await mealData.save();
            return res.status(201).json({ message: 'Meal added',data:myMeal});

       }
       
        // return res.status(201).json({ message: 'Meal added',data:findMyMeal});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
})




router.get('/get-my-meal/:userId', async (req, res) => {
    try {
        // Create the vaccine
       const date = req.query.date;
       const userId=req.params.userId;
    
       if(!date){
        return res.status(400).json({ success: false, message: "Date is required"});
       }
        
        
       let findMyMeal= await myMealsModel.findOne({userId:userId,
        date:date
    
    
    }).populate('breakfast.mealId')
       .populate('lunch.mealId')
       .populate('snacks.mealId')
       .populate('dinner.mealId').exec();
       
       if(findMyMeal){
        return res.status(200).json({ status:"meal-added",message: 'Meal added',data:findMyMeal});

        

       }else{
        // queryDate.setDate(queryDate.getDate()+1);
            return res.status(200).json({ status:"no-meal-added 123",message:"my meals",data:  {
                
                "userId": userId,
                // "date123":new Date(date),
                "date": new Date(date),
                "dinner": [],
                "breakfast": [],
                "lunch": [],
                "snacks": [],
               
            }});

       }
       
        // return res.status(201).json({ message: 'Meal added',data:findMyMeal});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
})




router.patch('/update-my-meals/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { mealId, date, type } = req.body;

        // Find the MyMeals document for the given userId and date
        let findMyMeal = await myMealsModel.findOne({ userId, date });

        if (!findMyMeal) {
            return res.status(404).json({ message: 'MyMeals document not found' });
        }

        // Construct the update operation to remove the mealId from the specified array
        const updateOperation = {};
        updateOperation['$pull'] = { [type]: { mealId } };

        // Update the MyMeals document
        const updateMeal = await myMealsModel.findOneAndUpdate({ userId, date }, updateOperation, { new: true });

        return res.status(201).json({ status: "meal-updated",message:"meal-updated", data: updateMeal });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// router.patch('/update-my-meals/:userId',async (req,res)=>{
//   try{
//     const userId = req.params.userId;
//     const {mealId,date,type}=req.body;
    
//     let findMyMeal= await myMealsModel.find({userId,date});

//     const updateOperation = {};
// updateOperation['$pull'] = { [type]: { mealId: mealId } }; 
//         console.log(updateOperation);
//     const updateMeal=await myMealsModel.findOneAndUpdate({userId:userId }, {updateOperation}, { new: true }).select()
//     return res.status(201).json({ status:"meal-updated",message: updateMeal});

    
//   }catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
// }
// // Replace 'breakfast' with the desired array

// })






router.get('/week-meal-plan/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Get the current date
        const currentDate = new Date();
        const d = new Date(currentDate.toISOString().split("T")[0]);
        // Calculate the date 7 days ago
        const sevenDays = new Date(d);
        sevenDays.setDate(sevenDays.getDate() + 7);
        // console.log(sevenDays,currentDate)
        const result = await myMealsModel.find({
            userId: userId,
            date: { $gte: d, $lte: sevenDays }
        }).populate('breakfast.mealId')
        .populate('lunch.mealId')
        .populate('snacks.mealId')
        .populate('dinner.mealId');
        const finalResult=[];

        for(i=0;i<7;i++){
            const setDay = new Date(currentDate.toISOString().split("T")[0]);
                    setDay.setDate(currentDate.getDate()+i)
            
            const value = result.find(element => element.date.toISOString().split("T")[0] == setDay.toISOString().split("T")[0]);
            console.log(setDay);
            console.log(value); // Returns 30
            if(!value){
                finalResult.push(
                    {
                
                        "userId": userId,
                        "date": setDay,
                        "dinner": [],
                        "breakfast": [],
                        "lunch": [],
                        "snacks": [],
                       
                    }
                )
                

            }
            else{
                finalResult.push(value);
            }
        }

        // for
        // for(i=0;i<7;i++){
        //     const setDay = new Date(currentDate);
        //             setDay.setDate(currentDate.getDate()+i)

        //     // console.log(currentDate,result)
            
        //     if(i<result.length){
        //         // console.log(i);
        //         if(result[i].date.getDate==setDay.getDate){
        //             finalResult.push(result[i]);
        //             console.log(finalResult[i]);
        //         }
        //     }
        //     else{

        //         if(finalResult[i])
                
        //         // const setDay = new Date(currentDate);
        //         //     setDay.setDate(currentDate.getDate()+i)
        //         finalResult.push(
        //             {
                
        //                 "userId": userId,
        //                 "date": setDay,
        //                 "dinner": [],
        //                 "breakfast": [],
        //                 "lunch": [],
        //                 "snacks": [],
                       
        //             }
        //         )
        //         console.log(finalResult[i]);
        //     }
        // }
        // // Aggregate query to find data for the last 7 days
        // const result = await myMealsModel.aggregate([
        //     {
        //         $match: {
        //             userId: userId,
        //             date: { $gte: sevenDays, $lte: currentDate }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$date",
        //             meals: { $push: "$$ROOT" }
        //         }
        //     }
        // ]);

        res.status(200).json({ data: finalResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});





module.exports = router;
