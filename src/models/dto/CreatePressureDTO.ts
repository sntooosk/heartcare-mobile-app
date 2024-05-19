interface CreatePressureDTO {
    systolic: string;
    diastolic: string;
    pulse: string;
    date: string;
    user: {
        id: number;
    };
  }
  
  export default CreatePressureDTO;
  