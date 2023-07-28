<template>
    <div class="home">
        <Search />

        <section class="trending">
            <h1 class="trending__title">Trending</h1>
            <swiper-container :slides-per-view="screenWidth === 'mobile' ? 1.7 : 2.7">
                <swiper-slide v-for="item in trendingData"  class="trending-card">
                    <img :src="screenWidth === 'mobile' ? item.thumbnail.trending.small : item.thumbnail.trending.large" :alt="item.title" class="trending-card__image">
                    <section class="trending-card__gradient"></section>
                    <section class="trending-card__info">
                        <p>{{item.year}}</p>
                        &#x2022;
                        <section class="info-category">
                            <img :src="item.category === 'Movie' ? '../assets/icon-category-movie.svg' : '../assets/icon-category-tv.svg'" alt="">
                            <p>{{item.category}}</p>
                        </section>
                        &#x2022;
                        <p>{{ item.rating }}</p>
                        <h2 class="info-title">{{ item.title }}</h2>
                    </section>
                </swiper-slide>
            </swiper-container>
        </section>

        <section class="recommended">
            <h1 class="recommended__title">Recommended for you</h1>
            <section class="recommended__content">
                <section v-for="item in recommendedData" class="recommended-card">
                    <img :src="item.thumbnail.regular.small" :alt="item.title" class="recommended-card__image">
                    <section class="recommended-card__info">
                        <p>{{ item.year }}</p>
                        &#x2022;
                        <section class="info-category">
                            <img :src="item.category === 'Movie' ? '../assets/icon-category-movie.svg' : '../assets/icon-category-tv.svg'" alt="">
                            <p>{{ item.category }}</p>
                        </section>
                        &#x2022;
                        <p>{{ item.rating }}</p>
                        <h2 class="info-title">{{ item.title }}</h2>
                    </section>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import database from "../../data.json";
import { register } from 'swiper/element/bundle';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

export default {
    name: 'Home',
    components: {
        Header,
        Search
    },

    setup() {
        let screenWidth = ref( undefined )

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

        //register Swiper
        register()

        //Generate data for trending section
        let trendingData = database.filter( item => {
            if ( item.thumbnail.trending ) {
                return true
            }
        } )

        //Generate data for recommended section
        let recommendedData = database.filter( item => {
            if ( !item.thumbnail.trending ) {
                return true
            }
        } )

        //Create favoriteData locally
        watchEffect( () => {
            if ( !localStorage.getItem( 'favoriteData' ) ) {
                localStorage.setItem( 'favoriteData', JSON.stringify( [] ) )
            }
        } )

        function addToFavorite() {
            let favoriteData = JSON.parse( localStorage.getItem( "favoriteData" ) || "[]" )

            continue work here with isBookmarked from database <----------------
        }

        return{trendingData, recommendedData, screenWidth}
    }
}
</script>
