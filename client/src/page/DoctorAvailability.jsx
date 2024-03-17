import React, { useState } from "react";

function DoctorAvailability() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotDuration, setSlotDuration] = useState("");
  const [doctorStartHour, setDoctorStartHour] = useState("01");
  const [doctorStartMinute, setDoctorStartMinute] = useState("00");
  const [doctorStartPeriod, setDoctorStartPeriod] = useState("AM");
  const [doctorEndHour, setDoctorEndHour] = useState("01");
  const [doctorEndMinute, setDoctorEndMinute] = useState("00");
  const [doctorEndPeriod, setDoctorEndPeriod] = useState("AM");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(
    //   `Date: ${selectedDate}\nSelected Time Slots: ${selectedSlots.join(", ")}`
    // );
  };

  // Function to handle time slot selection
  const handleTimeSlotSelect = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  // Function to remove selected slot
  const removeSelectedSlot = (slot) => {
    setSelectedSlots(selectedSlots.filter((s) => s !== slot));
  };

  // Function to reset selected time slots when input details are changed
  const handleInputChange = () => {
    setSelectedSlots([]);
    setTimeSlots([]);
    generateTimeSlots(); // Regenerate time slots when inputs change
  };

  // Function to generate time slots based on duration and available time of the doctor
  const generateTimeSlots = () => {
    const startHour =
      parseInt(doctorStartHour) + (doctorStartPeriod === "PM" ? 12 : 0);
    const startMinute = parseInt(doctorStartMinute);
    const endHour =
      parseInt(doctorEndHour) + (doctorEndPeriod === "PM" ? 12 : 0);
    const endMinute = parseInt(doctorEndMinute);

    if (
      startHour > endHour ||
      (startHour === endHour && startMinute >= endMinute)
    ) {
      setError("End time must be greater than start time.");
      setTimeSlots([]);
      return;
    }

    setError("");

    const durationInMinutes = parseInt(slotDuration);

    let currentTime = new Date(selectedDate);
    currentTime.setHours(startHour, startMinute, 0, 0);

    const slots = [];
    while (
      currentTime.getHours() < endHour ||
      (currentTime.getHours() === endHour &&
        currentTime.getMinutes() <= endMinute)
    ) {
      const nextTime = new Date(currentTime);
      nextTime.setMinutes(nextTime.getMinutes() + durationInMinutes);
      if (
        nextTime.getHours() < endHour ||
        (nextTime.getHours() === endHour && nextTime.getMinutes() <= endMinute)
      ) {
        const startTime =
          (currentTime.getHours() % 12 || 12) +
          ":" +
          (currentTime.getMinutes() < 10 ? "0" : "") +
          currentTime.getMinutes() +
          " " +
          (currentTime.getHours() >= 12 ? "PM" : "AM");
        const endTime =
          (nextTime.getHours() % 12 || 12) +
          ":" +
          (nextTime.getMinutes() < 10 ? "0" : "") +
          nextTime.getMinutes() +
          " " +
          (nextTime.getHours() >= 12 ? "PM" : "AM");
        slots.push({ startTime, endTime });
      }
      currentTime = nextTime;
    }
    setTimeSlots(slots);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Select Date and Doctor Availability
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        onChange={handleInputChange}
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="selectedDate" className="block mb-1">
              Select Date:
            </label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="slotDuration" className="block mb-1">
              Time Slot Duration (minutes):
            </label>
            <input
              type="number"
              min="15"
              max="60"
              id="slotDuration"
              name="slotDuration"
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="doctorStartTimeHour" className="block mb-1">
              Doctor's Available Time (Start):
            </label>
            <div className="flex">
              <select
                id="doctorStartTimeHour"
                name="doctorStartTimeHour"
                value={doctorStartHour}
                onChange={(e) => setDoctorStartHour(e.target.value)}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={hour} value={hour.toString().padStart(2, "0")}>
                    {hour.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                id="doctorStartTimeMinute"
                name="doctorStartTimeMinute"
                value={doctorStartMinute}
                onChange={(e) => setDoctorStartMinute(e.target.value)}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <option
                    key={minute}
                    value={minute.toString().padStart(2, "0")}
                  >
                    {minute.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                id="doctorStartTimePeriod"
                name="doctorStartTimePeriod"
                value={doctorStartPeriod}
                onChange={(e) => setDoctorStartPeriod(e.target.value)}
                className="border rounded px-4 py-2"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div className="flex-grow">
            <label htmlFor="doctorEndTimeHour" className="block mb-1">
              Doctor's Available Time (End):
            </label>
            <div className="flex">
              <select
                id="doctorEndTimeHour"
                name="doctorEndTimeHour"
                value={doctorEndHour}
                onChange={(e) => setDoctorEndHour(e.target.value)}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={hour} value={hour.toString().padStart(2, "0")}>
                    {hour.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                id="doctorEndTimeMinute"
                name="doctorEndTimeMinute"
                value={doctorEndMinute}
                onChange={(e) => setDoctorEndMinute(e.target.value)}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <option
                    key={minute}
                    value={minute.toString().padStart(2, "0")}
                  >
                    {minute.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                id="doctorEndTimePeriod"
                name="doctorEndTimePeriod"
                value={doctorEndPeriod}
                onChange={(e) => setDoctorEndPeriod(e.target.value)}
                className="border rounded px-4 py-2"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={generateTimeSlots}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            Generate Time Slots
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() =>
                handleTimeSlotSelect(`${slot.startTime} - ${slot.endTime}`)
              }
              className={`block w-full border rounded px-4 py-2 ${
                selectedSlots.includes(`${slot.startTime} - ${slot.endTime}`)
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {`${slot.startTime} - ${slot.endTime}`}
            </button>
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Selected Time Slots:</h3>
          <div className="flex flex-wrap">
            {selectedSlots.map((slot, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded px-2 py-1 mr-2 mb-2 flex items-center"
              >
                <span className="mr-2">{slot}</span>
                <button
                  type="button"
                  onClick={() => removeSelectedSlot(slot)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-4  text-white px-4 py-2 rounded mx-auto hover:bg-secondary-dark"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorAvailability;
