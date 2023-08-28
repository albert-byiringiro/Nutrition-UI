import React, { useState, useEffect } from 'react';
import { BLOODTYPE } from './Question';
import { USER,MEAL,PRESCRIPTION } from './Question';
import { useNavigate, Link } from 'react-router-dom';

function MealPlanAdd() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [meal, setMeal] = useState('');
    const [prescription, setPrescription] = useState('');
    
  return (
    <div>
      <div className="flex items-center justify-center mt-4">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form>
          <div class="mb-5">
                <label
                for="description"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                User Name
                </label>
                <select
                name="bloodType"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select...</option>
                {USER.map(([value, label]) => (
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
                Meal
                </label>
                <select
                name="bloodType"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select...</option>
                {MEAL.map(([value, label]) => (
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
                Prescription
                </label>
                <select
                name="bloodType"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select...</option>
                {PRESCRIPTION.map(([value, label]) => (
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
                Add Meal Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MealPlanAdd;