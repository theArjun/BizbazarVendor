import React, { lazy, Suspense } from "react";

const SuspenseWrapper = (props) => {
  return <Suspense fallback={<div>..loading</div>}>{props.children}</Suspense>;
};

export default SuspenseWrapper;
