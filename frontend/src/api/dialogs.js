import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

export const getDialogs = createAsyncThunk(
    'auth/getDialogs',
    async(_, { rejectWithValue }) => {
        try {
            const response = await API.get('dialogs');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const reloadDialogs = createAsyncThunk(
    'auth/reloadDialogs',
    async(_, { rejectWithValue }) => {
        try {
            const response = await API.get('reloadDialogs');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)