import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from './app.routes';

function Routes(){
  const loading = false;
  const signed = false;


  return(
    //signed ? <View></View> : <AuthRoutes/>
    signed ? <AppRoutes/> : <AppRoutes/>
  )
}

export default Routes;