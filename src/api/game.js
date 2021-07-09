import axios from "axios";

const httpRequests = {
    getTemperature(cityName, cbs, cbf)
    {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9cff733aee57cb05b63dd4f731c46bc4&units=metric`;
        console.log(url);
        axios.get(url)
        .then(response => {
            // console.log({response});
            cbs(response.data);
            // this.setState({postList: response.data})
        })
        .catch(error => {
            cbf(error);
            // console.log(error)
        });
    }
}

export default httpRequests;