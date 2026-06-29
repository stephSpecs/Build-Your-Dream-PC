import { CPUS, GPUS, RAM_OPTIONS, STORAGE_OPTIONS, CASE_COLORS, COOLING_OPTIONS, PSU_OPTIONS } from './options.js'

// ===== PRICE CALCULATION =====

export function getOptionPrice(list, value) {
  const item = list.find(o => o.value === value)
  return item ? item.price : 0
}

export function calculateTotalPrice(selections) {
  const { cpu, gpu, ram, storage, case_color, cooling, psu } = selections
  return (
    getOptionPrice(CPUS, cpu) +
    getOptionPrice(GPUS, gpu) +
    getOptionPrice(RAM_OPTIONS, ram) +
    getOptionPrice(STORAGE_OPTIONS, storage) +
    getOptionPrice(CASE_COLORS, case_color) +
    getOptionPrice(COOLING_OPTIONS, cooling) +
    getOptionPrice(PSU_OPTIONS, psu)
  )
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price)
}

// ===== VALIDATION =====

export function validateBuild(selections) {
  const { cpu, gpu, ram, psu } = selections
  const cpuData = CPUS.find(c => c.value === cpu)
  const gpuData = GPUS.find(g => g.value === gpu)
  const ramData = RAM_OPTIONS.find(r => r.value === ram)
  const psuData = PSU_OPTIONS.find(p => p.value === psu)

  if (!cpuData || !gpuData || !ramData || !psuData) return null

  // DDR compatibility
  if (ramData.type !== cpuData.ddr) {
    return `${cpu} requires DDR${cpuData.ddr} RAM, but you selected DDR${ramData.type}. Please choose a compatible memory option.`
  }

  // PSU wattage check
  const minWatts = gpuData.watt + 150 // GPU TDP + system overhead
  if (psuData.watts < minWatts) {
    return `Your selected GPU (${gpu}) needs at least ${minWatts}W, but your PSU only provides ${psuData.watts}W. Please upgrade your power supply.`
  }

  return null // valid!
}

// ===== BUILD TIER =====

export function getBuildTier(totalPrice) {
  if (totalPrice < 700)  return { label: 'Budget', color: '#8B9CB6' }
  if (totalPrice < 1200) return { label: 'Mid-Range', color: '#39D353' }
  if (totalPrice < 2000) return { label: 'High-End', color: '#2F80ED' }
  return { label: 'Enthusiast', color: '#F0A000' }
}
