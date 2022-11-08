import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { setMyMessage } from "../../redux/reducer";
import { socket } from "../../utils/socket";
import { Message } from "../Message";

const getTime = (time) => {
    const newTime = time.split('T')[1];
    return newTime.slice(0, 5)
}

export const Dialog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile } = useSelector(state=>state.store);
    useEffect(()=>{
        if (!profile) navigate('/auth');
    }, [profile, navigate])
    const { id } = useParams();
    const partner = useSelector(state=>state.store.dialogs)?.find((item)=>item.id === id);

    const [text, setText] = useState('');

    const handleSubmitText = (e) => {
        e.preventDefault();
        if (text === '') return;
        setText('');
        const message = {text, author: profile.id, time: JSON.stringify(new Date()), to: id};
        socket.emit(`message`, message)
        dispatch(setMyMessage(message));
    }

    return(
        <>
            <div className="button-line">
                <button 
                    type="button"
                    onClick={()=>navigate('/')}>
                    <p>Back</p>
                </button>
            </div>
            <div className="dialogs-holder chat">
                <div className="dialogs-header">
                    <p>{partner?.username}</p>
                </div>
                <div className="dialog-content">
                    {
                        partner.chat?.map(({author, text, time}, i)=>(
                            <Message key={i} me={author === id ? false : true} text={text} time={getTime(time)}/>
                        ))
                    }
                    {/* <Message /> */}
                </div>
                <form 
                    onSubmit={handleSubmitText}
                    className="dialog-message-input">
                    <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
                    <button>Отправить</button>
                </form>
            </div>
        </>
    )
}