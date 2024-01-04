import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from "react";
import Header from './Header.jsx';
import InboxFeed from "./components/Inbox.js";
import { AllCallsView } from "./components/AllCalls.js";
import BottomNavBar from "./components/BottomNavBar";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";

function makeActivities(activities) {
  let act = activities.map((call) => {
    return {
      id: call.id,
      created_at: call.created_at,
      direction: call.direction,
      from: call.from,
      to: call.to,
      via: call.via,
      duration: call.duration,
      is_archived: call.is_archived,
      call_type: call.call_type
    };
  });
  return act;
}

export default function App() {
  const activitiesRef = useRef(null);
  const [activities, setActivities] = useState(null);
  const [seeArchive, setSeeArchive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const fetchActivities = () => {
    const APIaddress = "https://cerulean-marlin-wig.cyclic.app/activities";

    fetch(APIaddress)
      .then((res) => res.json())
      .then(
        (data) => {
          activitiesRef.current = data;
          setActivities(data);
        },
        (error) => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchActivities();
    setIsLoaded(true);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="app">
        <div className="container">
          <Header setSeeArchive={setSeeArchive} seeArchive={seeArchive} />
          <div className="container-view">
            {seeArchive ? (
              <AllCallsView
                activities={activities}
                activitiesRef={activitiesRef.current}
                makeActivities={makeActivities}
                setActivities={setActivities}
              />
            ) : (
              <InboxFeed
                activities={activities}
                activitiesRef={activitiesRef.current}
                makeActivities={makeActivities}
                setActivities={setActivities}
              />
            )}
          </div>
          <BottomNavBar />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
