import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const palette = {
  background: "#05030a",
  fog: "#12091a",
  wall: "#15101d",
  panel: "#1b1325",
  edge: "#cdb7ff",
  glow: "#f2b8ff",
  violet: "#8b73df",
  shadow: "#0a0610",
  deep: "#1a0a2e",
};

type SceneBackgroundProps = {
  animate: boolean;
  reducedMotion: boolean;
};

function usePointerTarget() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return pointer;
}

function CameraRig({
  animate,
  reducedMotion,
  pointer,
}: {
  animate: boolean;
  reducedMotion: boolean;
  pointer: { x: number; y: number };
}) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const motion = reducedMotion ? 0.1 : 1;
    const targetX =
      pointer.x * 0.3 * motion +
      (animate ? Math.sin(t * 0.18) * 0.05 * motion : 0);
    const targetY =
      -pointer.y * 0.15 * motion +
      (animate ? Math.cos(t * 0.16) * 0.04 * motion : 0);

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.03,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.03,
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      8.2,
      0.02,
    );
    state.camera.lookAt(
      pointer.x * 0.5,
      pointer.y * 0.1,
      -7 + Math.sin(t * 0.12) * 0.3,
    );
  });

  return null;
}

// Instanced particles for performance
function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 300;
  const dummy = useRef(new THREE.Object3D());

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.current.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        -Math.random() * 10 - 3,
      );
      dummy.current.scale.setScalar(Math.random() * 0.03 + 0.01);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.current.matrix);
      dummy.current.matrix.decompose(
        dummy.current.position,
        dummy.current.quaternion,
        dummy.current.scale,
      );
      dummy.current.position.y += Math.sin(t * 0.6 + i * 0.07) * 0.002;
      dummy.current.position.x += Math.cos(t * 0.4 + i * 0.11) * 0.0015;
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const instancedArgs = useMemo(
    () => [
      new THREE.SphereGeometry(0.02, 4, 4),
      new THREE.MeshBasicMaterial({
        color: palette.edge,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      }),
      count,
    ] as const,
    [count],
  );

  return <instancedMesh ref={meshRef} args={instancedArgs as never} />;
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
        <meshBasicMaterial
          color={palette.wall}
          transparent
          opacity={0.34}
          depthWrite={false}
        />
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
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, index) => {
      const d = 1 - index * 0.14;
      child.position.x = THREE.MathUtils.lerp(
        child.position.x,
        pointer.x * d * 0.75,
        0.03,
      );
      child.position.y = THREE.MathUtils.lerp(
        child.position.y,
        pointer.y * d * 0.18 +
          (animate ? Math.sin(t * 0.22 + index) * 0.04 : 0),
        0.03,
      );
    });
  });

  const layers = [
    {
      z: -4.2,
      w: 9.8,
      h: 7.2,
      opacity: 0.1,
      color: palette.edge,
      rotate: -8,
    },
    {
      z: -5.5,
      w: 7.2,
      h: 5.5,
      opacity: 0.12,
      color: palette.panel,
      rotate: 5,
    },
    {
      z: -6.6,
      w: 5.4,
      h: 4.1,
      opacity: 0.14,
      color: palette.violet,
      rotate: -3,
    },
  ];

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <group
          key={`frame-${i}`}
          position={[0, 0, layer.z]}
          rotation={[0, 0, THREE.MathUtils.degToRad(layer.rotate)]}
        >
          {/* Glow border */}
          <mesh>
            <planeGeometry args={[layer.w, layer.h]} />
            <meshBasicMaterial
              color={layer.color}
              transparent
              opacity={layer.opacity}
            />
          </mesh>
          {/* Inner panel */}
          <mesh position={[0, 0, -0.04]}>
            <planeGeometry args={[layer.w * 0.9, layer.h * 0.88]} />
            <meshBasicMaterial
              color={palette.wall}
              transparent
              opacity={0.2 + i * 0.05}
            />
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
      leftRef.current.position.x = THREE.MathUtils.lerp(
        leftRef.current.position.x,
        -4.2 + pointer.x * 0.16,
        0.04,
      );
      leftRef.current.position.y = THREE.MathUtils.lerp(
        leftRef.current.position.y,
        0.2 + pointer.y * 0.06 + float,
        0.04,
      );
      (leftRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.13 + Math.sin(t * 1.2) * 0.03;
    }

    if (rightRef.current) {
      rightRef.current.position.x = THREE.MathUtils.lerp(
        rightRef.current.position.x,
        4.1 + pointer.x * 0.14,
        0.04,
      );
      rightRef.current.position.y = THREE.MathUtils.lerp(
        rightRef.current.position.y,
        -0.4 + pointer.y * 0.06 - float,
        0.04,
      );
      (rightRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.11 + Math.cos(t * 1.1) * 0.03;
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
        <meshBasicMaterial
          color={palette.edge}
          transparent
          opacity={0.13}
        />
      </mesh>
      <mesh position={[4.1, -0.4, -8]} ref={rightRef}>
        <planeGeometry args={[0.16, 8]} />
        <meshBasicMaterial
          color={palette.glow}
          transparent
          opacity={0.11}
        />
      </mesh>
      {/* Rotating ring */}
      <mesh
        position={[0, -5.76, -6.5]}
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.1, 2.1, 48]} />
        <meshBasicMaterial
          color={palette.violet}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function GeometricAccents({
  animate,
}: {
  animate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !animate) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y += 0.001;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += (i % 2 ? 0.002 : -0.002);
    });
  });

  return (
    <group ref={groupRef} position={[0, -1, -9]}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={`geo-${i}`}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 2.4,
            Math.sin((i / 3) * Math.PI * 2) * 1.8,
            -i * 0.6,
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <octahedronGeometry args={[0.18 + i * 0.04, 0]} />
          <meshBasicMaterial
            color={i === 0 ? palette.edge : i === 1 ? palette.glow : palette.violet}
            transparent
            opacity={0.15 + i * 0.05}
            wireframe={i === 2}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Haze() {
  return (
    <group>
      {[
        {
          position: [-4.2, 2.2, -12],
          size: [7.2, 6.4],
          color: palette.edge,
          opacity: 0.02,
        },
        {
          position: [4.4, -0.6, -11.5],
          size: [8.2, 6.6],
          color: palette.glow,
          opacity: 0.02,
        },
        {
          position: [0, -4.6, -10.4],
          size: [12.8, 3.6],
          color: palette.violet,
          opacity: 0.015,
        },
      ].map((plane, i) => (
        <mesh
          key={`haze-${i}`}
          position={plane.position as [number, number, number]}
        >
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

function Scene({
  animate,
  reducedMotion,
  pointer,
}: {
  animate: boolean;
  reducedMotion: boolean;
  pointer: { x: number; y: number };
}) {
  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.fog, 8, 21]} />
      <CameraRig
        animate={animate}
        pointer={pointer}
        reducedMotion={reducedMotion}
      />
      <ambientLight color={palette.violet} intensity={0.18} />
      <pointLight
        color={palette.edge}
        distance={12}
        intensity={1.2}
        position={[-1.2, 1.4, 0.8]}
      />
      <pointLight
        color={palette.glow}
        distance={10}
        intensity={0.7}
        position={[1.8, -1.2, -1.4]}
      />

      <Chamber />
      <Haze />
      <Frames animate={animate} pointer={pointer} />
      <LightBars animate={animate} pointer={pointer} />
      <ParticleField />
      <GeometricAccents animate={animate} />

      <EffectComposer enableNormalPass={false}>
        <Bloom
          blendFunction={BlendFunction.SCREEN}
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.2}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.001, 0.0005)}
        />
      </EffectComposer>
    </>
  );
}

function SceneBackground(props: SceneBackgroundProps) {
  const pointer = usePointerTarget();

  return (
    <Canvas
      camera={{ fov: 27, position: [0, 0.2, 8.2], near: 0.1, far: 30 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <Scene {...props} pointer={pointer} />
    </Canvas>
  );
}

export default memo(SceneBackground);
