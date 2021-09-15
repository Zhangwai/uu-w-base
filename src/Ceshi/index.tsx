import React from 'react';

export const Ceshi: React.FC<Wprops> = props => {
  const { className, style, content } = props;
  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
};
export default Ceshi;
