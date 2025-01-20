import React from 'react';
import AddClassForm from '../components/AddClassForm';

const AddClassPage = ({ fetchClasses }) => {
  return (
    <div className="add-class-page">
      <div className="page-header">
        <h2>Add New Class</h2>
      </div>
      <AddClassForm fetchClasses={fetchClasses} />
    </div>
  );
};

export default AddClassPage; 