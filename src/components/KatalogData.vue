<template>
  <div>
    <h1>Katalog Data</h1>
    <div class="sorting">
      <label for="categorySort">Sort by Category:</label>
      <select id="categorySort" v-model="selectedCategory">
        <option value="">All</option>
        <option
          v-for="category in uniqueCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sortData('id')">ID</th>
          <th @click="sortData('judul')">Judul</th>
          <th @click="sortData('kategori')">Kategori</th>
          <th @click="sortData('tahun')">Tahun</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.judul }}</td>
          <td>{{ item.kategori }}</td>
          <td>{{ item.tahun }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination Section -->
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>{{ currentPage }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      katalogData: [],
      selectedCategory: '',
      sortKey: 'id',
      sortOrders: {
        id: 1,
        judul: 1,
        kategori: 1,
        tahun: 1
      },
      itemsPerPage: 10,
      currentPage: 1
    }
  },
  computed: {
    sortedKatalogData () {
      const selectedCategory = this.selectedCategory
      const sortKey = this.sortKey
      const order = this.sortOrders[sortKey] || 1

      let filteredData = this.katalogData
      if (selectedCategory) {
        filteredData = filteredData.filter(
          (item) => item.kategori === selectedCategory
        )
      }

      return filteredData.sort((a, b) => {
        const fieldA = a[sortKey]
        const fieldB = b[sortKey]

        let comparison = 0
        if (fieldA > fieldB) {
          comparison = 1
        } else if (fieldA < fieldB) {
          comparison = -1
        }

        return order * comparison
      })
    },
    uniqueCategories () {
      const categories = new Set(this.katalogData.map((item) => item.kategori))
      return [].concat(Array.from(categories))
    },
    totalPages () {
      return Math.ceil(this.sortedKatalogData.length / this.itemsPerPage)
    },
    paginatedData () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedKatalogData.slice(start, end)
    }
  },
  methods: {
    sortData (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
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
    fetchData () {
      const headers = {
        'ngrok-skip-browser-warning': 'true'
      }

      axios
        .get('http://localhost:8080/api/v1/admin/katalog', { headers })
        .then((response) => {
          this.katalogData = response.data.entity.map(jsonString => JSON.parse(jsonString))
          console.log(response.data.entity.map(jsonString => JSON.parse(jsonString)))
        })
        .catch((error) => {
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
:root {
  --poppins: "Poppins", sans-serif;
  --lato: "Lato", sans-serif;
  --light: #f9f9f9;
  --green: #557c55;
  --light-green: #a6cf98;
}

h1 {
  font-size: 1.5em;
  color: #333;
  font-family: "Poppins", sans-serif;
  margin: 20px;
}

table {
  border-collapse: collapse;
  margin: 20px;
  margin-right: 20px;
  font-family: "Poppins", sans-serif;
  width: calc(100% - 40px);
}

thead {
  background-color: var(--light-green);
  margin-right: 20px;
  font-family: "Poppins", sans-serif;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  margin-right: 20px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
  padding-right: 20px;
}

body {
  font-family: "Poppins", sans-serif;
}

.sorting {
  margin: 20px;
  font-family: "Poppins", sans-serif;
}

label {
  margin-right: 10px;
}

#categorySort {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-family: "Poppins", sans-serif;
}

th.sorted-asc::after {
  content: " ▲";
}

th.sorted-desc::after {
  content: " ▼";
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
