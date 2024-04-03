const express = require('express');
const mealModel = require('../model/mealModel');
// const { find } = require('../model/childModel');
const myMealsModel = require('../model/myMealsModel');
const router = express.Router();

router.get('/dietplans',(req,res)=>{
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
       
       const allMeals= await mealModel.find();
        return res.status(200).json({ message: 'Meal added',data:allMeals });
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
        return res.status(400).json({ success: false, message: "Description is required"});
       }
        console.log(new Date(date))
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
        
        const queryDate=new Date(date);
        queryDate.setDate(queryDate.getDate()+1);
        console.log(queryDate.getDate()+1)
        const startOfDay = new Date(queryDate);
        startOfDay.setHours(0, 0, 0, 0);
        console.log(startOfDay);
        const endOfDay = new Date(queryDate);
        endOfDay.setHours(23, 59, 59, 999);
       let findMyMeal= await myMealsModel.findOne({userId:userId,
        date:date
    
    
    }).populate('breakfast.mealId')
       .populate('lunch.mealId')
       .populate('snacks.mealId')
       .populate('dinner.mealId').exec();
       
       if(findMyMeal){
        return res.status(201).json({ status:"meal-added",message: 'Meal added',data:findMyMeal});

        

       }else{
        // queryDate.setDate(queryDate.getDate()+1);
            return res.status(201).json({ status:"no-meal-added 123",message:  {
                
                "userId": userId,
                "date123":new Date(date)+1,
                "date": queryDate,
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

        return res.status(201).json({ status: "meal-updated", message: updateMeal });
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

        // Calculate the date 7 days ago
        const sevenDays = new Date(currentDate);
        sevenDays.setDate(sevenDays.getDate() + 7);
        console.log(sevenDays,currentDate)
        const result = await myMealsModel.find({
            userId: userId,
            date: { $gte: currentDate, $lte: sevenDays }
        }).populate('breakfast.mealId')
        .populate('lunch.mealId')
        .populate('snacks.mealId')
        .populate('dinner.mealId');
        const finalResult=[];

        for(i=0;i<7;i++){
            const setDay = new Date(currentDate);
                    setDay.setDate(currentDate.getDate()+i)
            // console.log(result[i].date.getDate.toString)
            if(i<result.length){
                if(result[i].date.getDate==setDay.getDate){
                    finalResult.push(result[i]);
                }
            }
            else{
                const setDay = new Date(currentDate);
                    setDay.setDate(currentDate.getDate()+i)
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
        }
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
