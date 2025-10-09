import { useEffect } from "react";

function useRenderLogger(name) {
  useEffect(() => {
    console.log(`${name} rendered`);
  });
}

export default useRenderLogger;
