import React, { useState } from "react";

function StepConfirm({ onNext, data }) {
  const [extraInfo, setExtraInfo] = useState("");

  const handleGenerate = () => {
    onNext({ extraInfo });
  };

  return (
    <>
      <h2>Well Done!</h2>
      <p>You are almost done, {data?.sex ? data.sex.toUpperCase() : ""}!</p>
      <p>Would you like to provide any other information?</p>
      <textarea
        placeholder="Specify here"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />
      <p>or, you can skip and generate</p>
      <button onClick={handleGenerate}>GENERATE</button>
    </>
  );
}

export default StepConfirm;
