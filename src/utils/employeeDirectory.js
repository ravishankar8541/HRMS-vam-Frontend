export const EMPLOYMENT_STATUSES = ['Active', 'Non Active'];

export const employmentTone = status => ({
  Active: 'bg-emerald-50 text-emerald-700',
  'Non Active': 'bg-red-50 text-red-700',
}[status] || 'bg-slate-100 text-slate-600');

export function filterEmployees(employees, { search = '', status = 'all', employment = 'all', designation = '', sort = 'newest' }) {
  const query = search.trim().toLowerCase();
  return employees.filter(employee => {
    const matchesSearch = !query || [employee.name, employee.email, employee.empId, employee.designation, employee.phoneNumber]
      .some(value => String(value || '').toLowerCase().includes(query));
    const matchesStatus = status === 'all' || (employee.onboardingStatus === 'Completed') === (status === 'completed');
    const matchesEmployment = employment === 'all' || (employee.status || 'Active') === employment;
    return matchesSearch && matchesStatus && matchesEmployment && (!designation || (employee.designation || 'Unassigned') === designation);
  }).sort((a, b) => {
    if (sort === 'name') return String(a.name || '').localeCompare(String(b.name || ''));
    if (sort === 'salary') return (Number(b.salary) || 0) - (Number(a.salary) || 0);
    return (Date.parse(b.dateOfJoining) || 0) - (Date.parse(a.dateOfJoining) || 0);
  });
}
