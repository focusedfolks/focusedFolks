"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { createRoundStarTexture } from "@/lib/round-star-texture";

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function usePageScrollProgress() {
  const progress = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const next = y / max;
      velocity.current = Math.abs(next - progress.current);
      progress.current = next;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { progress, velocity };
}

function RoundStarsField({
  radius = 80,
  depth = 60,
  count = 5000,
  factor = 4,
  saturation = 0,
  speed = 1,
  pointSize = 0.05,
}: {
  radius?: number;
  depth?: number;
  count?: number;
  factor?: number;
  saturation?: number;
  speed?: number;
  pointSize?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const starTexture = useMemo(() => createRoundStarTexture(64), []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    let r = radius + depth;
    const increment = depth / count;

    for (let i = 0; i < count; i++) {
      r -= increment * Math.random();
      const theta = Math.acos(1 - Math.random() * 2);
      const phi = Math.random() * 2 * Math.PI;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
      color.setHSL(i / count, saturation, 0.9);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count, depth, radius, saturation]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * speed * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        map={starTexture}
        alphaMap={starTexture}
        size={pointSize * (factor / 4)}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.02}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function RoundSparklePoints({
  scrollProgress,
  scrollVelocity,
}: {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const sparkleBoost = useRef(0);
  const starTexture = useMemo(() => createRoundStarTexture(96), []);

  const geometry = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const rng = seededRandom(77);

    for (let i = 0; i < count; i++) {
      const radius = 6 + rng() * 22;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 8;

      const tint = rng();
      colors[i * 3] = 0.55 + tint * 0.45;
      colors[i * 3 + 1] = 0.72 + tint * 0.28;
      colors[i * 3 + 2] = 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress.current;

    if (scrollVelocity.current > 0.001) {
      sparkleBoost.current = Math.min(1, sparkleBoost.current + scrollVelocity.current * 12);
    }
    sparkleBoost.current *= 0.94;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.018 + scroll * 0.4;
      pointsRef.current.rotation.x = Math.sin(t * 0.12) * 0.04 + scroll * 0.08;
      pointsRef.current.position.y = scroll * 1.4 - 0.7;
    }

    if (materialRef.current) {
      materialRef.current.opacity =
        0.5 + sparkleBoost.current * 0.45 + Math.sin(t * 1.8) * 0.08;
      materialRef.current.size =
        0.12 + sparkleBoost.current * 0.08 + Math.sin(t * 2.2) * 0.015;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        map={starTexture}
        alphaMap={starTexture}
        size={0.12}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.02}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function GalaxySceneInner({
  scrollProgress,
  scrollVelocity,
}: {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
}) {
  const fieldRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const scroll = scrollProgress.current;
    const t = state.clock.elapsedTime;

    if (fieldRef.current) {
      fieldRef.current.rotation.z = scroll * 0.12;
      fieldRef.current.position.x = Math.sin(t * 0.08) * 0.15;
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.1) * 0.25, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      Math.cos(t * 0.08) * 0.2 + scroll * 0.35,
      0.02
    );
    state.camera.lookAt(0, scroll * 0.5 - 0.25, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <group ref={fieldRef}>
        <RoundStarsField
          radius={80}
          depth={60}
          count={6500}
          factor={4}
          saturation={0.35}
          speed={0.6}
          pointSize={0.06}
        />
        <RoundStarsField
          radius={45}
          depth={35}
          count={2200}
          factor={2.5}
          saturation={0.5}
          speed={0.9}
          pointSize={0.04}
        />
        <Sparkles
          count={140}
          scale={[14, 10, 10]}
          size={2.2}
          speed={0.35}
          opacity={0.45}
          color="#bae6fd"
        />
        <Sparkles
          count={90}
          scale={10}
          size={3.5}
          speed={0.5}
          opacity={0.35}
          color="#38bdf8"
        />
        <RoundSparklePoints scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />
      </group>
    </>
  );
}

function SceneRoot() {
  const { progress, velocity } = usePageScrollProgress();
  return <GalaxySceneInner scrollProgress={progress} scrollVelocity={velocity} />;
}

export function GalaxyScene() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      <div className="galaxy-bg absolute inset-0 z-0 min-h-full" />
      <Canvas
        className="relative z-[1] !h-full !min-h-[100dvh] !w-full"
        camera={{ position: [0, 0, 9], fov: 60, near: 0.1, far: 200 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#020617", 30, 95]} />
        <SceneRoot />
      </Canvas>
      <div className="galaxy-vignette galaxy-vignette-balanced absolute inset-0 z-[2] min-h-full" />
    </div>
  );
}
