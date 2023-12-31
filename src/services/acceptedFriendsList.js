export const acceptedFriendsList = async (userId, URL) => {
  try {
    if (userId) {
      const response = await fetch(
        `${URL}/accepted-friends/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        return data;
      }
    }
  } catch (error) {
    console.log("error showing the accepted friends", error);
    return null;
  }
};
