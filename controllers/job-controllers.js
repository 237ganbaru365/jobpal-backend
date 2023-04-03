let DUMMY_JOBS = [
  {
    id: "j1",
    title: "Junior FrontEnd Developer",
    location: "San Jose, CA",
    company: "JBC",
    originalPostUrl:
      "https://www.linkedin.com/jobs/view/3500310547/?refId=23f3bd75-9419-47ae-9243-297c64b2199f&trackingId=Q3Hq%2FJk6SAu%2FsMLXsPDpRQ%3D%3D",
    skills: ["HTML", "CSS", "React"],
    isApply: false,
    creator: "u1",
  },
];

const HttpError = require("../models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");

/*
!!1 -- if you wanna use third party API, you can import own async function from util dir
*/

const getJobByJobId = (req, res, next) => {
  const jobId = req.params.jid;
  const job = DUMMY_JOBS.find((job) => {
    return job.id === jobId;
  });

  if (!job) {
    // !!you cannnot use this if this function using async
    throw new HttpError("Could not find a job for the provided job id.", 404);
  }

  // REST API uses json data
  res.json({ job });
};

const getJobsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const jobs = DUMMY_JOBS.filter((job) => {
    return job.creator === userId;
  });

  if (!jobs || jobs.length === 0) {
    // !!when you use next() you have to return
    return next(
      new HttpError("Could not find jobs for the provided user id.", 404)
    );
  }

  res.json({ jobs });
};

/*
!!2 -- And then you can change create midleware using async. Note; if you use async function for your middleware, you CANNOT use nomal error, so you should RETURN next() to wrap youe error code.
*/

/*
!!3 -- then you can add your own async function to fetch other API inside. 
to do error handling, you can use try/catch. if you would catch error, you need to RETURN next() wrapped the error
*/

const createJob = (req, res, next) => {
  // this can check requirement you set and return error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes, please check your data.", 422);
  }

  const { title, location, company, originalPostUrl, skills, status, creator } =
    req.body;

  const createdJob = {
    id: uuid.v4(),
    title,
    location,
    company,
    originalPostUrl,
    skills,
    status,
    creator,
  };

  DUMMY_JOBS.push(createdJob);

  res.status(201).json({ job: createdJob });
};

const updateJob = (req, res, next) => {
  // this can check requirement you set and return error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes, please check your data.", 422);
  }

  const { title, location, company, originalPostUrl, skills, status } =
    req.body;
  const jobId = req.params.jid;

  //!! Do not touch original data
  //   BAD: const updatedJob = DUMMY_JOBS.find((job) => job.id === jobId);
  const updatedJob = { ...DUMMY_JOBS.find((job) => job.id === jobId) };
  const jobIndex = DUMMY_JOBS.findIndex((job) => job.id === jobId);

  updatedJob.title = title;
  updatedJob.location = location;
  updatedJob.company = company;
  updatedJob.originalPostUrl = originalPostUrl;
  updatedJob.skills = skills;
  updatedJob.status = status;

  DUMMY_JOBS[jobIndex] = updatedJob;

  res.status(200).json({ job: updatedJob });
};

const deleteJob = (req, res, next) => {
  const jobId = req.params.jid;
  const deletedJob = DUMMY_JOBS.find((job) => job.id === jobId);

  if (!deletedJob) {
    throw new HttpError("Could not find a placr for that id.", 404);
  }

  //!! Do not touch original data
  DUMMY_JOBS = DUMMY_JOBS.filter((job) => job.id !== jobId);

  res.status(200).json({ job: deletedJob });
};

exports.getJobByJobId = getJobByJobId;
exports.getJobsByUserId = getJobsByUserId;
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
