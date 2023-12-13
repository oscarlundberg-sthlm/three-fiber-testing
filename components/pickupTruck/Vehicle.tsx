import { Controls } from '@/enums/controls';
import { useRaycastVehicle } from '@react-three/cannon';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import TruckBody from './TruckBody';
import Wheel from './Wheel';

const RIGHT_BOUNDARY = 14;
const RIGHT_SPAWN_POINT = 12;
const LEFT_BOUNDARY = -14;
const LEFT_SPAWN_POINT = -12;
const FORWARD_BOUNDARY = 10;
const BACK_BOUNDARY = -20;

export default function Vehicle({ radius = 0.55, width = 1.33, height = -0.5, front = 1.45, back = -1.35, steer = 0.6, force = 3000, maxBrake = 1e5, position, ...props }) {
    const chassis = useRef();
    const wheel1 = useRef();
    const wheel2 = useRef();
    const wheel3 = useRef();
    const wheel4 = useRef();
    const camera = useRef();
  
    const [sub, get] = useKeyboardControls<Controls>();
  
    const wheelInfo = {
      radius,
      directionLocal: [0, -1, 0],
      suspensionStiffness: 30,
      suspensionRestLength: 0.3,
      maxSuspensionForce: 1e4,
      maxSuspensionTravel: 0.3,
      dampingRelaxation: 10,
      dampingCompression: 4.4,
      axleLocal: [-1, 0, 0],
      chassisConnectionPointLocal: [1, 0, 1],
      useCustomSlidingRotationalSpeed: true,
      customSlidingRotationalSpeed: -30,
      frictionSlip: 2
    };
  
    const wheelInfo1 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-width / 1.5, height, front] };
    const wheelInfo2 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [width / 1.5, height, front] };
    const wheelInfo3 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-width / 1.5, height, back] };
    const wheelInfo4 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [width / 1.5, height, back] };
  
    const [vehicle, api] = useRaycastVehicle(() => ({
      chassisBody: chassis,
      wheels: [wheel1, wheel2, wheel3, wheel4],
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      indexForwardAxis: 2,
      indexRightAxis: 0,
      indexUpAxis: 1
    }));
  
    // raycastVehicles, etc. (anything created in cannon) doesnt necessarily track position.
    const vehiclePos = useRef([0, 0, 0]);
  
    useEffect(() => {
      chassis?.current?.api.position.subscribe((v) => (vehiclePos.current = v));
    }, [api]);
  
    const resetCar = () => {
      chassis.current.api.position.set(0, 0.5, 0);
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.rotation.set(0, 0, 0);
    };

    useFrame(() => {
        if (vehiclePos.current[0] > RIGHT_BOUNDARY) {
          chassis.current.api.position.set(LEFT_SPAWN_POINT, vehiclePos.current[1], 0);
          chassis.current.api.velocity.set(0, 0, 0);
          chassis.current.api.angularVelocity.set(0, 0.5, 0);
          return;
        }
    
        if (vehiclePos.current[0] < LEFT_BOUNDARY) {
          chassis.current.api.position.set(RIGHT_SPAWN_POINT, vehiclePos.current[1], 0);
          chassis.current.api.velocity.set(0, 0, 0);
          chassis.current.api.angularVelocity.set(0, 0.5, 0);
          return;
        }
        if (vehiclePos.current[2] > FORWARD_BOUNDARY) {
          chassis.current.api.position.set(0, 0.5, -18);
          chassis.current.api.velocity.set(0, 0, 0);
          chassis.current.api.angularVelocity.set(0, vehiclePos.current[1], 0);
          return;
        }
        if (vehiclePos.current[2] < BACK_BOUNDARY) {
          chassis.current.api.position.set(0, 0.5, 8);
          chassis.current.api.velocity.set(0, 0, 0);
          chassis.current.api.angularVelocity.set(0, vehiclePos.current[1], 0);
          return;
        }
      });

      useFrame(() => {
        // update camera position relative to the vehicle
        // ...

        const { forward, back, left, right, brake, respawn } = get();
    
        const forceMultiplier = forward && !back ? -1 : 1;
        forward || back ? api.applyEngineForce(force * forceMultiplier, 0) : api.applyEngineForce(0, 0);
    
        // S is referring to the front wheels
        for (let s = 0; s < 2; s++) {
          const steerMultiplier = left && !right ? 1 : -1;
    
          left || right ? api.setSteeringValue(steer * steerMultiplier, s) : api.setSteeringValue(0, s);
        }
    
        // B is referring to the back wheels
        for (let b = 2; b < 4; b++) {
          const brakeMultipler = brake ? maxBrake : 0;
          api.setBrake(brakeMultipler, b);
        }
    
        if (respawn) {
          resetCar();
          return;
        }
      });
    
    return (
        
            <group ref={vehicle} position={[0, 0, 0]} name="vehicle">
                <TruckBody ref={chassis} position={position} angularVelocity={props.angularVelocity} />
                <Wheel ref={wheel1} radius={radius} leftSide />
                <Wheel ref={wheel2} radius={radius} />
                <Wheel ref={wheel3} radius={radius} leftSide />
                <Wheel ref={wheel4} radius={radius} />
            </group>
        
    )
}