class Api {
    constructor({baseUrl, headers}) {
      // constructor body
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          })
            .then(res => res.json())
    }
  
    // other methods for working with the API
  }
  
  // export the class
  export default Api;