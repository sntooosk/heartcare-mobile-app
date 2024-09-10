interface UpdateMedicationDTO {
    id: number
    name: string;
    dosage: string;
    user: {
      id: number;
    };
  }
  
  export default UpdateMedicationDTO;
  