/**
 * Options to configure a diagram's layout and appearance.
 */
interface Options {
  /**
   * The fraction of the axisBox linear size that is occupied by padding around the data.
   */
  axisBoxPadding?: number;

  /**
   * The fraction of the viewBox linear size that is occupied by padding around the axis.
   */
  viewBoxPadding?: number;
}

interface SpotDiagramOptions extends Options {
  /**
   * The radius of the spot diagram as a percentage of the viewBox size.
   */
  spotRadius?: string;
  titleFontFractionalEMSize?: number;
  titleFractionalOffset?: number;
}

/**
 * A system specification defines some properties of a ray trace through an optical system.
 *
 * The `value` property represents the value of the system specification, while the
 * `unit` property indicates the unit of measurement for that value.
 */
interface SystemSpec {
  value: number;
  units: string;
}

/**
 * A field specification defines properties of sources used in a ray trace.
 *
 */
interface FieldSpec extends SystemSpec {
  /**
   * The type of field spec.
   */
  type: 'angle' | 'point source';
}

/**
 * Interface representing the ray surface intersections of a ray bundle.
 *
 * This interface defines the x, y, and z coordinates of the points of intersection
 * between the rays in a ray bundle and the surfaces of an optical system. If there are
 * 'm' rays and 'n' surfaces, then there are m * n total intersections.
 *
 * For example, a ray bundle consisting of one ray and four surfaces would have four
 * intersection points.
 */
interface RayIntersections {
  x: ReadonlyArray<number>;
  y: ReadonlyArray<number>;
}

/**
 * A ray trace result represents the outcome of a ray tracing operation for a specific
 * wavelength and field in an optical system. Ray intersections may also be defined at
 * specific surfaces.
 */
interface RayTraceResult {
  readonly wavelengthId: number;
  readonly fieldId: number;
  readonly rayBundle: RayIntersections;
  readonly chiefRay: RayIntersections;
  readonly surfaceId?: number;
}

/**
 * An array of ray trace results, each representing the outcome of a ray tracing
 * operation for a specific wavelength and field in an optical system.
 */
type RayTraceResults = Array<RayTraceResult>;

/**
 * Ticks are used to define the positions of tick marks on an axis.
 */
interface Ticks {
  readonly min: number;
  readonly max: number;

  /**
   * The distance between two adjacent ticks.
   */
  readonly step: number;
  readonly positions: ReadonlyArray<number>;
}

/**
 * A bounding box is defined by its minimum x and y coordinates, as well as its width
 * and height.
 */
type BoundingBox = [number, number, number, number];

export {
  BoundingBox,
  FieldSpec,
  Options,
  RayIntersections,
  RayTraceResult,
  RayTraceResults,
  SpotDiagramOptions,
  SystemSpec,
  Ticks,
};
