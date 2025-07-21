import { useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
const useScrollProgress = (from: number, to: number) => {
    const scroll = useScroll()
    const [progress, setProgress] = useState(0)

    useFrame(() => {
        const t = (scroll.offset - from) / (to - from)
        const clampedT = Math.max(0, Math.min(t, 1))
        // console.log('Scroll offset:', scroll.offset, 'Progress:', clampedT)
        setProgress(clampedT)
    })

    return progress
}

export default useScrollProgress