import React, { useState, useEffect } from 'react';
import s from './App.module.scss';
import Analytics from 'react-router-ga';
import { Route, HashRouter } from 'react-router-dom';
import Home from './routes/Home';
import { getRooms } from './helpers/API';
import { useDispatch } from 'redux-react-hook';
import { setRoomsWithData } from './store/actions';
import Room from './routes/Room';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getRooms().then(r => {
      dispatch(setRoomsWithData(r.items));
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div>
      {!isLoaded && (
        <div className={s.loader}>
          <CircularProgress />
        </div>
      )}
      {isLoaded && (
        <HashRouter>
          <Analytics id="UA-142485991-1" debug>
            <Route path="/" exact component={Home} />
            <Route path="/room/:id" exact component={Room} />
          </Analytics>
        </HashRouter>
      )}
    </div>
  );
}

export default App;
