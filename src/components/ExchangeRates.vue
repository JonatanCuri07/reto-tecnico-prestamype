<script setup lang="ts">
defineProps<{
  purchasePrice: number
  salePrice: number
  activeRate: 'purchase' | 'sale'
}>()

const formatRate = (value: number): string => {
  return value.toFixed(4)
}
</script>

<template>
  <div class="grid grid-cols-2 border-b border-gray-200 text-center">
    <div
      class="px-4 py-4"
      :class="{
        'border-b-2 border-violet-600 text-violet-600': activeRate === 'purchase',
        'text-gray-500': activeRate !== 'purchase',
      }"
    >
      <p class="text-xs">Dólar compra</p>

      <p class="text-sm font-semibold">
        {{ formatRate(purchasePrice) }}
      </p>
    </div>

    <div
      class="px-4 py-4"
      :class="{
        'border-b-2 border-violet-600 text-violet-600': activeRate === 'sale',
        'text-gray-500': activeRate !== 'sale',
      }"
    >
      <p class="text-xs">Dólar venta</p>

      <p class="text-sm font-semibold">
        {{ formatRate(salePrice) }}
      </p>
    </div>
  </div>
</template>
