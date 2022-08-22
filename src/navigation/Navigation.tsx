import React from "react";
import { createNavigationContainerRef, RouteProp  } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(route: any, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(route, params);
      }
}
