import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
    const res = await axios.get(`${BASE_URL}admin/leads`);
    return res.data.data; 
});

export const uploadLeadsCSV = createAsyncThunk(
  'leads/uploadCSV',
  async (formData, { dispatch }) => {
    const res = await axios.post(`${BASE_URL}admin/leads/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res.data.success) {

      dispatch(fetchLeads());
    }

    return res.data;
  }
);

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    loading: false,
    error: null,
    uploadResult: null,
  },
  reducers: {
    clearLeads: (state) => {
      state.leads = [];
      state.loading = false;
      state.error = null;
      state.uploadResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(uploadLeadsCSV.fulfilled, (state, action) => {
        state.uploadResult = action.payload;
      });
  }
});

export const { clearLeads } = leadSlice.actions;
export default leadSlice.reducer;
