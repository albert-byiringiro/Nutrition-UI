import React, { useState, useEffect } from 'react';
import { BLOODTYPE } from './Question';
import { TYPE } from './Question';
import { useNavigate, Link } from 'react-router-dom';

function MealAdd() {
    const navigate = useNavigate();
    const [type, setType] = useState('');
    
  return (
    <div>
      <div className="flex items-center justify-center mt-4">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form>
            <div class="mb-5">
              <label className="block font-medium mb-2">Type</label>
              <select
                name="bloodType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select...</option>
                {TYPE.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div class="mb-5">
                <label
                for="description"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Name
                </label>
                <input
                type="text"
                name="height"
                id="height"
                placeholder="Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div class="mb-5">
                <label
                for="description"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Description
                </label>
                <textarea
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlTextarea1"
                rows="4"
                placeholder="Your message"></textarea>
            </div>
            <div class="mb-5">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MealAdd;

