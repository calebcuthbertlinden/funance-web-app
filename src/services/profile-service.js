import Configuration from './configuration';

class ProfileService {


  constructor() {
    this.config = new Configuration();
  }
  
  // Retrieve the whole budget
  async getBudget(username) {
    console.log(this.config.MSRV_BASE_URL + "profile/budget?username=" + username);
      return fetch(this.config.MSRV_BASE_URL + "profile/budget?username=" + username)
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

  // Create budget item
  async createBudgetItem(username) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{' +
        '"username":"' + username +
        ',"title":"' + 'Chwow' +
        ',"onceoff":' + true +
        ',"category":' +  "DEBIT_ORDER" +
        ',"amount":' +  300 +
        ',"date":"12/05/10"}'
    }
  
    const request = new Request(this.config.MSRV_BASE_URL + "profile/budget", options);
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
export default ProfileService;