var router = require("express").Router();

const concert_controller = require("../../controllers/concert_controller");

router.get("/concerts", concert_controller.getall_concerts);
router.get("/concerts/:slug", concert_controller.getone_concert);
router.post("/concerts", concert_controller.create_concert);
router.delete("/concerts/:slug", concert_controller.delete_concert);
router.put("/concerts/:slug", concert_controller.update_concert);

module.exports = router;
