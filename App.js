import { PeopleProvider } from './src/providers/PeopleProvider';
import { MainNavigator } from './src/navigators/MainNavigator';

export default function App() {
  return (
    <PeopleProvider>
      <MainNavigator />
    </PeopleProvider>
  );
}
