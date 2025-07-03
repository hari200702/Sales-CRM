import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}admin/employees`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to fetch employees');
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}admin/employees`, employeeData);

      if (res.data.success) {
        dispatch(fetchEmployees()); 
      }

      return res.data.data.employee;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to create employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, updatedData }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}admin/employees/${id}`, updatedData);

      if (res.data.success) {
        dispatch(fetchEmployees()); 
      }

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to update employee');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}admin/employees/${id}`);

      if (res.data.success) {
        dispatch(fetchEmployees()); 
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to delete employee');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null
  },
  reducers: {
    clearEmployees: (state) => {
      state.employees = [];
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      
      .addCase(fetchEmployees.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(createEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update employee';
      })

      .addCase(deleteEmployee.fulfilled, (state) => {
        state.loading = false;
      });
  }
});

export const { clearEmployees,clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
