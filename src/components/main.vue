<template>
    <div class="main-component">
    <div class="errorMsg" v-if="error">
            {{errorMsg}}
        </div>
        <div class="background">
            <img class="bacground-image" src="../assets/Background.png" alt="background"/>
            <template>
                <div class="temperature">
                    <h2>INSTAWEATHER</h2>
                    <div class="CF">
                        <div v-if="celsius" class="C active">C</div>
                        <div @click="switchTemperatureToCelsius()" v-else class="C">C</div>
                        <div v-if="fahrenheit" class="F active">F</div>
                        <div @click="switchTemperatureToFahrenheit()" v-else class="F">F</div>
                    </div>
                </div>
                <currentlyComponent class="currentlyComponent" :weatherData="weatherData"/>
            </template>
            <template>
            <div class="container-time">
            <div class="choose-weather">
                <span @click="switchHourly()" v-if="hourly" class="active">hourly </span>
                <span @click="switchHourly()" v-else>hourly </span>
                <span @click="switchDaily()" v-if="daily" class="active"> daily</span>
                <span @click="switchDaily()" v-else> daily</span>

            </div>
            <div class="timing">
                <HourlyComponent v-if="hourly === true" class="HourlyComponent" :weatherData="weatherData"/> 
                <DailyComponent v-if="daily === true" class="DailyComponent" :weatherData="weatherData"/>
            </div>
            </div>
            </template>
        </div>
    </div>
</template>
<script>
import { ServicesFactory } from "../services/ServicesFactory";
const service = ServicesFactory.get("weather");

import HourlyComponent from "./hourly/hourly.vue"
import DailyComponent from "./daily/daily.vue"
import currentlyComponent from "./currentCity/currentCity.vue"
export default {
    name: 'MainComponent',
    components: {
        HourlyComponent,
        DailyComponent,
        currentlyComponent,
    },
    data() {
        return {
            API_KEY: 'a177f8481c31fa96c3f95ad4f4f84610',
            center: { lat: 30.0444196, lng: 31.2357116 },
            dataLoading: false,
            location:null,
            gettingLocation: false,
            errorStr:null,
            place: null,
            weatherData: null,
            hourly: true,
            daily: false,
            celsius: false,
            fahrenheit: true,
            errorMsg: '',
            error: false
        };
    },
    created() {
        this.locateMe();
    },
    methods: {
        switchHourly() {
            this.hourly = true
            this.daily = false
        },
        switchDaily() {
            this.daily = true
            this.hourly= false
        },
        switchTemperatureToCelsius() {
            // convert temperature in hourly object to Celcius 
            this.weatherData.hourly.data.filter(item => {
            item.temperature = (item.temperature-32)/1.8
            return item
            })
            // convert apparentTemperatureHigh in daily object to Celcius 
            this.weatherData.daily.data.filter(item => {
            item.apparentTemperatureHigh = (item.apparentTemperatureHigh-32)/1.8
            return item
            })
            // convert temperature  in currently object to Celcius
            this.weatherData.currently.temperature = (this.weatherData.currently.temperature-32)/1.8
            // convert apparentTemperature  in currently object to Celcius
            this.weatherData.currently.apparentTemperature = (this.weatherData.currently.apparentTemperature-32)/1.8
            this.celsius = true
            this.fahrenheit = false
        },
        switchTemperatureToFahrenheit() {
            // convert temperature in hourly object to Fahrenheit 
            this.weatherData.hourly.data.filter(item => {
            item.temperature = (item.temperature*1.8)+32
            return item
            })
            // convert apparentTemperatureHigh in daily object to Fahrenheit
            this.weatherData.daily.data.filter(item => {
            item.apparentTemperatureHigh = (item.apparentTemperatureHigh*1.8)+32
            return item
            })
            // convert temperature  in currently object to Fahrenheit
            this.weatherData.currently.temperature = (this.weatherData.currently.temperature*1.8)+32
            // convert apparentTemperature  in currently object to Fahrenheit
            this.weatherData.currently.apparentTemperature = (this.weatherData.currently.apparentTemperature*1.8)+32
            this.celsius = false
            this.fahrenheit = true
        },
        async getLocation() {
            return new Promise((resolve, reject) => {
                if(!("geolocation" in navigator)) {
                    // reject(new Error('Geolocation is not available.'));
                    console.log('Geolocation is not available.')
                }
                navigator.geolocation.getCurrentPosition(pos => {
                    resolve(pos);
                    console.log("resolve(pos)", resolve(pos))
                }, err => {
                reject(err);
                this.errorMsg = 'You denied Geolocation, Because this reason, the project with run on Cairo location By Default, If You Need to show your Location weather please allow location from your browser'
                this.error = true
                // alert(err.message + ', Because this reason, the project with run on default location, If You Need to show your Location weather please allow location from your browser')
                this.fetchWeatherData(this.API_KEY ,this.center.lat, this.center.lng)
                // this.error = false
                });

            });
        },
        async locateMe() {
        this.gettingLocation = true;
        try {
            this.gettingLocation = false;
            this.location = await this.getLocation();
                this.fetchWeatherData(this.API_KEY ,this.location.coords.latitude, this.location.coords.longitude)
                console.log(this.location)
        } catch(e) {
            this.gettingLocation = false;
            this.errorStr = e.message;
        }
        },
        async fetchWeatherData(key, lat, lng) {
            this.dataLoading = true;
            const weatherData = await service.getWeatherData(key, lat, lng);
            // convert time formate in currently object to day + ' ' + date + ', ' + year
            const time = weatherData.data.currently.time
            const formatDate = new Date(time * 1000)
            let day = formatDate.getDay();
            if (day == 0) {
               day = 'Sunday'
            } else if (day == 1) {
                day = 'Monday'
            }
            else if (day == 2) {
                day = 'Tuesday'
            }
            else if (day == 3) {
                day = 'Wednesday'
            }
            else if (day == 4) {
                day = 'Thursday'
            }
            else if (day == 5) {
                day = 'Friday'
            }
            else if (day == 6) {
                day = 'Saturday'
            }
            const date = formatDate.getDate()+1;
            const year = formatDate.getFullYear();
            weatherData.data.currently.time = day + ' ' + date + ', ' + year

            // convert time formate in hourly object to HH:MM 
            weatherData.data.hourly.data.filter(item => {
            item.time = new Date(item.time * 1000)
            item.time = item.time.getHours();
            item.time = item.time + ':' + '00'
            return item
            })
            // convert time formate in daily object to DayName && DayNumber 
            weatherData.data.daily.data.filter(item => {
            item.time = new Date(item.time * 1000)
            let dayName = item.time.getDay();
            if (dayName == 0) {
               dayName = 'Sunday'
            } else if (dayName == 1) {
                dayName = 'Monday'
            }
            else if (dayName == 2) {
                dayName = 'Tuesday'
            }
            else if (dayName == 3) {
                dayName = 'Wednesday'
            }
            else if (dayName == 4) {
                dayName = 'Thursday'
            }
            else if (dayName == 5) {
                dayName = 'Friday'
            }
            else if (dayName == 6) {
                dayName = 'Saturday'
            }
            // const dayNumber = item.time.getDate();
            item.time = dayName 

            return item
            })
            
            this.weatherData = weatherData.data
            console.log('weatherData',this.weatherData)
            this.dataLoading = false;
            // this.error = false
        },
    }
}
</script>