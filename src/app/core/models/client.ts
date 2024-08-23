export interface Customer {
    id: number
    name: string
    image: string
    address: string
    email: string
    password: string
}

export interface ResponseCustomer{
    message: string
    data: Customer[] 
}
export interface CustomerResponse{
    message: string
    data: Customer
}

