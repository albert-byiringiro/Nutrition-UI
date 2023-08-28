import {
    createSlice, 
    createAsyncThunk
} from '@reduxjs/toolkit'
import chatService from './chatService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    chat: {},
    chats: [],
    userMessages:[],
    isError: false,
    isErrorChat: false,
    isSuccess: false,
    isLoading: false,
    isLoadingChat: false,
    isCreatedChat: false,
    message: '',
  }

// Send message
export const createChat = createAsyncThunk(
    'chat/create',
    async (chat, thunkAPI) => {
        try {
            return await chatService.messageCreation(chat)
        } catch (error) {
            const message = (
                error.response.data
            ) || error.message || error.toString()
console.log("________________",message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get User by message
export const getUserMessageContent = createAsyncThunk(
    'organization/me/userId/conversation',
    async (conversationId, thunkAPI) => {
        try {
            return await chatService.getUserChatMessage(conversationId)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        resetChat: (state) => {
            state.message = ''
            state.userMessages=[]
            state.isError = false
            state.isErrorChat = false
            state.isSuccess = false
            state.isLoading = false
            state.isLoadingChat = false
            state.isCreatedChat = false
        }
    },
    extraReducers: (builder) => {
            builder
            .addCase(createChat.pending, (state) => {
                state.isLoadingChat = true
                state.isCreatedChat = false
                state.isErrorChat = false
            })
            .addCase(createChat.fulfilled, (state=[], action) => {
                state.isLoadingChat = false
                state.isCreatedChat = true
                state.isErrorChat = false
                state.chat = action.payload
            })
            .addCase(createChat.rejected, (state, action) => {
                state.isLoadingChat = false
                state.isCreatedChat = false
                state.isErrorChat = true
                state.message = action.payload
            })
            .addCase(getUserMessageContent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserMessageContent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userMessages = action.payload
            })
            .addCase(getUserMessageContent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { resetChat } = chatSlice.actions
export default chatSlice.reducer