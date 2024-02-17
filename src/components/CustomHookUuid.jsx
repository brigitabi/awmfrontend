import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useUUID = () => {
    const [uuid, setUUID] = useState(localStorage.getItem("uuid") || "");

    useEffect(() => {
        const storedUUID = localStorage.getItem("uuid");
        if (storedUUID) {
          setUUID(storedUUID);
        } else {
          const newUUID = uuidv4();
          setUUID(newUUID);
          localStorage.setItem("uuid", newUUID);
        }
      }, []);
    
      return uuid;
    };
    

const CustomHookUuid = () => {
  const uuid = useUUID();

  return (
    <div>
      <p>User UUID: {uuid} </p>
    </div>
  );
};

export default CustomHookUuid;
