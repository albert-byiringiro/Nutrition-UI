import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {  
    useSelector,
    useDispatch
  } from 'react-redux'
import { createconversation,resetConversation } from "../../features/Conversation/convoSlice";
import { createAppointment,resetAppointment } from "../../features/appointment/appointSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CHRONIC_DISEASE_CHOICES,
    ACTIVITY_LEVEL_CHOICES,
    SMOKING_HABIT_CHOICES,
    ALCOHOL_CONSUMPTION_CHOICES,
    SLEEP_PATTERNS_CHOICES,
    CURRENT_DIET_CHOICES,
    FOOD_ALLERGY_CHOICES,
 } from './Question';

const AppointmentAdd = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch()
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        survey: {
            chronicDisease: '',
            activityLevel: '',
            smokingHabit: '',
            alcoholConsumption: '',
            sleepPatterns: '',
            currentDiet: '',
            foodAllergy: '',
            physical_disability: false
        },
        schedule: {
            user: 2,
            title: '',
            description: '',
            date: '',
        }
    });

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleInputChange = (step, field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [step]: {
                ...prevFormData[step],
                [field]: value
            }
        }));
    };
    const handleCheckboxChange = (step, field) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [step]: {
                ...prevFormData[step],
                [field]: !prevFormData[step][field]
            }
        }));
    };

    const handleFormSubmit = () => {
        console.log("Survey Form Data:", formData.survey);
        console.log("Schedule Form Data:", formData.schedule);
        try {
            const requestBody = {
              questionnaire: {
                chronic_diseases: formData.survey.chronicDisease,
                activity_level: formData.survey.activityLevel,
                smoking_habits: formData.survey.smokingHabit,
                alcohol_consumption: formData.survey.alcoholConsumption,
                sleep_patterns: formData.survey.sleepPatterns,
                current_diet: formData.survey.currentDiet,
                food_allergies: formData.survey.foodAllergy,
                physical_disability: formData.survey.physical_disability,
              }
            };
              console.log("$%$%$requestion body%$%$",requestBody)
              dispatch(createconversation(requestBody));
              dispatch(createAppointment(formData.schedule));
              console.log('Appointment creation initiated.');
              toast.success('Appointment successfully', {
                position: "top-center",
                autoClose: 3000, // 3 seconds
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              
            } catch (error) {
              console.error('Appointment creation failed:', error.message);
              toast.error('Appointment failed', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              
            }
    };
{/* <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={e => handleInputChange("survey", "name", e.target.value)}
                                    value={formData.survey.name}
                                /> */}
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h1 className="text-2xl font-semibold mb-4 ">Health Questionnaire</h1>
                        <form className="">
                            <div className="w-full flex flex-wrap px-4 mb-4">
                                <div className="m-4 w-1/3">
                                <label className="block font-medium mb-2">Chronic Disease</label>
                                <select
                                    name="chronicDisease"
                                    value={formData.survey.chronicDisease}
                                    onChange={e => handleInputChange("survey", "chronicDisease", e.target.value)}
                                    className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {CHRONIC_DISEASE_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                    ))}
                                </select>
                                </div>
                                <div className="m-4 w-1/3">
                                <label className="block font-medium mb-2">Activity Level</label>
                                <select
                                    name="activityLevel"
                                    value={formData.survey.activityLevel}
                                    onChange={e => handleInputChange("survey","activityLevel", e.target.value)}
                                    className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {ACTIVITY_LEVEL_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap px-4 mb-4">
                                <div className="m-4 w-1/3">
                                <label className="block font-medium mb-2">Smoking Habits</label>
                                <select
                                    name="smokingHabit"
                                    value={formData.survey.smokingHabit}
                                    onChange={e => handleInputChange("survey","smokingHabit", e.target.value)}
                                    className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {SMOKING_HABIT_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                    ))}
                                </select>
                                </div>
                                <div className="m-4 w-1/3">
                                <label className="block font-medium mb-2">Alcohol Consumption</label>
                                <select
                                    name="alcoholConsumption"
                                    value={formData.survey.alcoholConsumption}
                                    onChange={e => handleInputChange("survey","alcoholConsumption", e.target.value)}
                                    className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {ALCOHOL_CONSUMPTION_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap px-4 mb-4">
                                <div className="m-4 w-1/3">
                                <label className="block font-medium mb-2">Sleep Patterns</label>
                                <select
                                    name="sleepPatterns"
                                    value={formData.survey.sleepPatterns}
                                    onChange={e => handleInputChange("survey","sleepPatterns", e.target.value)}
                                    className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {SLEEP_PATTERNS_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                    ))}
                                </select>
                                </div>
                                <div className="m-4 w-1/3">
                                <label className="block font-medium mb-2">Current Diet</label>
                                <select
                                    name="currentDiet"
                                    value={formData.survey.currentDiet}
                                    onChange={e => handleInputChange("survey","currentDiet", e.target.value)}
                                    className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {CURRENT_DIET_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap px-4 mb-4">
                                <div className="m-4 w-1/3">
                                    <label className="block font-medium mb-2">Food Allergy</label>
                                    <select
                                        name="foodAllergy"
                                        value={formData.survey.foodAllergy}
                                        onChange={e => handleInputChange("survey","foodAllergy", e.target.value)}
                                        className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select...</option>
                                        {FOOD_ALLERGY_CHOICES.map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-1/3 px-4 mb-4">
                                    <div className="p-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="physical_disability"
                                                className="form-checkbox h-5 w-5 text-indigo-600"
                                                checked={formData.survey.physical_disability}
                                                onChange={() => handleCheckboxChange("survey", "physical_disability")}
                                            />
                                            <span className="ml-2 text-gray-700">Physical disability?</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="flex items-center justify-center mt-4">
                            <div className="mx-auto w-full max-w-[550px] bg-white">
                                <form>
                                    <div class="mb-5">
                                        <label
                                        for="title"
                                        class="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                        Title
                                        </label>
                                        <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        onChange={e => handleInputChange("schedule", "title", e.target.value)}
                                        value={formData.schedule.title}
                                        placeholder="Enter title"
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
                                        <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        onChange={e => handleInputChange("schedule", "description", e.target.value)}
                                        value={formData.schedule.description}
                                        placeholder="Enter your description"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    <div class="-mx-3 flex flex-wrap">
                                        <div class="w-full px-3 sm:w-1/2">
                                        <div class="mb-5">
                                            <label
                                            for="date"
                                            class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                            Date
                                            </label>
                                            <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            onChange={e => handleInputChange("schedule", "date", e.target.value)}
                                            value={formData.schedule.date}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        </div>
                                        <div class="w-full px-3 sm:w-1/2">
                                        <div class="mb-5">
                                            <label
                                            for="time"
                                            class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                            Time
                                            </label>
                                            <input
                                            type="time"
                                            name="time"
                                            id="time"
                                            onChange={e => handleInputChange("schedule", "time", e.target.value)}
                                            
                                            className="w-full rounded-md border border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const steps = ["Survey","Appointment"];

    return (
        <div>
            <ToastContainer />
            {/* Stepper */}
            {/* ... */}
            {renderStepContent()}

            <div className="flex p-2 mt-4">
                {currentStep > 1 && (
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={handlePrevious}>Previous</button>
                )}
                {currentStep < steps.length ? (
                    <div className="flex-auto flex flex-row-reverse ">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleNext}>Next</button>
                    </div>
                ) : (
                    <div className="flex-auto flex flex-row-reverse">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleFormSubmit}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentAdd;
