import React from 'react';
import {
  ArchiveIcon,
  CallBoxStyle,
  CallDateStyle,
  CallDetailStyle,
  CallFromStyle,
  PhoneIncomingStyle,
  PhoneMissedStyle,
  VoicemailStyle,
  CallViaStyle,
  CallTimeStyle,
  ThreeDotVertStyle,
  ArchiveSwipeStyle,
  UndoStyle
} from "./InboxStyles";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const trailingActions = (handleCallArchive, isArchived) => (
  <TrailingActions>
    <SwipeAction onClick={() => handleCallArchive()} destructive={true}>
      <ArchiveSwipeStyle isArchived={isArchived}>
        {isArchived ? (
          <UndoStyle size="24" />
        ) : (
          <ArchiveIcon style={{ minWidth: "24px" }} />
        )}
      </ArchiveSwipeStyle>
    </SwipeAction>
  </TrailingActions>
);

const CallIcon = ({ callType }) => {
  if (callType === "answered") {
    return <PhoneIncomingStyle size="18" />;
  } else if (callType === "missed") {
    return <PhoneMissedStyle size="18" />;
  } else if (callType === "voicemail") {
    return <VoicemailStyle size="18" />;
  } else {
    return null;
  }
};

const CallVia = ({ via }) => {
  return (
    <React.Fragment>
      tried to call on
      <span style={{ fontSize: "12.7px", fontWeight: "900" }}> {via}</span>
    </React.Fragment>
  );
};

const CallFrom = ({ direction, from, to }) => {
  if (direction === "inbound") {
    return <React.Fragment>{from}</React.Fragment>;
  } else if (direction === "outbound") {
    return <React.Fragment>{to}</React.Fragment>;
  } else {
    return null;
  }
};

const CallBox = ({
  id,
  date,
  from,
  to,
  callType,
  isArchived,
  via,
  direction,
  activitiesRef,
  setActivities,
  makeActivities,
  callIndex
}) => {
  let newDate = new Date(date);
  let dateOptions = { year: "numeric", month: "long", day: "numeric" };
  let timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };
  let formatDate = new Intl.DateTimeFormat("en-US", dateOptions);
  let formatTime = new Intl.DateTimeFormat("en-US", timeOptions);
  let shortDate = formatDate.format(newDate);
  let fullTime = formatTime.format(newDate);
  let time = fullTime.match(/[\d:]+/);
  let ampm = fullTime.match(/PM|AM/);

  const handleCallArchive = () => {
    const _data = {
      is_archived: !isArchived
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(_data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    };

    fetch(`https://cerulean-marlin-wig.cyclic.app/${id}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        activitiesRef[callIndex].is_archived = json.is_archived;
        setActivities(makeActivities(activitiesRef));
      })
      .catch((err) => console.log(err));
  };

  return (
    <CallBoxStyle>
      <CallDateStyle>{shortDate}</CallDateStyle>
      <SwipeableList destructiveCallbackDelay={100}>
        <SwipeableListItem
          trailingActions={trailingActions(handleCallArchive, isArchived)}
        >
          <CallDetailStyle>
            <CallIcon callType={callType} />
            <CallFromStyle>
              <CallFrom direction={direction} to={to} from={from} />
              <CallViaStyle>
                <CallVia via={via} />
              </CallViaStyle>
            </CallFromStyle>
            <ThreeDotVertStyle size="16" />
            <CallTimeStyle>
              <div id="time">{time}</div>
              <div id="ampm">{ampm}</div>
            </CallTimeStyle>
          </CallDetailStyle>
        </SwipeableListItem>
      </SwipeableList>
    </CallBoxStyle>
  );
};

const ArchiveOrUndo = ({
  archiveOrUndo,
  activities,
  setActivities,
  makeActivities,
  activitiesRef
}) => {
  const handleArchiveAll = () => {
    activities.forEach((call, callIndex) => {
      const _data = {
        is_archived: true
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      };

      fetch(
        `https://cerulean-marlin-wig.cyclic.app/${call.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          activitiesRef[callIndex].is_archived = json.is_archived;
          setActivities(makeActivities(activitiesRef));
        })
        .catch((err) => console.log(err));
    });
  };

  const handleUndoAll = () => {
    activities.forEach((call, callIndex) => {
      const _data = {
        is_archived: false
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      };

      fetch(
        `https://cerulean-marlin-wig.cyclic.app/${call.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          activitiesRef[callIndex].is_archived = json.is_archived;
          setActivities(makeActivities(activitiesRef));
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <CallBoxStyle>
      {archiveOrUndo === "archive" ? (
        <CallDetailStyle
          onClick={handleArchiveAll}
          style={{ marginTop: "0", marginBottom: "10px", padding: "15px 0" }}
        >
          <ArchiveIcon />
          <span style={{ fontWeight: "600" }}>Archive all calls</span>
        </CallDetailStyle>
      ) : archiveOrUndo === "undo" ? (
        <CallDetailStyle
          onClick={handleUndoAll}
          style={{ marginTop: "0", marginBottom: "10px", padding: "15px 0" }}
        >
          <UndoStyle size="20" />
          <span style={{ fontWeight: "600" }}>Undo all archived calls</span>
        </CallDetailStyle>
      ) : null}
    </CallBoxStyle>
  );
};

export default function InboxFeed({
  activities,
  activitiesRef,
  makeActivities,
  setActivities
}) {
  if (activities) {
    return (
      <React.Fragment>
        <ArchiveOrUndo
          archiveOrUndo={"archive"}
          activities={activities}
          setActivities={setActivities}
          makeActivities={makeActivities}
          activitiesRef={activitiesRef}
        />
        {activities.map((call, callIndex) =>
          !call.is_archived ? (
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
}

export { CallBox, ArchiveOrUndo };
