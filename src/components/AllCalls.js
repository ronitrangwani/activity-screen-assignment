import React from 'react';
import {
  ToggleSwitchStyle,
  ActivitySwitchBtn,
  ToggleSwitchBtn
} from "./AllCallsStyles";
import { CallBox, ArchiveOrUndo } from "./Inbox";
import { ThreeDotVertStyle } from "./AllCallsStyles";


const ToggleSwitch = ({ setSeeArchive, seeArchive }) => {
  return (
    <React.Fragment>
      <ToggleSwitchStyle seeArchive={seeArchive}>
        <div id="btn"></div>
        <ActivitySwitchBtn
          seeArchive={seeArchive}
          onClick={() => setSeeArchive(false)}
        >
          Inbox
        </ActivitySwitchBtn>
        <ThreeDotVertStyle />
        <ToggleSwitchBtn
          seeArchive={seeArchive}
          onClick={() => setSeeArchive(true)}
        >
          All Calls
        </ToggleSwitchBtn>
        <ThreeDotVertStyle />
        <img src="../../public/assets/filter.png" style={{
          display: "block",
          minWidth: "20px",
          zIndex: 5,
          height: "20px",
          transform: " translate(1px, 17px)",
          backgroundColor: "transparent",
          border: "none",
          borderTop: "none",
          borderLeft: "none",
          paddingRight: "12px",
          paddingLeft: "10px",
          borderBottomRightRadius: 0,
          boxShadow: "none",
          paddingBottom: "10px",
        }} />
      </ToggleSwitchStyle>
    </React.Fragment>
  );
};

const AllCallsView = ({
  activities,
  activitiesRef,
  makeActivities,
  setActivities
}) => {
  if (activities) {
    return (
      <React.Fragment>
        <ArchiveOrUndo
          archiveOrUndo={"undo"}
          activities={activities}
          setActivities={setActivities}
          makeActivities={makeActivities}
          activitiesRef={activitiesRef}
        />
        {activities.map((call, callIndex) =>
          call.is_archived ? (
            <CallBox
              key={call.id}
              date={call.created_at}
              from={call.from}
              to={call.to}
              callType={call.call_type}
              isArchived={call.is_archived}
              via={call.via}
              direction={call.direction}
              id={call.id}
              activitiesRef={activitiesRef}
              makeActivities={makeActivities}
              setActivities={setActivities}
              callIndex={callIndex}
            />
          ) : null
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export { ToggleSwitch, AllCallsView };
