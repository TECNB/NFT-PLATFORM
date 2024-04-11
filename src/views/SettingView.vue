<template>
    <div class="SettingView">
        <MainNavbar/>
        <div class="sidebar-container">
            <SettingSidebar />
        </div>
        <div class="main-container">
            <div class="app-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SettingSidebar from '../components/SettingSidebar.vue'
import MainNavbar from '../components/MainNavbar.vue'


</script>

<style lang="scss" scoped>
.SettingView {
    .sidebar-container{
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;


        height: 95%;
        width: 310px !important;

        border-right: 1px solid rgba(18, 18, 18, 0.12);
        
    
        
    }
    .main-container {
        // background: #f0f2f5;
        

        position: relative;

        height: 100%;
        
        margin-left: 350px;

        
        

        .fixed-header {
            position: fixed;
            top: 0px;

            
            
            width: calc(100% - 300px);

            
        }

        .app-main {
            width: 100%;
            height: 90%;

            position: relative;

            
            margin-top: 60px;
        }
    }
}
</style>
