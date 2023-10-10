import React, { useState } from 'react';
import Merchant from './form';
import Table from './table';
import Filter from './filter';
import "./merchant.css"



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
const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [formData, setFormData] = useState<Person>({
    name: '',
    email: '',
    phone: 0,
    website: '',
    contact: '',
    number: 0,
    another: '',
    notes: '',
    type: [],
    category: [],
    commission: 0,
    date: '',
    logo: '',
    criticalAccountYes: [],
    criticalAccountNo:[] ,
    payment: [],
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Person | null>(null);
  const [selectedType, setSelectedType] = useState<string>(''); // Declare selectedType at the top
  const [criticalAccountYes, setCriticalAccountYes] = useState<boolean>(false); // Declare criticalAccountYes
  const [criticalAccountNo, setCriticalAccountNo] = useState<boolean>(false); // Declare criticalAccountNo

  const [nameFilter,setNameFilter] = useState('');
  const [phoneFilter,setPhoneFilter] = useState('');
  const [typeFilter,setTypeFilter]= useState('');
  const [paymentFilter,setPaymentFilter]= useState('');

  const [isFilterMode,setIsFiltermode] = useState(false);

  const ApplyFilter = (event:React.FormEvent)=> {
    event.preventDefault();
    setIsFiltermode(true);
  }
const Backtoform = (event:React.FormEvent) =>{
  event.preventDefault();
  setIsFiltermode(false);
}
  const FilteredPersons = persons.filter((person:Person) => {
    return (
      person.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      person.phone.toString().includes(phoneFilter) && 
      (typeFilter === '' || person.type.includes(typeFilter)) &&
      (paymentFilter === '' || person.payment.includes(paymentFilter))
    );
  });

  console.log(persons);
  
  const [newPerson, setNewPerson] = useState<Person>({
    name: '',
    email: '',
    phone: 0,
    website: '',
    contact: '',
    number: 0,
    another: '',
    notes: '',
    type: [],
    category: [],
    commission: 0,
    date: '',
    logo: '',
    criticalAccountYes: [],
    criticalAccountNo: [],
    payment: [],
  });
  
  
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { name, value, type } = event.target;
  
    if (type === 'checkbox') {
      // For checkboxes, handle checked state directly
      const checkbox = event.target as HTMLInputElement;
      const updatedArray = checkbox.checked ? ['Yes'] : [];
  
      if (editIndex !== null) {
        // If in edit mode, update the editFormData
        setEditFormData((prevData) => {
          return {
            ...(prevData as Person),
            [field]: updatedArray,
          };
        });
      } else {
        // Otherwise, update the regular formData
        setFormData((prevData) => {
          return {
            ...prevData,
            [field]: updatedArray,
          };
        });
      }
    } else {
      // Handle other input types (text, select, textarea, number)
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: type === 'number' ? parseInt(value, 10) : value,
        };
      });
  
  
      // Create newPerson object with updated form data
      const newPerson: Person = {
        name: name === 'name' ? value : formData.name,
        email: name === 'email' ? value : formData.email,
        phone: name === 'phone' ?parseInt(value, 10) : formData.phone,
        website: name === 'website' ? value : formData.website,
        contact: name === 'contact' ? value : formData.contact,
        number: name === 'number' ? parseInt(value, 10) : formData.number,

        another: name === 'another' ? value : formData.another,
        notes: name === 'notes' ? value : formData.notes,
        type: name === 'type' ? [value] : formData.type,
        category: name === 'category' ? [value] : formData.category,
        commission: name === 'commission' ? Number(value) : formData.commission,
        date: name === 'date' ? value : formData.date,
        logo: name === 'logo' ? value : formData.logo,
        criticalAccountYes: name === 'criticalAccountYes' ? ['Yes'] : [],
        criticalAccountNo: name === 'criticalAccountNo' ?['No'] : [],
        payment: name === 'payment' ? [value] : formData.payment,
        [name]: type === 'number' ? parseInt(value, 10) : value, // Parse number type inputs
      // [field]: type === 'checkbox' ? (checked ? ['Yes'] : []) : [value], // Handle checkbox and other fields
      };
  
      // Set the newPerson state
      setNewPerson(newPerson);
    }
  };
  
 
  const AddPerson = (event: React.FormEvent) => {
    console.log("Adding Person: ", formData);
    event.preventDefault();
    const newPerson: Person = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      contact: formData.contact,
      number: formData.number,
      another: formData.another,
      notes: formData.notes,
      type: [selectedType], // Wrap selectedType in an array
      category: formData.category,
      commission: formData.commission,
      date: formData.date,
      logo: formData.logo,
      criticalAccountYes: criticalAccountYes ? ['Yes'] : [],
      criticalAccountNo: criticalAccountNo ? ['No'] : [],
      payment: formData.payment,
    };
  
    setPersons((prevPersons) => [...prevPersons, newPerson]);
    // Reset the form data after adding a person
    setFormData({
      name: '',
      email: '',
      phone: 0,
      website: '',
      contact: '',
      number: 0,
      another: '',
      notes: '',
      type: [],
      category: [],
      commission: 0,
      date: '',
      logo: '',
      criticalAccountYes: [],
      criticalAccountNo: [],
      payment: [],
    });
  
    setSelectedType('');
    setCriticalAccountYes(false);
    setCriticalAccountNo(false);
  };
  const handleFormSubmit = (event: React.FormEvent) => {
    console.log("Form Data Submitted: ", newPerson);
    event.preventDefault();
  
    if (editIndex !== null) {
      handleEditSubmit(editIndex, newPerson); // Call handleEditSubmit for edit operation with newPerson
    } else {
      setPersons((prevPersons) => [...prevPersons, newPerson]); // Add newPerson to the persons array
    }
  
    // Reset the form data and other state variables after submission
    setFormData({
      name: '',
      email: '',
      phone: 0,
      website: '',
      contact: '',
      number: 0,
      another: '',
      notes: '',
      type: [],
      category: [],
      commission: 0,
      date: '',
      logo: '',
      criticalAccountYes: [],
      criticalAccountNo: [],
      payment: [],
    });
  
    // Reset other state variables as needed
    setSelectedType('');
    setCriticalAccountYes(false);
    setCriticalAccountNo(false);
    setNewPerson({
      name: '',
      email: '',
      phone: 0,
      website: '',
      contact: '',
      number: 0,
      another: '',
      notes: '',
      type: [],
      category: [],
      commission: 0,
      date: '',
      logo: '',
      criticalAccountYes: [],
      criticalAccountNo: [],
      payment: [],

    });
  };
  
  
  
  const handleDelete = (index: number) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this person?');

  if (confirmDelete) {
    const updatedPersons = [...persons];
    updatedPersons.splice(index, 1);
    setPersons(updatedPersons);
  }
};
const handleEdit = (index: number) => {
  const editedPerson = persons[index];
  console.log("Editing Person: ", editedPerson);
  setEditIndex(index);
  setEditFormData(editedPerson);
  setFormData(editedPerson);
};

  const handleEditSubmit = ( index: number,editedPerson: Person) => {
    // Update the persons state with the edited person at the specified index
    const updatedPersons = [...persons];
    updatedPersons[index] = editedPerson;
    setPersons(updatedPersons);

    // Reset edit state
    setEditIndex(null);
    setEditFormData(null);
    setSelectedType('');
    setCriticalAccountYes(false);
    setCriticalAccountNo(false);
};

const handleEditSubmitWrapper = (index: number, editedPerson: Person) => {
  handleEditSubmit(index, editedPerson);
};

console.log(persons);
   return (
    <div>
  <Merchant
         editIndex={editIndex}
        editFormData={editFormData}
         formData={formData}
         selectedType={selectedType}
         handleInputChange={handleInputChange}
         setSelectedType={setSelectedType}
         setCriticalAccountYes={setCriticalAccountYes}
         setCriticalAccountNo={setCriticalAccountNo}
         handleEditSubmit={handleEditSubmitWrapper}
         AddPerson={AddPerson} setEditIndex={function (value: React.SetStateAction<number>): void {
           throw new Error('Function not implemented.');
         } } setEditFormData={function (value: React.SetStateAction<string>): void {
           throw new Error('Function not implemented.');
         } }/>


<Filter
  nameFilter={nameFilter}
  setNameFilter={setNameFilter}
  phoneFilter={phoneFilter}
  setPhoneFilter={setPhoneFilter}
  typeFilter={typeFilter}
  setTypeFilter={setTypeFilter}
  paymentFilter={paymentFilter}
  setPaymentFilter={setPaymentFilter}
  ApplyFilter={ApplyFilter}
  Backtoform={Backtoform}
  isFilterMode={isFilterMode}
  FilteredPersons={FilteredPersons}  // Pass FilteredPersons as a prop
/>


<Table
   persons={isFilterMode ? FilteredPersons : persons}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  AddPerson={AddPerson}
  handleEditSubmit={handleEditSubmitWrapper}
  handleFormSubmit={handleFormSubmit}
/>



    </div>
  );
      }
export default App;