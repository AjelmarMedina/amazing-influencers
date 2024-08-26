export type UserSchema = {
  id: string
  email: string
  company: string
  firstName: String
  lastName: String
  surveys?: Array<SurveySchema>
  products?: Array<ProductSchema>
  orders?: Array<OrderSchema>
  giveaways?: Array<GiveawaySchema>
}

export type ProductSchema = {
  id: string
  productId: string
  name: string
  type: string
  userId: string
  user?: UserSchema
}

export type GiveawaySchema = {
  id: string
  name: string
  type: string
  status: string
  userId: string
  user?: UserSchema
}

export type SurveySchema = {
  id: string
  surveyCode: string
  name: string
  started: number
  completed: number
  ratio: number
  userId: string
  user?: UserSchema
  productId: string
  product?: ProductSchema
  giveawayIds: Array<string>
  giveaways?: Array<GiveawaySchema>
  reviews?: Array<ReviewsSchema>
}

export type OrderSchema = {
  id: string
  orderNum: string
  date: Date
  fullName: string
  userId: string
  user?: UserSchema
}

export type ReviewsSchema = {
  id?: string
  orderNum: string
  rating: number
  reviewerInfo: {
    name: string
    phone: string
    email: string
  }
  review: string
  shippingInfo: ShippingInfoSchema
  date: Date
  orderId: string
  order?: OrderSchema
  giveawayId: string
  giveaway?: GiveawaySchema
  surveyId: string
  survey?: SurveySchema
}

export type ShippingInfoSchema = {
  fullName: string
  contactNum: string
  email: string
  address1: string
  address2?: string | null
  city: string
  stateProvince: string
  zipCode: string
}

export type ReviewerSchema = {
  name:  String
  phone: String
  email: String
}
