const BASE_URL = '/api/builds'

export async function getAllBuilds() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch builds')
  return res.json()
}

export async function getBuildById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch build')
  return res.json()
}

export async function createBuild(buildData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to create build')
  return data
}

export async function updateBuild(id, buildData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update build')
  return data
}

export async function deleteBuild(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete build')
  return res.json()
}
