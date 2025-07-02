import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import leadSlice from './leadslice'
import employeeReducer from './employeeSlice'
import settingsReducer from './settingsSlics'

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    leads: leadSlice,
    employees: employeeReducer,
    settings: settingsReducer
  },
});

export default store;
