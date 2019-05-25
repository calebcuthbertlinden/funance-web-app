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
        console.log(response);
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  // Create budget item
  async createBudgetItem(username, title, onceoff, category, amount, date) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{' +
        '"username":"' + username +
        '","title":"' + title +
        '","onceoff":' + onceoff +
        ',"category":"' + category +
        '","amount":' +  amount +
        ',"date":"'+ date + '"}'
    }
  
    const request = new Request(this.config.MSRV_BASE_URL + "profile/budget/item", options);
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