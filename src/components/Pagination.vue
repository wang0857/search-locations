<template>
    <div class="pagination-container">
        <slot></slot>
        <nav aria-label="Page navigation example" class="pagination-pages">
            <ul class="pagination">
                <li class="page-item">
                    <button
                        class="page-link"
                        aria-label="Previous"
                        @click="$emit('changePage', currentPage-1)"
                        :disabled="currentPage - 1 === 0"
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                </li>
                <li
                    class="page-item"
                    v-for="page in pages"
                    :key="page"
                >
                    <button
                        type="button"
                        :class="[
                            'page-link',
                            page === currentPage && 'active'
                        ]"

                        @click="$emit('changePage', page)"
                    >
                        {{ page }}
                    </button>
                </li>
                <li class="page-item">
                    <button
                        class="page-link"
                        aria-label="Next"
                        @click="$emit('changePage', currentPage+1)"
                        :disabled="currentPage + 1 > pages.length"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import { computed } from 'vue'

    export default {
        name: 'Pagination',
        props: ['itemCount', 'itemsPerPage', 'currentPage'],
        emits: ['changePage'],
        setup(props) {
            const pageCount = computed(() =>
                Math.ceil(props.itemCount / props.itemsPerPage)
            )
            const pages = computed(() => {
                return Array.from({ length: pageCount.value }, (_, i) => i + 1);
            })

            return {
                pageCount,
                pages
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables';

    .pagination {
        &-container {
            display: flex;
            flex-direction: column;
        }

        &-pages {
            display: flex;
            justify-content: center;
            margin-top: $sm;
        }
    }

</style>