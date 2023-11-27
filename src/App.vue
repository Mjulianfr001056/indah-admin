<template>
  <section id="content">
    <!-- SIDEBAR -->
    <section id="sidebar">
      <div class="logo"></div>
      <img src="./assets/indah2.png" alt="Logo" />
      <div class="side-menu-container">
        <ul class="side-menu-top">
          <li>
            <router-link to="/dashboard">
              <!-- <i class="dashboard"></i> -->
              <span class="text">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/katalog">
              <!-- <i class="katalog"></i> -->
              <span class="text">Katalog Data</span>
            </router-link>
          </li>
          <li>
            <router-link to="/user">
              <!-- <i class="user"></i> -->
              <span class="text">User</span>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <section id="main-content">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
export default {
  computed: {
    pageTitle () {
      switch (this.$route.path) {
        case '/katalog':
          return 'KatalogData'
        case '/user':
          return 'UserTable'
        default:
          return 'DashboardView'
      }
    }
  }
}
</script>

<style scoped>
:root {
  --poppins: "Poppins", sans-serif;
  --lato: "Lato", sans-serif;
  --light: #f9f9f9;
  --green: #557c55;
  --light-green: #a6cf98;
  --grey: #eee;
  --dark-grey: #aaaaaa;
  --dark: #342e37;
}

#sidebar {
  background-color: #dcebca;
  display: flex;
  flex-direction: column;
}

.logo {
  width: 8px;
  length: auto;
  margin-top: 8px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 10px;
  background: none;
}
.logo img {
  width: 8px;
}
.side-menu-container{
  margin-top: 50px;
}
.side-menu-top {
  flex: 1;
}
.side-menu-top ul {
  margin-top: 100px;
}
.side-menu-top li {
  margin-bottom: 50x;
  margin-top: 20px;
}

.side-menu-top .text {
  margin-left: 50px;
  margin-bottom: 50px;
  margin-top: 50px;
  color: var(--green);
  font-size: 20px;
  font-style: bold;
  font-family: var(--poppins);
}

.side-menu-top .text:hover {
  background-color: var(--green);
  color: var(--light);
  width: 100%;
  height: 100%;
  border-radius: 2px;
  box-sizing: border-box;
}
</style>
