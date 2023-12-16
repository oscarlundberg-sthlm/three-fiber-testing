import { BufferGeometry, Object3D, Object3DEventMap } from "three";

export interface Nodes {
    [name: string]: Object3D<Object3DEventMap> & {
        geometry: BufferGeometry;
    };
}