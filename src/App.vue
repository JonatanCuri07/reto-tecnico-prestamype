<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import ExchangeCalculator from '@/components/ExchangeCalculator.vue'
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
  <main class="flex min-h-screen items-center justify-center bg-violet-700 px-4 py-10">
    <p v-if="loading" class="text-lg text-white">Cargando tasas...</p>

    <section
      v-else-if="error"
      class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg"
    >
      <p class="text-red-600">
        {{ error }}
      </p>
    </section>

    <ExchangeCalculator v-else :purchase-price="purchasePrice" :sale-price="salePrice" />
  </main>
</template>
