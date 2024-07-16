import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Example icons from react-icons

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/message/getMessages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await fetch('http://localhost:5000/api/v1/message/createMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, message }),
            });

            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000);

        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        // Optionally, you can save the theme preference in localStorage
        // localStorage.setItem('theme', darkMode ? 'light' : 'dark');
    };

    // const clearChat = async(e)=>{
    //     e.preventDefault();

    //     try {
    //         const response = await fetch('http://localhost:5000/api/v1/message/deleteMessages',{
    //             method: 'DELETE',
    //         });
    //         // const data = await response.json();
    //         setMessages('');
    //     } catch (error) {
    //         console.error('Error fetching messages:', error);
    //     }
    // }
        

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : 'light'}-mode bg-${darkMode ? 'gray-800' : 'blue-400'} text-${darkMode ? 'white' : 'gray-800'}`}>
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chat Room</h2>
                    <button
                        className="p-2 rounded-full focus:outline-none"
                        onClick={toggleTheme}
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? <FiSun size={24} className="text-yellow-500" /> : <FiMoon size={24} className="text-gray-200" />}
                    </button>
                </div>

                {/* <ul className="mb-4">
                    {messages.map((msg) => (
                        <li key={msg._id} className={`mb-2 ${darkMode ? 'bg-gray-800' : 'bg-blue-100'} rounded-lg px-4 py-2`}>
                            <strong className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{msg.user}:</strong> {msg.message}
                        </li>
                    ))}
                </ul> */}

<ul className="mb-4">
    {messages.map((msg) => (
        <li key={msg._id} className={`mb-2 rounded-lg px-4 py-2 ${msg.user === user ? 'self-end bg-blue-800 text-white' : 'bg-gray-800 text-white'}`}>
            <div className={`${msg.user === user ? 'text-right' : 'text-left'}`}>
                <strong>{msg.user}:</strong> {msg.message}
            </div>
        </li>
    ))}
</ul>


                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className={`flex-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} focus:outline-none`}
                    />
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`flex-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-blue-900'} focus:outline-none`}
                    />
                    <button
                        onClick={sendMessage}
                        className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-400 text-gray-900 hover:bg-blue-300'} focus:outline-none`}
                    >
                        Send
                    </button>
                    
                </div>
                {/* <button
                        onClick={clearChat}
                        className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-red-400 text-white hover:bg-red-600' : 'bg-red-400 text-gray-900 hover:bg-red-300'} focus:outline-none`}
                    >
                        ClearChat
                    </button> */}
            </div>
            
        </div>
    );
};

export default ChatRoom;

