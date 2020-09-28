import {User} from '../models/User';
import {Status} from '../enum/Status';
import {Intensity} from '../enum/Intensity';

export interface Job {
  id: number,
  business_id: number,
  customer_id: number,
  category_id: number,
  client_name: string,
  price: number,
  description: string,
  status_id: number,
  intensity_id: number,
  complete_before: any,
  views: number,
  image_one: string,
  image_two: string,
  image_three: string,
  created_at: any,
  updated_at: any,
  deleted_at: any,
  action: number,
  distance_away: number,
  status: string,
  intensity: string,
  customer: User,
  category: Category,
  job_status: Status,
  job_intensity: Intensity,
  location?: Location,
  proposals?: Proposal[]
}

export interface Category {
  id: number,
  name: string,
  icon_image: string
}

export interface Location {
  id: number,
  marketplace_id: number,
  street_address: string,
  city: string,
  state: string,
  lat: number,
  long: number,
  zip: number,
}

export interface Proposal {
  id: number,
  marketplace_id: number,
  arrived_at: any,
  completed_at: any,
  created_at: any,
  proposal_status: Status,
  rating: string,
  review: string,
  status: string,
  status_id: number,
  updated_at: any,
  user: User,
  user_id: number
}
