export type Landmark_type = {
  landmarkId: number;
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
  points: number;
};

export type Attended_type = {
  attendedId: number;
  username: string;
  locationId: number;
};


export type Pin_type = {
    lat: number;
    lng: number;
};