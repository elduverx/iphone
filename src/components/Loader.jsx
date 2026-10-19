import { Html } from '@react-three/drei'

const Loader = () => {
  return (
    <Html center>
      <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-white animate-spin" aria-label="Loading" />
    </Html>
  )
}

export default Loader
