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

const getJobByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const job = DUMMY_JOBS.find((job) => {
    return job.creator === userId;
  });

  if (!job) {
    // !!when you use next() you have to return
    return next(
      new HttpError("Could not find a job for the provided user id.", 404)
    );
  }

  res.json({ job });
};

const createJob = (req, res, next) => {
  const {
    title,
    location,
    company,
    originalPostUrl,
    skills,
    isApply,
    creator,
  } = req.body;

  const createdJob = {
    id: uuid.v4(),
    title,
    location,
    company,
    originalPostUrl,
    skills,
    isApply,
    creator,
  };

  DUMMY_JOBS.push(createdJob);

  res.status(201).json({ job: createdJob });
};

const updateJob = (req, res, next) => {
  const { title, location, company, originalPostUrl, skills, isApply } =
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
  updatedJob.isApply = isApply;

  DUMMY_JOBS[jobIndex] = updatedJob;

  res.status(200).json({ job: updatedJob });
};

const deleteJob = (req, res, next) => {
  const jobId = req.params.jid;
  const deletedJob = DUMMY_JOBS.find((job) => job.id === jobId);

  //!! Do not touch original data
  DUMMY_JOBS = DUMMY_JOBS.filter((job) => job.id !== jobId);

  res.status(200).json({ job: deletedJob });
};

exports.getJobByJobId = getJobByJobId;
exports.getJobByUserId = getJobByUserId;
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
