const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    User.create({
        username,
        password
    }).then(res.json({ msg: "User Created Successfully" }))
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})
    res.json({ courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const username = req.headers.username

    // const courseName = await Course.findOne({ _id: courseId })
    // console.log(courseName);

    // try {
    //     const response = await User.updateOne(
    //         { username },
    //         { "$push": { purchasedCourse: courseId } }
    //     )
    //     res.json({ msg: "successfully purchased the " + courseName.title })
    // }
    // catch(err){
    //     console.log(err)
    //     res.status(500).json({error : "some error occured , your money is safe"})
    // }
    
    const response = await User.updateOne(
        {username},
        {"$push" : {purchasedCourses : courseId}}
    )
    res.json({msg:"Course Purchased Successfully"})

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username
    const user = await User.findOne({username})
    const purchasedCourses = await Course.find({_id : {"$in" : user.purchasedCourses}})
    res.json({purchasedCourses})
});

module.exports = routerresult = arr[i]