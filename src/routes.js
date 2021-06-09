import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getLoggedInUser, isUserAuthenticated } from './helpers/authUtils';
import ConfirmAccount from './pages/account/Confirm';
import ForgetPassword from './pages/account/ForgetPassword';
import Register from './pages/account/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Config from './pages/businessGame/config';
import Dashboard from './pages/Dashboard';
import Dash from './pages/Dash'
import { FinEdgeHome } from './pages/FinEdge/home';
import { ModalsTest } from './pages/FinEdge/modalsTest';
import { Ranking } from './pages/FinEdge/ranking';
import { TheoryRules } from './pages/FinEdge/theoryRules';
import Wallet from './pages/FinEdge/wallet';
import Module from './pages/moderator/module/Module';
import ModuleConfigurations from './pages/moderator/module/ModuleConfigurations';
import ModuleNotions from './pages/moderator/module/ModuleNotions';
import ModuleQuiz from './pages/moderator/module/ModuleQuiz';
import ModuleSessions from './pages/moderator/module/ModuleSessions';
import StudentManagement from './pages/moderator/module/StudentManagement';
import ModuleDetail from './pages/module/Module';
import NotFound from './pages/NotFound';
import ListQuiz from './pages/quiz/ListQuiz';
import Quiz from './pages/quiz/Quiz';
import { StratEdgeAnalysis } from './pages/StratEdge/admin/StratEdgeAnalysis';
import { StratEdgeCompetitorAnalysis } from './pages/StratEdge/admin/StratEdgeCompetitorAnalysis';
import { StratEdgeMarketAnalysis } from './pages/StratEdge/admin/StratEdgeMarketAnalysis';
import { StratEdgeProductAnalysis } from './pages/StratEdge/admin/StratEdgeProductAnalysis';
import { StratEdgeStrategicDecisions } from './pages/StratEdge/admin/StratEdgeStrategicDecisions';
import { Analysis } from './pages/StratEdge/Analysis';
import { Atterissage } from './pages/StratEdge/Atterissage';
import { BsTimeline } from './pages/StratEdge/BsTimeline';
import { CompetitorAnalysis } from './pages/StratEdge/CompetitorAnalysis';
import { MarketAnalysis } from './pages/StratEdge/MarketAnalysis';
import { ProductAnalysis } from './pages/StratEdge/ProductAnalysis';
import { SavedScenarios } from './pages/StratEdge/SavedScenarios';
import { StrategicDecisions } from './pages/StratEdge/StrategicDecisions';
import { TestP } from './pages/StratEdge/TestP';
import Badges from './pages/strategicGame/participant/badges';
import Centre from './pages/strategicGame/participant/centre/index';
import Classement from './pages/strategicGame/participant/classement';
import ClassementModerator from './pages/strategicGame/participant/classementModerator';
import DayOne from './pages/strategicGame/participant/days/day';
import Day10 from './pages/strategicGame/participant/days/day10/index';
import Day2 from './pages/strategicGame/participant/days/day2/index';
import Day3 from './pages/strategicGame/participant/days/day3/index';
import Day4 from './pages/strategicGame/participant/days/day4/index';
import Day5 from './pages/strategicGame/participant/days/day5/index';
// import Drag from './pages/test-d/drag';
import Day7 from './pages/strategicGame/participant/days/day7/index';
import Day8 from './pages/strategicGame/participant/days/day8/index';
import Day9 from './pages/strategicGame/participant/days/day9/index';
import Menu from './pages/strategicGame/participant/menu';
import Parcours from './pages/strategicGame/participant/parcours';
import Rapport from './pages/strategicGame/participant/rapport';
import RapportActivite from './pages/strategicGame/participant/RapportActivite/index.jsx';
import Regle from './pages/strategicGame/participant/Regle/index.jsx';
import { MarketView } from './pages/FinEdge/marketView';
import { StatisticsRisks } from './pages/FinEdge/statisticsRisks';



const PrivateRoute = ({component: Component, roles, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const isAuthTokenValid = isUserAuthenticated();
      if (!isAuthTokenValid) {
        return (
          <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (roles && roles.indexOf(loggedInUser.role.name) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{pathname: '/NotFound'}} />;
      }

      return <Component {...props} />;
    }}
  />
);

const routes = [
  {path: '/login', name: 'Login', component: Login, route: Route},
  {path: '/logout', name: 'Logout', component: Logout, route: Route},
  {
    path: '/forget-password',
    name: 'Forget Password',
    component: ForgetPassword,
    route: Route,
  },
  {path: '/register', name: 'Register', component: Register, route: Route},
  {path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route},

  {path: '/not-found', name: 'NotFound', component: NotFound, route: Route},
  {path: '/dash', name: 'Dash', component: Dash, route: Route},

  /*  Participant Routes */
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    route: PrivateRoute,
    roles: ['Participant'],
    title: 'Dashboard',
  },

    // Adding testing route start
  // {
  //   path: '/dash',
  //   name: 'Dash',
  //   component: Dashboard,
  //   route: PrivateRoute,
  //   roles: ['Participant'],
  //   title: 'Dash',
  // },
    // Adding testing route end
  {
    path: '/module/:moduleID/quizzes',
    name: 'ListQuiz',
    component: ListQuiz,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
  },
  {
    path: '/module/:moduleID',
    name: 'ModuleDetail',
    component: ModuleDetail,
    route: PrivateRoute,
    roles: ['Participant'],
    title: 'Module Detail',
  },

  {
    path: '/StratEdge',
    name: 'Atterissage',
    component: Atterissage,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'Layout',
  },

  {
    path: '/StratEdge/bsn',
    name: 'StudentManagement',
    component: TestP,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/StratEdge/analysis',
    name: 'Analysis',
    component: Analysis,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },

  {
    path: '/StratEdge/strategic-decisions',
    name: 'StrategicDecisions',
    component: StrategicDecisions,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/StratEdge/saved-scenarios',
    name: 'StrategicDecisions',
    component: SavedScenarios,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },

  {
    path: '/module/:moduleID/:quizCompetitionId/quiz/:quizID',
    name: 'Quiz',
    component: Quiz,
    route: PrivateRoute,
    roles: ['Participant', 'Moderator'],
    title: '',
    layout: 'QuizLayout',
  },

  // {
  //   path: '/test-page',
  //   name: 'testPage',
  //   component: TestPage,
  //   route: PrivateRoute,
  //   roles: ['Participant', 'Moderator'],
  //   title: 'test-Page',
  // },



  {
    path: '/FinEdge/modals',
    name: 'ModalsTest',
    component: ModalsTest,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'Layout',
  },

  {
    path: '/FinEdge',
    name: 'FinEdgeHome',
    component: FinEdgeHome,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'Layout',
  },



  {
    path: '/FinEdge/theory-rules',
    name: 'TheoryRules',
    component: TheoryRules,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'FinEdgeLayout',
  },


  {
    path: '/FinEdge/ranking',
    name: 'Ranking',
    component: Ranking,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'FinEdgeLayout',
  },


  {
    path: '/FinEdge/Wallet',
    name: 'Ranking',
    component: Wallet,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'FinEdgeLayout',
  },
  {
    path: '/FinEdge/market',
    name: 'MarketView',
    component: MarketView,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'FinEdgeLayout', 
  },
  {
    path: '/FinEdge/statistics-risks',
    name: 'StatisticsRisks',
    component: StatisticsRisks,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'FinEdgeLayout',
  },


  /*  END Participant Routes */



    /* Moderator Cours Testing*/
  {
    path: '/moderator/modules/:coursID/config',
    name: 'ConfigModule',
    component: ModuleConfigurations,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },




  /*  Moderator Routes */
  {
    path: '/moderator/modules/:moduleID/config',
    name: 'ConfigModule',
    component: ModuleConfigurations,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules/:moduleID/notions/show',
    name: 'ShowNotion',
    component: ModuleDetail,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules/:moduleID/config/quiz',
    name: 'QuizConfigModule',
    component: ModuleQuiz,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules/:moduleID/quiz/show',
    name: 'ShowQuiz',
    component: ListQuiz,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules/:moduleID/sessions',
    name: 'ModuleSessions',
    component: ModuleSessions,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules/:moduleID/notions',
    name: 'ModuleNotions',
    component: ModuleNotions,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules',
    name: 'ModeratorModules',
    component: Module,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/modules/:trainingSessionId/student-management',
    name: 'StudentManagement',
    component: StudentManagement,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  {
    path: '/moderator/StratEdge/analysis',
    name: 'StratEdgeAnalysis',
    component: StratEdgeAnalysis,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/moderator/timeline-tours',
    name: 'BsTimeline',
    component: BsTimeline,
    route: PrivateRoute,
    roles: ['Moderator', 'Participant'],
    title: '',
    layout: 'Layout',
  },
  {
    path: '/StratEdge/simulations',
    name: 'Simulations',
    component: TestP,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/moderator/StratEdge/product-analysis',
    name: 'StratEdgeProductAnalysis',
    component: StratEdgeProductAnalysis,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/StratEdge/product-analysis',
    name: 'ProductAnalysis',
    component: ProductAnalysis,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/StratEdge/competitor-analysis',
    name: 'CompetitorAnalysis',
    component: CompetitorAnalysis,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/moderator/StratEdge/competitor-analysis',
    name: 'StratEdgeCompetitorAnalysis',
    component: StratEdgeCompetitorAnalysis,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/moderator/StratEdge/market-analysis',
    name: 'StratEdgeMarketAnalysis',
    component: StratEdgeMarketAnalysis,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/StratEdge/market-analysis',
    name: 'MarketAnalysis',
    component: MarketAnalysis,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/moderator/StratEdge/strategic-decisions',
    name: 'StratEdgeStrategicDecisions',
    component: StratEdgeStrategicDecisions,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'BusinessGameLayout',
  },
  {
    path: '/moderator/business-game/:gameConfigurationId',
    name: 'businessGame',
    component: Config,
    route: PrivateRoute,
    roles: ['Moderator'],
    title: '',
    layout: 'ModuleConfig',
  },
  // PV GAMES
  {
    path: '/pv-game',
    name: 'strategicGame-strategic-game',
    component: Menu,
    route: PrivateRoute,
    roles: [ 'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/classement',
    name: 'strategicGame-classement',
    component: Classement,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/moderator/pv-game/classement',
    name: 'strategicGame-classement',
    component: ClassementModerator,
    route: PrivateRoute,
    roles: [  'Moderator'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/parcours',
    name: 'strategicGame-parcours',
    component: Parcours,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/badges',
    name: 'strategicGame-badges',
    component: Badges,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },

  {
    path: '/pv-game/day/6',
    name: 'strategicGame',
    component: Rapport,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/2',
    name: 'strategicGame',
    component: Day2,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/3',
    name: 'strategicGame',
    component: Day3,
    route: PrivateRoute,
    roles: [ 'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/4',
    name: 'strategicGame',
    component: Day4,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/5',
    name: 'strategicGame',
    component: Day5,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/7',
    name: 'strategicGame',
    component: Day7,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/8',
    name: 'strategicGame',
    component: Day8,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/9',
    name: 'strategicGame',
    component: Day9,
    route: PrivateRoute,
    roles: [ 'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/10',
    name: 'strategicGame',
    component: Day10,
    route: PrivateRoute,
    roles: [  'Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/day/1',
    name: 'strategicGame',
    component: DayOne,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/centre',
    name: 'strategicGame',
    component: Centre,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  // {
  //   path: '/moderator/Drag',
  //   name: 'strategicGame',
  //   component: Drag,
  //   route: PrivateRoute,
  //   roles: ['Participant'],
  //   title: '',
  //   layout: 'strategicGameLayout',
  // },
  {
    path: '/pv-game/activity-report',
    name: 'strategicGame',
    component: RapportActivite,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },
  {
    path: '/pv-game/game-rule',
    name: 'strategicGame',
    component: Regle,
    route: PrivateRoute,
    roles: ['Participant'],
    title: '',
    layout: 'strategicGameLayout',
  },

  /*  Moderator Routes */
  {
    path: '/',
    exact: true,
    component: () =>
      getLoggedInUser().role.id === 2 ? (
        <Redirect to="/moderator/modules" />
      ) : (
        <Redirect to="/dashboard" />
      ),
    route: PrivateRoute,
  },
];

export { routes, PrivateRoute };

