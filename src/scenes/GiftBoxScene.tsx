import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { siteConfig } from "../config/content";

const GOLD = siteConfig.colors.gold;
const CORAL = siteConfig.colors.coral;
const LAVENDER = siteConfig.colors.lavender;

function RibbonCross({ size = 1 }: { size?: number }) {
  const w = size * 2.05;
  const t = size * 0.18;
  return (
    <group>
      <mesh position={[0, 0, size * 1.001]}>
        <boxGeometry args={[t, w, 0.01]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, -size * 1.001]}>
        <boxGeometry args={[t, w, 0.01]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[size * 1.001, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[t, w, 0.01]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[-size * 1.001, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[t, w, 0.01]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Bow() {
  return (
    <group position={[0, 0.15, 0]}>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.32, 0, 0]}
          rotation={[Math.PI / 2, 0, side * 0.55]}
        >
          <torusGeometry args={[0.32, 0.11, 16, 32, Math.PI * 1.4]} />
          <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={CORAL} metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
}

function GiftMesh({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  const lidPivot = useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetAngle = opened ? -Math.PI * 0.78 : 0;

  useFrame((_, delta) => {
    if (lidPivot.current) {
      lidPivot.current.rotation.x = THREE.MathUtils.damp(
        lidPivot.current.rotation.x,
        targetAngle,
        4,
        delta
      );
    }
    if (boxRef.current && !opened) {
      const s = hovered ? 1.04 : 1;
      boxRef.current.scale.x = THREE.MathUtils.damp(boxRef.current.scale.x, s, 6, delta);
      boxRef.current.scale.y = THREE.MathUtils.damp(boxRef.current.scale.y, s, 6, delta);
      boxRef.current.scale.z = THREE.MathUtils.damp(boxRef.current.scale.z, s, 6, delta);
    }
  });

  return (
    <group
      ref={boxRef}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#3a1f52" metalness={0.35} roughness={0.4} />
      </mesh>
      <RibbonCross size={1} />

      {/* lid, hinged at back top edge */}
      <group ref={lidPivot} position={[0, 0.02, -1]}>
        <mesh position={[0, 0.13, 1]}>
          <boxGeometry args={[2.12, 0.26, 2.12]} />
          <meshStandardMaterial color="#4a2766" metalness={0.35} roughness={0.35} />
        </mesh>
        <group position={[0, 0.28, 1]}>
          <Bow />
        </group>
      </group>

      {/* interior glow once opened */}
      {opened && (
        <pointLight position={[0, 0.2, 0]} intensity={8} distance={3} color={GOLD} />
      )}
    </group>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  const count = 60;
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: [0, 0, 0] as [number, number, number],
        vel: [
          (Math.random() - 0.5) * 4,
          Math.random() * 4 + 2,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        rot: Math.random() * Math.PI,
        color: [GOLD, CORAL, LAVENDER][Math.floor(Math.random() * 3)],
        life: 0,
      })),
    []
  );
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    elapsed.current += delta;
    group.current.children.forEach((child, i) => {
      const p = particles[i];
      p.vel[1] -= delta * 4;
      child.position.x += p.vel[0] * delta;
      child.position.y += p.vel[1] * delta;
      child.position.z += p.vel[2] * delta;
      child.rotation.x += delta * 3;
      child.rotation.y += delta * 2;
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.opacity = Math.max(0, 1 - elapsed.current / 2.5);
    });
  });

  if (!active) return null;

  return (
    <group ref={group} position={[0, 0.3, 0]}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <planeGeometry args={[0.09, 0.09]} />
          <meshStandardMaterial
            color={p.color}
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GiftBoxScene({
  onOpened,
  revealText,
}: {
  onOpened: () => void;
  revealText: string;
}) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onOpened();
  };

  return (
    <Canvas
      camera={{ position: [2.6, 1.6, 3.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} color={LAVENDER} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} color={GOLD} />
      <pointLight position={[-3, -1, -2]} intensity={0.6} color={CORAL} />

      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5} enabled={!opened}>
        <GiftMesh opened={opened} onOpen={handleOpen} />
      </Float>

      <ConfettiBurst active={opened} />
      <Sparkles count={opened ? 120 : 40} scale={4} size={2.5} speed={0.3} color={GOLD} opacity={0.6} />

      {opened && (
        <Html center position={[0, -1.5, 0]} distanceFactor={6}>
          <div
            className="font-display text-2xl md:text-3xl whitespace-nowrap px-2"
            style={{ color: GOLD, textShadow: "0 0 20px rgba(240,185,77,0.6)" }}
          >
            {revealText}
          </div>
        </Html>
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={!opened}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
