export default {
  SERVER_URL: "http://localhost:3000",
  ROUTE_GET_ROUTINES: "/routines",
  ROUTE_GET_ROUTINE_PARAMS: "/routineParams",
  ROUTE_SAVE_PIPELINE: "/pipeline",
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
    HasToBeFirst: "HAS_TO_BE_FIRST",
    HasToBeLast: "HAS_TO_BE_LAST"
  }
};
