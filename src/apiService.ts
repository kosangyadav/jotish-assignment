export interface Employee {
  id: string;
  name: string;
  position: string;
  city: string;
  employeeId: string;
  startDate: string;
  salary: string;
}

const API_URL = "/api/gettabledata.php";
const API_USERNAME = import.meta.env.VITE_API_USERNAME;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

export const fetchEmployeeData = async (): Promise<Employee[]> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: API_USERNAME,
      password: API_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();

  return data.TABLE_DATA.data.map((item: string[], index: number) => ({
    id: (index + 1).toString(),
    name: item[0],
    position: item[1],
    city: item[2],
    employeeId: item[3],
    startDate: item[4],
    salary: item[5],
  }));
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const employees = await fetchEmployeeData();
  return employees.find((emp) => emp.id === id) || null;
};
