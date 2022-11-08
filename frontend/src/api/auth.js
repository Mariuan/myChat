import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";
import { getDialogs } from "./dialogs";

export const login = createAsyncThunk(
    'auth/login',
    async(data, { rejectWithValue, dispatch }) => {
        try {
            const response = await API.post('login', data);
            console.log(response);
            if (response.status === 201) dispatch(getDialogs())
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)