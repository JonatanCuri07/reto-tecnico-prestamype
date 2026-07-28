<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    currencyName: string
    symbol: string
    label: string
    readonly?: boolean
  }>(),
  {
    readonly: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  if (value === '' || Number(value) >= 0) {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <div class="flex h-14 overflow-hidden rounded-md border border-violet-500 bg-white">
    <div class="flex w-28 items-center justify-center bg-gray-50 px-3">
      <span class="text-sm text-violet-600">
        {{ currencyName }}
      </span>
    </div>

    <label class="flex flex-1 flex-col justify-center px-4 text-right">
      <span class="text-xs text-gray-400">
        {{ label }}
      </span>

      <div class="flex items-center justify-end gap-1">
        <span class="text-gray-700">
          {{ symbol }}
        </span>

        <input
          :value="modelValue"
          :readonly="readonly"
          type="number"
          min="0"
          step="0.01"
          inputmode="decimal"
          class="w-full bg-transparent text-right text-base text-gray-700 outline-none"
          @input="handleInput"
        />
      </div>
    </label>
  </div>
</template>
