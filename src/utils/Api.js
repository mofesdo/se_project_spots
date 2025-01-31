class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  // other methods for working with the API
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  // Pass the data as an argument. In this example, we are using destructuring,
  // so we would need to pass the function an object with properties called
  // name and about.
  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if(res.ok){
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
}

// export the class
export default Api;
