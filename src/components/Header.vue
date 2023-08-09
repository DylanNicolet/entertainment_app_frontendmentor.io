<template>
    <header>
        <img src="../assets/logo.svg" class="header__logo" alt="logo">
        <nav>
            <router-link to="/"><img src="../assets/icon-nav-home.svg" alt=""></router-link>
            <router-link to="/movies"><img src="../assets/icon-nav-movies.svg" alt=""></router-link>
            <router-link to="/about"><img src="../assets/icon-nav-tv-series.svg" alt=""></router-link>
            <router-link to="/about"><img src="../assets/icon-nav-bookmark.svg" alt=""></router-link>
        </nav>
        <section class="header__profile-button">
            <router-link to="/"><img src="../assets/image-avatar.png" alt="Go to profile settings"></router-link>
        </section>
    </header>
</template>