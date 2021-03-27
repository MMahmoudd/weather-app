<template>
    <div class="daily-component">
    <template v-if="weatherData">
        <div class="all-days" v-for="day in weatherData.daily.data" :key="day.id">
            <span class="day">{{day.time}}</span>
            <div class="icons">
                <img 
                    v-if="day.icon == 'clear-day'" 
                    src="../../assets/weather/sunny.svg" 
                    class="weather-icon"
                    alt="sunny"
                >
                <img 
                    v-if="day.icon == 'partly-cloudy-day'"
                    class="weather-icon"
                    src="../../assets/weather/partly-cloudy.svg"
                    alt="partly-cloudy"
                >
                <img 
                    v-if="day.icon == 'cloudy-day' || day.icon == 'rain'"
                    class="weather-icon"
                    src="../../assets/weather/cloudy.svg"
                    alt="cloudy"
                >
            </div>
            <span>{{parseFloat(day.apparentTemperatureHigh).toFixed(0) + `°`}}</span>
        </div>
    </template>
    </div>
</template>
<script>
export default {
    name: 'DailyComponent',
    props:['weatherData'],
    data() {
        return {
        };
    },
}
</script>