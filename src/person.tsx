import React, { useState,useEffect } from "react";
import Merchant from "./form";
import Table from "./table";
import Filter from "./filter";
import "./merchant.css";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3010/persons";

export interface Person {
  name: string;
  email: string;
  phone: number;
  website: string;
  contact: string;
  number: number;
  another: string;
  notes: string;
  type: string[];
  category: string[];
  commission: number;
  date: string;
  logo: string;
  criticalAccount: string[];
  payment: string[];
  [key: string]: string | number | string[];
}
const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [formData, setFormData] = useState<Person>({
    name: "",
    email: "",
    phone: 0,
    website: "",
    contact: "",
    number: 0,
    another: "",
    notes: "",
    type: [],
    category: [],
    commission: 0,
    date: "",
    logo: "",
    criticalAccount: [],
    payment: [],
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Person | null>(null);
  const [selectedType, setSelectedType] = useState<string>(""); // Declare selectedType at the top
  const [nameFilter, setNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [isFilterMode, setIsFiltermode] = useState(false);
  const ApplyFilter = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFiltermode(true);
  };

useEffect(()=>{
  axios.get('/')
  .then((response)=>{
    setPersons(response.data);
  })
  .catch((error)=>{
    console.error('Error in Fetching Data',error);
  })
},[]);


  const Backtoform = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFiltermode(false);
  };
  const FilteredPersons = persons.filter((person: Person) => {
    return (
      person.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      person.phone.toString().includes(phoneFilter) &&
      (typeFilter === "" || person.type.includes(typeFilter)) &&
      (paymentFilter === "" || person.payment.includes(paymentFilter))
    );
  });
  const [newPerson, setNewPerson] = useState<Person>({
    name: "",
    email: "",
    phone: 0,
    website: "",
    contact: "",
    number: 0,
    another: "",
    notes: "",
    type: [],
    category: [],
    commission: 0,
    date: "",
    logo: "",
    criticalAccount: [],
    // criticalAccountNo: [],
    payment: [],
  });

  const handlePaymentCheckboxChange = (value: string) => {
    setFormData((prevData) => {
      if (prevData.payment.includes(value)) {
        // If the value is already in the array, remove it
        return { ...prevData, payment: prevData.payment.filter((item) => item !== value) };
      } else {
        // If the value is not in the array, add it
        return { ...prevData, payment: [...prevData.payment, value] };
      }
    });
  };
  
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { name, value, type } = event.target;
  
    if (type === "radio") {
      // For radio buttons, handle the selected value
      if (editIndex !== null) {
        setEditFormData((prevData) => ({
          ...(prevData as Person),
          [field]: [value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [field]: [value],
        }));
      }
    } else {
      // Handle other input types (text, select, textarea, number)
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? parseInt(value, 10) : value,
      }));
    }

const newPerson: Person = {
  name: name === "name" ? value : formData.name,
  email: name === "email" ? value : formData.email,
  phone: name === "phone" ? parseInt(value, 10) : formData.phone,
  website: name === "website" ? value : formData.website,
  contact: name === "contact" ? value : formData.contact,
  number: name === "number" ? parseInt(value, 10) : formData.number,
  another: name === "another" ? value : formData.another,
  notes: name === "notes" ? value : formData.notes,
  type: name === "type" ? [value] : formData.type,
  category: name === "category" ? [value] : formData.category,
  commission: name === "commission" ? Number(value) : formData.commission,
  date: name === "date" ? value : formData.date,
  logo: name === "logo" ? value : formData.logo,
  criticalAccount: name === "criticalAccount" ? [value] : formData.criticalAccount,
  payment: name === "payment" ? [value] : formData.payment,
  // ... Continue updating other fields as needed based on your form structure
};

// Set the newPerson state
setNewPerson(newPerson);

  
    // Set the newPerson state
    setNewPerson(newPerson);
  };
  

  
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Data Transfered Successfully',newPerson)
    // Check if in edit mode
    if (editIndex !== null) {
      // If in edit mode, call handleEditSubmit for edit operation with newPerson
      axios.put(`http://localhost:3010/persons/${editFormData?._id}`, newPerson)
        .then((response) => {
          const updatedPersons = [...persons];
          updatedPersons[editIndex] = response.data;
          setPersons(updatedPersons);
          setEditIndex(null);
          setEditFormData(null);
          setSelectedType('');
          console.log("Data edited successfully")
        })
        .catch((error) => {
          console.error('Error editing person:', error);
        });
    } else {
      // If not in edit mode, add the new person to the state after a successful POST request
      axios.post('http://localhost:3010/persons', newPerson)
        .then((response) => {
          setPersons((prevPersons) => [...prevPersons, response.data]);
          console.log('Data added successfully');
        })
        .catch((error) => {
          console.error('Error adding person:', error);
        });
    }
  
    // Reset the form data and other state variables after submission
    setFormData({
      name: "",
      email: "",
      phone: 0,
      website: "",
      contact: "",
      number: 0,
      another: "",
      notes: "",
      type: [],
      category: [],
      commission: 0,
      date: "",
      logo: "",
      criticalAccount: [],
      payment: [],
    });
    setSelectedType("");
    setNewPerson({
      name: "",
      email: "",
      phone: 0,
      website: "",
      contact: "",
      number: 0,
      another: "",
      notes: "",
      type: [],
      category: [],
      commission: 0,
      date: "",
      logo: "",
      criticalAccount: [],
      payment: [],
    });
  };
  
  const handleDelete = (index: number) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this person?');
  if (confirmDelete) {
    const personToDelete = persons[index];

    axios.delete(`http://localhost:3010/persons/${personToDelete._id}`)
      .then(() => {
        const updatedPersons = [...persons];
        updatedPersons.splice(index, 1);
        setPersons(updatedPersons);
        console.log("Data deleted successfully")
      })
      .catch((error) => {
        console.error('Error deleting person:', error);
      });
  }
};
  const handleEdit = (index: number) => {
    const editedPerson = persons[index];
    console.log("Editing Person: ", editedPerson);
    setEditIndex(index);
    setEditFormData(editedPerson);
    setFormData(editedPerson);
  };


  const handleEditSubmit = (index: number, editedPerson: Person) => {
    // Update the persons state with the edited person at the specified index
    const updatedPersons = [...persons];
    updatedPersons[index] = editedPerson;
    setPersons(updatedPersons);
  
    // Reset edit state
    setEditIndex(null);
    setEditFormData(null);
    setSelectedType("");
  };
  ;
  
  return (
    <div>
      <Merchant
        editIndex={editIndex}
        handleEditSubmit={handleEditSubmit}
        editFormData={editFormData}
        handlePaymentCheckboxChange={handlePaymentCheckboxChange}
        formData={formData}
        selectedType={selectedType}
        handleInputChange={handleInputChange}
        setSelectedType={setSelectedType}
        handleFormSubmit={handleFormSubmit}
        // setCriticalAccountNo={setCriticalAccountNo}
        // handleEditSubmit={handleEditSubmitWrapper}
        // AddPerson={AddPerson}
        setEditIndex={function (value: React.SetStateAction<number>): void {
          throw new Error("Function not implemented.");
        }}
        setEditFormData={function (value: React.SetStateAction<string>): void {
          throw new Error("Function not implemented.");
        }}
      />
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
        FilteredPersons={FilteredPersons} // Pass FilteredPersons as a prop
      />
      <Table
        persons={isFilterMode ? FilteredPersons : persons}
        handleEdit={handleEdit}
        handleEditSubmit={handleEditSubmit}
        handleDelete={handleDelete}
        // AddPerson={AddPerson}
        // handleEditSubmit={handleEditSubmitWrapper}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};
export default App;