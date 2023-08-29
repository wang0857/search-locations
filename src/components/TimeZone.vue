<template>
    <p class="ps-3">The Time zone: {{ updatedTime.timeZoneId ? updatedTime.timeZoneId : time.timeZoneId }}</p>
    <p class="ps-3">The Local time: {{ localTime }}</p>
</template>

<script>
    import config from '../../config';
    import moment from 'moment-timezone';

    export default {
        name: 'TimeZone',
        props: ['center', 'updatedTime'],
        data: function() {
            return {
                myApiKey: config.GOOGLE_MAP_API_KEY,
                time: {},
                localTime: '',
            }
        },
        watch: {
            center: {
                deep: true,
                handler: function() {
                    fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.center.lat}%2C${this.center.lng}&timestamp=1331161200&key=${this.myApiKey}`)
                    .then(response => response.json())
                    .then(data => this.time = data)
                }
            },
            time: {
                deep: true,
                handler: function() {
                    if(!this.updatedTime.timeZoneId) {
                        this.localTime = moment().tz(this.time.timeZoneId).format('LLL')
                    }
                }
            }
        },
        updated() {
            if(this.updatedTime.timeZoneId) {
                this.localTime = moment().tz(this.updatedTime.timeZoneId).format('LLL')
            }
        }
    }
</script>