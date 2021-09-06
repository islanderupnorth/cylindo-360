import React, { useState } from "react";

const API_URL = "https://content.cylindo.com/api/v2";
const CUSTOMER_ID = "4404";
const CHAIR_ID = "ARCHIBALDCHAIR";

const sprites = [];

for (let i = 1; i <= 32; i++)
  sprites.push(`${API_URL}/${CUSTOMER_ID}/products/${CHAIR_ID}/frames/${i}`);

function App() {
  const [pressed, setPressed] = useState(false);
  const [frame, setFrame] = useState(1);
  const [currX, setCurrX] = useState(0);

  const onMouseMove = ({ clientX: x }) => {
    const x_threshold = 5;

    if (!currX) setCurrX(x);

    if (x > currX + x_threshold || x < currX - x_threshold) {
      setCurrX(x);

      const direction = x > currX ? 1 : -1;

      const min = 1;
      const max = 32;

      let value = frame + direction;

      if (value < min) value = max;
      if (value > max) value = min;

      setFrame(value);
    }
  };

  return (
    <div
      className="page"
      onMouseMove={pressed ? onMouseMove : undefined}
      onMouseUp={() => setPressed(false)}
    >
      <ul
        onMouseDown={(e) => {
          e.preventDefault();
          setPressed(true);
        }}
      >
        {sprites.map((src, i) => (
          <li key={src}>
            <img
              src={src}
              alt={src}
              draggable="false"
              style={{ opacity: i + 1 === frame && 1 }}
              className={pressed ? "grabbing" : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
