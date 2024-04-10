export type Landmark_type = {
  id: number;
  landmarkName: string;
  description: string;
  url: string;
  latitude: number;
  longitude: number;
  points: number;
};

export type User_type = {
  username: string;
  password: string;
  totalPoints: number;
};

export type Attended_type = {
  attendedId: number;
  username: string;
  locationId: number;
};
