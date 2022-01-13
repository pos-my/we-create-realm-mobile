import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";

import { useAuth } from "./AuthProvider";

const NotificationContext = React.createContext(null);

const NotificationProvider = ({children}) => {
  const { user } = useAuth();
  const [notificationList, setNotificationList] = useState([]);
  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const config = {
      sync: {
        user: user,
        partitionValue: 'sync=yes',
        newRealmFileBehavior: {type: 'downloadBeforeOpen'},
        existingRealmFileBehavior: {type: 'openImmediately'},
      },
    };
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;
      const syncNotification = projectRealm.objects("Notification");
      setNotificationList([...syncNotification]);
      syncNotification.addListener(() => {
        setNotificationList([...syncNotification]);
      });
    }).catch((err) => {
      console.log("Notification sync error", err);
    });

    return () => {
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setNotificationList([]);
      }
    };
  }, [user])

  const resyncNotification = () => {
    const projectRealm = realmRef.current;
    const syncNotification = projectRealm.objects("Notification");
    setNotificationList([...syncNotification]);
  }

  return (
    <NotificationContext.Provider
      value={{
        notificationList,
        resyncNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context == null) {
    throw new Error("useNotification() called outside of a NotificationProvider?");
  }
  return context;
}

export {NotificationProvider, useNotification}