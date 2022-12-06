// Include module
const express = require("express");
const { signin } = require("../auth/auth");
const { verify } = require("../auth/auth");
// Create route object to handle requests
const router = express.Router();

// Import callbacks from controller
const controller = require("../controllers/controller");

router.get("/", controller.landing_page);
router.get("/signin", controller.sign_in);
router.get("/signup", controller.sign_up);
router.post("/signup", controller.post_sign_up);

router.post("/signin", signin, controller.handle_signin);

router.get("/update", verify, controller.update);
router.post("/update", verify, controller.post_update);
router.get("/goals", verify, controller.goals);
router.post("/goals", verify, controller.post_goals);
router.get("/remove", verify, controller.remove);
router.post("/remove", verify, controller.post_remove);
router.get("/schedule", verify, controller.schedule);
router.get("/about", controller.about_page);
router.get("/posts/:category", verify, controller.show_by_category);
router.get("/logout", controller.logout);
router.use(controller.notFound);
router.use(controller.serverError);

module.exports = router;
