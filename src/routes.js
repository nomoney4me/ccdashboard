import React from 'react';
import { Route } from 'react-router-dom';

import Loadable from 'react-loadable'

import DefaultLayout from './Pages/DefaultLayout';
import PanelistManager from './components/PanelistManager';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/pm', exact: true, name: 'Panelist Manager', component: PanelistManager }

  // { path: '/pm', exact: true, name: 'Panelist Manager', component: PanelistManager },
  
  // { path: '/arcsreport', exact: true, name: 'Report', component: Reports },
  // { path: '/arcsreport/officecount', exact: true, name: 'Office Count', component: OfficeCounts },
  // { path: '/arcsreport/latestusers', exact: true, name: 'Latest Users', component: LatestUsers },

  // { path: '/legacyreport/studyreport', exact: true, name: 'Study Report', component: StudyReport },

  // { path: '/it/pwexpiration', exact: true, name: 'Password Expiration Report', component: PwExpiration },
  
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/logout', name: 'Logout', component: Logout }
]

//   // --- default routes ---
//   // { path: '/theme', exact: true, name: 'Theme', component: Colors },
//   // { path: '/theme/colors', name: 'Colors', component: Colors },
//   // { path: '/theme/typography', name: 'Typography', component: Typography },
//   // { path: '/base', exact: true, name: 'Base', component: Cards },
//   // { path: '/base/cards', name: 'Cards', component: Cards },
//   // { path: '/base/forms', name: 'Forms', component: Forms },
//   // { path: '/base/switches', name: 'Switches', component: Switches },
//   // { path: '/base/tables', name: 'Tables', component: Tables },
//   // { path: '/base/tabs', name: 'Tabs', component: Tabs },
//   // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
//   // { path: '/base/carousels', name: 'Carousel', component: Carousels },
//   // { path: '/base/collapses', name: 'Collapse', component: Collapses },
//   // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
//   // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
//   // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
//   // { path: '/base/navbars', name: 'Navbars', component: Navbars },
//   // { path: '/base/navs', name: 'Navs', component: Navs },
//   // { path: '/base/paginations', name: 'Paginations', component: Paginations },
//   // { path: '/base/popovers', name: 'Popovers', component: Popovers },
//   // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
//   // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
//   // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
//   // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
//   // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
//   // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
//   // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
//   // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
//   // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
//   // { path: '/icons/flags', name: 'Flags', component: Flags },
//   // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
//   // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
//   // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
//   // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
//   // { path: '/notifications/badges', name: 'Badges', component: Badges },
//   // { path: '/notifications/modals', name: 'Modals', component: Modals },
//   // { path: '/widgets', name: 'Widgets', component: Widgets },
//   // { path: '/charts', name: 'Charts', component: Charts },
// ];

const Dashboard = () => {
  return <p>dashboard</p>
}

export default routes;
