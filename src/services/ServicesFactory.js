import weatherService from "./weatherService";



const services = {
    weather: weatherService,
};

export const ServicesFactory = {
    get: name => services[name]
};
