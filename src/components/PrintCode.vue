<template>
    <div class="container flex flex-col gap-6 py-10">
        <div class="flex gap-4 items-center">
            <select v-model="itemsPerPage" @change="changeItemsPerPage" class="p-2 rounded-lg max-w-20">
            <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <button class="btn inline-flex items-center gap-4" @click="$htmlToPaper('print')">Print <IconPrint/></button>
        </div>
    
        <div  id="print" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            <div class="p-2 rounded-lg border bg-white inline-flex gap-2 col-auto max-w-[300px] shrink-0 m-2" v-for="item in paginatedItems" :key="item.id">
                <img src="@/assets/qrileather.jpg" class="w-16 h-16" alt="">
                <div>
                    <h5 class="font-medium tracking-widest">{{ item.code }}</h5>
                    <p class="text-sm">Scan QR code di sebelah kiri lalu silakan input kode di atas </p>
                </div>    
            </div>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import IconPrint from '@/components/icons/IconPrint.vue' ;
// Data dummy awal dengan urutan terbaru
const items = ref<Array<{ id: number; code: string }> | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(32);
const perPageOptions = [12, 24, 32, 52, 102, 200];

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


// Computed property untuk mendapatkan total halaman
const totalPages = computed(() => {
    return Math.ceil(items.value?.length / itemsPerPage.value);
});

// Computed property untuk mendapatkan item pada halaman saat ini
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return items.value?.slice(start, end) || [];
});

// Fungsi untuk pindah ke halaman sebelumnya
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

// Fungsi untuk pindah ke halaman berikutnya
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

// Fungsi untuk mengubah jumlah item per halaman dan reset ke halaman pertama
const changeItemsPerPage = () => {
    currentPage.value = 1;
};

onMounted(fetchData);
</script>

<style scoped>
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