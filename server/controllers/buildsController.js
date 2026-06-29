import { pool } from '../config/database.js'

// GET all saved builds
export const getAllBuilds = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM saved_builds ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching builds:', err)
    res.status(500).json({ error: 'Failed to fetch builds' })
  }
}

// GET single build by ID
export const getBuildById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM saved_builds WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error fetching build:', err)
    res.status(500).json({ error: 'Failed to fetch build' })
  }
}

// POST create new build
export const createBuild = async (req, res) => {
  const { build_name, cpu, gpu, ram, storage, case_color, cooling, psu, total_price } = req.body

  // Validate required fields
  if (!build_name || !cpu || !gpu || !ram || !storage || !case_color || !cooling || !psu) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // Validate impossible combinations
  const validationError = validateCombination({ cpu, gpu, ram, psu })
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  try {
    const result = await pool.query(
      `INSERT INTO saved_builds (build_name, cpu, gpu, ram, storage, case_color, cooling, psu, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [build_name, cpu, gpu, ram, storage, case_color, cooling, psu, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error creating build:', err)
    res.status(500).json({ error: 'Failed to create build' })
  }
}

// PUT update build
export const updateBuild = async (req, res) => {
  const { id } = req.params
  const { build_name, cpu, gpu, ram, storage, case_color, cooling, psu, total_price } = req.body

  if (!build_name || !cpu || !gpu || !ram || !storage || !case_color || !cooling || !psu) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const validationError = validateCombination({ cpu, gpu, ram, psu })
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  try {
    const result = await pool.query(
      `UPDATE saved_builds
       SET build_name=$1, cpu=$2, gpu=$3, ram=$4, storage=$5,
           case_color=$6, cooling=$7, psu=$8, total_price=$9
       WHERE id=$10
       RETURNING *`,
      [build_name, cpu, gpu, ram, storage, case_color, cooling, psu, total_price, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error updating build:', err)
    res.status(500).json({ error: 'Failed to update build' })
  }
}

// DELETE build
export const deleteBuild = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM saved_builds WHERE id = $1 RETURNING *',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found' })
    }
    res.json({ message: 'Build deleted successfully', deleted: result.rows[0] })
  } catch (err) {
    console.error('Error deleting build:', err)
    res.status(500).json({ error: 'Failed to delete build' })
  }
}

// Validate impossible combinations
function validateCombination({ cpu, gpu, ram, psu }) {
  const highEndCPUs = ['AMD Ryzen 9 7950X', 'Intel Core i9-13900K']
  const highEndGPUs = ['NVIDIA RTX 4090', 'NVIDIA RTX 4080']
  const lowPSUs = ['550W Bronze', '450W Bronze']

  // High-end CPU + High-end GPU needs a powerful PSU
  if (highEndCPUs.includes(cpu) && highEndGPUs.includes(gpu) && lowPSUs.includes(psu)) {
    return 'A high-end CPU and GPU combo requires at least a 750W PSU. Please upgrade your power supply.'
  }

  // RTX 4090 alone needs at least 750W
  if (gpu === 'NVIDIA RTX 4090' && lowPSUs.includes(psu)) {
    return 'The RTX 4090 requires at least a 750W PSU to operate safely.'
  }

  // DDR5 RAM needs a compatible (modern) CPU
  const ddr5CPUs = ['AMD Ryzen 9 7950X', 'AMD Ryzen 7 7700X', 'AMD Ryzen 5 7600X', 'Intel Core i9-13900K', 'Intel Core i7-13700K']
  const ddr5RAM = ['32GB DDR5', '64GB DDR5']
  const ddr4CPUs = ['Intel Core i5-13400F', 'AMD Ryzen 5 5600X']

  if (ddr5RAM.includes(ram) && ddr4CPUs.includes(cpu)) {
    return `${cpu} does not support DDR5 RAM. Please select a DDR4 memory option or upgrade to a DDR5-compatible CPU.`
  }

  return null
}
