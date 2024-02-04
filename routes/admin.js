const { Router, response } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    Admin.create({
        username,
        password
    }).then(()=>{
        res.json({msg:"Admin Created Successfully"})
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink
    const response = await Course.create({
        title,
        description,
        price,
        imageLink
    })
        // console.log(response)
        res.json({msg:"Course Created Successfully",courseId:response._id})
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({courses})
});

module.exports = router;