import { createSlice } from '@reduxjs/toolkit';
import { login } from '../api/auth';
import { getDialogs, reloadDialogs } from '../api/dialogs';

const initialState = {
    profile: null,
    dialogs: null,
    status: 'Active',
    error: null
}

export const counterSlice = createSlice({
    name: 'store',
    initialState,
    extraReducers: {
        [getDialogs.pending]: (state) => {
            state.status = 'Loading dialogs';
            state.error = null;
        },
        [getDialogs.fulfilled]: (state, action) => {
            state.status = 'Active';
            state.dialogs = action.payload.filter((item) => item.id !== state.profile.id);
        },
        [reloadDialogs.pending]: (state) => {
            state.status = 'Reloading dialogs';
            state.error = null;
        },
        [reloadDialogs.fulfilled]: (state, action) => {
            state.status = 'Active';
            state.dialogs = action.payload.filter((item) => item.id !== state.profile.id);
        }
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setDialogs: (state, action) => {
            state.dialogs = action.payload.filter((i) => i.id !== state.profile.id)
        },
        setMessage: (state, action) => {
            state.dialogs.forEach((item) => {
                if (item.id === action.payload.author) {
                    if (item.chat) {
                        item.chat.push(action.payload);
                    } else {
                        item['chat'] = [action.payload];
                    }
                }
            })
        },
        setMyMessage: (state, action) => {
            state.dialogs.forEach((item) => {
                if (item.id === action.payload.to) {
                    if (item.chat) {
                        item.chat.push(action.payload);
                    } else {
                        item['chat'] = [action.payload];
                    }
                }
            })
        }
    }
})

export const {
    setProfile,
    setDialogs,
    setMessage,
    setMyMessage,
} = counterSlice.actions;

export default counterSlice.reducer