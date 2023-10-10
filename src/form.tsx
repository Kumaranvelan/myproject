// import React, { useState } from 'react';
// import React, { useState } from 'react';
import App from './person';
 
interface Person  {
  name: string;
  email: string;
  phone: number;
  website: string; 
  contact: string;
  number : number;
  another: string;
  notes : string;
  type : string[];
  category :string[];
  commission : number;
  date : string;
  logo: string;
criticalAccountYes:  string[];
  criticalAccountNo:  string[];
  payment : string[];
  [key: string]: string | number  | string[] ;
}

interface FormProps {
  
  editIndex: number | null;
  editFormData: Person | null;
  handleEditSubmit: (index: number, editedPerson: Person) => void
  formData: Person;
  selectedType: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => void;
  AddPerson: (event: React.FormEvent) => void;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setCriticalAccountYes: React.Dispatch<React.SetStateAction<boolean>>;
  setCriticalAccountNo: React.Dispatch<React.SetStateAction<boolean>>;
     setEditIndex:React.Dispatch<React.SetStateAction<number>>;
     setEditFormData:React.Dispatch<React.SetStateAction<string>>;
   
}

const Merchant: React.FC<FormProps> = ({
  editIndex,
  editFormData,
  formData,
  selectedType,
  handleInputChange,
  setSelectedType,
  setCriticalAccountYes,
  setCriticalAccountNo,
  handleEditSubmit,
  AddPerson,

}) => {


  // const [criticalAccount, setCriticalAccount] = useState(false);

  
 
  const handleFormSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  if (editIndex !== null) {
     // For edit operation, directly use formData and pass it to handleEditSubmit
    handleEditSubmit(editIndex,formData); // Call handleEditSubmit for edit operation with formData
  } else {
    AddPerson(event); // Call AddPerson for new person submission
  }
};


  const handleCriticalAccountYesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCriticalAccountYes(event.target.checked);
  };

  const handleCriticalAccountNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCriticalAccountNo(event.target.checked);
  };
 

  return (
    
<div>
    <h1 className='head' >Merchant Form</h1>
    <form id="myForm" onSubmit={handleFormSubmit}>
      <label  htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(event) => {handleInputChange(event, "name")}}
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={ formData.email}
        onChange={(event) => {handleInputChange(event, "email")}}
      />
      <label>PhoneNumber</label>
      <input
        type="tel"
        name="phone"
        id="number"
        value={formData.phone}
        onChange={(event) => {handleInputChange(event, "phone")}}
      />
      <label>website</label>
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={(event) => {handleInputChange(event, "website")}}
      />
      <label>contactname</label>
      <input
        type="text"
        id="contact"
        name="contact"
        value={formData.contact}
        onChange={(event) => {handleInputChange(event, "contact")}}
      />
      <label>contactnumber</label>
      <input
        type="tel"
        id="phone"
        name="number"
        value={formData.number}
        onChange={(event) => {handleInputChange(event, "number")}}
      />
      <label>ContactMail</label>
      <input
        type="email"
        id="another"
        name="another"
        value={formData.another}
        onChange={(event) => {
          setSelectedType(event.target.value);
          handleInputChange(event, "another"); 
        }}
      />
      <label>Notes</label>
      <textarea
        name="notes"
        id="notes"
        value={formData.notes}
        onChange={(event) => {handleInputChange(event, "notes")}}
      ></textarea>
      <label>Type:</label>
      <label>Small buisiness</label>
      <input
        type="radio"
        name="type"
        value="small business"
       checked={selectedType === "small business"}
        onChange={(event) => {
          setSelectedType(event.target.value);
          handleInputChange(event, "type"); 
        }}
      />
      <label>Entreprise</label>
      <input
        type="radio"
        name="type"
        value="Entreprise"
        checked={selectedType === "Entreprise"}
        onChange={(event) => {
          setSelectedType(event.target.value); // Update the selected type
          handleInputChange(event, "type"); // Handle form input change
        }}
      />
      <label>Entreprenuer</label>
      <input
        type="radio"
        name="type"
        value="Entreprenuer"
        
        checked={selectedType === "Entreprenuer"}
        onChange={(event) => {
          setSelectedType(event.target.value); // Update the selected type
          handleInputChange(event, "type"); // Handle form input change
        }}
      />
      <label> category</label>
      <select
        name="category"
        id="category"
        value={formData.category}
        onChange={(event) => {handleInputChange(event, "category")}}
      >
        <option value="clothes">clothes</option>
        <option value="toys">toys</option>
        <option value="electronics">Electronics</option>
        <option value="groceries">Groceries</option>
        <option value="digital">Digital</option>
      </select>
      <label>commmission</label>
      <input
        type="number"
        name="commission"
        id="commission"
        value={
          formData.commission
        }
        onChange={(event) => {handleInputChange(event, "commission")}}
      />
      <label>Activeform</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date}
        onChange={(event) => {handleInputChange(event, "date")}}
      />
      <label>LOGO</label>
      <input
        type="file"
        name="file"
        id="file"
        value={formData.logo}
        onChange={(event) => {handleInputChange(event, "logo")}}
      />
      <label>Critical Account</label>
    
      Yes <input
  type="checkbox"
  id="criticalAccountYes"
  name="criticalAccountYes"
 value = " "
 checked={formData.criticalAccountYes.length<0}
  onChange={(event) => handleCriticalAccountYesChange(event)}
/>
No <input
  type="checkbox"
  id="criticalAccountNo"
  name="criticalAccountNo"
  value = " "
 checked = {formData.criticalAccountNo.length<0}
  onChange={(event) => handleCriticalAccountNoChange(event)}
/>
 <label htmlFor="Payment">Payment</label>
      <select
        name="payment"
        id="payment"
        value={formData.payment}
        onChange={(event) => {handleInputChange(event, "payment")}}
      >
        <option value="cash">Cash on Payment</option>
        <option value="upi">UPI</option>
        <option value="card">Card on payment</option>
      </select>
      <input
        type="submit"
        value={editIndex !== null ? "Edit" : "Submit"}
        // onClick={editIndex !== null ? handleEditSubmit : AddPerson}
      />
    </form>
    <App/>
    </div>
   

  );
};
export default Merchant;
