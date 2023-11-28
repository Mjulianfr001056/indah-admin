<template>
  <div>
    <h1>User</h1>
    <!-- Search Input -->
    <div class="search">
      <label for="search">Search:</label>
      <input type="text" v-model="searchTerm" id="search" />
    </div>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedData" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nama }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userData: [],
      itemsPerPage: 5,
      currentPage: 1,
      searchTerm: ''
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
    paginatedData () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },
    filteredUsers () {
      const term = this.searchTerm.toLowerCase()
      return this.userData.filter(
        (user) =>
          user.nama.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      )
    }
  },
  methods: {
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
      }
    },
    prevPage () {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    clearSearch () {
      this.searchTerm = ''
    },
    search () {
      const term = this.searchTerm.toLowerCase()
      const filteredData = this.userData.filter(
        (user) =>
          user.nama.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      )
      this.filteredUsers = filteredData
      this.currentPage = 1
    },
    fetchData () {
      const headers = {
        'ngrok-skip-browser-warning': 'true'
      }

      axios.get('https://91ed-103-123-250-164.ngrok-free.app/api/v1/admin/users', { headers })
        .then(response => {
          this.userData = response.data.entity.map(jsonString => JSON.parse(jsonString))
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.5em;
  color: #333;
  font-family: "Poppins", sans-serif;
  margin: 20px;
}

table {
  border-collapse: collapse;
  margin: 20px;
  font-family: "Poppins", sans-serif;
  width: calc(100% - 40px);
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

thead {
  background-color: var(--light-green);
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Bootstrap Classes */
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

body {
  font-family: "Poppins", sans-serif;
}

.search {
  margin: 20px;
  font-family: "Poppins", sans-serif;
}

.search label {
  margin-right: 10px;
}

.search input {
  padding: 8px;
  font-size: 14px;
}

.pagination {
  margin-top: 20px;
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
}

.pagination span {
  padding: 8px;
  margin: 0 5px;
  font-size: 14px;
}
</style>
