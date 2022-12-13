import React, { lazy, Suspense } from "react";

const SuspenseWrapper = (props) => {
  const LazyComponent = lazy(() => import(`./../../${props.path}`));

  return (
    <Suspense fallback={<div>..loading</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseWrapper;
