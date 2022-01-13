import * as React from "react";
import { Button } from "react-native";
import { useNotification } from "../providers/NotificationProvider";

export function RefreshNotification() {
  const { resyncNotification } = useNotification();

  return (
    <Button
      title="Refresh"
      onPress={() => {        
        resyncNotification();
      }}/>
  );
}