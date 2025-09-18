export interface RequestData {
  id: string;
  requesterName: string;
  distanceAway: number | string;
  amountToPay: number | string;
  pickupLocation: string;
  dropoffLocation: string;
  pricing: {
    serviceFee: number | string;
    gasRefillFee: number | string;
    taxes: number | string;
    total: number | string;
  };
  cylinderDetails: {
    size: string;
    type: string;
    quantity: number | string;
  };
  specialInstructions?: string;
  timeElapsed: string;
}

export const sampleRequestData: RequestData[] = [
  {
    id: "xdopwekpslkpwemlsdijwkj32092ko103",
    requesterName: "John Doe",
    distanceAway: 2.5,
    amountToPay: 50,
    pickupLocation: "123 Main St",
    dropoffLocation: "456 Elm St",
    pricing: {
      serviceFee: 5,
      gasRefillFee: 10,
      taxes: 2.5,
      total: 67.5,
    },
    cylinderDetails: {
      size: "Large",
      type: "Propane",
      quantity: 2,
    },
    specialInstructions: "Leave at the front door.",
    timeElapsed: "15 minutes",
  },

  {
    id: "aowpeiruwepqowieurpqowieurpqowieur",
    requesterName: "Jane Smith",
    distanceAway: 5,
    amountToPay: "75",
    pickupLocation: "789 Oak Ave",
    dropoffLocation: "321 Pine Rd",
    pricing: {
      serviceFee: "7",
      gasRefillFee: "15",
      taxes: "3",
      total: "100",
    },
    cylinderDetails: {
      size: "Medium",
      type: "Butane",
      quantity: "1",
    },
    specialInstructions: "Call upon arrival.",
    timeElapsed: "30 minutes",
  },
  {
    id: "qwepoiruqwepoiruqwepoiruqwepoiru",
    requesterName: "Alex Johnson",
    distanceAway: 1.2,
    amountToPay: 40,
    pickupLocation: "555 Maple St",
    dropoffLocation: "888 Cedar Blvd",
    pricing: {
      serviceFee: 4,
      gasRefillFee: 8,
      taxes: 2,
      total: 54,
    },
    cylinderDetails: {
      size: "Small",
      type: "Propane",
      quantity: 3,
    },
    timeElapsed: "10 minutes",
  },
  {
    id: "zmxncbvlasdfghjklqwertyuiop12345",
    requesterName: "Maria Garcia",
    distanceAway: "3.8",
    amountToPay: "60",
    pickupLocation: "246 Birch Ln",
    dropoffLocation: "135 Spruce Ct",
    pricing: {
      serviceFee: "6",
      gasRefillFee: "12",
      taxes: "2.8",
      total: "80.8",
    },
    cylinderDetails: {
      size: "Large",
      type: "Butane",
      quantity: "2",
    },
    specialInstructions: "Ring the bell twice.",
    timeElapsed: "20 minutes",
  },
];
