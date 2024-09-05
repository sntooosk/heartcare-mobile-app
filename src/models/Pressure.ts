interface Pressure {
  id: number;
  systolic: string;
  diastolic: string;
  pulse: string;
  date: Date;
  user: {
    id: number;
  };
}

export default Pressure;
