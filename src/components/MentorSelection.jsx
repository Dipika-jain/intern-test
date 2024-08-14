import React from "react";
import PropTypes from 'prop-types';

const MentorSelection = ({ mentors, onSelectMentor }) => {
  return (
    <div>
      <h2>Select a Mentor</h2>
      <select onChange={(e) => onSelectMentor(e.target.value)}>
        <option value="">Select Mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.id} value={mentor.id}>
            {mentor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

MentorSelection.propTypes = {
  mentors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectMentor: PropTypes.func.isRequired,
};

export default MentorSelection;
