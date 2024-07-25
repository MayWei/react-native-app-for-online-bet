export type Country = {
  code: string;
  flag: string;
};
export type Track = {
  id: number;
  name: string;
  condition: string;
};
type RaceType = {
  id: number;
  name: string;
};
type Relationships = "races";
export interface RaceTypeInterface {
  id: string;
  type: string;
  links: {
    self: string;
  };
  name: string;
  start_date: string;
  start_time: string;
  number_of_race: number;
  race_type: RaceType;
  weather: string;
  track: Track;
  country: Country;
  state: string;
  order: number;
  is_future: boolean;
  cashout_enabled: boolean;
  has_srm: boolean;
  relationships: Relationships[];
  races: { data: RaceDetailsInterface[] };
}
export interface RaceDetailsInterface extends RaceTypeInterface {
  race_number: number;
  start_time_timestamp: number;
  distance: number;
}

export interface MeetingDetailsInterface {
  id: string;
  name: string;
  start_time: string;
  races: { data: RaceDetailsInterface[] };
  weather: string;
  track: Track;
  country: Country;
  r_number: Number;
  distance: number;
}
export interface RaceInterface {
  typeName: string;
  typeId: number;
  meetings: RaceTypeInterface[];
}
