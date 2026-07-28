<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import syncIcon from '@/assets/icons/sync.svg'
import CurrencyField from '@/components/CurrencyField.vue'
import ExchangeRates from '@/components/ExchangeRates.vue'

const props = defineProps<{
  purchasePrice: number
  salePrice: number
}>()

type ExchangeDirection = 'usd-to-pen' | 'pen-to-usd'

const MAX_AMOUNT = 999_999.99

const direction = ref<ExchangeDirection>('usd-to-pen')
const sourceAmount = ref('')
const convertedAmount = ref('0.00')

const isDollarToSoles = computed(() => {
  return direction.value === 'usd-to-pen'
})

const activeRate = computed<'purchase' | 'sale'>(() => {
  return isDollarToSoles.value ? 'purchase' : 'sale'
})

const sourceCurrency = computed(() => {
  return isDollarToSoles.value ? 'Dólares' : 'Soles'
})

const sourceSymbol = computed(() => {
  return isDollarToSoles.value ? '$' : 'S/'
})

const targetCurrency = computed(() => {
  return isDollarToSoles.value ? 'Soles' : 'Dólares'
})

const targetSymbol = computed(() => {
  return isDollarToSoles.value ? 'S/' : '$'
})

const canCalculate = computed(() => {
  const amount = Number(sourceAmount.value)

  return (
    sourceAmount.value !== '' &&
    Number.isFinite(amount) &&
    amount > 0 &&
    amount <= MAX_AMOUNT &&
    props.purchasePrice > 0 &&
    props.salePrice > 0
  )
})

const resetConvertedAmount = () => {
  convertedAmount.value = '0.00'
}

const calculateExchange = () => {
  const amount = Number(sourceAmount.value)

  if (
    sourceAmount.value === '' ||
    !Number.isFinite(amount) ||
    amount < 0 ||
    amount > MAX_AMOUNT ||
    props.purchasePrice <= 0 ||
    props.salePrice <= 0
  ) {
    resetConvertedAmount()
    return
  }

  const result = isDollarToSoles.value ? amount * props.purchasePrice : amount / props.salePrice

  convertedAmount.value = result.toFixed(2)
}

const changeDirection = () => {
  direction.value = isDollarToSoles.value ? 'pen-to-usd' : 'usd-to-pen'

  resetConvertedAmount()
}

watch(sourceAmount, () => {
  resetConvertedAmount()
})

watch(
  () => [props.purchasePrice, props.salePrice],
  () => {
    resetConvertedAmount()
  },
)
</script>

<template>
  <section class="w-full overflow-hidden bg-white lg:max-w-md lg:rounded-xl lg:shadow-xl">
    <ExchangeRates
      :purchase-price="purchasePrice"
      :sale-price="salePrice"
      :active-rate="activeRate"
    />

    <div class="px-6 py-8 sm:px-8">
      <div class="relative flex flex-col gap-4">
        <CurrencyField
          v-model="sourceAmount"
          :currency-name="sourceCurrency"
          :symbol="sourceSymbol"
          :max-value="MAX_AMOUNT"
          label="Envías"
          placeholder="0.00"
        />

        <button
          type="button"
          aria-label="Cambiar dirección de la conversión"
          class="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-violet-600 text-white shadow-md transition hover:bg-violet-700"
          @click="changeDirection"
        >
          <img :src="syncIcon" alt="" class="h-[23px] w-[23px]" />
        </button>

        <CurrencyField
          :model-value="convertedAmount"
          :currency-name="targetCurrency"
          :symbol="targetSymbol"
          label="Recibes"
          placeholder="0.00"
          readonly
        />
      </div>

      <button
        type="button"
        :disabled="!canCalculate"
        class="mt-10 w-full rounded-md bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        @click="calculateExchange"
      >
        Iniciar operación
      </button>
    </div>
  </section>
</template>
