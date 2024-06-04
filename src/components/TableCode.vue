<template>
    <div class="pt-5 flex flex-col gap-5">
      <input v-model="searchQuery" placeholder="Cari kode" class="p-2 rounded-lg border" />
      <table class="table-auto w-full text-sm text-left rtl:text-right text-brand-700 border">
        <thead class=" text-brand-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" class="px-4 py-2">ID</th>
            <th scope="col" class="px-4 py-2">Kode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" class="bg-white">
            <td class="px-4 py-2">{{ item.id }}</td>
            <td class="px-4 py-2">{{ item.code }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  
  // Data dummy awal
  const items = ref<Array<{ id: number; code: string }> | null>(null);
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  // Fungsi untuk mensimulasikan pengambilan data dari API
  const fetchData = () => {
    const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huLmRvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjkzMTQwNCwiZXhwIjoxNzEyOTM1MDA0fQ.slNdjvFOhgoRvIwy-P1gc7wzk7i9hN1onA95UXPVceg');
    axios.get('https://backend.wahyudi.xyz/prod_codes', {
        headers: {
            Authorization: `Bearer ${token}` // Menambahkan token ke header Authorization
        }
    })
        .then((res) => {
                items.value = res.data;
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });
};
  
  // Computed property untuk memfilter item berdasarkan query pencarian
  const filteredItems = computed(() => {
    if (!items.value) return [];
    return items.value.filter(item =>
      item.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Computed property untuk mendapatkan total halaman
  const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
  });
  
  // Computed property untuk mendapatkan item pada halaman saat ini
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.value.slice(start, end);
  });
  
  // Fungsi untuk pindah ke halaman sebelumnya
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  
  // Fungsi untuk pindah ke halaman berikutnya
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };


  const pollingInterval = 1000;
onMounted(() => {
    fetchData()
    const intervalId = setInterval(fetchData, pollingInterval);
    // Lifecycle hook: onBeforeUnmount untuk membersihkan polling saat komponen dihancurkan
    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});
  
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  
  .pagination button {
    margin: 0 5px;
  }
  </style>
  