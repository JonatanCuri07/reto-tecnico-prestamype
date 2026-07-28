<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    currencyName: string
    symbol: string
    label: string
    readonly?: boolean
    maxValue?: number
    placeholder?: string
  }>(),
  {
    readonly: false,
    maxValue: 999_999.99,
    placeholder: '0.00',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const sanitizeValue = (value: string): string => {
  let sanitizedValue = value.replace(',', '.')
  sanitizedValue = sanitizedValue.replace(/[^0-9.]/g, '')

  const parts = sanitizedValue.split('.')
  let integerPart = parts[0] ?? ''
  const decimalPart = parts.slice(1).join('').slice(0, 2)

  if (integerPart.length > 1) {
    integerPart = integerPart.replace(/^0+(?=\d)/, '')
  }

  sanitizedValue = parts.length > 1 ? `${integerPart || '0'}.${decimalPart}` : integerPart

  if (sanitizedValue === '') {
    return ''
  }

  const numericValue = Number(sanitizedValue)

  if (numericValue > props.maxValue) {
    return props.maxValue.toFixed(2)
  }

  return sanitizedValue
}

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const sanitizedValue = sanitizeValue(input.value)

  input.value = sanitizedValue
  emit('update:modelValue', sanitizedValue)
}
</script>

<template>
  <div class="flex h-14 overflow-hidden rounded-md border border-violet-500 bg-white">
    <div class="flex w-28 items-center justify-center bg-gray-50 px-3">
      <span class="text-sm text-violet-600">
        {{ props.currencyName }}
      </span>
    </div>

    <label class="flex min-w-0 flex-1 flex-col justify-center px-4 text-right">
      <span class="text-xs text-gray-400">
        {{ props.label }}
      </span>

      <div class="flex min-w-0 items-center justify-end gap-1">
        <span class="text-gray-700">
          {{ props.symbol }}
        </span>

        <input
          :value="props.modelValue"
          :readonly="props.readonly"
          :placeholder="props.placeholder"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          class="w-full min-w-0 bg-transparent text-right text-base text-gray-700 outline-none placeholder:text-gray-400"
          @input="handleInput"
        />
      </div>
    </label>
  </div>
</template>
