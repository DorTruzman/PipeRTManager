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
  console.log(JSON.stringify(req.body));

  res.json(req.body);
});

router.get("/component", (req, res) => {
  // const components = [
  /* {
      name: "Stream",
      queues: "video",
      routines: [
        {
          redis_read_key: "RedisIn",
          name: "ggg",
          fps: 30,
          out_queue: "ooo",
          routine_type_name: "ListenToStream",
        },
        {
          routine_type_name: "MessageToRedis",
          name: "fff",
          url: "fff",
          max_stream_length: 5,
          message_queue: "ooo",
          redis_send_key: "outTest",
        },
      ],
    },
    {
      name: "display",
      queues: "testing",
      routines: [
        {
          redis_read_key: "RedisIn",
          fps: 10,
          out_queue: "testing",
          routine_type_name: "listenToStream",
          name: "test",
        },
        {
          routine_type_name: "MessageToRedis",
          name: "test",
          url: "/test",
          max_stream_length: 50,
          message_queue: "testing",
          redis_send_key: "outTest",
        },
      ],
    },
    {*/
  let x = {
    components: {
      VideoCapture: {
        queues: ["from_camera"],
        routines: {
          listen_to_camera: {
            routine_type_name: "ListenToStream",
            url: "http://www.camera.com",
            fps: 24,
            out_queue: "from_camera",
          },
          frames_to_redis: {
            routine_type_name: "MessageToRedis",
            url: "/bla/bla",
            max_stream_length: 40,
            message_queue: "from_camera",
            redis_send_key: "redis_out",
          },
        },
      },
      Detection: {
        queues: ["data_out", "stuff_out", "stuff_2_out"],
        routines: {
          get_from_redis: {
            routine_type_name: "MessageFromRedis",
            redis_read_key: "redis_out",
            out_queue: "data_out",
          },
          do_some_stuff: {
            routine_type_name: "DoMoreStuff",
            message_queue: "data_out",
            out_queue: "stuff_out",
          },
          do_stuff_2: {
            routine_type_name: "DoStuff",
            message_queue: "stuff_out",
            out_queue: "stuff_2_out",
          },
          redis_out_final: {
            routine_type_name: "MessageToRedis",
            url: "/bla/bla",
            max_stream_length: 30,
            message_queue: "stuff_2_out",
            redis_send_key: "redis_out_2",
          },
        },
      },
    },
  };

  res.status(200).json(x);
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
