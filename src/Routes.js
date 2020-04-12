import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Configurations from './Configurations';
import UserList from './UserList';
import Billing from './Billing';
import History from './History';
import Welcome from './Welcome';

const MainNavigator = createStackNavigator(
  {
    Welcome: {screen: Welcome},
    Billing: {screen: Billing},
    History: {screen: History},
    Configurations: {screen: Configurations},
    UserList: {screen: UserList},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Routes = createAppContainer(MainNavigator);

export default Routes;
