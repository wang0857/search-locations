<template>
  <div class="container main">
    <h1 class="text-center mb-5">Search Locations</h1>
    <Search
      @searchedLocation="getLocation"
    />
    <TimeZone :center="center" :updatedTime="updatedTime" />
    <div class="container-grid">
      <div class="map">
        <GoogleMap
          :api-key="myApiKey"
          style="width: 100%; height: 500px"
          :center="updatedCenter.lat ? updatedCenter : center"
          :zoom="12"
        >
          <Marker
            v-if="selections.length === 0"
            :options="{ position: updatedCenter.lat ? updatedCenter : center }"
          />
          <MarkerCluster>
            <Marker
              v-for="(selection, index) in selections"
              :options="{ position: selection }"
              :key="index"
            />
          </MarkerCluster>
        </GoogleMap>
      </div>
      <div class="locations-container">
        <ResultsHistory :history="history" @checkedLocations="getSelectedLocations" />
      </div>
    </div>

  </div>
</template>

<script>
  import config from '../config';
  
  import { useGeolocation } from './useGeolocations'
  import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'
  
  import Search from './components/Search.vue'
  import ResultsHistory from './components/ResultsHistory.vue'
  import TimeZone from './components/TimeZone.vue'
  
  import { computed } from 'vue'

  export default {
    name: 'App',
    components: { GoogleMap, Marker, MarkerCluster, Search, ResultsHistory, TimeZone },
    data: function() {
      return {
        myApiKey: config.GOOGLE_MAP_API_KEY,
        address: '',
        data: {},
        history: [],
        updatedCenter: {},
        selections: [],
        updatedTime: {}
      }
    },
    // Geolocation
    setup() {
      const { coords } = useGeolocation()
      const center = computed(() => ({
        lat: coords.value.latitude,
        lng: coords.value.longitude
      }))

      return { center }
    },
    created() {
      // Get search history from local storage if it exist
      // localStorage.clear()
      const storedHistory = localStorage.getItem('history')
      if(storedHistory) {
        this.history = JSON.parse(storedHistory)
      }
    },
    methods: {
      getLocation(address) {
        this.address = address

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.myApiKey}`)
        .then(response => response.json())
        .then(data => this.data = data.results[0])
      },
      getSelectedLocations(options) {
        this.selections = options
      },
    },
    watch: {
      data: {
        deep: true,
        handler: function(dataObj) {
          this.updatedCenter = {
            lat: dataObj.geometry.location.lat,
            lng: dataObj.geometry.location.lng
          }

          this.history.push({
            id: dataObj.place_id,
            address: this.address,
            location: {
              lat: dataObj.geometry.location.lat,
              lng: dataObj.geometry.location.lng
            }
          })

          localStorage.setItem('history', JSON.stringify(this.history))
          
          // Get the timezone from search result
          fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.updatedCenter.lat}%2C${this.updatedCenter.lng}&timestamp=1331161200&key=${this.myApiKey}`)
          .then(response => response.json())
          .then(data => this.updatedTime = data)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './scss/variables';

  .container {
    &.main {
      margin-top: 5em;
    }

    &-grid {
      display: grid;
      grid-template-columns: 1fr 500px;
      gap: 50px
    }
  }

  @media screen and (max-width: 768px) {
    .container-grid {
      grid-template-columns: 1fr;
      gap: $xlg
    }
  }

  .map {
    border-radius: $xlg;
    overflow: hidden;
  }

  .locations {
    &-container {
      border-radius: $xlg;
      box-shadow: $box-shadow;
      padding: $xlg;
    }

    &-selectionsBtn {
      display: flex;
      justify-content: flex-end;

      button {
        border-radius: $lg;
      }
    }
  }
</style>
