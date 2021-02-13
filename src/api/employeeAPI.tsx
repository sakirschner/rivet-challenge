import axios from 'axios'

export interface Employee {
    id: number
    first_name: string
    last_name: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    zip: string
    photo: string
    notes: string
    createdAt: Date
    updatedAt: Date
}

export interface EmployeesResult {
    employees: Employee[]
}

const apiClient = axios.create({
    baseURL: 'https://codechallenge.rivet.work/api/v1',
    headers: {
      'token': process.env.REACT_APP_API_TOKEN
    }
})

export async function getEmployees(): Promise<EmployeesResult> {
    const url = '/profiles'

    try {
        const employeesResponse = await apiClient.get<Employee[]>(url)

        return {
            employees: employeesResponse.data
        }
    } catch (err) {
        throw err
    }
}

export async function getEmployee(id: number) {
    const url = '/profile'

    try {
        const { data } = await axios.get<Employee>(`${url}/${id}`)

        return data
    } catch (err) {
        throw err
    }  
}