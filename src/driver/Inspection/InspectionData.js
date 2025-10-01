import logo from '../../assets/image 104.png'

const inspections = [
  {
    id: "12344534",
    submittedAt: "Tue, Feb 20, 2025 10:30am",
    vehicle: "EX7872",
    vehicleImg: logo,
    date: "22/04/2025",
    form: "Pre-trip Inspection",
    status: "Pass",
    items: [
      { id: 1, name: "Air Brake System", status: "Fail", image: null, expandable: false },
      { id: 2, name: "Cargo Securement", status: "Pass", image: null, expandable: false },
      { id: 3, name: "Driver Controls", status: "Pass", image: null, expandable: false },
      { id: 4, name: "Cab", status: "Pass", image: null, expandable: false },
      { id: 5, name: "Driver Seat", status: "Pass", image: null, expandable: false },
      { id: 6, name: "Driver Seat", status: "Pass", image: null, expandable: false },
      { id: 7, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
      { id: 8, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
      { id: 9, name: "Cab", status: "Pass", image: null, expandable: false },
      { id: 10, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
      { id: 11, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
    ],
  },

  {
    id: "22344535",
    submittedAt: "Wed, Feb 21, 2025 11:00am",
    vehicle: "AB5678",
    vehicleImg: logo,
    date: "23/04/2025",
    form: "Post-trip Inspection",
    status: "Fail",
    items: [
      { id: 1, name: "Air Brake System", status: "Pass", image: null, expandable: false },
      { id: 2, name: "Cargo Securement", status: "Pass", image: null, expandable: false },
      { id: 3, name: "Driver Controls", status: "Fail", image: logo, expandable: true },
      { id: 4, name: "Cab", status: "Pass", image: null, expandable: false },
    ],
  },

  {
    id: "22344534",
    submittedAt: "Wed, Feb 21, 2025 11:00am",
    vehicle: "AB5678",
    vehicleImg: logo,
    date: "23/04/2025",
    form: "Post-trip Inspection",
    status: "Pass",
    items: [
      { id: 1, name: "Air Brake System", status: "Pass", image: null, expandable: false },
      { id: 2, name: "Cargo Securement", status: "Pass", image: null, expandable: false },
      { id: 3, name: "Driver Controls", status: "Fail", image: logo, expandable: true },
      { id: 4, name: "Cab", status: "Pass", image: null, expandable: false },
    ],
  },
];


export default  inspections