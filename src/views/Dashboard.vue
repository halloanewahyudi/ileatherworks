<script setup>
import { useAuthStore } from "@/stores/authStore";
import MyCard from '@/components/elements/MyCard.vue';
import  CodeGenerator from '@/components/CodeGenerator.vue';
import TotalCode from '@/components/TotalCode.vue';
import TableCode from '@/components/TableCode.vue';
const auth = useAuthStore()
</script>
<template>
  <div class="dashboard py-10">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <my-card>
         
          <h2>Halo {{ auth.user.username }}</h2>
           <p> Selamat datang di admin generate code</p>
        </my-card>
        <my-card>
          
        
          <CodeGenerator />
          <div class="flex items-center p-2 bg-brand-50 text-brand-900 mt-5 rounded-lg"> Total Kode   <TotalCode /> </div>
<TableCode />
        </my-card>
      </div>
    </div>

  </div>
</template>
