import Configuration from './configuration';
class UserService {
  constructor() {
    this.config = new Configuration();
  }
  
  // Retrieve the whole budget
  async login(username, password) {
    console.log("UserService.login():");

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{"username":"' + username + '", "password":"' + password + '"}'
    }

    const request = new Request(this.config.MSRV_BASE_URL + "user/authenticate", options);
    console.log(options.body);

    return fetch(request)
      .then(response => {
        if (!response.ok) {
            console.log(response);
            this.handleResponseError(response);
        }
        console.log(response);
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  handleResponseError(response) {
    if (response!= null) {
      throw new Error("HTTP error, status = " + response.status);
    }
  }
  handleError(error) {
      console.log(error.message);
  }
}
export default UserService;