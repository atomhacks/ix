import React, { useEffect, useMemo, useState } from "react";
import Shape from "./Shape";

const selectRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const ShapeRain: React.FC<{ count: number}> = ({ count }) => {
  const [shapesArray, setShapesArray] = useState<JSX.Element[] | never[]>([]);

  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
          <Shape
            type={selectRandom(["circle", "triangle", "rect"])}
            id={i}
            key={i}
            color={selectRandom(["green", "orange"])}
            reverseAnimation={Math.random() > 0.5}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.25 + 0.75,
            }}
          />
      );
    }
    return arr;
  }, [count]);

  useEffect(() => {
    setShapesArray(shapes);
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div className="absolute w-full h-full animate-slow-slide">
        <div className="relative h-full">{shapesArray}</div>
        <div className="relative h-full">{shapesArray}</div>
      </div>
    </div>
  );
};

export default ShapeRain;
