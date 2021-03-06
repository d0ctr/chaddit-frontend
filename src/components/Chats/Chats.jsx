import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../Header/HeaderUtils/utils";
import {connect, useDispatch} from "react-redux";
import CH from './Chats.module.css'
import Chat from "./Chat/Chat";
import {createChat, getChats} from "../../redux/reducers/chatReducer";

const const_chats = [{id: 1, name: 'kek', topic: 'kok'}, {id: 2, name: 'tinkoff', topic: 'сотку верни'},
    {
        id: 3, name: 'Мишаэ', topic: 'флюттер'
    }, {id: 4, name: 'КУрсач', topic: 'давай завтра'}, {id: 5, name: 'kek', topic: 'kok'}, {
        id: 6,
        name: 'kek',
        topic: 'kok'
    },
    {
        id: 7, name: 'kek', topic: 'kok'
    }, {id: 8, name: 'kek', topic: 'kok'}, {id: 9, name: 'kek', topic: 'kok'}, {id: 10, name: 'kek', topic: 'kok'},]

function Chats(props) {

    const dispatch = useDispatch()

    const [chats, setChats] = useState(props.chats)

    const [chatOpen, setChatOpen] = useState('')


    const deleteChat = (id) => {
        console.log(id)
        setChats(chats => chats.filter(chat => chat.id !== id))
    }

    const openChat = (id) => {
        setChatOpen(id)
    }

    const closeChat = () => {
        setChatOpen('')
    }

    const handleCreateChat = () => {
        dispatch(createChat())
    }

    useEffect( () => {
        dispatch(getChats())
    }, [])

    useEffect( () => {
        console.log(chats)
        setChats(props.chats)
    }, [props.chats])

    let domNode = useClickOutside(() => {
        props.closeChats();
    });

    return ReactDOM.createPortal(
        <div className={props.chatsActive ? CH.darkBackground : CH.darkBackgroundHidden}
        >
            <div className={CH.creatorContainer} ref={domNode}>
                {!chatOpen && <div className={CH.chatGrid}>
                    <div className={CH.chatsHeader}>
                        <h1>Чаты мои чаты</h1>
                        <button onClick={handleCreateChat}> Создать чат </button>
                    </div>
                    <div className={CH.chats}>
                    {chats.map(chat => <ChatElement name={chat.name} id={chat.chat_id} topic={chat.topic}
                                                    deleteChat={deleteChat} openChat={openChat}/>)}
                    </div>
                </div>}
                {chatOpen && <Chat closeChat={closeChat} chatId={chatOpen}/>}
            </div>


        </div>,
        document.getElementById("portal")
    )
}

const ChatElement = (props) => {
    const handleDeleteClick = (event) => {
        props.deleteChat(props.id)
        event.stopPropagation()
    }

    const handleOpenChat = () => {
        props.openChat(props.id)
    }

    return (
        <div className={CH.chatElement} onClick={handleOpenChat}>
            <div>
                <h3>{props.name}</h3>
                <h2>{props.topic}</h2>
            </div>
            <button className={CH.closeButton} onClick={handleDeleteClick}>Delete</button>
        </div>)
}


const mapStateToProps = (state) => ({
    currentId: state.user.userId,
    chats: state.chats.chats,
})

export default connect(mapStateToProps)(Chats);