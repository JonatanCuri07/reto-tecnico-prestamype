<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useRateStore } from '@/stores/rate'

const rateStore = useRateStore()

const { purchasePrice, salePrice, loading, error } = storeToRefs(rateStore)

onMounted(() => {
  rateStore.listenRates()
})

onBeforeUnmount(() => {
  rateStore.stopListeningRates()
})
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-violet-700 px-4">
    <section class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 class="mb-6 text-2xl font-bold">Tasas de cambio</h1>

      <p v-if="loading">Cargando tasas...</p>

      <p v-else-if="error" class="text-red-600">
        {{ error }}
      </p>

      <div v-else class="space-y-3">
        <p>
          Dólar compra:
          <strong>{{ purchasePrice }}</strong>
        </p>

        <p>
          Dólar venta:
          <strong>{{ salePrice }}</strong>
        </p>
      </div>
    </section>
  </main>
</template>
