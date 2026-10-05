const prifix = "/doctor";
export const doctorRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prifix}`,
      },
      {
        title: "Doctor Approval",
        url: `${prifix}/approve-doctor`,
      },
    ],
  },
  {
    title: "Apps Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];
