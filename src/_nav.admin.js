export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
      },
    },
    {
      title: true,
      name: 'Offices',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Panelist Manager',
      url: '/pm',
      icon: 'icon-people',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Project Managers',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'ARCS Reports',
      url: '/arcsreport',
      icon: 'icon-pencil',
      wrapper: {
        element: 'testing',
        attributes: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      children: [
        { name: "Office Count", url: "/arcsreport/officecount", },
        { name: "Latest Users", url: "/arcsreport/latestusers", }
      ],
    },
    {
      name: 'Legacy Reports',
      url: '/legacyreport',
      icon: 'icon-chart',
      wrapper: {
        element: 'testing',
        attributes: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      children: [
        { name: "Study Report", url: "/legacyreport/studyreport" },
      ],
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'IT',
      
    },
    {
      name: 'Reports',
      url: '/IT',
      icon: 'icon-chart',
      wrapper: {
        element: 'testing',
        attributes: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      children: [
        { name: "Password Expiration", url: "/IT/pwexpiration" },
      ],
    },
   
    
  ],
};
