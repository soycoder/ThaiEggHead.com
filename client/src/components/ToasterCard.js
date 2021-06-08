import React, { useState } from "react";
import { Button, Position, Toaster, Intent } from "@blueprintjs/core";

const ToasterCard = () => {
  const [toaster, setToaster] = useState([]);

  function addToast() {
    toaster.show({ message: "Sorry! We are under constructed", intent: Intent.DANGER });
  }

  return (
    <div>
      <Button onClick={addToast} text="Procure toast" />
      <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)} />
    </div>
  );
};

export default ToasterCard;
