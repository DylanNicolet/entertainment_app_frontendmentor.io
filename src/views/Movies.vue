<template>
	<div class="home">
        <section class="search">
            <img class="search__icon" src="../assets/icon-search.svg" alt="search-icon">
            <input class="search__input" type="text" placeholder="Search for movies or TV series" v-model="searchInput">
        </section>

        <section class="main-content" v-if="!isSearchActive">
            <h1 class="main-content__title">Recommended for you</h1>
            <section class="main-content__content">
                <section v-for="item in recommendedData" class="main-content-card">
                    <ItemCard :itemProp={item} />
                </section>
            </section>
        </section>

        <section class="search-results" v-if="isSearchActive">
            <h1 class="search-results__title">Found results {{ searchData.length }} for '{{ searchInput }}'</h1>
            <section class="search-results__content">
                <section v-for="item in searchData" class="search-results-card">
                    <ItemCard :itemProp={item} />
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue';
import database from "../../data.json";
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

export default {
    name: 'Movies',
    components: {
        ItemCard
    },

    setup() {
        let screenWidth = ref( undefined )
        let searchInput = ref( '' )
        let searchData = ref( [] )
        let isSearchActive = ref (false)

        function handleScreenResize() {
            let windowWidth = window.innerWidth

            if ( windowWidth < 768 ) {
                screenWidth.value = "mobile"
                return false
            } else if ( windowWidth >= 768 && windowWidth < 920 ) {
                screenWidth.value = "tablet"
                return false
            } else if ( windowWidth >= 920 ) {
                screenWidth.value = "desktop"
            }
        }

        onMounted( () => {
            window.addEventListener( 'resize', handleScreenResize )
        } )

        onUnmounted( () => {
            window.removeEventListener( 'resize', handleScreenResize )
        } )

        //Generate Movies data
        let recommendedData = database.filter( item => {
            if ( !item.thumbnail.trending ) {
                return true
            }
        } )

        // Search function
        watchEffect(() => { 
            searchData.value = []

            if(searchInput.value.length > 0) {
                searchData.value = database.filter(item => {
                    if (item.title.toLowerCase().includes(searchInput.value.toLowerCase())){
                        return true
                    }
                } )

                if(searchData.value.length > 0){
                    isSearchActive.value = true
                }
            } 
            else if(searchInput.value.length === 0){
                isSearchActive.value = false
            }
        })

        // Since we are not using an actual backend, I will use LocalStorage to simulate bookmark interaction
        watchEffect( () => {
            if ( !localStorage.getItem( 'bookmarkedItems' )) {
                let bookmarkedItems = database.filter( item => {
                    if ( item.isBookmarked ) {
                        return true
                    }
                } )

                let bookmarkedTitles = []
                for ( let i = 0; i < bookmarkedItems.length; i++ ) {
                    bookmarkedTitles.push(bookmarkedItems[i].title)
                }
    
                localStorage.setItem( 'bookmarkedItems', JSON.stringify( bookmarkedTitles ) )
            }
        } )

        return{ recommendedData, screenWidth, searchInput, searchData, isSearchActive}
    }
}
</script>