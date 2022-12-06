// Include module
const express = require("express");
// Create route object to handle requests
const router = express.Router();

// Import callbacks from controller
const controller = require("../controllers/controller");

router.get("/", controller.landing_page);
router.get("/signin", controller.sign_in);
// router.post("/signin", controller.post_sign_up);
router.get("/signup", controller.sign_up);
// router.post("/signup", controller.post_sign_up);
router.get("/update", controller.update);
router.post("/update", controller.post_update);
router.get("/goals", controller.goals);
router.post("/goals", controller.post_goals);
router.get("/remove", controller.remove);
router.post("/remove", controller.post_remove);
router.get("/schedule", controller.schedule);
router.get("/about", controller.about_page);
router.get("/posts/:category", controller.show_by_category);
// router.get("/posts/:date", controller.remove);
router.use(controller.notFound);
router.use(controller.serverError);

module.exports = router;
