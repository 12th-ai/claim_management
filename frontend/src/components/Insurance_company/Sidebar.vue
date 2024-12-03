<template>
  <div class="sidebar">
    <div class="logo">
      <p style="font-size:30px; color: white; text-transform: capitalize">Claim Insta</p>
    </div>
    <div class="separator"></div>
    <nav>
      <!-- Dashboard route with unique home icon -->
      <router-link 
        to="/insurance_company/dashboard" 
        class="nav-link" 
        exact-active-class="active"
      >
        <div class="icon-container">
          <!-- Unique home icon for Dashboard -->
          <i class="ri-home-4-line align-middle"></i>
        </div>
        <span class="link-name">
          Dashboard
        </span>
      </router-link>

      <!-- Loss Accessor route -->
      <router-link
        to="/insurance_company/dashboard/review-accessor"
        class="nav-link"
        exact-active-class="active"
      >
        <div class="icon-container">
          <i class="ri-briefcase-line align-middle"></i>
        </div>
        <span class="link-name">
          Loss Accessor
        </span>
      </router-link>

      <!-- Loop through dynamic modules from the database -->
      <router-link
        v-for="module in modules"
        :key="module.id"
        :to="generatePath(module.module_name)" 
        :class="{
          'active': isActive(generatePath(module.module_name)),
          'disabled': !module.isActive  // Apply 'disabled' class if module is inactive
        }"
        class="nav-link"
        :exact-active-class="'active'"
        :disabled="!module.isActive"
      >
        <div :class="['icon-container', { 'active-icon': isActive(generatePath(module.module_name)), 'disabled-icon': !module.isActive }]">
          <i :class="getIcon(module.module_name)" class="align-middle"></i>
        </div>
        <span :class="['link-name', { 'active-text': isActive(generatePath(module.module_name)), 'disabled-text': !module.isActive }]">
          {{ module.module_name }}
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    modules: {
      type: Array,
      required: true,
    },
  },
  methods: {
    generatePath(module_name) {
      if (!module_name) {
        console.warn('Module name is undefined or empty');
        return '/admin/dashboard/default-path'; 
      }
      const formattedName = module_name.toLowerCase().replace(/\s+/g, '-');
      return `/insurance_company/dashboard/${formattedName}`;
    },
    getIcon(module_name) {
      if (module_name === 'Dashboard') {
        return 'ri-home-4-line'; // Unique home icon for Dashboard
      }
      if (!module_name) {
        return 'ri-user-line';
      }

      const iconMap = {
        Application: 'ri-file-list-line',
        Accidents: 'ri-file-list-line',
        'Claim Management': 'ri-briefcase-line',
      };

      return iconMap[module_name] || 'ri-user-line';
    },
    isActive(path) {
      return this.$route.path === path;
    },
  },
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
  height: 53px;
  z-index: 1;
}

.separator {
  border-bottom: 1px solid white;
  width: 275px;
  margin-bottom: 30px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 16px;
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

.nav-link.disabled {
  background-color:rgb(233, 133, 133);
  color: white;
  pointer-events: none; /* Disable click interaction */
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

.icon-container.disabled-icon {
  background-color:lightgray;
}

.link-name {
  margin-left: 8px;
  flex-grow: 1;
  text-align: left;
  color: #ccc;
}

.link-name.active-text {
  color: #6259ca;
}

.link-name.disabled-text {
  color:white;
}

.nav-link.active {
  background-color: #eaedf7;
  color: #6259ca;
}

.icon-container.active-icon {
  background-color: #6259ca;
  color: white;
}

.link-name.active-text {
  color: #6259ca;
}

.link-name:hover {
  color: #6259ca;
}
</style>
