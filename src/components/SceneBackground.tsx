import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const palette = {
  background: "#05030a",
  fog: "#12091a",
  wall: "#15101d",
  panel: "#1b1325",
  edge: "#cdb7ff",
  glow: "#f2b8ff",
  violet: "#8b73df",
  shadow: "#0a0610",
};

type SceneBackgroundProps = {
  animate: boolean;
  reducedMotion: boolean;
  scrollProgress: number;
};

function usePointerTarget() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return pointer;
}

function CameraRig({
  animate,
  reducedMotion,
  scrollProgress,
  pointer,
}: SceneBackgroundProps & { pointer: { x: number; y: number } }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const motion = reducedMotion ? 0.1 : 1;
    const baseX = THREE.MathUtils.lerp(-0.12, 0.14, scrollProgress);
    const baseY = THREE.MathUtils.lerp(0.08, -0.06, scrollProgress);
    const baseZ = THREE.MathUtils.lerp(9.8, 8.6, scrollProgress);

    const targetX = baseX + pointer.x * 0.34 * motion + (animate ? Math.sin(t * 0.18) * 0.04 * motion : 0);
    const targetY = baseY - pointer.y * 0.18 * motion + (animate ? Math.cos(t * 0.16) * 0.03 * motion : 0);

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, baseZ, 0.03);
    state.camera.lookAt(pointer.x * 0.24, pointer.y * 0.06, -6.5 + scrollProgress * 0.6);
  });

  return null;
}

function Chamber() {
  return (
    <>
      <mesh position={[0, -0.6, -7.5]}>
        <boxGeometry args={[20, 14, 18]} />
        <meshStandardMaterial
          color={palette.wall}
          metalness={0.04}
          roughness={1}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0, -5.8, -7.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial
          color={palette.shadow}
          metalness={0.06}
          roughness={0.92}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, 0.2, -14]}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial color={palette.wall} transparent opacity={0.34} />
      </mesh>
    </>
  );
}

function Frames({
  animate,
  pointer,
}: {
  animate: boolean;
  pointer: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child: THREE.Object3D, index: number) => {
      const depthFactor = 1 - index * 0.14;
      child.position.x = THREE.MathUtils.lerp(child.position.x, pointer.x * depthFactor * 0.75, 0.03);
      child.position.y = THREE.MathUtils.lerp(
        child.position.y,
        pointer.y * depthFactor * 0.18 + (animate ? Math.sin(t * 0.22 + index) * 0.04 : 0),
        0.03,
      );
    });
  });

  const layers = [
    { z: -4.2, w: 9.8, h: 7.2, opacity: 0.08, color: palette.edge, rotate: -8 },
    { z: -5.5, w: 7.2, h: 5.5, opacity: 0.1, color: palette.panel, rotate: 5 },
    { z: -6.6, w: 5.4, h: 4.1, opacity: 0.12, color: palette.violet, rotate: -3 },
  ];

  return (
    <group ref={groupRef}>
      {layers.map((layer, index) => (
        <group
          key={`frame-${index}`}
          position={[0, 0, layer.z]}
          rotation={[0, 0, THREE.MathUtils.degToRad(layer.rotate)]}
        >
          <mesh>
            <planeGeometry args={[layer.w, layer.h]} />
            <meshBasicMaterial color={layer.color} transparent opacity={layer.opacity} />
          </mesh>
          <mesh position={[0, 0, -0.04]}>
            <planeGeometry args={[layer.w * 0.9, layer.h * 0.88]} />
            <meshBasicMaterial color={palette.wall} transparent opacity={0.18 + index * 0.04} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function LightBars({
  animate,
  pointer,
}: {
  animate: boolean;
  pointer: { x: number; y: number };
}) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const float = animate ? Math.sin(t * 0.24) * 0.05 : 0;

    if (leftRef.current) {
      leftRef.current.position.x = THREE.MathUtils.lerp(leftRef.current.position.x, -4.2 + pointer.x * 0.16, 0.04);
      leftRef.current.position.y = THREE.MathUtils.lerp(leftRef.current.position.y, 0.2 + pointer.y * 0.06 + float, 0.04);
    }

    if (rightRef.current) {
      rightRef.current.position.x = THREE.MathUtils.lerp(rightRef.current.position.x, 4.1 + pointer.x * 0.14, 0.04);
      rightRef.current.position.y = THREE.MathUtils.lerp(rightRef.current.position.y, -0.4 + pointer.y * 0.06 - float, 0.04);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = THREE.MathUtils.lerp(
        ringRef.current.rotation.z,
        THREE.MathUtils.degToRad(pointer.x * 8),
        0.04,
      );
    }
  });

  return (
    <>
      <mesh position={[-4.2, 0.2, -8.2]} ref={leftRef}>
        <planeGeometry args={[0.2, 9.2]} />
        <meshBasicMaterial color={palette.edge} transparent opacity={0.13} />
      </mesh>
      <mesh position={[4.1, -0.4, -8]} ref={rightRef}>
        <planeGeometry args={[0.16, 8]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.11} />
      </mesh>
      <mesh position={[0, -5.76, -6.5]} ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 2.1, 48]} />
        <meshBasicMaterial color={palette.violet} transparent opacity={0.09} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

function Haze() {
  return (
    <group>
      {[
        { position: [-4.2, 2.2, -12], size: [7.2, 6.4], color: palette.edge, opacity: 0.02 },
        { position: [4.4, -0.6, -11.5], size: [8.2, 6.6], color: palette.glow, opacity: 0.02 },
        { position: [0, -4.6, -10.4], size: [12.8, 3.6], color: palette.violet, opacity: 0.015 },
      ].map((plane, index) => (
        <mesh key={`haze-${index}`} position={plane.position as [number, number, number]}>
          <planeGeometry args={plane.size as [number, number]} />
          <meshBasicMaterial
            color={plane.color}
            transparent
            opacity={plane.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene(props: SceneBackgroundProps & { pointer: { x: number; y: number } }) {
  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.fog, 8, 21]} />
      <CameraRig {...props} />
      <ambientLight color={palette.violet} intensity={0.18} />
      <pointLight color={palette.edge} distance={12} intensity={1.2} position={[-1.2, 1.4, 0.8]} />
      <pointLight color={palette.glow} distance={10} intensity={0.7} position={[1.8, -1.2, -1.4]} />
      <Chamber />
      <Haze />
      <Frames animate={props.animate} pointer={props.pointer} />
      <LightBars animate={props.animate} pointer={props.pointer} />
    </>
  );
}

function SceneBackground(props: SceneBackgroundProps) {
  const pointer = usePointerTarget();

  return (
    <Canvas
      camera={{ fov: 27, position: [0, 0.2, 9.8] }}
      dpr={[1, 1.4]}
      gl={{ antialias: true }}
      performance={{ min: 0.6 }}
    >
      <Scene {...props} pointer={pointer} />
    </Canvas>
  );
}

export default memo(SceneBackground);
