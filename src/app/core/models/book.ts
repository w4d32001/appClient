export interface Book {
    id: number
    name: string
    isbm: number
    price: number
    publication_date: Date
    description: string
    image: string
    author: string
    category: string
    created_by: string
    updated_by: string
  }
  
  export interface BookResponse
  {
      message: string
      data: Book[]
  }