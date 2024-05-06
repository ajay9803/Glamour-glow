class Order {
  _id: string;
  userId: string;
  houseNumber: string;
  streetName: string;
  city: string;
  district: string;
  zone: string;
  contactNumber: string;
  paymentMethod: string;
  orderItems: any[];
  totalPrice: number;
  totalItems: number;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;

  constructor({
    _id,
    userId,
    houseNumber,
    streetName,
    city,
    district,
    zone,
    contactNumber,
    paymentMethod,
    orderItems,
    totalPrice,
    totalItems,
    paid,
    createdAt,
    updatedAt,
    __v,
  }: {
    _id: string;
    userId: string;
    houseNumber: string;
    streetName: string;
    city: string;
    district: string;
    zone: string;
    contactNumber: string;
    paymentMethod: string;
    orderItems: any[];
    totalPrice: number;
    totalItems: number;
    paid: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }) {
    this._id = _id;
    this.userId = userId;
    this.houseNumber = houseNumber;
    this.streetName = streetName;
    this.city = city;
    this.district = district;
    this.zone = zone;
    this.contactNumber = contactNumber;
    this.paymentMethod = paymentMethod;
    this.orderItems = orderItems;
    this.totalPrice = totalPrice;
    this.totalItems = totalItems;
    this.paid = paid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
  }
}

export default Order;
