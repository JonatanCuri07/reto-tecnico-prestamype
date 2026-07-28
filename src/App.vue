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
  <main class="min-h-screen bg-gradient-to-br from-violet-800 via-violet-700 to-violet-500">
    <div v-if="loading" class="flex min-h-screen items-center justify-center">
      <p class="text-lg text-white">Cargando tasas...</p>
    </div>

    <div v-else-if="error" class="flex min-h-screen items-center justify-center px-4">
      <section class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <p class="text-red-600">
          {{ error }}
        </p>
      </section>
    </div>

    <section
      v-else
      class="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center lg:flex-row lg:justify-center lg:gap-24 lg:px-10"
    >
      <header
        class="w-full px-6 pb-6 pt-8 text-center text-white lg:w-96 lg:px-0 lg:py-0 lg:text-left"
      >
        <h1 class="text-2xl font-bold leading-tight lg:text-5xl">
          El mejor
          <br />
          tipo de cambio
        </h1>

        <p class="mt-2 text-sm leading-snug lg:text-xl">
          para cambiar dólares y soles
          <br />
          online en Perú
        </p>
      </header>

      <ExchangeCalculator :purchase-price="purchasePrice" :sale-price="salePrice" />
    </section>
  </main>
</template>
