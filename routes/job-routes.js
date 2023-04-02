const express = require("express");

const jobControllers = require("../controllers/job-controllers");

const router = express.Router();

router.get("/:jid", jobControllers.getJobByJobId);

router.get("/user/:uid", jobControllers.getJobByUserId);

router.post("/", jobControllers.createJob);

router.patch("/:jid", jobControllers.updateJob);

router.delete("/:jid", jobControllers.deleteJob);

module.exports = router;
