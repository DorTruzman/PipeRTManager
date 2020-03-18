const SERVER_PORT = process.env.REST_API_PORT
  ? process.env.REST_API_PORT
  : "3000";

export default {
  SERVER_URL: process.env.REST_API_URL
    ? process.env.REST_API_URL
    : "http://" + window.location.hostname + ":" + SERVER_PORT,
  ROUTE_GET_ROUTINES: "/routines",
  ROUTE_GET_ROUTINE_PARAMS: "/routineParams",
  ROUTE_SAVE_PIPELINE: "/pipeline",
  ROUTE_KILL_PIPELINE: "/kill",
  QUEUE_READ: "message_queue",
  QUEUE_SEND: "out_queue",
  REDIS_READ: "redis_read_key",
  REDIS_SEND: "redis_send_key",
  DataTypes: {
    Integer: "Integer",
    String: "String",
    QueueRead: "QueueRead",
    QueueSend: "QueueSend"
  },
  RoutineTypes: {
    HasToBeFirst: 0,
    HasToBeLast: 2
  }
};
