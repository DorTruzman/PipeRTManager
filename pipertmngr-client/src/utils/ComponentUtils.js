import ServerConfig from "../config/server";

const ComponentUtils = {
  createComponent: (components, newComponentName) => {
    let mutableComponents = [...components];
    let mutableName = newComponentName.toString();

    mutableComponents.forEach(componentData => {
      if (mutableName === componentData.name) {
        mutableName = "Copy of " + mutableName;
      }
    });

    mutableComponents.push({
      name: mutableName
    });

    return mutableComponents;
  },
  deleteComponent: (components, nameToDelete) => {
    return components.filter(currentComponent => {
      return currentComponent.name !== nameToDelete;
    });
  },
  createRoutine: (components, componentName, routineToCreate) => {
    let mutableComponents = [...components];
    let updatedComponent = null;

    for (let i = 0; i < mutableComponents.length; i++) {
      let currentComponent = mutableComponents[i];

      if (componentName === currentComponent.name) {
        if (!currentComponent.routines) {
          currentComponent.routines = [];
        }

        currentComponent.routines.push(routineToCreate);
        updatedComponent = currentComponent;
        break;
      }
    }

    return {
      components: mutableComponents,
      updatedComponent
    };
  },
  checkForRoutine: (component, routineTypeName) => {
    if (!component || !component.routines) {
      return false;
    }

    for (let i = 0; i < component.routines.length; i++) {
      if (component.routines[i].routine_type_name === routineTypeName) {
        return true;
      }
    }

    return false;
  },
  checkForRoutineType: (component, routineType) => {
    if (!component || !component.routines) {
      return false;
    }

    for (let i = 0; i < component.routines.length; i++) {
      if (component.routines[i].routine_type === routineType) {
        return true;
      }
    }

    return false;
  },
  getAllComponentQueues: component => {
    let queues = { QueueIn: [], QueueOut: [] };

    if (!component || !component.routines) {
      return queues;
    }

    for (let i = 0; i < component.routines.length; i++) {
      let currentParams = Object.keys(component.routines[i].params);
      for (let j = 0; j < currentParams.length; j++) {
        if (currentParams[j] === ServerConfig.QUEUE_READ) {
          queues.QueueIn.push(component.routines[i].params[currentParams[j]]);
        } else if (currentParams[j] === ServerConfig.QUEUE_SEND) {
          queues.QueueOut.push(component.routines[i].params[currentParams[j]]);
        }
      }
    }

    return queues;
  }
};

export default ComponentUtils;
