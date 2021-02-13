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
      'Content-Type': 'application/json',  
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
        const { data } = await apiClient.get<Employee>(`${url}/${id}`)

        return data
    } catch (err) {
        throw err
    }  
}

export async function createEmployee(payload: any) {
    console.log(payload)
    const url = '/profile'

    try {
        await apiClient.post(`${url}`, payload).then(
            response => { 
                return response
            }
        )
    } catch (err) {
        throw err
    }

}