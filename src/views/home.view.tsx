import React, { useEffect, useState } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { getLatest } from '../models/screentext';
import useInterval from '../components/useIntervalHook';

type InformationType = {
  body: string;
  senderName: string;
  timestamp: string;
};

const defaultInformation: InformationType = {
  body: 'Some message',
  senderName: 'John Smith',
  timestamp: '1624440170',
};

const HomeView = () => {
  const [user, setUser] = useState(null);
  const [information, setInformation] = useState<InformationType>(defaultInformation);
  const [oldInformation, setOldInformation] = useState<InformationType>(defaultInformation);

  useInterval(() => {
    fetchLatest();
  }, 3000);

  useEffect(() => {
    getUser();
    fetchLatest();
  }, []);

  const fetchLatest = () => {
    getLatest().then((res) => {
      if (res.timestamp != information.timestamp) {
        setInformation(res);
        getUser();
      }
    });
  };

  const getUser = () => {
    fetch('https://randomuser.me/api/?inc=picture,name')
      .then((resp) => resp.json())
      .then((result) => {
        const newUser = result.results[0];
        setUser(newUser);
      });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="message-view">
      <div>
        <div className="profile-picture" style={{ backgroundImage: `url('${user.picture.large}')` }} />
        <div className="message">{information.body}</div>
        <div className="name">{`${user.name.first} ${user.name.last}`}</div>
      </div>
    </div>
  );
};

export default HomeView;
