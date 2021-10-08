import './App.css';
import { Route } from 'react-router-dom';
import LineChart from './components/Chart/LineChart';
import StorageTable from './components/Table/StorageTable';

const App = () => {
  return (
    <div className="App">
      <Route path="/table" component={StorageTable} />
      <Route path="/chart" component={LineChart} />
    </div>
  );
}

export default App;
