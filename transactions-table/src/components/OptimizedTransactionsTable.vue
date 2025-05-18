<template>
  <div class="container">
    <h3>Real-Time Transactions</h3>

    <div class="table-header">
      <div class="cell">Time</div>
      <div class="cell">Price</div>
      <div class="cell">Volume</div>
      <div class="cell">Value</div>
    </div>

    <VirtualScroller
        :items="displayedTransactions"
        :itemSize="40"
        class="scroll"
        :style="{ height: '400px' }"
    >
      <template #item="{ item }">
        <div class="row">
          <div class="cell">{{ item.t }}</div>
          <div class="cell">{{ item.p }}</div>
          <div class="cell">{{ item.v }}</div>
          <div class="cell">{{ item.u }}</div>
        </div>
      </template>
    </VirtualScroller>

    <div class="stats">Total Transactions: {{ displayedTransactions.length }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

let counter = 0

const generateTransaction = () => {
  const now = new Date()
  return {
    n: counter++,
    t: now.toLocaleTimeString() + '.' + now.getMilliseconds(),
    p: (Math.random() * 100 + 100).toFixed(2),
    v: Math.floor(Math.random() * 500) + 1,
    u: (Math.random() * 10000).toFixed(2)
  }
}

const transactions = ref<any[]>([])
const isLoading = ref(true)
const updateInterval = ref<number | null>(null)
const initialBatchSize = 10000
const updateIntervalMs = 200

const displayedTransactions = computed(() => [...transactions.value].reverse())

const loadInitialData = () => {
  transactions.value = Array.from({ length: initialBatchSize }, generateTransaction)
  isLoading.value = false
  updateInterval.value = setInterval(() => {
    transactions.value.push(generateTransaction())
  }, updateIntervalMs)
}

onMounted(loadInitialData)
onBeforeUnmount(() => {
  if (updateInterval.value) clearInterval(updateInterval.value)
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  min-width: 100%;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table-header, .row {
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 12px 16px;
  font-family: monospace;
  font-size: 16px;
}

.cell {
  flex: 1;
  padding: 0 10px;
}

.table-header {
  font-weight: bold;
  background-color: #f2f2f2;
  font-size: 17px;
}

.scroll {
  height: 600px;
}

h3 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.stats {
  margin-top: 16px;
  font-size: 15px;
  text-align: center;
}
</style>
