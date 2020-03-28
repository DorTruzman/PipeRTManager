import { TransformSharp, SettingsSharp, CreateSharp } from "@material-ui/icons";
import WorkAreaContainer from "../components/WorkArea";

export default {
  home: {
    dispName: "WORK AREA",
    path: "/",
    component: WorkAreaContainer,
    icon: CreateSharp
  }
  // mypipes: {
  //   dispName: "MY PIPELINES",
  //   path: "/mypipes",
  //   explicit: true,
  //   component: "MyPipes",
  //   icon: TransformSharp
  // },
  // settings: {
  //   dispName: "SETTINGS",
  //   path: "/settings",
  //   explicit: true,
  //   component: "Settings",
  //   icon: SettingsSharp
  // }
};
