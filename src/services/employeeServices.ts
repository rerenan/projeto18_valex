import { notFoundError } from "../handlers/errorHandler";
import { findById } from "../repositories/employeeRepository";

export async function findEmployeeById(id:number) {
    const employee = await findById(id);

    if(!employee) throw notFoundError("employee");
    return employee;
}