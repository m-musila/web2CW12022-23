const express = require("express");
// Create route object to handle requests
const router = express.Router();

// Import callbacks from controller
const controller = require("../controllers/controller");

router.get("/", controller.sign_in);
// router.post("/", controller.post_sign_up);
router.get("/signup", controller.sign_up);
// router.post("/signup", controller.post_sign_up);
router.get("/goals", controller.goals);
router.post("/goals", controller.post_goals);
router.get("/schedule", controller.schedule);
router.get("/about", controller.about_page);
router.use(controller.notFound);
router.use(controller.serverError);

module.exports = router;
