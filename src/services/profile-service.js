import Configuration from './configuration';

class ProfileService {


  constructor() {
    this.config = new Configuration();
  }
  
  // Retrieve the whole budget
  async getBudget(username) {
    console.log(this.config.MSRV_BASE_URL + "profile/budget?username=" + username);
    // const response = await fetch(this.config.MSRV_BASE_URL + "profile/budget?userId=2");
    // const status = await response.status;

    // if (status == 200) {
    //   this.categories = await response.json()
    // }
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