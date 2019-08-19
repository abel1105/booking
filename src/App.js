import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './routes/Home';
import { getRooms } from './helpers/API';
import { useDispatch } from 'redux-react-hook';
import { setRoomsWithData } from './store/actions';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRooms().then(r => {
      dispatch(setRoomsWithData(r.items));
      setIsLoading(true);
    });
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && (
        <Router>
          <Route path="/" exact component={Home} />
        </Router>
      )}
    </div>
  );
}

export default App;
