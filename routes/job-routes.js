const express = require("express");
const { check } = require("express-validator");

const jobControllers = require("../controllers/job-controllers");

const router = express.Router();

router.get("/:jid", jobControllers.getJobByJobId);

router.get("/user/:uid", jobControllers.getJobsByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("location").not().isEmpty(),
    check("company").not().isEmpty(),
    check("originalPostUrl").isURL(),
    check("skills").not().isEmpty().isArray(),
    check("status").not().isEmpty().isArray(),
  ],
  jobControllers.createJob
);

router.patch(
  "/:jid",
  [
    check("title").not().isEmpty(),
    check("location").not().isEmpty(),
    check("company").not().isEmpty(),
    check("originalPostUrl").isURL(),
    check("skills").isArray().not().isEmpty(),
    check("status").isArray().not().isEmpty(),
  ],
  jobControllers.updateJob
);

router.delete("/:jid", jobControllers.deleteJob);

module.exports = router;
