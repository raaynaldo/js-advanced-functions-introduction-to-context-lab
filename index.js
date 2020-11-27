// Your code here
const createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (rows) {
  return rows.map((row) => {
    return createEmployeeRecord(row);
  });
};

const createTimeInEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

const createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

const hoursWorkedOnDate = function (employee, date) {
  const timeIn = employee.timeInEvents.find(function (timeInEvent) {
    return timeInEvent.date === date;
  });

  const timeOut = employee.timeOutEvents.find(function (timeOutEvent) {
    return timeOutEvent.date === date;
  });

  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = function (employee, date) {
  return employee.payPerHour * hoursWorkedOnDate(employee, date);
};

const allWagesFor = function (employee) {
  return employee.timeInEvents
    .map((e) => e.date)
    .reduce((pay, date) => {
      return pay + wagesEarnedOnDate(employee, date);
    }, 0);
};

const calculatePayroll = function (employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
};

const findEmployeeByFirstName = function (employees, name) {
  return employees.find((employee) => employee.firstName === name);
};
