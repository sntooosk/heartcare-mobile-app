interface UpdatePressureDTO {
  id: number;
  systolic: string;
  diastolic: string;
  pulse: string;
  user: {
    id: number;
  };
}

export default UpdatePressureDTO;
