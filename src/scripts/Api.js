class Api {
    constructor(options) {
      // constructor body
    }
  
    getInitialCards() {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            headers: {
              authorization: "138fe482-aa90-46db-b20b-613bcdba9e47"
            }
          })
            .then(res => res.json())
    }
  
    // other methods for working with the API
  }
  
  // export the class
  export default Api;