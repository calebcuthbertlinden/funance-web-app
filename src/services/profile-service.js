import Configuration from './configuration';

class ProfileService {
  constructor() {
    this.config = new Configuration();
  }
  
  // Retrieve the whole budget
  async getBudget(username) {
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
  async createBudgetItem(username, title, onceoff, category, amount, date, description) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{' +
        '"username":"' + username +
        '","title":"' + title +
        '","description":"' + description +
        '","onceoff":' + onceoff +
        ',"category":"' + category +
        '","amount":' +  amount +
        ',"date":"'+ date + '"}'
    }
  
    const request = new Request(this.config.MSRV_BASE_URL + "profile/budget/item", options);

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

  // Mark item as payed
  async markItemAsPayed(itemId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'PUT',
      headers
    }
  
    const request = new Request(this.config.MSRV_BASE_URL + "profile/budget/item/capture?itemId=" + itemId + "&state=PAYED", options);

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

  // Retrieve the dashboard
  async getDashboard(username) {
      return fetch(this.config.MSRV_BASE_URL + "profile/dashboard?username=" + username)
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

  // Retrieve the gameboard
  async getGameboard(username) {
      return fetch(this.config.MSRV_BASE_URL + "profile/gameboard?username=" + username)
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

  // Update income information
  async updateIncome(username, income, savings, investments) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: '{' +
        '"username":"' + username +
        '","income":' + income +
        ',"savings":' + savings +
        ',"investments":' + investments + '}'
    }
  
    const request = new Request(this.config.MSRV_BASE_URL + "profile/budget", options);

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

  async updateIncomeOnly(username, income) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("username " + username + " income " + income);

    const options = {
      method: 'PUT',
      headers,
      body: '{' +
        '"username":"' + username +
        '","income":' + income + '}'
    }
    
    console.log('{' +
    '"username":"' + username +
    '","income":' + income + '}');

    const request = new Request(this.config.MSRV_BASE_URL + "profile/budget/income", options);

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
export default ProfileService;