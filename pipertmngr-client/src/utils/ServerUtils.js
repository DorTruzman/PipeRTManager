import ServerConfig from "../config/server";

const ServerUtils = {
    getRoutines = async () => {
        let routineList = await fetch(
            ServerConfig.SERVER_URL + ServerConfig.ROUTE_GET_ROUTINES
          );
          
        routineList = await routineList.json();

        return routineList.routines;
    },
    killPipeline = async () => {
        return fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_KILL_PIPELINE, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          });
    },
    savePipeline = async (pipeline) => {
        return fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_SAVE_PIPELINE, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(pipeline)
          })
    }
};

export default ServerUtils;
