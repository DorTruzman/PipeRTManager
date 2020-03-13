var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Index");
});

router.get("/routines", function(req, res, next) {
  const routines = {
    routines: [
      {
        name: "Listen2Redis",
        type: "HAS_TO_BE_FIRST"
      },
      {
        name: "Listen2Stream",
        type: "HAS_TO_BE_FIRST"
      },
      {
        name: "DoStuff"
      },
      {
        name: "DoMoreStuff"
      },
      {
        name: "Send2Redis",
        type: "HAS_TO_BE_LAST"
      }
    ]
  };

  res.json(routines);
});

router.get("/routineParams/:routineName", function(req, res, next) {
  const routines = {
    Listen2Redis: {
      name: "String",
      queue_out: "QueueOut"
    },
    DoStuff: {
      name: "String",
      queue_in: "QueueIn",
      queue_out: "QueueOut"
    },
    DoMoreStuff: {
      name: "String",
      queue_in: "QueueIn",
      queue_out: "QueueOut"
    },
    Listen2Stream: {
      name: "String",
      url: "String",
      fps: "Integer",
      queue_out: "QueueOut"
    },
    Send2Redis: {
      name: "String",
      queue_in: "QueueIn",
      redis_key: "RedisKey"
    }
  };

  res.json(routines[req.params.routineName]);
});

module.exports = router;
