import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { Dialog, DialogsBrowser, NotFound } from "./components";
import { setDialogs, setMessage } from "./redux/reducer";
import { socket } from "./utils/socket";

export const Main = () => {
    const dispatch = useDispatch();
    const { id } = useSelector(state=>state.store.profile);

    useEffect(()=>{
        socket.on('connect', ()=>{
        })
        socket.on(`message`, (message) => {
            dispatch(setMessage(message));
            console.log(message);
        })
        socket.on('dialogs', (dialogs) => {
            console.log(dialogs);
            dispatch(setDialogs(dialogs));
        })
    }, [socket])

    return(
        <>
            <Routes>
                <Route path="/" element={<DialogsBrowser/>}/>
                <Route path="/*" element={<NotFound />}/>
                <Route path="/chat/:id" element={<Dialog />}/>
            </Routes>
        </>
    );
}