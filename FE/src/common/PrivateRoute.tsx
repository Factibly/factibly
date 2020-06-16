import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  /**
   * @property the TSX component to be rendered in the specific route
   */
  component: any;
  /**
   * @property <code>true</code> if the user is currentlly authenticated
   * within a valid session; <code>false</code> otherwise
   */
  isAuthenticated: boolean;
}

/**
 * @function PrivateRoute protects components from being accessed by non-registered users
 * @description
 * Use <code>PrivateRoute</code> rather than <code>Route</code> whenever the component should
 * (a) only be accessible when the user has signed in and (b) redirect the user to the sign-in
 * page if the user isn't currently signed in or if the user session has expired
 * @param props configured component properties
 */
const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuthenticated, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps: RouteProps) =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/account/sign-in",
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
