<template>
  <main>
    <div class="head-title">
      <div class="left">
        <h1>Dashboard</h1>
        <ul class="breadcrumb">
          <li><i class="bx bx-chevron-right"></i></li>
        </ul>
      </div>
    </div>

    <ul class="box-info">
      <li>
        <i class="bx bxs-calendar-check"></i>
        <span class="text">
          <h3>{{ axiosResponse.PENDING !== undefined ? axiosResponse.PENDING : 0  }}</h3>
          <p>Pending</p>
        </span>
      </li>
      <li>
        <i class="bx bxs-group"></i>
        <span class="text">
          <h3>{{ axiosResponse.DISETUJUI !== undefined ? axiosResponse.DISETUJUI : 0}}</h3>
          <p>Disetujui</p>
        </span>
      </li>
      <li>
        <i class="bx bxs-dollar-circle"></i>
        <span class="text">
          <h3>{{ axiosResponse.DITOLAK  !== undefined ? axiosResponse.DITOLAK : 0}}</h3>
          <p>Ditolak</p>
        </span>
      </li>
    </ul>
    <div class="table-data">
      <div class="order">
        <label for="statusFilter">Sort by Status</label>
        <select v-model="selectedStatus" id="statusFilter" @change="filterData">
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="DISETUJUI">Disetujui</option>
          <option value="DITOLAK">Ditolak</option>
        </select>

        <table>
          <thead>
            <tr>
              <th class="order">id</th>
              <th class="order" style="padding-left: 6px">User</th>
              <th class="order">Tanggal Request</th>
              <th class="order">Permintaan</th>
              <th class="order">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="izin in paginatedOrders" :key="izin.id">
              <td>{{ izin.id }}</td>
              <td>
                <p>{{ izin.nama }}</p>
              </td>
              <td>{{ izin.tanggal }}</td>
              <td>{{ izin.judul }}</td>
              <td>
                <span
                  :class="['status', izin.status]"
                  @click="openPopup(izin)"
                  >{{ izin.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Next
      </button>
    </div>

    <div v-if="showPopup" class="popup">
      <p>Apakah Anda ingin menyetujui akses data?</p>
      <button class="approveRequest" @click="approveRequest">Setujui</button>
      <button class="rejectRequest" @click="rejectRequest">Tolak</button>
      <button class="closePopup" @click="closePopup">Tutup</button>
    </div>
  </main>
  <router-view :key="$route.fullPath" />
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      orders: [],
      currentPage: 1,
      itemsPerPage: 5,
      sortBy: 'status',
      sortDirection: 'asc',
      selectedStatus: '',
      showPopup: false,
      axiosResponse: [],
      selectedOrderIndex: -1,
      currentRequestId: null
    }
  },
  computed: {
    paginatedOrders () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedOrders.slice(start, end)
    },
    totalPages () {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage)
    },
    sortedOrders () {
      return this.sortOrders(this.filteredOrders)
    },
    filteredOrders () {
      return this.selectedStatus
        ? this.orders.filter((order) => order.status === this.selectedStatus)
        : this.orders
    }
  },
  methods: {
    async patchStatus (newStatus, currentRequestId) {
      const patchData = {
        'ngrok-skip-browser-warning': 'true',
        requestId: currentRequestId,
        newStatus: newStatus
      }

      const apiUrl =
        'http://localhost:8080/api/v1/admin/izin'

      try {
        await axios.patch(apiUrl, patchData)
        console.log('Status berhasil diperbarui:', newStatus)
        this.fetchData()
      } catch (error) {
        console.error('Gagal mengirim permintaan:', error)
      }
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    sortOrders (orders) {
      return orders.sort((a, b) => {
        const aValue = a[this.sortBy]
        const bValue = b[this.sortBy]
        const direction = this.sortDirection === 'asc' ? 1 : -1

        if (aValue < bValue) return -direction
        if (aValue > bValue) return direction
        return 0
      })
    },
    filterData () {
      this.currentPage = 1
    },
    openPopup (izin) {
      console.log(izin.id)
      this.currentRequestId = izin.id
      this.showPopup = true
    },
    approveRequest () {
      this.patchStatus('DISETUJUI', this.currentRequestId)
      this.closePopup()
    },
    rejectRequest () {
      this.patchStatus('DITOLAK', this.currentRequestId)
      this.closePopup()
    },
    closePopup () {
      this.showPopup = false
    },
    fetchData () {
      const headers = {
        'ngrok-skip-browser-warning': 'true'
      }
      axios
        .get(
          'http://localhost:8080/api/v1/admin/dashboard',
          { headers }
        )
        .then((response) => {
          this.axiosResponse = response.data.entity
          this.orders = this.axiosResponse.raw.map((jsonString) =>
            JSON.parse(jsonString)
          )
        })
        .catch((error) => {
          console.log(error)
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
  --red: #db504a;
  --green: #557c55;
  --light-green: #a6cf98;
  --dark-grey: #aaaaaa;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
}

.popup p {
  margin-bottom: 20px;
}

.popup button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.approveRequest {
  background-color: var(--green);
  color: #fff;
}

.rejectRequest {
  background-color: var(--red);
  color: #fff;
}

.closePopup {
  background-color: var(--dark-grey);
  color: #fff;
}

.close-button:hover {
  background-color: var(--grey);
}

#pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination-btn {
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border: 1px solid var(--dark-grey);
  border-radius: 5px;
  color: #000;
  font-family: var(--poppins);
}

.pagination-btn:disabled {
  cursor: not-allowed;
  background-color: var(--grey);
}

#statusFilter {
  padding: 8px;
  border: 1px solid var(--dark-grey);
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  margin-right: 20px;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  margin: 20px;
}
</style>
