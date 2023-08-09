<template>
    <section class="trending-item-card">
        <img :src="itemProp.item.thumbnail.regular.small" :alt="itemProp.item.title" class="trending-item-card__image">

        <button :class="'trending-item-card__bookmark-btn ' + bookmarkedStyling" @click="addBookmark()">
            <section class="bookmark-icon"></section>
        </button>

        <section class="trending-item-card__info">
            <p>{{ itemProp.item.year }}</p>
            &#x2022;
            <section class="info-category">
                <img :src="itemProp.item.category === 'Movie' ? '../assets/icon-category-movie.svg' : '../assets/icon-category-tv.svg'" alt="">
                <p>{{ itemProp.item.category }}</p>
            </section>
            &#x2022;
            <p>{{ itemProp.item.rating }}</p>
            <h2 class="info-title">{{ itemProp.item.title }}</h2>
        </section>
    </section>
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
    name: 'TrendingItemCard',
    props: ['itemProp'],

    setup(props) {
        let bookmarkedStyling = ref("")
        let bookmarkedItems = JSON.parse( localStorage.getItem( "bookmarkedItems" ) || "[]" )

        watchEffect(() => { 
            if ( bookmarkedItems.includes( props.itemProp.item.title ) ) {
                bookmarkedStyling.value = "--active"
            }
        })

        function addBookmark() {
            bookmarkedItems = JSON.parse( localStorage.getItem( "bookmarkedItems" ) || "[]" )
            
            if ( !bookmarkedItems.includes( props.itemProp.item.title ) ) {
                bookmarkedItems.push(props.itemProp.item.title)
                localStorage.setItem( 'bookmarkedItems', JSON.stringify( bookmarkedItems ) )
                bookmarkedStyling.value = "--active"
            }
            else {
                let index = bookmarkedItems.indexOf( props.itemProp.item.title )
                bookmarkedItems.splice(index, 1)
                localStorage.setItem( 'bookmarkedItems', JSON.stringify( bookmarkedItems ) )
                bookmarkedStyling.value = ""
            }
        }
        

        return {bookmarkedStyling, addBookmark}
    }
}
</script>