import nutritionApi from '../../api/api'
import jwtDecode from 'jwt-decode';

const getUserChatMessage = async (conversationId) => {
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  console.log("@@@@@@@Convo Id",conversationId)
  if (!userData || !userData.token) {
    throw new Error("Token not found in userData");
  }

  // Get the token from userData
  const token = userData.token;

  // Decode the JWT token to get the payload
  const tokenPayload = jwtDecode(token);

  // Extract user_id from the payload
  const user_id = tokenPayload.user_id;

  // Set the token in the request headers
  const headers = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  const response = await nutritionApi.get(`organization/me/${user_id}/conversation/${conversationId}/messages`, {
    headers: headers
  });

  const data = response.data;
  return data;
};

const messageCreation = async (messageData) => {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
  
    if (!userData || !userData.token) {
      throw new Error("Token not found in userData");
    }
  
    // Get the token from userData
    const token = userData.token;
  
    // Decode the JWT token to get the payload
    const tokenPayload = jwtDecode(token);
  
    // Extract user_id from the payload
    const user_id = tokenPayload.user_id;
    
      // Set the token in the request headers
      const headers = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      };
      console.log("%#$#$#$====================",messageData)
      // console.log("%#$#$#$====================",userId)
    const response = await nutritionApi.post(`organization/me/${user_id}/conversation/382edd1d-5c17-48bf-ae64-c62c4b0de304/messages/`, messageData,{ headers });
    console.log("&&&&&&&&&&&",response)
    return response.data;
  };
  

const chatService = {
    getUserChatMessage,
    messageCreation

};

export default chatService;