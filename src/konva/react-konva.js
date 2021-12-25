// minimal version has NO support for core shapes and filters
// if you want import a shape into Konva namespace you can just do this:
import "konva/lib/shapes/Rect";
import "konva/lib/shapes/Circle";
import "konva/lib/shapes/Text";
import "konva/lib/shapes/Line";
import "konva/lib/shapes/Arc";

// load minimal version of 'react-konva`
export {
  Stage,
  Layer,
  Group,
  Rect,
  Circle,
  Text,
  Line,
  Image,
  Arc
} from "react-konva/lib/ReactKonvaCore";
