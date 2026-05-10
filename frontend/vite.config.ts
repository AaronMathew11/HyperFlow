import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseEnv = loadEnv('', process.cwd(), '')
  const modeEnv = loadEnv(mode, process.cwd(), '')

  const merged: Record<string, string> = { ...modeEnv, ...baseEnv }

  const define: Record<string, string> = {}
  for (const key of Object.keys(merged)) {
    if (key.startsWith('VITE_')) {
      define[`import.meta.env.${key}`] = JSON.stringify(merged[key])
    }
  }

  return {
    plugins: [react()],
    define,
  }
})
