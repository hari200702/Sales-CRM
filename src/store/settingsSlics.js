import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchAdminProfile = createAsyncThunk(
  'settings/fetchAdminProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}admin/profile`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
    }
  }
);


export const updateAdminProfile = createAsyncThunk(
  'settings/updateAdminProfile',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}admin/profile`, formData);
      
      if (res.data.success) {
        dispatch(fetchAdminProfile()); 
      }

      return res.data.message; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile');
    }
  }
);


const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    updateStatus: null 
  },
  reducers: {
    clearUpdateStatus(state) {
      state.updateStatus = null;
    },
    clearSettings(state) {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.updateStatus = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateStatus = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateStatus = action.payload; 
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateStatus = null;
      });
  }
});

export const { clearUpdateStatus, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
