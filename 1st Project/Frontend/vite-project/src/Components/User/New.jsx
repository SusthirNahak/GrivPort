import { useState } from 'react';

const New = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: 'User Name', content: (
      <div className="form-section">
        <h3>USER NAME</h3>
        <p>Please provide your user name details</p>
        <hr />
        <form>
          <label htmlFor="userName">User Name</label>
          <input type="text" id="userName" placeholder="Input your user name" />
        </form>
      </div>
    )},
    { label: 'Details', content: (
      <div className="form-section">
        <h3>GRIEVANCE DETAILS</h3>
        <p>Provide the necessary details to register your grievance with us</p>
        <hr />
        <form>
          <label htmlFor="grievanceTitle">Grievance Title</label>
          <input type="text" id="grievanceTitle" placeholder="Input grievance title" />
          <label htmlFor="grievanceOwner">Grievance Owner</label>
          <input type="text" id="grievanceOwner" placeholder="Input first and last name" />
          <label htmlFor="grievanceType">Grievance Type</label>
          <select id="grievanceType">
            <option>Select from list</option>
            <option>Complaint</option>
            <option>Feedback</option>
            <option>Inquiry</option>
          </select>
          <label htmlFor="grievanceId">Grievance ID</label>
          <input type="text" id="grievanceId" placeholder="Input grievance ID number" />
        </form>
      </div>
    )},
    { label: 'Category', content: (
      <div className="form-section">
        <h3>GRIEVANCE CATEGORY</h3>
        <p>Select the category of your grievance</p>
        <hr />
        <form>
          <label htmlFor="category">Category</label>
          <select id="category">
            <option>Select from list</option>
            <option>Service Issue</option>
            <option>Product Issue</option>
            <option>Other</option>
          </select>
        </form>
      </div>
    )},
    { label: 'Attachments', content: (
      <div className="form-section">
        <h3>ATTACHMENTS</h3>
        <p>Upload any supporting documents (if any)</p>
        <hr />
        <form>
          <label htmlFor="attachment">Upload File</label>
          <input type="file" id="attachment" />
        </form>
      </div>
    )},
    { label: 'Submit', content: (
      <div className="form-section">
        <h3>REVIEW & SUBMIT</h3>
        <p>Review your grievance details before submission</p>
        <hr />
        <div className="review-section">
          <p><strong>User Name:</strong> [User Input]</p>
          <p><strong>Grievance Title:</strong> [User Input]</p>
          <p><strong>Grievance Owner:</strong> [User Input]</p>
          <p><strong>Grievance Type:</strong> [User Input]</p>
          <p><strong>Grievance ID:</strong> [User Input]</p>
          <p><strong>Category:</strong> [User Input]</p>
          <p><strong>Attachments:</strong> [File Name]</p>
        </div>
      </div>
    )},
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container">
      <h2>Create Your Grievance</h2>
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div key={index} className="step-container">
            <div className={`step ${index + 1 <= currentStep ? 'active' : ''}`}>
              {index + 1}
            </div>
            <span className="label">{step.label}</span>
            {index < steps.length - 1 && (
              <div className={`line ${index + 1 < currentStep ? 'active-line' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      {steps[currentStep - 1].content}

      <div className="buttons">
        <button
          className="prev-btn"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          {"< Previous"}
        </button>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={currentStep === steps.length}
        >
          {currentStep === steps.length ? "Submit" : "Next >"}
        </button>
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          position: relative;
        }

        .step-container {
          display: flex;
          align-items: center;
          flex: 1;
          position: relative;
        }

        .step {
          width: 30px;
          height: 30px;
          background-color: #ccc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          z-index: 1;
        }

        .step.active {
          background-color: #28a745;
        }

        .line {
          flex: 1;
          height: 2px;
          background-color: #ccc;
          margin: 0 5px;
        }

        .line.active-line {
          background-color: #28a745;
        }

        .label {
          position: absolute;
          top: 40px;
          font-size: 12px;
          color: #666;
          text-align: center;
          width: 80px;
          left: 50%;
          transform: translateX(-50%);
        }

        .progress-bar > div:nth-child(1) .label {
          left: 0%;
        }

        .progress-bar > div:nth-child(2) .label {
          left: 25%;
        }

        .progress-bar > div:nth-child(3) .label {
          left: 50%;
        }

        .progress-bar > div:nth-child(4) .label {
          left: 75%;
        }

        .progress-bar > div:nth-child(5) .label {
          left: 100%;
        }

        .form-section {
          margin-bottom: 30px;
        }

        h3 {
          font-size: 18px;
          color: #333;
          margin-bottom: 5px;
        }

        p {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
        }

        hr {
          border: 0;
          border-top: 1px solid #eee;
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
        }

        input,
        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
          color: #333;
        }

        input::placeholder {
          color: #999;
        }

        select {
          appearance: none;
          background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')
            no-repeat right 10px center;
          background-size: 12px;
        }

        .review-section p {
          font-size: 14px;
          color: #333;
          margin-bottom: 10px;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        .prev-btn {
          background-color: #fff;
          color: #28a745;
          border: 1px solid #28a745;
        }

        .prev-btn:disabled {
          color: #ccc;
          border-color: #ccc;
          cursor: not-allowed;
        }

        .next-btn {
          background-color: #28a745;
          color: #fff;
        }

        .next-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .prev-btn:hover:not(:disabled) {
          background-color: #f0f0f0;
        }

        .next-btn:hover:not(:disabled) {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default New;