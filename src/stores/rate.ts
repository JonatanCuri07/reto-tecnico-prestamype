import { defineStore } from 'pinia'
import { doc, onSnapshot, type Unsubscribe } from 'firebase/firestore'

import { firestoreDb } from '@/firebase/config'
import type { ExchangeRate } from '@/types/rate'

interface RateState extends ExchangeRate {
  loading: boolean
  error: string | null
  unsubscribe: Unsubscribe | null
}

export const useRateStore = defineStore('rate', {
  state: (): RateState => ({
    purchasePrice: 0,
    salePrice: 0,
    loading: false,
    error: null,
    unsubscribe: null,
  }),

  actions: {
    listenRates() {
      if (this.unsubscribe) {
        return
      }

      this.loading = true
      this.error = null

      const rateDocument = doc(firestoreDb, 'rates', 'TDmXIypgLKKfNggHHSnw')

      this.unsubscribe = onSnapshot(
        rateDocument,
        (snapshot) => {
          if (!snapshot.exists()) {
            this.error = 'No se encontraron las tasas de cambio.'
            this.loading = false
            return
          }

          const data = snapshot.data()

          const purchasePrice = Number(data.purchase_price)
          const salePrice = Number(data.sale_price)

          if (!Number.isFinite(purchasePrice) || !Number.isFinite(salePrice)) {
            this.error = 'Las tasas recibidas no son válidas.'
            this.loading = false
            return
          }

          this.purchasePrice = purchasePrice
          this.salePrice = salePrice
          this.loading = false
        },
        (error) => {
          console.error('Error al escuchar las tasas de cambio:', error)

          this.error = 'No fue posible obtener las tasas de cambio.'
          this.loading = false
        },
      )
    },

    stopListeningRates() {
      if (!this.unsubscribe) {
        return
      }

      this.unsubscribe()
      this.unsubscribe = null
    },
  },
})
