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
        name: "MessageFromRedis",
        type: "HAS_TO_BE_FIRST"
      },
      {
        name: "ListenToStream",
        type: "HAS_TO_BE_FIRST"
      },
      {
        name: "DoStuff"
      },
      {
        name: "DoMoreStuff"
      },
      {
        name: "MessageToRedis",
        type: "HAS_TO_BE_LAST"
      }
    ]
  };

  res.json(routines);
});

router.post("/pipeline", function(req, res, next) {
  res.json(req.body);
});

router.get("/routineParams/:routineName", function(req, res, next) {
  const routines = {
    MessageFromRedis: {
      name: "String",
      redis_read_key: "RedisIn",
      out_queue: "QueueOut"
    },
    DoStuff: {
      name: "String",
      message_queue: "QueueIn",
      out_queue: "QueueOut"
    },
    DoMoreStuff: {
      name: "String",
      message_queue: "QueueIn",
      out_queue: "QueueOut"
    },
    ListenToStream: {
      name: "String",
      url: "String",
      fps: "Integer",
      out_queue: "QueueOut"
    },
    MessageToRedis: {
      name: "String",
      url: "String",
      max_stream_length: "Integer",
      message_queue: "QueueIn",
      redis_send_key: "RedisOut"
    }
  };

  res.json(routines[req.params.routineName]);
});

module.exports = router;
