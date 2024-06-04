<script setup>
import axios from "axios"
import { onMounted, ref , watchEffect, onBeforeUnmount} from "vue";
const codes = ref(0)
const getCodes = () => {
    const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huLmRvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjkzMTQwNCwiZXhwIjoxNzEyOTM1MDA0fQ.slNdjvFOhgoRvIwy-P1gc7wzk7i9hN1onA95UXPVceg');
    axios.get('https://backend.wahyudi.xyz/prod_codes', {
        headers: {
            Authorization: `Bearer ${token}` // Menambahkan token ke header Authorization
        }
    })
        .then((res) => {
           codes.value = res.data.length;
            // console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });
}


const pollingInterval = 1000;
onMounted(() => {
    getCodes()
    const intervalId = setInterval(getCodes, pollingInterval);
    // Lifecycle hook: onBeforeUnmount untuk membersihkan polling saat komponen dihancurkan
    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});
</script>
<template>
    {{ codes }}
</template>