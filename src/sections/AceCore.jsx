import { useRef, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const AceCoreMesh = () => {
  const groupRef = useRef(null);
  const particlesRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.005;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.002;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 4;
    positions[i + 1] = (Math.random() - 0.5) * 4;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }

  return (
    <group ref={groupRef}>
      {/* Main Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.6}
          wireframe={false}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rotating Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2, 0.1, 32, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Particles */}
      <group ref={particlesRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="#00d9ff" size={0.03} sizeAttenuation />
        </points>
      </group>
    </group>
  );
};

const AceCore = () => {
  return (
    <section className="relative py-32 bg-ace-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ace-violet rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-96 rounded-2xl overflow-hidden border border-ace-cyan/30 shadow-[0_0_40px_rgba(0,217,255,0.2)]"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75} />
              <ambientLight intensity={0.5} color="#a855f7" />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d9ff" />
              <AceCoreMesh />
              <fog attach="fog" args={['#0a0a0a', 1, 10]} />
            </Canvas>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-white">THE </span>
              <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">ACE CORE</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-2xl font-bold text-ace-cyan">ONE COMMUNITY.</p>
              <p className="text-2xl font-bold text-ace-cyan">ONE COMPETITION.</p>
              <p className="text-2xl font-bold text-ace-cyan">ONE CORE.</p>
            </div>

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              At the heart of ACE lies our commitment to uniting gamers worldwide. Our core represents the pulse of competitive gaming—where passion meets competition, and communities thrive together.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-ace-cyan text-ace-cyan font-bold rounded-lg backdrop-blur-md hover:bg-ace-cyan/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all duration-300"
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PerspectiveCamera = ({ makeDefault, position, fov }) => {
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 1000);
  camera.position.set(...position);
  return null;
};

export default AceCore;
