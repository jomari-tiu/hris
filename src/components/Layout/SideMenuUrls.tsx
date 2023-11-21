import { AiFillSetting } from "react-icons/ai";
import {
  BsCalendar2Range,
  BsPersonVcard,
  BsRecordCircleFill,
  BsGraphUp,
} from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { GrDocumentPerformance } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export type SideMenuLinksType = {
  title: string;
  url: string;
  icon: React.ReactNode;
  submenu?: {
    title: string;
    url: string;
  }[];
};

export const SideMenuLinks: SideMenuLinksType[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    title: "Employee",
    url: "/employee-management",
    icon: <BsPersonVcard />,
    submenu: [
      {
        title: "Profile",
        url: "/employee-management/profile",
      },
      {
        title: "Training Records",
        url: "/employee-management/training-records",
      },
    ],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: <BsCalendar2Range />,
  },
  {
    title: "Leave Management",
    url: "/leave-management",
    icon: <BsRecordCircleFill />,
  },
  {
    title: "Performance Management",
    url: "/performance-management",
    icon: <BsGraphUp />,
    submenu: [
      {
        title: "IPCR",
        url: "/performance-management/ipcr",
      },
      // {
      //   title: "OPCR",
      //   url: "/performance-management/opcr",
      // },
    ],
  },
  // {
  //   title: "HR Analytics and Reports",
  //   url: "/hr-analytics-and-report",
  //   icon: <MdPeopleAlt />,
  //   submenu: [
  //     {
  //       title: "Data Analysis to compute habitual tardiness",
  //       url: "/hr-analytics-and-report/data-analysis-to-compute-habitual-tardiness",
  //     },
  //     {
  //       title: "Report Generation",
  //       url: "/hr-analytics-and-report/report-Generation",
  //     },
  //     {
  //       title: "Data Visualization",
  //       url: "/hr-analytics-and-report/data-visualization",
  //     },
  //   ],
  // },
  {
    title: "Admin Settings",
    url: "/admin-settings",
    icon: <RiAdminFill />,
    submenu: [
      {
        title: "User Management",
        url: "/admin-settings/user-management",
      },
      {
        title: "Audit Logs",
        url: "/admin-settings/audit-logs",
      },
    ],
  },
  {
    title: "System Settings",
    url: "/system-settings",
    icon: <AiFillSetting />,
    submenu: [
      {
        title: "Leave Type",
        url: "/system-settings/leave-type",
      },
      {
        title: "Department",
        url: "/system-settings/department",
      },
      {
        title: "Position",
        url: "/system-settings/position",
      },
      {
        title: "Employee Status",
        url: "/system-settings/employee-status",
      },
    ],
  },
];
