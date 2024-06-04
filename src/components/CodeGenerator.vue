<script setup>
import { ref } from "vue";
import axios from 'axios';
import Loading from "./icons/Loading.vue";
const load = ref(false)

// code generator ref
const dist = ref("")
const numCodes = ref([])
const codes = ref([])

// time
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

// alert
const showAlert = ref(false)
const textAlert = ref("")
const bgAlert = ref("")

//function code generator
function generateCodes() {
    const newCodes = [];
    const codeLength = 6; // Ganti dengan panjang kode yang Anda inginkan
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstu0123456789';
    for (let i = 0; i < numCodes.value; i++) {
        let dcode = '';
        for (let j = 0; j < codeLength; j++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            dcode += characters[randomIndex];
        }
        newCodes.push({
            code: dcode,
            checked: 0,
            created_at: today
            //      // dist_id: props.getid
        });
    }
    codes.value = newCodes;
}

// hasil generate
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huLmRvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjkzMTQwNCwiZXhwIjoxNzEyOTM1MDA0fQ.slNdjvFOhgoRvIwy-P1gc7wzk7i9hN1onA95UXPVceg
function getHasil() {
    const prodCodesData = codes.value;
    load.value = true;
    const token = localStorage.getItem(' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huLmRvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjkzMTQwNCwiZXhwIjoxNzEyOTM1MDA0fQ.slNdjvFOhgoRvIwy-P1gc7wzk7i9hN1onA95UXPVceg');
    axios.post('https://backend.wahyudi.xyz/prod_codes/batch', { prodCodesData }, {
        headers: {
            Authorization: `Bearer ${token}` // Menambahkan token ke header Authorization
        }
    })
        .then((res) => {
            setTimeout(() => {
                load.value = false;
                showAlert.value = true;
                codes.value = 0;
            }, 1000);
        })
        .catch((err) => {
            load.value = false;
            showAlert.value = true;
            if (err.response) {
                console.error('Error response:', err.response.data);
                textAlert.value = 'Kesalahan: ' + err.response.data.error || 'Code tidak Tersimpan';
            } else if (err.request) {
                console.error('No response received:', err.request);
                textAlert.value = 'Tidak ada respons dari server';
            } else {
                console.error('Error:', err.message);
                textAlert.value = 'Kesalahan: ' + err.message || 'Code tidak Tersimpan';
            }
            bgAlert.value = 'alert-danger';
        });
}

</script>
<template>
    <div v-if="showAlert">
        <transition enter-to-class="scale-110 duration-300" leave-class="scale-75 opacity-0">
            <div class="p-6 rounded-lg bg-brand-100 text-brand-800 flex justify-between mb-6">
                <div>
                    <h4>Code Tersimpan</h4>
                </div>
                <button @click="showAlert = false"> x </button>
            </div>
        </transition>
    </div>
    <div v-if="load"
        class="fixed top-0 left-0 w-full h-screen z-50 bg-white bg-opacity-70 flex fle-col justify-center items-center">
        <Loading />
    </div>
    <div class="flex w-full">
                <input type="number" class="p-3 border border-brand-1 rounded-l-lg w-full" v-model="numCodes" id=""
                    placeholder="Banyaknya kode">
                <button @click="generateCodes"
                    class="py-3 px-5 rounded-r-lg  bg-brand-700 hover:bg-brand-800 text-brand-50 ">Generate</button>
            </div>

    <div class="" v-if="codes != 0">
        <div class="text-center py-6">
          Sudah di generate <span class="text-medium text-xl text-brand-700"> {{codes.length}}  </span> code
<!--             <ul class="flex flex-wrap gap-2 list-unstyled">
                <li class="text-sm" v-for="(item, index) in codes" :key="index">
                    {{ item.code }}
                </li>
            </ul> -->
        </div>
        <button @click="getHasil" class="py-3 px-5  bg-brand-700 hover:bg-brand-800 text-brand-50 w-full rounded-lg">
            Simpan Code </button>
    </div><!-- if code !=0 -->
</template>