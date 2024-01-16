import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Home from './pages/Home';
import Activity from './pages/Activity';
import AddDevice from './pages/AddDevice';
import Settings from './pages/Settings';
import DeviceDetail from './pages/DeviceDetail';

function App() {
  return (
    <div className="App">
          <Router>
            <div className="container-edit">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/inventory" exact element={<Inventory />} />
              <Route path="/activity" exact element={<Activity />} />
              <Route path="/addDevice" exact element={<AddDevice />} />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="/test" exact element={<DeviceDetail />} />
            </Routes>
            </div>
          </Router>
    </div>
  );

}

export default App;