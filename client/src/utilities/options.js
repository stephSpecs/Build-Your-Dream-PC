// ===== COMPONENT OPTIONS =====

export const CPUS = [
  { value: 'AMD Ryzen 5 7600X',    label: 'AMD Ryzen 5 7600X',    price: 229,  tier: 'mid',  ddr: 5 },
  { value: 'AMD Ryzen 7 7700X',    label: 'AMD Ryzen 7 7700X',    price: 349,  tier: 'high', ddr: 5 },
  { value: 'AMD Ryzen 9 7950X',    label: 'AMD Ryzen 9 7950X',    price: 699,  tier: 'ultra',ddr: 5 },
  { value: 'Intel Core i5-13400F', label: 'Intel Core i5-13400F', price: 179,  tier: 'budget',ddr: 4 },
  { value: 'Intel Core i7-13700K', label: 'Intel Core i7-13700K', price: 409,  tier: 'high', ddr: 5 },
  { value: 'Intel Core i9-13900K', label: 'Intel Core i9-13900K', price: 549,  tier: 'ultra',ddr: 5 },
  { value: 'AMD Ryzen 5 5600X',    label: 'AMD Ryzen 5 5600X',    price: 129,  tier: 'budget',ddr: 4 },
]

export const GPUS = [
  { value: 'NVIDIA RTX 4090',      label: 'NVIDIA RTX 4090',      price: 1599, tier: 'ultra', watt: 450 },
  { value: 'NVIDIA RTX 4080',      label: 'NVIDIA RTX 4080',      price: 1199, tier: 'ultra', watt: 320 },
  { value: 'NVIDIA RTX 4070 Ti',   label: 'NVIDIA RTX 4070 Ti',   price: 799,  tier: 'high',  watt: 285 },
  { value: 'NVIDIA RTX 4070',      label: 'NVIDIA RTX 4070',      price: 599,  tier: 'high',  watt: 200 },
  { value: 'AMD RX 7900 XTX',      label: 'AMD RX 7900 XTX',      price: 999,  tier: 'ultra', watt: 355 },
  { value: 'AMD RX 7600',          label: 'AMD RX 7600',          price: 269,  tier: 'mid',   watt: 165 },
  { value: 'NVIDIA RTX 3060',      label: 'NVIDIA RTX 3060',      price: 299,  tier: 'mid',   watt: 170 },
]

export const RAM_OPTIONS = [
  { value: '16GB DDR4', label: '16GB DDR4 (3200MHz)', price: 45,  type: 4 },
  { value: '32GB DDR4', label: '32GB DDR4 (3600MHz)', price: 85,  type: 4 },
  { value: '16GB DDR5', label: '16GB DDR5 (5600MHz)', price: 75,  type: 5 },
  { value: '32GB DDR5', label: '32GB DDR5 (6000MHz)', price: 139, type: 5 },
  { value: '64GB DDR5', label: '64GB DDR5 (6000MHz)', price: 259, type: 5 },
]

export const STORAGE_OPTIONS = [
  { value: '500GB NVMe SSD', label: '500GB NVMe SSD',   price: 55  },
  { value: '1TB NVMe SSD',   label: '1TB NVMe SSD',     price: 89  },
  { value: '2TB NVMe SSD',   label: '2TB NVMe SSD',     price: 159 },
  { value: '4TB NVMe SSD',   label: '4TB NVMe SSD',     price: 299 },
  { value: '2TB HDD',        label: '2TB HDD (7200RPM)',price: 55  },
]

export const CASE_COLORS = [
  { value: 'Midnight Black', label: 'Midnight Black', hex: '#1a1a1a', price: 0   },
  { value: 'Arctic White',   label: 'Arctic White',   hex: '#f0f0f0', price: 0   },
  { value: 'Stealth Grey',   label: 'Stealth Grey',   hex: '#4a4a5a', price: 0   },
  { value: 'Deep Red',       label: 'Deep Red',        hex: '#8B1A1A', price: 15  },
  { value: 'Navy Blue',      label: 'Navy Blue',       hex: '#1a2a5a', price: 15  },
  { value: 'Forest Green',   label: 'Forest Green',    hex: '#1a4a2a', price: 15  },
  { value: 'Titanium',       label: 'Titanium',        hex: '#8a8a8a', price: 25  },
]

export const COOLING_OPTIONS = [
  { value: 'Air Tower',       label: 'Air Tower Cooler',         price: 45  },
  { value: 'Liquid 120mm',   label: 'AIO Liquid Cooler 120mm',  price: 79  },
  { value: 'Liquid 240mm',   label: 'AIO Liquid Cooler 240mm',  price: 119 },
  { value: 'Liquid 360mm',   label: 'AIO Liquid Cooler 360mm',  price: 159 },
]

export const PSU_OPTIONS = [
  { value: '450W Bronze',  label: '450W 80+ Bronze', price: 55,  watts: 450  },
  { value: '550W Bronze',  label: '550W 80+ Bronze', price: 65,  watts: 550  },
  { value: '650W Bronze',  label: '650W 80+ Bronze', price: 75,  watts: 650  },
  { value: '750W Gold',    label: '750W 80+ Gold',   price: 99,  watts: 750  },
  { value: '850W Gold',    label: '850W 80+ Gold',   price: 129, watts: 850  },
  { value: '1000W Platinum',label: '1000W 80+ Platinum', price: 189, watts: 1000 },
]
