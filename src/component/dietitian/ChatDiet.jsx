import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getUserMeOrganization } from '../../features/auth/authSlice';
import { getUserMessageContent,createChat,resetChat } from '../../features/Chat/chatSlice';
import { format } from 'date-fns';


const sampleMessages = [
    {
      "id": 6,
      "sender": 2,
      "content": "Hello Doc , i need your help",
      "created_at": "2023-08-27T21:29:34.304876Z"
    },
    {
      "id": 7,
      "sender": 2,
      "content": "have problem in stomach",
      "created_at": "2023-08-27T21:30:02.698750Z"
    }
  ];

function ChatDiet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const userOrganization = useSelector((state) => state.auths.userOrganization);
  const chatData = useSelector((state) => state.chats.userMessages);

  useEffect(() => {
    dispatch(getUserMessageContent()); // Fetch chat data using the Redux slice function
  }, [dispatch]);

  
  useEffect(() => {
    dispatch(getUserMeOrganization());
  }, [dispatch]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSend = () => {
    // ... handle sending message logic
  };
  const handleConversationClick = (conversationId) => {
    console.log("!!!!!!!!!!!!!!conversationId",conversationId)
    setSelectedConversation(conversationId);
    console.log("%%%selected convo",selectedConversation)
    dispatch(getUserMessageContent(conversationId)); // Fetch messages for the selected conversation
  };


  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col w-1/4 bg-gray-100 p-4 overflow-y-auto border-r">
        {userOrganization.patient_conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`cursor-pointer p-2 ${
              selectedConversation === conversation.id ? "bg-gray-200" : ""
            }`}
            onClick={() => handleConversationClick(conversation.id)}
          >
            {conversation.id}
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-grow bg-white shadow-xl rounded-lg p-4">
        <div className="flex-grow overflow-y-auto">
          {selectedConversation &&
            chatData.map((message) => (
              <div
                key={message.id}
                className={`flex w-full mb-4 ${
                  message.sender === 2 ? "ml-auto justify-end" : ""
                }`}
              >
                <div
                  className={`bg-gray-200 rounded-lg p-2 ${
                    message.sender === 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  <p className="mb-1">{message.content}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(message.created_at), "MMM dd, yyyy - HH:mm")}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="bg-gray-300 p-4 mt-4">
          <div className="flex items-center">
            <input
              className="flex-grow h-10 rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-600 text-white rounded px-4 py-2"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatDiet;
