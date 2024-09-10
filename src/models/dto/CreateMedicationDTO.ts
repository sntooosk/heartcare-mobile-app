interface CreateMedicationDTO {
    name: string;
    dosage: string;
    user: {
      id: number;
    };
  }
  
  export default CreateMedicationDTO;
  