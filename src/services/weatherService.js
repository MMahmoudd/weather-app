import Service from './Services'
import { API_URL } from '../config'

const resource = `${API_URL}/forecast`

export default {
    async getWeatherData (key, lat, lng) {
        try {
        const response = await Service.get(`${resource}/${key}/${lat},${lng}`,)
        if (response) {
            return response
        }
    } catch (error) {
        return error.response;
    }
    },
}