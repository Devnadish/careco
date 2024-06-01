import React from 'react'

const ZodError = ({ errors }) => {
    return (
      <div className="flex items-start flex-col gap-1 mr-4">
        {errors.map((el) => {
          return (
            <div className="flex items-center gap-2" key={el}>
              <XCircle size={15} strokeWidth={0.75} /> {el}
            </div>
          );
        })}
      </div>
    );
  };
export default ZodError

