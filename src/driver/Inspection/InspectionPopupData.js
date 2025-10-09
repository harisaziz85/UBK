const inspectionCategories = [
  {
    id: 'air-brake',
    title: 'Air break system',
    status: 'N/A',
    minorDefects: [
      'Audible air leak.',
      'Slow air pressure build-up rate'
    ],
    majorDefects: [
      'Pushrod stroke of any brake exceeds the adjustment limit',
      'Air loss rate exceeds prescribed limit',
      'Inoperative towing vehicle (tractor) protection system',
      'Low air warning system fails or system is activated',
      'Inoperative service, parking or emergency brakes'
    ],
    otherDefects: [ 'No Defects']
  },

  {
    id: 'cab',
    title: 'Cab',
    status: 'N/A',
    minorDefects: ['Occupant compartment door fails to close securely'],
    majorDefects: ['Any cab or sleeper door fails to close securely'],
    otherDefects: [ 'No Defects']
  },


  {
    id: 'cargo-securement',
    title: 'Cargo Securement',
    status: 'N/A',
    minorDefects: ['insecure or improper load covering.'],
    majorDefects: [
      'Insecure cargo',
      'Absence, failure, malfunction or deterioration of required cargo securement device or load covering'
    ],
    otherDefects: ['No Defects']
  },

  {
    id: 'coupling-devices',
    title: 'Coupling Devices',
    status: 'N/A',
    minorDefects: ['Coupler or mounting has loose or missing fastener'],
    majorDefects: [
      'Coupler is insecure or movement exceeds prescribed limit',
      'Coupling or locking mechanism is damaged or fails to lock',
      'Defective, incorrect or missing safety chain or cable'
    ],
    otherDefects: [ 'No Defects']
  },

  {
    id: 'dangerous-goods',
    title: 'Dangerous Goods',
    status: 'N/A',
    minorDefects: ['Dangerous goods requirements not met'],
    majorDefects: [],
    otherDefects: [ 'No Defects']
  },
  
  {
    id: 'driver-controls',
    title: 'Driver Controls',
    status: 'N/A',
    minorDefects: [
      'Accelerator pedal, clutch, gauges, controls and visual indicators or instruments fail to function properly'
    ],
    majorDefects: [],
    otherDefects: [ 'No Defects']
  },
  {
    id: 'driver-seat',
    title: 'Driver Seat',
    status: 'N/A',
    minorDefects: ['Loose or insecure mounting or electrical connection'],
    majorDefects: ['Inoperative breakaway device'],
    otherDefects: ['No Defects']
  },
  {
    id: 'electric-brake',
    title: 'Electric Brake System',
    status: 'N/A',
    minorDefects: ['Loose or insecure wiring or electrical connection'],
    majorDefects: ['Inoperative breakaway device'],
    otherDefects: ['No Defects']
  },
  {
    id: 'emergency-equipment',
    title: 'Emergency Equipment and Safety Devices',
    status: 'N/A',
    minorDefects: ['Not all required equipment is present'],
    majorDefects: ['Required emergency equipment is missing or inoperative'],
    otherDefects: ['No Defects']
  },
  {
    id: 'exhaust-system',
    title: 'Exhaust System',
    status: 'N/A',
    minorDefects: ['Leak at a location forward of the cab'],
    majorDefects: ['Leak that would permit entry of exhaust fumes into the cab'],
    otherDefects: ['No Defects']
  },
  {
    id: 'frame-cargo-body',
    title: 'Frame & Cargo Body',
    status: 'N/A',
    minorDefects: ['Minor damage or corrosion'],
    majorDefects: ['Frame or body component is broken, cracked or sagging'],
    otherDefects: ['No Defects']
  },
  {
    id: 'fuel-system',
    title: 'Fuel System',
    status: 'N/A',
    minorDefects: ['Leak in fuel system'],
    majorDefects: ['Fuel leak in system likely to create fire hazard'],
    otherDefects: ['No Defects']
  },
  {
    id: 'general',
    title: 'General',
    status: 'N/A',
    minorDefects: ['Vehicle dirty or cluttered'],
    majorDefects: ['Serious structural or safety defect observed'],
    otherDefects: ['No Defects']
  },
  {
    id: 'glass-mirrors',
    title: 'Glass and Mirrors',
    status: 'N/A',
    minorDefects: ['Crack or chip in windshield or mirror'],
    majorDefects: ['Windshield or mirror broken and impairs vision'],
    otherDefects: [ 'No Defects']
  },
  {
    id: 'heater-defroster',
    title: 'Heater / Defroster',
    status: 'N/A',
    minorDefects: ['Defroster or heater is not fully effective'],
    majorDefects: ['Defroster or heater inoperative'],
    otherDefects: ['No Defects']
  },
  {
    id: 'horn',
    title: 'Horn',
    status: 'N/A',
    minorDefects: ['Vehicle has inoperative horn'],
    majorDefects: [],
    otherDefects: ['No Defects']
  },
  {
    id: 'hydraulic-brake',
    title: 'Hydraulic Brake System',
    status: 'N/A',
    minorDefects: ['Brake fluid level below indicator minimum level'],
    majorDefects: [
      'Brake boost or power assist is not operative',
      'Brake fluid leak',
      'Brake pedal does not fall further when brake pedal is pressed and held',
      'Brake fluid reservoir is less than ¼ full',
      'Parking brake is inoperative'
    ],
    otherDefects: ['No Defects']
  },
  {
    id: 'lamps-reflectors',
    title: 'Lamp & Reflectors',
    status: 'N/A',
    minorDefects: [
      'Required lamp does not function as intended',
      'Required reflector is missing or partially missing'
    ],
    majorDefects: [
      'When use of lamps is required: Failure of both low-beam headlamps, Failure of both tail lamps, Failure of both stop lamps',
      'At all times: Failure of a required lamp or reflector'
    ],
    otherDefects: ['No Defects']
  },
  {
    id: 'steering',
    title: 'Steering',
    status: 'N/A',
    minorDefects: ['Steering wheel lash (free play) is greater than normal'],
    majorDefects: [
      'Steering wheel is loose, or does not respond normally',
      'Steering wheel lash (free play) exceeds prescribed limit'
    ],
    otherDefects: [ 'No Defects']
  },
  {
    id: 'suspension',
    title: 'Suspension System',
    status: 'N/A',
    minorDefects: ['Air suspension leak'],
    majorDefects: ['Air suspension incapable of supporting load'],
    otherDefects: ['No Defects']
  },
  {
    id: 'tires',
    title: 'Tires',
    status: 'N/A',
    minorDefects: ['Tire tread worn close to legal limit'],
    majorDefects: ['Tire tread worn beyond legal limit, tire cut or bulge'],
    otherDefects: ['No Defects']
  },
  {
    id: 'wheels-hubs',
    title: 'Wheels, Hubs and Fasteners',
    status: 'N/A',
    minorDefects: ['Loose or missing fasteners'],
    majorDefects: ['Wheel cracked or broken, hub oil leak or bearing failure'],
    otherDefects: ['No Defects']
  },
  {
    id: 'windshield-wiper',
    title: 'Windshield Wiper / Washer',
    status: 'fass',
    minorDefects: ['Wiper blade is missing, damaged or ineffective'],
    majorDefects: ['Both windshield wipers inoperative'],
    otherDefects: ['No Defects']
  }
];

export default inspectionCategories;