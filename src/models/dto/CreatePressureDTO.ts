interface CreatePressureDTO {
  systolic: string;
  diastolic: string;
  pulse: string;
  user: {
    id: number;
  };
}

export default CreatePressureDTO;
