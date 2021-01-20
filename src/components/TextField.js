import React, { useState } from 'react';


const ControlledInputs = () => {
  const [person, setPerson] = useState({ textAbove: '', textBelow: ''});
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  return (
    <>
      <article className='form'>
        <form>
          <div className='form-control'>
            {/* <label htmlFor='firstName'>Name : </label> */}
            <input
              type='text'
              id='textAbove'
              name='textAbove'
              value={person.textAbove}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            {/* <label htmlFor='email'>Email : </label> */}
            <input
              type='text'
              id='textBelow'
              name='textBelow'
              value={person.textBelow}
              onChange={handleChange}
            />
          </div>
         
        </form>
      </article>
      <article>
            <div key={person.id} className='item'>
              <p>{person.textAbove}</p>
              <p>{person.textBelow}</p>
            </div>

      </article>
    </>
  );
};

export default ControlledInputs;
