import ServerConfig from "../config/server";

const ServerUtils = {
  isAlive: async () => {
    return fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_IS_ALIVE);
  },
  getRoutineParams: async (routineName) => {
    const routineParams = await fetch(
      ServerConfig.SERVER_URL +
        ServerConfig.ROUTE_GET_ROUTINE_PARAMS +
        "/" +
        routineName
    );

    return routineParams.json();
  },
  getRoutines: async () => {
    let routineList = await fetch(
      ServerConfig.SERVER_URL + ServerConfig.ROUTE_GET_ROUTINES
    );

    routineList = await routineList.json();

    return routineList.routines;
  },
  getComponent: async () => {
    let components = await fetch(
      ServerConfig.SERVER_URL + ServerConfig.ROUTE_GET_COMPONENT
    );
    components = await components.json();

    return components;
  },
  killPipeline: async () => {
    return fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_KILL_PIPELINE, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
  savePipeline: async (pipeline) => {
    return fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_SAVE_PIPELINE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pipeline),
    });
  },
};

export default ServerUtils;
