import { Euler, RepeatWrapping, Texture, Vector3 } from "three";

const BASE_PATH = "/images";

export const GroundPresets = {
  SCIFI_METAL: "SCIFI_METAL",
  CARGO_BOX: "CARGO_BOX",
} as const;

export const texturePathsByPreset: TexturePathsByPreset = {
  [GroundPresets.SCIFI_METAL]: {
    map: `${BASE_PATH}/scifi_metal/scifi_metal_albedo.png`,
    normalMap: `${BASE_PATH}/scifi_metal/scifi_metal_normal.png`,
    roughnessMap: `${BASE_PATH}/scifi_metal/scifi_metal_rough.png`,
  },
  [GroundPresets.CARGO_BOX]: {
    map: `${BASE_PATH}/cargo_box/cargo_box_albedo.png`,
    normalMap: `${BASE_PATH}/cargo_box/cargo_box_normal.png`,
    roughnessMap: `${BASE_PATH}/cargo_box/cargo_box_rough.png`,
  },
};

const getTileSize = (
  preset: GroundPreset,
  surfaceSize: number
): [number, number] => {
  if (preset === GroundPresets.SCIFI_METAL) {
    return [surfaceSize, surfaceSize];
  }
  return [surfaceSize, surfaceSize];
};

const tileTexture = (
  preset: GroundPreset,
  surfaceSize: number
): ((value: Texture, index: number, array: Texture[]) => Texture) => {
  const [tx, ty] = getTileSize(preset, surfaceSize);

  return (texture: Texture) => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(tx, ty);
    return texture;
  };
};

const getMaps = (
  preset: GroundPreset,
  textures: Texture[]
): TexturesResult | undefined => {
  if (preset === GroundPresets.SCIFI_METAL) {
    const [map, normalMap, roughnessMap] = textures;
    return { map, normalMap, roughnessMap };
  }
  if (preset === GroundPresets.CARGO_BOX) {
    const [map, normalMap, roughnessMap] = textures;
    return { map, normalMap, roughnessMap };
  }
};

export const getTextureMapsResult = (
  useTexture: (input: string[]) => Texture[],
  preset: GroundPreset,
  surfaceSize: number
) =>
  getMaps(
    preset,
    useTexture(Object.values(texturePathsByPreset[preset])).map(
      tileTexture(preset, surfaceSize)
    )
  ) ?? {};

export type GroundPreset = keyof typeof GroundPresets;

export interface GroundProps {
  position: [number, number, number] | Vector3;
  rotation?: Euler;
  preset: GroundPreset;
  surfaceSize: number;
}

type MaterialMaps = {
  albedo?: string;
  rough?: string;
  map?: string;
  lightMap?: string;
  aoMap?: string;
  emissiveMap?: string;
  bumpMap?: string;
  normalMap?: string;
  normalMapType?: string;
  displacementMap?: string;
  roughnessMap?: string;
  metalnessMap?: string;
  alphaMap?: string;
  envMap?: string;
};

type TexturesResult = {
  [key in keyof MaterialMaps]: Texture;
};

type TexturePathsByPreset = {
  [key in GroundPreset]: MaterialMaps;
};
