export const getFindPinterest = async pinId => {
  try {
    const response = await fetch(
      `https://api.pinterest.com/v1/pins/${pinId}/?access_token=Aov4LOllCKSwtpWqhMJBnh_TCXl4FV2Bh86oSEZFT_R6ZSBfJQWpwDAAACaPRU_1nqNAYIcAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage%2Cmedia`
    );
    const json = await response.json();
    const { data } = json;
    // console.log(this.state.noteToBeCreated);
    return data;
  } catch (e) {
    console.log(e);
  }
};
