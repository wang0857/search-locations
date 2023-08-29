<template>
    <div class="locations-selectionsBtn">
        <button
        type="button"
        class="btn btn-primary"
        @click="clearAll"
        >Clear all selections</button>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Search History</th>
            </tr>
        </thead>

        <tbody v-if="history.length !== 0">
            <Pagination
                :itemCount="history.length"
                :itemsPerPage="itemsPerPage"
                :currentPage="currentPage"
                @changePage="changePage"
            >
                <tr v-for="item in displayedItems" :key="item.id">
                    <td>
                        <div class="form-check">
                            <input
                                class="form-check-input me-2"
                                type="checkbox"
                                :value="item.location"
                                v-model="checkedLocations"
                                :id="item.id"
                            >
                            <label class="form-check-label" :for="item.id">
                                {{ item.address }}
                            </label>
                        </div>
                    </td>
                </tr>
            </Pagination>
        </tbody>

    </table>
</template>

<script>
    import Pagination from './Pagination.vue'
    import { ref, computed } from 'vue'

    export default {
        name: 'ResultsHistory',
        props: ['history'],
        components: { Pagination },
        emits: ['checkedLocations'],
        data: function() {
            return {
                checkedLocations: []
            }
        },
        // Pagination
        setup(props) {
            const currentPage = ref(1);
            const itemsPerPage = ref(10);

            const displayedItems = computed(() => {
                const startIndex = (currentPage.value - 1) * itemsPerPage.value;
                const endIndex = startIndex + itemsPerPage.value;

                return props.history.slice(startIndex, endIndex);
            });

            function changePage(pageNumber) {
                currentPage.value = pageNumber;
            }
            return {
                currentPage,
                displayedItems,
                itemsPerPage,
                changePage
            }
        },
        watch: {
            checkedLocations: function() {
                this.$emit('checkedLocations', this.checkedLocations)
            }
        },
        methods: {
            clearAll() {
                this.checkedLocations = []
            }
        }
    }
</script>