<template>
    <div class="search-bar">
        <input
            v-model="search"
            type="text"
            class="form-control"
            id="search"
            placeholder="Type your locations..."
            @keyup.enter="searchHandler"
        >
        <button class="search-barBtn btn btn-primary" @click="searchHandler">
            <i class="fa-solid fa-magnifying-glass"></i>
            Search
        </button>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        emits: ['searchedLocation'],
        data: function() {
            return {
                search: '',
            }
        },
        methods: {
            searchHandler() {
                this.$emit('searchedLocation', this.search)

                this.search = ''
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables';

    .search-bar {
        position: relative;
        margin-bottom: 1em;

        input {
            border: 1px solid $gray;
            border-radius: $xlg;
            height: 44px;

            &:focus {
                border: 1px solid $gray;
                border-radius: $xlg;
            }
        }

        &Btn {
            position: absolute;
            top: 0px;
            right: 0px;
            padding: $sm $md;
            border-radius: $xlg;
            border: none;
            
            i {
                font-size: 18px;
            }
        }
    }
</style>