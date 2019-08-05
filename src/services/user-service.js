import Configuration from './configuration';
class UserService {
  constructor() {
    this.config = new Configuration();
  }
  
  async login(username, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{"username":"' + username + '", "password":"' + password + '"}'
    }

    const request = new Request(this.config.MSRV_BASE_URL + "user/authenticate", options);

    return fetch(request)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async register(username, password, name, surname, email) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{"name":"' + name
               + '", "surname":"' + surname 
               + '", "username":"' + username 
               + '", "email":"' + email 
               + '", "password":"' + password + '"}'

    }

    const request = new Request(this.config.MSRV_BASE_URL + "user", options);
    return fetch(request)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }
  
  async updateContactNumber(username, contact) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers
    }

    const request = new Request(this.config.MSRV_BASE_URL + "user/contact?username=" + username + "&contact=" + contact, options);

    return fetch(request)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async updateContactNumber(username, contact) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers
    }

    const request = new Request(this.config.MSRV_BASE_URL + "user/contact?username=" + username + "&contact=" + contact, options);

    return fetch(request)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
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
  }
}
export default UserService;
