import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const  DatePicker: React.FC = () => { 

const [value, setValue] = useState({ 

startDate: null ,
endDate: null 

}); 

const handleValueChange = (newValue:any) => {
console.log("newValue:", newValue); 
setValue(newValue); 

} 

return (
<Datepicker 

value={value} 
onChange={handleValueChange} 
showShortcuts={true} 

/> 

);
}; 
export default DatePicker;