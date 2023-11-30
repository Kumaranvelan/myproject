import React,{useState} from "react";
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
criticalAccount: string[];
  payment : string[];
  [key: string]: string | number  | string[] ;
}
interface TableProps {
  persons: Person[]; // Array of Person objects to be displayed in the table
  handleEdit: (index: number) => void; // Function to handle the edit action for a person
  handleDelete: (index: number) => void; // Function to handle the delete action for a person
  handleEditSubmit: (index: number, editedPerson: Person) => void; // Function to handle the submission of edited data
  // AddPerson: (event: React.FormEvent) => void; // Function to handle adding a new person
  handleFormSubmit: (event: React.FormEvent) => void; // Function to handle form submission
}
const Table:React.FC<TableProps> =({ persons, handleDelete, handleEdit, handleEditSubmit, handleFormSubmit })=> {
    const [isFilterMode,] = useState(false);
    const [FilteredPersons, ] = useState<Person[]>([]);
    // function handleDelete(index: number): void {
    //     throw new Error("Function not implemented.");
    // }
    // function handleEdit(index: number): void {
    //     throw new Error("Function not implemented.");
    // }
    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault(); // Prevent default button click behavior
        handleEdit(index);
      };
      const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault(); // Prevent default button click behavior
        handleDelete(index);
      };
    return (
    <table className="App-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phonenumber</th>
          <th>website</th>
          <th>contactname</th>
          <th>contactnumber</th>
          <th>contactemail</th>
          <th>notes</th>
          <th>type</th>
          <th>category</th>
          <th>commission</th>
          <th>date</th>
          <th>criticalaccount</th>
          <th>Payment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {(isFilterMode ? FilteredPersons : persons).map(
          (p: Person, index: number) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.website}</td>
              <td>{p.contact}</td>
              <td>{p.number}</td>
              <td>{p.another}</td>
              <td>{p.notes}</td>
              <td>{p.type}</td>
              <td>{p.category}</td>
              <td>{p.commission}</td>
              <td>{p.date}</td>
              <td>{p.criticalAccount ? "Yes" : "No"}</td>
              <td>{p.payment}</td>
             <tr> <td>
              <button onClick={(event) => handleEditClick(event, index)} >Edit</button>
              </td></tr>
             <tr> <td>
              <button onClick={(event) => handleDeleteClick(event, index)}>Delete</button>
              </td></tr>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
export default Table;