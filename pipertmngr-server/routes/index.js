var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Demo Pipeline Server Index");
});

router.get("/isAlive", function (req, res) {
  res.status(200).send();
});

router.get("/routines", function (req, res) {
  const routines = {
    routines: [
      {
        name: "MessageFromRedis",
        type: 0,
      },
      {
        name: "ListenToStream",
        type: 0,
      },
      {
        name: "DoStuff",
        type: 1,
      },
      {
        name: "DoMoreStuff",
      },
      {
        name: "MessageToRedis",
        type: 2,
      },
    ],
  };

  res.json(routines);
});

router.post("/pipeline", function (req, res) {
  res.json(req.body);
});

router.put("/kill", function (req, res) {
  res.status(200).send();
});

router.get("/routineParams/:routineName", function (req, res) {
  const routines = {
    MessageFromRedis: {
      name: "String",
      redis_read_key: "RedisIn",
      out_queue: "QueueOut",
    },
    DoStuff: {
      name: "String",
      message_queue: "QueueIn",
      out_queue: "QueueOut",
    },
    DoMoreStuff: {
      name: "String",
      message_queue: "QueueIn",
      out_queue: "QueueOut",
    },
    ListenToStream: {
      name: "String",
      url: "String",
      fps: "Integer",
      out_queue: "QueueOut",
    },
    MessageToRedis: {
      name: "String",
      url: "String",
      max_stream_length: "Integer",
      message_queue: "QueueIn",
      redis_send_key: "RedisOut",
    },
  };

  res.json(routines[req.params.routineName]);
});

module.exports = router;
