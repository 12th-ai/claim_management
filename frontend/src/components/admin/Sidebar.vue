<template>
  <div class="sidebar">
    <!-- Logo -->
    <div class="logo" style="width:600px;">
      <p style="font-size:30px; color: white; text-transform: capitalize">
        Claim Insta
      </p>
    </div>

    <div class="separator"></div>

    <nav>
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        :class="{ 'active': isActive(link.path) }"
        class="nav-link"
        exact-active-class="active"  
      >
        <div :class="['icon-container', { 'active-icon': isActive(link.path) }]">
          <!-- Use Remix Icons here -->
          <i :class="link.icon" class="align-middle"></i>
        </div>
        <span :class="['link-name', { 'active-text': isActive(link.path) }]">
          {{ link.name }}
        </span>
      </router-link>
    </nav>
  </div>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      links: [
        { name: 'Dashboard', icon: 'ri-home-2-line', path: '/admin/dashboard', end: true },
        { name: 'System Module', icon: 'ri-apps-2-line', path: '/admin/dashboard/review-module' },
        { name: "Review Company", icon: "ri-star-line", path: "/admin/dashboard/review-company"}
      ]
    };
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  }
};
</script>


<style scoped>
.sidebar {
  background-color: #0e0e23;
  height: 100vh;
  width: 300px;
  padding-top: 16px;
  padding-left: 24px;
  position: fixed;
}

.logo {
  display: flex;
  align-items: center;

  height:53px;
  
  z-index:1;


}


.separator {
  border-bottom: 1px solid white;

  width: 275px;
  margin-bottom:30px;
;

}

.dashboard-header {
  color: white;
  font-weight: 500;
  margin-bottom:20px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 16px;
  /* border-radius: 8px;
   */
   border-top-left-radius: 10px;
   border-bottom-left-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
  color: #ccc;
}



.nav-link:hover {
  background-color: #eaedf7;
  color: #1c3b8c;
}


.nav-link.active {
  background-color: #eaedf7;
  color: white;
}

.icon-container {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.icon-container.active-icon {
  background-color: #6259ca;
}

.link-name {
  margin-left: 8px;
  flex-grow: 1;
  text-align: left;
  color: #ccc;
}


.link-name.active-text {
  color:#6259ca;
}


.nav-link.active {
  background-color: #eaedf7;
  color:#6259ca;
}

.icon-container.active-icon {
  background-color: #6259ca;
  color:white;
}

.link-name.active-text {
  color: #6259ca;
}

.link-name:hover { 
  color: #6259ca;
}


</style>
