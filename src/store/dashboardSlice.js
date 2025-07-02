import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}admin/dashboard`);
      return res.data.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message || 'Dashboard fetch failed');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    metrics: {
      unassignedLeads: 0,
      assignedThisWeek: 0,
      activeSalespeople: 0,
      conversionRate: 0,
    },
    salesAnalytics: [],
    recentActivities: [],
    employeeTable: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboard: (state) => {
 
      state.metrics = {
        unassignedLeads: 0,
        assignedThisWeek: 0,
        activeSalespeople: 0,
        conversionRate: 0,
      };
      state.salesAnalytics = [];
      state.recentActivities = [];
      state.employeeTable = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.metrics;
        state.salesAnalytics = action.payload.salesAnalytics;
        state.recentActivities = action.payload.recentActivities;
        state.employeeTable = action.payload.employeeTable;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed";
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
