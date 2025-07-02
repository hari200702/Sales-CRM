import React, { forwardRef, useEffect, useRef } from 'react';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input type="checkbox" ref={resolvedRef} className="custom-checkbox" {...rest} />
  );
});

export default IndeterminateCheckbox;
